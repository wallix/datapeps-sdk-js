import * as $protobuf from "protobufjs";

/** Namespace errors. */
export namespace errors {

    /** Properties of a ProtoError. */
    interface IProtoError {

        /** ProtoError code */
        code?: (number|null);

        /** ProtoError kind */
        kind?: (errors.PepsErrorKind|null);

        /** ProtoError payload */
        payload?: (google.protobuf.IAny|null);
    }

    /** Represents a ProtoError. */
    class ProtoError implements IProtoError {

        /**
         * Constructs a new ProtoError.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IProtoError);

        /** ProtoError code. */
        public code: number;

        /** ProtoError kind. */
        public kind: errors.PepsErrorKind;

        /** ProtoError payload. */
        public payload?: (google.protobuf.IAny|null);

        /**
         * Creates a new ProtoError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoError instance
         */
        public static create(properties?: errors.IProtoError): errors.ProtoError;

        /**
         * Encodes the specified ProtoError message. Does not implicitly {@link errors.ProtoError.verify|verify} messages.
         * @param message ProtoError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IProtoError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProtoError message, length delimited. Does not implicitly {@link errors.ProtoError.verify|verify} messages.
         * @param message ProtoError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IProtoError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProtoError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.ProtoError;

        /**
         * Decodes a ProtoError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.ProtoError;

        /**
         * Verifies a ProtoError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ProtoError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ProtoError
         */
        public static fromObject(object: { [k: string]: any }): errors.ProtoError;

        /**
         * Creates a plain object from a ProtoError message. Also converts values to other types if specified.
         * @param message ProtoError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.ProtoError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ProtoError to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** PepsErrorKind enum. */
    enum PepsErrorKind {
        ServerInternalError = 0,
        SessionExpired = 1,
        SessionStale = 2,
        SessionInvalidSalt = 3,
        AssumeStale = 4,
        RequestBadUriParams = 6,
        RequestMissingHeader = 7,
        RequestDecodeHeader = 8,
        RequestBadRequest = 9,
        IdentityCannotAssumeOwnership = 10,
        IdentityCannotAssumeAccess = 11,
        IdentitySignatureMismatch = 12,
        IdentityInvalidLogin = 13,
        IdentityAlreadyExists = 14,
        IdentityNotFound = 15,
        IdentityVersionMismatch = 16,
        IdentityNotAdmin = 17,
        IdentityNotAdminDomain = 18,
        IdentitySharingKindMismatch = 19,
        ResourceNotFound = 20,
        RegisterInvalidEmail = 21,
        RegisterTokenNotFound = 22,
        ChannelNotFound = 23,
        DelegatedAccessNotFound = 24
    }

    /** Properties of a PayloadServerInternalError. */
    interface IPayloadServerInternalError {

        /** PayloadServerInternalError reason */
        reason?: (string|null);
    }

    /** Represents a PayloadServerInternalError. */
    class PayloadServerInternalError implements IPayloadServerInternalError {

        /**
         * Constructs a new PayloadServerInternalError.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadServerInternalError);

        /** PayloadServerInternalError reason. */
        public reason: string;

        /**
         * Creates a new PayloadServerInternalError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadServerInternalError instance
         */
        public static create(properties?: errors.IPayloadServerInternalError): errors.PayloadServerInternalError;

        /**
         * Encodes the specified PayloadServerInternalError message. Does not implicitly {@link errors.PayloadServerInternalError.verify|verify} messages.
         * @param message PayloadServerInternalError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadServerInternalError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadServerInternalError message, length delimited. Does not implicitly {@link errors.PayloadServerInternalError.verify|verify} messages.
         * @param message PayloadServerInternalError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadServerInternalError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadServerInternalError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadServerInternalError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadServerInternalError;

        /**
         * Decodes a PayloadServerInternalError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadServerInternalError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadServerInternalError;

        /**
         * Verifies a PayloadServerInternalError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadServerInternalError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadServerInternalError
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadServerInternalError;

        /**
         * Creates a plain object from a PayloadServerInternalError message. Also converts values to other types if specified.
         * @param message PayloadServerInternalError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadServerInternalError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadServerInternalError to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadRequestBadUriParams. */
    interface IPayloadRequestBadUriParams {

        /** PayloadRequestBadUriParams key */
        key?: (string|null);

        /** PayloadRequestBadUriParams value */
        value?: (string|null);

        /** PayloadRequestBadUriParams expected */
        expected?: (string|null);
    }

    /** Represents a PayloadRequestBadUriParams. */
    class PayloadRequestBadUriParams implements IPayloadRequestBadUriParams {

        /**
         * Constructs a new PayloadRequestBadUriParams.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadRequestBadUriParams);

        /** PayloadRequestBadUriParams key. */
        public key: string;

        /** PayloadRequestBadUriParams value. */
        public value: string;

        /** PayloadRequestBadUriParams expected. */
        public expected: string;

        /**
         * Creates a new PayloadRequestBadUriParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestBadUriParams instance
         */
        public static create(properties?: errors.IPayloadRequestBadUriParams): errors.PayloadRequestBadUriParams;

        /**
         * Encodes the specified PayloadRequestBadUriParams message. Does not implicitly {@link errors.PayloadRequestBadUriParams.verify|verify} messages.
         * @param message PayloadRequestBadUriParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadRequestBadUriParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestBadUriParams message, length delimited. Does not implicitly {@link errors.PayloadRequestBadUriParams.verify|verify} messages.
         * @param message PayloadRequestBadUriParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadRequestBadUriParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestBadUriParams message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestBadUriParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadRequestBadUriParams;

        /**
         * Decodes a PayloadRequestBadUriParams message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestBadUriParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadRequestBadUriParams;

        /**
         * Verifies a PayloadRequestBadUriParams message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadRequestBadUriParams message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadRequestBadUriParams
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadRequestBadUriParams;

        /**
         * Creates a plain object from a PayloadRequestBadUriParams message. Also converts values to other types if specified.
         * @param message PayloadRequestBadUriParams
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadRequestBadUriParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadRequestBadUriParams to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadRequestMissingHeader. */
    interface IPayloadRequestMissingHeader {

        /** PayloadRequestMissingHeader name */
        name?: (string|null);
    }

    /** Represents a PayloadRequestMissingHeader. */
    class PayloadRequestMissingHeader implements IPayloadRequestMissingHeader {

        /**
         * Constructs a new PayloadRequestMissingHeader.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadRequestMissingHeader);

        /** PayloadRequestMissingHeader name. */
        public name: string;

        /**
         * Creates a new PayloadRequestMissingHeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestMissingHeader instance
         */
        public static create(properties?: errors.IPayloadRequestMissingHeader): errors.PayloadRequestMissingHeader;

        /**
         * Encodes the specified PayloadRequestMissingHeader message. Does not implicitly {@link errors.PayloadRequestMissingHeader.verify|verify} messages.
         * @param message PayloadRequestMissingHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadRequestMissingHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestMissingHeader message, length delimited. Does not implicitly {@link errors.PayloadRequestMissingHeader.verify|verify} messages.
         * @param message PayloadRequestMissingHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadRequestMissingHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestMissingHeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestMissingHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadRequestMissingHeader;

        /**
         * Decodes a PayloadRequestMissingHeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestMissingHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadRequestMissingHeader;

        /**
         * Verifies a PayloadRequestMissingHeader message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadRequestMissingHeader message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadRequestMissingHeader
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadRequestMissingHeader;

        /**
         * Creates a plain object from a PayloadRequestMissingHeader message. Also converts values to other types if specified.
         * @param message PayloadRequestMissingHeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadRequestMissingHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadRequestMissingHeader to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadRequestDecodeHeader. */
    interface IPayloadRequestDecodeHeader {

        /** PayloadRequestDecodeHeader name */
        name?: (string|null);

        /** PayloadRequestDecodeHeader value */
        value?: (string|null);
    }

    /** Represents a PayloadRequestDecodeHeader. */
    class PayloadRequestDecodeHeader implements IPayloadRequestDecodeHeader {

        /**
         * Constructs a new PayloadRequestDecodeHeader.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadRequestDecodeHeader);

        /** PayloadRequestDecodeHeader name. */
        public name: string;

        /** PayloadRequestDecodeHeader value. */
        public value: string;

        /**
         * Creates a new PayloadRequestDecodeHeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestDecodeHeader instance
         */
        public static create(properties?: errors.IPayloadRequestDecodeHeader): errors.PayloadRequestDecodeHeader;

        /**
         * Encodes the specified PayloadRequestDecodeHeader message. Does not implicitly {@link errors.PayloadRequestDecodeHeader.verify|verify} messages.
         * @param message PayloadRequestDecodeHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadRequestDecodeHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestDecodeHeader message, length delimited. Does not implicitly {@link errors.PayloadRequestDecodeHeader.verify|verify} messages.
         * @param message PayloadRequestDecodeHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadRequestDecodeHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestDecodeHeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestDecodeHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadRequestDecodeHeader;

        /**
         * Decodes a PayloadRequestDecodeHeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestDecodeHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadRequestDecodeHeader;

        /**
         * Verifies a PayloadRequestDecodeHeader message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadRequestDecodeHeader message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadRequestDecodeHeader
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadRequestDecodeHeader;

        /**
         * Creates a plain object from a PayloadRequestDecodeHeader message. Also converts values to other types if specified.
         * @param message PayloadRequestDecodeHeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadRequestDecodeHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadRequestDecodeHeader to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadRequestBadRequest. */
    interface IPayloadRequestBadRequest {

        /** PayloadRequestBadRequest hint */
        hint?: (string|null);
    }

    /** Represents a PayloadRequestBadRequest. */
    class PayloadRequestBadRequest implements IPayloadRequestBadRequest {

        /**
         * Constructs a new PayloadRequestBadRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadRequestBadRequest);

        /** PayloadRequestBadRequest hint. */
        public hint: string;

        /**
         * Creates a new PayloadRequestBadRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestBadRequest instance
         */
        public static create(properties?: errors.IPayloadRequestBadRequest): errors.PayloadRequestBadRequest;

        /**
         * Encodes the specified PayloadRequestBadRequest message. Does not implicitly {@link errors.PayloadRequestBadRequest.verify|verify} messages.
         * @param message PayloadRequestBadRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadRequestBadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestBadRequest message, length delimited. Does not implicitly {@link errors.PayloadRequestBadRequest.verify|verify} messages.
         * @param message PayloadRequestBadRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadRequestBadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestBadRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestBadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadRequestBadRequest;

        /**
         * Decodes a PayloadRequestBadRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestBadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadRequestBadRequest;

        /**
         * Verifies a PayloadRequestBadRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadRequestBadRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadRequestBadRequest
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadRequestBadRequest;

        /**
         * Creates a plain object from a PayloadRequestBadRequest message. Also converts values to other types if specified.
         * @param message PayloadRequestBadRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadRequestBadRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadRequestBadRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityCannotAssumeOwnership. */
    interface IPayloadIdentityCannotAssumeOwnership {

        /** PayloadIdentityCannotAssumeOwnership owner */
        owner?: (string|null);
    }

    /** Represents a PayloadIdentityCannotAssumeOwnership. */
    class PayloadIdentityCannotAssumeOwnership implements IPayloadIdentityCannotAssumeOwnership {

        /**
         * Constructs a new PayloadIdentityCannotAssumeOwnership.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityCannotAssumeOwnership);

        /** PayloadIdentityCannotAssumeOwnership owner. */
        public owner: string;

        /**
         * Creates a new PayloadIdentityCannotAssumeOwnership instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityCannotAssumeOwnership instance
         */
        public static create(properties?: errors.IPayloadIdentityCannotAssumeOwnership): errors.PayloadIdentityCannotAssumeOwnership;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeOwnership message. Does not implicitly {@link errors.PayloadIdentityCannotAssumeOwnership.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeOwnership message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityCannotAssumeOwnership, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeOwnership message, length delimited. Does not implicitly {@link errors.PayloadIdentityCannotAssumeOwnership.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeOwnership message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityCannotAssumeOwnership, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityCannotAssumeOwnership message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityCannotAssumeOwnership
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityCannotAssumeOwnership;

        /**
         * Decodes a PayloadIdentityCannotAssumeOwnership message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityCannotAssumeOwnership
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityCannotAssumeOwnership;

        /**
         * Verifies a PayloadIdentityCannotAssumeOwnership message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityCannotAssumeOwnership message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityCannotAssumeOwnership
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityCannotAssumeOwnership;

        /**
         * Creates a plain object from a PayloadIdentityCannotAssumeOwnership message. Also converts values to other types if specified.
         * @param message PayloadIdentityCannotAssumeOwnership
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityCannotAssumeOwnership, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityCannotAssumeOwnership to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityCannotAssumeAccess. */
    interface IPayloadIdentityCannotAssumeAccess {

        /** PayloadIdentityCannotAssumeAccess kind */
        kind?: (types.IdentityAccessKeyKind|null);
    }

    /** Represents a PayloadIdentityCannotAssumeAccess. */
    class PayloadIdentityCannotAssumeAccess implements IPayloadIdentityCannotAssumeAccess {

        /**
         * Constructs a new PayloadIdentityCannotAssumeAccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityCannotAssumeAccess);

        /** PayloadIdentityCannotAssumeAccess kind. */
        public kind: types.IdentityAccessKeyKind;

        /**
         * Creates a new PayloadIdentityCannotAssumeAccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityCannotAssumeAccess instance
         */
        public static create(properties?: errors.IPayloadIdentityCannotAssumeAccess): errors.PayloadIdentityCannotAssumeAccess;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeAccess message. Does not implicitly {@link errors.PayloadIdentityCannotAssumeAccess.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeAccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityCannotAssumeAccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeAccess message, length delimited. Does not implicitly {@link errors.PayloadIdentityCannotAssumeAccess.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeAccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityCannotAssumeAccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityCannotAssumeAccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityCannotAssumeAccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityCannotAssumeAccess;

        /**
         * Decodes a PayloadIdentityCannotAssumeAccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityCannotAssumeAccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityCannotAssumeAccess;

        /**
         * Verifies a PayloadIdentityCannotAssumeAccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityCannotAssumeAccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityCannotAssumeAccess
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityCannotAssumeAccess;

        /**
         * Creates a plain object from a PayloadIdentityCannotAssumeAccess message. Also converts values to other types if specified.
         * @param message PayloadIdentityCannotAssumeAccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityCannotAssumeAccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityCannotAssumeAccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentitySignatureMismatch. */
    interface IPayloadIdentitySignatureMismatch {

        /** PayloadIdentitySignatureMismatch key */
        key?: (types.IIdentityKeyID|null);
    }

    /** Represents a PayloadIdentitySignatureMismatch. */
    class PayloadIdentitySignatureMismatch implements IPayloadIdentitySignatureMismatch {

        /**
         * Constructs a new PayloadIdentitySignatureMismatch.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentitySignatureMismatch);

        /** PayloadIdentitySignatureMismatch key. */
        public key?: (types.IIdentityKeyID|null);

        /**
         * Creates a new PayloadIdentitySignatureMismatch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentitySignatureMismatch instance
         */
        public static create(properties?: errors.IPayloadIdentitySignatureMismatch): errors.PayloadIdentitySignatureMismatch;

        /**
         * Encodes the specified PayloadIdentitySignatureMismatch message. Does not implicitly {@link errors.PayloadIdentitySignatureMismatch.verify|verify} messages.
         * @param message PayloadIdentitySignatureMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentitySignatureMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentitySignatureMismatch message, length delimited. Does not implicitly {@link errors.PayloadIdentitySignatureMismatch.verify|verify} messages.
         * @param message PayloadIdentitySignatureMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentitySignatureMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentitySignatureMismatch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentitySignatureMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentitySignatureMismatch;

        /**
         * Decodes a PayloadIdentitySignatureMismatch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentitySignatureMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentitySignatureMismatch;

        /**
         * Verifies a PayloadIdentitySignatureMismatch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentitySignatureMismatch message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentitySignatureMismatch
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentitySignatureMismatch;

        /**
         * Creates a plain object from a PayloadIdentitySignatureMismatch message. Also converts values to other types if specified.
         * @param message PayloadIdentitySignatureMismatch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentitySignatureMismatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentitySignatureMismatch to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityInvalidLogin. */
    interface IPayloadIdentityInvalidLogin {

        /** PayloadIdentityInvalidLogin login */
        login?: (string|null);
    }

    /** Represents a PayloadIdentityInvalidLogin. */
    class PayloadIdentityInvalidLogin implements IPayloadIdentityInvalidLogin {

        /**
         * Constructs a new PayloadIdentityInvalidLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityInvalidLogin);

        /** PayloadIdentityInvalidLogin login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityInvalidLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityInvalidLogin instance
         */
        public static create(properties?: errors.IPayloadIdentityInvalidLogin): errors.PayloadIdentityInvalidLogin;

        /**
         * Encodes the specified PayloadIdentityInvalidLogin message. Does not implicitly {@link errors.PayloadIdentityInvalidLogin.verify|verify} messages.
         * @param message PayloadIdentityInvalidLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityInvalidLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityInvalidLogin message, length delimited. Does not implicitly {@link errors.PayloadIdentityInvalidLogin.verify|verify} messages.
         * @param message PayloadIdentityInvalidLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityInvalidLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityInvalidLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityInvalidLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityInvalidLogin;

        /**
         * Decodes a PayloadIdentityInvalidLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityInvalidLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityInvalidLogin;

        /**
         * Verifies a PayloadIdentityInvalidLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityInvalidLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityInvalidLogin
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityInvalidLogin;

        /**
         * Creates a plain object from a PayloadIdentityInvalidLogin message. Also converts values to other types if specified.
         * @param message PayloadIdentityInvalidLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityInvalidLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityInvalidLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityAlreadyExists. */
    interface IPayloadIdentityAlreadyExists {

        /** PayloadIdentityAlreadyExists login */
        login?: (string|null);
    }

    /** Represents a PayloadIdentityAlreadyExists. */
    class PayloadIdentityAlreadyExists implements IPayloadIdentityAlreadyExists {

        /**
         * Constructs a new PayloadIdentityAlreadyExists.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityAlreadyExists);

        /** PayloadIdentityAlreadyExists login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityAlreadyExists instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityAlreadyExists instance
         */
        public static create(properties?: errors.IPayloadIdentityAlreadyExists): errors.PayloadIdentityAlreadyExists;

        /**
         * Encodes the specified PayloadIdentityAlreadyExists message. Does not implicitly {@link errors.PayloadIdentityAlreadyExists.verify|verify} messages.
         * @param message PayloadIdentityAlreadyExists message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityAlreadyExists, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityAlreadyExists message, length delimited. Does not implicitly {@link errors.PayloadIdentityAlreadyExists.verify|verify} messages.
         * @param message PayloadIdentityAlreadyExists message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityAlreadyExists, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityAlreadyExists message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityAlreadyExists
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityAlreadyExists;

        /**
         * Decodes a PayloadIdentityAlreadyExists message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityAlreadyExists
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityAlreadyExists;

        /**
         * Verifies a PayloadIdentityAlreadyExists message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityAlreadyExists message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityAlreadyExists
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityAlreadyExists;

        /**
         * Creates a plain object from a PayloadIdentityAlreadyExists message. Also converts values to other types if specified.
         * @param message PayloadIdentityAlreadyExists
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityAlreadyExists, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityAlreadyExists to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityNotFound. */
    interface IPayloadIdentityNotFound {

        /** PayloadIdentityNotFound login */
        login?: (string|null);
    }

    /** Represents a PayloadIdentityNotFound. */
    class PayloadIdentityNotFound implements IPayloadIdentityNotFound {

        /**
         * Constructs a new PayloadIdentityNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityNotFound);

        /** PayloadIdentityNotFound login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityNotFound instance
         */
        public static create(properties?: errors.IPayloadIdentityNotFound): errors.PayloadIdentityNotFound;

        /**
         * Encodes the specified PayloadIdentityNotFound message. Does not implicitly {@link errors.PayloadIdentityNotFound.verify|verify} messages.
         * @param message PayloadIdentityNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityNotFound message, length delimited. Does not implicitly {@link errors.PayloadIdentityNotFound.verify|verify} messages.
         * @param message PayloadIdentityNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityNotFound;

        /**
         * Decodes a PayloadIdentityNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityNotFound;

        /**
         * Verifies a PayloadIdentityNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityNotFound
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityNotFound;

        /**
         * Creates a plain object from a PayloadIdentityNotFound message. Also converts values to other types if specified.
         * @param message PayloadIdentityNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityVersionMismatch. */
    interface IPayloadIdentityVersionMismatch {

        /** PayloadIdentityVersionMismatch key */
        key?: (types.IIdentityKeyID|null);

        /** PayloadIdentityVersionMismatch expected */
        expected?: (number|null);
    }

    /** Represents a PayloadIdentityVersionMismatch. */
    class PayloadIdentityVersionMismatch implements IPayloadIdentityVersionMismatch {

        /**
         * Constructs a new PayloadIdentityVersionMismatch.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityVersionMismatch);

        /** PayloadIdentityVersionMismatch key. */
        public key?: (types.IIdentityKeyID|null);

        /** PayloadIdentityVersionMismatch expected. */
        public expected: number;

        /**
         * Creates a new PayloadIdentityVersionMismatch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityVersionMismatch instance
         */
        public static create(properties?: errors.IPayloadIdentityVersionMismatch): errors.PayloadIdentityVersionMismatch;

        /**
         * Encodes the specified PayloadIdentityVersionMismatch message. Does not implicitly {@link errors.PayloadIdentityVersionMismatch.verify|verify} messages.
         * @param message PayloadIdentityVersionMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityVersionMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityVersionMismatch message, length delimited. Does not implicitly {@link errors.PayloadIdentityVersionMismatch.verify|verify} messages.
         * @param message PayloadIdentityVersionMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityVersionMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityVersionMismatch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityVersionMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityVersionMismatch;

        /**
         * Decodes a PayloadIdentityVersionMismatch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityVersionMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityVersionMismatch;

        /**
         * Verifies a PayloadIdentityVersionMismatch message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityVersionMismatch message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityVersionMismatch
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityVersionMismatch;

        /**
         * Creates a plain object from a PayloadIdentityVersionMismatch message. Also converts values to other types if specified.
         * @param message PayloadIdentityVersionMismatch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityVersionMismatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityVersionMismatch to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityNotAdmin. */
    interface IPayloadIdentityNotAdmin {

        /** PayloadIdentityNotAdmin login */
        login?: (string|null);
    }

    /** Represents a PayloadIdentityNotAdmin. */
    class PayloadIdentityNotAdmin implements IPayloadIdentityNotAdmin {

        /**
         * Constructs a new PayloadIdentityNotAdmin.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityNotAdmin);

        /** PayloadIdentityNotAdmin login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityNotAdmin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityNotAdmin instance
         */
        public static create(properties?: errors.IPayloadIdentityNotAdmin): errors.PayloadIdentityNotAdmin;

        /**
         * Encodes the specified PayloadIdentityNotAdmin message. Does not implicitly {@link errors.PayloadIdentityNotAdmin.verify|verify} messages.
         * @param message PayloadIdentityNotAdmin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityNotAdmin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityNotAdmin message, length delimited. Does not implicitly {@link errors.PayloadIdentityNotAdmin.verify|verify} messages.
         * @param message PayloadIdentityNotAdmin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityNotAdmin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityNotAdmin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityNotAdmin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityNotAdmin;

        /**
         * Decodes a PayloadIdentityNotAdmin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityNotAdmin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityNotAdmin;

        /**
         * Verifies a PayloadIdentityNotAdmin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityNotAdmin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityNotAdmin
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityNotAdmin;

        /**
         * Creates a plain object from a PayloadIdentityNotAdmin message. Also converts values to other types if specified.
         * @param message PayloadIdentityNotAdmin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityNotAdmin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityNotAdmin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityNotAdminDomain. */
    interface IPayloadIdentityNotAdminDomain {

        /** PayloadIdentityNotAdminDomain login */
        login?: (string|null);

        /** PayloadIdentityNotAdminDomain domain */
        domain?: (string|null);
    }

    /** Represents a PayloadIdentityNotAdminDomain. */
    class PayloadIdentityNotAdminDomain implements IPayloadIdentityNotAdminDomain {

        /**
         * Constructs a new PayloadIdentityNotAdminDomain.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadIdentityNotAdminDomain);

        /** PayloadIdentityNotAdminDomain login. */
        public login: string;

        /** PayloadIdentityNotAdminDomain domain. */
        public domain: string;

        /**
         * Creates a new PayloadIdentityNotAdminDomain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityNotAdminDomain instance
         */
        public static create(properties?: errors.IPayloadIdentityNotAdminDomain): errors.PayloadIdentityNotAdminDomain;

        /**
         * Encodes the specified PayloadIdentityNotAdminDomain message. Does not implicitly {@link errors.PayloadIdentityNotAdminDomain.verify|verify} messages.
         * @param message PayloadIdentityNotAdminDomain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadIdentityNotAdminDomain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityNotAdminDomain message, length delimited. Does not implicitly {@link errors.PayloadIdentityNotAdminDomain.verify|verify} messages.
         * @param message PayloadIdentityNotAdminDomain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadIdentityNotAdminDomain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityNotAdminDomain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityNotAdminDomain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadIdentityNotAdminDomain;

        /**
         * Decodes a PayloadIdentityNotAdminDomain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityNotAdminDomain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadIdentityNotAdminDomain;

        /**
         * Verifies a PayloadIdentityNotAdminDomain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentityNotAdminDomain message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentityNotAdminDomain
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadIdentityNotAdminDomain;

        /**
         * Creates a plain object from a PayloadIdentityNotAdminDomain message. Also converts values to other types if specified.
         * @param message PayloadIdentityNotAdminDomain
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadIdentityNotAdminDomain, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityNotAdminDomain to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadResourceNotFound. */
    interface IPayloadResourceNotFound {

        /** PayloadResourceNotFound id */
        id?: (number|Long|null);
    }

    /** Represents a PayloadResourceNotFound. */
    class PayloadResourceNotFound implements IPayloadResourceNotFound {

        /**
         * Constructs a new PayloadResourceNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadResourceNotFound);

        /** PayloadResourceNotFound id. */
        public id: (number|Long);

        /**
         * Creates a new PayloadResourceNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadResourceNotFound instance
         */
        public static create(properties?: errors.IPayloadResourceNotFound): errors.PayloadResourceNotFound;

        /**
         * Encodes the specified PayloadResourceNotFound message. Does not implicitly {@link errors.PayloadResourceNotFound.verify|verify} messages.
         * @param message PayloadResourceNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadResourceNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadResourceNotFound message, length delimited. Does not implicitly {@link errors.PayloadResourceNotFound.verify|verify} messages.
         * @param message PayloadResourceNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadResourceNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadResourceNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadResourceNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadResourceNotFound;

        /**
         * Decodes a PayloadResourceNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadResourceNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadResourceNotFound;

        /**
         * Verifies a PayloadResourceNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadResourceNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadResourceNotFound
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadResourceNotFound;

        /**
         * Creates a plain object from a PayloadResourceNotFound message. Also converts values to other types if specified.
         * @param message PayloadResourceNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadResourceNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadResourceNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadRegisterInvalidEmail. */
    interface IPayloadRegisterInvalidEmail {

        /** PayloadRegisterInvalidEmail email */
        email?: (string|null);
    }

    /** Represents a PayloadRegisterInvalidEmail. */
    class PayloadRegisterInvalidEmail implements IPayloadRegisterInvalidEmail {

        /**
         * Constructs a new PayloadRegisterInvalidEmail.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadRegisterInvalidEmail);

        /** PayloadRegisterInvalidEmail email. */
        public email: string;

        /**
         * Creates a new PayloadRegisterInvalidEmail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRegisterInvalidEmail instance
         */
        public static create(properties?: errors.IPayloadRegisterInvalidEmail): errors.PayloadRegisterInvalidEmail;

        /**
         * Encodes the specified PayloadRegisterInvalidEmail message. Does not implicitly {@link errors.PayloadRegisterInvalidEmail.verify|verify} messages.
         * @param message PayloadRegisterInvalidEmail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadRegisterInvalidEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRegisterInvalidEmail message, length delimited. Does not implicitly {@link errors.PayloadRegisterInvalidEmail.verify|verify} messages.
         * @param message PayloadRegisterInvalidEmail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadRegisterInvalidEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRegisterInvalidEmail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRegisterInvalidEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadRegisterInvalidEmail;

        /**
         * Decodes a PayloadRegisterInvalidEmail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRegisterInvalidEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadRegisterInvalidEmail;

        /**
         * Verifies a PayloadRegisterInvalidEmail message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadRegisterInvalidEmail message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadRegisterInvalidEmail
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadRegisterInvalidEmail;

        /**
         * Creates a plain object from a PayloadRegisterInvalidEmail message. Also converts values to other types if specified.
         * @param message PayloadRegisterInvalidEmail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadRegisterInvalidEmail, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadRegisterInvalidEmail to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadRegisterTokenNotFound. */
    interface IPayloadRegisterTokenNotFound {

        /** PayloadRegisterTokenNotFound token */
        token?: (Uint8Array|null);
    }

    /** Represents a PayloadRegisterTokenNotFound. */
    class PayloadRegisterTokenNotFound implements IPayloadRegisterTokenNotFound {

        /**
         * Constructs a new PayloadRegisterTokenNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadRegisterTokenNotFound);

        /** PayloadRegisterTokenNotFound token. */
        public token: Uint8Array;

        /**
         * Creates a new PayloadRegisterTokenNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRegisterTokenNotFound instance
         */
        public static create(properties?: errors.IPayloadRegisterTokenNotFound): errors.PayloadRegisterTokenNotFound;

        /**
         * Encodes the specified PayloadRegisterTokenNotFound message. Does not implicitly {@link errors.PayloadRegisterTokenNotFound.verify|verify} messages.
         * @param message PayloadRegisterTokenNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadRegisterTokenNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRegisterTokenNotFound message, length delimited. Does not implicitly {@link errors.PayloadRegisterTokenNotFound.verify|verify} messages.
         * @param message PayloadRegisterTokenNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadRegisterTokenNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRegisterTokenNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRegisterTokenNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadRegisterTokenNotFound;

        /**
         * Decodes a PayloadRegisterTokenNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRegisterTokenNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadRegisterTokenNotFound;

        /**
         * Verifies a PayloadRegisterTokenNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadRegisterTokenNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadRegisterTokenNotFound
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadRegisterTokenNotFound;

        /**
         * Creates a plain object from a PayloadRegisterTokenNotFound message. Also converts values to other types if specified.
         * @param message PayloadRegisterTokenNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadRegisterTokenNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadRegisterTokenNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadChannelNotFound. */
    interface IPayloadChannelNotFound {

        /** PayloadChannelNotFound id */
        id?: (number|Long|null);
    }

    /** Represents a PayloadChannelNotFound. */
    class PayloadChannelNotFound implements IPayloadChannelNotFound {

        /**
         * Constructs a new PayloadChannelNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadChannelNotFound);

        /** PayloadChannelNotFound id. */
        public id: (number|Long);

        /**
         * Creates a new PayloadChannelNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadChannelNotFound instance
         */
        public static create(properties?: errors.IPayloadChannelNotFound): errors.PayloadChannelNotFound;

        /**
         * Encodes the specified PayloadChannelNotFound message. Does not implicitly {@link errors.PayloadChannelNotFound.verify|verify} messages.
         * @param message PayloadChannelNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadChannelNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadChannelNotFound message, length delimited. Does not implicitly {@link errors.PayloadChannelNotFound.verify|verify} messages.
         * @param message PayloadChannelNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadChannelNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadChannelNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadChannelNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadChannelNotFound;

        /**
         * Decodes a PayloadChannelNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadChannelNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadChannelNotFound;

        /**
         * Verifies a PayloadChannelNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadChannelNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadChannelNotFound
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadChannelNotFound;

        /**
         * Creates a plain object from a PayloadChannelNotFound message. Also converts values to other types if specified.
         * @param message PayloadChannelNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadChannelNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadChannelNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadDelegatedAccessNotFound. */
    interface IPayloadDelegatedAccessNotFound {

        /** PayloadDelegatedAccessNotFound id */
        id?: (number|Long|null);
    }

    /** Represents a PayloadDelegatedAccessNotFound. */
    class PayloadDelegatedAccessNotFound implements IPayloadDelegatedAccessNotFound {

        /**
         * Constructs a new PayloadDelegatedAccessNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: errors.IPayloadDelegatedAccessNotFound);

        /** PayloadDelegatedAccessNotFound id. */
        public id: (number|Long);

        /**
         * Creates a new PayloadDelegatedAccessNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadDelegatedAccessNotFound instance
         */
        public static create(properties?: errors.IPayloadDelegatedAccessNotFound): errors.PayloadDelegatedAccessNotFound;

        /**
         * Encodes the specified PayloadDelegatedAccessNotFound message. Does not implicitly {@link errors.PayloadDelegatedAccessNotFound.verify|verify} messages.
         * @param message PayloadDelegatedAccessNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: errors.IPayloadDelegatedAccessNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadDelegatedAccessNotFound message, length delimited. Does not implicitly {@link errors.PayloadDelegatedAccessNotFound.verify|verify} messages.
         * @param message PayloadDelegatedAccessNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: errors.IPayloadDelegatedAccessNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadDelegatedAccessNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadDelegatedAccessNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): errors.PayloadDelegatedAccessNotFound;

        /**
         * Decodes a PayloadDelegatedAccessNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadDelegatedAccessNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): errors.PayloadDelegatedAccessNotFound;

        /**
         * Verifies a PayloadDelegatedAccessNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadDelegatedAccessNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadDelegatedAccessNotFound
         */
        public static fromObject(object: { [k: string]: any }): errors.PayloadDelegatedAccessNotFound;

        /**
         * Creates a plain object from a PayloadDelegatedAccessNotFound message. Also converts values to other types if specified.
         * @param message PayloadDelegatedAccessNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: errors.PayloadDelegatedAccessNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadDelegatedAccessNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace types. */
export namespace types {

    /** Properties of a Cipher. */
    interface ICipher {

        /** Cipher nonce */
        nonce?: (Uint8Array|null);

        /** Cipher message */
        message?: (Uint8Array|null);

        /** Cipher sign */
        sign?: (types.IIdentityKeyID|null);
    }

    /** Represents a Cipher. */
    class Cipher implements ICipher {

        /**
         * Constructs a new Cipher.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ICipher);

        /** Cipher nonce. */
        public nonce: Uint8Array;

        /** Cipher message. */
        public message: Uint8Array;

        /** Cipher sign. */
        public sign?: (types.IIdentityKeyID|null);

        /**
         * Creates a new Cipher instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cipher instance
         */
        public static create(properties?: types.ICipher): types.Cipher;

        /**
         * Encodes the specified Cipher message. Does not implicitly {@link types.Cipher.verify|verify} messages.
         * @param message Cipher message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ICipher, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cipher message, length delimited. Does not implicitly {@link types.Cipher.verify|verify} messages.
         * @param message Cipher message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ICipher, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cipher message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cipher
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.Cipher;

        /**
         * Decodes a Cipher message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cipher
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.Cipher;

        /**
         * Verifies a Cipher message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Cipher message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Cipher
         */
        public static fromObject(object: { [k: string]: any }): types.Cipher;

        /**
         * Creates a plain object from a Cipher message. Also converts values to other types if specified.
         * @param message Cipher
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.Cipher, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Cipher to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityFields. */
    interface IIdentityFields {

        /** IdentityFields login */
        login?: (string|null);

        /** IdentityFields name */
        name?: (string|null);

        /** IdentityFields kind */
        kind?: (string|null);

        /** IdentityFields payload */
        payload?: (Uint8Array|null);
    }

    /** Represents an IdentityFields. */
    class IdentityFields implements IIdentityFields {

        /**
         * Constructs a new IdentityFields.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityFields);

        /** IdentityFields login. */
        public login: string;

        /** IdentityFields name. */
        public name: string;

        /** IdentityFields kind. */
        public kind: string;

        /** IdentityFields payload. */
        public payload: Uint8Array;

        /**
         * Creates a new IdentityFields instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityFields instance
         */
        public static create(properties?: types.IIdentityFields): types.IdentityFields;

        /**
         * Encodes the specified IdentityFields message. Does not implicitly {@link types.IdentityFields.verify|verify} messages.
         * @param message IdentityFields message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityFields, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityFields message, length delimited. Does not implicitly {@link types.IdentityFields.verify|verify} messages.
         * @param message IdentityFields message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityFields, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityFields message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityFields
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityFields;

        /**
         * Decodes an IdentityFields message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityFields
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityFields;

        /**
         * Verifies an IdentityFields message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityFields message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityFields
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityFields;

        /**
         * Creates a plain object from an IdentityFields message. Also converts values to other types if specified.
         * @param message IdentityFields
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityFields, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityFields to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Identity. */
    interface IIdentity {

        /** Identity login */
        login?: (string|null);

        /** Identity name */
        name?: (string|null);

        /** Identity kind */
        kind?: (string|null);

        /** Identity created */
        created?: (number|Long|null);

        /** Identity admin */
        admin?: (boolean|null);

        /** Identity active */
        active?: (boolean|null);

        /** Identity payload */
        payload?: (Uint8Array|null);
    }

    /** Represents an Identity. */
    class Identity implements IIdentity {

        /**
         * Constructs a new Identity.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentity);

        /** Identity login. */
        public login: string;

        /** Identity name. */
        public name: string;

        /** Identity kind. */
        public kind: string;

        /** Identity created. */
        public created: (number|Long);

        /** Identity admin. */
        public admin: boolean;

        /** Identity active. */
        public active: boolean;

        /** Identity payload. */
        public payload: Uint8Array;

        /**
         * Creates a new Identity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Identity instance
         */
        public static create(properties?: types.IIdentity): types.Identity;

        /**
         * Encodes the specified Identity message. Does not implicitly {@link types.Identity.verify|verify} messages.
         * @param message Identity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Identity message, length delimited. Does not implicitly {@link types.Identity.verify|verify} messages.
         * @param message Identity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Identity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Identity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.Identity;

        /**
         * Decodes an Identity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Identity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.Identity;

        /**
         * Verifies an Identity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Identity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Identity
         */
        public static fromObject(object: { [k: string]: any }): types.Identity;

        /**
         * Creates a plain object from an Identity message. Also converts values to other types if specified.
         * @param message Identity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.Identity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Identity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityKeyID. */
    interface IIdentityKeyID {

        /** IdentityKeyID login */
        login?: (string|null);

        /** IdentityKeyID version */
        version?: (number|null);
    }

    /** Represents an IdentityKeyID. */
    class IdentityKeyID implements IIdentityKeyID {

        /**
         * Constructs a new IdentityKeyID.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityKeyID);

        /** IdentityKeyID login. */
        public login: string;

        /** IdentityKeyID version. */
        public version: number;

        /**
         * Creates a new IdentityKeyID instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityKeyID instance
         */
        public static create(properties?: types.IIdentityKeyID): types.IdentityKeyID;

        /**
         * Encodes the specified IdentityKeyID message. Does not implicitly {@link types.IdentityKeyID.verify|verify} messages.
         * @param message IdentityKeyID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityKeyID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityKeyID message, length delimited. Does not implicitly {@link types.IdentityKeyID.verify|verify} messages.
         * @param message IdentityKeyID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityKeyID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityKeyID message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityKeyID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityKeyID;

        /**
         * Decodes an IdentityKeyID message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityKeyID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityKeyID;

        /**
         * Verifies an IdentityKeyID message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityKeyID message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityKeyID
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityKeyID;

        /**
         * Creates a plain object from an IdentityKeyID message. Also converts values to other types if specified.
         * @param message IdentityKeyID
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityKeyID, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityKeyID to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPublicKey. */
    interface IIdentityPublicKey {

        /** IdentityPublicKey sign */
        sign?: (Uint8Array|null);

        /** IdentityPublicKey box */
        box?: (Uint8Array|null);

        /** IdentityPublicKey login */
        login?: (string|null);

        /** IdentityPublicKey version */
        version?: (number|null);
    }

    /** Represents an IdentityPublicKey. */
    class IdentityPublicKey implements IIdentityPublicKey {

        /**
         * Constructs a new IdentityPublicKey.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityPublicKey);

        /** IdentityPublicKey sign. */
        public sign: Uint8Array;

        /** IdentityPublicKey box. */
        public box: Uint8Array;

        /** IdentityPublicKey login. */
        public login: string;

        /** IdentityPublicKey version. */
        public version: number;

        /**
         * Creates a new IdentityPublicKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPublicKey instance
         */
        public static create(properties?: types.IIdentityPublicKey): types.IdentityPublicKey;

        /**
         * Encodes the specified IdentityPublicKey message. Does not implicitly {@link types.IdentityPublicKey.verify|verify} messages.
         * @param message IdentityPublicKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityPublicKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPublicKey message, length delimited. Does not implicitly {@link types.IdentityPublicKey.verify|verify} messages.
         * @param message IdentityPublicKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityPublicKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPublicKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPublicKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPublicKey;

        /**
         * Decodes an IdentityPublicKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPublicKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPublicKey;

        /**
         * Verifies an IdentityPublicKey message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPublicKey message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPublicKey
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityPublicKey;

        /**
         * Creates a plain object from an IdentityPublicKey message. Also converts values to other types if specified.
         * @param message IdentityPublicKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityPublicKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPublicKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPublicChain. */
    interface IIdentityPublicChain {

        /** IdentityPublicChain login */
        login?: (string|null);

        /** IdentityPublicChain version */
        version?: (number|null);

        /** IdentityPublicChain chains */
        chains?: (types.IdentityPublicChain.IElt[]|null);
    }

    /** Represents an IdentityPublicChain. */
    class IdentityPublicChain implements IIdentityPublicChain {

        /**
         * Constructs a new IdentityPublicChain.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityPublicChain);

        /** IdentityPublicChain login. */
        public login: string;

        /** IdentityPublicChain version. */
        public version: number;

        /** IdentityPublicChain chains. */
        public chains: types.IdentityPublicChain.IElt[];

        /**
         * Creates a new IdentityPublicChain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPublicChain instance
         */
        public static create(properties?: types.IIdentityPublicChain): types.IdentityPublicChain;

        /**
         * Encodes the specified IdentityPublicChain message. Does not implicitly {@link types.IdentityPublicChain.verify|verify} messages.
         * @param message IdentityPublicChain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityPublicChain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPublicChain message, length delimited. Does not implicitly {@link types.IdentityPublicChain.verify|verify} messages.
         * @param message IdentityPublicChain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityPublicChain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPublicChain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPublicChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPublicChain;

        /**
         * Decodes an IdentityPublicChain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPublicChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPublicChain;

        /**
         * Verifies an IdentityPublicChain message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPublicChain message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPublicChain
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityPublicChain;

        /**
         * Creates a plain object from an IdentityPublicChain message. Also converts values to other types if specified.
         * @param message IdentityPublicChain
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityPublicChain, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPublicChain to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityPublicChain {

        /** Properties of an Elt. */
        interface IElt {

            /** Elt sign */
            sign?: (Uint8Array|null);

            /** Elt box */
            box?: (Uint8Array|null);

            /** Elt chain */
            chain?: (Uint8Array|null);

            /** Elt mandate */
            mandate?: (types.IIdentityKeyID|null);
        }

        /** Represents an Elt. */
        class Elt implements IElt {

            /**
             * Constructs a new Elt.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IdentityPublicChain.IElt);

            /** Elt sign. */
            public sign: Uint8Array;

            /** Elt box. */
            public box: Uint8Array;

            /** Elt chain. */
            public chain: Uint8Array;

            /** Elt mandate. */
            public mandate?: (types.IIdentityKeyID|null);

            /**
             * Creates a new Elt instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Elt instance
             */
            public static create(properties?: types.IdentityPublicChain.IElt): types.IdentityPublicChain.Elt;

            /**
             * Encodes the specified Elt message. Does not implicitly {@link types.IdentityPublicChain.Elt.verify|verify} messages.
             * @param message Elt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: types.IdentityPublicChain.IElt, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Elt message, length delimited. Does not implicitly {@link types.IdentityPublicChain.Elt.verify|verify} messages.
             * @param message Elt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: types.IdentityPublicChain.IElt, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Elt message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Elt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPublicChain.Elt;

            /**
             * Decodes an Elt message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Elt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPublicChain.Elt;

            /**
             * Verifies an Elt message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Elt message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Elt
             */
            public static fromObject(object: { [k: string]: any }): types.IdentityPublicChain.Elt;

            /**
             * Creates a plain object from an Elt message. Also converts values to other types if specified.
             * @param message Elt
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: types.IdentityPublicChain.Elt, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Elt to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an IdentityEncryptedKey. */
    interface IIdentityEncryptedKey {

        /** IdentityEncryptedKey nonce */
        nonce?: (Uint8Array|null);

        /** IdentityEncryptedKey publicKey */
        publicKey?: (Uint8Array|null);

        /** IdentityEncryptedKey encryptedKey */
        encryptedKey?: (Uint8Array|null);
    }

    /** Represents an IdentityEncryptedKey. */
    class IdentityEncryptedKey implements IIdentityEncryptedKey {

        /**
         * Constructs a new IdentityEncryptedKey.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityEncryptedKey);

        /** IdentityEncryptedKey nonce. */
        public nonce: Uint8Array;

        /** IdentityEncryptedKey publicKey. */
        public publicKey: Uint8Array;

        /** IdentityEncryptedKey encryptedKey. */
        public encryptedKey: Uint8Array;

        /**
         * Creates a new IdentityEncryptedKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityEncryptedKey instance
         */
        public static create(properties?: types.IIdentityEncryptedKey): types.IdentityEncryptedKey;

        /**
         * Encodes the specified IdentityEncryptedKey message. Does not implicitly {@link types.IdentityEncryptedKey.verify|verify} messages.
         * @param message IdentityEncryptedKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityEncryptedKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityEncryptedKey message, length delimited. Does not implicitly {@link types.IdentityEncryptedKey.verify|verify} messages.
         * @param message IdentityEncryptedKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityEncryptedKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityEncryptedKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityEncryptedKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityEncryptedKey;

        /**
         * Decodes an IdentityEncryptedKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityEncryptedKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityEncryptedKey;

        /**
         * Verifies an IdentityEncryptedKey message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityEncryptedKey message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityEncryptedKey
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityEncryptedKey;

        /**
         * Creates a plain object from an IdentityEncryptedKey message. Also converts values to other types if specified.
         * @param message IdentityEncryptedKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityEncryptedKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityEncryptedKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityEncryption. */
    interface IIdentityEncryption {

        /** IdentityEncryption version */
        version?: (number|null);

        /** IdentityEncryption masterSalt */
        masterSalt?: (Uint8Array|null);

        /** IdentityEncryption masterPublicKey */
        masterPublicKey?: (Uint8Array|null);

        /** IdentityEncryption sharingEncrypted */
        sharingEncrypted?: (types.IIdentityEncryptedKey|null);

        /** IdentityEncryption boxEncrypted */
        boxEncrypted?: (types.IIdentityEncryptedKey|null);

        /** IdentityEncryption signEncrypted */
        signEncrypted?: (types.IIdentityEncryptedKey|null);

        /** IdentityEncryption readEncrypted */
        readEncrypted?: (types.IIdentityEncryptedKey|null);
    }

    /** Represents an IdentityEncryption. */
    class IdentityEncryption implements IIdentityEncryption {

        /**
         * Constructs a new IdentityEncryption.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityEncryption);

        /** IdentityEncryption version. */
        public version: number;

        /** IdentityEncryption masterSalt. */
        public masterSalt: Uint8Array;

        /** IdentityEncryption masterPublicKey. */
        public masterPublicKey: Uint8Array;

        /** IdentityEncryption sharingEncrypted. */
        public sharingEncrypted?: (types.IIdentityEncryptedKey|null);

        /** IdentityEncryption boxEncrypted. */
        public boxEncrypted?: (types.IIdentityEncryptedKey|null);

        /** IdentityEncryption signEncrypted. */
        public signEncrypted?: (types.IIdentityEncryptedKey|null);

        /** IdentityEncryption readEncrypted. */
        public readEncrypted?: (types.IIdentityEncryptedKey|null);

        /**
         * Creates a new IdentityEncryption instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityEncryption instance
         */
        public static create(properties?: types.IIdentityEncryption): types.IdentityEncryption;

        /**
         * Encodes the specified IdentityEncryption message. Does not implicitly {@link types.IdentityEncryption.verify|verify} messages.
         * @param message IdentityEncryption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityEncryption, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityEncryption message, length delimited. Does not implicitly {@link types.IdentityEncryption.verify|verify} messages.
         * @param message IdentityEncryption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityEncryption, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityEncryption message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityEncryption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityEncryption;

        /**
         * Decodes an IdentityEncryption message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityEncryption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityEncryption;

        /**
         * Verifies an IdentityEncryption message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityEncryption message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityEncryption
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityEncryption;

        /**
         * Creates a plain object from an IdentityEncryption message. Also converts values to other types if specified.
         * @param message IdentityEncryption
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityEncryption, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityEncryption to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** IdentityShareKind enum. */
    enum IdentityShareKind {
        BOX = 0,
        SHARING = 1
    }

    /** IdentityAccessKeyKind enum. */
    enum IdentityAccessKeyKind {
        READ = 0,
        WRITE = 1
    }

    /** Properties of an IdentityRegisterRequest. */
    interface IIdentityRegisterRequest {

        /** IdentityRegisterRequest identity */
        identity?: (types.IIdentityFields|null);

        /** IdentityRegisterRequest encryption */
        encryption?: (types.IIdentityEncryption|null);
    }

    /** Represents an IdentityRegisterRequest. */
    class IdentityRegisterRequest implements IIdentityRegisterRequest {

        /**
         * Constructs a new IdentityRegisterRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityRegisterRequest);

        /** IdentityRegisterRequest identity. */
        public identity?: (types.IIdentityFields|null);

        /** IdentityRegisterRequest encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /**
         * Creates a new IdentityRegisterRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityRegisterRequest instance
         */
        public static create(properties?: types.IIdentityRegisterRequest): types.IdentityRegisterRequest;

        /**
         * Encodes the specified IdentityRegisterRequest message. Does not implicitly {@link types.IdentityRegisterRequest.verify|verify} messages.
         * @param message IdentityRegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityRegisterRequest message, length delimited. Does not implicitly {@link types.IdentityRegisterRequest.verify|verify} messages.
         * @param message IdentityRegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityRegisterRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityRegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityRegisterRequest;

        /**
         * Decodes an IdentityRegisterRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityRegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityRegisterRequest;

        /**
         * Verifies an IdentityRegisterRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityRegisterRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityRegisterRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityRegisterRequest;

        /**
         * Creates a plain object from an IdentityRegisterRequest message. Also converts values to other types if specified.
         * @param message IdentityRegisterRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityRegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityRegisterRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityCreateRequest. */
    interface IIdentityCreateRequest {

        /** IdentityCreateRequest identity */
        identity?: (types.IIdentityFields|null);

        /** IdentityCreateRequest encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** IdentityCreateRequest signChain */
        signChain?: (Uint8Array|null);

        /** IdentityCreateRequest sharingGroup */
        sharingGroup?: (types.IIdentityShareEntry[]|null);

        /** IdentityCreateRequest email */
        email?: (string|null);
    }

    /** Represents an IdentityCreateRequest. */
    class IdentityCreateRequest implements IIdentityCreateRequest {

        /**
         * Constructs a new IdentityCreateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityCreateRequest);

        /** IdentityCreateRequest identity. */
        public identity?: (types.IIdentityFields|null);

        /** IdentityCreateRequest encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** IdentityCreateRequest signChain. */
        public signChain: Uint8Array;

        /** IdentityCreateRequest sharingGroup. */
        public sharingGroup: types.IIdentityShareEntry[];

        /** IdentityCreateRequest email. */
        public email: string;

        /**
         * Creates a new IdentityCreateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityCreateRequest instance
         */
        public static create(properties?: types.IIdentityCreateRequest): types.IdentityCreateRequest;

        /**
         * Encodes the specified IdentityCreateRequest message. Does not implicitly {@link types.IdentityCreateRequest.verify|verify} messages.
         * @param message IdentityCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityCreateRequest message, length delimited. Does not implicitly {@link types.IdentityCreateRequest.verify|verify} messages.
         * @param message IdentityCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityCreateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityCreateRequest;

        /**
         * Decodes an IdentityCreateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityCreateRequest;

        /**
         * Verifies an IdentityCreateRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityCreateRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityCreateRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityCreateRequest;

        /**
         * Creates a plain object from an IdentityCreateRequest message. Also converts values to other types if specified.
         * @param message IdentityCreateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityCreateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityCreateRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityKeysToReplaceRequest. */
    interface IIdentityKeysToReplaceRequest {

        /** IdentityKeysToReplaceRequest login */
        login?: (string|null);

        /** IdentityKeysToReplaceRequest encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** IdentityKeysToReplaceRequest signChain */
        signChain?: (Uint8Array|null);

        /** IdentityKeysToReplaceRequest sharingGroup */
        sharingGroup?: (types.IIdentityShareEntry[]|null);
    }

    /** Represents an IdentityKeysToReplaceRequest. */
    class IdentityKeysToReplaceRequest implements IIdentityKeysToReplaceRequest {

        /**
         * Constructs a new IdentityKeysToReplaceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityKeysToReplaceRequest);

        /** IdentityKeysToReplaceRequest login. */
        public login: string;

        /** IdentityKeysToReplaceRequest encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** IdentityKeysToReplaceRequest signChain. */
        public signChain: Uint8Array;

        /** IdentityKeysToReplaceRequest sharingGroup. */
        public sharingGroup: types.IIdentityShareEntry[];

        /**
         * Creates a new IdentityKeysToReplaceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityKeysToReplaceRequest instance
         */
        public static create(properties?: types.IIdentityKeysToReplaceRequest): types.IdentityKeysToReplaceRequest;

        /**
         * Encodes the specified IdentityKeysToReplaceRequest message. Does not implicitly {@link types.IdentityKeysToReplaceRequest.verify|verify} messages.
         * @param message IdentityKeysToReplaceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityKeysToReplaceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityKeysToReplaceRequest message, length delimited. Does not implicitly {@link types.IdentityKeysToReplaceRequest.verify|verify} messages.
         * @param message IdentityKeysToReplaceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityKeysToReplaceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityKeysToReplaceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityKeysToReplaceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityKeysToReplaceRequest;

        /**
         * Decodes an IdentityKeysToReplaceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityKeysToReplaceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityKeysToReplaceRequest;

        /**
         * Verifies an IdentityKeysToReplaceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityKeysToReplaceRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityKeysToReplaceRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityKeysToReplaceRequest;

        /**
         * Creates a plain object from an IdentityKeysToReplaceRequest message. Also converts values to other types if specified.
         * @param message IdentityKeysToReplaceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityKeysToReplaceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityKeysToReplaceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityListResponse. */
    interface IIdentityListResponse {

        /** IdentityListResponse identities */
        identities?: (types.IIdentity[]|null);
    }

    /** Represents an IdentityListResponse. */
    class IdentityListResponse implements IIdentityListResponse {

        /**
         * Constructs a new IdentityListResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityListResponse);

        /** IdentityListResponse identities. */
        public identities: types.IIdentity[];

        /**
         * Creates a new IdentityListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityListResponse instance
         */
        public static create(properties?: types.IIdentityListResponse): types.IdentityListResponse;

        /**
         * Encodes the specified IdentityListResponse message. Does not implicitly {@link types.IdentityListResponse.verify|verify} messages.
         * @param message IdentityListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityListResponse message, length delimited. Does not implicitly {@link types.IdentityListResponse.verify|verify} messages.
         * @param message IdentityListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityListResponse;

        /**
         * Decodes an IdentityListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityListResponse;

        /**
         * Verifies an IdentityListResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityListResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityListResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityListResponse;

        /**
         * Creates a plain object from an IdentityListResponse message. Also converts values to other types if specified.
         * @param message IdentityListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPromoteRequest. */
    interface IIdentityPromoteRequest {

        /** IdentityPromoteRequest login */
        login?: (string|null);

        /** IdentityPromoteRequest admin */
        admin?: (boolean|null);
    }

    /** Represents an IdentityPromoteRequest. */
    class IdentityPromoteRequest implements IIdentityPromoteRequest {

        /**
         * Constructs a new IdentityPromoteRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityPromoteRequest);

        /** IdentityPromoteRequest login. */
        public login: string;

        /** IdentityPromoteRequest admin. */
        public admin: boolean;

        /**
         * Creates a new IdentityPromoteRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPromoteRequest instance
         */
        public static create(properties?: types.IIdentityPromoteRequest): types.IdentityPromoteRequest;

        /**
         * Encodes the specified IdentityPromoteRequest message. Does not implicitly {@link types.IdentityPromoteRequest.verify|verify} messages.
         * @param message IdentityPromoteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityPromoteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPromoteRequest message, length delimited. Does not implicitly {@link types.IdentityPromoteRequest.verify|verify} messages.
         * @param message IdentityPromoteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityPromoteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPromoteRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPromoteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPromoteRequest;

        /**
         * Decodes an IdentityPromoteRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPromoteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPromoteRequest;

        /**
         * Verifies an IdentityPromoteRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPromoteRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPromoteRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityPromoteRequest;

        /**
         * Creates a plain object from an IdentityPromoteRequest message. Also converts values to other types if specified.
         * @param message IdentityPromoteRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityPromoteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPromoteRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetKeysResponse. */
    interface IIdentityGetKeysResponse {

        /** IdentityGetKeysResponse sharingKey */
        sharingKey?: (types.ICipher[]|null);

        /** IdentityGetKeysResponse signKey */
        signKey?: (types.ICipher|null);

        /** IdentityGetKeysResponse boxKey */
        boxKey?: (types.ICipher|null);

        /** IdentityGetKeysResponse readKey */
        readKey?: (types.ICipher|null);

        /** IdentityGetKeysResponse version */
        version?: (number|null);
    }

    /** Represents an IdentityGetKeysResponse. */
    class IdentityGetKeysResponse implements IIdentityGetKeysResponse {

        /**
         * Constructs a new IdentityGetKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetKeysResponse);

        /** IdentityGetKeysResponse sharingKey. */
        public sharingKey: types.ICipher[];

        /** IdentityGetKeysResponse signKey. */
        public signKey?: (types.ICipher|null);

        /** IdentityGetKeysResponse boxKey. */
        public boxKey?: (types.ICipher|null);

        /** IdentityGetKeysResponse readKey. */
        public readKey?: (types.ICipher|null);

        /** IdentityGetKeysResponse version. */
        public version: number;

        /**
         * Creates a new IdentityGetKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetKeysResponse instance
         */
        public static create(properties?: types.IIdentityGetKeysResponse): types.IdentityGetKeysResponse;

        /**
         * Encodes the specified IdentityGetKeysResponse message. Does not implicitly {@link types.IdentityGetKeysResponse.verify|verify} messages.
         * @param message IdentityGetKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetKeysResponse message, length delimited. Does not implicitly {@link types.IdentityGetKeysResponse.verify|verify} messages.
         * @param message IdentityGetKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetKeysResponse;

        /**
         * Decodes an IdentityGetKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetKeysResponse;

        /**
         * Verifies an IdentityGetKeysResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetKeysResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetKeysResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetKeysResponse;

        /**
         * Creates a plain object from an IdentityGetKeysResponse message. Also converts values to other types if specified.
         * @param message IdentityGetKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetKeysResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetPublicKeysRequest. */
    interface IIdentityGetPublicKeysRequest {

        /** IdentityGetPublicKeysRequest ids */
        ids?: (types.IIdentityKeyID[]|null);
    }

    /** Represents an IdentityGetPublicKeysRequest. */
    class IdentityGetPublicKeysRequest implements IIdentityGetPublicKeysRequest {

        /**
         * Constructs a new IdentityGetPublicKeysRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetPublicKeysRequest);

        /** IdentityGetPublicKeysRequest ids. */
        public ids: types.IIdentityKeyID[];

        /**
         * Creates a new IdentityGetPublicKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicKeysRequest instance
         */
        public static create(properties?: types.IIdentityGetPublicKeysRequest): types.IdentityGetPublicKeysRequest;

        /**
         * Encodes the specified IdentityGetPublicKeysRequest message. Does not implicitly {@link types.IdentityGetPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicKeysRequest message, length delimited. Does not implicitly {@link types.IdentityGetPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetPublicKeysRequest;

        /**
         * Decodes an IdentityGetPublicKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetPublicKeysRequest;

        /**
         * Verifies an IdentityGetPublicKeysRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetPublicKeysRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetPublicKeysRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetPublicKeysRequest;

        /**
         * Creates a plain object from an IdentityGetPublicKeysRequest message. Also converts values to other types if specified.
         * @param message IdentityGetPublicKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetPublicKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetPublicKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetPublicKeysResponse. */
    interface IIdentityGetPublicKeysResponse {

        /** IdentityGetPublicKeysResponse publicKeys */
        publicKeys?: (types.IIdentityPublicKey[]|null);
    }

    /** Represents an IdentityGetPublicKeysResponse. */
    class IdentityGetPublicKeysResponse implements IIdentityGetPublicKeysResponse {

        /**
         * Constructs a new IdentityGetPublicKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetPublicKeysResponse);

        /** IdentityGetPublicKeysResponse publicKeys. */
        public publicKeys: types.IIdentityPublicKey[];

        /**
         * Creates a new IdentityGetPublicKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicKeysResponse instance
         */
        public static create(properties?: types.IIdentityGetPublicKeysResponse): types.IdentityGetPublicKeysResponse;

        /**
         * Encodes the specified IdentityGetPublicKeysResponse message. Does not implicitly {@link types.IdentityGetPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicKeysResponse message, length delimited. Does not implicitly {@link types.IdentityGetPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetPublicKeysResponse;

        /**
         * Decodes an IdentityGetPublicKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetPublicKeysResponse;

        /**
         * Verifies an IdentityGetPublicKeysResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetPublicKeysResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetPublicKeysResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetPublicKeysResponse;

        /**
         * Creates a plain object from an IdentityGetPublicKeysResponse message. Also converts values to other types if specified.
         * @param message IdentityGetPublicKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetPublicKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetPublicKeysResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLatestPublicKeysRequest. */
    interface IIdentityGetLatestPublicKeysRequest {

        /** IdentityGetLatestPublicKeysRequest logins */
        logins?: (string[]|null);
    }

    /** Represents an IdentityGetLatestPublicKeysRequest. */
    class IdentityGetLatestPublicKeysRequest implements IIdentityGetLatestPublicKeysRequest {

        /**
         * Constructs a new IdentityGetLatestPublicKeysRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetLatestPublicKeysRequest);

        /** IdentityGetLatestPublicKeysRequest logins. */
        public logins: string[];

        /**
         * Creates a new IdentityGetLatestPublicKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicKeysRequest instance
         */
        public static create(properties?: types.IIdentityGetLatestPublicKeysRequest): types.IdentityGetLatestPublicKeysRequest;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysRequest message. Does not implicitly {@link types.IdentityGetLatestPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetLatestPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysRequest message, length delimited. Does not implicitly {@link types.IdentityGetLatestPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetLatestPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetLatestPublicKeysRequest;

        /**
         * Decodes an IdentityGetLatestPublicKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetLatestPublicKeysRequest;

        /**
         * Verifies an IdentityGetLatestPublicKeysRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetLatestPublicKeysRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetLatestPublicKeysRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetLatestPublicKeysRequest;

        /**
         * Creates a plain object from an IdentityGetLatestPublicKeysRequest message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetLatestPublicKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLatestPublicKeysResponse. */
    interface IIdentityGetLatestPublicKeysResponse {

        /** IdentityGetLatestPublicKeysResponse publicKeys */
        publicKeys?: (types.IIdentityPublicKey[]|null);
    }

    /** Represents an IdentityGetLatestPublicKeysResponse. */
    class IdentityGetLatestPublicKeysResponse implements IIdentityGetLatestPublicKeysResponse {

        /**
         * Constructs a new IdentityGetLatestPublicKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetLatestPublicKeysResponse);

        /** IdentityGetLatestPublicKeysResponse publicKeys. */
        public publicKeys: types.IIdentityPublicKey[];

        /**
         * Creates a new IdentityGetLatestPublicKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicKeysResponse instance
         */
        public static create(properties?: types.IIdentityGetLatestPublicKeysResponse): types.IdentityGetLatestPublicKeysResponse;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysResponse message. Does not implicitly {@link types.IdentityGetLatestPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetLatestPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysResponse message, length delimited. Does not implicitly {@link types.IdentityGetLatestPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetLatestPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetLatestPublicKeysResponse;

        /**
         * Decodes an IdentityGetLatestPublicKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetLatestPublicKeysResponse;

        /**
         * Verifies an IdentityGetLatestPublicKeysResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetLatestPublicKeysResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetLatestPublicKeysResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetLatestPublicKeysResponse;

        /**
         * Creates a plain object from an IdentityGetLatestPublicKeysResponse message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetLatestPublicKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicKeysResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetPublicChainsRequest. */
    interface IIdentityGetPublicChainsRequest {

        /** IdentityGetPublicChainsRequest ids */
        ids?: (types.IdentityGetPublicChainsRequest.IE[]|null);
    }

    /** Represents an IdentityGetPublicChainsRequest. */
    class IdentityGetPublicChainsRequest implements IIdentityGetPublicChainsRequest {

        /**
         * Constructs a new IdentityGetPublicChainsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetPublicChainsRequest);

        /** IdentityGetPublicChainsRequest ids. */
        public ids: types.IdentityGetPublicChainsRequest.IE[];

        /**
         * Creates a new IdentityGetPublicChainsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicChainsRequest instance
         */
        public static create(properties?: types.IIdentityGetPublicChainsRequest): types.IdentityGetPublicChainsRequest;

        /**
         * Encodes the specified IdentityGetPublicChainsRequest message. Does not implicitly {@link types.IdentityGetPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicChainsRequest message, length delimited. Does not implicitly {@link types.IdentityGetPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicChainsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetPublicChainsRequest;

        /**
         * Decodes an IdentityGetPublicChainsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetPublicChainsRequest;

        /**
         * Verifies an IdentityGetPublicChainsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetPublicChainsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetPublicChainsRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetPublicChainsRequest;

        /**
         * Creates a plain object from an IdentityGetPublicChainsRequest message. Also converts values to other types if specified.
         * @param message IdentityGetPublicChainsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetPublicChainsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetPublicChainsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityGetPublicChainsRequest {

        /** Properties of a E. */
        interface IE {

            /** E id */
            id?: (types.IIdentityKeyID|null);

            /** E since */
            since?: (number|null);
        }

        /** Represents a E. */
        class E implements IE {

            /**
             * Constructs a new E.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IdentityGetPublicChainsRequest.IE);

            /** E id. */
            public id?: (types.IIdentityKeyID|null);

            /** E since. */
            public since: number;

            /**
             * Creates a new E instance using the specified properties.
             * @param [properties] Properties to set
             * @returns E instance
             */
            public static create(properties?: types.IdentityGetPublicChainsRequest.IE): types.IdentityGetPublicChainsRequest.E;

            /**
             * Encodes the specified E message. Does not implicitly {@link types.IdentityGetPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: types.IdentityGetPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified E message, length delimited. Does not implicitly {@link types.IdentityGetPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: types.IdentityGetPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a E message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetPublicChainsRequest.E;

            /**
             * Decodes a E message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetPublicChainsRequest.E;

            /**
             * Verifies a E message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a E message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns E
             */
            public static fromObject(object: { [k: string]: any }): types.IdentityGetPublicChainsRequest.E;

            /**
             * Creates a plain object from a E message. Also converts values to other types if specified.
             * @param message E
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: types.IdentityGetPublicChainsRequest.E, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this E to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an IdentityGetPublicChainsResponse. */
    interface IIdentityGetPublicChainsResponse {

        /** IdentityGetPublicChainsResponse chains */
        chains?: (types.IIdentityPublicChain[]|null);
    }

    /** Represents an IdentityGetPublicChainsResponse. */
    class IdentityGetPublicChainsResponse implements IIdentityGetPublicChainsResponse {

        /**
         * Constructs a new IdentityGetPublicChainsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetPublicChainsResponse);

        /** IdentityGetPublicChainsResponse chains. */
        public chains: types.IIdentityPublicChain[];

        /**
         * Creates a new IdentityGetPublicChainsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicChainsResponse instance
         */
        public static create(properties?: types.IIdentityGetPublicChainsResponse): types.IdentityGetPublicChainsResponse;

        /**
         * Encodes the specified IdentityGetPublicChainsResponse message. Does not implicitly {@link types.IdentityGetPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicChainsResponse message, length delimited. Does not implicitly {@link types.IdentityGetPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicChainsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetPublicChainsResponse;

        /**
         * Decodes an IdentityGetPublicChainsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetPublicChainsResponse;

        /**
         * Verifies an IdentityGetPublicChainsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetPublicChainsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetPublicChainsResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetPublicChainsResponse;

        /**
         * Creates a plain object from an IdentityGetPublicChainsResponse message. Also converts values to other types if specified.
         * @param message IdentityGetPublicChainsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetPublicChainsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetPublicChainsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLatestPublicChainsRequest. */
    interface IIdentityGetLatestPublicChainsRequest {

        /** IdentityGetLatestPublicChainsRequest ids */
        ids?: (types.IdentityGetLatestPublicChainsRequest.IE[]|null);
    }

    /** Represents an IdentityGetLatestPublicChainsRequest. */
    class IdentityGetLatestPublicChainsRequest implements IIdentityGetLatestPublicChainsRequest {

        /**
         * Constructs a new IdentityGetLatestPublicChainsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetLatestPublicChainsRequest);

        /** IdentityGetLatestPublicChainsRequest ids. */
        public ids: types.IdentityGetLatestPublicChainsRequest.IE[];

        /**
         * Creates a new IdentityGetLatestPublicChainsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicChainsRequest instance
         */
        public static create(properties?: types.IIdentityGetLatestPublicChainsRequest): types.IdentityGetLatestPublicChainsRequest;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsRequest message. Does not implicitly {@link types.IdentityGetLatestPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetLatestPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsRequest message, length delimited. Does not implicitly {@link types.IdentityGetLatestPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetLatestPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicChainsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetLatestPublicChainsRequest;

        /**
         * Decodes an IdentityGetLatestPublicChainsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetLatestPublicChainsRequest;

        /**
         * Verifies an IdentityGetLatestPublicChainsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetLatestPublicChainsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetLatestPublicChainsRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetLatestPublicChainsRequest;

        /**
         * Creates a plain object from an IdentityGetLatestPublicChainsRequest message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicChainsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetLatestPublicChainsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicChainsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityGetLatestPublicChainsRequest {

        /** Properties of a E. */
        interface IE {

            /** E login */
            login?: (string|null);

            /** E since */
            since?: (number|null);
        }

        /** Represents a E. */
        class E implements IE {

            /**
             * Constructs a new E.
             * @param [properties] Properties to set
             */
            constructor(properties?: types.IdentityGetLatestPublicChainsRequest.IE);

            /** E login. */
            public login: string;

            /** E since. */
            public since: number;

            /**
             * Creates a new E instance using the specified properties.
             * @param [properties] Properties to set
             * @returns E instance
             */
            public static create(properties?: types.IdentityGetLatestPublicChainsRequest.IE): types.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Encodes the specified E message. Does not implicitly {@link types.IdentityGetLatestPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: types.IdentityGetLatestPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified E message, length delimited. Does not implicitly {@link types.IdentityGetLatestPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: types.IdentityGetLatestPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a E message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Decodes a E message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Verifies a E message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a E message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns E
             */
            public static fromObject(object: { [k: string]: any }): types.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Creates a plain object from a E message. Also converts values to other types if specified.
             * @param message E
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: types.IdentityGetLatestPublicChainsRequest.E, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this E to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an IdentityGetLatestPublicChainsResponse. */
    interface IIdentityGetLatestPublicChainsResponse {

        /** IdentityGetLatestPublicChainsResponse chains */
        chains?: (types.IIdentityPublicChain[]|null);
    }

    /** Represents an IdentityGetLatestPublicChainsResponse. */
    class IdentityGetLatestPublicChainsResponse implements IIdentityGetLatestPublicChainsResponse {

        /**
         * Constructs a new IdentityGetLatestPublicChainsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetLatestPublicChainsResponse);

        /** IdentityGetLatestPublicChainsResponse chains. */
        public chains: types.IIdentityPublicChain[];

        /**
         * Creates a new IdentityGetLatestPublicChainsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicChainsResponse instance
         */
        public static create(properties?: types.IIdentityGetLatestPublicChainsResponse): types.IdentityGetLatestPublicChainsResponse;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsResponse message. Does not implicitly {@link types.IdentityGetLatestPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetLatestPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsResponse message, length delimited. Does not implicitly {@link types.IdentityGetLatestPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetLatestPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicChainsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetLatestPublicChainsResponse;

        /**
         * Decodes an IdentityGetLatestPublicChainsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetLatestPublicChainsResponse;

        /**
         * Verifies an IdentityGetLatestPublicChainsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetLatestPublicChainsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetLatestPublicChainsResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetLatestPublicChainsResponse;

        /**
         * Creates a plain object from an IdentityGetLatestPublicChainsResponse message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicChainsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetLatestPublicChainsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicChainsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityShareLink. */
    interface IIdentityShareLink {

        /** IdentityShareLink id */
        id?: (types.IIdentityKeyID|null);

        /** IdentityShareLink kind */
        kind?: (types.IdentityShareKind|null);

        /** IdentityShareLink locked */
        locked?: (boolean|null);
    }

    /** Represents an IdentityShareLink. */
    class IdentityShareLink implements IIdentityShareLink {

        /**
         * Constructs a new IdentityShareLink.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityShareLink);

        /** IdentityShareLink id. */
        public id?: (types.IIdentityKeyID|null);

        /** IdentityShareLink kind. */
        public kind: types.IdentityShareKind;

        /** IdentityShareLink locked. */
        public locked: boolean;

        /**
         * Creates a new IdentityShareLink instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityShareLink instance
         */
        public static create(properties?: types.IIdentityShareLink): types.IdentityShareLink;

        /**
         * Encodes the specified IdentityShareLink message. Does not implicitly {@link types.IdentityShareLink.verify|verify} messages.
         * @param message IdentityShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityShareLink message, length delimited. Does not implicitly {@link types.IdentityShareLink.verify|verify} messages.
         * @param message IdentityShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityShareLink message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityShareLink;

        /**
         * Decodes an IdentityShareLink message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityShareLink;

        /**
         * Verifies an IdentityShareLink message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityShareLink message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityShareLink
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityShareLink;

        /**
         * Creates a plain object from an IdentityShareLink message. Also converts values to other types if specified.
         * @param message IdentityShareLink
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityShareLink, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityShareLink to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetSharingGroupResponse. */
    interface IIdentityGetSharingGroupResponse {

        /** IdentityGetSharingGroupResponse sharingGroup */
        sharingGroup?: (types.IIdentityShareLink[]|null);
    }

    /** Represents an IdentityGetSharingGroupResponse. */
    class IdentityGetSharingGroupResponse implements IIdentityGetSharingGroupResponse {

        /**
         * Constructs a new IdentityGetSharingGroupResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetSharingGroupResponse);

        /** IdentityGetSharingGroupResponse sharingGroup. */
        public sharingGroup: types.IIdentityShareLink[];

        /**
         * Creates a new IdentityGetSharingGroupResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGroupResponse instance
         */
        public static create(properties?: types.IIdentityGetSharingGroupResponse): types.IdentityGetSharingGroupResponse;

        /**
         * Encodes the specified IdentityGetSharingGroupResponse message. Does not implicitly {@link types.IdentityGetSharingGroupResponse.verify|verify} messages.
         * @param message IdentityGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGroupResponse message, length delimited. Does not implicitly {@link types.IdentityGetSharingGroupResponse.verify|verify} messages.
         * @param message IdentityGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGroupResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetSharingGroupResponse;

        /**
         * Decodes an IdentityGetSharingGroupResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetSharingGroupResponse;

        /**
         * Verifies an IdentityGetSharingGroupResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetSharingGroupResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetSharingGroupResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetSharingGroupResponse;

        /**
         * Creates a plain object from an IdentityGetSharingGroupResponse message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGroupResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetSharingGroupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGroupResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetAccessGroupResponse. */
    interface IIdentityGetAccessGroupResponse {

        /** IdentityGetAccessGroupResponse accessGroup */
        accessGroup?: (types.IIdentityShareLink[]|null);
    }

    /** Represents an IdentityGetAccessGroupResponse. */
    class IdentityGetAccessGroupResponse implements IIdentityGetAccessGroupResponse {

        /**
         * Constructs a new IdentityGetAccessGroupResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetAccessGroupResponse);

        /** IdentityGetAccessGroupResponse accessGroup. */
        public accessGroup: types.IIdentityShareLink[];

        /**
         * Creates a new IdentityGetAccessGroupResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetAccessGroupResponse instance
         */
        public static create(properties?: types.IIdentityGetAccessGroupResponse): types.IdentityGetAccessGroupResponse;

        /**
         * Encodes the specified IdentityGetAccessGroupResponse message. Does not implicitly {@link types.IdentityGetAccessGroupResponse.verify|verify} messages.
         * @param message IdentityGetAccessGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetAccessGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetAccessGroupResponse message, length delimited. Does not implicitly {@link types.IdentityGetAccessGroupResponse.verify|verify} messages.
         * @param message IdentityGetAccessGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetAccessGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetAccessGroupResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetAccessGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetAccessGroupResponse;

        /**
         * Decodes an IdentityGetAccessGroupResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetAccessGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetAccessGroupResponse;

        /**
         * Verifies an IdentityGetAccessGroupResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetAccessGroupResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetAccessGroupResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetAccessGroupResponse;

        /**
         * Creates a plain object from an IdentityGetAccessGroupResponse message. Also converts values to other types if specified.
         * @param message IdentityGetAccessGroupResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetAccessGroupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetAccessGroupResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityShareEntry. */
    interface IIdentityShareEntry {

        /** IdentityShareEntry login */
        login?: (string|null);

        /** IdentityShareEntry version */
        version?: (number|null);

        /** IdentityShareEntry nonce */
        nonce?: (Uint8Array|null);

        /** IdentityShareEntry encryptedKey */
        encryptedKey?: (Uint8Array|null);

        /** IdentityShareEntry kind */
        kind?: (types.IdentityShareKind|null);
    }

    /** Represents an IdentityShareEntry. */
    class IdentityShareEntry implements IIdentityShareEntry {

        /**
         * Constructs a new IdentityShareEntry.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityShareEntry);

        /** IdentityShareEntry login. */
        public login: string;

        /** IdentityShareEntry version. */
        public version: number;

        /** IdentityShareEntry nonce. */
        public nonce: Uint8Array;

        /** IdentityShareEntry encryptedKey. */
        public encryptedKey: Uint8Array;

        /** IdentityShareEntry kind. */
        public kind: types.IdentityShareKind;

        /**
         * Creates a new IdentityShareEntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityShareEntry instance
         */
        public static create(properties?: types.IIdentityShareEntry): types.IdentityShareEntry;

        /**
         * Encodes the specified IdentityShareEntry message. Does not implicitly {@link types.IdentityShareEntry.verify|verify} messages.
         * @param message IdentityShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityShareEntry message, length delimited. Does not implicitly {@link types.IdentityShareEntry.verify|verify} messages.
         * @param message IdentityShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityShareEntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityShareEntry;

        /**
         * Decodes an IdentityShareEntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityShareEntry;

        /**
         * Verifies an IdentityShareEntry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityShareEntry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityShareEntry
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityShareEntry;

        /**
         * Creates a plain object from an IdentityShareEntry message. Also converts values to other types if specified.
         * @param message IdentityShareEntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityShareEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityShareEntry to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityShareRequest. */
    interface IIdentityShareRequest {

        /** IdentityShareRequest login */
        login?: (string|null);

        /** IdentityShareRequest version */
        version?: (number|null);

        /** IdentityShareRequest sharingGroup */
        sharingGroup?: (types.IIdentityShareEntry[]|null);
    }

    /** Represents an IdentityShareRequest. */
    class IdentityShareRequest implements IIdentityShareRequest {

        /**
         * Constructs a new IdentityShareRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityShareRequest);

        /** IdentityShareRequest login. */
        public login: string;

        /** IdentityShareRequest version. */
        public version: number;

        /** IdentityShareRequest sharingGroup. */
        public sharingGroup: types.IIdentityShareEntry[];

        /**
         * Creates a new IdentityShareRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityShareRequest instance
         */
        public static create(properties?: types.IIdentityShareRequest): types.IdentityShareRequest;

        /**
         * Encodes the specified IdentityShareRequest message. Does not implicitly {@link types.IdentityShareRequest.verify|verify} messages.
         * @param message IdentityShareRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityShareRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityShareRequest message, length delimited. Does not implicitly {@link types.IdentityShareRequest.verify|verify} messages.
         * @param message IdentityShareRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityShareRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityShareRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityShareRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityShareRequest;

        /**
         * Decodes an IdentityShareRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityShareRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityShareRequest;

        /**
         * Verifies an IdentityShareRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityShareRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityShareRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityShareRequest;

        /**
         * Creates a plain object from an IdentityShareRequest message. Also converts values to other types if specified.
         * @param message IdentityShareRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityShareRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityShareRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetEncryptionResponse. */
    interface IIdentityGetEncryptionResponse {

        /** IdentityGetEncryptionResponse encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** IdentityGetEncryptionResponse creator */
        creator?: (types.IIdentityPublicKey|null);
    }

    /** Represents an IdentityGetEncryptionResponse. */
    class IdentityGetEncryptionResponse implements IIdentityGetEncryptionResponse {

        /**
         * Constructs a new IdentityGetEncryptionResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetEncryptionResponse);

        /** IdentityGetEncryptionResponse encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** IdentityGetEncryptionResponse creator. */
        public creator?: (types.IIdentityPublicKey|null);

        /**
         * Creates a new IdentityGetEncryptionResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetEncryptionResponse instance
         */
        public static create(properties?: types.IIdentityGetEncryptionResponse): types.IdentityGetEncryptionResponse;

        /**
         * Encodes the specified IdentityGetEncryptionResponse message. Does not implicitly {@link types.IdentityGetEncryptionResponse.verify|verify} messages.
         * @param message IdentityGetEncryptionResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetEncryptionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetEncryptionResponse message, length delimited. Does not implicitly {@link types.IdentityGetEncryptionResponse.verify|verify} messages.
         * @param message IdentityGetEncryptionResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetEncryptionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetEncryptionResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetEncryptionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetEncryptionResponse;

        /**
         * Decodes an IdentityGetEncryptionResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetEncryptionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetEncryptionResponse;

        /**
         * Verifies an IdentityGetEncryptionResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetEncryptionResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetEncryptionResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetEncryptionResponse;

        /**
         * Creates a plain object from an IdentityGetEncryptionResponse message. Also converts values to other types if specified.
         * @param message IdentityGetEncryptionResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetEncryptionResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetEncryptionResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetKeysToRenewResponse. */
    interface IIdentityGetKeysToRenewResponse {

        /** IdentityGetKeysToRenewResponse encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** IdentityGetKeysToRenewResponse creator */
        creator?: (types.IIdentityPublicKey|null);

        /** IdentityGetKeysToRenewResponse sharingGroup */
        sharingGroup?: (types.IIdentityPublicKey[]|null);
    }

    /** Represents an IdentityGetKeysToRenewResponse. */
    class IdentityGetKeysToRenewResponse implements IIdentityGetKeysToRenewResponse {

        /**
         * Constructs a new IdentityGetKeysToRenewResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetKeysToRenewResponse);

        /** IdentityGetKeysToRenewResponse encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** IdentityGetKeysToRenewResponse creator. */
        public creator?: (types.IIdentityPublicKey|null);

        /** IdentityGetKeysToRenewResponse sharingGroup. */
        public sharingGroup: types.IIdentityPublicKey[];

        /**
         * Creates a new IdentityGetKeysToRenewResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetKeysToRenewResponse instance
         */
        public static create(properties?: types.IIdentityGetKeysToRenewResponse): types.IdentityGetKeysToRenewResponse;

        /**
         * Encodes the specified IdentityGetKeysToRenewResponse message. Does not implicitly {@link types.IdentityGetKeysToRenewResponse.verify|verify} messages.
         * @param message IdentityGetKeysToRenewResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetKeysToRenewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetKeysToRenewResponse message, length delimited. Does not implicitly {@link types.IdentityGetKeysToRenewResponse.verify|verify} messages.
         * @param message IdentityGetKeysToRenewResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetKeysToRenewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetKeysToRenewResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetKeysToRenewResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetKeysToRenewResponse;

        /**
         * Decodes an IdentityGetKeysToRenewResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetKeysToRenewResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetKeysToRenewResponse;

        /**
         * Verifies an IdentityGetKeysToRenewResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetKeysToRenewResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetKeysToRenewResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetKeysToRenewResponse;

        /**
         * Creates a plain object from an IdentityGetKeysToRenewResponse message. Also converts values to other types if specified.
         * @param message IdentityGetKeysToRenewResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetKeysToRenewResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetKeysToRenewResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityBackwardKey. */
    interface IIdentityBackwardKey {

        /** IdentityBackwardKey nonce */
        nonce?: (Uint8Array|null);

        /** IdentityBackwardKey encryptedKey */
        encryptedKey?: (Uint8Array|null);
    }

    /** Represents an IdentityBackwardKey. */
    class IdentityBackwardKey implements IIdentityBackwardKey {

        /**
         * Constructs a new IdentityBackwardKey.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityBackwardKey);

        /** IdentityBackwardKey nonce. */
        public nonce: Uint8Array;

        /** IdentityBackwardKey encryptedKey. */
        public encryptedKey: Uint8Array;

        /**
         * Creates a new IdentityBackwardKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityBackwardKey instance
         */
        public static create(properties?: types.IIdentityBackwardKey): types.IdentityBackwardKey;

        /**
         * Encodes the specified IdentityBackwardKey message. Does not implicitly {@link types.IdentityBackwardKey.verify|verify} messages.
         * @param message IdentityBackwardKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityBackwardKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityBackwardKey message, length delimited. Does not implicitly {@link types.IdentityBackwardKey.verify|verify} messages.
         * @param message IdentityBackwardKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityBackwardKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityBackwardKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityBackwardKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityBackwardKey;

        /**
         * Decodes an IdentityBackwardKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityBackwardKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityBackwardKey;

        /**
         * Verifies an IdentityBackwardKey message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityBackwardKey message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityBackwardKey
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityBackwardKey;

        /**
         * Creates a plain object from an IdentityBackwardKey message. Also converts values to other types if specified.
         * @param message IdentityBackwardKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityBackwardKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityBackwardKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPostKeysToRenewRequest. */
    interface IIdentityPostKeysToRenewRequest {

        /** IdentityPostKeysToRenewRequest login */
        login?: (string|null);

        /** IdentityPostKeysToRenewRequest encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** IdentityPostKeysToRenewRequest signChain */
        signChain?: (Uint8Array|null);

        /** IdentityPostKeysToRenewRequest sharingGroup */
        sharingGroup?: (types.IIdentityShareEntry[]|null);

        /** IdentityPostKeysToRenewRequest backward */
        backward?: (types.IIdentityBackwardKey|null);
    }

    /** Represents an IdentityPostKeysToRenewRequest. */
    class IdentityPostKeysToRenewRequest implements IIdentityPostKeysToRenewRequest {

        /**
         * Constructs a new IdentityPostKeysToRenewRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityPostKeysToRenewRequest);

        /** IdentityPostKeysToRenewRequest login. */
        public login: string;

        /** IdentityPostKeysToRenewRequest encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** IdentityPostKeysToRenewRequest signChain. */
        public signChain: Uint8Array;

        /** IdentityPostKeysToRenewRequest sharingGroup. */
        public sharingGroup: types.IIdentityShareEntry[];

        /** IdentityPostKeysToRenewRequest backward. */
        public backward?: (types.IIdentityBackwardKey|null);

        /**
         * Creates a new IdentityPostKeysToRenewRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPostKeysToRenewRequest instance
         */
        public static create(properties?: types.IIdentityPostKeysToRenewRequest): types.IdentityPostKeysToRenewRequest;

        /**
         * Encodes the specified IdentityPostKeysToRenewRequest message. Does not implicitly {@link types.IdentityPostKeysToRenewRequest.verify|verify} messages.
         * @param message IdentityPostKeysToRenewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityPostKeysToRenewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPostKeysToRenewRequest message, length delimited. Does not implicitly {@link types.IdentityPostKeysToRenewRequest.verify|verify} messages.
         * @param message IdentityPostKeysToRenewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityPostKeysToRenewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPostKeysToRenewRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPostKeysToRenewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPostKeysToRenewRequest;

        /**
         * Decodes an IdentityPostKeysToRenewRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPostKeysToRenewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPostKeysToRenewRequest;

        /**
         * Verifies an IdentityPostKeysToRenewRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPostKeysToRenewRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPostKeysToRenewRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityPostKeysToRenewRequest;

        /**
         * Creates a plain object from an IdentityPostKeysToRenewRequest message. Also converts values to other types if specified.
         * @param message IdentityPostKeysToRenewRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityPostKeysToRenewRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPostKeysToRenewRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetSharingGraphElement. */
    interface IIdentityGetSharingGraphElement {

        /** IdentityGetSharingGraphElement login */
        login?: (string|null);

        /** IdentityGetSharingGraphElement version */
        version?: (number|null);

        /** IdentityGetSharingGraphElement masterPublicKey */
        masterPublicKey?: (Uint8Array|null);

        /** IdentityGetSharingGraphElement sharingKey */
        sharingKey?: (types.ICipher|null);

        /** IdentityGetSharingGraphElement boxKey */
        boxKey?: (types.ICipher|null);

        /** IdentityGetSharingGraphElement signKey */
        signKey?: (types.ICipher|null);

        /** IdentityGetSharingGraphElement sharingGroup */
        sharingGroup?: (types.IIdentityPublicKey[]|null);

        /** IdentityGetSharingGraphElement sharedFrom */
        sharedFrom?: (types.IIdentityKeyID|null);

        /** IdentityGetSharingGraphElement latest */
        latest?: (boolean|null);
    }

    /** Represents an IdentityGetSharingGraphElement. */
    class IdentityGetSharingGraphElement implements IIdentityGetSharingGraphElement {

        /**
         * Constructs a new IdentityGetSharingGraphElement.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetSharingGraphElement);

        /** IdentityGetSharingGraphElement login. */
        public login: string;

        /** IdentityGetSharingGraphElement version. */
        public version: number;

        /** IdentityGetSharingGraphElement masterPublicKey. */
        public masterPublicKey: Uint8Array;

        /** IdentityGetSharingGraphElement sharingKey. */
        public sharingKey?: (types.ICipher|null);

        /** IdentityGetSharingGraphElement boxKey. */
        public boxKey?: (types.ICipher|null);

        /** IdentityGetSharingGraphElement signKey. */
        public signKey?: (types.ICipher|null);

        /** IdentityGetSharingGraphElement sharingGroup. */
        public sharingGroup: types.IIdentityPublicKey[];

        /** IdentityGetSharingGraphElement sharedFrom. */
        public sharedFrom?: (types.IIdentityKeyID|null);

        /** IdentityGetSharingGraphElement latest. */
        public latest: boolean;

        /**
         * Creates a new IdentityGetSharingGraphElement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGraphElement instance
         */
        public static create(properties?: types.IIdentityGetSharingGraphElement): types.IdentityGetSharingGraphElement;

        /**
         * Encodes the specified IdentityGetSharingGraphElement message. Does not implicitly {@link types.IdentityGetSharingGraphElement.verify|verify} messages.
         * @param message IdentityGetSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGraphElement message, length delimited. Does not implicitly {@link types.IdentityGetSharingGraphElement.verify|verify} messages.
         * @param message IdentityGetSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGraphElement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetSharingGraphElement;

        /**
         * Decodes an IdentityGetSharingGraphElement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetSharingGraphElement;

        /**
         * Verifies an IdentityGetSharingGraphElement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetSharingGraphElement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetSharingGraphElement
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetSharingGraphElement;

        /**
         * Creates a plain object from an IdentityGetSharingGraphElement message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGraphElement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetSharingGraphElement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGraphElement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetSharingGraphResponse. */
    interface IIdentityGetSharingGraphResponse {

        /** IdentityGetSharingGraphResponse graph */
        graph?: (types.IIdentityGetSharingGraphElement[]|null);
    }

    /** Represents an IdentityGetSharingGraphResponse. */
    class IdentityGetSharingGraphResponse implements IIdentityGetSharingGraphResponse {

        /**
         * Constructs a new IdentityGetSharingGraphResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityGetSharingGraphResponse);

        /** IdentityGetSharingGraphResponse graph. */
        public graph: types.IIdentityGetSharingGraphElement[];

        /**
         * Creates a new IdentityGetSharingGraphResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGraphResponse instance
         */
        public static create(properties?: types.IIdentityGetSharingGraphResponse): types.IdentityGetSharingGraphResponse;

        /**
         * Encodes the specified IdentityGetSharingGraphResponse message. Does not implicitly {@link types.IdentityGetSharingGraphResponse.verify|verify} messages.
         * @param message IdentityGetSharingGraphResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityGetSharingGraphResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGraphResponse message, length delimited. Does not implicitly {@link types.IdentityGetSharingGraphResponse.verify|verify} messages.
         * @param message IdentityGetSharingGraphResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityGetSharingGraphResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGraphResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGraphResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityGetSharingGraphResponse;

        /**
         * Decodes an IdentityGetSharingGraphResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGraphResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityGetSharingGraphResponse;

        /**
         * Verifies an IdentityGetSharingGraphResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetSharingGraphResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetSharingGraphResponse
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityGetSharingGraphResponse;

        /**
         * Creates a plain object from an IdentityGetSharingGraphResponse message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGraphResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityGetSharingGraphResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGraphResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPostSharingGraphElement. */
    interface IIdentityPostSharingGraphElement {

        /** IdentityPostSharingGraphElement login */
        login?: (string|null);

        /** IdentityPostSharingGraphElement version */
        version?: (number|null);

        /** IdentityPostSharingGraphElement signChain */
        signChain?: (Uint8Array|null);

        /** IdentityPostSharingGraphElement sharingGroup */
        sharingGroup?: (types.IIdentityShareEntry[]|null);

        /** IdentityPostSharingGraphElement backward */
        backward?: (types.IIdentityBackwardKey|null);

        /** IdentityPostSharingGraphElement encryption */
        encryption?: (types.IIdentityEncryption|null);
    }

    /** Represents an IdentityPostSharingGraphElement. */
    class IdentityPostSharingGraphElement implements IIdentityPostSharingGraphElement {

        /**
         * Constructs a new IdentityPostSharingGraphElement.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityPostSharingGraphElement);

        /** IdentityPostSharingGraphElement login. */
        public login: string;

        /** IdentityPostSharingGraphElement version. */
        public version: number;

        /** IdentityPostSharingGraphElement signChain. */
        public signChain: Uint8Array;

        /** IdentityPostSharingGraphElement sharingGroup. */
        public sharingGroup: types.IIdentityShareEntry[];

        /** IdentityPostSharingGraphElement backward. */
        public backward?: (types.IIdentityBackwardKey|null);

        /** IdentityPostSharingGraphElement encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /**
         * Creates a new IdentityPostSharingGraphElement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPostSharingGraphElement instance
         */
        public static create(properties?: types.IIdentityPostSharingGraphElement): types.IdentityPostSharingGraphElement;

        /**
         * Encodes the specified IdentityPostSharingGraphElement message. Does not implicitly {@link types.IdentityPostSharingGraphElement.verify|verify} messages.
         * @param message IdentityPostSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityPostSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPostSharingGraphElement message, length delimited. Does not implicitly {@link types.IdentityPostSharingGraphElement.verify|verify} messages.
         * @param message IdentityPostSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityPostSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPostSharingGraphElement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPostSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPostSharingGraphElement;

        /**
         * Decodes an IdentityPostSharingGraphElement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPostSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPostSharingGraphElement;

        /**
         * Verifies an IdentityPostSharingGraphElement message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPostSharingGraphElement message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPostSharingGraphElement
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityPostSharingGraphElement;

        /**
         * Creates a plain object from an IdentityPostSharingGraphElement message. Also converts values to other types if specified.
         * @param message IdentityPostSharingGraphElement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityPostSharingGraphElement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPostSharingGraphElement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPostSharingGraphRequest. */
    interface IIdentityPostSharingGraphRequest {

        /** IdentityPostSharingGraphRequest login */
        login?: (string|null);

        /** IdentityPostSharingGraphRequest graph */
        graph?: (types.IIdentityPostSharingGraphElement[]|null);
    }

    /** Represents an IdentityPostSharingGraphRequest. */
    class IdentityPostSharingGraphRequest implements IIdentityPostSharingGraphRequest {

        /**
         * Constructs a new IdentityPostSharingGraphRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityPostSharingGraphRequest);

        /** IdentityPostSharingGraphRequest login. */
        public login: string;

        /** IdentityPostSharingGraphRequest graph. */
        public graph: types.IIdentityPostSharingGraphElement[];

        /**
         * Creates a new IdentityPostSharingGraphRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPostSharingGraphRequest instance
         */
        public static create(properties?: types.IIdentityPostSharingGraphRequest): types.IdentityPostSharingGraphRequest;

        /**
         * Encodes the specified IdentityPostSharingGraphRequest message. Does not implicitly {@link types.IdentityPostSharingGraphRequest.verify|verify} messages.
         * @param message IdentityPostSharingGraphRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityPostSharingGraphRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPostSharingGraphRequest message, length delimited. Does not implicitly {@link types.IdentityPostSharingGraphRequest.verify|verify} messages.
         * @param message IdentityPostSharingGraphRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityPostSharingGraphRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPostSharingGraphRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPostSharingGraphRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityPostSharingGraphRequest;

        /**
         * Decodes an IdentityPostSharingGraphRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPostSharingGraphRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityPostSharingGraphRequest;

        /**
         * Verifies an IdentityPostSharingGraphRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPostSharingGraphRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPostSharingGraphRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityPostSharingGraphRequest;

        /**
         * Creates a plain object from an IdentityPostSharingGraphRequest message. Also converts values to other types if specified.
         * @param message IdentityPostSharingGraphRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityPostSharingGraphRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPostSharingGraphRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityToggleActiveStatusRequest. */
    interface IIdentityToggleActiveStatusRequest {

        /** IdentityToggleActiveStatusRequest login */
        login?: (string|null);

        /** IdentityToggleActiveStatusRequest active */
        active?: (boolean|null);
    }

    /** Represents an IdentityToggleActiveStatusRequest. */
    class IdentityToggleActiveStatusRequest implements IIdentityToggleActiveStatusRequest {

        /**
         * Constructs a new IdentityToggleActiveStatusRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IIdentityToggleActiveStatusRequest);

        /** IdentityToggleActiveStatusRequest login. */
        public login: string;

        /** IdentityToggleActiveStatusRequest active. */
        public active: boolean;

        /**
         * Creates a new IdentityToggleActiveStatusRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityToggleActiveStatusRequest instance
         */
        public static create(properties?: types.IIdentityToggleActiveStatusRequest): types.IdentityToggleActiveStatusRequest;

        /**
         * Encodes the specified IdentityToggleActiveStatusRequest message. Does not implicitly {@link types.IdentityToggleActiveStatusRequest.verify|verify} messages.
         * @param message IdentityToggleActiveStatusRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IIdentityToggleActiveStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityToggleActiveStatusRequest message, length delimited. Does not implicitly {@link types.IdentityToggleActiveStatusRequest.verify|verify} messages.
         * @param message IdentityToggleActiveStatusRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IIdentityToggleActiveStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityToggleActiveStatusRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityToggleActiveStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.IdentityToggleActiveStatusRequest;

        /**
         * Decodes an IdentityToggleActiveStatusRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityToggleActiveStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.IdentityToggleActiveStatusRequest;

        /**
         * Verifies an IdentityToggleActiveStatusRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityToggleActiveStatusRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityToggleActiveStatusRequest
         */
        public static fromObject(object: { [k: string]: any }): types.IdentityToggleActiveStatusRequest;

        /**
         * Creates a plain object from an IdentityToggleActiveStatusRequest message. Also converts values to other types if specified.
         * @param message IdentityToggleActiveStatusRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.IdentityToggleActiveStatusRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityToggleActiveStatusRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** SessionSaltKind enum. */
    enum SessionSaltKind {
        TIME = 0,
        RAND = 1
    }

    /** Properties of a SessionCreateChallengeRequest. */
    interface ISessionCreateChallengeRequest {

        /** SessionCreateChallengeRequest login */
        login?: (string|null);

        /** SessionCreateChallengeRequest saltKind */
        saltKind?: (types.SessionSaltKind|null);
    }

    /** Represents a SessionCreateChallengeRequest. */
    class SessionCreateChallengeRequest implements ISessionCreateChallengeRequest {

        /**
         * Constructs a new SessionCreateChallengeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionCreateChallengeRequest);

        /** SessionCreateChallengeRequest login. */
        public login: string;

        /** SessionCreateChallengeRequest saltKind. */
        public saltKind: types.SessionSaltKind;

        /**
         * Creates a new SessionCreateChallengeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionCreateChallengeRequest instance
         */
        public static create(properties?: types.ISessionCreateChallengeRequest): types.SessionCreateChallengeRequest;

        /**
         * Encodes the specified SessionCreateChallengeRequest message. Does not implicitly {@link types.SessionCreateChallengeRequest.verify|verify} messages.
         * @param message SessionCreateChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionCreateChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionCreateChallengeRequest message, length delimited. Does not implicitly {@link types.SessionCreateChallengeRequest.verify|verify} messages.
         * @param message SessionCreateChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionCreateChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionCreateChallengeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionCreateChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionCreateChallengeRequest;

        /**
         * Decodes a SessionCreateChallengeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionCreateChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionCreateChallengeRequest;

        /**
         * Verifies a SessionCreateChallengeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionCreateChallengeRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionCreateChallengeRequest
         */
        public static fromObject(object: { [k: string]: any }): types.SessionCreateChallengeRequest;

        /**
         * Creates a plain object from a SessionCreateChallengeRequest message. Also converts values to other types if specified.
         * @param message SessionCreateChallengeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionCreateChallengeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionCreateChallengeRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionCreateChallengeResponse. */
    interface ISessionCreateChallengeResponse {

        /** SessionCreateChallengeResponse salt */
        salt?: (Uint8Array|null);

        /** SessionCreateChallengeResponse token */
        token?: (Uint8Array|null);

        /** SessionCreateChallengeResponse encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** SessionCreateChallengeResponse creator */
        creator?: (types.IIdentityPublicKey|null);

        /** SessionCreateChallengeResponse saltKind */
        saltKind?: (types.SessionSaltKind|null);
    }

    /** Represents a SessionCreateChallengeResponse. */
    class SessionCreateChallengeResponse implements ISessionCreateChallengeResponse {

        /**
         * Constructs a new SessionCreateChallengeResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionCreateChallengeResponse);

        /** SessionCreateChallengeResponse salt. */
        public salt: Uint8Array;

        /** SessionCreateChallengeResponse token. */
        public token: Uint8Array;

        /** SessionCreateChallengeResponse encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** SessionCreateChallengeResponse creator. */
        public creator?: (types.IIdentityPublicKey|null);

        /** SessionCreateChallengeResponse saltKind. */
        public saltKind: types.SessionSaltKind;

        /**
         * Creates a new SessionCreateChallengeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionCreateChallengeResponse instance
         */
        public static create(properties?: types.ISessionCreateChallengeResponse): types.SessionCreateChallengeResponse;

        /**
         * Encodes the specified SessionCreateChallengeResponse message. Does not implicitly {@link types.SessionCreateChallengeResponse.verify|verify} messages.
         * @param message SessionCreateChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionCreateChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionCreateChallengeResponse message, length delimited. Does not implicitly {@link types.SessionCreateChallengeResponse.verify|verify} messages.
         * @param message SessionCreateChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionCreateChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionCreateChallengeResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionCreateChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionCreateChallengeResponse;

        /**
         * Decodes a SessionCreateChallengeResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionCreateChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionCreateChallengeResponse;

        /**
         * Verifies a SessionCreateChallengeResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionCreateChallengeResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionCreateChallengeResponse
         */
        public static fromObject(object: { [k: string]: any }): types.SessionCreateChallengeResponse;

        /**
         * Creates a plain object from a SessionCreateChallengeResponse message. Also converts values to other types if specified.
         * @param message SessionCreateChallengeResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionCreateChallengeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionCreateChallengeResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionResolveChallengeRequest. */
    interface ISessionResolveChallengeRequest {

        /** SessionResolveChallengeRequest token */
        token?: (Uint8Array|null);

        /** SessionResolveChallengeRequest signature */
        signature?: (Uint8Array|null);

        /** SessionResolveChallengeRequest salt */
        salt?: (Uint8Array|null);
    }

    /** Represents a SessionResolveChallengeRequest. */
    class SessionResolveChallengeRequest implements ISessionResolveChallengeRequest {

        /**
         * Constructs a new SessionResolveChallengeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionResolveChallengeRequest);

        /** SessionResolveChallengeRequest token. */
        public token: Uint8Array;

        /** SessionResolveChallengeRequest signature. */
        public signature: Uint8Array;

        /** SessionResolveChallengeRequest salt. */
        public salt: Uint8Array;

        /**
         * Creates a new SessionResolveChallengeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionResolveChallengeRequest instance
         */
        public static create(properties?: types.ISessionResolveChallengeRequest): types.SessionResolveChallengeRequest;

        /**
         * Encodes the specified SessionResolveChallengeRequest message. Does not implicitly {@link types.SessionResolveChallengeRequest.verify|verify} messages.
         * @param message SessionResolveChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionResolveChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionResolveChallengeRequest message, length delimited. Does not implicitly {@link types.SessionResolveChallengeRequest.verify|verify} messages.
         * @param message SessionResolveChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionResolveChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionResolveChallengeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionResolveChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionResolveChallengeRequest;

        /**
         * Decodes a SessionResolveChallengeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionResolveChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionResolveChallengeRequest;

        /**
         * Verifies a SessionResolveChallengeRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionResolveChallengeRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionResolveChallengeRequest
         */
        public static fromObject(object: { [k: string]: any }): types.SessionResolveChallengeRequest;

        /**
         * Creates a plain object from a SessionResolveChallengeRequest message. Also converts values to other types if specified.
         * @param message SessionResolveChallengeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionResolveChallengeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionResolveChallengeRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionResolveChallengeResponse. */
    interface ISessionResolveChallengeResponse {

        /** SessionResolveChallengeResponse salt */
        salt?: (Uint8Array|null);

        /** SessionResolveChallengeResponse login */
        login?: (string|null);
    }

    /** Represents a SessionResolveChallengeResponse. */
    class SessionResolveChallengeResponse implements ISessionResolveChallengeResponse {

        /**
         * Constructs a new SessionResolveChallengeResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionResolveChallengeResponse);

        /** SessionResolveChallengeResponse salt. */
        public salt: Uint8Array;

        /** SessionResolveChallengeResponse login. */
        public login: string;

        /**
         * Creates a new SessionResolveChallengeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionResolveChallengeResponse instance
         */
        public static create(properties?: types.ISessionResolveChallengeResponse): types.SessionResolveChallengeResponse;

        /**
         * Encodes the specified SessionResolveChallengeResponse message. Does not implicitly {@link types.SessionResolveChallengeResponse.verify|verify} messages.
         * @param message SessionResolveChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionResolveChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionResolveChallengeResponse message, length delimited. Does not implicitly {@link types.SessionResolveChallengeResponse.verify|verify} messages.
         * @param message SessionResolveChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionResolveChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionResolveChallengeResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionResolveChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionResolveChallengeResponse;

        /**
         * Decodes a SessionResolveChallengeResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionResolveChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionResolveChallengeResponse;

        /**
         * Verifies a SessionResolveChallengeResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionResolveChallengeResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionResolveChallengeResponse
         */
        public static fromObject(object: { [k: string]: any }): types.SessionResolveChallengeResponse;

        /**
         * Creates a plain object from a SessionResolveChallengeResponse message. Also converts values to other types if specified.
         * @param message SessionResolveChallengeResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionResolveChallengeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionResolveChallengeResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionSetSecretRequest. */
    interface ISessionSetSecretRequest {

        /** SessionSetSecretRequest masterSalt */
        masterSalt?: (Uint8Array|null);

        /** SessionSetSecretRequest sharingEncrypted */
        sharingEncrypted?: (types.IIdentityEncryptedKey|null);
    }

    /** Represents a SessionSetSecretRequest. */
    class SessionSetSecretRequest implements ISessionSetSecretRequest {

        /**
         * Constructs a new SessionSetSecretRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionSetSecretRequest);

        /** SessionSetSecretRequest masterSalt. */
        public masterSalt: Uint8Array;

        /** SessionSetSecretRequest sharingEncrypted. */
        public sharingEncrypted?: (types.IIdentityEncryptedKey|null);

        /**
         * Creates a new SessionSetSecretRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionSetSecretRequest instance
         */
        public static create(properties?: types.ISessionSetSecretRequest): types.SessionSetSecretRequest;

        /**
         * Encodes the specified SessionSetSecretRequest message. Does not implicitly {@link types.SessionSetSecretRequest.verify|verify} messages.
         * @param message SessionSetSecretRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionSetSecretRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionSetSecretRequest message, length delimited. Does not implicitly {@link types.SessionSetSecretRequest.verify|verify} messages.
         * @param message SessionSetSecretRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionSetSecretRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionSetSecretRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionSetSecretRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionSetSecretRequest;

        /**
         * Decodes a SessionSetSecretRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionSetSecretRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionSetSecretRequest;

        /**
         * Verifies a SessionSetSecretRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionSetSecretRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionSetSecretRequest
         */
        public static fromObject(object: { [k: string]: any }): types.SessionSetSecretRequest;

        /**
         * Creates a plain object from a SessionSetSecretRequest message. Also converts values to other types if specified.
         * @param message SessionSetSecretRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionSetSecretRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionSetSecretRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionUnStaleResponse. */
    interface ISessionUnStaleResponse {

        /** SessionUnStaleResponse encryption */
        encryption?: (types.IIdentityEncryption|null);

        /** SessionUnStaleResponse creator */
        creator?: (types.IIdentityPublicKey|null);
    }

    /** Represents a SessionUnStaleResponse. */
    class SessionUnStaleResponse implements ISessionUnStaleResponse {

        /**
         * Constructs a new SessionUnStaleResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionUnStaleResponse);

        /** SessionUnStaleResponse encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /** SessionUnStaleResponse creator. */
        public creator?: (types.IIdentityPublicKey|null);

        /**
         * Creates a new SessionUnStaleResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionUnStaleResponse instance
         */
        public static create(properties?: types.ISessionUnStaleResponse): types.SessionUnStaleResponse;

        /**
         * Encodes the specified SessionUnStaleResponse message. Does not implicitly {@link types.SessionUnStaleResponse.verify|verify} messages.
         * @param message SessionUnStaleResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionUnStaleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionUnStaleResponse message, length delimited. Does not implicitly {@link types.SessionUnStaleResponse.verify|verify} messages.
         * @param message SessionUnStaleResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionUnStaleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionUnStaleResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionUnStaleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionUnStaleResponse;

        /**
         * Decodes a SessionUnStaleResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionUnStaleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionUnStaleResponse;

        /**
         * Verifies a SessionUnStaleResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionUnStaleResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionUnStaleResponse
         */
        public static fromObject(object: { [k: string]: any }): types.SessionUnStaleResponse;

        /**
         * Creates a plain object from a SessionUnStaleResponse message. Also converts values to other types if specified.
         * @param message SessionUnStaleResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionUnStaleResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionUnStaleResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionAuthenticateResponse. */
    interface ISessionAuthenticateResponse {

        /** SessionAuthenticateResponse ownerLogin */
        ownerLogin?: (string|null);

        /** SessionAuthenticateResponse assumeLogin */
        assumeLogin?: (string|null);

        /** SessionAuthenticateResponse assumeKind */
        assumeKind?: (types.IdentityAccessKeyKind|null);
    }

    /** Represents a SessionAuthenticateResponse. */
    class SessionAuthenticateResponse implements ISessionAuthenticateResponse {

        /**
         * Constructs a new SessionAuthenticateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ISessionAuthenticateResponse);

        /** SessionAuthenticateResponse ownerLogin. */
        public ownerLogin: string;

        /** SessionAuthenticateResponse assumeLogin. */
        public assumeLogin: string;

        /** SessionAuthenticateResponse assumeKind. */
        public assumeKind: types.IdentityAccessKeyKind;

        /**
         * Creates a new SessionAuthenticateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionAuthenticateResponse instance
         */
        public static create(properties?: types.ISessionAuthenticateResponse): types.SessionAuthenticateResponse;

        /**
         * Encodes the specified SessionAuthenticateResponse message. Does not implicitly {@link types.SessionAuthenticateResponse.verify|verify} messages.
         * @param message SessionAuthenticateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ISessionAuthenticateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionAuthenticateResponse message, length delimited. Does not implicitly {@link types.SessionAuthenticateResponse.verify|verify} messages.
         * @param message SessionAuthenticateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ISessionAuthenticateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionAuthenticateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionAuthenticateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.SessionAuthenticateResponse;

        /**
         * Decodes a SessionAuthenticateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionAuthenticateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.SessionAuthenticateResponse;

        /**
         * Verifies a SessionAuthenticateResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SessionAuthenticateResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SessionAuthenticateResponse
         */
        public static fromObject(object: { [k: string]: any }): types.SessionAuthenticateResponse;

        /**
         * Creates a plain object from a SessionAuthenticateResponse message. Also converts values to other types if specified.
         * @param message SessionAuthenticateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.SessionAuthenticateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionAuthenticateResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** ResourceType enum. */
    enum ResourceType {
        ANONYMOUS = 0,
        SES = 1
    }

    /** ResourceAccessReason enum. */
    enum ResourceAccessReason {
        UNKOWN = 0,
        READ_ACCESS = 1,
        SHARE_ACCESS = 2,
        CUSTOM_ACCESS = 3
    }

    /** Properties of a Resource. */
    interface IResource {

        /** Resource id */
        id?: (number|Long|null);

        /** Resource kind */
        kind?: (string|null);

        /** Resource publicKey */
        publicKey?: (Uint8Array|null);

        /** Resource nonce */
        nonce?: (Uint8Array|null);

        /** Resource created */
        created?: (number|Long|null);

        /** Resource payload */
        payload?: (Uint8Array|null);

        /** Resource type */
        type?: (types.ResourceType|null);
    }

    /** Represents a Resource. */
    class Resource implements IResource {

        /**
         * Constructs a new Resource.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResource);

        /** Resource id. */
        public id: (number|Long);

        /** Resource kind. */
        public kind: string;

        /** Resource publicKey. */
        public publicKey: Uint8Array;

        /** Resource nonce. */
        public nonce: Uint8Array;

        /** Resource created. */
        public created: (number|Long);

        /** Resource payload. */
        public payload: Uint8Array;

        /** Resource type. */
        public type: types.ResourceType;

        /**
         * Creates a new Resource instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Resource instance
         */
        public static create(properties?: types.IResource): types.Resource;

        /**
         * Encodes the specified Resource message. Does not implicitly {@link types.Resource.verify|verify} messages.
         * @param message Resource message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResource, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Resource message, length delimited. Does not implicitly {@link types.Resource.verify|verify} messages.
         * @param message Resource message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResource, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Resource message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Resource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.Resource;

        /**
         * Decodes a Resource message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Resource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.Resource;

        /**
         * Verifies a Resource message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Resource message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Resource
         */
        public static fromObject(object: { [k: string]: any }): types.Resource;

        /**
         * Creates a plain object from a Resource message. Also converts values to other types if specified.
         * @param message Resource
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.Resource, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Resource to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetResponse. */
    interface IResourceGetResponse {

        /** ResourceGetResponse resource */
        resource?: (types.IResource|null);

        /** ResourceGetResponse creator */
        creator?: (types.IIdentityKeyID|null);

        /** ResourceGetResponse encryptedKey */
        encryptedKey?: (types.ICipher[]|null);
    }

    /** Represents a ResourceGetResponse. */
    class ResourceGetResponse implements IResourceGetResponse {

        /**
         * Constructs a new ResourceGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceGetResponse);

        /** ResourceGetResponse resource. */
        public resource?: (types.IResource|null);

        /** ResourceGetResponse creator. */
        public creator?: (types.IIdentityKeyID|null);

        /** ResourceGetResponse encryptedKey. */
        public encryptedKey: types.ICipher[];

        /**
         * Creates a new ResourceGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetResponse instance
         */
        public static create(properties?: types.IResourceGetResponse): types.ResourceGetResponse;

        /**
         * Encodes the specified ResourceGetResponse message. Does not implicitly {@link types.ResourceGetResponse.verify|verify} messages.
         * @param message ResourceGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetResponse message, length delimited. Does not implicitly {@link types.ResourceGetResponse.verify|verify} messages.
         * @param message ResourceGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceGetResponse;

        /**
         * Decodes a ResourceGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceGetResponse;

        /**
         * Verifies a ResourceGetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceGetResponse;

        /**
         * Creates a plain object from a ResourceGetResponse message. Also converts values to other types if specified.
         * @param message ResourceGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceWithKey. */
    interface IResourceWithKey {

        /** ResourceWithKey resource */
        resource?: (types.IResource|null);

        /** ResourceWithKey owner */
        owner?: (types.IIdentityKeyID|null);

        /** ResourceWithKey creator */
        creator?: (types.IIdentityKeyID|null);

        /** ResourceWithKey encryptedKey */
        encryptedKey?: (types.ICipher|null);
    }

    /** Represents a ResourceWithKey. */
    class ResourceWithKey implements IResourceWithKey {

        /**
         * Constructs a new ResourceWithKey.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceWithKey);

        /** ResourceWithKey resource. */
        public resource?: (types.IResource|null);

        /** ResourceWithKey owner. */
        public owner?: (types.IIdentityKeyID|null);

        /** ResourceWithKey creator. */
        public creator?: (types.IIdentityKeyID|null);

        /** ResourceWithKey encryptedKey. */
        public encryptedKey?: (types.ICipher|null);

        /**
         * Creates a new ResourceWithKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceWithKey instance
         */
        public static create(properties?: types.IResourceWithKey): types.ResourceWithKey;

        /**
         * Encodes the specified ResourceWithKey message. Does not implicitly {@link types.ResourceWithKey.verify|verify} messages.
         * @param message ResourceWithKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceWithKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceWithKey message, length delimited. Does not implicitly {@link types.ResourceWithKey.verify|verify} messages.
         * @param message ResourceWithKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceWithKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceWithKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceWithKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceWithKey;

        /**
         * Decodes a ResourceWithKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceWithKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceWithKey;

        /**
         * Verifies a ResourceWithKey message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceWithKey message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceWithKey
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceWithKey;

        /**
         * Creates a plain object from a ResourceWithKey message. Also converts values to other types if specified.
         * @param message ResourceWithKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceWithKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceWithKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetKeyResponse. */
    interface IResourceGetKeyResponse {

        /** ResourceGetKeyResponse encryptedKey */
        encryptedKey?: (types.ICipher[]|null);

        /** ResourceGetKeyResponse type */
        type?: (types.ResourceType|null);
    }

    /** Represents a ResourceGetKeyResponse. */
    class ResourceGetKeyResponse implements IResourceGetKeyResponse {

        /**
         * Constructs a new ResourceGetKeyResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceGetKeyResponse);

        /** ResourceGetKeyResponse encryptedKey. */
        public encryptedKey: types.ICipher[];

        /** ResourceGetKeyResponse type. */
        public type: types.ResourceType;

        /**
         * Creates a new ResourceGetKeyResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetKeyResponse instance
         */
        public static create(properties?: types.IResourceGetKeyResponse): types.ResourceGetKeyResponse;

        /**
         * Encodes the specified ResourceGetKeyResponse message. Does not implicitly {@link types.ResourceGetKeyResponse.verify|verify} messages.
         * @param message ResourceGetKeyResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceGetKeyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetKeyResponse message, length delimited. Does not implicitly {@link types.ResourceGetKeyResponse.verify|verify} messages.
         * @param message ResourceGetKeyResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceGetKeyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetKeyResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetKeyResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceGetKeyResponse;

        /**
         * Decodes a ResourceGetKeyResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetKeyResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceGetKeyResponse;

        /**
         * Verifies a ResourceGetKeyResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetKeyResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetKeyResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceGetKeyResponse;

        /**
         * Creates a plain object from a ResourceGetKeyResponse message. Also converts values to other types if specified.
         * @param message ResourceGetKeyResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceGetKeyResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetKeyResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceShareEntry. */
    interface IResourceShareEntry {

        /** ResourceShareEntry login */
        login?: (string|null);

        /** ResourceShareEntry version */
        version?: (number|null);

        /** ResourceShareEntry nonce */
        nonce?: (Uint8Array|null);

        /** ResourceShareEntry encryptedKey */
        encryptedKey?: (Uint8Array|null);
    }

    /** Represents a ResourceShareEntry. */
    class ResourceShareEntry implements IResourceShareEntry {

        /**
         * Constructs a new ResourceShareEntry.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceShareEntry);

        /** ResourceShareEntry login. */
        public login: string;

        /** ResourceShareEntry version. */
        public version: number;

        /** ResourceShareEntry nonce. */
        public nonce: Uint8Array;

        /** ResourceShareEntry encryptedKey. */
        public encryptedKey: Uint8Array;

        /**
         * Creates a new ResourceShareEntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceShareEntry instance
         */
        public static create(properties?: types.IResourceShareEntry): types.ResourceShareEntry;

        /**
         * Encodes the specified ResourceShareEntry message. Does not implicitly {@link types.ResourceShareEntry.verify|verify} messages.
         * @param message ResourceShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceShareEntry message, length delimited. Does not implicitly {@link types.ResourceShareEntry.verify|verify} messages.
         * @param message ResourceShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceShareEntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceShareEntry;

        /**
         * Decodes a ResourceShareEntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceShareEntry;

        /**
         * Verifies a ResourceShareEntry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceShareEntry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceShareEntry
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceShareEntry;

        /**
         * Creates a plain object from a ResourceShareEntry message. Also converts values to other types if specified.
         * @param message ResourceShareEntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceShareEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceShareEntry to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourcePostRequest. */
    interface IResourcePostRequest {

        /** ResourcePostRequest kind */
        kind?: (string|null);

        /** ResourcePostRequest publicKey */
        publicKey?: (Uint8Array|null);

        /** ResourcePostRequest nonce */
        nonce?: (Uint8Array|null);

        /** ResourcePostRequest payload */
        payload?: (Uint8Array|null);

        /** ResourcePostRequest sharingGroup */
        sharingGroup?: (types.IResourceShareEntry[]|null);

        /** ResourcePostRequest type */
        type?: (types.ResourceType|null);
    }

    /** Represents a ResourcePostRequest. */
    class ResourcePostRequest implements IResourcePostRequest {

        /**
         * Constructs a new ResourcePostRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourcePostRequest);

        /** ResourcePostRequest kind. */
        public kind: string;

        /** ResourcePostRequest publicKey. */
        public publicKey: Uint8Array;

        /** ResourcePostRequest nonce. */
        public nonce: Uint8Array;

        /** ResourcePostRequest payload. */
        public payload: Uint8Array;

        /** ResourcePostRequest sharingGroup. */
        public sharingGroup: types.IResourceShareEntry[];

        /** ResourcePostRequest type. */
        public type: types.ResourceType;

        /**
         * Creates a new ResourcePostRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourcePostRequest instance
         */
        public static create(properties?: types.IResourcePostRequest): types.ResourcePostRequest;

        /**
         * Encodes the specified ResourcePostRequest message. Does not implicitly {@link types.ResourcePostRequest.verify|verify} messages.
         * @param message ResourcePostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourcePostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourcePostRequest message, length delimited. Does not implicitly {@link types.ResourcePostRequest.verify|verify} messages.
         * @param message ResourcePostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourcePostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourcePostRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourcePostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourcePostRequest;

        /**
         * Decodes a ResourcePostRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourcePostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourcePostRequest;

        /**
         * Verifies a ResourcePostRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourcePostRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourcePostRequest
         */
        public static fromObject(object: { [k: string]: any }): types.ResourcePostRequest;

        /**
         * Creates a plain object from a ResourcePostRequest message. Also converts values to other types if specified.
         * @param message ResourcePostRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourcePostRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourcePostRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourcePostResponse. */
    interface IResourcePostResponse {

        /** ResourcePostResponse id */
        id?: (number|Long|null);
    }

    /** Represents a ResourcePostResponse. */
    class ResourcePostResponse implements IResourcePostResponse {

        /**
         * Constructs a new ResourcePostResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourcePostResponse);

        /** ResourcePostResponse id. */
        public id: (number|Long);

        /**
         * Creates a new ResourcePostResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourcePostResponse instance
         */
        public static create(properties?: types.IResourcePostResponse): types.ResourcePostResponse;

        /**
         * Encodes the specified ResourcePostResponse message. Does not implicitly {@link types.ResourcePostResponse.verify|verify} messages.
         * @param message ResourcePostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourcePostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourcePostResponse message, length delimited. Does not implicitly {@link types.ResourcePostResponse.verify|verify} messages.
         * @param message ResourcePostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourcePostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourcePostResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourcePostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourcePostResponse;

        /**
         * Decodes a ResourcePostResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourcePostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourcePostResponse;

        /**
         * Verifies a ResourcePostResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourcePostResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourcePostResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ResourcePostResponse;

        /**
         * Creates a plain object from a ResourcePostResponse message. Also converts values to other types if specified.
         * @param message ResourcePostResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourcePostResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourcePostResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceExtendSharingGroupRequest. */
    interface IResourceExtendSharingGroupRequest {

        /** ResourceExtendSharingGroupRequest id */
        id?: (number|Long|null);

        /** ResourceExtendSharingGroupRequest sharingGroup */
        sharingGroup?: (types.IResourceShareEntry[]|null);
    }

    /** Represents a ResourceExtendSharingGroupRequest. */
    class ResourceExtendSharingGroupRequest implements IResourceExtendSharingGroupRequest {

        /**
         * Constructs a new ResourceExtendSharingGroupRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceExtendSharingGroupRequest);

        /** ResourceExtendSharingGroupRequest id. */
        public id: (number|Long);

        /** ResourceExtendSharingGroupRequest sharingGroup. */
        public sharingGroup: types.IResourceShareEntry[];

        /**
         * Creates a new ResourceExtendSharingGroupRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceExtendSharingGroupRequest instance
         */
        public static create(properties?: types.IResourceExtendSharingGroupRequest): types.ResourceExtendSharingGroupRequest;

        /**
         * Encodes the specified ResourceExtendSharingGroupRequest message. Does not implicitly {@link types.ResourceExtendSharingGroupRequest.verify|verify} messages.
         * @param message ResourceExtendSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceExtendSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceExtendSharingGroupRequest message, length delimited. Does not implicitly {@link types.ResourceExtendSharingGroupRequest.verify|verify} messages.
         * @param message ResourceExtendSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceExtendSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceExtendSharingGroupRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceExtendSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceExtendSharingGroupRequest;

        /**
         * Decodes a ResourceExtendSharingGroupRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceExtendSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceExtendSharingGroupRequest;

        /**
         * Verifies a ResourceExtendSharingGroupRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceExtendSharingGroupRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceExtendSharingGroupRequest
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceExtendSharingGroupRequest;

        /**
         * Creates a plain object from a ResourceExtendSharingGroupRequest message. Also converts values to other types if specified.
         * @param message ResourceExtendSharingGroupRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceExtendSharingGroupRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceExtendSharingGroupRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceListResponse. */
    interface IResourceListResponse {

        /** ResourceListResponse resources */
        resources?: (types.IResourceWithKey[]|null);
    }

    /** Represents a ResourceListResponse. */
    class ResourceListResponse implements IResourceListResponse {

        /**
         * Constructs a new ResourceListResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceListResponse);

        /** ResourceListResponse resources. */
        public resources: types.IResourceWithKey[];

        /**
         * Creates a new ResourceListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceListResponse instance
         */
        public static create(properties?: types.IResourceListResponse): types.ResourceListResponse;

        /**
         * Encodes the specified ResourceListResponse message. Does not implicitly {@link types.ResourceListResponse.verify|verify} messages.
         * @param message ResourceListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceListResponse message, length delimited. Does not implicitly {@link types.ResourceListResponse.verify|verify} messages.
         * @param message ResourceListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceListResponse;

        /**
         * Decodes a ResourceListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceListResponse;

        /**
         * Verifies a ResourceListResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceListResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceListResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceListResponse;

        /**
         * Creates a plain object from a ResourceListResponse message. Also converts values to other types if specified.
         * @param message ResourceListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetSharingGroupResponse. */
    interface IResourceGetSharingGroupResponse {

        /** ResourceGetSharingGroupResponse sharingGroup */
        sharingGroup?: (types.IResourceShareLink[]|null);
    }

    /** Represents a ResourceGetSharingGroupResponse. */
    class ResourceGetSharingGroupResponse implements IResourceGetSharingGroupResponse {

        /**
         * Constructs a new ResourceGetSharingGroupResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceGetSharingGroupResponse);

        /** ResourceGetSharingGroupResponse sharingGroup. */
        public sharingGroup: types.IResourceShareLink[];

        /**
         * Creates a new ResourceGetSharingGroupResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetSharingGroupResponse instance
         */
        public static create(properties?: types.IResourceGetSharingGroupResponse): types.ResourceGetSharingGroupResponse;

        /**
         * Encodes the specified ResourceGetSharingGroupResponse message. Does not implicitly {@link types.ResourceGetSharingGroupResponse.verify|verify} messages.
         * @param message ResourceGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetSharingGroupResponse message, length delimited. Does not implicitly {@link types.ResourceGetSharingGroupResponse.verify|verify} messages.
         * @param message ResourceGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetSharingGroupResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceGetSharingGroupResponse;

        /**
         * Decodes a ResourceGetSharingGroupResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceGetSharingGroupResponse;

        /**
         * Verifies a ResourceGetSharingGroupResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetSharingGroupResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetSharingGroupResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceGetSharingGroupResponse;

        /**
         * Creates a plain object from a ResourceGetSharingGroupResponse message. Also converts values to other types if specified.
         * @param message ResourceGetSharingGroupResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceGetSharingGroupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetSharingGroupResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceShareLink. */
    interface IResourceShareLink {

        /** ResourceShareLink identityID */
        identityID?: (types.IIdentityKeyID|null);
    }

    /** Represents a ResourceShareLink. */
    class ResourceShareLink implements IResourceShareLink {

        /**
         * Constructs a new ResourceShareLink.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceShareLink);

        /** ResourceShareLink identityID. */
        public identityID?: (types.IIdentityKeyID|null);

        /**
         * Creates a new ResourceShareLink instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceShareLink instance
         */
        public static create(properties?: types.IResourceShareLink): types.ResourceShareLink;

        /**
         * Encodes the specified ResourceShareLink message. Does not implicitly {@link types.ResourceShareLink.verify|verify} messages.
         * @param message ResourceShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceShareLink message, length delimited. Does not implicitly {@link types.ResourceShareLink.verify|verify} messages.
         * @param message ResourceShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceShareLink message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceShareLink;

        /**
         * Decodes a ResourceShareLink message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceShareLink;

        /**
         * Verifies a ResourceShareLink message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceShareLink message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceShareLink
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceShareLink;

        /**
         * Creates a plain object from a ResourceShareLink message. Also converts values to other types if specified.
         * @param message ResourceShareLink
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceShareLink, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceShareLink to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceAccessLog. */
    interface IResourceAccessLog {

        /** ResourceAccessLog resourceID */
        resourceID?: (number|Long|null);

        /** ResourceAccessLog owner */
        owner?: (types.IIdentityKeyID|null);

        /** ResourceAccessLog assume */
        assume?: (types.IIdentityKeyID|null);

        /** ResourceAccessLog timestamp */
        timestamp?: (number|Long|null);

        /** ResourceAccessLog reason */
        reason?: (string|null);
    }

    /** Represents a ResourceAccessLog. */
    class ResourceAccessLog implements IResourceAccessLog {

        /**
         * Constructs a new ResourceAccessLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceAccessLog);

        /** ResourceAccessLog resourceID. */
        public resourceID: (number|Long);

        /** ResourceAccessLog owner. */
        public owner?: (types.IIdentityKeyID|null);

        /** ResourceAccessLog assume. */
        public assume?: (types.IIdentityKeyID|null);

        /** ResourceAccessLog timestamp. */
        public timestamp: (number|Long);

        /** ResourceAccessLog reason. */
        public reason: string;

        /**
         * Creates a new ResourceAccessLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceAccessLog instance
         */
        public static create(properties?: types.IResourceAccessLog): types.ResourceAccessLog;

        /**
         * Encodes the specified ResourceAccessLog message. Does not implicitly {@link types.ResourceAccessLog.verify|verify} messages.
         * @param message ResourceAccessLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceAccessLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceAccessLog message, length delimited. Does not implicitly {@link types.ResourceAccessLog.verify|verify} messages.
         * @param message ResourceAccessLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceAccessLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceAccessLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceAccessLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceAccessLog;

        /**
         * Decodes a ResourceAccessLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceAccessLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceAccessLog;

        /**
         * Verifies a ResourceAccessLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceAccessLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceAccessLog
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceAccessLog;

        /**
         * Creates a plain object from a ResourceAccessLog message. Also converts values to other types if specified.
         * @param message ResourceAccessLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceAccessLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceAccessLog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetAccessLogsRequest. */
    interface IResourceGetAccessLogsRequest {

        /** ResourceGetAccessLogsRequest resourceIDs */
        resourceIDs?: ((number|Long)[]|null);

        /** ResourceGetAccessLogsRequest limit */
        limit?: (number|null);

        /** ResourceGetAccessLogsRequest offset */
        offset?: (number|null);
    }

    /** Represents a ResourceGetAccessLogsRequest. */
    class ResourceGetAccessLogsRequest implements IResourceGetAccessLogsRequest {

        /**
         * Constructs a new ResourceGetAccessLogsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceGetAccessLogsRequest);

        /** ResourceGetAccessLogsRequest resourceIDs. */
        public resourceIDs: (number|Long)[];

        /** ResourceGetAccessLogsRequest limit. */
        public limit: number;

        /** ResourceGetAccessLogsRequest offset. */
        public offset: number;

        /**
         * Creates a new ResourceGetAccessLogsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetAccessLogsRequest instance
         */
        public static create(properties?: types.IResourceGetAccessLogsRequest): types.ResourceGetAccessLogsRequest;

        /**
         * Encodes the specified ResourceGetAccessLogsRequest message. Does not implicitly {@link types.ResourceGetAccessLogsRequest.verify|verify} messages.
         * @param message ResourceGetAccessLogsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceGetAccessLogsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetAccessLogsRequest message, length delimited. Does not implicitly {@link types.ResourceGetAccessLogsRequest.verify|verify} messages.
         * @param message ResourceGetAccessLogsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceGetAccessLogsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetAccessLogsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetAccessLogsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceGetAccessLogsRequest;

        /**
         * Decodes a ResourceGetAccessLogsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetAccessLogsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceGetAccessLogsRequest;

        /**
         * Verifies a ResourceGetAccessLogsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetAccessLogsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetAccessLogsRequest
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceGetAccessLogsRequest;

        /**
         * Creates a plain object from a ResourceGetAccessLogsRequest message. Also converts values to other types if specified.
         * @param message ResourceGetAccessLogsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceGetAccessLogsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetAccessLogsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetAccessLogsResponse. */
    interface IResourceGetAccessLogsResponse {

        /** ResourceGetAccessLogsResponse logs */
        logs?: (types.IResourceAccessLog[]|null);
    }

    /** Represents a ResourceGetAccessLogsResponse. */
    class ResourceGetAccessLogsResponse implements IResourceGetAccessLogsResponse {

        /**
         * Constructs a new ResourceGetAccessLogsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IResourceGetAccessLogsResponse);

        /** ResourceGetAccessLogsResponse logs. */
        public logs: types.IResourceAccessLog[];

        /**
         * Creates a new ResourceGetAccessLogsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetAccessLogsResponse instance
         */
        public static create(properties?: types.IResourceGetAccessLogsResponse): types.ResourceGetAccessLogsResponse;

        /**
         * Encodes the specified ResourceGetAccessLogsResponse message. Does not implicitly {@link types.ResourceGetAccessLogsResponse.verify|verify} messages.
         * @param message ResourceGetAccessLogsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IResourceGetAccessLogsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetAccessLogsResponse message, length delimited. Does not implicitly {@link types.ResourceGetAccessLogsResponse.verify|verify} messages.
         * @param message ResourceGetAccessLogsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IResourceGetAccessLogsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetAccessLogsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetAccessLogsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ResourceGetAccessLogsResponse;

        /**
         * Decodes a ResourceGetAccessLogsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetAccessLogsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ResourceGetAccessLogsResponse;

        /**
         * Verifies a ResourceGetAccessLogsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetAccessLogsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetAccessLogsResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ResourceGetAccessLogsResponse;

        /**
         * Creates a plain object from a ResourceGetAccessLogsResponse message. Also converts values to other types if specified.
         * @param message ResourceGetAccessLogsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ResourceGetAccessLogsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetAccessLogsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Event. */
    interface IEvent {

        /** Event payload */
        payload?: (google.protobuf.IAny|null);
    }

    /** Represents an Event. */
    class Event implements IEvent {

        /**
         * Constructs a new Event.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IEvent);

        /** Event payload. */
        public payload?: (google.protobuf.IAny|null);

        /**
         * Creates a new Event instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Event instance
         */
        public static create(properties?: types.IEvent): types.Event;

        /**
         * Encodes the specified Event message. Does not implicitly {@link types.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link types.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.Event;

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.Event;

        /**
         * Verifies an Event message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Event message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Event
         */
        public static fromObject(object: { [k: string]: any }): types.Event;

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @param message Event
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Event to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EventChannelMessage. */
    interface IEventChannelMessage {

        /** EventChannelMessage channelId */
        channelId?: (number|Long|null);

        /** EventChannelMessage content */
        content?: (Uint8Array|null);
    }

    /** Represents an EventChannelMessage. */
    class EventChannelMessage implements IEventChannelMessage {

        /**
         * Constructs a new EventChannelMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IEventChannelMessage);

        /** EventChannelMessage channelId. */
        public channelId: (number|Long);

        /** EventChannelMessage content. */
        public content: Uint8Array;

        /**
         * Creates a new EventChannelMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventChannelMessage instance
         */
        public static create(properties?: types.IEventChannelMessage): types.EventChannelMessage;

        /**
         * Encodes the specified EventChannelMessage message. Does not implicitly {@link types.EventChannelMessage.verify|verify} messages.
         * @param message EventChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IEventChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventChannelMessage message, length delimited. Does not implicitly {@link types.EventChannelMessage.verify|verify} messages.
         * @param message EventChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IEventChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventChannelMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EventChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.EventChannelMessage;

        /**
         * Decodes an EventChannelMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EventChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.EventChannelMessage;

        /**
         * Verifies an EventChannelMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EventChannelMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EventChannelMessage
         */
        public static fromObject(object: { [k: string]: any }): types.EventChannelMessage;

        /**
         * Creates a plain object from an EventChannelMessage message. Also converts values to other types if specified.
         * @param message EventChannelMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.EventChannelMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EventChannelMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChannelGetResponse. */
    interface IChannelGetResponse {

        /** ChannelGetResponse id */
        id?: (number|Long|null);

        /** ChannelGetResponse resource */
        resource?: (types.IResourceGetResponse|null);
    }

    /** Represents a ChannelGetResponse. */
    class ChannelGetResponse implements IChannelGetResponse {

        /**
         * Constructs a new ChannelGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IChannelGetResponse);

        /** ChannelGetResponse id. */
        public id: (number|Long);

        /** ChannelGetResponse resource. */
        public resource?: (types.IResourceGetResponse|null);

        /**
         * Creates a new ChannelGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelGetResponse instance
         */
        public static create(properties?: types.IChannelGetResponse): types.ChannelGetResponse;

        /**
         * Encodes the specified ChannelGetResponse message. Does not implicitly {@link types.ChannelGetResponse.verify|verify} messages.
         * @param message ChannelGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IChannelGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelGetResponse message, length delimited. Does not implicitly {@link types.ChannelGetResponse.verify|verify} messages.
         * @param message ChannelGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IChannelGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ChannelGetResponse;

        /**
         * Decodes a ChannelGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ChannelGetResponse;

        /**
         * Verifies a ChannelGetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChannelGetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChannelGetResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ChannelGetResponse;

        /**
         * Creates a plain object from a ChannelGetResponse message. Also converts values to other types if specified.
         * @param message ChannelGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ChannelGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChannelGetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChannelPostRequest. */
    interface IChannelPostRequest {

        /** ChannelPostRequest publicKey */
        publicKey?: (Uint8Array|null);

        /** ChannelPostRequest nonce */
        nonce?: (Uint8Array|null);

        /** ChannelPostRequest payload */
        payload?: (Uint8Array|null);

        /** ChannelPostRequest sharingGroup */
        sharingGroup?: (types.IResourceShareEntry[]|null);

        /** ChannelPostRequest type */
        type?: (types.ResourceType|null);
    }

    /** Represents a ChannelPostRequest. */
    class ChannelPostRequest implements IChannelPostRequest {

        /**
         * Constructs a new ChannelPostRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IChannelPostRequest);

        /** ChannelPostRequest publicKey. */
        public publicKey: Uint8Array;

        /** ChannelPostRequest nonce. */
        public nonce: Uint8Array;

        /** ChannelPostRequest payload. */
        public payload: Uint8Array;

        /** ChannelPostRequest sharingGroup. */
        public sharingGroup: types.IResourceShareEntry[];

        /** ChannelPostRequest type. */
        public type: types.ResourceType;

        /**
         * Creates a new ChannelPostRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelPostRequest instance
         */
        public static create(properties?: types.IChannelPostRequest): types.ChannelPostRequest;

        /**
         * Encodes the specified ChannelPostRequest message. Does not implicitly {@link types.ChannelPostRequest.verify|verify} messages.
         * @param message ChannelPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IChannelPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelPostRequest message, length delimited. Does not implicitly {@link types.ChannelPostRequest.verify|verify} messages.
         * @param message ChannelPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IChannelPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelPostRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ChannelPostRequest;

        /**
         * Decodes a ChannelPostRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ChannelPostRequest;

        /**
         * Verifies a ChannelPostRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChannelPostRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChannelPostRequest
         */
        public static fromObject(object: { [k: string]: any }): types.ChannelPostRequest;

        /**
         * Creates a plain object from a ChannelPostRequest message. Also converts values to other types if specified.
         * @param message ChannelPostRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ChannelPostRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChannelPostRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChannelPostResponse. */
    interface IChannelPostResponse {

        /** ChannelPostResponse id */
        id?: (number|Long|null);
    }

    /** Represents a ChannelPostResponse. */
    class ChannelPostResponse implements IChannelPostResponse {

        /**
         * Constructs a new ChannelPostResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IChannelPostResponse);

        /** ChannelPostResponse id. */
        public id: (number|Long);

        /**
         * Creates a new ChannelPostResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelPostResponse instance
         */
        public static create(properties?: types.IChannelPostResponse): types.ChannelPostResponse;

        /**
         * Encodes the specified ChannelPostResponse message. Does not implicitly {@link types.ChannelPostResponse.verify|verify} messages.
         * @param message ChannelPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IChannelPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelPostResponse message, length delimited. Does not implicitly {@link types.ChannelPostResponse.verify|verify} messages.
         * @param message ChannelPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IChannelPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelPostResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ChannelPostResponse;

        /**
         * Decodes a ChannelPostResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ChannelPostResponse;

        /**
         * Verifies a ChannelPostResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChannelPostResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChannelPostResponse
         */
        public static fromObject(object: { [k: string]: any }): types.ChannelPostResponse;

        /**
         * Creates a plain object from a ChannelPostResponse message. Also converts values to other types if specified.
         * @param message ChannelPostResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ChannelPostResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChannelPostResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChannelPostMessageRequest. */
    interface IChannelPostMessageRequest {

        /** ChannelPostMessageRequest channelId */
        channelId?: (number|Long|null);

        /** ChannelPostMessageRequest content */
        content?: (Uint8Array|null);
    }

    /** Represents a ChannelPostMessageRequest. */
    class ChannelPostMessageRequest implements IChannelPostMessageRequest {

        /**
         * Constructs a new ChannelPostMessageRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IChannelPostMessageRequest);

        /** ChannelPostMessageRequest channelId. */
        public channelId: (number|Long);

        /** ChannelPostMessageRequest content. */
        public content: Uint8Array;

        /**
         * Creates a new ChannelPostMessageRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelPostMessageRequest instance
         */
        public static create(properties?: types.IChannelPostMessageRequest): types.ChannelPostMessageRequest;

        /**
         * Encodes the specified ChannelPostMessageRequest message. Does not implicitly {@link types.ChannelPostMessageRequest.verify|verify} messages.
         * @param message ChannelPostMessageRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IChannelPostMessageRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelPostMessageRequest message, length delimited. Does not implicitly {@link types.ChannelPostMessageRequest.verify|verify} messages.
         * @param message ChannelPostMessageRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IChannelPostMessageRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelPostMessageRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelPostMessageRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.ChannelPostMessageRequest;

        /**
         * Decodes a ChannelPostMessageRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelPostMessageRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.ChannelPostMessageRequest;

        /**
         * Verifies a ChannelPostMessageRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChannelPostMessageRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChannelPostMessageRequest
         */
        public static fromObject(object: { [k: string]: any }): types.ChannelPostMessageRequest;

        /**
         * Creates a plain object from a ChannelPostMessageRequest message. Also converts values to other types if specified.
         * @param message ChannelPostMessageRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.ChannelPostMessageRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChannelPostMessageRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedPostRequest. */
    interface IDelegatedPostRequest {

        /** DelegatedPostRequest publicKey */
        publicKey?: (Uint8Array|null);

        /** DelegatedPostRequest sign */
        sign?: (Uint8Array|null);

        /** DelegatedPostRequest requester */
        requester?: (string|null);

        /** DelegatedPostRequest sharing */
        sharing?: (types.IResourceShareEntry|null);
    }

    /** Represents a DelegatedPostRequest. */
    class DelegatedPostRequest implements IDelegatedPostRequest {

        /**
         * Constructs a new DelegatedPostRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IDelegatedPostRequest);

        /** DelegatedPostRequest publicKey. */
        public publicKey: Uint8Array;

        /** DelegatedPostRequest sign. */
        public sign: Uint8Array;

        /** DelegatedPostRequest requester. */
        public requester: string;

        /** DelegatedPostRequest sharing. */
        public sharing?: (types.IResourceShareEntry|null);

        /**
         * Creates a new DelegatedPostRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedPostRequest instance
         */
        public static create(properties?: types.IDelegatedPostRequest): types.DelegatedPostRequest;

        /**
         * Encodes the specified DelegatedPostRequest message. Does not implicitly {@link types.DelegatedPostRequest.verify|verify} messages.
         * @param message DelegatedPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IDelegatedPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedPostRequest message, length delimited. Does not implicitly {@link types.DelegatedPostRequest.verify|verify} messages.
         * @param message DelegatedPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IDelegatedPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedPostRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.DelegatedPostRequest;

        /**
         * Decodes a DelegatedPostRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.DelegatedPostRequest;

        /**
         * Verifies a DelegatedPostRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedPostRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedPostRequest
         */
        public static fromObject(object: { [k: string]: any }): types.DelegatedPostRequest;

        /**
         * Creates a plain object from a DelegatedPostRequest message. Also converts values to other types if specified.
         * @param message DelegatedPostRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.DelegatedPostRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedPostRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedPostResponse. */
    interface IDelegatedPostResponse {

        /** DelegatedPostResponse id */
        id?: (number|Long|null);
    }

    /** Represents a DelegatedPostResponse. */
    class DelegatedPostResponse implements IDelegatedPostResponse {

        /**
         * Constructs a new DelegatedPostResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IDelegatedPostResponse);

        /** DelegatedPostResponse id. */
        public id: (number|Long);

        /**
         * Creates a new DelegatedPostResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedPostResponse instance
         */
        public static create(properties?: types.IDelegatedPostResponse): types.DelegatedPostResponse;

        /**
         * Encodes the specified DelegatedPostResponse message. Does not implicitly {@link types.DelegatedPostResponse.verify|verify} messages.
         * @param message DelegatedPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IDelegatedPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedPostResponse message, length delimited. Does not implicitly {@link types.DelegatedPostResponse.verify|verify} messages.
         * @param message DelegatedPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IDelegatedPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedPostResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.DelegatedPostResponse;

        /**
         * Decodes a DelegatedPostResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.DelegatedPostResponse;

        /**
         * Verifies a DelegatedPostResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedPostResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedPostResponse
         */
        public static fromObject(object: { [k: string]: any }): types.DelegatedPostResponse;

        /**
         * Creates a plain object from a DelegatedPostResponse message. Also converts values to other types if specified.
         * @param message DelegatedPostResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.DelegatedPostResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedPostResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedGetResponse. */
    interface IDelegatedGetResponse {

        /** DelegatedGetResponse resource */
        resource?: (types.IResourceGetResponse|null);

        /** DelegatedGetResponse sign */
        sign?: (Uint8Array|null);
    }

    /** Represents a DelegatedGetResponse. */
    class DelegatedGetResponse implements IDelegatedGetResponse {

        /**
         * Constructs a new DelegatedGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IDelegatedGetResponse);

        /** DelegatedGetResponse resource. */
        public resource?: (types.IResourceGetResponse|null);

        /** DelegatedGetResponse sign. */
        public sign: Uint8Array;

        /**
         * Creates a new DelegatedGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedGetResponse instance
         */
        public static create(properties?: types.IDelegatedGetResponse): types.DelegatedGetResponse;

        /**
         * Encodes the specified DelegatedGetResponse message. Does not implicitly {@link types.DelegatedGetResponse.verify|verify} messages.
         * @param message DelegatedGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IDelegatedGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedGetResponse message, length delimited. Does not implicitly {@link types.DelegatedGetResponse.verify|verify} messages.
         * @param message DelegatedGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IDelegatedGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.DelegatedGetResponse;

        /**
         * Decodes a DelegatedGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.DelegatedGetResponse;

        /**
         * Verifies a DelegatedGetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedGetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedGetResponse
         */
        public static fromObject(object: { [k: string]: any }): types.DelegatedGetResponse;

        /**
         * Creates a plain object from a DelegatedGetResponse message. Also converts values to other types if specified.
         * @param message DelegatedGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.DelegatedGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedGetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedKeys. */
    interface IDelegatedKeys {

        /** DelegatedKeys login */
        login?: (string|null);

        /** DelegatedKeys version */
        version?: (number|null);

        /** DelegatedKeys signKey */
        signKey?: (Uint8Array|null);

        /** DelegatedKeys readKey */
        readKey?: (Uint8Array|null);

        /** DelegatedKeys sharingKey */
        sharingKey?: (Uint8Array|null);

        /** DelegatedKeys boxKey */
        boxKey?: (Uint8Array|null);
    }

    /** Represents a DelegatedKeys. */
    class DelegatedKeys implements IDelegatedKeys {

        /**
         * Constructs a new DelegatedKeys.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IDelegatedKeys);

        /** DelegatedKeys login. */
        public login: string;

        /** DelegatedKeys version. */
        public version: number;

        /** DelegatedKeys signKey. */
        public signKey: Uint8Array;

        /** DelegatedKeys readKey. */
        public readKey: Uint8Array;

        /** DelegatedKeys sharingKey. */
        public sharingKey: Uint8Array;

        /** DelegatedKeys boxKey. */
        public boxKey: Uint8Array;

        /**
         * Creates a new DelegatedKeys instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedKeys instance
         */
        public static create(properties?: types.IDelegatedKeys): types.DelegatedKeys;

        /**
         * Encodes the specified DelegatedKeys message. Does not implicitly {@link types.DelegatedKeys.verify|verify} messages.
         * @param message DelegatedKeys message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IDelegatedKeys, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedKeys message, length delimited. Does not implicitly {@link types.DelegatedKeys.verify|verify} messages.
         * @param message DelegatedKeys message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IDelegatedKeys, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedKeys message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedKeys
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.DelegatedKeys;

        /**
         * Decodes a DelegatedKeys message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedKeys
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.DelegatedKeys;

        /**
         * Verifies a DelegatedKeys message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedKeys message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedKeys
         */
        public static fromObject(object: { [k: string]: any }): types.DelegatedKeys;

        /**
         * Creates a plain object from a DelegatedKeys message. Also converts values to other types if specified.
         * @param message DelegatedKeys
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.DelegatedKeys, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedKeys to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedGetKeysResponse. */
    interface IDelegatedGetKeysResponse {

        /** DelegatedGetKeysResponse keys */
        keys?: (Uint8Array|null);
    }

    /** Represents a DelegatedGetKeysResponse. */
    class DelegatedGetKeysResponse implements IDelegatedGetKeysResponse {

        /**
         * Constructs a new DelegatedGetKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IDelegatedGetKeysResponse);

        /** DelegatedGetKeysResponse keys. */
        public keys: Uint8Array;

        /**
         * Creates a new DelegatedGetKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedGetKeysResponse instance
         */
        public static create(properties?: types.IDelegatedGetKeysResponse): types.DelegatedGetKeysResponse;

        /**
         * Encodes the specified DelegatedGetKeysResponse message. Does not implicitly {@link types.DelegatedGetKeysResponse.verify|verify} messages.
         * @param message DelegatedGetKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IDelegatedGetKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedGetKeysResponse message, length delimited. Does not implicitly {@link types.DelegatedGetKeysResponse.verify|verify} messages.
         * @param message DelegatedGetKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IDelegatedGetKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedGetKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedGetKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.DelegatedGetKeysResponse;

        /**
         * Decodes a DelegatedGetKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedGetKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.DelegatedGetKeysResponse;

        /**
         * Verifies a DelegatedGetKeysResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedGetKeysResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedGetKeysResponse
         */
        public static fromObject(object: { [k: string]: any }): types.DelegatedGetKeysResponse;

        /**
         * Creates a plain object from a DelegatedGetKeysResponse message. Also converts values to other types if specified.
         * @param message DelegatedGetKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.DelegatedGetKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedGetKeysResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedPostKeysRequest. */
    interface IDelegatedPostKeysRequest {

        /** DelegatedPostKeysRequest DelegatedID */
        DelegatedID?: (number|Long|null);

        /** DelegatedPostKeysRequest keys */
        keys?: (Uint8Array|null);
    }

    /** Represents a DelegatedPostKeysRequest. */
    class DelegatedPostKeysRequest implements IDelegatedPostKeysRequest {

        /**
         * Constructs a new DelegatedPostKeysRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IDelegatedPostKeysRequest);

        /** DelegatedPostKeysRequest DelegatedID. */
        public DelegatedID: (number|Long);

        /** DelegatedPostKeysRequest keys. */
        public keys: Uint8Array;

        /**
         * Creates a new DelegatedPostKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedPostKeysRequest instance
         */
        public static create(properties?: types.IDelegatedPostKeysRequest): types.DelegatedPostKeysRequest;

        /**
         * Encodes the specified DelegatedPostKeysRequest message. Does not implicitly {@link types.DelegatedPostKeysRequest.verify|verify} messages.
         * @param message DelegatedPostKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IDelegatedPostKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedPostKeysRequest message, length delimited. Does not implicitly {@link types.DelegatedPostKeysRequest.verify|verify} messages.
         * @param message DelegatedPostKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IDelegatedPostKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedPostKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedPostKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.DelegatedPostKeysRequest;

        /**
         * Decodes a DelegatedPostKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedPostKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.DelegatedPostKeysRequest;

        /**
         * Verifies a DelegatedPostKeysRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedPostKeysRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedPostKeysRequest
         */
        public static fromObject(object: { [k: string]: any }): types.DelegatedPostKeysRequest;

        /**
         * Creates a plain object from a DelegatedPostKeysRequest message. Also converts values to other types if specified.
         * @param message DelegatedPostKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.DelegatedPostKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedPostKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** RegisterTokenStatus enum. */
    enum RegisterTokenStatus {
        PENDING = 0,
        SENT = 1,
        RECEIVED = 2
    }

    /** Properties of a RegisterEmailValidationToken. */
    interface IRegisterEmailValidationToken {

        /** RegisterEmailValidationToken token */
        token?: (Uint8Array|null);

        /** RegisterEmailValidationToken email */
        email?: (string|null);

        /** RegisterEmailValidationToken created */
        created?: (number|Long|null);

        /** RegisterEmailValidationToken status */
        status?: (types.RegisterTokenStatus|null);
    }

    /** Represents a RegisterEmailValidationToken. */
    class RegisterEmailValidationToken implements IRegisterEmailValidationToken {

        /**
         * Constructs a new RegisterEmailValidationToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IRegisterEmailValidationToken);

        /** RegisterEmailValidationToken token. */
        public token: Uint8Array;

        /** RegisterEmailValidationToken email. */
        public email: string;

        /** RegisterEmailValidationToken created. */
        public created: (number|Long);

        /** RegisterEmailValidationToken status. */
        public status: types.RegisterTokenStatus;

        /**
         * Creates a new RegisterEmailValidationToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterEmailValidationToken instance
         */
        public static create(properties?: types.IRegisterEmailValidationToken): types.RegisterEmailValidationToken;

        /**
         * Encodes the specified RegisterEmailValidationToken message. Does not implicitly {@link types.RegisterEmailValidationToken.verify|verify} messages.
         * @param message RegisterEmailValidationToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IRegisterEmailValidationToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterEmailValidationToken message, length delimited. Does not implicitly {@link types.RegisterEmailValidationToken.verify|verify} messages.
         * @param message RegisterEmailValidationToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IRegisterEmailValidationToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterEmailValidationToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterEmailValidationToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.RegisterEmailValidationToken;

        /**
         * Decodes a RegisterEmailValidationToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterEmailValidationToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.RegisterEmailValidationToken;

        /**
         * Verifies a RegisterEmailValidationToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterEmailValidationToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterEmailValidationToken
         */
        public static fromObject(object: { [k: string]: any }): types.RegisterEmailValidationToken;

        /**
         * Creates a plain object from a RegisterEmailValidationToken message. Also converts values to other types if specified.
         * @param message RegisterEmailValidationToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.RegisterEmailValidationToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterEmailValidationToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegisterLinkRequest. */
    interface IRegisterLinkRequest {

        /** RegisterLinkRequest email */
        email?: (string|null);
    }

    /** Represents a RegisterLinkRequest. */
    class RegisterLinkRequest implements IRegisterLinkRequest {

        /**
         * Constructs a new RegisterLinkRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IRegisterLinkRequest);

        /** RegisterLinkRequest email. */
        public email: string;

        /**
         * Creates a new RegisterLinkRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterLinkRequest instance
         */
        public static create(properties?: types.IRegisterLinkRequest): types.RegisterLinkRequest;

        /**
         * Encodes the specified RegisterLinkRequest message. Does not implicitly {@link types.RegisterLinkRequest.verify|verify} messages.
         * @param message RegisterLinkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IRegisterLinkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterLinkRequest message, length delimited. Does not implicitly {@link types.RegisterLinkRequest.verify|verify} messages.
         * @param message RegisterLinkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IRegisterLinkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterLinkRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterLinkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.RegisterLinkRequest;

        /**
         * Decodes a RegisterLinkRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterLinkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.RegisterLinkRequest;

        /**
         * Verifies a RegisterLinkRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterLinkRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterLinkRequest
         */
        public static fromObject(object: { [k: string]: any }): types.RegisterLinkRequest;

        /**
         * Creates a plain object from a RegisterLinkRequest message. Also converts values to other types if specified.
         * @param message RegisterLinkRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.RegisterLinkRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterLinkRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LinksGetResponse. */
    interface ILinksGetResponse {

        /** LinksGetResponse links */
        links?: (types.IRegisterEmailValidationToken[]|null);
    }

    /** Represents a LinksGetResponse. */
    class LinksGetResponse implements ILinksGetResponse {

        /**
         * Constructs a new LinksGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ILinksGetResponse);

        /** LinksGetResponse links. */
        public links: types.IRegisterEmailValidationToken[];

        /**
         * Creates a new LinksGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LinksGetResponse instance
         */
        public static create(properties?: types.ILinksGetResponse): types.LinksGetResponse;

        /**
         * Encodes the specified LinksGetResponse message. Does not implicitly {@link types.LinksGetResponse.verify|verify} messages.
         * @param message LinksGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ILinksGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LinksGetResponse message, length delimited. Does not implicitly {@link types.LinksGetResponse.verify|verify} messages.
         * @param message LinksGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ILinksGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LinksGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LinksGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.LinksGetResponse;

        /**
         * Decodes a LinksGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LinksGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.LinksGetResponse;

        /**
         * Verifies a LinksGetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LinksGetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LinksGetResponse
         */
        public static fromObject(object: { [k: string]: any }): types.LinksGetResponse;

        /**
         * Creates a plain object from a LinksGetResponse message. Also converts values to other types if specified.
         * @param message LinksGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.LinksGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LinksGetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LinkTokenGetResponse. */
    interface ILinkTokenGetResponse {

        /** LinkTokenGetResponse email */
        email?: (string|null);
    }

    /** Represents a LinkTokenGetResponse. */
    class LinkTokenGetResponse implements ILinkTokenGetResponse {

        /**
         * Constructs a new LinkTokenGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.ILinkTokenGetResponse);

        /** LinkTokenGetResponse email. */
        public email: string;

        /**
         * Creates a new LinkTokenGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LinkTokenGetResponse instance
         */
        public static create(properties?: types.ILinkTokenGetResponse): types.LinkTokenGetResponse;

        /**
         * Encodes the specified LinkTokenGetResponse message. Does not implicitly {@link types.LinkTokenGetResponse.verify|verify} messages.
         * @param message LinkTokenGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.ILinkTokenGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LinkTokenGetResponse message, length delimited. Does not implicitly {@link types.LinkTokenGetResponse.verify|verify} messages.
         * @param message LinkTokenGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.ILinkTokenGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LinkTokenGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LinkTokenGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.LinkTokenGetResponse;

        /**
         * Decodes a LinkTokenGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LinkTokenGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.LinkTokenGetResponse;

        /**
         * Verifies a LinkTokenGetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LinkTokenGetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LinkTokenGetResponse
         */
        public static fromObject(object: { [k: string]: any }): types.LinkTokenGetResponse;

        /**
         * Creates a plain object from a LinkTokenGetResponse message. Also converts values to other types if specified.
         * @param message LinkTokenGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.LinkTokenGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LinkTokenGetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegisterPostLinkTokenRequest. */
    interface IRegisterPostLinkTokenRequest {

        /** RegisterPostLinkTokenRequest token */
        token?: (string|null);

        /** RegisterPostLinkTokenRequest identity */
        identity?: (types.IIdentityFields|null);

        /** RegisterPostLinkTokenRequest encryption */
        encryption?: (types.IIdentityEncryption|null);
    }

    /** Represents a RegisterPostLinkTokenRequest. */
    class RegisterPostLinkTokenRequest implements IRegisterPostLinkTokenRequest {

        /**
         * Constructs a new RegisterPostLinkTokenRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: types.IRegisterPostLinkTokenRequest);

        /** RegisterPostLinkTokenRequest token. */
        public token: string;

        /** RegisterPostLinkTokenRequest identity. */
        public identity?: (types.IIdentityFields|null);

        /** RegisterPostLinkTokenRequest encryption. */
        public encryption?: (types.IIdentityEncryption|null);

        /**
         * Creates a new RegisterPostLinkTokenRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterPostLinkTokenRequest instance
         */
        public static create(properties?: types.IRegisterPostLinkTokenRequest): types.RegisterPostLinkTokenRequest;

        /**
         * Encodes the specified RegisterPostLinkTokenRequest message. Does not implicitly {@link types.RegisterPostLinkTokenRequest.verify|verify} messages.
         * @param message RegisterPostLinkTokenRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: types.IRegisterPostLinkTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterPostLinkTokenRequest message, length delimited. Does not implicitly {@link types.RegisterPostLinkTokenRequest.verify|verify} messages.
         * @param message RegisterPostLinkTokenRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: types.IRegisterPostLinkTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterPostLinkTokenRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterPostLinkTokenRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): types.RegisterPostLinkTokenRequest;

        /**
         * Decodes a RegisterPostLinkTokenRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterPostLinkTokenRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): types.RegisterPostLinkTokenRequest;

        /**
         * Verifies a RegisterPostLinkTokenRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterPostLinkTokenRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterPostLinkTokenRequest
         */
        public static fromObject(object: { [k: string]: any }): types.RegisterPostLinkTokenRequest;

        /**
         * Creates a plain object from a RegisterPostLinkTokenRequest message. Also converts values to other types if specified.
         * @param message RegisterPostLinkTokenRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: types.RegisterPostLinkTokenRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterPostLinkTokenRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace events. */
export namespace events {

    /** Properties of a ChannelMessage. */
    interface IChannelMessage {

        /** ChannelMessage channelId */
        channelId?: (number|Long|null);

        /** ChannelMessage content */
        content?: (Uint8Array|null);
    }

    /** Represents a ChannelMessage. */
    class ChannelMessage implements IChannelMessage {

        /**
         * Constructs a new ChannelMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: events.IChannelMessage);

        /** ChannelMessage channelId. */
        public channelId: (number|Long);

        /** ChannelMessage content. */
        public content: Uint8Array;

        /**
         * Creates a new ChannelMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelMessage instance
         */
        public static create(properties?: events.IChannelMessage): events.ChannelMessage;

        /**
         * Encodes the specified ChannelMessage message. Does not implicitly {@link events.ChannelMessage.verify|verify} messages.
         * @param message ChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: events.IChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelMessage message, length delimited. Does not implicitly {@link events.ChannelMessage.verify|verify} messages.
         * @param message ChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: events.IChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): events.ChannelMessage;

        /**
         * Decodes a ChannelMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): events.ChannelMessage;

        /**
         * Verifies a ChannelMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChannelMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChannelMessage
         */
        public static fromObject(object: { [k: string]: any }): events.ChannelMessage;

        /**
         * Creates a plain object from a ChannelMessage message. Also converts values to other types if specified.
         * @param message ChannelMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: events.ChannelMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChannelMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CommandResponse. */
    interface ICommandResponse {

        /** CommandResponse id */
        id?: (number|null);

        /** CommandResponse error */
        error?: (errors.IProtoError|null);

        /** CommandResponse success */
        success?: (google.protobuf.IAny|null);
    }

    /** Represents a CommandResponse. */
    class CommandResponse implements ICommandResponse {

        /**
         * Constructs a new CommandResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: events.ICommandResponse);

        /** CommandResponse id. */
        public id: number;

        /** CommandResponse error. */
        public error?: (errors.IProtoError|null);

        /** CommandResponse success. */
        public success?: (google.protobuf.IAny|null);

        /**
         * Creates a new CommandResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CommandResponse instance
         */
        public static create(properties?: events.ICommandResponse): events.CommandResponse;

        /**
         * Encodes the specified CommandResponse message. Does not implicitly {@link events.CommandResponse.verify|verify} messages.
         * @param message CommandResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: events.ICommandResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CommandResponse message, length delimited. Does not implicitly {@link events.CommandResponse.verify|verify} messages.
         * @param message CommandResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: events.ICommandResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CommandResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CommandResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): events.CommandResponse;

        /**
         * Decodes a CommandResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CommandResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): events.CommandResponse;

        /**
         * Verifies a CommandResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CommandResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CommandResponse
         */
        public static fromObject(object: { [k: string]: any }): events.CommandResponse;

        /**
         * Creates a plain object from a CommandResponse message. Also converts values to other types if specified.
         * @param message CommandResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: events.CommandResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CommandResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
