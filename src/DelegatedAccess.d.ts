import { IdentityPublicKey, IdentityPublicKeyID } from "./IdentityAPI";
import { Session } from "./Session";
import { ID } from "./ID";
export interface DelegatedAccess {
    /**
     * The identifier of the delegated access.
     */
    id: ID;
    /**
     * The public key used by the resolver to encrypt the keys.
     */
    publicKey: Uint8Array;
    /**
     * The signature of the requester.
     */
    sign: Uint8Array;
    /**
     * The identity that request the delegated access.
     */
    requester: IdentityPublicKeyID;
    /**
     * The identity target of the delegated access.
     */
    target: IdentityPublicKeyID;
    /**
     * The date of creation of the delegated access.
     */
    created: Date;
    /**
     * Indicates if the delegated access request has been resolved.
     */
    resolved: boolean;
}
export declare class DelegatedAccessAPI {
    private session;
    constructor(session: Session);
    /**
     * Resolve an access request.
     * @param requestID The id to the access request to resolve.
     */
    resolveAccessRequest(requestId: ID): Promise<DelegatedAccess.RequestResolver>;
    /**
     * List the requests of DelegatedAccess that the given identity has requested.
     */
    list(login: string, options?: {
        limit?: number;
        maxID?: ID;
        sinceID?: ID;
    }): Promise<DelegatedAccess[]>;
}
export declare namespace DelegatedAccess {
    /**
     * Redefine the AccessRequest.openResolver() default function
     * @param params An object containing the new AccessRequest.openResolver() function
     */
    function configureAccessRequestResolver(params: {
        open: (id: ID, login: string) => any;
    }): void;
    /**
     * An access request is a request used for the delegation of the access of an identity.
     * @see {@link requestDelegatedAccess}
     */
    interface Request {
        /** The id of the AccessRequest. */
        id: ID;
        /** Wait for the resolve of the AccessRequest. */
        wait(): Promise<void>;
        /** Same as wait but returns an authenticated session of the identity that resolved the AccessRequest. */
        waitSession(): Promise<Session>;
        /** Open a control element (a window when calling from a browser) that allows to resolve the access request */
        openResolver(params: any): any;
    }
    /**
     * An object that allows to check and resolve an AccessRequest.
     */
    interface RequestResolver {
        /** ID of the corresponding AccessRequest */
        id: ID;
        /** The IdentityPublicKey of the identity who signed the access request. */
        requesterKey: IdentityPublicKey;
        /** Resolve the access request with the given login.
         * i.e. the corresponding AccessRequest could use a session authenticated with the identity of the given login.
         */
        resolve(login: string): Promise<void>;
    }
    /**
     * Request an access to a delegated identity of the given login.
     * @param login The login of identity to request its access.
     * @param sign A function to sign the access request.
     * The signature must be computed on the concatenation of the `login` and the `publicKey`,
     * thanks the `requester` sign private key.
     * @return(p) a promise that rejects with an {@link Error} with kind
     * - `IdentityNotFound` if the identity doesn't exists..
     */
    function request(login: string, sign: ((info: {
        login: string;
        publicKey: Uint8Array;
    }) => Promise<{
        sign: Uint8Array;
        requester: string;
    }>)): Promise<Request>;
}
