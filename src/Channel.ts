import { types, command } from './proto';
import { ChannelAPI, ChannelMessage, Channel, ID, IdentityPublicKey } from './DataPeps';
import { SessionImpl } from './Session';
import { ResourceImpl, Resource } from './Resource';

export class ChannelAPIImpl implements ChannelAPI {
    private session: SessionImpl

    constructor(session: SessionImpl) {
        this.session = session
    }

    async get(channelID: ID): Promise<Channel> {
        let { id, resource } = await this.session.doProtoRequest({
            method: "GET", code: 200,
            path: "/api/v4/channel/" + channelID.toString(),
            response: types.ChannelGetResponse.decode,
        })
        let r = await new ResourceImpl(this.session)._makeResourceFromResponse(resource, null, null)
        return new ChannelResource(this.session, r, id)
    }

    async create(sharingGroup: string[], options?: { type?: types.ResourceType }): Promise<Channel> {
        options = options == null ? {} : options
        let type = options.type == null ? types.ResourceType.ANONYMOUS : options.type
        let payload = {}
        let creator = this.session.getSessionPublicKey()
        let encryptFunc = this.session.encryption.encrypt(type)
        let { body, keypair } = await new ResourceImpl(this.session)._createBodyRequest(payload, sharingGroup, encryptFunc)
        let { id } = await this.session.doProtoRequest({
            method: "POST", code: 201,
            path: "/api/v4/channels",
            request: () => types.ChannelPostRequest.encode(body).finish(),
            response: types.ChannelPostResponse.decode
        })
        let resource = new Resource(null, "_internal_/channel", payload, keypair, creator)
        return new ChannelResource(this.session, resource, id)
    }
}

class ChannelResource implements Channel {
    private session: SessionImpl
    private resource: Resource<any>
    id: ID
    creator: IdentityPublicKey

    constructor(session: SessionImpl, resource: Resource<any>, id: ID) {
        this.session = session
        this.resource = resource
        this.id = id
        this.creator = resource.creator
    }

    async send(message: Uint8Array): Promise<void> {
        await this.session.doProtoRequest({
            method: "POST", code: 201,
            path: "/api/v4/channel/" + this.id.toString() + "/messages",
            request: () => types.ChannelPostMessageRequest.encode({
                content: this.resource.encrypt(message)
            }).finish()
        })
    }

    async listen(onMessage: (message: ChannelMessage) => any): Promise<void> {
        await this.session.wsManager.listenChannelMessage(this.id, event => {
            onMessage({
                content: this.resource.decrypt(event.payload.content),
                from: null
            })
        })
        return this.session.wsManager.sendCommandSync(
            command.RequestKind.ListenChannel,
            {
                type: "RequestListenChannel",
                value: command.RequestListenChannel.create({
                    id: this.id,
                }),
            }
        )
    }
}