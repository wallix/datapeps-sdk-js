import { types } from './proto';
import { ChannelAPI, Channel, ID } from './DataPeps';
import { SessionImpl } from './Session';
export declare class ChannelAPIImpl implements ChannelAPI {
    private session;
    constructor(session: SessionImpl);
    get(channelID: ID): Promise<Channel>;
    create(sharingGroup: string[], options?: {
        type?: types.ResourceType;
    }): Promise<Channel>;
}
