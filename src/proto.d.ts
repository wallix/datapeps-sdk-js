import * as $protobuf from "protobufjs";
/** Namespace api. */
export namespace api {

    /** Properties of a Cipher. */
    interface ICipher {

        /** Cipher nonce */
        nonce?: (Uint8Array|null);

        /** Cipher message */
        message?: (Uint8Array|null);

        /** Cipher sign */
        sign?: (api.IIdentityKeyID|null);
    }

    /** Represents a Cipher. */
    class Cipher implements ICipher {

        /**
         * Constructs a new Cipher.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ICipher);

        /** Cipher nonce. */
        public nonce: Uint8Array;

        /** Cipher message. */
        public message: Uint8Array;

        /** Cipher sign. */
        public sign?: (api.IIdentityKeyID|null);

        /**
         * Creates a new Cipher instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Cipher instance
         */
        public static create(properties?: api.ICipher): api.Cipher;

        /**
         * Encodes the specified Cipher message. Does not implicitly {@link api.Cipher.verify|verify} messages.
         * @param message Cipher message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ICipher, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Cipher message, length delimited. Does not implicitly {@link api.Cipher.verify|verify} messages.
         * @param message Cipher message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ICipher, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Cipher message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Cipher
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Cipher;

        /**
         * Decodes a Cipher message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Cipher
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Cipher;

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
        public static fromObject(object: { [k: string]: any }): api.Cipher;

        /**
         * Creates a plain object from a Cipher message. Also converts values to other types if specified.
         * @param message Cipher
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Cipher, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityFields);

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
        public static create(properties?: api.IIdentityFields): api.IdentityFields;

        /**
         * Encodes the specified IdentityFields message. Does not implicitly {@link api.IdentityFields.verify|verify} messages.
         * @param message IdentityFields message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityFields, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityFields message, length delimited. Does not implicitly {@link api.IdentityFields.verify|verify} messages.
         * @param message IdentityFields message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityFields, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityFields message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityFields
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityFields;

        /**
         * Decodes an IdentityFields message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityFields
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityFields;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityFields;

        /**
         * Creates a plain object from an IdentityFields message. Also converts values to other types if specified.
         * @param message IdentityFields
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityFields, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentity);

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
        public static create(properties?: api.IIdentity): api.Identity;

        /**
         * Encodes the specified Identity message. Does not implicitly {@link api.Identity.verify|verify} messages.
         * @param message Identity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Identity message, length delimited. Does not implicitly {@link api.Identity.verify|verify} messages.
         * @param message Identity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Identity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Identity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Identity;

        /**
         * Decodes an Identity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Identity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Identity;

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
        public static fromObject(object: { [k: string]: any }): api.Identity;

        /**
         * Creates a plain object from an Identity message. Also converts values to other types if specified.
         * @param message Identity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Identity, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityKeyID);

        /** IdentityKeyID login. */
        public login: string;

        /** IdentityKeyID version. */
        public version: number;

        /**
         * Creates a new IdentityKeyID instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityKeyID instance
         */
        public static create(properties?: api.IIdentityKeyID): api.IdentityKeyID;

        /**
         * Encodes the specified IdentityKeyID message. Does not implicitly {@link api.IdentityKeyID.verify|verify} messages.
         * @param message IdentityKeyID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityKeyID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityKeyID message, length delimited. Does not implicitly {@link api.IdentityKeyID.verify|verify} messages.
         * @param message IdentityKeyID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityKeyID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityKeyID message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityKeyID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityKeyID;

        /**
         * Decodes an IdentityKeyID message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityKeyID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityKeyID;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityKeyID;

        /**
         * Creates a plain object from an IdentityKeyID message. Also converts values to other types if specified.
         * @param message IdentityKeyID
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityKeyID, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityPublicKey);

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
        public static create(properties?: api.IIdentityPublicKey): api.IdentityPublicKey;

        /**
         * Encodes the specified IdentityPublicKey message. Does not implicitly {@link api.IdentityPublicKey.verify|verify} messages.
         * @param message IdentityPublicKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPublicKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPublicKey message, length delimited. Does not implicitly {@link api.IdentityPublicKey.verify|verify} messages.
         * @param message IdentityPublicKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPublicKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPublicKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPublicKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPublicKey;

        /**
         * Decodes an IdentityPublicKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPublicKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPublicKey;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityPublicKey;

        /**
         * Creates a plain object from an IdentityPublicKey message. Also converts values to other types if specified.
         * @param message IdentityPublicKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPublicKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPublicKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityPublicKeyWithMetadata. */
    interface IIdentityPublicKeyWithMetadata {

        /** IdentityPublicKeyWithMetadata publicKey */
        publicKey?: (api.IIdentityPublicKey|null);

        /** IdentityPublicKeyWithMetadata created */
        created?: (number|Long|null);
    }

    /** Represents an IdentityPublicKeyWithMetadata. */
    class IdentityPublicKeyWithMetadata implements IIdentityPublicKeyWithMetadata {

        /**
         * Constructs a new IdentityPublicKeyWithMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityPublicKeyWithMetadata);

        /** IdentityPublicKeyWithMetadata publicKey. */
        public publicKey?: (api.IIdentityPublicKey|null);

        /** IdentityPublicKeyWithMetadata created. */
        public created: (number|Long);

        /**
         * Creates a new IdentityPublicKeyWithMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPublicKeyWithMetadata instance
         */
        public static create(properties?: api.IIdentityPublicKeyWithMetadata): api.IdentityPublicKeyWithMetadata;

        /**
         * Encodes the specified IdentityPublicKeyWithMetadata message. Does not implicitly {@link api.IdentityPublicKeyWithMetadata.verify|verify} messages.
         * @param message IdentityPublicKeyWithMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPublicKeyWithMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPublicKeyWithMetadata message, length delimited. Does not implicitly {@link api.IdentityPublicKeyWithMetadata.verify|verify} messages.
         * @param message IdentityPublicKeyWithMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPublicKeyWithMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPublicKeyWithMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPublicKeyWithMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPublicKeyWithMetadata;

        /**
         * Decodes an IdentityPublicKeyWithMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPublicKeyWithMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPublicKeyWithMetadata;

        /**
         * Verifies an IdentityPublicKeyWithMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityPublicKeyWithMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityPublicKeyWithMetadata
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityPublicKeyWithMetadata;

        /**
         * Creates a plain object from an IdentityPublicKeyWithMetadata message. Also converts values to other types if specified.
         * @param message IdentityPublicKeyWithMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPublicKeyWithMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPublicKeyWithMetadata to JSON.
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
        chains?: (api.IdentityPublicChain.IElt[]|null);
    }

    /** Represents an IdentityPublicChain. */
    class IdentityPublicChain implements IIdentityPublicChain {

        /**
         * Constructs a new IdentityPublicChain.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityPublicChain);

        /** IdentityPublicChain login. */
        public login: string;

        /** IdentityPublicChain version. */
        public version: number;

        /** IdentityPublicChain chains. */
        public chains: api.IdentityPublicChain.IElt[];

        /**
         * Creates a new IdentityPublicChain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPublicChain instance
         */
        public static create(properties?: api.IIdentityPublicChain): api.IdentityPublicChain;

        /**
         * Encodes the specified IdentityPublicChain message. Does not implicitly {@link api.IdentityPublicChain.verify|verify} messages.
         * @param message IdentityPublicChain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPublicChain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPublicChain message, length delimited. Does not implicitly {@link api.IdentityPublicChain.verify|verify} messages.
         * @param message IdentityPublicChain message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPublicChain, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPublicChain message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPublicChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPublicChain;

        /**
         * Decodes an IdentityPublicChain message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPublicChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPublicChain;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityPublicChain;

        /**
         * Creates a plain object from an IdentityPublicChain message. Also converts values to other types if specified.
         * @param message IdentityPublicChain
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPublicChain, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            mandate?: (api.IIdentityKeyID|null);

            /** Elt version */
            version?: (number|null);
        }

        /** Represents an Elt. */
        class Elt implements IElt {

            /**
             * Constructs a new Elt.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityPublicChain.IElt);

            /** Elt sign. */
            public sign: Uint8Array;

            /** Elt box. */
            public box: Uint8Array;

            /** Elt chain. */
            public chain: Uint8Array;

            /** Elt mandate. */
            public mandate?: (api.IIdentityKeyID|null);

            /** Elt version. */
            public version: number;

            /**
             * Creates a new Elt instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Elt instance
             */
            public static create(properties?: api.IdentityPublicChain.IElt): api.IdentityPublicChain.Elt;

            /**
             * Encodes the specified Elt message. Does not implicitly {@link api.IdentityPublicChain.Elt.verify|verify} messages.
             * @param message Elt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityPublicChain.IElt, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Elt message, length delimited. Does not implicitly {@link api.IdentityPublicChain.Elt.verify|verify} messages.
             * @param message Elt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityPublicChain.IElt, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Elt message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Elt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPublicChain.Elt;

            /**
             * Decodes an Elt message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Elt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPublicChain.Elt;

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
            public static fromObject(object: { [k: string]: any }): api.IdentityPublicChain.Elt;

            /**
             * Creates a plain object from an Elt message. Also converts values to other types if specified.
             * @param message Elt
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityPublicChain.Elt, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityEncryptedKey);

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
        public static create(properties?: api.IIdentityEncryptedKey): api.IdentityEncryptedKey;

        /**
         * Encodes the specified IdentityEncryptedKey message. Does not implicitly {@link api.IdentityEncryptedKey.verify|verify} messages.
         * @param message IdentityEncryptedKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityEncryptedKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityEncryptedKey message, length delimited. Does not implicitly {@link api.IdentityEncryptedKey.verify|verify} messages.
         * @param message IdentityEncryptedKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityEncryptedKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityEncryptedKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityEncryptedKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityEncryptedKey;

        /**
         * Decodes an IdentityEncryptedKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityEncryptedKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityEncryptedKey;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityEncryptedKey;

        /**
         * Creates a plain object from an IdentityEncryptedKey message. Also converts values to other types if specified.
         * @param message IdentityEncryptedKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityEncryptedKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityEncryptedKey to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityEncryptedKeySet. */
    interface IIdentityEncryptedKeySet {

        /** IdentityEncryptedKeySet version */
        version?: (number|null);

        /** IdentityEncryptedKeySet masterSalt */
        masterSalt?: (Uint8Array|null);

        /** IdentityEncryptedKeySet masterPublicKey */
        masterPublicKey?: (Uint8Array|null);

        /** IdentityEncryptedKeySet sharingEncrypted */
        sharingEncrypted?: (api.IIdentityEncryptedKey|null);

        /** IdentityEncryptedKeySet boxEncrypted */
        boxEncrypted?: (api.IIdentityEncryptedKey|null);

        /** IdentityEncryptedKeySet signEncrypted */
        signEncrypted?: (api.IIdentityEncryptedKey|null);

        /** IdentityEncryptedKeySet readEncrypted */
        readEncrypted?: (api.IIdentityEncryptedKey|null);
    }

    /** Represents an IdentityEncryptedKeySet. */
    class IdentityEncryptedKeySet implements IIdentityEncryptedKeySet {

        /**
         * Constructs a new IdentityEncryptedKeySet.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityEncryptedKeySet);

        /** IdentityEncryptedKeySet version. */
        public version: number;

        /** IdentityEncryptedKeySet masterSalt. */
        public masterSalt: Uint8Array;

        /** IdentityEncryptedKeySet masterPublicKey. */
        public masterPublicKey: Uint8Array;

        /** IdentityEncryptedKeySet sharingEncrypted. */
        public sharingEncrypted?: (api.IIdentityEncryptedKey|null);

        /** IdentityEncryptedKeySet boxEncrypted. */
        public boxEncrypted?: (api.IIdentityEncryptedKey|null);

        /** IdentityEncryptedKeySet signEncrypted. */
        public signEncrypted?: (api.IIdentityEncryptedKey|null);

        /** IdentityEncryptedKeySet readEncrypted. */
        public readEncrypted?: (api.IIdentityEncryptedKey|null);

        /**
         * Creates a new IdentityEncryptedKeySet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityEncryptedKeySet instance
         */
        public static create(properties?: api.IIdentityEncryptedKeySet): api.IdentityEncryptedKeySet;

        /**
         * Encodes the specified IdentityEncryptedKeySet message. Does not implicitly {@link api.IdentityEncryptedKeySet.verify|verify} messages.
         * @param message IdentityEncryptedKeySet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityEncryptedKeySet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityEncryptedKeySet message, length delimited. Does not implicitly {@link api.IdentityEncryptedKeySet.verify|verify} messages.
         * @param message IdentityEncryptedKeySet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityEncryptedKeySet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityEncryptedKeySet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityEncryptedKeySet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityEncryptedKeySet;

        /**
         * Decodes an IdentityEncryptedKeySet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityEncryptedKeySet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityEncryptedKeySet;

        /**
         * Verifies an IdentityEncryptedKeySet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityEncryptedKeySet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityEncryptedKeySet
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityEncryptedKeySet;

        /**
         * Creates a plain object from an IdentityEncryptedKeySet message. Also converts values to other types if specified.
         * @param message IdentityEncryptedKeySet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityEncryptedKeySet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityEncryptedKeySet to JSON.
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

    /** Properties of an ApplicationIdentity. */
    interface IApplicationIdentity {

        /** ApplicationIdentity identity */
        identity?: (api.IIdentity|null);

        /** ApplicationIdentity auth */
        auth?: (api.IIdentityExternalAuth|null);
    }

    /** Represents an ApplicationIdentity. */
    class ApplicationIdentity implements IApplicationIdentity {

        /**
         * Constructs a new ApplicationIdentity.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationIdentity);

        /** ApplicationIdentity identity. */
        public identity?: (api.IIdentity|null);

        /** ApplicationIdentity auth. */
        public auth?: (api.IIdentityExternalAuth|null);

        /**
         * Creates a new ApplicationIdentity instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationIdentity instance
         */
        public static create(properties?: api.IApplicationIdentity): api.ApplicationIdentity;

        /**
         * Encodes the specified ApplicationIdentity message. Does not implicitly {@link api.ApplicationIdentity.verify|verify} messages.
         * @param message ApplicationIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationIdentity message, length delimited. Does not implicitly {@link api.ApplicationIdentity.verify|verify} messages.
         * @param message ApplicationIdentity message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationIdentity, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationIdentity message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationIdentity;

        /**
         * Decodes an ApplicationIdentity message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationIdentity
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationIdentity;

        /**
         * Verifies an ApplicationIdentity message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationIdentity message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationIdentity
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationIdentity;

        /**
         * Creates a plain object from an ApplicationIdentity message. Also converts values to other types if specified.
         * @param message ApplicationIdentity
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationIdentity, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationIdentity to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityRegisterRequest. */
    interface IIdentityRegisterRequest {

        /** IdentityRegisterRequest identity */
        identity?: (api.IIdentityFields|null);

        /** IdentityRegisterRequest encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);
    }

    /** Represents an IdentityRegisterRequest. */
    class IdentityRegisterRequest implements IIdentityRegisterRequest {

        /**
         * Constructs a new IdentityRegisterRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityRegisterRequest);

        /** IdentityRegisterRequest identity. */
        public identity?: (api.IIdentityFields|null);

        /** IdentityRegisterRequest encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /**
         * Creates a new IdentityRegisterRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityRegisterRequest instance
         */
        public static create(properties?: api.IIdentityRegisterRequest): api.IdentityRegisterRequest;

        /**
         * Encodes the specified IdentityRegisterRequest message. Does not implicitly {@link api.IdentityRegisterRequest.verify|verify} messages.
         * @param message IdentityRegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityRegisterRequest message, length delimited. Does not implicitly {@link api.IdentityRegisterRequest.verify|verify} messages.
         * @param message IdentityRegisterRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityRegisterRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityRegisterRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityRegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityRegisterRequest;

        /**
         * Decodes an IdentityRegisterRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityRegisterRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityRegisterRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityRegisterRequest;

        /**
         * Creates a plain object from an IdentityRegisterRequest message. Also converts values to other types if specified.
         * @param message IdentityRegisterRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityRegisterRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityRegisterRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetRequest. */
    interface IIdentityGetRequest {

        /** IdentityGetRequest login */
        login?: (string|null);
    }

    /** Represents an IdentityGetRequest. */
    class IdentityGetRequest implements IIdentityGetRequest {

        /**
         * Constructs a new IdentityGetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetRequest);

        /** IdentityGetRequest login. */
        public login: string;

        /**
         * Creates a new IdentityGetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetRequest instance
         */
        public static create(properties?: api.IIdentityGetRequest): api.IdentityGetRequest;

        /**
         * Encodes the specified IdentityGetRequest message. Does not implicitly {@link api.IdentityGetRequest.verify|verify} messages.
         * @param message IdentityGetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetRequest message, length delimited. Does not implicitly {@link api.IdentityGetRequest.verify|verify} messages.
         * @param message IdentityGetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetRequest;

        /**
         * Decodes an IdentityGetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetRequest;

        /**
         * Verifies an IdentityGetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetRequest;

        /**
         * Creates a plain object from an IdentityGetRequest message. Also converts values to other types if specified.
         * @param message IdentityGetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityExternalAuth. */
    interface IIdentityExternalAuth {

        /** IdentityExternalAuth jwt */
        jwt?: (api.IdentityExternalAuth.IJWT|null);
    }

    /** Represents an IdentityExternalAuth. */
    class IdentityExternalAuth implements IIdentityExternalAuth {

        /**
         * Constructs a new IdentityExternalAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityExternalAuth);

        /** IdentityExternalAuth jwt. */
        public jwt?: (api.IdentityExternalAuth.IJWT|null);

        /**
         * Creates a new IdentityExternalAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityExternalAuth instance
         */
        public static create(properties?: api.IIdentityExternalAuth): api.IdentityExternalAuth;

        /**
         * Encodes the specified IdentityExternalAuth message. Does not implicitly {@link api.IdentityExternalAuth.verify|verify} messages.
         * @param message IdentityExternalAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityExternalAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityExternalAuth message, length delimited. Does not implicitly {@link api.IdentityExternalAuth.verify|verify} messages.
         * @param message IdentityExternalAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityExternalAuth, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityExternalAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityExternalAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityExternalAuth;

        /**
         * Decodes an IdentityExternalAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityExternalAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityExternalAuth;

        /**
         * Verifies an IdentityExternalAuth message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityExternalAuth message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityExternalAuth
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityExternalAuth;

        /**
         * Creates a plain object from an IdentityExternalAuth message. Also converts values to other types if specified.
         * @param message IdentityExternalAuth
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityExternalAuth, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityExternalAuth to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityExternalAuth {

        /** Properties of a JWT. */
        interface IJWT {

            /** JWT token */
            token?: (string|null);
        }

        /** Represents a JWT. */
        class JWT implements IJWT {

            /**
             * Constructs a new JWT.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityExternalAuth.IJWT);

            /** JWT token. */
            public token: string;

            /**
             * Creates a new JWT instance using the specified properties.
             * @param [properties] Properties to set
             * @returns JWT instance
             */
            public static create(properties?: api.IdentityExternalAuth.IJWT): api.IdentityExternalAuth.JWT;

            /**
             * Encodes the specified JWT message. Does not implicitly {@link api.IdentityExternalAuth.JWT.verify|verify} messages.
             * @param message JWT message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityExternalAuth.IJWT, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified JWT message, length delimited. Does not implicitly {@link api.IdentityExternalAuth.JWT.verify|verify} messages.
             * @param message JWT message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityExternalAuth.IJWT, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a JWT message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns JWT
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityExternalAuth.JWT;

            /**
             * Decodes a JWT message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns JWT
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityExternalAuth.JWT;

            /**
             * Verifies a JWT message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a JWT message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns JWT
             */
            public static fromObject(object: { [k: string]: any }): api.IdentityExternalAuth.JWT;

            /**
             * Creates a plain object from a JWT message. Also converts values to other types if specified.
             * @param message JWT
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityExternalAuth.JWT, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this JWT to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a RegisterApplicationIdentityRequest. */
    interface IRegisterApplicationIdentityRequest {

        /** RegisterApplicationIdentityRequest appID */
        appID?: (string|null);

        /** RegisterApplicationIdentityRequest identity */
        identity?: (api.IIdentityFields|null);

        /** RegisterApplicationIdentityRequest encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);

        /** RegisterApplicationIdentityRequest resources */
        resources?: ({ [k: string]: api.IResourcePostRequest }|null);

        /** RegisterApplicationIdentityRequest auth */
        auth?: (api.IIdentityExternalAuth|null);
    }

    /** Represents a RegisterApplicationIdentityRequest. */
    class RegisterApplicationIdentityRequest implements IRegisterApplicationIdentityRequest {

        /**
         * Constructs a new RegisterApplicationIdentityRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRegisterApplicationIdentityRequest);

        /** RegisterApplicationIdentityRequest appID. */
        public appID: string;

        /** RegisterApplicationIdentityRequest identity. */
        public identity?: (api.IIdentityFields|null);

        /** RegisterApplicationIdentityRequest encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /** RegisterApplicationIdentityRequest resources. */
        public resources: { [k: string]: api.IResourcePostRequest };

        /** RegisterApplicationIdentityRequest auth. */
        public auth?: (api.IIdentityExternalAuth|null);

        /**
         * Creates a new RegisterApplicationIdentityRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterApplicationIdentityRequest instance
         */
        public static create(properties?: api.IRegisterApplicationIdentityRequest): api.RegisterApplicationIdentityRequest;

        /**
         * Encodes the specified RegisterApplicationIdentityRequest message. Does not implicitly {@link api.RegisterApplicationIdentityRequest.verify|verify} messages.
         * @param message RegisterApplicationIdentityRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRegisterApplicationIdentityRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterApplicationIdentityRequest message, length delimited. Does not implicitly {@link api.RegisterApplicationIdentityRequest.verify|verify} messages.
         * @param message RegisterApplicationIdentityRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRegisterApplicationIdentityRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterApplicationIdentityRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterApplicationIdentityRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.RegisterApplicationIdentityRequest;

        /**
         * Decodes a RegisterApplicationIdentityRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterApplicationIdentityRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.RegisterApplicationIdentityRequest;

        /**
         * Verifies a RegisterApplicationIdentityRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterApplicationIdentityRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterApplicationIdentityRequest
         */
        public static fromObject(object: { [k: string]: any }): api.RegisterApplicationIdentityRequest;

        /**
         * Creates a plain object from a RegisterApplicationIdentityRequest message. Also converts values to other types if specified.
         * @param message RegisterApplicationIdentityRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.RegisterApplicationIdentityRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterApplicationIdentityRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RegisterApplicationIdentityResponse. */
    interface IRegisterApplicationIdentityResponse {

        /** RegisterApplicationIdentityResponse login */
        login?: (string|null);
    }

    /** Represents a RegisterApplicationIdentityResponse. */
    class RegisterApplicationIdentityResponse implements IRegisterApplicationIdentityResponse {

        /**
         * Constructs a new RegisterApplicationIdentityResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRegisterApplicationIdentityResponse);

        /** RegisterApplicationIdentityResponse login. */
        public login: string;

        /**
         * Creates a new RegisterApplicationIdentityResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterApplicationIdentityResponse instance
         */
        public static create(properties?: api.IRegisterApplicationIdentityResponse): api.RegisterApplicationIdentityResponse;

        /**
         * Encodes the specified RegisterApplicationIdentityResponse message. Does not implicitly {@link api.RegisterApplicationIdentityResponse.verify|verify} messages.
         * @param message RegisterApplicationIdentityResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRegisterApplicationIdentityResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterApplicationIdentityResponse message, length delimited. Does not implicitly {@link api.RegisterApplicationIdentityResponse.verify|verify} messages.
         * @param message RegisterApplicationIdentityResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRegisterApplicationIdentityResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterApplicationIdentityResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterApplicationIdentityResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.RegisterApplicationIdentityResponse;

        /**
         * Decodes a RegisterApplicationIdentityResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterApplicationIdentityResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.RegisterApplicationIdentityResponse;

        /**
         * Verifies a RegisterApplicationIdentityResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RegisterApplicationIdentityResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RegisterApplicationIdentityResponse
         */
        public static fromObject(object: { [k: string]: any }): api.RegisterApplicationIdentityResponse;

        /**
         * Creates a plain object from a RegisterApplicationIdentityResponse message. Also converts values to other types if specified.
         * @param message RegisterApplicationIdentityResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.RegisterApplicationIdentityResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterApplicationIdentityResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityCreateRequest. */
    interface IIdentityCreateRequest {

        /** IdentityCreateRequest identity */
        identity?: (api.IIdentityFields|null);

        /** IdentityCreateRequest encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityCreateRequest signChain */
        signChain?: (Uint8Array|null);

        /** IdentityCreateRequest sharingGroup */
        sharingGroup?: (api.IIdentityShareEntry[]|null);

        /** IdentityCreateRequest email */
        email?: (string|null);
    }

    /** Represents an IdentityCreateRequest. */
    class IdentityCreateRequest implements IIdentityCreateRequest {

        /**
         * Constructs a new IdentityCreateRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityCreateRequest);

        /** IdentityCreateRequest identity. */
        public identity?: (api.IIdentityFields|null);

        /** IdentityCreateRequest encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityCreateRequest signChain. */
        public signChain: Uint8Array;

        /** IdentityCreateRequest sharingGroup. */
        public sharingGroup: api.IIdentityShareEntry[];

        /** IdentityCreateRequest email. */
        public email: string;

        /**
         * Creates a new IdentityCreateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityCreateRequest instance
         */
        public static create(properties?: api.IIdentityCreateRequest): api.IdentityCreateRequest;

        /**
         * Encodes the specified IdentityCreateRequest message. Does not implicitly {@link api.IdentityCreateRequest.verify|verify} messages.
         * @param message IdentityCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityCreateRequest message, length delimited. Does not implicitly {@link api.IdentityCreateRequest.verify|verify} messages.
         * @param message IdentityCreateRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityCreateRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityCreateRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityCreateRequest;

        /**
         * Decodes an IdentityCreateRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityCreateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityCreateRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityCreateRequest;

        /**
         * Creates a plain object from an IdentityCreateRequest message. Also converts values to other types if specified.
         * @param message IdentityCreateRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityCreateRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityKeysToReplaceRequest signChain */
        signChain?: (Uint8Array|null);

        /** IdentityKeysToReplaceRequest sharingGroup */
        sharingGroup?: (api.IIdentityShareEntry[]|null);
    }

    /** Represents an IdentityKeysToReplaceRequest. */
    class IdentityKeysToReplaceRequest implements IIdentityKeysToReplaceRequest {

        /**
         * Constructs a new IdentityKeysToReplaceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityKeysToReplaceRequest);

        /** IdentityKeysToReplaceRequest login. */
        public login: string;

        /** IdentityKeysToReplaceRequest encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityKeysToReplaceRequest signChain. */
        public signChain: Uint8Array;

        /** IdentityKeysToReplaceRequest sharingGroup. */
        public sharingGroup: api.IIdentityShareEntry[];

        /**
         * Creates a new IdentityKeysToReplaceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityKeysToReplaceRequest instance
         */
        public static create(properties?: api.IIdentityKeysToReplaceRequest): api.IdentityKeysToReplaceRequest;

        /**
         * Encodes the specified IdentityKeysToReplaceRequest message. Does not implicitly {@link api.IdentityKeysToReplaceRequest.verify|verify} messages.
         * @param message IdentityKeysToReplaceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityKeysToReplaceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityKeysToReplaceRequest message, length delimited. Does not implicitly {@link api.IdentityKeysToReplaceRequest.verify|verify} messages.
         * @param message IdentityKeysToReplaceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityKeysToReplaceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityKeysToReplaceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityKeysToReplaceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityKeysToReplaceRequest;

        /**
         * Decodes an IdentityKeysToReplaceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityKeysToReplaceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityKeysToReplaceRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityKeysToReplaceRequest;

        /**
         * Creates a plain object from an IdentityKeysToReplaceRequest message. Also converts values to other types if specified.
         * @param message IdentityKeysToReplaceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityKeysToReplaceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityKeysToReplaceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityListOptions. */
    interface IIdentityListOptions {

        /** IdentityListOptions offset */
        offset?: (number|null);

        /** IdentityListOptions limit */
        limit?: (number|null);

        /** IdentityListOptions loginPrefix */
        loginPrefix?: (string|null);

        /** IdentityListOptions kind */
        kind?: (string|null);

        /** IdentityListOptions sortedBy */
        sortedBy?: (api.IdentitySortingField|null);

        /** IdentityListOptions order */
        order?: (api.SortingOrder|null);
    }

    /** Represents an IdentityListOptions. */
    class IdentityListOptions implements IIdentityListOptions {

        /**
         * Constructs a new IdentityListOptions.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityListOptions);

        /** IdentityListOptions offset. */
        public offset: number;

        /** IdentityListOptions limit. */
        public limit: number;

        /** IdentityListOptions loginPrefix. */
        public loginPrefix: string;

        /** IdentityListOptions kind. */
        public kind: string;

        /** IdentityListOptions sortedBy. */
        public sortedBy: api.IdentitySortingField;

        /** IdentityListOptions order. */
        public order: api.SortingOrder;

        /**
         * Creates a new IdentityListOptions instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityListOptions instance
         */
        public static create(properties?: api.IIdentityListOptions): api.IdentityListOptions;

        /**
         * Encodes the specified IdentityListOptions message. Does not implicitly {@link api.IdentityListOptions.verify|verify} messages.
         * @param message IdentityListOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityListOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityListOptions message, length delimited. Does not implicitly {@link api.IdentityListOptions.verify|verify} messages.
         * @param message IdentityListOptions message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityListOptions, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityListOptions message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityListOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityListOptions;

        /**
         * Decodes an IdentityListOptions message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityListOptions
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityListOptions;

        /**
         * Verifies an IdentityListOptions message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityListOptions message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityListOptions
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityListOptions;

        /**
         * Creates a plain object from an IdentityListOptions message. Also converts values to other types if specified.
         * @param message IdentityListOptions
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityListOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityListOptions to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityListRequest. */
    interface IIdentityListRequest {

        /** IdentityListRequest options */
        options?: (api.IIdentityListOptions|null);
    }

    /** Represents an IdentityListRequest. */
    class IdentityListRequest implements IIdentityListRequest {

        /**
         * Constructs a new IdentityListRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityListRequest);

        /** IdentityListRequest options. */
        public options?: (api.IIdentityListOptions|null);

        /**
         * Creates a new IdentityListRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityListRequest instance
         */
        public static create(properties?: api.IIdentityListRequest): api.IdentityListRequest;

        /**
         * Encodes the specified IdentityListRequest message. Does not implicitly {@link api.IdentityListRequest.verify|verify} messages.
         * @param message IdentityListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityListRequest message, length delimited. Does not implicitly {@link api.IdentityListRequest.verify|verify} messages.
         * @param message IdentityListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityListRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityListRequest;

        /**
         * Decodes an IdentityListRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityListRequest;

        /**
         * Verifies an IdentityListRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityListRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityListRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityListRequest;

        /**
         * Creates a plain object from an IdentityListRequest message. Also converts values to other types if specified.
         * @param message IdentityListRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityListRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityListRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityListResponse. */
    interface IIdentityListResponse {

        /** IdentityListResponse identities */
        identities?: (api.IIdentity[]|null);

        /** IdentityListResponse totalIdentitiesCount */
        totalIdentitiesCount?: (number|null);
    }

    /** Represents an IdentityListResponse. */
    class IdentityListResponse implements IIdentityListResponse {

        /**
         * Constructs a new IdentityListResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityListResponse);

        /** IdentityListResponse identities. */
        public identities: api.IIdentity[];

        /** IdentityListResponse totalIdentitiesCount. */
        public totalIdentitiesCount: number;

        /**
         * Creates a new IdentityListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityListResponse instance
         */
        public static create(properties?: api.IIdentityListResponse): api.IdentityListResponse;

        /**
         * Encodes the specified IdentityListResponse message. Does not implicitly {@link api.IdentityListResponse.verify|verify} messages.
         * @param message IdentityListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityListResponse message, length delimited. Does not implicitly {@link api.IdentityListResponse.verify|verify} messages.
         * @param message IdentityListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityListResponse;

        /**
         * Decodes an IdentityListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityListResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityListResponse;

        /**
         * Creates a plain object from an IdentityListResponse message. Also converts values to other types if specified.
         * @param message IdentityListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationListIdentitiesRequest. */
    interface IApplicationListIdentitiesRequest {

        /** ApplicationListIdentitiesRequest appID */
        appID?: (string|null);

        /** ApplicationListIdentitiesRequest options */
        options?: (api.IIdentityListOptions|null);
    }

    /** Represents an ApplicationListIdentitiesRequest. */
    class ApplicationListIdentitiesRequest implements IApplicationListIdentitiesRequest {

        /**
         * Constructs a new ApplicationListIdentitiesRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationListIdentitiesRequest);

        /** ApplicationListIdentitiesRequest appID. */
        public appID: string;

        /** ApplicationListIdentitiesRequest options. */
        public options?: (api.IIdentityListOptions|null);

        /**
         * Creates a new ApplicationListIdentitiesRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationListIdentitiesRequest instance
         */
        public static create(properties?: api.IApplicationListIdentitiesRequest): api.ApplicationListIdentitiesRequest;

        /**
         * Encodes the specified ApplicationListIdentitiesRequest message. Does not implicitly {@link api.ApplicationListIdentitiesRequest.verify|verify} messages.
         * @param message ApplicationListIdentitiesRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationListIdentitiesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationListIdentitiesRequest message, length delimited. Does not implicitly {@link api.ApplicationListIdentitiesRequest.verify|verify} messages.
         * @param message ApplicationListIdentitiesRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationListIdentitiesRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationListIdentitiesRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationListIdentitiesRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationListIdentitiesRequest;

        /**
         * Decodes an ApplicationListIdentitiesRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationListIdentitiesRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationListIdentitiesRequest;

        /**
         * Verifies an ApplicationListIdentitiesRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationListIdentitiesRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationListIdentitiesRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationListIdentitiesRequest;

        /**
         * Creates a plain object from an ApplicationListIdentitiesRequest message. Also converts values to other types if specified.
         * @param message ApplicationListIdentitiesRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationListIdentitiesRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationListIdentitiesRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationListIdentitiesResponse. */
    interface IApplicationListIdentitiesResponse {

        /** ApplicationListIdentitiesResponse identities */
        identities?: (api.IApplicationIdentity[]|null);

        /** ApplicationListIdentitiesResponse totalIdentitiesCount */
        totalIdentitiesCount?: (number|null);
    }

    /** Represents an ApplicationListIdentitiesResponse. */
    class ApplicationListIdentitiesResponse implements IApplicationListIdentitiesResponse {

        /**
         * Constructs a new ApplicationListIdentitiesResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationListIdentitiesResponse);

        /** ApplicationListIdentitiesResponse identities. */
        public identities: api.IApplicationIdentity[];

        /** ApplicationListIdentitiesResponse totalIdentitiesCount. */
        public totalIdentitiesCount: number;

        /**
         * Creates a new ApplicationListIdentitiesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationListIdentitiesResponse instance
         */
        public static create(properties?: api.IApplicationListIdentitiesResponse): api.ApplicationListIdentitiesResponse;

        /**
         * Encodes the specified ApplicationListIdentitiesResponse message. Does not implicitly {@link api.ApplicationListIdentitiesResponse.verify|verify} messages.
         * @param message ApplicationListIdentitiesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationListIdentitiesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationListIdentitiesResponse message, length delimited. Does not implicitly {@link api.ApplicationListIdentitiesResponse.verify|verify} messages.
         * @param message ApplicationListIdentitiesResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationListIdentitiesResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationListIdentitiesResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationListIdentitiesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationListIdentitiesResponse;

        /**
         * Decodes an ApplicationListIdentitiesResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationListIdentitiesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationListIdentitiesResponse;

        /**
         * Verifies an ApplicationListIdentitiesResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationListIdentitiesResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationListIdentitiesResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationListIdentitiesResponse;

        /**
         * Creates a plain object from an ApplicationListIdentitiesResponse message. Also converts values to other types if specified.
         * @param message ApplicationListIdentitiesResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationListIdentitiesResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationListIdentitiesResponse to JSON.
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
        constructor(properties?: api.IIdentityPromoteRequest);

        /** IdentityPromoteRequest login. */
        public login: string;

        /** IdentityPromoteRequest admin. */
        public admin: boolean;

        /**
         * Creates a new IdentityPromoteRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPromoteRequest instance
         */
        public static create(properties?: api.IIdentityPromoteRequest): api.IdentityPromoteRequest;

        /**
         * Encodes the specified IdentityPromoteRequest message. Does not implicitly {@link api.IdentityPromoteRequest.verify|verify} messages.
         * @param message IdentityPromoteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPromoteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPromoteRequest message, length delimited. Does not implicitly {@link api.IdentityPromoteRequest.verify|verify} messages.
         * @param message IdentityPromoteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPromoteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPromoteRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPromoteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPromoteRequest;

        /**
         * Decodes an IdentityPromoteRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPromoteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPromoteRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityPromoteRequest;

        /**
         * Creates a plain object from an IdentityPromoteRequest message. Also converts values to other types if specified.
         * @param message IdentityPromoteRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPromoteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityPromoteRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetKeySetRequest. */
    interface IIdentityGetKeySetRequest {

        /** IdentityGetKeySetRequest version */
        version?: (number|null);

        /** IdentityGetKeySetRequest login */
        login?: (string|null);
    }

    /** Represents an IdentityGetKeySetRequest. */
    class IdentityGetKeySetRequest implements IIdentityGetKeySetRequest {

        /**
         * Constructs a new IdentityGetKeySetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetKeySetRequest);

        /** IdentityGetKeySetRequest version. */
        public version: number;

        /** IdentityGetKeySetRequest login. */
        public login: string;

        /**
         * Creates a new IdentityGetKeySetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetKeySetRequest instance
         */
        public static create(properties?: api.IIdentityGetKeySetRequest): api.IdentityGetKeySetRequest;

        /**
         * Encodes the specified IdentityGetKeySetRequest message. Does not implicitly {@link api.IdentityGetKeySetRequest.verify|verify} messages.
         * @param message IdentityGetKeySetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetKeySetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetKeySetRequest message, length delimited. Does not implicitly {@link api.IdentityGetKeySetRequest.verify|verify} messages.
         * @param message IdentityGetKeySetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetKeySetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetKeySetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetKeySetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetKeySetRequest;

        /**
         * Decodes an IdentityGetKeySetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetKeySetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetKeySetRequest;

        /**
         * Verifies an IdentityGetKeySetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetKeySetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetKeySetRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetKeySetRequest;

        /**
         * Creates a plain object from an IdentityGetKeySetRequest message. Also converts values to other types if specified.
         * @param message IdentityGetKeySetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetKeySetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetKeySetRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetKeySetResponse. */
    interface IIdentityGetKeySetResponse {

        /** IdentityGetKeySetResponse path */
        path?: (api.IdentityGetKeySetResponse.IPathElt[]|null);
    }

    /** Represents an IdentityGetKeySetResponse. */
    class IdentityGetKeySetResponse implements IIdentityGetKeySetResponse {

        /**
         * Constructs a new IdentityGetKeySetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetKeySetResponse);

        /** IdentityGetKeySetResponse path. */
        public path: api.IdentityGetKeySetResponse.IPathElt[];

        /**
         * Creates a new IdentityGetKeySetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetKeySetResponse instance
         */
        public static create(properties?: api.IIdentityGetKeySetResponse): api.IdentityGetKeySetResponse;

        /**
         * Encodes the specified IdentityGetKeySetResponse message. Does not implicitly {@link api.IdentityGetKeySetResponse.verify|verify} messages.
         * @param message IdentityGetKeySetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetKeySetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetKeySetResponse message, length delimited. Does not implicitly {@link api.IdentityGetKeySetResponse.verify|verify} messages.
         * @param message IdentityGetKeySetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetKeySetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetKeySetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetKeySetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetKeySetResponse;

        /**
         * Decodes an IdentityGetKeySetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetKeySetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetKeySetResponse;

        /**
         * Verifies an IdentityGetKeySetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetKeySetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetKeySetResponse
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetKeySetResponse;

        /**
         * Creates a plain object from an IdentityGetKeySetResponse message. Also converts values to other types if specified.
         * @param message IdentityGetKeySetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetKeySetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetKeySetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityGetKeySetResponse {

        /** Properties of a PathElt. */
        interface IPathElt {

            /** PathElt sharedKey */
            sharedKey?: (api.ICipher|null);

            /** PathElt encryptedKeySet */
            encryptedKeySet?: (api.IIdentityEncryptedKeySet|null);

            /** PathElt id */
            id?: (api.IIdentityKeyID|null);
        }

        /** Represents a PathElt. */
        class PathElt implements IPathElt {

            /**
             * Constructs a new PathElt.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityGetKeySetResponse.IPathElt);

            /** PathElt sharedKey. */
            public sharedKey?: (api.ICipher|null);

            /** PathElt encryptedKeySet. */
            public encryptedKeySet?: (api.IIdentityEncryptedKeySet|null);

            /** PathElt id. */
            public id?: (api.IIdentityKeyID|null);

            /**
             * Creates a new PathElt instance using the specified properties.
             * @param [properties] Properties to set
             * @returns PathElt instance
             */
            public static create(properties?: api.IdentityGetKeySetResponse.IPathElt): api.IdentityGetKeySetResponse.PathElt;

            /**
             * Encodes the specified PathElt message. Does not implicitly {@link api.IdentityGetKeySetResponse.PathElt.verify|verify} messages.
             * @param message PathElt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityGetKeySetResponse.IPathElt, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified PathElt message, length delimited. Does not implicitly {@link api.IdentityGetKeySetResponse.PathElt.verify|verify} messages.
             * @param message PathElt message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityGetKeySetResponse.IPathElt, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a PathElt message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns PathElt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetKeySetResponse.PathElt;

            /**
             * Decodes a PathElt message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns PathElt
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetKeySetResponse.PathElt;

            /**
             * Verifies a PathElt message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a PathElt message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns PathElt
             */
            public static fromObject(object: { [k: string]: any }): api.IdentityGetKeySetResponse.PathElt;

            /**
             * Creates a plain object from a PathElt message. Also converts values to other types if specified.
             * @param message PathElt
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityGetKeySetResponse.PathElt, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this PathElt to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an IdentityGetSharingGroupRequest. */
    interface IIdentityGetSharingGroupRequest {

        /** IdentityGetSharingGroupRequest login */
        login?: (string|null);
    }

    /** Represents an IdentityGetSharingGroupRequest. */
    class IdentityGetSharingGroupRequest implements IIdentityGetSharingGroupRequest {

        /**
         * Constructs a new IdentityGetSharingGroupRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetSharingGroupRequest);

        /** IdentityGetSharingGroupRequest login. */
        public login: string;

        /**
         * Creates a new IdentityGetSharingGroupRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGroupRequest instance
         */
        public static create(properties?: api.IIdentityGetSharingGroupRequest): api.IdentityGetSharingGroupRequest;

        /**
         * Encodes the specified IdentityGetSharingGroupRequest message. Does not implicitly {@link api.IdentityGetSharingGroupRequest.verify|verify} messages.
         * @param message IdentityGetSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGroupRequest message, length delimited. Does not implicitly {@link api.IdentityGetSharingGroupRequest.verify|verify} messages.
         * @param message IdentityGetSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGroupRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetSharingGroupRequest;

        /**
         * Decodes an IdentityGetSharingGroupRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetSharingGroupRequest;

        /**
         * Verifies an IdentityGetSharingGroupRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetSharingGroupRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetSharingGroupRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetSharingGroupRequest;

        /**
         * Creates a plain object from an IdentityGetSharingGroupRequest message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGroupRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetSharingGroupRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGroupRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetAccessGroupRequest. */
    interface IIdentityGetAccessGroupRequest {

        /** IdentityGetAccessGroupRequest login */
        login?: (string|null);
    }

    /** Represents an IdentityGetAccessGroupRequest. */
    class IdentityGetAccessGroupRequest implements IIdentityGetAccessGroupRequest {

        /**
         * Constructs a new IdentityGetAccessGroupRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetAccessGroupRequest);

        /** IdentityGetAccessGroupRequest login. */
        public login: string;

        /**
         * Creates a new IdentityGetAccessGroupRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetAccessGroupRequest instance
         */
        public static create(properties?: api.IIdentityGetAccessGroupRequest): api.IdentityGetAccessGroupRequest;

        /**
         * Encodes the specified IdentityGetAccessGroupRequest message. Does not implicitly {@link api.IdentityGetAccessGroupRequest.verify|verify} messages.
         * @param message IdentityGetAccessGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetAccessGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetAccessGroupRequest message, length delimited. Does not implicitly {@link api.IdentityGetAccessGroupRequest.verify|verify} messages.
         * @param message IdentityGetAccessGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetAccessGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetAccessGroupRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetAccessGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetAccessGroupRequest;

        /**
         * Decodes an IdentityGetAccessGroupRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetAccessGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetAccessGroupRequest;

        /**
         * Verifies an IdentityGetAccessGroupRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetAccessGroupRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetAccessGroupRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetAccessGroupRequest;

        /**
         * Creates a plain object from an IdentityGetAccessGroupRequest message. Also converts values to other types if specified.
         * @param message IdentityGetAccessGroupRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetAccessGroupRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetAccessGroupRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetSharingGraphRequest. */
    interface IIdentityGetSharingGraphRequest {

        /** IdentityGetSharingGraphRequest login */
        login?: (string|null);
    }

    /** Represents an IdentityGetSharingGraphRequest. */
    class IdentityGetSharingGraphRequest implements IIdentityGetSharingGraphRequest {

        /**
         * Constructs a new IdentityGetSharingGraphRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetSharingGraphRequest);

        /** IdentityGetSharingGraphRequest login. */
        public login: string;

        /**
         * Creates a new IdentityGetSharingGraphRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGraphRequest instance
         */
        public static create(properties?: api.IIdentityGetSharingGraphRequest): api.IdentityGetSharingGraphRequest;

        /**
         * Encodes the specified IdentityGetSharingGraphRequest message. Does not implicitly {@link api.IdentityGetSharingGraphRequest.verify|verify} messages.
         * @param message IdentityGetSharingGraphRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetSharingGraphRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGraphRequest message, length delimited. Does not implicitly {@link api.IdentityGetSharingGraphRequest.verify|verify} messages.
         * @param message IdentityGetSharingGraphRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetSharingGraphRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGraphRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGraphRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetSharingGraphRequest;

        /**
         * Decodes an IdentityGetSharingGraphRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGraphRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetSharingGraphRequest;

        /**
         * Verifies an IdentityGetSharingGraphRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetSharingGraphRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetSharingGraphRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetSharingGraphRequest;

        /**
         * Creates a plain object from an IdentityGetSharingGraphRequest message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGraphRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetSharingGraphRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGraphRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetKeysToRenewRequest. */
    interface IIdentityGetKeysToRenewRequest {

        /** IdentityGetKeysToRenewRequest login */
        login?: (string|null);
    }

    /** Represents an IdentityGetKeysToRenewRequest. */
    class IdentityGetKeysToRenewRequest implements IIdentityGetKeysToRenewRequest {

        /**
         * Constructs a new IdentityGetKeysToRenewRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetKeysToRenewRequest);

        /** IdentityGetKeysToRenewRequest login. */
        public login: string;

        /**
         * Creates a new IdentityGetKeysToRenewRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetKeysToRenewRequest instance
         */
        public static create(properties?: api.IIdentityGetKeysToRenewRequest): api.IdentityGetKeysToRenewRequest;

        /**
         * Encodes the specified IdentityGetKeysToRenewRequest message. Does not implicitly {@link api.IdentityGetKeysToRenewRequest.verify|verify} messages.
         * @param message IdentityGetKeysToRenewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetKeysToRenewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetKeysToRenewRequest message, length delimited. Does not implicitly {@link api.IdentityGetKeysToRenewRequest.verify|verify} messages.
         * @param message IdentityGetKeysToRenewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetKeysToRenewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetKeysToRenewRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetKeysToRenewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetKeysToRenewRequest;

        /**
         * Decodes an IdentityGetKeysToRenewRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetKeysToRenewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetKeysToRenewRequest;

        /**
         * Verifies an IdentityGetKeysToRenewRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetKeysToRenewRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetKeysToRenewRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetKeysToRenewRequest;

        /**
         * Creates a plain object from an IdentityGetKeysToRenewRequest message. Also converts values to other types if specified.
         * @param message IdentityGetKeysToRenewRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetKeysToRenewRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetKeysToRenewRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetPublicKeysRequest. */
    interface IIdentityGetPublicKeysRequest {

        /** IdentityGetPublicKeysRequest ids */
        ids?: (api.IIdentityKeyID[]|null);
    }

    /** Represents an IdentityGetPublicKeysRequest. */
    class IdentityGetPublicKeysRequest implements IIdentityGetPublicKeysRequest {

        /**
         * Constructs a new IdentityGetPublicKeysRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetPublicKeysRequest);

        /** IdentityGetPublicKeysRequest ids. */
        public ids: api.IIdentityKeyID[];

        /**
         * Creates a new IdentityGetPublicKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicKeysRequest instance
         */
        public static create(properties?: api.IIdentityGetPublicKeysRequest): api.IdentityGetPublicKeysRequest;

        /**
         * Encodes the specified IdentityGetPublicKeysRequest message. Does not implicitly {@link api.IdentityGetPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicKeysRequest message, length delimited. Does not implicitly {@link api.IdentityGetPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetPublicKeysRequest;

        /**
         * Decodes an IdentityGetPublicKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetPublicKeysRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetPublicKeysRequest;

        /**
         * Creates a plain object from an IdentityGetPublicKeysRequest message. Also converts values to other types if specified.
         * @param message IdentityGetPublicKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetPublicKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetPublicKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetPublicKeysResponse. */
    interface IIdentityGetPublicKeysResponse {

        /** IdentityGetPublicKeysResponse publicKeys */
        publicKeys?: (api.IIdentityPublicKey[]|null);
    }

    /** Represents an IdentityGetPublicKeysResponse. */
    class IdentityGetPublicKeysResponse implements IIdentityGetPublicKeysResponse {

        /**
         * Constructs a new IdentityGetPublicKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetPublicKeysResponse);

        /** IdentityGetPublicKeysResponse publicKeys. */
        public publicKeys: api.IIdentityPublicKey[];

        /**
         * Creates a new IdentityGetPublicKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicKeysResponse instance
         */
        public static create(properties?: api.IIdentityGetPublicKeysResponse): api.IdentityGetPublicKeysResponse;

        /**
         * Encodes the specified IdentityGetPublicKeysResponse message. Does not implicitly {@link api.IdentityGetPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicKeysResponse message, length delimited. Does not implicitly {@link api.IdentityGetPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetPublicKeysResponse;

        /**
         * Decodes an IdentityGetPublicKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetPublicKeysResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetPublicKeysResponse;

        /**
         * Creates a plain object from an IdentityGetPublicKeysResponse message. Also converts values to other types if specified.
         * @param message IdentityGetPublicKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetPublicKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityGetLatestPublicKeysRequest);

        /** IdentityGetLatestPublicKeysRequest logins. */
        public logins: string[];

        /**
         * Creates a new IdentityGetLatestPublicKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicKeysRequest instance
         */
        public static create(properties?: api.IIdentityGetLatestPublicKeysRequest): api.IdentityGetLatestPublicKeysRequest;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysRequest message. Does not implicitly {@link api.IdentityGetLatestPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetLatestPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysRequest message, length delimited. Does not implicitly {@link api.IdentityGetLatestPublicKeysRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetLatestPublicKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLatestPublicKeysRequest;

        /**
         * Decodes an IdentityGetLatestPublicKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLatestPublicKeysRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetLatestPublicKeysRequest;

        /**
         * Creates a plain object from an IdentityGetLatestPublicKeysRequest message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetLatestPublicKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLatestPublicKeysResponse. */
    interface IIdentityGetLatestPublicKeysResponse {

        /** IdentityGetLatestPublicKeysResponse publicKeys */
        publicKeys?: (api.IIdentityPublicKey[]|null);
    }

    /** Represents an IdentityGetLatestPublicKeysResponse. */
    class IdentityGetLatestPublicKeysResponse implements IIdentityGetLatestPublicKeysResponse {

        /**
         * Constructs a new IdentityGetLatestPublicKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetLatestPublicKeysResponse);

        /** IdentityGetLatestPublicKeysResponse publicKeys. */
        public publicKeys: api.IIdentityPublicKey[];

        /**
         * Creates a new IdentityGetLatestPublicKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicKeysResponse instance
         */
        public static create(properties?: api.IIdentityGetLatestPublicKeysResponse): api.IdentityGetLatestPublicKeysResponse;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysResponse message. Does not implicitly {@link api.IdentityGetLatestPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetLatestPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicKeysResponse message, length delimited. Does not implicitly {@link api.IdentityGetLatestPublicKeysResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetLatestPublicKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLatestPublicKeysResponse;

        /**
         * Decodes an IdentityGetLatestPublicKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLatestPublicKeysResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetLatestPublicKeysResponse;

        /**
         * Creates a plain object from an IdentityGetLatestPublicKeysResponse message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetLatestPublicKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicKeysResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetPublicChainsRequest. */
    interface IIdentityGetPublicChainsRequest {

        /** IdentityGetPublicChainsRequest ids */
        ids?: (api.IdentityGetPublicChainsRequest.IE[]|null);
    }

    /** Represents an IdentityGetPublicChainsRequest. */
    class IdentityGetPublicChainsRequest implements IIdentityGetPublicChainsRequest {

        /**
         * Constructs a new IdentityGetPublicChainsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetPublicChainsRequest);

        /** IdentityGetPublicChainsRequest ids. */
        public ids: api.IdentityGetPublicChainsRequest.IE[];

        /**
         * Creates a new IdentityGetPublicChainsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicChainsRequest instance
         */
        public static create(properties?: api.IIdentityGetPublicChainsRequest): api.IdentityGetPublicChainsRequest;

        /**
         * Encodes the specified IdentityGetPublicChainsRequest message. Does not implicitly {@link api.IdentityGetPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicChainsRequest message, length delimited. Does not implicitly {@link api.IdentityGetPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicChainsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetPublicChainsRequest;

        /**
         * Decodes an IdentityGetPublicChainsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetPublicChainsRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetPublicChainsRequest;

        /**
         * Creates a plain object from an IdentityGetPublicChainsRequest message. Also converts values to other types if specified.
         * @param message IdentityGetPublicChainsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetPublicChainsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            id?: (api.IIdentityKeyID|null);

            /** E since */
            since?: (number|null);
        }

        /** Represents a E. */
        class E implements IE {

            /**
             * Constructs a new E.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityGetPublicChainsRequest.IE);

            /** E id. */
            public id?: (api.IIdentityKeyID|null);

            /** E since. */
            public since: number;

            /**
             * Creates a new E instance using the specified properties.
             * @param [properties] Properties to set
             * @returns E instance
             */
            public static create(properties?: api.IdentityGetPublicChainsRequest.IE): api.IdentityGetPublicChainsRequest.E;

            /**
             * Encodes the specified E message. Does not implicitly {@link api.IdentityGetPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityGetPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified E message, length delimited. Does not implicitly {@link api.IdentityGetPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityGetPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a E message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetPublicChainsRequest.E;

            /**
             * Decodes a E message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetPublicChainsRequest.E;

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
            public static fromObject(object: { [k: string]: any }): api.IdentityGetPublicChainsRequest.E;

            /**
             * Creates a plain object from a E message. Also converts values to other types if specified.
             * @param message E
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityGetPublicChainsRequest.E, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        chains?: (api.IIdentityPublicChain[]|null);
    }

    /** Represents an IdentityGetPublicChainsResponse. */
    class IdentityGetPublicChainsResponse implements IIdentityGetPublicChainsResponse {

        /**
         * Constructs a new IdentityGetPublicChainsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetPublicChainsResponse);

        /** IdentityGetPublicChainsResponse chains. */
        public chains: api.IIdentityPublicChain[];

        /**
         * Creates a new IdentityGetPublicChainsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetPublicChainsResponse instance
         */
        public static create(properties?: api.IIdentityGetPublicChainsResponse): api.IdentityGetPublicChainsResponse;

        /**
         * Encodes the specified IdentityGetPublicChainsResponse message. Does not implicitly {@link api.IdentityGetPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetPublicChainsResponse message, length delimited. Does not implicitly {@link api.IdentityGetPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetPublicChainsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetPublicChainsResponse;

        /**
         * Decodes an IdentityGetPublicChainsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetPublicChainsResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetPublicChainsResponse;

        /**
         * Creates a plain object from an IdentityGetPublicChainsResponse message. Also converts values to other types if specified.
         * @param message IdentityGetPublicChainsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetPublicChainsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetPublicChainsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLatestPublicChainsRequest. */
    interface IIdentityGetLatestPublicChainsRequest {

        /** IdentityGetLatestPublicChainsRequest ids */
        ids?: (api.IdentityGetLatestPublicChainsRequest.IE[]|null);
    }

    /** Represents an IdentityGetLatestPublicChainsRequest. */
    class IdentityGetLatestPublicChainsRequest implements IIdentityGetLatestPublicChainsRequest {

        /**
         * Constructs a new IdentityGetLatestPublicChainsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetLatestPublicChainsRequest);

        /** IdentityGetLatestPublicChainsRequest ids. */
        public ids: api.IdentityGetLatestPublicChainsRequest.IE[];

        /**
         * Creates a new IdentityGetLatestPublicChainsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicChainsRequest instance
         */
        public static create(properties?: api.IIdentityGetLatestPublicChainsRequest): api.IdentityGetLatestPublicChainsRequest;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsRequest message. Does not implicitly {@link api.IdentityGetLatestPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetLatestPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsRequest message, length delimited. Does not implicitly {@link api.IdentityGetLatestPublicChainsRequest.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetLatestPublicChainsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicChainsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLatestPublicChainsRequest;

        /**
         * Decodes an IdentityGetLatestPublicChainsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicChainsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLatestPublicChainsRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetLatestPublicChainsRequest;

        /**
         * Creates a plain object from an IdentityGetLatestPublicChainsRequest message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicChainsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetLatestPublicChainsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
            constructor(properties?: api.IdentityGetLatestPublicChainsRequest.IE);

            /** E login. */
            public login: string;

            /** E since. */
            public since: number;

            /**
             * Creates a new E instance using the specified properties.
             * @param [properties] Properties to set
             * @returns E instance
             */
            public static create(properties?: api.IdentityGetLatestPublicChainsRequest.IE): api.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Encodes the specified E message. Does not implicitly {@link api.IdentityGetLatestPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityGetLatestPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified E message, length delimited. Does not implicitly {@link api.IdentityGetLatestPublicChainsRequest.E.verify|verify} messages.
             * @param message E message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityGetLatestPublicChainsRequest.IE, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a E message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Decodes a E message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns E
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLatestPublicChainsRequest.E;

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
            public static fromObject(object: { [k: string]: any }): api.IdentityGetLatestPublicChainsRequest.E;

            /**
             * Creates a plain object from a E message. Also converts values to other types if specified.
             * @param message E
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityGetLatestPublicChainsRequest.E, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        chains?: (api.IIdentityPublicChain[]|null);
    }

    /** Represents an IdentityGetLatestPublicChainsResponse. */
    class IdentityGetLatestPublicChainsResponse implements IIdentityGetLatestPublicChainsResponse {

        /**
         * Constructs a new IdentityGetLatestPublicChainsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetLatestPublicChainsResponse);

        /** IdentityGetLatestPublicChainsResponse chains. */
        public chains: api.IIdentityPublicChain[];

        /**
         * Creates a new IdentityGetLatestPublicChainsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLatestPublicChainsResponse instance
         */
        public static create(properties?: api.IIdentityGetLatestPublicChainsResponse): api.IdentityGetLatestPublicChainsResponse;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsResponse message. Does not implicitly {@link api.IdentityGetLatestPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetLatestPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLatestPublicChainsResponse message, length delimited. Does not implicitly {@link api.IdentityGetLatestPublicChainsResponse.verify|verify} messages.
         * @param message IdentityGetLatestPublicChainsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetLatestPublicChainsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLatestPublicChainsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLatestPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLatestPublicChainsResponse;

        /**
         * Decodes an IdentityGetLatestPublicChainsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLatestPublicChainsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLatestPublicChainsResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetLatestPublicChainsResponse;

        /**
         * Creates a plain object from an IdentityGetLatestPublicChainsResponse message. Also converts values to other types if specified.
         * @param message IdentityGetLatestPublicChainsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetLatestPublicChainsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLatestPublicChainsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityShareLink. */
    interface IIdentityShareLink {

        /** IdentityShareLink id */
        id?: (api.IIdentityKeyID|null);

        /** IdentityShareLink kind */
        kind?: (api.IdentityShareKind|null);

        /** IdentityShareLink locked */
        locked?: (boolean|null);
    }

    /** Represents an IdentityShareLink. */
    class IdentityShareLink implements IIdentityShareLink {

        /**
         * Constructs a new IdentityShareLink.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityShareLink);

        /** IdentityShareLink id. */
        public id?: (api.IIdentityKeyID|null);

        /** IdentityShareLink kind. */
        public kind: api.IdentityShareKind;

        /** IdentityShareLink locked. */
        public locked: boolean;

        /**
         * Creates a new IdentityShareLink instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityShareLink instance
         */
        public static create(properties?: api.IIdentityShareLink): api.IdentityShareLink;

        /**
         * Encodes the specified IdentityShareLink message. Does not implicitly {@link api.IdentityShareLink.verify|verify} messages.
         * @param message IdentityShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityShareLink message, length delimited. Does not implicitly {@link api.IdentityShareLink.verify|verify} messages.
         * @param message IdentityShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityShareLink message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityShareLink;

        /**
         * Decodes an IdentityShareLink message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityShareLink;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityShareLink;

        /**
         * Creates a plain object from an IdentityShareLink message. Also converts values to other types if specified.
         * @param message IdentityShareLink
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityShareLink, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityShareLink to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetSharingGroupResponse. */
    interface IIdentityGetSharingGroupResponse {

        /** IdentityGetSharingGroupResponse sharingGroup */
        sharingGroup?: (api.IIdentityShareLink[]|null);
    }

    /** Represents an IdentityGetSharingGroupResponse. */
    class IdentityGetSharingGroupResponse implements IIdentityGetSharingGroupResponse {

        /**
         * Constructs a new IdentityGetSharingGroupResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetSharingGroupResponse);

        /** IdentityGetSharingGroupResponse sharingGroup. */
        public sharingGroup: api.IIdentityShareLink[];

        /**
         * Creates a new IdentityGetSharingGroupResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGroupResponse instance
         */
        public static create(properties?: api.IIdentityGetSharingGroupResponse): api.IdentityGetSharingGroupResponse;

        /**
         * Encodes the specified IdentityGetSharingGroupResponse message. Does not implicitly {@link api.IdentityGetSharingGroupResponse.verify|verify} messages.
         * @param message IdentityGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGroupResponse message, length delimited. Does not implicitly {@link api.IdentityGetSharingGroupResponse.verify|verify} messages.
         * @param message IdentityGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGroupResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetSharingGroupResponse;

        /**
         * Decodes an IdentityGetSharingGroupResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetSharingGroupResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetSharingGroupResponse;

        /**
         * Creates a plain object from an IdentityGetSharingGroupResponse message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGroupResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetSharingGroupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGroupResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetAccessGroupResponse. */
    interface IIdentityGetAccessGroupResponse {

        /** IdentityGetAccessGroupResponse accessGroup */
        accessGroup?: (api.IIdentityShareLink[]|null);
    }

    /** Represents an IdentityGetAccessGroupResponse. */
    class IdentityGetAccessGroupResponse implements IIdentityGetAccessGroupResponse {

        /**
         * Constructs a new IdentityGetAccessGroupResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetAccessGroupResponse);

        /** IdentityGetAccessGroupResponse accessGroup. */
        public accessGroup: api.IIdentityShareLink[];

        /**
         * Creates a new IdentityGetAccessGroupResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetAccessGroupResponse instance
         */
        public static create(properties?: api.IIdentityGetAccessGroupResponse): api.IdentityGetAccessGroupResponse;

        /**
         * Encodes the specified IdentityGetAccessGroupResponse message. Does not implicitly {@link api.IdentityGetAccessGroupResponse.verify|verify} messages.
         * @param message IdentityGetAccessGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetAccessGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetAccessGroupResponse message, length delimited. Does not implicitly {@link api.IdentityGetAccessGroupResponse.verify|verify} messages.
         * @param message IdentityGetAccessGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetAccessGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetAccessGroupResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetAccessGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetAccessGroupResponse;

        /**
         * Decodes an IdentityGetAccessGroupResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetAccessGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetAccessGroupResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetAccessGroupResponse;

        /**
         * Creates a plain object from an IdentityGetAccessGroupResponse message. Also converts values to other types if specified.
         * @param message IdentityGetAccessGroupResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetAccessGroupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        kind?: (api.IdentityShareKind|null);
    }

    /** Represents an IdentityShareEntry. */
    class IdentityShareEntry implements IIdentityShareEntry {

        /**
         * Constructs a new IdentityShareEntry.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityShareEntry);

        /** IdentityShareEntry login. */
        public login: string;

        /** IdentityShareEntry version. */
        public version: number;

        /** IdentityShareEntry nonce. */
        public nonce: Uint8Array;

        /** IdentityShareEntry encryptedKey. */
        public encryptedKey: Uint8Array;

        /** IdentityShareEntry kind. */
        public kind: api.IdentityShareKind;

        /**
         * Creates a new IdentityShareEntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityShareEntry instance
         */
        public static create(properties?: api.IIdentityShareEntry): api.IdentityShareEntry;

        /**
         * Encodes the specified IdentityShareEntry message. Does not implicitly {@link api.IdentityShareEntry.verify|verify} messages.
         * @param message IdentityShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityShareEntry message, length delimited. Does not implicitly {@link api.IdentityShareEntry.verify|verify} messages.
         * @param message IdentityShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityShareEntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityShareEntry;

        /**
         * Decodes an IdentityShareEntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityShareEntry;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityShareEntry;

        /**
         * Creates a plain object from an IdentityShareEntry message. Also converts values to other types if specified.
         * @param message IdentityShareEntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityShareEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sharingGroup?: (api.IIdentityShareEntry[]|null);
    }

    /** Represents an IdentityShareRequest. */
    class IdentityShareRequest implements IIdentityShareRequest {

        /**
         * Constructs a new IdentityShareRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityShareRequest);

        /** IdentityShareRequest login. */
        public login: string;

        /** IdentityShareRequest version. */
        public version: number;

        /** IdentityShareRequest sharingGroup. */
        public sharingGroup: api.IIdentityShareEntry[];

        /**
         * Creates a new IdentityShareRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityShareRequest instance
         */
        public static create(properties?: api.IIdentityShareRequest): api.IdentityShareRequest;

        /**
         * Encodes the specified IdentityShareRequest message. Does not implicitly {@link api.IdentityShareRequest.verify|verify} messages.
         * @param message IdentityShareRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityShareRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityShareRequest message, length delimited. Does not implicitly {@link api.IdentityShareRequest.verify|verify} messages.
         * @param message IdentityShareRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityShareRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityShareRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityShareRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityShareRequest;

        /**
         * Decodes an IdentityShareRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityShareRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityShareRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityShareRequest;

        /**
         * Creates a plain object from an IdentityShareRequest message. Also converts values to other types if specified.
         * @param message IdentityShareRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityShareRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityShareRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetEncryptionResponse. */
    interface IIdentityGetEncryptionResponse {

        /** IdentityGetEncryptionResponse encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);
    }

    /** Represents an IdentityGetEncryptionResponse. */
    class IdentityGetEncryptionResponse implements IIdentityGetEncryptionResponse {

        /**
         * Constructs a new IdentityGetEncryptionResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetEncryptionResponse);

        /** IdentityGetEncryptionResponse encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /**
         * Creates a new IdentityGetEncryptionResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetEncryptionResponse instance
         */
        public static create(properties?: api.IIdentityGetEncryptionResponse): api.IdentityGetEncryptionResponse;

        /**
         * Encodes the specified IdentityGetEncryptionResponse message. Does not implicitly {@link api.IdentityGetEncryptionResponse.verify|verify} messages.
         * @param message IdentityGetEncryptionResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetEncryptionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetEncryptionResponse message, length delimited. Does not implicitly {@link api.IdentityGetEncryptionResponse.verify|verify} messages.
         * @param message IdentityGetEncryptionResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetEncryptionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetEncryptionResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetEncryptionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetEncryptionResponse;

        /**
         * Decodes an IdentityGetEncryptionResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetEncryptionResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetEncryptionResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetEncryptionResponse;

        /**
         * Creates a plain object from an IdentityGetEncryptionResponse message. Also converts values to other types if specified.
         * @param message IdentityGetEncryptionResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetEncryptionResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetEncryptionResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetKeysToRenewResponse. */
    interface IIdentityGetKeysToRenewResponse {

        /** IdentityGetKeysToRenewResponse encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityGetKeysToRenewResponse sharingGroup */
        sharingGroup?: (api.IIdentityPublicKey[]|null);
    }

    /** Represents an IdentityGetKeysToRenewResponse. */
    class IdentityGetKeysToRenewResponse implements IIdentityGetKeysToRenewResponse {

        /**
         * Constructs a new IdentityGetKeysToRenewResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetKeysToRenewResponse);

        /** IdentityGetKeysToRenewResponse encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityGetKeysToRenewResponse sharingGroup. */
        public sharingGroup: api.IIdentityPublicKey[];

        /**
         * Creates a new IdentityGetKeysToRenewResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetKeysToRenewResponse instance
         */
        public static create(properties?: api.IIdentityGetKeysToRenewResponse): api.IdentityGetKeysToRenewResponse;

        /**
         * Encodes the specified IdentityGetKeysToRenewResponse message. Does not implicitly {@link api.IdentityGetKeysToRenewResponse.verify|verify} messages.
         * @param message IdentityGetKeysToRenewResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetKeysToRenewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetKeysToRenewResponse message, length delimited. Does not implicitly {@link api.IdentityGetKeysToRenewResponse.verify|verify} messages.
         * @param message IdentityGetKeysToRenewResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetKeysToRenewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetKeysToRenewResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetKeysToRenewResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetKeysToRenewResponse;

        /**
         * Decodes an IdentityGetKeysToRenewResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetKeysToRenewResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetKeysToRenewResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetKeysToRenewResponse;

        /**
         * Creates a plain object from an IdentityGetKeysToRenewResponse message. Also converts values to other types if specified.
         * @param message IdentityGetKeysToRenewResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetKeysToRenewResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityBackwardKey);

        /** IdentityBackwardKey nonce. */
        public nonce: Uint8Array;

        /** IdentityBackwardKey encryptedKey. */
        public encryptedKey: Uint8Array;

        /**
         * Creates a new IdentityBackwardKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityBackwardKey instance
         */
        public static create(properties?: api.IIdentityBackwardKey): api.IdentityBackwardKey;

        /**
         * Encodes the specified IdentityBackwardKey message. Does not implicitly {@link api.IdentityBackwardKey.verify|verify} messages.
         * @param message IdentityBackwardKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityBackwardKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityBackwardKey message, length delimited. Does not implicitly {@link api.IdentityBackwardKey.verify|verify} messages.
         * @param message IdentityBackwardKey message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityBackwardKey, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityBackwardKey message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityBackwardKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityBackwardKey;

        /**
         * Decodes an IdentityBackwardKey message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityBackwardKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityBackwardKey;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityBackwardKey;

        /**
         * Creates a plain object from an IdentityBackwardKey message. Also converts values to other types if specified.
         * @param message IdentityBackwardKey
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityBackwardKey, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityPostKeysToRenewRequest signChain */
        signChain?: (Uint8Array|null);

        /** IdentityPostKeysToRenewRequest sharingGroup */
        sharingGroup?: (api.IIdentityShareEntry[]|null);

        /** IdentityPostKeysToRenewRequest backward */
        backward?: (api.IIdentityBackwardKey|null);
    }

    /** Represents an IdentityPostKeysToRenewRequest. */
    class IdentityPostKeysToRenewRequest implements IIdentityPostKeysToRenewRequest {

        /**
         * Constructs a new IdentityPostKeysToRenewRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityPostKeysToRenewRequest);

        /** IdentityPostKeysToRenewRequest login. */
        public login: string;

        /** IdentityPostKeysToRenewRequest encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /** IdentityPostKeysToRenewRequest signChain. */
        public signChain: Uint8Array;

        /** IdentityPostKeysToRenewRequest sharingGroup. */
        public sharingGroup: api.IIdentityShareEntry[];

        /** IdentityPostKeysToRenewRequest backward. */
        public backward?: (api.IIdentityBackwardKey|null);

        /**
         * Creates a new IdentityPostKeysToRenewRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPostKeysToRenewRequest instance
         */
        public static create(properties?: api.IIdentityPostKeysToRenewRequest): api.IdentityPostKeysToRenewRequest;

        /**
         * Encodes the specified IdentityPostKeysToRenewRequest message. Does not implicitly {@link api.IdentityPostKeysToRenewRequest.verify|verify} messages.
         * @param message IdentityPostKeysToRenewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPostKeysToRenewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPostKeysToRenewRequest message, length delimited. Does not implicitly {@link api.IdentityPostKeysToRenewRequest.verify|verify} messages.
         * @param message IdentityPostKeysToRenewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPostKeysToRenewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPostKeysToRenewRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPostKeysToRenewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPostKeysToRenewRequest;

        /**
         * Decodes an IdentityPostKeysToRenewRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPostKeysToRenewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPostKeysToRenewRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityPostKeysToRenewRequest;

        /**
         * Creates a plain object from an IdentityPostKeysToRenewRequest message. Also converts values to other types if specified.
         * @param message IdentityPostKeysToRenewRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPostKeysToRenewRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sharingKey?: (api.ICipher|null);

        /** IdentityGetSharingGraphElement boxKey */
        boxKey?: (api.ICipher|null);

        /** IdentityGetSharingGraphElement signKey */
        signKey?: (api.ICipher|null);

        /** IdentityGetSharingGraphElement sharingGroup */
        sharingGroup?: (api.IIdentityPublicKey[]|null);

        /** IdentityGetSharingGraphElement sharedFrom */
        sharedFrom?: (api.IIdentityKeyID|null);

        /** IdentityGetSharingGraphElement latest */
        latest?: (boolean|null);

        /** IdentityGetSharingGraphElement boxPublicKey */
        boxPublicKey?: (Uint8Array|null);

        /** IdentityGetSharingGraphElement signPublicKey */
        signPublicKey?: (Uint8Array|null);
    }

    /** Represents an IdentityGetSharingGraphElement. */
    class IdentityGetSharingGraphElement implements IIdentityGetSharingGraphElement {

        /**
         * Constructs a new IdentityGetSharingGraphElement.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetSharingGraphElement);

        /** IdentityGetSharingGraphElement login. */
        public login: string;

        /** IdentityGetSharingGraphElement version. */
        public version: number;

        /** IdentityGetSharingGraphElement masterPublicKey. */
        public masterPublicKey: Uint8Array;

        /** IdentityGetSharingGraphElement sharingKey. */
        public sharingKey?: (api.ICipher|null);

        /** IdentityGetSharingGraphElement boxKey. */
        public boxKey?: (api.ICipher|null);

        /** IdentityGetSharingGraphElement signKey. */
        public signKey?: (api.ICipher|null);

        /** IdentityGetSharingGraphElement sharingGroup. */
        public sharingGroup: api.IIdentityPublicKey[];

        /** IdentityGetSharingGraphElement sharedFrom. */
        public sharedFrom?: (api.IIdentityKeyID|null);

        /** IdentityGetSharingGraphElement latest. */
        public latest: boolean;

        /** IdentityGetSharingGraphElement boxPublicKey. */
        public boxPublicKey: Uint8Array;

        /** IdentityGetSharingGraphElement signPublicKey. */
        public signPublicKey: Uint8Array;

        /**
         * Creates a new IdentityGetSharingGraphElement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGraphElement instance
         */
        public static create(properties?: api.IIdentityGetSharingGraphElement): api.IdentityGetSharingGraphElement;

        /**
         * Encodes the specified IdentityGetSharingGraphElement message. Does not implicitly {@link api.IdentityGetSharingGraphElement.verify|verify} messages.
         * @param message IdentityGetSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGraphElement message, length delimited. Does not implicitly {@link api.IdentityGetSharingGraphElement.verify|verify} messages.
         * @param message IdentityGetSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGraphElement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetSharingGraphElement;

        /**
         * Decodes an IdentityGetSharingGraphElement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetSharingGraphElement;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetSharingGraphElement;

        /**
         * Creates a plain object from an IdentityGetSharingGraphElement message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGraphElement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetSharingGraphElement, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetSharingGraphElement to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetSharingGraphResponse. */
    interface IIdentityGetSharingGraphResponse {

        /** IdentityGetSharingGraphResponse graph */
        graph?: (api.IIdentityGetSharingGraphElement[]|null);
    }

    /** Represents an IdentityGetSharingGraphResponse. */
    class IdentityGetSharingGraphResponse implements IIdentityGetSharingGraphResponse {

        /**
         * Constructs a new IdentityGetSharingGraphResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetSharingGraphResponse);

        /** IdentityGetSharingGraphResponse graph. */
        public graph: api.IIdentityGetSharingGraphElement[];

        /**
         * Creates a new IdentityGetSharingGraphResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetSharingGraphResponse instance
         */
        public static create(properties?: api.IIdentityGetSharingGraphResponse): api.IdentityGetSharingGraphResponse;

        /**
         * Encodes the specified IdentityGetSharingGraphResponse message. Does not implicitly {@link api.IdentityGetSharingGraphResponse.verify|verify} messages.
         * @param message IdentityGetSharingGraphResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetSharingGraphResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetSharingGraphResponse message, length delimited. Does not implicitly {@link api.IdentityGetSharingGraphResponse.verify|verify} messages.
         * @param message IdentityGetSharingGraphResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetSharingGraphResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetSharingGraphResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetSharingGraphResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetSharingGraphResponse;

        /**
         * Decodes an IdentityGetSharingGraphResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetSharingGraphResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetSharingGraphResponse;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityGetSharingGraphResponse;

        /**
         * Creates a plain object from an IdentityGetSharingGraphResponse message. Also converts values to other types if specified.
         * @param message IdentityGetSharingGraphResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetSharingGraphResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sharingGroup?: (api.IIdentityShareEntry[]|null);

        /** IdentityPostSharingGraphElement backward */
        backward?: (api.IIdentityBackwardKey|null);

        /** IdentityPostSharingGraphElement encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);
    }

    /** Represents an IdentityPostSharingGraphElement. */
    class IdentityPostSharingGraphElement implements IIdentityPostSharingGraphElement {

        /**
         * Constructs a new IdentityPostSharingGraphElement.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityPostSharingGraphElement);

        /** IdentityPostSharingGraphElement login. */
        public login: string;

        /** IdentityPostSharingGraphElement version. */
        public version: number;

        /** IdentityPostSharingGraphElement signChain. */
        public signChain: Uint8Array;

        /** IdentityPostSharingGraphElement sharingGroup. */
        public sharingGroup: api.IIdentityShareEntry[];

        /** IdentityPostSharingGraphElement backward. */
        public backward?: (api.IIdentityBackwardKey|null);

        /** IdentityPostSharingGraphElement encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /**
         * Creates a new IdentityPostSharingGraphElement instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPostSharingGraphElement instance
         */
        public static create(properties?: api.IIdentityPostSharingGraphElement): api.IdentityPostSharingGraphElement;

        /**
         * Encodes the specified IdentityPostSharingGraphElement message. Does not implicitly {@link api.IdentityPostSharingGraphElement.verify|verify} messages.
         * @param message IdentityPostSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPostSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPostSharingGraphElement message, length delimited. Does not implicitly {@link api.IdentityPostSharingGraphElement.verify|verify} messages.
         * @param message IdentityPostSharingGraphElement message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPostSharingGraphElement, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPostSharingGraphElement message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPostSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPostSharingGraphElement;

        /**
         * Decodes an IdentityPostSharingGraphElement message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPostSharingGraphElement
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPostSharingGraphElement;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityPostSharingGraphElement;

        /**
         * Creates a plain object from an IdentityPostSharingGraphElement message. Also converts values to other types if specified.
         * @param message IdentityPostSharingGraphElement
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPostSharingGraphElement, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        graph?: (api.IIdentityPostSharingGraphElement[]|null);
    }

    /** Represents an IdentityPostSharingGraphRequest. */
    class IdentityPostSharingGraphRequest implements IIdentityPostSharingGraphRequest {

        /**
         * Constructs a new IdentityPostSharingGraphRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityPostSharingGraphRequest);

        /** IdentityPostSharingGraphRequest login. */
        public login: string;

        /** IdentityPostSharingGraphRequest graph. */
        public graph: api.IIdentityPostSharingGraphElement[];

        /**
         * Creates a new IdentityPostSharingGraphRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityPostSharingGraphRequest instance
         */
        public static create(properties?: api.IIdentityPostSharingGraphRequest): api.IdentityPostSharingGraphRequest;

        /**
         * Encodes the specified IdentityPostSharingGraphRequest message. Does not implicitly {@link api.IdentityPostSharingGraphRequest.verify|verify} messages.
         * @param message IdentityPostSharingGraphRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityPostSharingGraphRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityPostSharingGraphRequest message, length delimited. Does not implicitly {@link api.IdentityPostSharingGraphRequest.verify|verify} messages.
         * @param message IdentityPostSharingGraphRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityPostSharingGraphRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityPostSharingGraphRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityPostSharingGraphRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityPostSharingGraphRequest;

        /**
         * Decodes an IdentityPostSharingGraphRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityPostSharingGraphRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityPostSharingGraphRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityPostSharingGraphRequest;

        /**
         * Creates a plain object from an IdentityPostSharingGraphRequest message. Also converts values to other types if specified.
         * @param message IdentityPostSharingGraphRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityPostSharingGraphRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IIdentityToggleActiveStatusRequest);

        /** IdentityToggleActiveStatusRequest login. */
        public login: string;

        /** IdentityToggleActiveStatusRequest active. */
        public active: boolean;

        /**
         * Creates a new IdentityToggleActiveStatusRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityToggleActiveStatusRequest instance
         */
        public static create(properties?: api.IIdentityToggleActiveStatusRequest): api.IdentityToggleActiveStatusRequest;

        /**
         * Encodes the specified IdentityToggleActiveStatusRequest message. Does not implicitly {@link api.IdentityToggleActiveStatusRequest.verify|verify} messages.
         * @param message IdentityToggleActiveStatusRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityToggleActiveStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityToggleActiveStatusRequest message, length delimited. Does not implicitly {@link api.IdentityToggleActiveStatusRequest.verify|verify} messages.
         * @param message IdentityToggleActiveStatusRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityToggleActiveStatusRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityToggleActiveStatusRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityToggleActiveStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityToggleActiveStatusRequest;

        /**
         * Decodes an IdentityToggleActiveStatusRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityToggleActiveStatusRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityToggleActiveStatusRequest;

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
        public static fromObject(object: { [k: string]: any }): api.IdentityToggleActiveStatusRequest;

        /**
         * Creates a plain object from an IdentityToggleActiveStatusRequest message. Also converts values to other types if specified.
         * @param message IdentityToggleActiveStatusRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityToggleActiveStatusRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityToggleActiveStatusRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLockedVersionsRequest. */
    interface IIdentityGetLockedVersionsRequest {

        /** IdentityGetLockedVersionsRequest login */
        login?: (string|null);

        /** IdentityGetLockedVersionsRequest withChallenge */
        withChallenge?: (boolean|null);
    }

    /** Represents an IdentityGetLockedVersionsRequest. */
    class IdentityGetLockedVersionsRequest implements IIdentityGetLockedVersionsRequest {

        /**
         * Constructs a new IdentityGetLockedVersionsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetLockedVersionsRequest);

        /** IdentityGetLockedVersionsRequest login. */
        public login: string;

        /** IdentityGetLockedVersionsRequest withChallenge. */
        public withChallenge: boolean;

        /**
         * Creates a new IdentityGetLockedVersionsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLockedVersionsRequest instance
         */
        public static create(properties?: api.IIdentityGetLockedVersionsRequest): api.IdentityGetLockedVersionsRequest;

        /**
         * Encodes the specified IdentityGetLockedVersionsRequest message. Does not implicitly {@link api.IdentityGetLockedVersionsRequest.verify|verify} messages.
         * @param message IdentityGetLockedVersionsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetLockedVersionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLockedVersionsRequest message, length delimited. Does not implicitly {@link api.IdentityGetLockedVersionsRequest.verify|verify} messages.
         * @param message IdentityGetLockedVersionsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetLockedVersionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLockedVersionsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLockedVersionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLockedVersionsRequest;

        /**
         * Decodes an IdentityGetLockedVersionsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLockedVersionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLockedVersionsRequest;

        /**
         * Verifies an IdentityGetLockedVersionsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetLockedVersionsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetLockedVersionsRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetLockedVersionsRequest;

        /**
         * Creates a plain object from an IdentityGetLockedVersionsRequest message. Also converts values to other types if specified.
         * @param message IdentityGetLockedVersionsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetLockedVersionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLockedVersionsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetLockedVersionsResponse. */
    interface IIdentityGetLockedVersionsResponse {

        /** IdentityGetLockedVersionsResponse lockedVersions */
        lockedVersions?: (api.IdentityGetLockedVersionsResponse.ILockedVersion[]|null);
    }

    /** Represents an IdentityGetLockedVersionsResponse. */
    class IdentityGetLockedVersionsResponse implements IIdentityGetLockedVersionsResponse {

        /**
         * Constructs a new IdentityGetLockedVersionsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetLockedVersionsResponse);

        /** IdentityGetLockedVersionsResponse lockedVersions. */
        public lockedVersions: api.IdentityGetLockedVersionsResponse.ILockedVersion[];

        /**
         * Creates a new IdentityGetLockedVersionsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetLockedVersionsResponse instance
         */
        public static create(properties?: api.IIdentityGetLockedVersionsResponse): api.IdentityGetLockedVersionsResponse;

        /**
         * Encodes the specified IdentityGetLockedVersionsResponse message. Does not implicitly {@link api.IdentityGetLockedVersionsResponse.verify|verify} messages.
         * @param message IdentityGetLockedVersionsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetLockedVersionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetLockedVersionsResponse message, length delimited. Does not implicitly {@link api.IdentityGetLockedVersionsResponse.verify|verify} messages.
         * @param message IdentityGetLockedVersionsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetLockedVersionsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetLockedVersionsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetLockedVersionsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLockedVersionsResponse;

        /**
         * Decodes an IdentityGetLockedVersionsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetLockedVersionsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLockedVersionsResponse;

        /**
         * Verifies an IdentityGetLockedVersionsResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetLockedVersionsResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetLockedVersionsResponse
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetLockedVersionsResponse;

        /**
         * Creates a plain object from an IdentityGetLockedVersionsResponse message. Also converts values to other types if specified.
         * @param message IdentityGetLockedVersionsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetLockedVersionsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetLockedVersionsResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityGetLockedVersionsResponse {

        /** Properties of an IdentityChallenge. */
        interface IIdentityChallenge {

            /** IdentityChallenge salt */
            salt?: (Uint8Array|null);

            /** IdentityChallenge token */
            token?: (Uint8Array|null);

            /** IdentityChallenge encryption */
            encryption?: (api.IIdentityEncryptedKeySet|null);
        }

        /** Represents an IdentityChallenge. */
        class IdentityChallenge implements IIdentityChallenge {

            /**
             * Constructs a new IdentityChallenge.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityGetLockedVersionsResponse.IIdentityChallenge);

            /** IdentityChallenge salt. */
            public salt: Uint8Array;

            /** IdentityChallenge token. */
            public token: Uint8Array;

            /** IdentityChallenge encryption. */
            public encryption?: (api.IIdentityEncryptedKeySet|null);

            /**
             * Creates a new IdentityChallenge instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IdentityChallenge instance
             */
            public static create(properties?: api.IdentityGetLockedVersionsResponse.IIdentityChallenge): api.IdentityGetLockedVersionsResponse.IdentityChallenge;

            /**
             * Encodes the specified IdentityChallenge message. Does not implicitly {@link api.IdentityGetLockedVersionsResponse.IdentityChallenge.verify|verify} messages.
             * @param message IdentityChallenge message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityGetLockedVersionsResponse.IIdentityChallenge, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified IdentityChallenge message, length delimited. Does not implicitly {@link api.IdentityGetLockedVersionsResponse.IdentityChallenge.verify|verify} messages.
             * @param message IdentityChallenge message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityGetLockedVersionsResponse.IIdentityChallenge, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IdentityChallenge message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns IdentityChallenge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLockedVersionsResponse.IdentityChallenge;

            /**
             * Decodes an IdentityChallenge message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns IdentityChallenge
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLockedVersionsResponse.IdentityChallenge;

            /**
             * Verifies an IdentityChallenge message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an IdentityChallenge message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns IdentityChallenge
             */
            public static fromObject(object: { [k: string]: any }): api.IdentityGetLockedVersionsResponse.IdentityChallenge;

            /**
             * Creates a plain object from an IdentityChallenge message. Also converts values to other types if specified.
             * @param message IdentityChallenge
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityGetLockedVersionsResponse.IdentityChallenge, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this IdentityChallenge to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockedVersion. */
        interface ILockedVersion {

            /** LockedVersion publicKey */
            publicKey?: (api.IIdentityPublicKeyWithMetadata|null);

            /** LockedVersion challenge */
            challenge?: (api.IdentityGetLockedVersionsResponse.IIdentityChallenge|null);
        }

        /** Represents a LockedVersion. */
        class LockedVersion implements ILockedVersion {

            /**
             * Constructs a new LockedVersion.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityGetLockedVersionsResponse.ILockedVersion);

            /** LockedVersion publicKey. */
            public publicKey?: (api.IIdentityPublicKeyWithMetadata|null);

            /** LockedVersion challenge. */
            public challenge?: (api.IdentityGetLockedVersionsResponse.IIdentityChallenge|null);

            /**
             * Creates a new LockedVersion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LockedVersion instance
             */
            public static create(properties?: api.IdentityGetLockedVersionsResponse.ILockedVersion): api.IdentityGetLockedVersionsResponse.LockedVersion;

            /**
             * Encodes the specified LockedVersion message. Does not implicitly {@link api.IdentityGetLockedVersionsResponse.LockedVersion.verify|verify} messages.
             * @param message LockedVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityGetLockedVersionsResponse.ILockedVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LockedVersion message, length delimited. Does not implicitly {@link api.IdentityGetLockedVersionsResponse.LockedVersion.verify|verify} messages.
             * @param message LockedVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityGetLockedVersionsResponse.ILockedVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LockedVersion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LockedVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetLockedVersionsResponse.LockedVersion;

            /**
             * Decodes a LockedVersion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LockedVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetLockedVersionsResponse.LockedVersion;

            /**
             * Verifies a LockedVersion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LockedVersion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockedVersion
             */
            public static fromObject(object: { [k: string]: any }): api.IdentityGetLockedVersionsResponse.LockedVersion;

            /**
             * Creates a plain object from a LockedVersion message. Also converts values to other types if specified.
             * @param message LockedVersion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityGetLockedVersionsResponse.LockedVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockedVersion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an IdentitySetNamedResourceRequest. */
    interface IIdentitySetNamedResourceRequest {

        /** IdentitySetNamedResourceRequest login */
        login?: (string|null);

        /** IdentitySetNamedResourceRequest resourceName */
        resourceName?: (string|null);

        /** IdentitySetNamedResourceRequest resourceID */
        resourceID?: (number|Long|null);
    }

    /** Represents an IdentitySetNamedResourceRequest. */
    class IdentitySetNamedResourceRequest implements IIdentitySetNamedResourceRequest {

        /**
         * Constructs a new IdentitySetNamedResourceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentitySetNamedResourceRequest);

        /** IdentitySetNamedResourceRequest login. */
        public login: string;

        /** IdentitySetNamedResourceRequest resourceName. */
        public resourceName: string;

        /** IdentitySetNamedResourceRequest resourceID. */
        public resourceID: (number|Long);

        /**
         * Creates a new IdentitySetNamedResourceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentitySetNamedResourceRequest instance
         */
        public static create(properties?: api.IIdentitySetNamedResourceRequest): api.IdentitySetNamedResourceRequest;

        /**
         * Encodes the specified IdentitySetNamedResourceRequest message. Does not implicitly {@link api.IdentitySetNamedResourceRequest.verify|verify} messages.
         * @param message IdentitySetNamedResourceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentitySetNamedResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentitySetNamedResourceRequest message, length delimited. Does not implicitly {@link api.IdentitySetNamedResourceRequest.verify|verify} messages.
         * @param message IdentitySetNamedResourceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentitySetNamedResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentitySetNamedResourceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentitySetNamedResourceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentitySetNamedResourceRequest;

        /**
         * Decodes an IdentitySetNamedResourceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentitySetNamedResourceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentitySetNamedResourceRequest;

        /**
         * Verifies an IdentitySetNamedResourceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentitySetNamedResourceRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentitySetNamedResourceRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentitySetNamedResourceRequest;

        /**
         * Creates a plain object from an IdentitySetNamedResourceRequest message. Also converts values to other types if specified.
         * @param message IdentitySetNamedResourceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentitySetNamedResourceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentitySetNamedResourceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetNamedResourceRequest. */
    interface IIdentityGetNamedResourceRequest {

        /** IdentityGetNamedResourceRequest login */
        login?: (string|null);

        /** IdentityGetNamedResourceRequest resourceName */
        resourceName?: (string|null);
    }

    /** Represents an IdentityGetNamedResourceRequest. */
    class IdentityGetNamedResourceRequest implements IIdentityGetNamedResourceRequest {

        /**
         * Constructs a new IdentityGetNamedResourceRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetNamedResourceRequest);

        /** IdentityGetNamedResourceRequest login. */
        public login: string;

        /** IdentityGetNamedResourceRequest resourceName. */
        public resourceName: string;

        /**
         * Creates a new IdentityGetNamedResourceRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetNamedResourceRequest instance
         */
        public static create(properties?: api.IIdentityGetNamedResourceRequest): api.IdentityGetNamedResourceRequest;

        /**
         * Encodes the specified IdentityGetNamedResourceRequest message. Does not implicitly {@link api.IdentityGetNamedResourceRequest.verify|verify} messages.
         * @param message IdentityGetNamedResourceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetNamedResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetNamedResourceRequest message, length delimited. Does not implicitly {@link api.IdentityGetNamedResourceRequest.verify|verify} messages.
         * @param message IdentityGetNamedResourceRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetNamedResourceRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetNamedResourceRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetNamedResourceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetNamedResourceRequest;

        /**
         * Decodes an IdentityGetNamedResourceRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetNamedResourceRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetNamedResourceRequest;

        /**
         * Verifies an IdentityGetNamedResourceRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetNamedResourceRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetNamedResourceRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetNamedResourceRequest;

        /**
         * Creates a plain object from an IdentityGetNamedResourceRequest message. Also converts values to other types if specified.
         * @param message IdentityGetNamedResourceRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetNamedResourceRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetNamedResourceRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetNamedResourceResponse. */
    interface IIdentityGetNamedResourceResponse {

        /** IdentityGetNamedResourceResponse resource */
        resource?: (api.IResourceGetResponse|null);
    }

    /** Represents an IdentityGetNamedResourceResponse. */
    class IdentityGetNamedResourceResponse implements IIdentityGetNamedResourceResponse {

        /**
         * Constructs a new IdentityGetNamedResourceResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetNamedResourceResponse);

        /** IdentityGetNamedResourceResponse resource. */
        public resource?: (api.IResourceGetResponse|null);

        /**
         * Creates a new IdentityGetNamedResourceResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetNamedResourceResponse instance
         */
        public static create(properties?: api.IIdentityGetNamedResourceResponse): api.IdentityGetNamedResourceResponse;

        /**
         * Encodes the specified IdentityGetNamedResourceResponse message. Does not implicitly {@link api.IdentityGetNamedResourceResponse.verify|verify} messages.
         * @param message IdentityGetNamedResourceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetNamedResourceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetNamedResourceResponse message, length delimited. Does not implicitly {@link api.IdentityGetNamedResourceResponse.verify|verify} messages.
         * @param message IdentityGetNamedResourceResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetNamedResourceResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetNamedResourceResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetNamedResourceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetNamedResourceResponse;

        /**
         * Decodes an IdentityGetNamedResourceResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetNamedResourceResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetNamedResourceResponse;

        /**
         * Verifies an IdentityGetNamedResourceResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetNamedResourceResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetNamedResourceResponse
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetNamedResourceResponse;

        /**
         * Creates a plain object from an IdentityGetNamedResourceResponse message. Also converts values to other types if specified.
         * @param message IdentityGetNamedResourceResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetNamedResourceResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetNamedResourceResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** IdentitySortingField enum. */
    enum IdentitySortingField {
        LOGIN = 0,
        CREATED = 1,
        KIND = 2
    }

    /** SortingOrder enum. */
    enum SortingOrder {
        DESC = 0,
        ASC = 1
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
        saltKind?: (api.SessionSaltKind|null);

        /** SessionCreateChallengeRequest duration */
        duration?: (number|null);
    }

    /** Represents a SessionCreateChallengeRequest. */
    class SessionCreateChallengeRequest implements ISessionCreateChallengeRequest {

        /**
         * Constructs a new SessionCreateChallengeRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISessionCreateChallengeRequest);

        /** SessionCreateChallengeRequest login. */
        public login: string;

        /** SessionCreateChallengeRequest saltKind. */
        public saltKind: api.SessionSaltKind;

        /** SessionCreateChallengeRequest duration. */
        public duration: number;

        /**
         * Creates a new SessionCreateChallengeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionCreateChallengeRequest instance
         */
        public static create(properties?: api.ISessionCreateChallengeRequest): api.SessionCreateChallengeRequest;

        /**
         * Encodes the specified SessionCreateChallengeRequest message. Does not implicitly {@link api.SessionCreateChallengeRequest.verify|verify} messages.
         * @param message SessionCreateChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionCreateChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionCreateChallengeRequest message, length delimited. Does not implicitly {@link api.SessionCreateChallengeRequest.verify|verify} messages.
         * @param message SessionCreateChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionCreateChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionCreateChallengeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionCreateChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionCreateChallengeRequest;

        /**
         * Decodes a SessionCreateChallengeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionCreateChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionCreateChallengeRequest;

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
        public static fromObject(object: { [k: string]: any }): api.SessionCreateChallengeRequest;

        /**
         * Creates a plain object from a SessionCreateChallengeRequest message. Also converts values to other types if specified.
         * @param message SessionCreateChallengeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionCreateChallengeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        encryption?: (api.IIdentityEncryptedKeySet|null);

        /** SessionCreateChallengeResponse saltKind */
        saltKind?: (api.SessionSaltKind|null);
    }

    /** Represents a SessionCreateChallengeResponse. */
    class SessionCreateChallengeResponse implements ISessionCreateChallengeResponse {

        /**
         * Constructs a new SessionCreateChallengeResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISessionCreateChallengeResponse);

        /** SessionCreateChallengeResponse salt. */
        public salt: Uint8Array;

        /** SessionCreateChallengeResponse token. */
        public token: Uint8Array;

        /** SessionCreateChallengeResponse encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /** SessionCreateChallengeResponse saltKind. */
        public saltKind: api.SessionSaltKind;

        /**
         * Creates a new SessionCreateChallengeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionCreateChallengeResponse instance
         */
        public static create(properties?: api.ISessionCreateChallengeResponse): api.SessionCreateChallengeResponse;

        /**
         * Encodes the specified SessionCreateChallengeResponse message. Does not implicitly {@link api.SessionCreateChallengeResponse.verify|verify} messages.
         * @param message SessionCreateChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionCreateChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionCreateChallengeResponse message, length delimited. Does not implicitly {@link api.SessionCreateChallengeResponse.verify|verify} messages.
         * @param message SessionCreateChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionCreateChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionCreateChallengeResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionCreateChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionCreateChallengeResponse;

        /**
         * Decodes a SessionCreateChallengeResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionCreateChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionCreateChallengeResponse;

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
        public static fromObject(object: { [k: string]: any }): api.SessionCreateChallengeResponse;

        /**
         * Creates a plain object from a SessionCreateChallengeResponse message. Also converts values to other types if specified.
         * @param message SessionCreateChallengeResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionCreateChallengeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.ISessionResolveChallengeRequest);

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
        public static create(properties?: api.ISessionResolveChallengeRequest): api.SessionResolveChallengeRequest;

        /**
         * Encodes the specified SessionResolveChallengeRequest message. Does not implicitly {@link api.SessionResolveChallengeRequest.verify|verify} messages.
         * @param message SessionResolveChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionResolveChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionResolveChallengeRequest message, length delimited. Does not implicitly {@link api.SessionResolveChallengeRequest.verify|verify} messages.
         * @param message SessionResolveChallengeRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionResolveChallengeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionResolveChallengeRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionResolveChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionResolveChallengeRequest;

        /**
         * Decodes a SessionResolveChallengeRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionResolveChallengeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionResolveChallengeRequest;

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
        public static fromObject(object: { [k: string]: any }): api.SessionResolveChallengeRequest;

        /**
         * Creates a plain object from a SessionResolveChallengeRequest message. Also converts values to other types if specified.
         * @param message SessionResolveChallengeRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionResolveChallengeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.ISessionResolveChallengeResponse);

        /** SessionResolveChallengeResponse salt. */
        public salt: Uint8Array;

        /** SessionResolveChallengeResponse login. */
        public login: string;

        /**
         * Creates a new SessionResolveChallengeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionResolveChallengeResponse instance
         */
        public static create(properties?: api.ISessionResolveChallengeResponse): api.SessionResolveChallengeResponse;

        /**
         * Encodes the specified SessionResolveChallengeResponse message. Does not implicitly {@link api.SessionResolveChallengeResponse.verify|verify} messages.
         * @param message SessionResolveChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionResolveChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionResolveChallengeResponse message, length delimited. Does not implicitly {@link api.SessionResolveChallengeResponse.verify|verify} messages.
         * @param message SessionResolveChallengeResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionResolveChallengeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionResolveChallengeResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionResolveChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionResolveChallengeResponse;

        /**
         * Decodes a SessionResolveChallengeResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionResolveChallengeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionResolveChallengeResponse;

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
        public static fromObject(object: { [k: string]: any }): api.SessionResolveChallengeResponse;

        /**
         * Creates a plain object from a SessionResolveChallengeResponse message. Also converts values to other types if specified.
         * @param message SessionResolveChallengeResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionResolveChallengeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionResolveChallengeResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentitySession. */
    interface IIdentitySession {

        /** IdentitySession owner */
        owner?: (string|null);

        /** IdentitySession token */
        token?: (Uint8Array|null);

        /** IdentitySession created */
        created?: (number|Long|null);

        /** IdentitySession expires */
        expires?: (number|Long|null);
    }

    /** Represents an IdentitySession. */
    class IdentitySession implements IIdentitySession {

        /**
         * Constructs a new IdentitySession.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentitySession);

        /** IdentitySession owner. */
        public owner: string;

        /** IdentitySession token. */
        public token: Uint8Array;

        /** IdentitySession created. */
        public created: (number|Long);

        /** IdentitySession expires. */
        public expires: (number|Long);

        /**
         * Creates a new IdentitySession instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentitySession instance
         */
        public static create(properties?: api.IIdentitySession): api.IdentitySession;

        /**
         * Encodes the specified IdentitySession message. Does not implicitly {@link api.IdentitySession.verify|verify} messages.
         * @param message IdentitySession message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentitySession, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentitySession message, length delimited. Does not implicitly {@link api.IdentitySession.verify|verify} messages.
         * @param message IdentitySession message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentitySession, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentitySession message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentitySession
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentitySession;

        /**
         * Decodes an IdentitySession message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentitySession
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentitySession;

        /**
         * Verifies an IdentitySession message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentitySession message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentitySession
         */
        public static fromObject(object: { [k: string]: any }): api.IdentitySession;

        /**
         * Creates a plain object from an IdentitySession message. Also converts values to other types if specified.
         * @param message IdentitySession
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentitySession, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentitySession to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationIdentitySessionListRequest. */
    interface IApplicationIdentitySessionListRequest {

        /** ApplicationIdentitySessionListRequest appID */
        appID?: (string|null);

        /** ApplicationIdentitySessionListRequest since */
        since?: (number|Long|null);

        /** ApplicationIdentitySessionListRequest offset */
        offset?: (number|null);

        /** ApplicationIdentitySessionListRequest limit */
        limit?: (number|null);
    }

    /** Represents an ApplicationIdentitySessionListRequest. */
    class ApplicationIdentitySessionListRequest implements IApplicationIdentitySessionListRequest {

        /**
         * Constructs a new ApplicationIdentitySessionListRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationIdentitySessionListRequest);

        /** ApplicationIdentitySessionListRequest appID. */
        public appID: string;

        /** ApplicationIdentitySessionListRequest since. */
        public since: (number|Long);

        /** ApplicationIdentitySessionListRequest offset. */
        public offset: number;

        /** ApplicationIdentitySessionListRequest limit. */
        public limit: number;

        /**
         * Creates a new ApplicationIdentitySessionListRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationIdentitySessionListRequest instance
         */
        public static create(properties?: api.IApplicationIdentitySessionListRequest): api.ApplicationIdentitySessionListRequest;

        /**
         * Encodes the specified ApplicationIdentitySessionListRequest message. Does not implicitly {@link api.ApplicationIdentitySessionListRequest.verify|verify} messages.
         * @param message ApplicationIdentitySessionListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationIdentitySessionListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationIdentitySessionListRequest message, length delimited. Does not implicitly {@link api.ApplicationIdentitySessionListRequest.verify|verify} messages.
         * @param message ApplicationIdentitySessionListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationIdentitySessionListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationIdentitySessionListRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationIdentitySessionListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationIdentitySessionListRequest;

        /**
         * Decodes an ApplicationIdentitySessionListRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationIdentitySessionListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationIdentitySessionListRequest;

        /**
         * Verifies an ApplicationIdentitySessionListRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationIdentitySessionListRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationIdentitySessionListRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationIdentitySessionListRequest;

        /**
         * Creates a plain object from an ApplicationIdentitySessionListRequest message. Also converts values to other types if specified.
         * @param message ApplicationIdentitySessionListRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationIdentitySessionListRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationIdentitySessionListRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationIdentitySessionListResponse. */
    interface IApplicationIdentitySessionListResponse {

        /** ApplicationIdentitySessionListResponse sessions */
        sessions?: (api.IIdentitySession[]|null);
    }

    /** Represents an ApplicationIdentitySessionListResponse. */
    class ApplicationIdentitySessionListResponse implements IApplicationIdentitySessionListResponse {

        /**
         * Constructs a new ApplicationIdentitySessionListResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationIdentitySessionListResponse);

        /** ApplicationIdentitySessionListResponse sessions. */
        public sessions: api.IIdentitySession[];

        /**
         * Creates a new ApplicationIdentitySessionListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationIdentitySessionListResponse instance
         */
        public static create(properties?: api.IApplicationIdentitySessionListResponse): api.ApplicationIdentitySessionListResponse;

        /**
         * Encodes the specified ApplicationIdentitySessionListResponse message. Does not implicitly {@link api.ApplicationIdentitySessionListResponse.verify|verify} messages.
         * @param message ApplicationIdentitySessionListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationIdentitySessionListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationIdentitySessionListResponse message, length delimited. Does not implicitly {@link api.ApplicationIdentitySessionListResponse.verify|verify} messages.
         * @param message ApplicationIdentitySessionListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationIdentitySessionListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationIdentitySessionListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationIdentitySessionListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationIdentitySessionListResponse;

        /**
         * Decodes an ApplicationIdentitySessionListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationIdentitySessionListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationIdentitySessionListResponse;

        /**
         * Verifies an ApplicationIdentitySessionListResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationIdentitySessionListResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationIdentitySessionListResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationIdentitySessionListResponse;

        /**
         * Creates a plain object from an ApplicationIdentitySessionListResponse message. Also converts values to other types if specified.
         * @param message ApplicationIdentitySessionListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationIdentitySessionListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationIdentitySessionListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** JwtAlgorithm enum. */
    enum JwtAlgorithm {
        HS256 = 0,
        HS384 = 1,
        HS512 = 2,
        RS256 = 3,
        RS384 = 4,
        RS512 = 5,
        ES256 = 6,
        ES384 = 7,
        ES512 = 8
    }

    /** Properties of an IdentityConfigurationAsApplication. */
    interface IIdentityConfigurationAsApplication {

        /** IdentityConfigurationAsApplication jwt */
        jwt?: (api.IdentityConfigurationAsApplication.IJWT|null);
    }

    /** Represents an IdentityConfigurationAsApplication. */
    class IdentityConfigurationAsApplication implements IIdentityConfigurationAsApplication {

        /**
         * Constructs a new IdentityConfigurationAsApplication.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityConfigurationAsApplication);

        /** IdentityConfigurationAsApplication jwt. */
        public jwt?: (api.IdentityConfigurationAsApplication.IJWT|null);

        /**
         * Creates a new IdentityConfigurationAsApplication instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityConfigurationAsApplication instance
         */
        public static create(properties?: api.IIdentityConfigurationAsApplication): api.IdentityConfigurationAsApplication;

        /**
         * Encodes the specified IdentityConfigurationAsApplication message. Does not implicitly {@link api.IdentityConfigurationAsApplication.verify|verify} messages.
         * @param message IdentityConfigurationAsApplication message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityConfigurationAsApplication, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityConfigurationAsApplication message, length delimited. Does not implicitly {@link api.IdentityConfigurationAsApplication.verify|verify} messages.
         * @param message IdentityConfigurationAsApplication message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityConfigurationAsApplication, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityConfigurationAsApplication message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityConfigurationAsApplication
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityConfigurationAsApplication;

        /**
         * Decodes an IdentityConfigurationAsApplication message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityConfigurationAsApplication
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityConfigurationAsApplication;

        /**
         * Verifies an IdentityConfigurationAsApplication message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityConfigurationAsApplication message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityConfigurationAsApplication
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityConfigurationAsApplication;

        /**
         * Creates a plain object from an IdentityConfigurationAsApplication message. Also converts values to other types if specified.
         * @param message IdentityConfigurationAsApplication
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityConfigurationAsApplication, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityConfigurationAsApplication to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityConfigurationAsApplication {

        /** Properties of a JWT. */
        interface IJWT {

            /** JWT key */
            key?: (Uint8Array|null);

            /** JWT signAlgorithm */
            signAlgorithm?: (api.JwtAlgorithm|null);

            /** JWT claimForLogin */
            claimForLogin?: (string|null);
        }

        /** Represents a JWT. */
        class JWT implements IJWT {

            /**
             * Constructs a new JWT.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityConfigurationAsApplication.IJWT);

            /** JWT key. */
            public key: Uint8Array;

            /** JWT signAlgorithm. */
            public signAlgorithm: api.JwtAlgorithm;

            /** JWT claimForLogin. */
            public claimForLogin: string;

            /**
             * Creates a new JWT instance using the specified properties.
             * @param [properties] Properties to set
             * @returns JWT instance
             */
            public static create(properties?: api.IdentityConfigurationAsApplication.IJWT): api.IdentityConfigurationAsApplication.JWT;

            /**
             * Encodes the specified JWT message. Does not implicitly {@link api.IdentityConfigurationAsApplication.JWT.verify|verify} messages.
             * @param message JWT message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityConfigurationAsApplication.IJWT, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified JWT message, length delimited. Does not implicitly {@link api.IdentityConfigurationAsApplication.JWT.verify|verify} messages.
             * @param message JWT message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityConfigurationAsApplication.IJWT, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a JWT message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns JWT
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityConfigurationAsApplication.JWT;

            /**
             * Decodes a JWT message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns JWT
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityConfigurationAsApplication.JWT;

            /**
             * Verifies a JWT message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a JWT message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns JWT
             */
            public static fromObject(object: { [k: string]: any }): api.IdentityConfigurationAsApplication.JWT;

            /**
             * Creates a plain object from a JWT message. Also converts values to other types if specified.
             * @param message JWT
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityConfigurationAsApplication.JWT, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this JWT to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of an ApplicationConfigID. */
    interface IApplicationConfigID {

        /** ApplicationConfigID appID */
        appID?: (string|null);

        /** ApplicationConfigID version */
        version?: (number|null);
    }

    /** Represents an ApplicationConfigID. */
    class ApplicationConfigID implements IApplicationConfigID {

        /**
         * Constructs a new ApplicationConfigID.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationConfigID);

        /** ApplicationConfigID appID. */
        public appID: string;

        /** ApplicationConfigID version. */
        public version: number;

        /**
         * Creates a new ApplicationConfigID instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationConfigID instance
         */
        public static create(properties?: api.IApplicationConfigID): api.ApplicationConfigID;

        /**
         * Encodes the specified ApplicationConfigID message. Does not implicitly {@link api.ApplicationConfigID.verify|verify} messages.
         * @param message ApplicationConfigID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationConfigID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationConfigID message, length delimited. Does not implicitly {@link api.ApplicationConfigID.verify|verify} messages.
         * @param message ApplicationConfigID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationConfigID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationConfigID message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationConfigID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationConfigID;

        /**
         * Decodes an ApplicationConfigID message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationConfigID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationConfigID;

        /**
         * Verifies an ApplicationConfigID message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationConfigID message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationConfigID
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationConfigID;

        /**
         * Creates a plain object from an ApplicationConfigID message. Also converts values to other types if specified.
         * @param message ApplicationConfigID
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationConfigID, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationConfigID to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityConfigurationAsApplicationMetadata. */
    interface IIdentityConfigurationAsApplicationMetadata {

        /** IdentityConfigurationAsApplicationMetadata configID */
        configID?: (api.IApplicationConfigID|null);

        /** IdentityConfigurationAsApplicationMetadata creator */
        creator?: (api.IIdentityKeyID|null);

        /** IdentityConfigurationAsApplicationMetadata created */
        created?: (number|Long|null);
    }

    /** Represents an IdentityConfigurationAsApplicationMetadata. */
    class IdentityConfigurationAsApplicationMetadata implements IIdentityConfigurationAsApplicationMetadata {

        /**
         * Constructs a new IdentityConfigurationAsApplicationMetadata.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityConfigurationAsApplicationMetadata);

        /** IdentityConfigurationAsApplicationMetadata configID. */
        public configID?: (api.IApplicationConfigID|null);

        /** IdentityConfigurationAsApplicationMetadata creator. */
        public creator?: (api.IIdentityKeyID|null);

        /** IdentityConfigurationAsApplicationMetadata created. */
        public created: (number|Long);

        /**
         * Creates a new IdentityConfigurationAsApplicationMetadata instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityConfigurationAsApplicationMetadata instance
         */
        public static create(properties?: api.IIdentityConfigurationAsApplicationMetadata): api.IdentityConfigurationAsApplicationMetadata;

        /**
         * Encodes the specified IdentityConfigurationAsApplicationMetadata message. Does not implicitly {@link api.IdentityConfigurationAsApplicationMetadata.verify|verify} messages.
         * @param message IdentityConfigurationAsApplicationMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityConfigurationAsApplicationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityConfigurationAsApplicationMetadata message, length delimited. Does not implicitly {@link api.IdentityConfigurationAsApplicationMetadata.verify|verify} messages.
         * @param message IdentityConfigurationAsApplicationMetadata message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityConfigurationAsApplicationMetadata, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityConfigurationAsApplicationMetadata message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityConfigurationAsApplicationMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityConfigurationAsApplicationMetadata;

        /**
         * Decodes an IdentityConfigurationAsApplicationMetadata message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityConfigurationAsApplicationMetadata
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityConfigurationAsApplicationMetadata;

        /**
         * Verifies an IdentityConfigurationAsApplicationMetadata message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityConfigurationAsApplicationMetadata message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityConfigurationAsApplicationMetadata
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityConfigurationAsApplicationMetadata;

        /**
         * Creates a plain object from an IdentityConfigurationAsApplicationMetadata message. Also converts values to other types if specified.
         * @param message IdentityConfigurationAsApplicationMetadata
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityConfigurationAsApplicationMetadata, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityConfigurationAsApplicationMetadata to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityConfigurationAsApplicationRequest. */
    interface IIdentityConfigurationAsApplicationRequest {

        /** IdentityConfigurationAsApplicationRequest login */
        login?: (string|null);

        /** IdentityConfigurationAsApplicationRequest config */
        config?: (api.IIdentityConfigurationAsApplication|null);

        /** IdentityConfigurationAsApplicationRequest customerID */
        customerID?: (number|null);
    }

    /** Represents an IdentityConfigurationAsApplicationRequest. */
    class IdentityConfigurationAsApplicationRequest implements IIdentityConfigurationAsApplicationRequest {

        /**
         * Constructs a new IdentityConfigurationAsApplicationRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityConfigurationAsApplicationRequest);

        /** IdentityConfigurationAsApplicationRequest login. */
        public login: string;

        /** IdentityConfigurationAsApplicationRequest config. */
        public config?: (api.IIdentityConfigurationAsApplication|null);

        /** IdentityConfigurationAsApplicationRequest customerID. */
        public customerID: number;

        /**
         * Creates a new IdentityConfigurationAsApplicationRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityConfigurationAsApplicationRequest instance
         */
        public static create(properties?: api.IIdentityConfigurationAsApplicationRequest): api.IdentityConfigurationAsApplicationRequest;

        /**
         * Encodes the specified IdentityConfigurationAsApplicationRequest message. Does not implicitly {@link api.IdentityConfigurationAsApplicationRequest.verify|verify} messages.
         * @param message IdentityConfigurationAsApplicationRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityConfigurationAsApplicationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityConfigurationAsApplicationRequest message, length delimited. Does not implicitly {@link api.IdentityConfigurationAsApplicationRequest.verify|verify} messages.
         * @param message IdentityConfigurationAsApplicationRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityConfigurationAsApplicationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityConfigurationAsApplicationRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityConfigurationAsApplicationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityConfigurationAsApplicationRequest;

        /**
         * Decodes an IdentityConfigurationAsApplicationRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityConfigurationAsApplicationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityConfigurationAsApplicationRequest;

        /**
         * Verifies an IdentityConfigurationAsApplicationRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityConfigurationAsApplicationRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityConfigurationAsApplicationRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityConfigurationAsApplicationRequest;

        /**
         * Creates a plain object from an IdentityConfigurationAsApplicationRequest message. Also converts values to other types if specified.
         * @param message IdentityConfigurationAsApplicationRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityConfigurationAsApplicationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityConfigurationAsApplicationRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityGetConfigurationResponse. */
    interface IIdentityGetConfigurationResponse {

        /** IdentityGetConfigurationResponse config */
        config?: (api.IIdentityConfigurationAsApplication|null);

        /** IdentityGetConfigurationResponse metadata */
        metadata?: (api.IIdentityConfigurationAsApplicationMetadata|null);
    }

    /** Represents an IdentityGetConfigurationResponse. */
    class IdentityGetConfigurationResponse implements IIdentityGetConfigurationResponse {

        /**
         * Constructs a new IdentityGetConfigurationResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityGetConfigurationResponse);

        /** IdentityGetConfigurationResponse config. */
        public config?: (api.IIdentityConfigurationAsApplication|null);

        /** IdentityGetConfigurationResponse metadata. */
        public metadata?: (api.IIdentityConfigurationAsApplicationMetadata|null);

        /**
         * Creates a new IdentityGetConfigurationResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityGetConfigurationResponse instance
         */
        public static create(properties?: api.IIdentityGetConfigurationResponse): api.IdentityGetConfigurationResponse;

        /**
         * Encodes the specified IdentityGetConfigurationResponse message. Does not implicitly {@link api.IdentityGetConfigurationResponse.verify|verify} messages.
         * @param message IdentityGetConfigurationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityGetConfigurationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityGetConfigurationResponse message, length delimited. Does not implicitly {@link api.IdentityGetConfigurationResponse.verify|verify} messages.
         * @param message IdentityGetConfigurationResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityGetConfigurationResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityGetConfigurationResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityGetConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityGetConfigurationResponse;

        /**
         * Decodes an IdentityGetConfigurationResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityGetConfigurationResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityGetConfigurationResponse;

        /**
         * Verifies an IdentityGetConfigurationResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityGetConfigurationResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityGetConfigurationResponse
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityGetConfigurationResponse;

        /**
         * Creates a plain object from an IdentityGetConfigurationResponse message. Also converts values to other types if specified.
         * @param message IdentityGetConfigurationResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityGetConfigurationResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityGetConfigurationResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationUsageOverview. */
    interface IApplicationUsageOverview {

        /** ApplicationUsageOverview jwt */
        jwt?: (api.ApplicationUsageOverview.IJWT|null);

        /** ApplicationUsageOverview delegates */
        delegates?: (api.ApplicationUsageOverview.IDelegatedAccess|null);

        /** ApplicationUsageOverview start */
        start?: (number|null);
    }

    /** Represents an ApplicationUsageOverview. */
    class ApplicationUsageOverview implements IApplicationUsageOverview {

        /**
         * Constructs a new ApplicationUsageOverview.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationUsageOverview);

        /** ApplicationUsageOverview jwt. */
        public jwt?: (api.ApplicationUsageOverview.IJWT|null);

        /** ApplicationUsageOverview delegates. */
        public delegates?: (api.ApplicationUsageOverview.IDelegatedAccess|null);

        /** ApplicationUsageOverview start. */
        public start: number;

        /**
         * Creates a new ApplicationUsageOverview instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationUsageOverview instance
         */
        public static create(properties?: api.IApplicationUsageOverview): api.ApplicationUsageOverview;

        /**
         * Encodes the specified ApplicationUsageOverview message. Does not implicitly {@link api.ApplicationUsageOverview.verify|verify} messages.
         * @param message ApplicationUsageOverview message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationUsageOverview, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationUsageOverview message, length delimited. Does not implicitly {@link api.ApplicationUsageOverview.verify|verify} messages.
         * @param message ApplicationUsageOverview message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationUsageOverview, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationUsageOverview message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationUsageOverview
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationUsageOverview;

        /**
         * Decodes an ApplicationUsageOverview message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationUsageOverview
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationUsageOverview;

        /**
         * Verifies an ApplicationUsageOverview message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationUsageOverview message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationUsageOverview
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationUsageOverview;

        /**
         * Creates a plain object from an ApplicationUsageOverview message. Also converts values to other types if specified.
         * @param message ApplicationUsageOverview
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationUsageOverview, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationUsageOverview to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ApplicationUsageOverview {

        /** Properties of a JWT. */
        interface IJWT {

            /** JWT identities */
            identities?: (number|null);

            /** JWT sessions */
            sessions?: (number|null);
        }

        /** Represents a JWT. */
        class JWT implements IJWT {

            /**
             * Constructs a new JWT.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ApplicationUsageOverview.IJWT);

            /** JWT identities. */
            public identities: number;

            /** JWT sessions. */
            public sessions: number;

            /**
             * Creates a new JWT instance using the specified properties.
             * @param [properties] Properties to set
             * @returns JWT instance
             */
            public static create(properties?: api.ApplicationUsageOverview.IJWT): api.ApplicationUsageOverview.JWT;

            /**
             * Encodes the specified JWT message. Does not implicitly {@link api.ApplicationUsageOverview.JWT.verify|verify} messages.
             * @param message JWT message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.ApplicationUsageOverview.IJWT, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified JWT message, length delimited. Does not implicitly {@link api.ApplicationUsageOverview.JWT.verify|verify} messages.
             * @param message JWT message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.ApplicationUsageOverview.IJWT, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a JWT message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns JWT
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationUsageOverview.JWT;

            /**
             * Decodes a JWT message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns JWT
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationUsageOverview.JWT;

            /**
             * Verifies a JWT message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a JWT message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns JWT
             */
            public static fromObject(object: { [k: string]: any }): api.ApplicationUsageOverview.JWT;

            /**
             * Creates a plain object from a JWT message. Also converts values to other types if specified.
             * @param message JWT
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.ApplicationUsageOverview.JWT, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this JWT to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DelegatedAccess. */
        interface IDelegatedAccess {

            /** DelegatedAccess requested */
            requested?: (number|null);

            /** DelegatedAccess resolved */
            resolved?: (number|null);

            /** DelegatedAccess distinctRequested */
            distinctRequested?: (number|null);

            /** DelegatedAccess distinctResolved */
            distinctResolved?: (number|null);
        }

        /** Represents a DelegatedAccess. */
        class DelegatedAccess implements IDelegatedAccess {

            /**
             * Constructs a new DelegatedAccess.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.ApplicationUsageOverview.IDelegatedAccess);

            /** DelegatedAccess requested. */
            public requested: number;

            /** DelegatedAccess resolved. */
            public resolved: number;

            /** DelegatedAccess distinctRequested. */
            public distinctRequested: number;

            /** DelegatedAccess distinctResolved. */
            public distinctResolved: number;

            /**
             * Creates a new DelegatedAccess instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DelegatedAccess instance
             */
            public static create(properties?: api.ApplicationUsageOverview.IDelegatedAccess): api.ApplicationUsageOverview.DelegatedAccess;

            /**
             * Encodes the specified DelegatedAccess message. Does not implicitly {@link api.ApplicationUsageOverview.DelegatedAccess.verify|verify} messages.
             * @param message DelegatedAccess message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.ApplicationUsageOverview.IDelegatedAccess, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DelegatedAccess message, length delimited. Does not implicitly {@link api.ApplicationUsageOverview.DelegatedAccess.verify|verify} messages.
             * @param message DelegatedAccess message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.ApplicationUsageOverview.IDelegatedAccess, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DelegatedAccess message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DelegatedAccess
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationUsageOverview.DelegatedAccess;

            /**
             * Decodes a DelegatedAccess message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DelegatedAccess
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationUsageOverview.DelegatedAccess;

            /**
             * Verifies a DelegatedAccess message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DelegatedAccess message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DelegatedAccess
             */
            public static fromObject(object: { [k: string]: any }): api.ApplicationUsageOverview.DelegatedAccess;

            /**
             * Creates a plain object from a DelegatedAccess message. Also converts values to other types if specified.
             * @param message DelegatedAccess
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.ApplicationUsageOverview.DelegatedAccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DelegatedAccess to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Period enum. */
    enum Period {
        DAY = 0,
        MONTH = 1,
        YEAR = 2
    }

    /** Properties of an ApplicationUsageOverviewRequest. */
    interface IApplicationUsageOverviewRequest {

        /** ApplicationUsageOverviewRequest login */
        login?: (string|null);

        /** ApplicationUsageOverviewRequest from */
        from?: (number|null);

        /** ApplicationUsageOverviewRequest to */
        to?: (number|null);

        /** ApplicationUsageOverviewRequest by */
        by?: (api.Period|null);
    }

    /** Represents an ApplicationUsageOverviewRequest. */
    class ApplicationUsageOverviewRequest implements IApplicationUsageOverviewRequest {

        /**
         * Constructs a new ApplicationUsageOverviewRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationUsageOverviewRequest);

        /** ApplicationUsageOverviewRequest login. */
        public login: string;

        /** ApplicationUsageOverviewRequest from. */
        public from: number;

        /** ApplicationUsageOverviewRequest to. */
        public to: number;

        /** ApplicationUsageOverviewRequest by. */
        public by: api.Period;

        /**
         * Creates a new ApplicationUsageOverviewRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationUsageOverviewRequest instance
         */
        public static create(properties?: api.IApplicationUsageOverviewRequest): api.ApplicationUsageOverviewRequest;

        /**
         * Encodes the specified ApplicationUsageOverviewRequest message. Does not implicitly {@link api.ApplicationUsageOverviewRequest.verify|verify} messages.
         * @param message ApplicationUsageOverviewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationUsageOverviewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationUsageOverviewRequest message, length delimited. Does not implicitly {@link api.ApplicationUsageOverviewRequest.verify|verify} messages.
         * @param message ApplicationUsageOverviewRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationUsageOverviewRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationUsageOverviewRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationUsageOverviewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationUsageOverviewRequest;

        /**
         * Decodes an ApplicationUsageOverviewRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationUsageOverviewRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationUsageOverviewRequest;

        /**
         * Verifies an ApplicationUsageOverviewRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationUsageOverviewRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationUsageOverviewRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationUsageOverviewRequest;

        /**
         * Creates a plain object from an ApplicationUsageOverviewRequest message. Also converts values to other types if specified.
         * @param message ApplicationUsageOverviewRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationUsageOverviewRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationUsageOverviewRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationUsageOverviewResponse. */
    interface IApplicationUsageOverviewResponse {

        /** ApplicationUsageOverviewResponse overview */
        overview?: (api.IApplicationUsageOverview[]|null);
    }

    /** Represents an ApplicationUsageOverviewResponse. */
    class ApplicationUsageOverviewResponse implements IApplicationUsageOverviewResponse {

        /**
         * Constructs a new ApplicationUsageOverviewResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationUsageOverviewResponse);

        /** ApplicationUsageOverviewResponse overview. */
        public overview: api.IApplicationUsageOverview[];

        /**
         * Creates a new ApplicationUsageOverviewResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationUsageOverviewResponse instance
         */
        public static create(properties?: api.IApplicationUsageOverviewResponse): api.ApplicationUsageOverviewResponse;

        /**
         * Encodes the specified ApplicationUsageOverviewResponse message. Does not implicitly {@link api.ApplicationUsageOverviewResponse.verify|verify} messages.
         * @param message ApplicationUsageOverviewResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationUsageOverviewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationUsageOverviewResponse message, length delimited. Does not implicitly {@link api.ApplicationUsageOverviewResponse.verify|verify} messages.
         * @param message ApplicationUsageOverviewResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationUsageOverviewResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationUsageOverviewResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationUsageOverviewResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationUsageOverviewResponse;

        /**
         * Decodes an ApplicationUsageOverviewResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationUsageOverviewResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationUsageOverviewResponse;

        /**
         * Verifies an ApplicationUsageOverviewResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationUsageOverviewResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationUsageOverviewResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationUsageOverviewResponse;

        /**
         * Creates a plain object from an ApplicationUsageOverviewResponse message. Also converts values to other types if specified.
         * @param message ApplicationUsageOverviewResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationUsageOverviewResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationUsageOverviewResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationGetIdentityAuthResponse. */
    interface IApplicationGetIdentityAuthResponse {

        /** ApplicationGetIdentityAuthResponse auth */
        auth?: (api.IIdentityExternalAuth|null);

        /** ApplicationGetIdentityAuthResponse login */
        login?: (string|null);

        /** ApplicationGetIdentityAuthResponse configID */
        configID?: (api.IApplicationConfigID|null);
    }

    /** Represents an ApplicationGetIdentityAuthResponse. */
    class ApplicationGetIdentityAuthResponse implements IApplicationGetIdentityAuthResponse {

        /**
         * Constructs a new ApplicationGetIdentityAuthResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationGetIdentityAuthResponse);

        /** ApplicationGetIdentityAuthResponse auth. */
        public auth?: (api.IIdentityExternalAuth|null);

        /** ApplicationGetIdentityAuthResponse login. */
        public login: string;

        /** ApplicationGetIdentityAuthResponse configID. */
        public configID?: (api.IApplicationConfigID|null);

        /**
         * Creates a new ApplicationGetIdentityAuthResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationGetIdentityAuthResponse instance
         */
        public static create(properties?: api.IApplicationGetIdentityAuthResponse): api.ApplicationGetIdentityAuthResponse;

        /**
         * Encodes the specified ApplicationGetIdentityAuthResponse message. Does not implicitly {@link api.ApplicationGetIdentityAuthResponse.verify|verify} messages.
         * @param message ApplicationGetIdentityAuthResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationGetIdentityAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationGetIdentityAuthResponse message, length delimited. Does not implicitly {@link api.ApplicationGetIdentityAuthResponse.verify|verify} messages.
         * @param message ApplicationGetIdentityAuthResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationGetIdentityAuthResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationGetIdentityAuthResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationGetIdentityAuthResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationGetIdentityAuthResponse;

        /**
         * Decodes an ApplicationGetIdentityAuthResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationGetIdentityAuthResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationGetIdentityAuthResponse;

        /**
         * Verifies an ApplicationGetIdentityAuthResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationGetIdentityAuthResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationGetIdentityAuthResponse
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationGetIdentityAuthResponse;

        /**
         * Creates a plain object from an ApplicationGetIdentityAuthResponse message. Also converts values to other types if specified.
         * @param message ApplicationGetIdentityAuthResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationGetIdentityAuthResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationGetIdentityAuthResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationGetIdentityAuthRequest. */
    interface IApplicationGetIdentityAuthRequest {

        /** ApplicationGetIdentityAuthRequest login */
        login?: (string|null);
    }

    /** Represents an ApplicationGetIdentityAuthRequest. */
    class ApplicationGetIdentityAuthRequest implements IApplicationGetIdentityAuthRequest {

        /**
         * Constructs a new ApplicationGetIdentityAuthRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationGetIdentityAuthRequest);

        /** ApplicationGetIdentityAuthRequest login. */
        public login: string;

        /**
         * Creates a new ApplicationGetIdentityAuthRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationGetIdentityAuthRequest instance
         */
        public static create(properties?: api.IApplicationGetIdentityAuthRequest): api.ApplicationGetIdentityAuthRequest;

        /**
         * Encodes the specified ApplicationGetIdentityAuthRequest message. Does not implicitly {@link api.ApplicationGetIdentityAuthRequest.verify|verify} messages.
         * @param message ApplicationGetIdentityAuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationGetIdentityAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationGetIdentityAuthRequest message, length delimited. Does not implicitly {@link api.ApplicationGetIdentityAuthRequest.verify|verify} messages.
         * @param message ApplicationGetIdentityAuthRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationGetIdentityAuthRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationGetIdentityAuthRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationGetIdentityAuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationGetIdentityAuthRequest;

        /**
         * Decodes an ApplicationGetIdentityAuthRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationGetIdentityAuthRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationGetIdentityAuthRequest;

        /**
         * Verifies an ApplicationGetIdentityAuthRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationGetIdentityAuthRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationGetIdentityAuthRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationGetIdentityAuthRequest;

        /**
         * Creates a plain object from an ApplicationGetIdentityAuthRequest message. Also converts values to other types if specified.
         * @param message ApplicationGetIdentityAuthRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationGetIdentityAuthRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationGetIdentityAuthRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ApplicationGetLatestConfigurationRequest. */
    interface IApplicationGetLatestConfigurationRequest {

        /** ApplicationGetLatestConfigurationRequest appID */
        appID?: (string|null);
    }

    /** Represents an ApplicationGetLatestConfigurationRequest. */
    class ApplicationGetLatestConfigurationRequest implements IApplicationGetLatestConfigurationRequest {

        /**
         * Constructs a new ApplicationGetLatestConfigurationRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IApplicationGetLatestConfigurationRequest);

        /** ApplicationGetLatestConfigurationRequest appID. */
        public appID: string;

        /**
         * Creates a new ApplicationGetLatestConfigurationRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ApplicationGetLatestConfigurationRequest instance
         */
        public static create(properties?: api.IApplicationGetLatestConfigurationRequest): api.ApplicationGetLatestConfigurationRequest;

        /**
         * Encodes the specified ApplicationGetLatestConfigurationRequest message. Does not implicitly {@link api.ApplicationGetLatestConfigurationRequest.verify|verify} messages.
         * @param message ApplicationGetLatestConfigurationRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IApplicationGetLatestConfigurationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ApplicationGetLatestConfigurationRequest message, length delimited. Does not implicitly {@link api.ApplicationGetLatestConfigurationRequest.verify|verify} messages.
         * @param message ApplicationGetLatestConfigurationRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IApplicationGetLatestConfigurationRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ApplicationGetLatestConfigurationRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ApplicationGetLatestConfigurationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ApplicationGetLatestConfigurationRequest;

        /**
         * Decodes an ApplicationGetLatestConfigurationRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ApplicationGetLatestConfigurationRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ApplicationGetLatestConfigurationRequest;

        /**
         * Verifies an ApplicationGetLatestConfigurationRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ApplicationGetLatestConfigurationRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ApplicationGetLatestConfigurationRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ApplicationGetLatestConfigurationRequest;

        /**
         * Creates a plain object from an ApplicationGetLatestConfigurationRequest message. Also converts values to other types if specified.
         * @param message ApplicationGetLatestConfigurationRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ApplicationGetLatestConfigurationRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ApplicationGetLatestConfigurationRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdentityUnlockVersionsRequest. */
    interface IIdentityUnlockVersionsRequest {

        /** IdentityUnlockVersionsRequest login */
        login?: (string|null);

        /** IdentityUnlockVersionsRequest unlockedVersions */
        unlockedVersions?: (api.IdentityUnlockVersionsRequest.IUnlockedVersion[]|null);
    }

    /** Represents an IdentityUnlockVersionsRequest. */
    class IdentityUnlockVersionsRequest implements IIdentityUnlockVersionsRequest {

        /**
         * Constructs a new IdentityUnlockVersionsRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IIdentityUnlockVersionsRequest);

        /** IdentityUnlockVersionsRequest login. */
        public login: string;

        /** IdentityUnlockVersionsRequest unlockedVersions. */
        public unlockedVersions: api.IdentityUnlockVersionsRequest.IUnlockedVersion[];

        /**
         * Creates a new IdentityUnlockVersionsRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdentityUnlockVersionsRequest instance
         */
        public static create(properties?: api.IIdentityUnlockVersionsRequest): api.IdentityUnlockVersionsRequest;

        /**
         * Encodes the specified IdentityUnlockVersionsRequest message. Does not implicitly {@link api.IdentityUnlockVersionsRequest.verify|verify} messages.
         * @param message IdentityUnlockVersionsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IIdentityUnlockVersionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdentityUnlockVersionsRequest message, length delimited. Does not implicitly {@link api.IdentityUnlockVersionsRequest.verify|verify} messages.
         * @param message IdentityUnlockVersionsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IIdentityUnlockVersionsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdentityUnlockVersionsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdentityUnlockVersionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityUnlockVersionsRequest;

        /**
         * Decodes an IdentityUnlockVersionsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdentityUnlockVersionsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityUnlockVersionsRequest;

        /**
         * Verifies an IdentityUnlockVersionsRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdentityUnlockVersionsRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdentityUnlockVersionsRequest
         */
        public static fromObject(object: { [k: string]: any }): api.IdentityUnlockVersionsRequest;

        /**
         * Creates a plain object from an IdentityUnlockVersionsRequest message. Also converts values to other types if specified.
         * @param message IdentityUnlockVersionsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.IdentityUnlockVersionsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdentityUnlockVersionsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace IdentityUnlockVersionsRequest {

        /** Properties of an UnlockedVersion. */
        interface IUnlockedVersion {

            /** UnlockedVersion resolvedChallenge */
            resolvedChallenge?: (api.ISessionResolveChallengeRequest|null);

            /** UnlockedVersion backward */
            backward?: (api.IIdentityBackwardKey|null);
        }

        /** Represents an UnlockedVersion. */
        class UnlockedVersion implements IUnlockedVersion {

            /**
             * Constructs a new UnlockedVersion.
             * @param [properties] Properties to set
             */
            constructor(properties?: api.IdentityUnlockVersionsRequest.IUnlockedVersion);

            /** UnlockedVersion resolvedChallenge. */
            public resolvedChallenge?: (api.ISessionResolveChallengeRequest|null);

            /** UnlockedVersion backward. */
            public backward?: (api.IIdentityBackwardKey|null);

            /**
             * Creates a new UnlockedVersion instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UnlockedVersion instance
             */
            public static create(properties?: api.IdentityUnlockVersionsRequest.IUnlockedVersion): api.IdentityUnlockVersionsRequest.UnlockedVersion;

            /**
             * Encodes the specified UnlockedVersion message. Does not implicitly {@link api.IdentityUnlockVersionsRequest.UnlockedVersion.verify|verify} messages.
             * @param message UnlockedVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: api.IdentityUnlockVersionsRequest.IUnlockedVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UnlockedVersion message, length delimited. Does not implicitly {@link api.IdentityUnlockVersionsRequest.UnlockedVersion.verify|verify} messages.
             * @param message UnlockedVersion message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: api.IdentityUnlockVersionsRequest.IUnlockedVersion, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UnlockedVersion message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnlockedVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.IdentityUnlockVersionsRequest.UnlockedVersion;

            /**
             * Decodes an UnlockedVersion message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UnlockedVersion
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.IdentityUnlockVersionsRequest.UnlockedVersion;

            /**
             * Verifies an UnlockedVersion message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UnlockedVersion message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockedVersion
             */
            public static fromObject(object: { [k: string]: any }): api.IdentityUnlockVersionsRequest.UnlockedVersion;

            /**
             * Creates a plain object from an UnlockedVersion message. Also converts values to other types if specified.
             * @param message UnlockedVersion
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: api.IdentityUnlockVersionsRequest.UnlockedVersion, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockedVersion to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a SessionSetSecretRequest. */
    interface ISessionSetSecretRequest {

        /** SessionSetSecretRequest masterSalt */
        masterSalt?: (Uint8Array|null);

        /** SessionSetSecretRequest sharingEncrypted */
        sharingEncrypted?: (api.IIdentityEncryptedKey|null);
    }

    /** Represents a SessionSetSecretRequest. */
    class SessionSetSecretRequest implements ISessionSetSecretRequest {

        /**
         * Constructs a new SessionSetSecretRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISessionSetSecretRequest);

        /** SessionSetSecretRequest masterSalt. */
        public masterSalt: Uint8Array;

        /** SessionSetSecretRequest sharingEncrypted. */
        public sharingEncrypted?: (api.IIdentityEncryptedKey|null);

        /**
         * Creates a new SessionSetSecretRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionSetSecretRequest instance
         */
        public static create(properties?: api.ISessionSetSecretRequest): api.SessionSetSecretRequest;

        /**
         * Encodes the specified SessionSetSecretRequest message. Does not implicitly {@link api.SessionSetSecretRequest.verify|verify} messages.
         * @param message SessionSetSecretRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionSetSecretRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionSetSecretRequest message, length delimited. Does not implicitly {@link api.SessionSetSecretRequest.verify|verify} messages.
         * @param message SessionSetSecretRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionSetSecretRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionSetSecretRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionSetSecretRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionSetSecretRequest;

        /**
         * Decodes a SessionSetSecretRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionSetSecretRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionSetSecretRequest;

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
        public static fromObject(object: { [k: string]: any }): api.SessionSetSecretRequest;

        /**
         * Creates a plain object from a SessionSetSecretRequest message. Also converts values to other types if specified.
         * @param message SessionSetSecretRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionSetSecretRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SessionSetSecretRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SessionUnStaleResponse. */
    interface ISessionUnStaleResponse {

        /** SessionUnStaleResponse encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);
    }

    /** Represents a SessionUnStaleResponse. */
    class SessionUnStaleResponse implements ISessionUnStaleResponse {

        /**
         * Constructs a new SessionUnStaleResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISessionUnStaleResponse);

        /** SessionUnStaleResponse encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /**
         * Creates a new SessionUnStaleResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionUnStaleResponse instance
         */
        public static create(properties?: api.ISessionUnStaleResponse): api.SessionUnStaleResponse;

        /**
         * Encodes the specified SessionUnStaleResponse message. Does not implicitly {@link api.SessionUnStaleResponse.verify|verify} messages.
         * @param message SessionUnStaleResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionUnStaleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionUnStaleResponse message, length delimited. Does not implicitly {@link api.SessionUnStaleResponse.verify|verify} messages.
         * @param message SessionUnStaleResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionUnStaleResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionUnStaleResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionUnStaleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionUnStaleResponse;

        /**
         * Decodes a SessionUnStaleResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionUnStaleResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionUnStaleResponse;

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
        public static fromObject(object: { [k: string]: any }): api.SessionUnStaleResponse;

        /**
         * Creates a plain object from a SessionUnStaleResponse message. Also converts values to other types if specified.
         * @param message SessionUnStaleResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionUnStaleResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        assumeKind?: (api.IdentityAccessKeyKind|null);
    }

    /** Represents a SessionAuthenticateResponse. */
    class SessionAuthenticateResponse implements ISessionAuthenticateResponse {

        /**
         * Constructs a new SessionAuthenticateResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ISessionAuthenticateResponse);

        /** SessionAuthenticateResponse ownerLogin. */
        public ownerLogin: string;

        /** SessionAuthenticateResponse assumeLogin. */
        public assumeLogin: string;

        /** SessionAuthenticateResponse assumeKind. */
        public assumeKind: api.IdentityAccessKeyKind;

        /**
         * Creates a new SessionAuthenticateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SessionAuthenticateResponse instance
         */
        public static create(properties?: api.ISessionAuthenticateResponse): api.SessionAuthenticateResponse;

        /**
         * Encodes the specified SessionAuthenticateResponse message. Does not implicitly {@link api.SessionAuthenticateResponse.verify|verify} messages.
         * @param message SessionAuthenticateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ISessionAuthenticateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SessionAuthenticateResponse message, length delimited. Does not implicitly {@link api.SessionAuthenticateResponse.verify|verify} messages.
         * @param message SessionAuthenticateResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ISessionAuthenticateResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SessionAuthenticateResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SessionAuthenticateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.SessionAuthenticateResponse;

        /**
         * Decodes a SessionAuthenticateResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SessionAuthenticateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.SessionAuthenticateResponse;

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
        public static fromObject(object: { [k: string]: any }): api.SessionAuthenticateResponse;

        /**
         * Creates a plain object from a SessionAuthenticateResponse message. Also converts values to other types if specified.
         * @param message SessionAuthenticateResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.SessionAuthenticateResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        type?: (api.ResourceType|null);
    }

    /** Represents a Resource. */
    class Resource implements IResource {

        /**
         * Constructs a new Resource.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResource);

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
        public type: api.ResourceType;

        /**
         * Creates a new Resource instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Resource instance
         */
        public static create(properties?: api.IResource): api.Resource;

        /**
         * Encodes the specified Resource message. Does not implicitly {@link api.Resource.verify|verify} messages.
         * @param message Resource message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResource, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Resource message, length delimited. Does not implicitly {@link api.Resource.verify|verify} messages.
         * @param message Resource message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResource, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Resource message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Resource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Resource;

        /**
         * Decodes a Resource message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Resource
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Resource;

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
        public static fromObject(object: { [k: string]: any }): api.Resource;

        /**
         * Creates a plain object from a Resource message. Also converts values to other types if specified.
         * @param message Resource
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Resource, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Resource to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetRequest. */
    interface IResourceGetRequest {

        /** ResourceGetRequest id */
        id?: (number|Long|null);

        /** ResourceGetRequest accessReason */
        accessReason?: (string|null);
    }

    /** Represents a ResourceGetRequest. */
    class ResourceGetRequest implements IResourceGetRequest {

        /**
         * Constructs a new ResourceGetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetRequest);

        /** ResourceGetRequest id. */
        public id: (number|Long);

        /** ResourceGetRequest accessReason. */
        public accessReason: string;

        /**
         * Creates a new ResourceGetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetRequest instance
         */
        public static create(properties?: api.IResourceGetRequest): api.ResourceGetRequest;

        /**
         * Encodes the specified ResourceGetRequest message. Does not implicitly {@link api.ResourceGetRequest.verify|verify} messages.
         * @param message ResourceGetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetRequest message, length delimited. Does not implicitly {@link api.ResourceGetRequest.verify|verify} messages.
         * @param message ResourceGetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetRequest;

        /**
         * Decodes a ResourceGetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetRequest;

        /**
         * Verifies a ResourceGetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ResourceGetRequest;

        /**
         * Creates a plain object from a ResourceGetRequest message. Also converts values to other types if specified.
         * @param message ResourceGetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetResponse. */
    interface IResourceGetResponse {

        /** ResourceGetResponse resource */
        resource?: (api.IResource|null);

        /** ResourceGetResponse owner */
        owner?: (api.IIdentityKeyID|null);

        /** ResourceGetResponse creator */
        creator?: (api.IIdentityKeyID|null);

        /** ResourceGetResponse encryptedKey */
        encryptedKey?: (api.ICipher|null);
    }

    /** Represents a ResourceGetResponse. */
    class ResourceGetResponse implements IResourceGetResponse {

        /**
         * Constructs a new ResourceGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetResponse);

        /** ResourceGetResponse resource. */
        public resource?: (api.IResource|null);

        /** ResourceGetResponse owner. */
        public owner?: (api.IIdentityKeyID|null);

        /** ResourceGetResponse creator. */
        public creator?: (api.IIdentityKeyID|null);

        /** ResourceGetResponse encryptedKey. */
        public encryptedKey?: (api.ICipher|null);

        /**
         * Creates a new ResourceGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetResponse instance
         */
        public static create(properties?: api.IResourceGetResponse): api.ResourceGetResponse;

        /**
         * Encodes the specified ResourceGetResponse message. Does not implicitly {@link api.ResourceGetResponse.verify|verify} messages.
         * @param message ResourceGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetResponse message, length delimited. Does not implicitly {@link api.ResourceGetResponse.verify|verify} messages.
         * @param message ResourceGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetResponse;

        /**
         * Decodes a ResourceGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceGetResponse;

        /**
         * Creates a plain object from a ResourceGetResponse message. Also converts values to other types if specified.
         * @param message ResourceGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceDeleteRequest. */
    interface IResourceDeleteRequest {

        /** ResourceDeleteRequest id */
        id?: (number|Long|null);

        /** ResourceDeleteRequest soft */
        soft?: (boolean|null);
    }

    /** Represents a ResourceDeleteRequest. */
    class ResourceDeleteRequest implements IResourceDeleteRequest {

        /**
         * Constructs a new ResourceDeleteRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceDeleteRequest);

        /** ResourceDeleteRequest id. */
        public id: (number|Long);

        /** ResourceDeleteRequest soft. */
        public soft: boolean;

        /**
         * Creates a new ResourceDeleteRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceDeleteRequest instance
         */
        public static create(properties?: api.IResourceDeleteRequest): api.ResourceDeleteRequest;

        /**
         * Encodes the specified ResourceDeleteRequest message. Does not implicitly {@link api.ResourceDeleteRequest.verify|verify} messages.
         * @param message ResourceDeleteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceDeleteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceDeleteRequest message, length delimited. Does not implicitly {@link api.ResourceDeleteRequest.verify|verify} messages.
         * @param message ResourceDeleteRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceDeleteRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceDeleteRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceDeleteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceDeleteRequest;

        /**
         * Decodes a ResourceDeleteRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceDeleteRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceDeleteRequest;

        /**
         * Verifies a ResourceDeleteRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceDeleteRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceDeleteRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ResourceDeleteRequest;

        /**
         * Creates a plain object from a ResourceDeleteRequest message. Also converts values to other types if specified.
         * @param message ResourceDeleteRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceDeleteRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceDeleteRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetKeyRequest. */
    interface IResourceGetKeyRequest {

        /** ResourceGetKeyRequest id */
        id?: (number|Long|null);

        /** ResourceGetKeyRequest accessReason */
        accessReason?: (string|null);
    }

    /** Represents a ResourceGetKeyRequest. */
    class ResourceGetKeyRequest implements IResourceGetKeyRequest {

        /**
         * Constructs a new ResourceGetKeyRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetKeyRequest);

        /** ResourceGetKeyRequest id. */
        public id: (number|Long);

        /** ResourceGetKeyRequest accessReason. */
        public accessReason: string;

        /**
         * Creates a new ResourceGetKeyRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetKeyRequest instance
         */
        public static create(properties?: api.IResourceGetKeyRequest): api.ResourceGetKeyRequest;

        /**
         * Encodes the specified ResourceGetKeyRequest message. Does not implicitly {@link api.ResourceGetKeyRequest.verify|verify} messages.
         * @param message ResourceGetKeyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetKeyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetKeyRequest message, length delimited. Does not implicitly {@link api.ResourceGetKeyRequest.verify|verify} messages.
         * @param message ResourceGetKeyRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetKeyRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetKeyRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetKeyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetKeyRequest;

        /**
         * Decodes a ResourceGetKeyRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetKeyRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetKeyRequest;

        /**
         * Verifies a ResourceGetKeyRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetKeyRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetKeyRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ResourceGetKeyRequest;

        /**
         * Creates a plain object from a ResourceGetKeyRequest message. Also converts values to other types if specified.
         * @param message ResourceGetKeyRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetKeyRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetKeyRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetSharingGroupRequest. */
    interface IResourceGetSharingGroupRequest {

        /** ResourceGetSharingGroupRequest id */
        id?: (number|Long|null);
    }

    /** Represents a ResourceGetSharingGroupRequest. */
    class ResourceGetSharingGroupRequest implements IResourceGetSharingGroupRequest {

        /**
         * Constructs a new ResourceGetSharingGroupRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetSharingGroupRequest);

        /** ResourceGetSharingGroupRequest id. */
        public id: (number|Long);

        /**
         * Creates a new ResourceGetSharingGroupRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetSharingGroupRequest instance
         */
        public static create(properties?: api.IResourceGetSharingGroupRequest): api.ResourceGetSharingGroupRequest;

        /**
         * Encodes the specified ResourceGetSharingGroupRequest message. Does not implicitly {@link api.ResourceGetSharingGroupRequest.verify|verify} messages.
         * @param message ResourceGetSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetSharingGroupRequest message, length delimited. Does not implicitly {@link api.ResourceGetSharingGroupRequest.verify|verify} messages.
         * @param message ResourceGetSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetSharingGroupRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetSharingGroupRequest;

        /**
         * Decodes a ResourceGetSharingGroupRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetSharingGroupRequest;

        /**
         * Verifies a ResourceGetSharingGroupRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceGetSharingGroupRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceGetSharingGroupRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ResourceGetSharingGroupRequest;

        /**
         * Creates a plain object from a ResourceGetSharingGroupRequest message. Also converts values to other types if specified.
         * @param message ResourceGetSharingGroupRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetSharingGroupRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetSharingGroupRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetKeyResponse. */
    interface IResourceGetKeyResponse {

        /** ResourceGetKeyResponse encryptedKey */
        encryptedKey?: (api.ICipher|null);

        /** ResourceGetKeyResponse type */
        type?: (api.ResourceType|null);

        /** ResourceGetKeyResponse owner */
        owner?: (api.IIdentityKeyID|null);
    }

    /** Represents a ResourceGetKeyResponse. */
    class ResourceGetKeyResponse implements IResourceGetKeyResponse {

        /**
         * Constructs a new ResourceGetKeyResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetKeyResponse);

        /** ResourceGetKeyResponse encryptedKey. */
        public encryptedKey?: (api.ICipher|null);

        /** ResourceGetKeyResponse type. */
        public type: api.ResourceType;

        /** ResourceGetKeyResponse owner. */
        public owner?: (api.IIdentityKeyID|null);

        /**
         * Creates a new ResourceGetKeyResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetKeyResponse instance
         */
        public static create(properties?: api.IResourceGetKeyResponse): api.ResourceGetKeyResponse;

        /**
         * Encodes the specified ResourceGetKeyResponse message. Does not implicitly {@link api.ResourceGetKeyResponse.verify|verify} messages.
         * @param message ResourceGetKeyResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetKeyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetKeyResponse message, length delimited. Does not implicitly {@link api.ResourceGetKeyResponse.verify|verify} messages.
         * @param message ResourceGetKeyResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetKeyResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetKeyResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetKeyResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetKeyResponse;

        /**
         * Decodes a ResourceGetKeyResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetKeyResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetKeyResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceGetKeyResponse;

        /**
         * Creates a plain object from a ResourceGetKeyResponse message. Also converts values to other types if specified.
         * @param message ResourceGetKeyResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetKeyResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IResourceShareEntry);

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
        public static create(properties?: api.IResourceShareEntry): api.ResourceShareEntry;

        /**
         * Encodes the specified ResourceShareEntry message. Does not implicitly {@link api.ResourceShareEntry.verify|verify} messages.
         * @param message ResourceShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceShareEntry message, length delimited. Does not implicitly {@link api.ResourceShareEntry.verify|verify} messages.
         * @param message ResourceShareEntry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceShareEntry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceShareEntry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceShareEntry;

        /**
         * Decodes a ResourceShareEntry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceShareEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceShareEntry;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceShareEntry;

        /**
         * Creates a plain object from a ResourceShareEntry message. Also converts values to other types if specified.
         * @param message ResourceShareEntry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceShareEntry, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sharingGroup?: (api.IResourceShareEntry[]|null);

        /** ResourcePostRequest type */
        type?: (api.ResourceType|null);
    }

    /** Represents a ResourcePostRequest. */
    class ResourcePostRequest implements IResourcePostRequest {

        /**
         * Constructs a new ResourcePostRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourcePostRequest);

        /** ResourcePostRequest kind. */
        public kind: string;

        /** ResourcePostRequest publicKey. */
        public publicKey: Uint8Array;

        /** ResourcePostRequest nonce. */
        public nonce: Uint8Array;

        /** ResourcePostRequest payload. */
        public payload: Uint8Array;

        /** ResourcePostRequest sharingGroup. */
        public sharingGroup: api.IResourceShareEntry[];

        /** ResourcePostRequest type. */
        public type: api.ResourceType;

        /**
         * Creates a new ResourcePostRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourcePostRequest instance
         */
        public static create(properties?: api.IResourcePostRequest): api.ResourcePostRequest;

        /**
         * Encodes the specified ResourcePostRequest message. Does not implicitly {@link api.ResourcePostRequest.verify|verify} messages.
         * @param message ResourcePostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourcePostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourcePostRequest message, length delimited. Does not implicitly {@link api.ResourcePostRequest.verify|verify} messages.
         * @param message ResourcePostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourcePostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourcePostRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourcePostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourcePostRequest;

        /**
         * Decodes a ResourcePostRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourcePostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourcePostRequest;

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
        public static fromObject(object: { [k: string]: any }): api.ResourcePostRequest;

        /**
         * Creates a plain object from a ResourcePostRequest message. Also converts values to other types if specified.
         * @param message ResourcePostRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourcePostRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IResourcePostResponse);

        /** ResourcePostResponse id. */
        public id: (number|Long);

        /**
         * Creates a new ResourcePostResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourcePostResponse instance
         */
        public static create(properties?: api.IResourcePostResponse): api.ResourcePostResponse;

        /**
         * Encodes the specified ResourcePostResponse message. Does not implicitly {@link api.ResourcePostResponse.verify|verify} messages.
         * @param message ResourcePostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourcePostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourcePostResponse message, length delimited. Does not implicitly {@link api.ResourcePostResponse.verify|verify} messages.
         * @param message ResourcePostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourcePostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourcePostResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourcePostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourcePostResponse;

        /**
         * Decodes a ResourcePostResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourcePostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourcePostResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ResourcePostResponse;

        /**
         * Creates a plain object from a ResourcePostResponse message. Also converts values to other types if specified.
         * @param message ResourcePostResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourcePostResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sharingGroup?: (api.IResourceShareEntry[]|null);
    }

    /** Represents a ResourceExtendSharingGroupRequest. */
    class ResourceExtendSharingGroupRequest implements IResourceExtendSharingGroupRequest {

        /**
         * Constructs a new ResourceExtendSharingGroupRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceExtendSharingGroupRequest);

        /** ResourceExtendSharingGroupRequest id. */
        public id: (number|Long);

        /** ResourceExtendSharingGroupRequest sharingGroup. */
        public sharingGroup: api.IResourceShareEntry[];

        /**
         * Creates a new ResourceExtendSharingGroupRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceExtendSharingGroupRequest instance
         */
        public static create(properties?: api.IResourceExtendSharingGroupRequest): api.ResourceExtendSharingGroupRequest;

        /**
         * Encodes the specified ResourceExtendSharingGroupRequest message. Does not implicitly {@link api.ResourceExtendSharingGroupRequest.verify|verify} messages.
         * @param message ResourceExtendSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceExtendSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceExtendSharingGroupRequest message, length delimited. Does not implicitly {@link api.ResourceExtendSharingGroupRequest.verify|verify} messages.
         * @param message ResourceExtendSharingGroupRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceExtendSharingGroupRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceExtendSharingGroupRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceExtendSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceExtendSharingGroupRequest;

        /**
         * Decodes a ResourceExtendSharingGroupRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceExtendSharingGroupRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceExtendSharingGroupRequest;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceExtendSharingGroupRequest;

        /**
         * Creates a plain object from a ResourceExtendSharingGroupRequest message. Also converts values to other types if specified.
         * @param message ResourceExtendSharingGroupRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceExtendSharingGroupRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceExtendSharingGroupRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceListRequest. */
    interface IResourceListRequest {

        /** ResourceListRequest limit */
        limit?: (number|null);

        /** ResourceListRequest offset */
        offset?: (number|null);

        /** ResourceListRequest accessReason */
        accessReason?: (string|null);
    }

    /** Represents a ResourceListRequest. */
    class ResourceListRequest implements IResourceListRequest {

        /**
         * Constructs a new ResourceListRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceListRequest);

        /** ResourceListRequest limit. */
        public limit: number;

        /** ResourceListRequest offset. */
        public offset: number;

        /** ResourceListRequest accessReason. */
        public accessReason: string;

        /**
         * Creates a new ResourceListRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceListRequest instance
         */
        public static create(properties?: api.IResourceListRequest): api.ResourceListRequest;

        /**
         * Encodes the specified ResourceListRequest message. Does not implicitly {@link api.ResourceListRequest.verify|verify} messages.
         * @param message ResourceListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceListRequest message, length delimited. Does not implicitly {@link api.ResourceListRequest.verify|verify} messages.
         * @param message ResourceListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceListRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceListRequest;

        /**
         * Decodes a ResourceListRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceListRequest;

        /**
         * Verifies a ResourceListRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResourceListRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResourceListRequest
         */
        public static fromObject(object: { [k: string]: any }): api.ResourceListRequest;

        /**
         * Creates a plain object from a ResourceListRequest message. Also converts values to other types if specified.
         * @param message ResourceListRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceListRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceListRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceListResponse. */
    interface IResourceListResponse {

        /** ResourceListResponse resources */
        resources?: (api.IResourceGetResponse[]|null);
    }

    /** Represents a ResourceListResponse. */
    class ResourceListResponse implements IResourceListResponse {

        /**
         * Constructs a new ResourceListResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceListResponse);

        /** ResourceListResponse resources. */
        public resources: api.IResourceGetResponse[];

        /**
         * Creates a new ResourceListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceListResponse instance
         */
        public static create(properties?: api.IResourceListResponse): api.ResourceListResponse;

        /**
         * Encodes the specified ResourceListResponse message. Does not implicitly {@link api.ResourceListResponse.verify|verify} messages.
         * @param message ResourceListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceListResponse message, length delimited. Does not implicitly {@link api.ResourceListResponse.verify|verify} messages.
         * @param message ResourceListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceListResponse;

        /**
         * Decodes a ResourceListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceListResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceListResponse;

        /**
         * Creates a plain object from a ResourceListResponse message. Also converts values to other types if specified.
         * @param message ResourceListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceListResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetSharingGroupResponse. */
    interface IResourceGetSharingGroupResponse {

        /** ResourceGetSharingGroupResponse sharingGroup */
        sharingGroup?: (api.IResourceShareLink[]|null);
    }

    /** Represents a ResourceGetSharingGroupResponse. */
    class ResourceGetSharingGroupResponse implements IResourceGetSharingGroupResponse {

        /**
         * Constructs a new ResourceGetSharingGroupResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetSharingGroupResponse);

        /** ResourceGetSharingGroupResponse sharingGroup. */
        public sharingGroup: api.IResourceShareLink[];

        /**
         * Creates a new ResourceGetSharingGroupResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetSharingGroupResponse instance
         */
        public static create(properties?: api.IResourceGetSharingGroupResponse): api.ResourceGetSharingGroupResponse;

        /**
         * Encodes the specified ResourceGetSharingGroupResponse message. Does not implicitly {@link api.ResourceGetSharingGroupResponse.verify|verify} messages.
         * @param message ResourceGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetSharingGroupResponse message, length delimited. Does not implicitly {@link api.ResourceGetSharingGroupResponse.verify|verify} messages.
         * @param message ResourceGetSharingGroupResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetSharingGroupResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetSharingGroupResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetSharingGroupResponse;

        /**
         * Decodes a ResourceGetSharingGroupResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetSharingGroupResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetSharingGroupResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceGetSharingGroupResponse;

        /**
         * Creates a plain object from a ResourceGetSharingGroupResponse message. Also converts values to other types if specified.
         * @param message ResourceGetSharingGroupResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetSharingGroupResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetSharingGroupResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceShareLink. */
    interface IResourceShareLink {

        /** ResourceShareLink identityID */
        identityID?: (api.IIdentityKeyID|null);
    }

    /** Represents a ResourceShareLink. */
    class ResourceShareLink implements IResourceShareLink {

        /**
         * Constructs a new ResourceShareLink.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceShareLink);

        /** ResourceShareLink identityID. */
        public identityID?: (api.IIdentityKeyID|null);

        /**
         * Creates a new ResourceShareLink instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceShareLink instance
         */
        public static create(properties?: api.IResourceShareLink): api.ResourceShareLink;

        /**
         * Encodes the specified ResourceShareLink message. Does not implicitly {@link api.ResourceShareLink.verify|verify} messages.
         * @param message ResourceShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceShareLink message, length delimited. Does not implicitly {@link api.ResourceShareLink.verify|verify} messages.
         * @param message ResourceShareLink message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceShareLink, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceShareLink message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceShareLink;

        /**
         * Decodes a ResourceShareLink message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceShareLink
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceShareLink;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceShareLink;

        /**
         * Creates a plain object from a ResourceShareLink message. Also converts values to other types if specified.
         * @param message ResourceShareLink
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceShareLink, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        owner?: (api.IIdentityKeyID|null);

        /** ResourceAccessLog assume */
        assume?: (api.IIdentityKeyID|null);

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
        constructor(properties?: api.IResourceAccessLog);

        /** ResourceAccessLog resourceID. */
        public resourceID: (number|Long);

        /** ResourceAccessLog owner. */
        public owner?: (api.IIdentityKeyID|null);

        /** ResourceAccessLog assume. */
        public assume?: (api.IIdentityKeyID|null);

        /** ResourceAccessLog timestamp. */
        public timestamp: (number|Long);

        /** ResourceAccessLog reason. */
        public reason: string;

        /**
         * Creates a new ResourceAccessLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceAccessLog instance
         */
        public static create(properties?: api.IResourceAccessLog): api.ResourceAccessLog;

        /**
         * Encodes the specified ResourceAccessLog message. Does not implicitly {@link api.ResourceAccessLog.verify|verify} messages.
         * @param message ResourceAccessLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceAccessLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceAccessLog message, length delimited. Does not implicitly {@link api.ResourceAccessLog.verify|verify} messages.
         * @param message ResourceAccessLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceAccessLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceAccessLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceAccessLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceAccessLog;

        /**
         * Decodes a ResourceAccessLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceAccessLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceAccessLog;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceAccessLog;

        /**
         * Creates a plain object from a ResourceAccessLog message. Also converts values to other types if specified.
         * @param message ResourceAccessLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceAccessLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IResourceGetAccessLogsRequest);

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
        public static create(properties?: api.IResourceGetAccessLogsRequest): api.ResourceGetAccessLogsRequest;

        /**
         * Encodes the specified ResourceGetAccessLogsRequest message. Does not implicitly {@link api.ResourceGetAccessLogsRequest.verify|verify} messages.
         * @param message ResourceGetAccessLogsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetAccessLogsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetAccessLogsRequest message, length delimited. Does not implicitly {@link api.ResourceGetAccessLogsRequest.verify|verify} messages.
         * @param message ResourceGetAccessLogsRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetAccessLogsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetAccessLogsRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetAccessLogsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetAccessLogsRequest;

        /**
         * Decodes a ResourceGetAccessLogsRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetAccessLogsRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetAccessLogsRequest;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceGetAccessLogsRequest;

        /**
         * Creates a plain object from a ResourceGetAccessLogsRequest message. Also converts values to other types if specified.
         * @param message ResourceGetAccessLogsRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetAccessLogsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResourceGetAccessLogsRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResourceGetAccessLogsResponse. */
    interface IResourceGetAccessLogsResponse {

        /** ResourceGetAccessLogsResponse logs */
        logs?: (api.IResourceAccessLog[]|null);
    }

    /** Represents a ResourceGetAccessLogsResponse. */
    class ResourceGetAccessLogsResponse implements IResourceGetAccessLogsResponse {

        /**
         * Constructs a new ResourceGetAccessLogsResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IResourceGetAccessLogsResponse);

        /** ResourceGetAccessLogsResponse logs. */
        public logs: api.IResourceAccessLog[];

        /**
         * Creates a new ResourceGetAccessLogsResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResourceGetAccessLogsResponse instance
         */
        public static create(properties?: api.IResourceGetAccessLogsResponse): api.ResourceGetAccessLogsResponse;

        /**
         * Encodes the specified ResourceGetAccessLogsResponse message. Does not implicitly {@link api.ResourceGetAccessLogsResponse.verify|verify} messages.
         * @param message ResourceGetAccessLogsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IResourceGetAccessLogsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResourceGetAccessLogsResponse message, length delimited. Does not implicitly {@link api.ResourceGetAccessLogsResponse.verify|verify} messages.
         * @param message ResourceGetAccessLogsResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IResourceGetAccessLogsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResourceGetAccessLogsResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResourceGetAccessLogsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ResourceGetAccessLogsResponse;

        /**
         * Decodes a ResourceGetAccessLogsResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResourceGetAccessLogsResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ResourceGetAccessLogsResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ResourceGetAccessLogsResponse;

        /**
         * Creates a plain object from a ResourceGetAccessLogsResponse message. Also converts values to other types if specified.
         * @param message ResourceGetAccessLogsResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ResourceGetAccessLogsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IEvent);

        /** Event payload. */
        public payload?: (google.protobuf.IAny|null);

        /**
         * Creates a new Event instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Event instance
         */
        public static create(properties?: api.IEvent): api.Event;

        /**
         * Encodes the specified Event message. Does not implicitly {@link api.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Event message, length delimited. Does not implicitly {@link api.Event.verify|verify} messages.
         * @param message Event message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.Event;

        /**
         * Decodes an Event message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.Event;

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
        public static fromObject(object: { [k: string]: any }): api.Event;

        /**
         * Creates a plain object from an Event message. Also converts values to other types if specified.
         * @param message Event
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IEventChannelMessage);

        /** EventChannelMessage channelId. */
        public channelId: (number|Long);

        /** EventChannelMessage content. */
        public content: Uint8Array;

        /**
         * Creates a new EventChannelMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventChannelMessage instance
         */
        public static create(properties?: api.IEventChannelMessage): api.EventChannelMessage;

        /**
         * Encodes the specified EventChannelMessage message. Does not implicitly {@link api.EventChannelMessage.verify|verify} messages.
         * @param message EventChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IEventChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventChannelMessage message, length delimited. Does not implicitly {@link api.EventChannelMessage.verify|verify} messages.
         * @param message EventChannelMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IEventChannelMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventChannelMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EventChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.EventChannelMessage;

        /**
         * Decodes an EventChannelMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EventChannelMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.EventChannelMessage;

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
        public static fromObject(object: { [k: string]: any }): api.EventChannelMessage;

        /**
         * Creates a plain object from an EventChannelMessage message. Also converts values to other types if specified.
         * @param message EventChannelMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.EventChannelMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        resource?: (api.IResourceGetResponse|null);
    }

    /** Represents a ChannelGetResponse. */
    class ChannelGetResponse implements IChannelGetResponse {

        /**
         * Constructs a new ChannelGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IChannelGetResponse);

        /** ChannelGetResponse id. */
        public id: (number|Long);

        /** ChannelGetResponse resource. */
        public resource?: (api.IResourceGetResponse|null);

        /**
         * Creates a new ChannelGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelGetResponse instance
         */
        public static create(properties?: api.IChannelGetResponse): api.ChannelGetResponse;

        /**
         * Encodes the specified ChannelGetResponse message. Does not implicitly {@link api.ChannelGetResponse.verify|verify} messages.
         * @param message ChannelGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChannelGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelGetResponse message, length delimited. Does not implicitly {@link api.ChannelGetResponse.verify|verify} messages.
         * @param message ChannelGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChannelGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChannelGetResponse;

        /**
         * Decodes a ChannelGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChannelGetResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ChannelGetResponse;

        /**
         * Creates a plain object from a ChannelGetResponse message. Also converts values to other types if specified.
         * @param message ChannelGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChannelGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        sharingGroup?: (api.IResourceShareEntry[]|null);

        /** ChannelPostRequest type */
        type?: (api.ResourceType|null);
    }

    /** Represents a ChannelPostRequest. */
    class ChannelPostRequest implements IChannelPostRequest {

        /**
         * Constructs a new ChannelPostRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IChannelPostRequest);

        /** ChannelPostRequest publicKey. */
        public publicKey: Uint8Array;

        /** ChannelPostRequest nonce. */
        public nonce: Uint8Array;

        /** ChannelPostRequest payload. */
        public payload: Uint8Array;

        /** ChannelPostRequest sharingGroup. */
        public sharingGroup: api.IResourceShareEntry[];

        /** ChannelPostRequest type. */
        public type: api.ResourceType;

        /**
         * Creates a new ChannelPostRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelPostRequest instance
         */
        public static create(properties?: api.IChannelPostRequest): api.ChannelPostRequest;

        /**
         * Encodes the specified ChannelPostRequest message. Does not implicitly {@link api.ChannelPostRequest.verify|verify} messages.
         * @param message ChannelPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChannelPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelPostRequest message, length delimited. Does not implicitly {@link api.ChannelPostRequest.verify|verify} messages.
         * @param message ChannelPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChannelPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelPostRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChannelPostRequest;

        /**
         * Decodes a ChannelPostRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChannelPostRequest;

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
        public static fromObject(object: { [k: string]: any }): api.ChannelPostRequest;

        /**
         * Creates a plain object from a ChannelPostRequest message. Also converts values to other types if specified.
         * @param message ChannelPostRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChannelPostRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IChannelPostResponse);

        /** ChannelPostResponse id. */
        public id: (number|Long);

        /**
         * Creates a new ChannelPostResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelPostResponse instance
         */
        public static create(properties?: api.IChannelPostResponse): api.ChannelPostResponse;

        /**
         * Encodes the specified ChannelPostResponse message. Does not implicitly {@link api.ChannelPostResponse.verify|verify} messages.
         * @param message ChannelPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChannelPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelPostResponse message, length delimited. Does not implicitly {@link api.ChannelPostResponse.verify|verify} messages.
         * @param message ChannelPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChannelPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelPostResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChannelPostResponse;

        /**
         * Decodes a ChannelPostResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChannelPostResponse;

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
        public static fromObject(object: { [k: string]: any }): api.ChannelPostResponse;

        /**
         * Creates a plain object from a ChannelPostResponse message. Also converts values to other types if specified.
         * @param message ChannelPostResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChannelPostResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IChannelPostMessageRequest);

        /** ChannelPostMessageRequest channelId. */
        public channelId: (number|Long);

        /** ChannelPostMessageRequest content. */
        public content: Uint8Array;

        /**
         * Creates a new ChannelPostMessageRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChannelPostMessageRequest instance
         */
        public static create(properties?: api.IChannelPostMessageRequest): api.ChannelPostMessageRequest;

        /**
         * Encodes the specified ChannelPostMessageRequest message. Does not implicitly {@link api.ChannelPostMessageRequest.verify|verify} messages.
         * @param message ChannelPostMessageRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IChannelPostMessageRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChannelPostMessageRequest message, length delimited. Does not implicitly {@link api.ChannelPostMessageRequest.verify|verify} messages.
         * @param message ChannelPostMessageRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IChannelPostMessageRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChannelPostMessageRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChannelPostMessageRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ChannelPostMessageRequest;

        /**
         * Decodes a ChannelPostMessageRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChannelPostMessageRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ChannelPostMessageRequest;

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
        public static fromObject(object: { [k: string]: any }): api.ChannelPostMessageRequest;

        /**
         * Creates a plain object from a ChannelPostMessageRequest message. Also converts values to other types if specified.
         * @param message ChannelPostMessageRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ChannelPostMessageRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChannelPostMessageRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessPostRequest. */
    interface IDelegatedAccessPostRequest {

        /** DelegatedAccessPostRequest publicKey */
        publicKey?: (Uint8Array|null);

        /** DelegatedAccessPostRequest sign */
        sign?: (Uint8Array|null);

        /** DelegatedAccessPostRequest requester */
        requester?: (string|null);

        /** DelegatedAccessPostRequest sharing */
        sharing?: (api.IResourceShareEntry|null);
    }

    /** Represents a DelegatedAccessPostRequest. */
    class DelegatedAccessPostRequest implements IDelegatedAccessPostRequest {

        /**
         * Constructs a new DelegatedAccessPostRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessPostRequest);

        /** DelegatedAccessPostRequest publicKey. */
        public publicKey: Uint8Array;

        /** DelegatedAccessPostRequest sign. */
        public sign: Uint8Array;

        /** DelegatedAccessPostRequest requester. */
        public requester: string;

        /** DelegatedAccessPostRequest sharing. */
        public sharing?: (api.IResourceShareEntry|null);

        /**
         * Creates a new DelegatedAccessPostRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessPostRequest instance
         */
        public static create(properties?: api.IDelegatedAccessPostRequest): api.DelegatedAccessPostRequest;

        /**
         * Encodes the specified DelegatedAccessPostRequest message. Does not implicitly {@link api.DelegatedAccessPostRequest.verify|verify} messages.
         * @param message DelegatedAccessPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessPostRequest message, length delimited. Does not implicitly {@link api.DelegatedAccessPostRequest.verify|verify} messages.
         * @param message DelegatedAccessPostRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessPostRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessPostRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessPostRequest;

        /**
         * Decodes a DelegatedAccessPostRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessPostRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessPostRequest;

        /**
         * Verifies a DelegatedAccessPostRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessPostRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessPostRequest
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessPostRequest;

        /**
         * Creates a plain object from a DelegatedAccessPostRequest message. Also converts values to other types if specified.
         * @param message DelegatedAccessPostRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessPostRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessPostRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessPostResponse. */
    interface IDelegatedAccessPostResponse {

        /** DelegatedAccessPostResponse id */
        id?: (number|Long|null);
    }

    /** Represents a DelegatedAccessPostResponse. */
    class DelegatedAccessPostResponse implements IDelegatedAccessPostResponse {

        /**
         * Constructs a new DelegatedAccessPostResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessPostResponse);

        /** DelegatedAccessPostResponse id. */
        public id: (number|Long);

        /**
         * Creates a new DelegatedAccessPostResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessPostResponse instance
         */
        public static create(properties?: api.IDelegatedAccessPostResponse): api.DelegatedAccessPostResponse;

        /**
         * Encodes the specified DelegatedAccessPostResponse message. Does not implicitly {@link api.DelegatedAccessPostResponse.verify|verify} messages.
         * @param message DelegatedAccessPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessPostResponse message, length delimited. Does not implicitly {@link api.DelegatedAccessPostResponse.verify|verify} messages.
         * @param message DelegatedAccessPostResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessPostResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessPostResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessPostResponse;

        /**
         * Decodes a DelegatedAccessPostResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessPostResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessPostResponse;

        /**
         * Verifies a DelegatedAccessPostResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessPostResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessPostResponse
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessPostResponse;

        /**
         * Creates a plain object from a DelegatedAccessPostResponse message. Also converts values to other types if specified.
         * @param message DelegatedAccessPostResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessPostResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessPostResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessGetRequest. */
    interface IDelegatedAccessGetRequest {

        /** DelegatedAccessGetRequest delegatedID */
        delegatedID?: (number|Long|null);
    }

    /** Represents a DelegatedAccessGetRequest. */
    class DelegatedAccessGetRequest implements IDelegatedAccessGetRequest {

        /**
         * Constructs a new DelegatedAccessGetRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessGetRequest);

        /** DelegatedAccessGetRequest delegatedID. */
        public delegatedID: (number|Long);

        /**
         * Creates a new DelegatedAccessGetRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessGetRequest instance
         */
        public static create(properties?: api.IDelegatedAccessGetRequest): api.DelegatedAccessGetRequest;

        /**
         * Encodes the specified DelegatedAccessGetRequest message. Does not implicitly {@link api.DelegatedAccessGetRequest.verify|verify} messages.
         * @param message DelegatedAccessGetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessGetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessGetRequest message, length delimited. Does not implicitly {@link api.DelegatedAccessGetRequest.verify|verify} messages.
         * @param message DelegatedAccessGetRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessGetRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessGetRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessGetRequest;

        /**
         * Decodes a DelegatedAccessGetRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessGetRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessGetRequest;

        /**
         * Verifies a DelegatedAccessGetRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessGetRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessGetRequest
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessGetRequest;

        /**
         * Creates a plain object from a DelegatedAccessGetRequest message. Also converts values to other types if specified.
         * @param message DelegatedAccessGetRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessGetRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessGetRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessGetKeysRequest. */
    interface IDelegatedAccessGetKeysRequest {

        /** DelegatedAccessGetKeysRequest delegatedID */
        delegatedID?: (number|Long|null);
    }

    /** Represents a DelegatedAccessGetKeysRequest. */
    class DelegatedAccessGetKeysRequest implements IDelegatedAccessGetKeysRequest {

        /**
         * Constructs a new DelegatedAccessGetKeysRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessGetKeysRequest);

        /** DelegatedAccessGetKeysRequest delegatedID. */
        public delegatedID: (number|Long);

        /**
         * Creates a new DelegatedAccessGetKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessGetKeysRequest instance
         */
        public static create(properties?: api.IDelegatedAccessGetKeysRequest): api.DelegatedAccessGetKeysRequest;

        /**
         * Encodes the specified DelegatedAccessGetKeysRequest message. Does not implicitly {@link api.DelegatedAccessGetKeysRequest.verify|verify} messages.
         * @param message DelegatedAccessGetKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessGetKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessGetKeysRequest message, length delimited. Does not implicitly {@link api.DelegatedAccessGetKeysRequest.verify|verify} messages.
         * @param message DelegatedAccessGetKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessGetKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessGetKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessGetKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessGetKeysRequest;

        /**
         * Decodes a DelegatedAccessGetKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessGetKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessGetKeysRequest;

        /**
         * Verifies a DelegatedAccessGetKeysRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessGetKeysRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessGetKeysRequest
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessGetKeysRequest;

        /**
         * Creates a plain object from a DelegatedAccessGetKeysRequest message. Also converts values to other types if specified.
         * @param message DelegatedAccessGetKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessGetKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessGetKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessGetResponse. */
    interface IDelegatedAccessGetResponse {

        /** DelegatedAccessGetResponse resource */
        resource?: (api.IResourceGetResponse|null);

        /** DelegatedAccessGetResponse sign */
        sign?: (Uint8Array|null);
    }

    /** Represents a DelegatedAccessGetResponse. */
    class DelegatedAccessGetResponse implements IDelegatedAccessGetResponse {

        /**
         * Constructs a new DelegatedAccessGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessGetResponse);

        /** DelegatedAccessGetResponse resource. */
        public resource?: (api.IResourceGetResponse|null);

        /** DelegatedAccessGetResponse sign. */
        public sign: Uint8Array;

        /**
         * Creates a new DelegatedAccessGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessGetResponse instance
         */
        public static create(properties?: api.IDelegatedAccessGetResponse): api.DelegatedAccessGetResponse;

        /**
         * Encodes the specified DelegatedAccessGetResponse message. Does not implicitly {@link api.DelegatedAccessGetResponse.verify|verify} messages.
         * @param message DelegatedAccessGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessGetResponse message, length delimited. Does not implicitly {@link api.DelegatedAccessGetResponse.verify|verify} messages.
         * @param message DelegatedAccessGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessGetResponse;

        /**
         * Decodes a DelegatedAccessGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessGetResponse;

        /**
         * Verifies a DelegatedAccessGetResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessGetResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessGetResponse
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessGetResponse;

        /**
         * Creates a plain object from a DelegatedAccessGetResponse message. Also converts values to other types if specified.
         * @param message DelegatedAccessGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessGetResponse to JSON.
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
        constructor(properties?: api.IDelegatedKeys);

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
        public static create(properties?: api.IDelegatedKeys): api.DelegatedKeys;

        /**
         * Encodes the specified DelegatedKeys message. Does not implicitly {@link api.DelegatedKeys.verify|verify} messages.
         * @param message DelegatedKeys message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedKeys, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedKeys message, length delimited. Does not implicitly {@link api.DelegatedKeys.verify|verify} messages.
         * @param message DelegatedKeys message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedKeys, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedKeys message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedKeys
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedKeys;

        /**
         * Decodes a DelegatedKeys message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedKeys
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedKeys;

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
        public static fromObject(object: { [k: string]: any }): api.DelegatedKeys;

        /**
         * Creates a plain object from a DelegatedKeys message. Also converts values to other types if specified.
         * @param message DelegatedKeys
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedKeys, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedKeys to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessGetKeysResponse. */
    interface IDelegatedAccessGetKeysResponse {

        /** DelegatedAccessGetKeysResponse keys */
        keys?: (Uint8Array|null);
    }

    /** Represents a DelegatedAccessGetKeysResponse. */
    class DelegatedAccessGetKeysResponse implements IDelegatedAccessGetKeysResponse {

        /**
         * Constructs a new DelegatedAccessGetKeysResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessGetKeysResponse);

        /** DelegatedAccessGetKeysResponse keys. */
        public keys: Uint8Array;

        /**
         * Creates a new DelegatedAccessGetKeysResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessGetKeysResponse instance
         */
        public static create(properties?: api.IDelegatedAccessGetKeysResponse): api.DelegatedAccessGetKeysResponse;

        /**
         * Encodes the specified DelegatedAccessGetKeysResponse message. Does not implicitly {@link api.DelegatedAccessGetKeysResponse.verify|verify} messages.
         * @param message DelegatedAccessGetKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessGetKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessGetKeysResponse message, length delimited. Does not implicitly {@link api.DelegatedAccessGetKeysResponse.verify|verify} messages.
         * @param message DelegatedAccessGetKeysResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessGetKeysResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessGetKeysResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessGetKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessGetKeysResponse;

        /**
         * Decodes a DelegatedAccessGetKeysResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessGetKeysResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessGetKeysResponse;

        /**
         * Verifies a DelegatedAccessGetKeysResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessGetKeysResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessGetKeysResponse
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessGetKeysResponse;

        /**
         * Creates a plain object from a DelegatedAccessGetKeysResponse message. Also converts values to other types if specified.
         * @param message DelegatedAccessGetKeysResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessGetKeysResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessGetKeysResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessPostKeysRequest. */
    interface IDelegatedAccessPostKeysRequest {

        /** DelegatedAccessPostKeysRequest delegatedID */
        delegatedID?: (number|Long|null);

        /** DelegatedAccessPostKeysRequest keys */
        keys?: (Uint8Array|null);
    }

    /** Represents a DelegatedAccessPostKeysRequest. */
    class DelegatedAccessPostKeysRequest implements IDelegatedAccessPostKeysRequest {

        /**
         * Constructs a new DelegatedAccessPostKeysRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessPostKeysRequest);

        /** DelegatedAccessPostKeysRequest delegatedID. */
        public delegatedID: (number|Long);

        /** DelegatedAccessPostKeysRequest keys. */
        public keys: Uint8Array;

        /**
         * Creates a new DelegatedAccessPostKeysRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessPostKeysRequest instance
         */
        public static create(properties?: api.IDelegatedAccessPostKeysRequest): api.DelegatedAccessPostKeysRequest;

        /**
         * Encodes the specified DelegatedAccessPostKeysRequest message. Does not implicitly {@link api.DelegatedAccessPostKeysRequest.verify|verify} messages.
         * @param message DelegatedAccessPostKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessPostKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessPostKeysRequest message, length delimited. Does not implicitly {@link api.DelegatedAccessPostKeysRequest.verify|verify} messages.
         * @param message DelegatedAccessPostKeysRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessPostKeysRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessPostKeysRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessPostKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessPostKeysRequest;

        /**
         * Decodes a DelegatedAccessPostKeysRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessPostKeysRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessPostKeysRequest;

        /**
         * Verifies a DelegatedAccessPostKeysRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessPostKeysRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessPostKeysRequest
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessPostKeysRequest;

        /**
         * Creates a plain object from a DelegatedAccessPostKeysRequest message. Also converts values to other types if specified.
         * @param message DelegatedAccessPostKeysRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessPostKeysRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessPostKeysRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccess. */
    interface IDelegatedAccess {

        /** DelegatedAccess id */
        id?: (number|Long|null);

        /** DelegatedAccess publicKey */
        publicKey?: (Uint8Array|null);

        /** DelegatedAccess sign */
        sign?: (Uint8Array|null);

        /** DelegatedAccess requester */
        requester?: (api.IIdentityKeyID|null);

        /** DelegatedAccess target */
        target?: (api.IIdentityKeyID|null);

        /** DelegatedAccess created */
        created?: (number|Long|null);

        /** DelegatedAccess resolved */
        resolved?: (boolean|null);
    }

    /** Represents a DelegatedAccess. */
    class DelegatedAccess implements IDelegatedAccess {

        /**
         * Constructs a new DelegatedAccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccess);

        /** DelegatedAccess id. */
        public id: (number|Long);

        /** DelegatedAccess publicKey. */
        public publicKey: Uint8Array;

        /** DelegatedAccess sign. */
        public sign: Uint8Array;

        /** DelegatedAccess requester. */
        public requester?: (api.IIdentityKeyID|null);

        /** DelegatedAccess target. */
        public target?: (api.IIdentityKeyID|null);

        /** DelegatedAccess created. */
        public created: (number|Long);

        /** DelegatedAccess resolved. */
        public resolved: boolean;

        /**
         * Creates a new DelegatedAccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccess instance
         */
        public static create(properties?: api.IDelegatedAccess): api.DelegatedAccess;

        /**
         * Encodes the specified DelegatedAccess message. Does not implicitly {@link api.DelegatedAccess.verify|verify} messages.
         * @param message DelegatedAccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccess message, length delimited. Does not implicitly {@link api.DelegatedAccess.verify|verify} messages.
         * @param message DelegatedAccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccess;

        /**
         * Decodes a DelegatedAccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccess;

        /**
         * Verifies a DelegatedAccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccess
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccess;

        /**
         * Creates a plain object from a DelegatedAccess message. Also converts values to other types if specified.
         * @param message DelegatedAccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessListRequest. */
    interface IDelegatedAccessListRequest {

        /** DelegatedAccessListRequest limit */
        limit?: (number|null);

        /** DelegatedAccessListRequest maxID */
        maxID?: (number|Long|null);

        /** DelegatedAccessListRequest sinceID */
        sinceID?: (number|Long|null);
    }

    /** Represents a DelegatedAccessListRequest. */
    class DelegatedAccessListRequest implements IDelegatedAccessListRequest {

        /**
         * Constructs a new DelegatedAccessListRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessListRequest);

        /** DelegatedAccessListRequest limit. */
        public limit: number;

        /** DelegatedAccessListRequest maxID. */
        public maxID: (number|Long);

        /** DelegatedAccessListRequest sinceID. */
        public sinceID: (number|Long);

        /**
         * Creates a new DelegatedAccessListRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessListRequest instance
         */
        public static create(properties?: api.IDelegatedAccessListRequest): api.DelegatedAccessListRequest;

        /**
         * Encodes the specified DelegatedAccessListRequest message. Does not implicitly {@link api.DelegatedAccessListRequest.verify|verify} messages.
         * @param message DelegatedAccessListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessListRequest message, length delimited. Does not implicitly {@link api.DelegatedAccessListRequest.verify|verify} messages.
         * @param message DelegatedAccessListRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessListRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessListRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessListRequest;

        /**
         * Decodes a DelegatedAccessListRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessListRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessListRequest;

        /**
         * Verifies a DelegatedAccessListRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessListRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessListRequest
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessListRequest;

        /**
         * Creates a plain object from a DelegatedAccessListRequest message. Also converts values to other types if specified.
         * @param message DelegatedAccessListRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessListRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessListRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a DelegatedAccessListResponse. */
    interface IDelegatedAccessListResponse {

        /** DelegatedAccessListResponse accesses */
        accesses?: (api.IDelegatedAccess[]|null);
    }

    /** Represents a DelegatedAccessListResponse. */
    class DelegatedAccessListResponse implements IDelegatedAccessListResponse {

        /**
         * Constructs a new DelegatedAccessListResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IDelegatedAccessListResponse);

        /** DelegatedAccessListResponse accesses. */
        public accesses: api.IDelegatedAccess[];

        /**
         * Creates a new DelegatedAccessListResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DelegatedAccessListResponse instance
         */
        public static create(properties?: api.IDelegatedAccessListResponse): api.DelegatedAccessListResponse;

        /**
         * Encodes the specified DelegatedAccessListResponse message. Does not implicitly {@link api.DelegatedAccessListResponse.verify|verify} messages.
         * @param message DelegatedAccessListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IDelegatedAccessListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DelegatedAccessListResponse message, length delimited. Does not implicitly {@link api.DelegatedAccessListResponse.verify|verify} messages.
         * @param message DelegatedAccessListResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IDelegatedAccessListResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DelegatedAccessListResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DelegatedAccessListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.DelegatedAccessListResponse;

        /**
         * Decodes a DelegatedAccessListResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DelegatedAccessListResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.DelegatedAccessListResponse;

        /**
         * Verifies a DelegatedAccessListResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DelegatedAccessListResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DelegatedAccessListResponse
         */
        public static fromObject(object: { [k: string]: any }): api.DelegatedAccessListResponse;

        /**
         * Creates a plain object from a DelegatedAccessListResponse message. Also converts values to other types if specified.
         * @param message DelegatedAccessListResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.DelegatedAccessListResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DelegatedAccessListResponse to JSON.
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
        status?: (api.RegisterTokenStatus|null);
    }

    /** Represents a RegisterEmailValidationToken. */
    class RegisterEmailValidationToken implements IRegisterEmailValidationToken {

        /**
         * Constructs a new RegisterEmailValidationToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRegisterEmailValidationToken);

        /** RegisterEmailValidationToken token. */
        public token: Uint8Array;

        /** RegisterEmailValidationToken email. */
        public email: string;

        /** RegisterEmailValidationToken created. */
        public created: (number|Long);

        /** RegisterEmailValidationToken status. */
        public status: api.RegisterTokenStatus;

        /**
         * Creates a new RegisterEmailValidationToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterEmailValidationToken instance
         */
        public static create(properties?: api.IRegisterEmailValidationToken): api.RegisterEmailValidationToken;

        /**
         * Encodes the specified RegisterEmailValidationToken message. Does not implicitly {@link api.RegisterEmailValidationToken.verify|verify} messages.
         * @param message RegisterEmailValidationToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRegisterEmailValidationToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterEmailValidationToken message, length delimited. Does not implicitly {@link api.RegisterEmailValidationToken.verify|verify} messages.
         * @param message RegisterEmailValidationToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRegisterEmailValidationToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterEmailValidationToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterEmailValidationToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.RegisterEmailValidationToken;

        /**
         * Decodes a RegisterEmailValidationToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterEmailValidationToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.RegisterEmailValidationToken;

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
        public static fromObject(object: { [k: string]: any }): api.RegisterEmailValidationToken;

        /**
         * Creates a plain object from a RegisterEmailValidationToken message. Also converts values to other types if specified.
         * @param message RegisterEmailValidationToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.RegisterEmailValidationToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IRegisterLinkRequest);

        /** RegisterLinkRequest email. */
        public email: string;

        /**
         * Creates a new RegisterLinkRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterLinkRequest instance
         */
        public static create(properties?: api.IRegisterLinkRequest): api.RegisterLinkRequest;

        /**
         * Encodes the specified RegisterLinkRequest message. Does not implicitly {@link api.RegisterLinkRequest.verify|verify} messages.
         * @param message RegisterLinkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRegisterLinkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterLinkRequest message, length delimited. Does not implicitly {@link api.RegisterLinkRequest.verify|verify} messages.
         * @param message RegisterLinkRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRegisterLinkRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterLinkRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterLinkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.RegisterLinkRequest;

        /**
         * Decodes a RegisterLinkRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterLinkRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.RegisterLinkRequest;

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
        public static fromObject(object: { [k: string]: any }): api.RegisterLinkRequest;

        /**
         * Creates a plain object from a RegisterLinkRequest message. Also converts values to other types if specified.
         * @param message RegisterLinkRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.RegisterLinkRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterLinkRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LinksGetResponse. */
    interface ILinksGetResponse {

        /** LinksGetResponse links */
        links?: (api.IRegisterEmailValidationToken[]|null);
    }

    /** Represents a LinksGetResponse. */
    class LinksGetResponse implements ILinksGetResponse {

        /**
         * Constructs a new LinksGetResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ILinksGetResponse);

        /** LinksGetResponse links. */
        public links: api.IRegisterEmailValidationToken[];

        /**
         * Creates a new LinksGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LinksGetResponse instance
         */
        public static create(properties?: api.ILinksGetResponse): api.LinksGetResponse;

        /**
         * Encodes the specified LinksGetResponse message. Does not implicitly {@link api.LinksGetResponse.verify|verify} messages.
         * @param message LinksGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ILinksGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LinksGetResponse message, length delimited. Does not implicitly {@link api.LinksGetResponse.verify|verify} messages.
         * @param message LinksGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ILinksGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LinksGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LinksGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.LinksGetResponse;

        /**
         * Decodes a LinksGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LinksGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.LinksGetResponse;

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
        public static fromObject(object: { [k: string]: any }): api.LinksGetResponse;

        /**
         * Creates a plain object from a LinksGetResponse message. Also converts values to other types if specified.
         * @param message LinksGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LinksGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.ILinkTokenGetResponse);

        /** LinkTokenGetResponse email. */
        public email: string;

        /**
         * Creates a new LinkTokenGetResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LinkTokenGetResponse instance
         */
        public static create(properties?: api.ILinkTokenGetResponse): api.LinkTokenGetResponse;

        /**
         * Encodes the specified LinkTokenGetResponse message. Does not implicitly {@link api.LinkTokenGetResponse.verify|verify} messages.
         * @param message LinkTokenGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ILinkTokenGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LinkTokenGetResponse message, length delimited. Does not implicitly {@link api.LinkTokenGetResponse.verify|verify} messages.
         * @param message LinkTokenGetResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ILinkTokenGetResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LinkTokenGetResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LinkTokenGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.LinkTokenGetResponse;

        /**
         * Decodes a LinkTokenGetResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LinkTokenGetResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.LinkTokenGetResponse;

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
        public static fromObject(object: { [k: string]: any }): api.LinkTokenGetResponse;

        /**
         * Creates a plain object from a LinkTokenGetResponse message. Also converts values to other types if specified.
         * @param message LinkTokenGetResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.LinkTokenGetResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        identity?: (api.IIdentityFields|null);

        /** RegisterPostLinkTokenRequest encryption */
        encryption?: (api.IIdentityEncryptedKeySet|null);
    }

    /** Represents a RegisterPostLinkTokenRequest. */
    class RegisterPostLinkTokenRequest implements IRegisterPostLinkTokenRequest {

        /**
         * Constructs a new RegisterPostLinkTokenRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IRegisterPostLinkTokenRequest);

        /** RegisterPostLinkTokenRequest token. */
        public token: string;

        /** RegisterPostLinkTokenRequest identity. */
        public identity?: (api.IIdentityFields|null);

        /** RegisterPostLinkTokenRequest encryption. */
        public encryption?: (api.IIdentityEncryptedKeySet|null);

        /**
         * Creates a new RegisterPostLinkTokenRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RegisterPostLinkTokenRequest instance
         */
        public static create(properties?: api.IRegisterPostLinkTokenRequest): api.RegisterPostLinkTokenRequest;

        /**
         * Encodes the specified RegisterPostLinkTokenRequest message. Does not implicitly {@link api.RegisterPostLinkTokenRequest.verify|verify} messages.
         * @param message RegisterPostLinkTokenRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IRegisterPostLinkTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RegisterPostLinkTokenRequest message, length delimited. Does not implicitly {@link api.RegisterPostLinkTokenRequest.verify|verify} messages.
         * @param message RegisterPostLinkTokenRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IRegisterPostLinkTokenRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RegisterPostLinkTokenRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RegisterPostLinkTokenRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.RegisterPostLinkTokenRequest;

        /**
         * Decodes a RegisterPostLinkTokenRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RegisterPostLinkTokenRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.RegisterPostLinkTokenRequest;

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
        public static fromObject(object: { [k: string]: any }): api.RegisterPostLinkTokenRequest;

        /**
         * Creates a plain object from a RegisterPostLinkTokenRequest message. Also converts values to other types if specified.
         * @param message RegisterPostLinkTokenRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.RegisterPostLinkTokenRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RegisterPostLinkTokenRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ProtoError. */
    interface IProtoError {

        /** ProtoError code */
        code?: (number|null);

        /** ProtoError kind */
        kind?: (api.PepsErrorKind|null);

        /** ProtoError payload */
        payload?: (google.protobuf.IAny|null);
    }

    /** Represents a ProtoError. */
    class ProtoError implements IProtoError {

        /**
         * Constructs a new ProtoError.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IProtoError);

        /** ProtoError code. */
        public code: number;

        /** ProtoError kind. */
        public kind: api.PepsErrorKind;

        /** ProtoError payload. */
        public payload?: (google.protobuf.IAny|null);

        /**
         * Creates a new ProtoError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProtoError instance
         */
        public static create(properties?: api.IProtoError): api.ProtoError;

        /**
         * Encodes the specified ProtoError message. Does not implicitly {@link api.ProtoError.verify|verify} messages.
         * @param message ProtoError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IProtoError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ProtoError message, length delimited. Does not implicitly {@link api.ProtoError.verify|verify} messages.
         * @param message ProtoError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IProtoError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProtoError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ProtoError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.ProtoError;

        /**
         * Decodes a ProtoError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ProtoError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.ProtoError;

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
        public static fromObject(object: { [k: string]: any }): api.ProtoError;

        /**
         * Creates a plain object from a ProtoError message. Also converts values to other types if specified.
         * @param message ProtoError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.ProtoError, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        IdentitiesNotFound = 18,
        IdentitySharingKindMismatch = 19,
        ResourceNotFound = 24,
        RegisterInvalidEmail = 25,
        RegisterTokenNotFound = 26,
        ChannelNotFound = 27,
        DelegatedAccessNotFound = 28,
        InvalidToken = 29,
        ApplicationConfigNotFound = 33,
        ApplicationConfigInvalid = 34,
        NamedResourceNotFound = 35,
        ApplicationInvalidToken = 36,
        TenantCustomerNotFound = 37,
        TenantPackNotFound = 38,
        TenantQuotasReached = 39
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
        constructor(properties?: api.IPayloadServerInternalError);

        /** PayloadServerInternalError reason. */
        public reason: string;

        /**
         * Creates a new PayloadServerInternalError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadServerInternalError instance
         */
        public static create(properties?: api.IPayloadServerInternalError): api.PayloadServerInternalError;

        /**
         * Encodes the specified PayloadServerInternalError message. Does not implicitly {@link api.PayloadServerInternalError.verify|verify} messages.
         * @param message PayloadServerInternalError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadServerInternalError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadServerInternalError message, length delimited. Does not implicitly {@link api.PayloadServerInternalError.verify|verify} messages.
         * @param message PayloadServerInternalError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadServerInternalError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadServerInternalError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadServerInternalError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadServerInternalError;

        /**
         * Decodes a PayloadServerInternalError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadServerInternalError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadServerInternalError;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadServerInternalError;

        /**
         * Creates a plain object from a PayloadServerInternalError message. Also converts values to other types if specified.
         * @param message PayloadServerInternalError
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadServerInternalError, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadRequestBadUriParams);

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
        public static create(properties?: api.IPayloadRequestBadUriParams): api.PayloadRequestBadUriParams;

        /**
         * Encodes the specified PayloadRequestBadUriParams message. Does not implicitly {@link api.PayloadRequestBadUriParams.verify|verify} messages.
         * @param message PayloadRequestBadUriParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadRequestBadUriParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestBadUriParams message, length delimited. Does not implicitly {@link api.PayloadRequestBadUriParams.verify|verify} messages.
         * @param message PayloadRequestBadUriParams message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadRequestBadUriParams, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestBadUriParams message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestBadUriParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadRequestBadUriParams;

        /**
         * Decodes a PayloadRequestBadUriParams message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestBadUriParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadRequestBadUriParams;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadRequestBadUriParams;

        /**
         * Creates a plain object from a PayloadRequestBadUriParams message. Also converts values to other types if specified.
         * @param message PayloadRequestBadUriParams
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadRequestBadUriParams, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadRequestMissingHeader);

        /** PayloadRequestMissingHeader name. */
        public name: string;

        /**
         * Creates a new PayloadRequestMissingHeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestMissingHeader instance
         */
        public static create(properties?: api.IPayloadRequestMissingHeader): api.PayloadRequestMissingHeader;

        /**
         * Encodes the specified PayloadRequestMissingHeader message. Does not implicitly {@link api.PayloadRequestMissingHeader.verify|verify} messages.
         * @param message PayloadRequestMissingHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadRequestMissingHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestMissingHeader message, length delimited. Does not implicitly {@link api.PayloadRequestMissingHeader.verify|verify} messages.
         * @param message PayloadRequestMissingHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadRequestMissingHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestMissingHeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestMissingHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadRequestMissingHeader;

        /**
         * Decodes a PayloadRequestMissingHeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestMissingHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadRequestMissingHeader;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadRequestMissingHeader;

        /**
         * Creates a plain object from a PayloadRequestMissingHeader message. Also converts values to other types if specified.
         * @param message PayloadRequestMissingHeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadRequestMissingHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadRequestDecodeHeader);

        /** PayloadRequestDecodeHeader name. */
        public name: string;

        /** PayloadRequestDecodeHeader value. */
        public value: string;

        /**
         * Creates a new PayloadRequestDecodeHeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestDecodeHeader instance
         */
        public static create(properties?: api.IPayloadRequestDecodeHeader): api.PayloadRequestDecodeHeader;

        /**
         * Encodes the specified PayloadRequestDecodeHeader message. Does not implicitly {@link api.PayloadRequestDecodeHeader.verify|verify} messages.
         * @param message PayloadRequestDecodeHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadRequestDecodeHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestDecodeHeader message, length delimited. Does not implicitly {@link api.PayloadRequestDecodeHeader.verify|verify} messages.
         * @param message PayloadRequestDecodeHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadRequestDecodeHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestDecodeHeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestDecodeHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadRequestDecodeHeader;

        /**
         * Decodes a PayloadRequestDecodeHeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestDecodeHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadRequestDecodeHeader;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadRequestDecodeHeader;

        /**
         * Creates a plain object from a PayloadRequestDecodeHeader message. Also converts values to other types if specified.
         * @param message PayloadRequestDecodeHeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadRequestDecodeHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadRequestBadRequest);

        /** PayloadRequestBadRequest hint. */
        public hint: string;

        /**
         * Creates a new PayloadRequestBadRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRequestBadRequest instance
         */
        public static create(properties?: api.IPayloadRequestBadRequest): api.PayloadRequestBadRequest;

        /**
         * Encodes the specified PayloadRequestBadRequest message. Does not implicitly {@link api.PayloadRequestBadRequest.verify|verify} messages.
         * @param message PayloadRequestBadRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadRequestBadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRequestBadRequest message, length delimited. Does not implicitly {@link api.PayloadRequestBadRequest.verify|verify} messages.
         * @param message PayloadRequestBadRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadRequestBadRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRequestBadRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRequestBadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadRequestBadRequest;

        /**
         * Decodes a PayloadRequestBadRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRequestBadRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadRequestBadRequest;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadRequestBadRequest;

        /**
         * Creates a plain object from a PayloadRequestBadRequest message. Also converts values to other types if specified.
         * @param message PayloadRequestBadRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadRequestBadRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadIdentityCannotAssumeOwnership);

        /** PayloadIdentityCannotAssumeOwnership owner. */
        public owner: string;

        /**
         * Creates a new PayloadIdentityCannotAssumeOwnership instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityCannotAssumeOwnership instance
         */
        public static create(properties?: api.IPayloadIdentityCannotAssumeOwnership): api.PayloadIdentityCannotAssumeOwnership;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeOwnership message. Does not implicitly {@link api.PayloadIdentityCannotAssumeOwnership.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeOwnership message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityCannotAssumeOwnership, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeOwnership message, length delimited. Does not implicitly {@link api.PayloadIdentityCannotAssumeOwnership.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeOwnership message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityCannotAssumeOwnership, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityCannotAssumeOwnership message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityCannotAssumeOwnership
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityCannotAssumeOwnership;

        /**
         * Decodes a PayloadIdentityCannotAssumeOwnership message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityCannotAssumeOwnership
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityCannotAssumeOwnership;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityCannotAssumeOwnership;

        /**
         * Creates a plain object from a PayloadIdentityCannotAssumeOwnership message. Also converts values to other types if specified.
         * @param message PayloadIdentityCannotAssumeOwnership
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityCannotAssumeOwnership, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityCannotAssumeOwnership to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityCannotAssumeAccess. */
    interface IPayloadIdentityCannotAssumeAccess {

        /** PayloadIdentityCannotAssumeAccess kind */
        kind?: (api.IdentityAccessKeyKind|null);
    }

    /** Represents a PayloadIdentityCannotAssumeAccess. */
    class PayloadIdentityCannotAssumeAccess implements IPayloadIdentityCannotAssumeAccess {

        /**
         * Constructs a new PayloadIdentityCannotAssumeAccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadIdentityCannotAssumeAccess);

        /** PayloadIdentityCannotAssumeAccess kind. */
        public kind: api.IdentityAccessKeyKind;

        /**
         * Creates a new PayloadIdentityCannotAssumeAccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityCannotAssumeAccess instance
         */
        public static create(properties?: api.IPayloadIdentityCannotAssumeAccess): api.PayloadIdentityCannotAssumeAccess;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeAccess message. Does not implicitly {@link api.PayloadIdentityCannotAssumeAccess.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeAccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityCannotAssumeAccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityCannotAssumeAccess message, length delimited. Does not implicitly {@link api.PayloadIdentityCannotAssumeAccess.verify|verify} messages.
         * @param message PayloadIdentityCannotAssumeAccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityCannotAssumeAccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityCannotAssumeAccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityCannotAssumeAccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityCannotAssumeAccess;

        /**
         * Decodes a PayloadIdentityCannotAssumeAccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityCannotAssumeAccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityCannotAssumeAccess;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityCannotAssumeAccess;

        /**
         * Creates a plain object from a PayloadIdentityCannotAssumeAccess message. Also converts values to other types if specified.
         * @param message PayloadIdentityCannotAssumeAccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityCannotAssumeAccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityCannotAssumeAccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentitySignatureMismatch. */
    interface IPayloadIdentitySignatureMismatch {

        /** PayloadIdentitySignatureMismatch key */
        key?: (api.IIdentityKeyID|null);
    }

    /** Represents a PayloadIdentitySignatureMismatch. */
    class PayloadIdentitySignatureMismatch implements IPayloadIdentitySignatureMismatch {

        /**
         * Constructs a new PayloadIdentitySignatureMismatch.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadIdentitySignatureMismatch);

        /** PayloadIdentitySignatureMismatch key. */
        public key?: (api.IIdentityKeyID|null);

        /**
         * Creates a new PayloadIdentitySignatureMismatch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentitySignatureMismatch instance
         */
        public static create(properties?: api.IPayloadIdentitySignatureMismatch): api.PayloadIdentitySignatureMismatch;

        /**
         * Encodes the specified PayloadIdentitySignatureMismatch message. Does not implicitly {@link api.PayloadIdentitySignatureMismatch.verify|verify} messages.
         * @param message PayloadIdentitySignatureMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentitySignatureMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentitySignatureMismatch message, length delimited. Does not implicitly {@link api.PayloadIdentitySignatureMismatch.verify|verify} messages.
         * @param message PayloadIdentitySignatureMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentitySignatureMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentitySignatureMismatch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentitySignatureMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentitySignatureMismatch;

        /**
         * Decodes a PayloadIdentitySignatureMismatch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentitySignatureMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentitySignatureMismatch;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentitySignatureMismatch;

        /**
         * Creates a plain object from a PayloadIdentitySignatureMismatch message. Also converts values to other types if specified.
         * @param message PayloadIdentitySignatureMismatch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentitySignatureMismatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadIdentityInvalidLogin);

        /** PayloadIdentityInvalidLogin login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityInvalidLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityInvalidLogin instance
         */
        public static create(properties?: api.IPayloadIdentityInvalidLogin): api.PayloadIdentityInvalidLogin;

        /**
         * Encodes the specified PayloadIdentityInvalidLogin message. Does not implicitly {@link api.PayloadIdentityInvalidLogin.verify|verify} messages.
         * @param message PayloadIdentityInvalidLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityInvalidLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityInvalidLogin message, length delimited. Does not implicitly {@link api.PayloadIdentityInvalidLogin.verify|verify} messages.
         * @param message PayloadIdentityInvalidLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityInvalidLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityInvalidLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityInvalidLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityInvalidLogin;

        /**
         * Decodes a PayloadIdentityInvalidLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityInvalidLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityInvalidLogin;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityInvalidLogin;

        /**
         * Creates a plain object from a PayloadIdentityInvalidLogin message. Also converts values to other types if specified.
         * @param message PayloadIdentityInvalidLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityInvalidLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadIdentityAlreadyExists);

        /** PayloadIdentityAlreadyExists login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityAlreadyExists instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityAlreadyExists instance
         */
        public static create(properties?: api.IPayloadIdentityAlreadyExists): api.PayloadIdentityAlreadyExists;

        /**
         * Encodes the specified PayloadIdentityAlreadyExists message. Does not implicitly {@link api.PayloadIdentityAlreadyExists.verify|verify} messages.
         * @param message PayloadIdentityAlreadyExists message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityAlreadyExists, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityAlreadyExists message, length delimited. Does not implicitly {@link api.PayloadIdentityAlreadyExists.verify|verify} messages.
         * @param message PayloadIdentityAlreadyExists message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityAlreadyExists, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityAlreadyExists message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityAlreadyExists
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityAlreadyExists;

        /**
         * Decodes a PayloadIdentityAlreadyExists message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityAlreadyExists
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityAlreadyExists;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityAlreadyExists;

        /**
         * Creates a plain object from a PayloadIdentityAlreadyExists message. Also converts values to other types if specified.
         * @param message PayloadIdentityAlreadyExists
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityAlreadyExists, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadIdentityNotFound);

        /** PayloadIdentityNotFound login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityNotFound instance
         */
        public static create(properties?: api.IPayloadIdentityNotFound): api.PayloadIdentityNotFound;

        /**
         * Encodes the specified PayloadIdentityNotFound message. Does not implicitly {@link api.PayloadIdentityNotFound.verify|verify} messages.
         * @param message PayloadIdentityNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityNotFound message, length delimited. Does not implicitly {@link api.PayloadIdentityNotFound.verify|verify} messages.
         * @param message PayloadIdentityNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityNotFound;

        /**
         * Decodes a PayloadIdentityNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityNotFound;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityNotFound;

        /**
         * Creates a plain object from a PayloadIdentityNotFound message. Also converts values to other types if specified.
         * @param message PayloadIdentityNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentityVersionMismatch. */
    interface IPayloadIdentityVersionMismatch {

        /** PayloadIdentityVersionMismatch key */
        key?: (api.IIdentityKeyID|null);

        /** PayloadIdentityVersionMismatch expected */
        expected?: (number|null);
    }

    /** Represents a PayloadIdentityVersionMismatch. */
    class PayloadIdentityVersionMismatch implements IPayloadIdentityVersionMismatch {

        /**
         * Constructs a new PayloadIdentityVersionMismatch.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadIdentityVersionMismatch);

        /** PayloadIdentityVersionMismatch key. */
        public key?: (api.IIdentityKeyID|null);

        /** PayloadIdentityVersionMismatch expected. */
        public expected: number;

        /**
         * Creates a new PayloadIdentityVersionMismatch instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityVersionMismatch instance
         */
        public static create(properties?: api.IPayloadIdentityVersionMismatch): api.PayloadIdentityVersionMismatch;

        /**
         * Encodes the specified PayloadIdentityVersionMismatch message. Does not implicitly {@link api.PayloadIdentityVersionMismatch.verify|verify} messages.
         * @param message PayloadIdentityVersionMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityVersionMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityVersionMismatch message, length delimited. Does not implicitly {@link api.PayloadIdentityVersionMismatch.verify|verify} messages.
         * @param message PayloadIdentityVersionMismatch message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityVersionMismatch, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityVersionMismatch message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityVersionMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityVersionMismatch;

        /**
         * Decodes a PayloadIdentityVersionMismatch message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityVersionMismatch
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityVersionMismatch;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityVersionMismatch;

        /**
         * Creates a plain object from a PayloadIdentityVersionMismatch message. Also converts values to other types if specified.
         * @param message PayloadIdentityVersionMismatch
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityVersionMismatch, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadIdentityNotAdmin);

        /** PayloadIdentityNotAdmin login. */
        public login: string;

        /**
         * Creates a new PayloadIdentityNotAdmin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentityNotAdmin instance
         */
        public static create(properties?: api.IPayloadIdentityNotAdmin): api.PayloadIdentityNotAdmin;

        /**
         * Encodes the specified PayloadIdentityNotAdmin message. Does not implicitly {@link api.PayloadIdentityNotAdmin.verify|verify} messages.
         * @param message PayloadIdentityNotAdmin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentityNotAdmin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentityNotAdmin message, length delimited. Does not implicitly {@link api.PayloadIdentityNotAdmin.verify|verify} messages.
         * @param message PayloadIdentityNotAdmin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentityNotAdmin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentityNotAdmin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentityNotAdmin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentityNotAdmin;

        /**
         * Decodes a PayloadIdentityNotAdmin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentityNotAdmin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentityNotAdmin;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentityNotAdmin;

        /**
         * Creates a plain object from a PayloadIdentityNotAdmin message. Also converts values to other types if specified.
         * @param message PayloadIdentityNotAdmin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentityNotAdmin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentityNotAdmin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadIdentitiesNotFound. */
    interface IPayloadIdentitiesNotFound {

        /** PayloadIdentitiesNotFound logins */
        logins?: (string[]|null);
    }

    /** Represents a PayloadIdentitiesNotFound. */
    class PayloadIdentitiesNotFound implements IPayloadIdentitiesNotFound {

        /**
         * Constructs a new PayloadIdentitiesNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadIdentitiesNotFound);

        /** PayloadIdentitiesNotFound logins. */
        public logins: string[];

        /**
         * Creates a new PayloadIdentitiesNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadIdentitiesNotFound instance
         */
        public static create(properties?: api.IPayloadIdentitiesNotFound): api.PayloadIdentitiesNotFound;

        /**
         * Encodes the specified PayloadIdentitiesNotFound message. Does not implicitly {@link api.PayloadIdentitiesNotFound.verify|verify} messages.
         * @param message PayloadIdentitiesNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadIdentitiesNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadIdentitiesNotFound message, length delimited. Does not implicitly {@link api.PayloadIdentitiesNotFound.verify|verify} messages.
         * @param message PayloadIdentitiesNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadIdentitiesNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadIdentitiesNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadIdentitiesNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadIdentitiesNotFound;

        /**
         * Decodes a PayloadIdentitiesNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadIdentitiesNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadIdentitiesNotFound;

        /**
         * Verifies a PayloadIdentitiesNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadIdentitiesNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadIdentitiesNotFound
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadIdentitiesNotFound;

        /**
         * Creates a plain object from a PayloadIdentitiesNotFound message. Also converts values to other types if specified.
         * @param message PayloadIdentitiesNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadIdentitiesNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadIdentitiesNotFound to JSON.
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
        constructor(properties?: api.IPayloadResourceNotFound);

        /** PayloadResourceNotFound id. */
        public id: (number|Long);

        /**
         * Creates a new PayloadResourceNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadResourceNotFound instance
         */
        public static create(properties?: api.IPayloadResourceNotFound): api.PayloadResourceNotFound;

        /**
         * Encodes the specified PayloadResourceNotFound message. Does not implicitly {@link api.PayloadResourceNotFound.verify|verify} messages.
         * @param message PayloadResourceNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadResourceNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadResourceNotFound message, length delimited. Does not implicitly {@link api.PayloadResourceNotFound.verify|verify} messages.
         * @param message PayloadResourceNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadResourceNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadResourceNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadResourceNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadResourceNotFound;

        /**
         * Decodes a PayloadResourceNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadResourceNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadResourceNotFound;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadResourceNotFound;

        /**
         * Creates a plain object from a PayloadResourceNotFound message. Also converts values to other types if specified.
         * @param message PayloadResourceNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadResourceNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadRegisterInvalidEmail);

        /** PayloadRegisterInvalidEmail email. */
        public email: string;

        /**
         * Creates a new PayloadRegisterInvalidEmail instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRegisterInvalidEmail instance
         */
        public static create(properties?: api.IPayloadRegisterInvalidEmail): api.PayloadRegisterInvalidEmail;

        /**
         * Encodes the specified PayloadRegisterInvalidEmail message. Does not implicitly {@link api.PayloadRegisterInvalidEmail.verify|verify} messages.
         * @param message PayloadRegisterInvalidEmail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadRegisterInvalidEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRegisterInvalidEmail message, length delimited. Does not implicitly {@link api.PayloadRegisterInvalidEmail.verify|verify} messages.
         * @param message PayloadRegisterInvalidEmail message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadRegisterInvalidEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRegisterInvalidEmail message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRegisterInvalidEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadRegisterInvalidEmail;

        /**
         * Decodes a PayloadRegisterInvalidEmail message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRegisterInvalidEmail
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadRegisterInvalidEmail;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadRegisterInvalidEmail;

        /**
         * Creates a plain object from a PayloadRegisterInvalidEmail message. Also converts values to other types if specified.
         * @param message PayloadRegisterInvalidEmail
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadRegisterInvalidEmail, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadRegisterTokenNotFound);

        /** PayloadRegisterTokenNotFound token. */
        public token: Uint8Array;

        /**
         * Creates a new PayloadRegisterTokenNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadRegisterTokenNotFound instance
         */
        public static create(properties?: api.IPayloadRegisterTokenNotFound): api.PayloadRegisterTokenNotFound;

        /**
         * Encodes the specified PayloadRegisterTokenNotFound message. Does not implicitly {@link api.PayloadRegisterTokenNotFound.verify|verify} messages.
         * @param message PayloadRegisterTokenNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadRegisterTokenNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadRegisterTokenNotFound message, length delimited. Does not implicitly {@link api.PayloadRegisterTokenNotFound.verify|verify} messages.
         * @param message PayloadRegisterTokenNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadRegisterTokenNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadRegisterTokenNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadRegisterTokenNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadRegisterTokenNotFound;

        /**
         * Decodes a PayloadRegisterTokenNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadRegisterTokenNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadRegisterTokenNotFound;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadRegisterTokenNotFound;

        /**
         * Creates a plain object from a PayloadRegisterTokenNotFound message. Also converts values to other types if specified.
         * @param message PayloadRegisterTokenNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadRegisterTokenNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadChannelNotFound);

        /** PayloadChannelNotFound id. */
        public id: (number|Long);

        /**
         * Creates a new PayloadChannelNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadChannelNotFound instance
         */
        public static create(properties?: api.IPayloadChannelNotFound): api.PayloadChannelNotFound;

        /**
         * Encodes the specified PayloadChannelNotFound message. Does not implicitly {@link api.PayloadChannelNotFound.verify|verify} messages.
         * @param message PayloadChannelNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadChannelNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadChannelNotFound message, length delimited. Does not implicitly {@link api.PayloadChannelNotFound.verify|verify} messages.
         * @param message PayloadChannelNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadChannelNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadChannelNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadChannelNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadChannelNotFound;

        /**
         * Decodes a PayloadChannelNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadChannelNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadChannelNotFound;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadChannelNotFound;

        /**
         * Creates a plain object from a PayloadChannelNotFound message. Also converts values to other types if specified.
         * @param message PayloadChannelNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadChannelNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

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
        constructor(properties?: api.IPayloadDelegatedAccessNotFound);

        /** PayloadDelegatedAccessNotFound id. */
        public id: (number|Long);

        /**
         * Creates a new PayloadDelegatedAccessNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadDelegatedAccessNotFound instance
         */
        public static create(properties?: api.IPayloadDelegatedAccessNotFound): api.PayloadDelegatedAccessNotFound;

        /**
         * Encodes the specified PayloadDelegatedAccessNotFound message. Does not implicitly {@link api.PayloadDelegatedAccessNotFound.verify|verify} messages.
         * @param message PayloadDelegatedAccessNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadDelegatedAccessNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadDelegatedAccessNotFound message, length delimited. Does not implicitly {@link api.PayloadDelegatedAccessNotFound.verify|verify} messages.
         * @param message PayloadDelegatedAccessNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadDelegatedAccessNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadDelegatedAccessNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadDelegatedAccessNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadDelegatedAccessNotFound;

        /**
         * Decodes a PayloadDelegatedAccessNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadDelegatedAccessNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadDelegatedAccessNotFound;

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
        public static fromObject(object: { [k: string]: any }): api.PayloadDelegatedAccessNotFound;

        /**
         * Creates a plain object from a PayloadDelegatedAccessNotFound message. Also converts values to other types if specified.
         * @param message PayloadDelegatedAccessNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadDelegatedAccessNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadDelegatedAccessNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadInvalidToken. */
    interface IPayloadInvalidToken {

        /** PayloadInvalidToken token */
        token?: (Uint8Array|null);
    }

    /** Represents a PayloadInvalidToken. */
    class PayloadInvalidToken implements IPayloadInvalidToken {

        /**
         * Constructs a new PayloadInvalidToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadInvalidToken);

        /** PayloadInvalidToken token. */
        public token: Uint8Array;

        /**
         * Creates a new PayloadInvalidToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadInvalidToken instance
         */
        public static create(properties?: api.IPayloadInvalidToken): api.PayloadInvalidToken;

        /**
         * Encodes the specified PayloadInvalidToken message. Does not implicitly {@link api.PayloadInvalidToken.verify|verify} messages.
         * @param message PayloadInvalidToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadInvalidToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadInvalidToken message, length delimited. Does not implicitly {@link api.PayloadInvalidToken.verify|verify} messages.
         * @param message PayloadInvalidToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadInvalidToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadInvalidToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadInvalidToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadInvalidToken;

        /**
         * Decodes a PayloadInvalidToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadInvalidToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadInvalidToken;

        /**
         * Verifies a PayloadInvalidToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadInvalidToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadInvalidToken
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadInvalidToken;

        /**
         * Creates a plain object from a PayloadInvalidToken message. Also converts values to other types if specified.
         * @param message PayloadInvalidToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadInvalidToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadInvalidToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadNamedResourceNotFound. */
    interface IPayloadNamedResourceNotFound {

        /** PayloadNamedResourceNotFound login */
        login?: (string|null);

        /** PayloadNamedResourceNotFound name */
        name?: (string|null);
    }

    /** Represents a PayloadNamedResourceNotFound. */
    class PayloadNamedResourceNotFound implements IPayloadNamedResourceNotFound {

        /**
         * Constructs a new PayloadNamedResourceNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadNamedResourceNotFound);

        /** PayloadNamedResourceNotFound login. */
        public login: string;

        /** PayloadNamedResourceNotFound name. */
        public name: string;

        /**
         * Creates a new PayloadNamedResourceNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadNamedResourceNotFound instance
         */
        public static create(properties?: api.IPayloadNamedResourceNotFound): api.PayloadNamedResourceNotFound;

        /**
         * Encodes the specified PayloadNamedResourceNotFound message. Does not implicitly {@link api.PayloadNamedResourceNotFound.verify|verify} messages.
         * @param message PayloadNamedResourceNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadNamedResourceNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadNamedResourceNotFound message, length delimited. Does not implicitly {@link api.PayloadNamedResourceNotFound.verify|verify} messages.
         * @param message PayloadNamedResourceNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadNamedResourceNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadNamedResourceNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadNamedResourceNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadNamedResourceNotFound;

        /**
         * Decodes a PayloadNamedResourceNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadNamedResourceNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadNamedResourceNotFound;

        /**
         * Verifies a PayloadNamedResourceNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadNamedResourceNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadNamedResourceNotFound
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadNamedResourceNotFound;

        /**
         * Creates a plain object from a PayloadNamedResourceNotFound message. Also converts values to other types if specified.
         * @param message PayloadNamedResourceNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadNamedResourceNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadNamedResourceNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadApplicationConfigInvalid. */
    interface IPayloadApplicationConfigInvalid {

        /** PayloadApplicationConfigInvalid hint */
        hint?: (string|null);
    }

    /** Represents a PayloadApplicationConfigInvalid. */
    class PayloadApplicationConfigInvalid implements IPayloadApplicationConfigInvalid {

        /**
         * Constructs a new PayloadApplicationConfigInvalid.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadApplicationConfigInvalid);

        /** PayloadApplicationConfigInvalid hint. */
        public hint: string;

        /**
         * Creates a new PayloadApplicationConfigInvalid instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadApplicationConfigInvalid instance
         */
        public static create(properties?: api.IPayloadApplicationConfigInvalid): api.PayloadApplicationConfigInvalid;

        /**
         * Encodes the specified PayloadApplicationConfigInvalid message. Does not implicitly {@link api.PayloadApplicationConfigInvalid.verify|verify} messages.
         * @param message PayloadApplicationConfigInvalid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadApplicationConfigInvalid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadApplicationConfigInvalid message, length delimited. Does not implicitly {@link api.PayloadApplicationConfigInvalid.verify|verify} messages.
         * @param message PayloadApplicationConfigInvalid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadApplicationConfigInvalid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadApplicationConfigInvalid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadApplicationConfigInvalid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadApplicationConfigInvalid;

        /**
         * Decodes a PayloadApplicationConfigInvalid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadApplicationConfigInvalid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadApplicationConfigInvalid;

        /**
         * Verifies a PayloadApplicationConfigInvalid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadApplicationConfigInvalid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadApplicationConfigInvalid
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadApplicationConfigInvalid;

        /**
         * Creates a plain object from a PayloadApplicationConfigInvalid message. Also converts values to other types if specified.
         * @param message PayloadApplicationConfigInvalid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadApplicationConfigInvalid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadApplicationConfigInvalid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadApplicationConfigNotFound. */
    interface IPayloadApplicationConfigNotFound {

        /** PayloadApplicationConfigNotFound login */
        login?: (string|null);

        /** PayloadApplicationConfigNotFound version */
        version?: (string|null);
    }

    /** Represents a PayloadApplicationConfigNotFound. */
    class PayloadApplicationConfigNotFound implements IPayloadApplicationConfigNotFound {

        /**
         * Constructs a new PayloadApplicationConfigNotFound.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadApplicationConfigNotFound);

        /** PayloadApplicationConfigNotFound login. */
        public login: string;

        /** PayloadApplicationConfigNotFound version. */
        public version: string;

        /**
         * Creates a new PayloadApplicationConfigNotFound instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadApplicationConfigNotFound instance
         */
        public static create(properties?: api.IPayloadApplicationConfigNotFound): api.PayloadApplicationConfigNotFound;

        /**
         * Encodes the specified PayloadApplicationConfigNotFound message. Does not implicitly {@link api.PayloadApplicationConfigNotFound.verify|verify} messages.
         * @param message PayloadApplicationConfigNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadApplicationConfigNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadApplicationConfigNotFound message, length delimited. Does not implicitly {@link api.PayloadApplicationConfigNotFound.verify|verify} messages.
         * @param message PayloadApplicationConfigNotFound message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadApplicationConfigNotFound, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadApplicationConfigNotFound message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadApplicationConfigNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadApplicationConfigNotFound;

        /**
         * Decodes a PayloadApplicationConfigNotFound message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadApplicationConfigNotFound
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadApplicationConfigNotFound;

        /**
         * Verifies a PayloadApplicationConfigNotFound message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadApplicationConfigNotFound message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadApplicationConfigNotFound
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadApplicationConfigNotFound;

        /**
         * Creates a plain object from a PayloadApplicationConfigNotFound message. Also converts values to other types if specified.
         * @param message PayloadApplicationConfigNotFound
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadApplicationConfigNotFound, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadApplicationConfigNotFound to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadApplicationInvalidToken. */
    interface IPayloadApplicationInvalidToken {

        /** PayloadApplicationInvalidToken token */
        token?: (string|null);

        /** PayloadApplicationInvalidToken hint */
        hint?: (string|null);
    }

    /** Represents a PayloadApplicationInvalidToken. */
    class PayloadApplicationInvalidToken implements IPayloadApplicationInvalidToken {

        /**
         * Constructs a new PayloadApplicationInvalidToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadApplicationInvalidToken);

        /** PayloadApplicationInvalidToken token. */
        public token: string;

        /** PayloadApplicationInvalidToken hint. */
        public hint: string;

        /**
         * Creates a new PayloadApplicationInvalidToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadApplicationInvalidToken instance
         */
        public static create(properties?: api.IPayloadApplicationInvalidToken): api.PayloadApplicationInvalidToken;

        /**
         * Encodes the specified PayloadApplicationInvalidToken message. Does not implicitly {@link api.PayloadApplicationInvalidToken.verify|verify} messages.
         * @param message PayloadApplicationInvalidToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadApplicationInvalidToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadApplicationInvalidToken message, length delimited. Does not implicitly {@link api.PayloadApplicationInvalidToken.verify|verify} messages.
         * @param message PayloadApplicationInvalidToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadApplicationInvalidToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadApplicationInvalidToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadApplicationInvalidToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadApplicationInvalidToken;

        /**
         * Decodes a PayloadApplicationInvalidToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadApplicationInvalidToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadApplicationInvalidToken;

        /**
         * Verifies a PayloadApplicationInvalidToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadApplicationInvalidToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadApplicationInvalidToken
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadApplicationInvalidToken;

        /**
         * Creates a plain object from a PayloadApplicationInvalidToken message. Also converts values to other types if specified.
         * @param message PayloadApplicationInvalidToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadApplicationInvalidToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadApplicationInvalidToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayloadTenantQuotasReached. */
    interface IPayloadTenantQuotasReached {

        /** PayloadTenantQuotasReached nbApps */
        nbApps?: (number|null);

        /** PayloadTenantQuotasReached maxApps */
        maxApps?: (number|null);
    }

    /** Represents a PayloadTenantQuotasReached. */
    class PayloadTenantQuotasReached implements IPayloadTenantQuotasReached {

        /**
         * Constructs a new PayloadTenantQuotasReached.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.IPayloadTenantQuotasReached);

        /** PayloadTenantQuotasReached nbApps. */
        public nbApps: number;

        /** PayloadTenantQuotasReached maxApps. */
        public maxApps: number;

        /**
         * Creates a new PayloadTenantQuotasReached instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayloadTenantQuotasReached instance
         */
        public static create(properties?: api.IPayloadTenantQuotasReached): api.PayloadTenantQuotasReached;

        /**
         * Encodes the specified PayloadTenantQuotasReached message. Does not implicitly {@link api.PayloadTenantQuotasReached.verify|verify} messages.
         * @param message PayloadTenantQuotasReached message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.IPayloadTenantQuotasReached, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayloadTenantQuotasReached message, length delimited. Does not implicitly {@link api.PayloadTenantQuotasReached.verify|verify} messages.
         * @param message PayloadTenantQuotasReached message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.IPayloadTenantQuotasReached, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayloadTenantQuotasReached message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayloadTenantQuotasReached
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.PayloadTenantQuotasReached;

        /**
         * Decodes a PayloadTenantQuotasReached message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayloadTenantQuotasReached
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.PayloadTenantQuotasReached;

        /**
         * Verifies a PayloadTenantQuotasReached message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayloadTenantQuotasReached message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayloadTenantQuotasReached
         */
        public static fromObject(object: { [k: string]: any }): api.PayloadTenantQuotasReached;

        /**
         * Creates a plain object from a PayloadTenantQuotasReached message. Also converts values to other types if specified.
         * @param message PayloadTenantQuotasReached
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.PayloadTenantQuotasReached, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayloadTenantQuotasReached to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents a LivenessService */
    class LivenessService extends $protobuf.rpc.Service {

        /**
         * Constructs a new LivenessService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new LivenessService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): LivenessService;

        /**
         * Calls Ping.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public ping(request: google.protobuf.IEmpty, callback: api.LivenessService.PingCallback): void;

        /**
         * Calls Ping.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public ping(request: google.protobuf.IEmpty): Promise<google.protobuf.Empty>;
    }

    namespace LivenessService {

        /**
         * Callback as used by {@link api.LivenessService#ping}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type PingCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;
    }

    /** Represents a RegisterService */
    class RegisterService extends $protobuf.rpc.Service {

        /**
         * Constructs a new RegisterService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new RegisterService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): RegisterService;

        /**
         * Calls SendLink.
         * @param request RegisterLinkRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public sendLink(request: api.IRegisterLinkRequest, callback: api.RegisterService.SendLinkCallback): void;

        /**
         * Calls SendLink.
         * @param request RegisterLinkRequest message or plain object
         * @returns Promise
         */
        public sendLink(request: api.IRegisterLinkRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetLinks.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and LinksGetResponse
         */
        public getLinks(request: google.protobuf.IEmpty, callback: api.RegisterService.GetLinksCallback): void;

        /**
         * Calls GetLinks.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public getLinks(request: google.protobuf.IEmpty): Promise<api.LinksGetResponse>;

        /**
         * Calls RegisterInternal.
         * @param request IdentityRegisterRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public registerInternal(request: api.IIdentityRegisterRequest, callback: api.RegisterService.RegisterInternalCallback): void;

        /**
         * Calls RegisterInternal.
         * @param request IdentityRegisterRequest message or plain object
         * @returns Promise
         */
        public registerInternal(request: api.IIdentityRegisterRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls RegisterWithToken.
         * @param request RegisterPostLinkTokenRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public registerWithToken(request: api.IRegisterPostLinkTokenRequest, callback: api.RegisterService.RegisterWithTokenCallback): void;

        /**
         * Calls RegisterWithToken.
         * @param request RegisterPostLinkTokenRequest message or plain object
         * @returns Promise
         */
        public registerWithToken(request: api.IRegisterPostLinkTokenRequest): Promise<google.protobuf.Empty>;
    }

    namespace RegisterService {

        /**
         * Callback as used by {@link api.RegisterService#sendLink}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type SendLinkCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.RegisterService#getLinks}.
         * @param error Error, if any
         * @param [response] LinksGetResponse
         */
        type GetLinksCallback = (error: (Error|null), response?: api.LinksGetResponse) => void;

        /**
         * Callback as used by {@link api.RegisterService#registerInternal}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type RegisterInternalCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.RegisterService#registerWithToken}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type RegisterWithTokenCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;
    }

    /** Represents a SessionService */
    class SessionService extends $protobuf.rpc.Service {

        /**
         * Constructs a new SessionService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new SessionService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): SessionService;

        /**
         * Calls CreateChallenge.
         * @param request SessionCreateChallengeRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and SessionCreateChallengeResponse
         */
        public createChallenge(request: api.ISessionCreateChallengeRequest, callback: api.SessionService.CreateChallengeCallback): void;

        /**
         * Calls CreateChallenge.
         * @param request SessionCreateChallengeRequest message or plain object
         * @returns Promise
         */
        public createChallenge(request: api.ISessionCreateChallengeRequest): Promise<api.SessionCreateChallengeResponse>;

        /**
         * Calls ResolveChallenge.
         * @param request SessionResolveChallengeRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and SessionResolveChallengeResponse
         */
        public resolveChallenge(request: api.ISessionResolveChallengeRequest, callback: api.SessionService.ResolveChallengeCallback): void;

        /**
         * Calls ResolveChallenge.
         * @param request SessionResolveChallengeRequest message or plain object
         * @returns Promise
         */
        public resolveChallenge(request: api.ISessionResolveChallengeRequest): Promise<api.SessionResolveChallengeResponse>;

        /**
         * Calls UnStale.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and SessionUnStaleResponse
         */
        public unStale(request: google.protobuf.IEmpty, callback: api.SessionService.UnStaleCallback): void;

        /**
         * Calls UnStale.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public unStale(request: google.protobuf.IEmpty): Promise<api.SessionUnStaleResponse>;

        /**
         * Calls Close.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public close(request: google.protobuf.IEmpty, callback: api.SessionService.CloseCallback): void;

        /**
         * Calls Close.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public close(request: google.protobuf.IEmpty): Promise<google.protobuf.Empty>;
    }

    namespace SessionService {

        /**
         * Callback as used by {@link api.SessionService#createChallenge}.
         * @param error Error, if any
         * @param [response] SessionCreateChallengeResponse
         */
        type CreateChallengeCallback = (error: (Error|null), response?: api.SessionCreateChallengeResponse) => void;

        /**
         * Callback as used by {@link api.SessionService#resolveChallenge}.
         * @param error Error, if any
         * @param [response] SessionResolveChallengeResponse
         */
        type ResolveChallengeCallback = (error: (Error|null), response?: api.SessionResolveChallengeResponse) => void;

        /**
         * Callback as used by {@link api.SessionService#unStale}.
         * @param error Error, if any
         * @param [response] SessionUnStaleResponse
         */
        type UnStaleCallback = (error: (Error|null), response?: api.SessionUnStaleResponse) => void;

        /**
         * Callback as used by {@link api.SessionService#close}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type CloseCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;
    }

    /** Represents an IdentityService */
    class IdentityService extends $protobuf.rpc.Service {

        /**
         * Constructs a new IdentityService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new IdentityService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): IdentityService;

        /**
         * Calls Create.
         * @param request IdentityCreateRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public create(request: api.IIdentityCreateRequest, callback: api.IdentityService.CreateCallback): void;

        /**
         * Calls Create.
         * @param request IdentityCreateRequest message or plain object
         * @returns Promise
         */
        public create(request: api.IIdentityCreateRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls Get.
         * @param request IdentityGetRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Identity
         */
        public get(request: api.IIdentityGetRequest, callback: api.IdentityService.GetCallback): void;

        /**
         * Calls Get.
         * @param request IdentityGetRequest message or plain object
         * @returns Promise
         */
        public get(request: api.IIdentityGetRequest): Promise<api.Identity>;

        /**
         * Calls Update.
         * @param request IdentityFields message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public update(request: api.IIdentityFields, callback: api.IdentityService.UpdateCallback): void;

        /**
         * Calls Update.
         * @param request IdentityFields message or plain object
         * @returns Promise
         */
        public update(request: api.IIdentityFields): Promise<google.protobuf.Empty>;

        /**
         * Calls List.
         * @param request IdentityListRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityListResponse
         */
        public list(request: api.IIdentityListRequest, callback: api.IdentityService.ListCallback): void;

        /**
         * Calls List.
         * @param request IdentityListRequest message or plain object
         * @returns Promise
         */
        public list(request: api.IIdentityListRequest): Promise<api.IdentityListResponse>;

        /**
         * Calls ToogleActiveStatus.
         * @param request IdentityToggleActiveStatusRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public toogleActiveStatus(request: api.IIdentityToggleActiveStatusRequest, callback: api.IdentityService.ToogleActiveStatusCallback): void;

        /**
         * Calls ToogleActiveStatus.
         * @param request IdentityToggleActiveStatusRequest message or plain object
         * @returns Promise
         */
        public toogleActiveStatus(request: api.IIdentityToggleActiveStatusRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetPublicKeys.
         * @param request IdentityGetPublicKeysRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetPublicKeysResponse
         */
        public getPublicKeys(request: api.IIdentityGetPublicKeysRequest, callback: api.IdentityService.GetPublicKeysCallback): void;

        /**
         * Calls GetPublicKeys.
         * @param request IdentityGetPublicKeysRequest message or plain object
         * @returns Promise
         */
        public getPublicKeys(request: api.IIdentityGetPublicKeysRequest): Promise<api.IdentityGetPublicKeysResponse>;

        /**
         * Calls GetPublicChains.
         * @param request IdentityGetPublicChainsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetPublicChainsResponse
         */
        public getPublicChains(request: api.IIdentityGetPublicChainsRequest, callback: api.IdentityService.GetPublicChainsCallback): void;

        /**
         * Calls GetPublicChains.
         * @param request IdentityGetPublicChainsRequest message or plain object
         * @returns Promise
         */
        public getPublicChains(request: api.IIdentityGetPublicChainsRequest): Promise<api.IdentityGetPublicChainsResponse>;

        /**
         * Calls GetLatestPublicKeys.
         * @param request IdentityGetLatestPublicKeysRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetLatestPublicKeysResponse
         */
        public getLatestPublicKeys(request: api.IIdentityGetLatestPublicKeysRequest, callback: api.IdentityService.GetLatestPublicKeysCallback): void;

        /**
         * Calls GetLatestPublicKeys.
         * @param request IdentityGetLatestPublicKeysRequest message or plain object
         * @returns Promise
         */
        public getLatestPublicKeys(request: api.IIdentityGetLatestPublicKeysRequest): Promise<api.IdentityGetLatestPublicKeysResponse>;

        /**
         * Calls GetLatestPublicChains.
         * @param request IdentityGetLatestPublicChainsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetLatestPublicChainsResponse
         */
        public getLatestPublicChains(request: api.IIdentityGetLatestPublicChainsRequest, callback: api.IdentityService.GetLatestPublicChainsCallback): void;

        /**
         * Calls GetLatestPublicChains.
         * @param request IdentityGetLatestPublicChainsRequest message or plain object
         * @returns Promise
         */
        public getLatestPublicChains(request: api.IIdentityGetLatestPublicChainsRequest): Promise<api.IdentityGetLatestPublicChainsResponse>;

        /**
         * Calls GetKeySet.
         * @param request IdentityGetKeySetRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetKeySetResponse
         */
        public getKeySet(request: api.IIdentityGetKeySetRequest, callback: api.IdentityService.GetKeySetCallback): void;

        /**
         * Calls GetKeySet.
         * @param request IdentityGetKeySetRequest message or plain object
         * @returns Promise
         */
        public getKeySet(request: api.IIdentityGetKeySetRequest): Promise<api.IdentityGetKeySetResponse>;

        /**
         * Calls GetSharingGroup.
         * @param request IdentityGetSharingGroupRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetSharingGroupResponse
         */
        public getSharingGroup(request: api.IIdentityGetSharingGroupRequest, callback: api.IdentityService.GetSharingGroupCallback): void;

        /**
         * Calls GetSharingGroup.
         * @param request IdentityGetSharingGroupRequest message or plain object
         * @returns Promise
         */
        public getSharingGroup(request: api.IIdentityGetSharingGroupRequest): Promise<api.IdentityGetSharingGroupResponse>;

        /**
         * Calls GetAccessGroup.
         * @param request IdentityGetAccessGroupRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetAccessGroupResponse
         */
        public getAccessGroup(request: api.IIdentityGetAccessGroupRequest, callback: api.IdentityService.GetAccessGroupCallback): void;

        /**
         * Calls GetAccessGroup.
         * @param request IdentityGetAccessGroupRequest message or plain object
         * @returns Promise
         */
        public getAccessGroup(request: api.IIdentityGetAccessGroupRequest): Promise<api.IdentityGetAccessGroupResponse>;

        /**
         * Calls ExtendSharingGroup.
         * @param request IdentityShareRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public extendSharingGroup(request: api.IIdentityShareRequest, callback: api.IdentityService.ExtendSharingGroupCallback): void;

        /**
         * Calls ExtendSharingGroup.
         * @param request IdentityShareRequest message or plain object
         * @returns Promise
         */
        public extendSharingGroup(request: api.IIdentityShareRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetSharingGraph.
         * @param request IdentityGetSharingGraphRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetSharingGraphResponse
         */
        public getSharingGraph(request: api.IIdentityGetSharingGraphRequest, callback: api.IdentityService.GetSharingGraphCallback): void;

        /**
         * Calls GetSharingGraph.
         * @param request IdentityGetSharingGraphRequest message or plain object
         * @returns Promise
         */
        public getSharingGraph(request: api.IIdentityGetSharingGraphRequest): Promise<api.IdentityGetSharingGraphResponse>;

        /**
         * Calls PostSharingGraph.
         * @param request IdentityPostSharingGraphRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public postSharingGraph(request: api.IIdentityPostSharingGraphRequest, callback: api.IdentityService.PostSharingGraphCallback): void;

        /**
         * Calls PostSharingGraph.
         * @param request IdentityPostSharingGraphRequest message or plain object
         * @returns Promise
         */
        public postSharingGraph(request: api.IIdentityPostSharingGraphRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetKeysToRenew.
         * @param request IdentityGetKeysToRenewRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetKeysToRenewResponse
         */
        public getKeysToRenew(request: api.IIdentityGetKeysToRenewRequest, callback: api.IdentityService.GetKeysToRenewCallback): void;

        /**
         * Calls GetKeysToRenew.
         * @param request IdentityGetKeysToRenewRequest message or plain object
         * @returns Promise
         */
        public getKeysToRenew(request: api.IIdentityGetKeysToRenewRequest): Promise<api.IdentityGetKeysToRenewResponse>;

        /**
         * Calls PostKeysToRenew.
         * @param request IdentityPostKeysToRenewRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public postKeysToRenew(request: api.IIdentityPostKeysToRenewRequest, callback: api.IdentityService.PostKeysToRenewCallback): void;

        /**
         * Calls PostKeysToRenew.
         * @param request IdentityPostKeysToRenewRequest message or plain object
         * @returns Promise
         */
        public postKeysToRenew(request: api.IIdentityPostKeysToRenewRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls Promote.
         * @param request IdentityPromoteRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public promote(request: api.IIdentityPromoteRequest, callback: api.IdentityService.PromoteCallback): void;

        /**
         * Calls Promote.
         * @param request IdentityPromoteRequest message or plain object
         * @returns Promise
         */
        public promote(request: api.IIdentityPromoteRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetLockedVersions.
         * @param request IdentityGetLockedVersionsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetLockedVersionsResponse
         */
        public getLockedVersions(request: api.IIdentityGetLockedVersionsRequest, callback: api.IdentityService.GetLockedVersionsCallback): void;

        /**
         * Calls GetLockedVersions.
         * @param request IdentityGetLockedVersionsRequest message or plain object
         * @returns Promise
         */
        public getLockedVersions(request: api.IIdentityGetLockedVersionsRequest): Promise<api.IdentityGetLockedVersionsResponse>;

        /**
         * Calls UnlockVersions.
         * @param request IdentityUnlockVersionsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public unlockVersions(request: api.IIdentityUnlockVersionsRequest, callback: api.IdentityService.UnlockVersionsCallback): void;

        /**
         * Calls UnlockVersions.
         * @param request IdentityUnlockVersionsRequest message or plain object
         * @returns Promise
         */
        public unlockVersions(request: api.IIdentityUnlockVersionsRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls SetNamedResource.
         * @param request IdentitySetNamedResourceRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public setNamedResource(request: api.IIdentitySetNamedResourceRequest, callback: api.IdentityService.SetNamedResourceCallback): void;

        /**
         * Calls SetNamedResource.
         * @param request IdentitySetNamedResourceRequest message or plain object
         * @returns Promise
         */
        public setNamedResource(request: api.IIdentitySetNamedResourceRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetNamedResource.
         * @param request IdentityGetNamedResourceRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetNamedResourceResponse
         */
        public getNamedResource(request: api.IIdentityGetNamedResourceRequest, callback: api.IdentityService.GetNamedResourceCallback): void;

        /**
         * Calls GetNamedResource.
         * @param request IdentityGetNamedResourceRequest message or plain object
         * @returns Promise
         */
        public getNamedResource(request: api.IIdentityGetNamedResourceRequest): Promise<api.IdentityGetNamedResourceResponse>;
    }

    namespace IdentityService {

        /**
         * Callback as used by {@link api.IdentityService#create}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type CreateCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#get}.
         * @param error Error, if any
         * @param [response] Identity
         */
        type GetCallback = (error: (Error|null), response?: api.Identity) => void;

        /**
         * Callback as used by {@link api.IdentityService#update}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type UpdateCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#list}.
         * @param error Error, if any
         * @param [response] IdentityListResponse
         */
        type ListCallback = (error: (Error|null), response?: api.IdentityListResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#toogleActiveStatus}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type ToogleActiveStatusCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#getPublicKeys}.
         * @param error Error, if any
         * @param [response] IdentityGetPublicKeysResponse
         */
        type GetPublicKeysCallback = (error: (Error|null), response?: api.IdentityGetPublicKeysResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#getPublicChains}.
         * @param error Error, if any
         * @param [response] IdentityGetPublicChainsResponse
         */
        type GetPublicChainsCallback = (error: (Error|null), response?: api.IdentityGetPublicChainsResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#getLatestPublicKeys}.
         * @param error Error, if any
         * @param [response] IdentityGetLatestPublicKeysResponse
         */
        type GetLatestPublicKeysCallback = (error: (Error|null), response?: api.IdentityGetLatestPublicKeysResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#getLatestPublicChains}.
         * @param error Error, if any
         * @param [response] IdentityGetLatestPublicChainsResponse
         */
        type GetLatestPublicChainsCallback = (error: (Error|null), response?: api.IdentityGetLatestPublicChainsResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#getKeySet}.
         * @param error Error, if any
         * @param [response] IdentityGetKeySetResponse
         */
        type GetKeySetCallback = (error: (Error|null), response?: api.IdentityGetKeySetResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#getSharingGroup}.
         * @param error Error, if any
         * @param [response] IdentityGetSharingGroupResponse
         */
        type GetSharingGroupCallback = (error: (Error|null), response?: api.IdentityGetSharingGroupResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#getAccessGroup}.
         * @param error Error, if any
         * @param [response] IdentityGetAccessGroupResponse
         */
        type GetAccessGroupCallback = (error: (Error|null), response?: api.IdentityGetAccessGroupResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#extendSharingGroup}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type ExtendSharingGroupCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#getSharingGraph}.
         * @param error Error, if any
         * @param [response] IdentityGetSharingGraphResponse
         */
        type GetSharingGraphCallback = (error: (Error|null), response?: api.IdentityGetSharingGraphResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#postSharingGraph}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type PostSharingGraphCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#getKeysToRenew}.
         * @param error Error, if any
         * @param [response] IdentityGetKeysToRenewResponse
         */
        type GetKeysToRenewCallback = (error: (Error|null), response?: api.IdentityGetKeysToRenewResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#postKeysToRenew}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type PostKeysToRenewCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#promote}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type PromoteCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#getLockedVersions}.
         * @param error Error, if any
         * @param [response] IdentityGetLockedVersionsResponse
         */
        type GetLockedVersionsCallback = (error: (Error|null), response?: api.IdentityGetLockedVersionsResponse) => void;

        /**
         * Callback as used by {@link api.IdentityService#unlockVersions}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type UnlockVersionsCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#setNamedResource}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type SetNamedResourceCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.IdentityService#getNamedResource}.
         * @param error Error, if any
         * @param [response] IdentityGetNamedResourceResponse
         */
        type GetNamedResourceCallback = (error: (Error|null), response?: api.IdentityGetNamedResourceResponse) => void;
    }

    /** Represents a ResourceService */
    class ResourceService extends $protobuf.rpc.Service {

        /**
         * Constructs a new ResourceService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new ResourceService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ResourceService;

        /**
         * Calls List.
         * @param request ResourceListRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ResourceListResponse
         */
        public list(request: api.IResourceListRequest, callback: api.ResourceService.ListCallback): void;

        /**
         * Calls List.
         * @param request ResourceListRequest message or plain object
         * @returns Promise
         */
        public list(request: api.IResourceListRequest): Promise<api.ResourceListResponse>;

        /**
         * Calls Create.
         * @param request ResourcePostRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ResourcePostResponse
         */
        public create(request: api.IResourcePostRequest, callback: api.ResourceService.CreateCallback): void;

        /**
         * Calls Create.
         * @param request ResourcePostRequest message or plain object
         * @returns Promise
         */
        public create(request: api.IResourcePostRequest): Promise<api.ResourcePostResponse>;

        /**
         * Calls GetAccessLogs.
         * @param request ResourceGetAccessLogsRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ResourceGetAccessLogsResponse
         */
        public getAccessLogs(request: api.IResourceGetAccessLogsRequest, callback: api.ResourceService.GetAccessLogsCallback): void;

        /**
         * Calls GetAccessLogs.
         * @param request ResourceGetAccessLogsRequest message or plain object
         * @returns Promise
         */
        public getAccessLogs(request: api.IResourceGetAccessLogsRequest): Promise<api.ResourceGetAccessLogsResponse>;

        /**
         * Calls Get.
         * @param request ResourceGetRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ResourceGetResponse
         */
        public get(request: api.IResourceGetRequest, callback: api.ResourceService.GetCallback): void;

        /**
         * Calls Get.
         * @param request ResourceGetRequest message or plain object
         * @returns Promise
         */
        public get(request: api.IResourceGetRequest): Promise<api.ResourceGetResponse>;

        /**
         * Calls Delete.
         * @param request ResourceDeleteRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public delete(request: api.IResourceDeleteRequest, callback: api.ResourceService.DeleteCallback): void;

        /**
         * Calls Delete.
         * @param request ResourceDeleteRequest message or plain object
         * @returns Promise
         */
        public delete(request: api.IResourceDeleteRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls GetKey.
         * @param request ResourceGetKeyRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ResourceGetKeyResponse
         */
        public getKey(request: api.IResourceGetKeyRequest, callback: api.ResourceService.GetKeyCallback): void;

        /**
         * Calls GetKey.
         * @param request ResourceGetKeyRequest message or plain object
         * @returns Promise
         */
        public getKey(request: api.IResourceGetKeyRequest): Promise<api.ResourceGetKeyResponse>;

        /**
         * Calls GetSharingGroup.
         * @param request ResourceGetSharingGroupRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ResourceGetSharingGroupResponse
         */
        public getSharingGroup(request: api.IResourceGetSharingGroupRequest, callback: api.ResourceService.GetSharingGroupCallback): void;

        /**
         * Calls GetSharingGroup.
         * @param request ResourceGetSharingGroupRequest message or plain object
         * @returns Promise
         */
        public getSharingGroup(request: api.IResourceGetSharingGroupRequest): Promise<api.ResourceGetSharingGroupResponse>;

        /**
         * Calls ExtendSharingGroup.
         * @param request ResourceExtendSharingGroupRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public extendSharingGroup(request: api.IResourceExtendSharingGroupRequest, callback: api.ResourceService.ExtendSharingGroupCallback): void;

        /**
         * Calls ExtendSharingGroup.
         * @param request ResourceExtendSharingGroupRequest message or plain object
         * @returns Promise
         */
        public extendSharingGroup(request: api.IResourceExtendSharingGroupRequest): Promise<google.protobuf.Empty>;
    }

    namespace ResourceService {

        /**
         * Callback as used by {@link api.ResourceService#list}.
         * @param error Error, if any
         * @param [response] ResourceListResponse
         */
        type ListCallback = (error: (Error|null), response?: api.ResourceListResponse) => void;

        /**
         * Callback as used by {@link api.ResourceService#create}.
         * @param error Error, if any
         * @param [response] ResourcePostResponse
         */
        type CreateCallback = (error: (Error|null), response?: api.ResourcePostResponse) => void;

        /**
         * Callback as used by {@link api.ResourceService#getAccessLogs}.
         * @param error Error, if any
         * @param [response] ResourceGetAccessLogsResponse
         */
        type GetAccessLogsCallback = (error: (Error|null), response?: api.ResourceGetAccessLogsResponse) => void;

        /**
         * Callback as used by {@link api.ResourceService#get}.
         * @param error Error, if any
         * @param [response] ResourceGetResponse
         */
        type GetCallback = (error: (Error|null), response?: api.ResourceGetResponse) => void;

        /**
         * Callback as used by {@link api.ResourceService#delete_}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type DeleteCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.ResourceService#getKey}.
         * @param error Error, if any
         * @param [response] ResourceGetKeyResponse
         */
        type GetKeyCallback = (error: (Error|null), response?: api.ResourceGetKeyResponse) => void;

        /**
         * Callback as used by {@link api.ResourceService#getSharingGroup}.
         * @param error Error, if any
         * @param [response] ResourceGetSharingGroupResponse
         */
        type GetSharingGroupCallback = (error: (Error|null), response?: api.ResourceGetSharingGroupResponse) => void;

        /**
         * Callback as used by {@link api.ResourceService#extendSharingGroup}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type ExtendSharingGroupCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;
    }

    /** Represents an ApplicationService */
    class ApplicationService extends $protobuf.rpc.Service {

        /**
         * Constructs a new ApplicationService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new ApplicationService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ApplicationService;

        /**
         * Calls Configure.
         * @param request IdentityConfigurationAsApplicationRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ApplicationConfigID
         */
        public configure(request: api.IIdentityConfigurationAsApplicationRequest, callback: api.ApplicationService.ConfigureCallback): void;

        /**
         * Calls Configure.
         * @param request IdentityConfigurationAsApplicationRequest message or plain object
         * @returns Promise
         */
        public configure(request: api.IIdentityConfigurationAsApplicationRequest): Promise<api.ApplicationConfigID>;

        /**
         * Calls UsageOverview.
         * @param request ApplicationUsageOverviewRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ApplicationUsageOverviewResponse
         */
        public usageOverview(request: api.IApplicationUsageOverviewRequest, callback: api.ApplicationService.UsageOverviewCallback): void;

        /**
         * Calls UsageOverview.
         * @param request ApplicationUsageOverviewRequest message or plain object
         * @returns Promise
         */
        public usageOverview(request: api.IApplicationUsageOverviewRequest): Promise<api.ApplicationUsageOverviewResponse>;

        /**
         * Calls RegisterApplicationIdentity.
         * @param request RegisterApplicationIdentityRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and RegisterApplicationIdentityResponse
         */
        public registerApplicationIdentity(request: api.IRegisterApplicationIdentityRequest, callback: api.ApplicationService.RegisterApplicationIdentityCallback): void;

        /**
         * Calls RegisterApplicationIdentity.
         * @param request RegisterApplicationIdentityRequest message or plain object
         * @returns Promise
         */
        public registerApplicationIdentity(request: api.IRegisterApplicationIdentityRequest): Promise<api.RegisterApplicationIdentityResponse>;

        /**
         * Calls ListIdentities.
         * @param request ApplicationListIdentitiesRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ApplicationListIdentitiesResponse
         */
        public listIdentities(request: api.IApplicationListIdentitiesRequest, callback: api.ApplicationService.ListIdentitiesCallback): void;

        /**
         * Calls ListIdentities.
         * @param request ApplicationListIdentitiesRequest message or plain object
         * @returns Promise
         */
        public listIdentities(request: api.IApplicationListIdentitiesRequest): Promise<api.ApplicationListIdentitiesResponse>;

        /**
         * Calls ListIdentitySession.
         * @param request ApplicationIdentitySessionListRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ApplicationIdentitySessionListResponse
         */
        public listIdentitySession(request: api.IApplicationIdentitySessionListRequest, callback: api.ApplicationService.ListIdentitySessionCallback): void;

        /**
         * Calls ListIdentitySession.
         * @param request ApplicationIdentitySessionListRequest message or plain object
         * @returns Promise
         */
        public listIdentitySession(request: api.IApplicationIdentitySessionListRequest): Promise<api.ApplicationIdentitySessionListResponse>;

        /**
         * Calls GetIdentityAuth.
         * @param request ApplicationGetIdentityAuthRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and ApplicationGetIdentityAuthResponse
         */
        public getIdentityAuth(request: api.IApplicationGetIdentityAuthRequest, callback: api.ApplicationService.GetIdentityAuthCallback): void;

        /**
         * Calls GetIdentityAuth.
         * @param request ApplicationGetIdentityAuthRequest message or plain object
         * @returns Promise
         */
        public getIdentityAuth(request: api.IApplicationGetIdentityAuthRequest): Promise<api.ApplicationGetIdentityAuthResponse>;

        /**
         * Calls GetConfiguration.
         * @param request ApplicationConfigID message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetConfigurationResponse
         */
        public getConfiguration(request: api.IApplicationConfigID, callback: api.ApplicationService.GetConfigurationCallback): void;

        /**
         * Calls GetConfiguration.
         * @param request ApplicationConfigID message or plain object
         * @returns Promise
         */
        public getConfiguration(request: api.IApplicationConfigID): Promise<api.IdentityGetConfigurationResponse>;

        /**
         * Calls GetLatestConfiguration.
         * @param request ApplicationGetLatestConfigurationRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and IdentityGetConfigurationResponse
         */
        public getLatestConfiguration(request: api.IApplicationGetLatestConfigurationRequest, callback: api.ApplicationService.GetLatestConfigurationCallback): void;

        /**
         * Calls GetLatestConfiguration.
         * @param request ApplicationGetLatestConfigurationRequest message or plain object
         * @returns Promise
         */
        public getLatestConfiguration(request: api.IApplicationGetLatestConfigurationRequest): Promise<api.IdentityGetConfigurationResponse>;
    }

    namespace ApplicationService {

        /**
         * Callback as used by {@link api.ApplicationService#configure}.
         * @param error Error, if any
         * @param [response] ApplicationConfigID
         */
        type ConfigureCallback = (error: (Error|null), response?: api.ApplicationConfigID) => void;

        /**
         * Callback as used by {@link api.ApplicationService#usageOverview}.
         * @param error Error, if any
         * @param [response] ApplicationUsageOverviewResponse
         */
        type UsageOverviewCallback = (error: (Error|null), response?: api.ApplicationUsageOverviewResponse) => void;

        /**
         * Callback as used by {@link api.ApplicationService#registerApplicationIdentity}.
         * @param error Error, if any
         * @param [response] RegisterApplicationIdentityResponse
         */
        type RegisterApplicationIdentityCallback = (error: (Error|null), response?: api.RegisterApplicationIdentityResponse) => void;

        /**
         * Callback as used by {@link api.ApplicationService#listIdentities}.
         * @param error Error, if any
         * @param [response] ApplicationListIdentitiesResponse
         */
        type ListIdentitiesCallback = (error: (Error|null), response?: api.ApplicationListIdentitiesResponse) => void;

        /**
         * Callback as used by {@link api.ApplicationService#listIdentitySession}.
         * @param error Error, if any
         * @param [response] ApplicationIdentitySessionListResponse
         */
        type ListIdentitySessionCallback = (error: (Error|null), response?: api.ApplicationIdentitySessionListResponse) => void;

        /**
         * Callback as used by {@link api.ApplicationService#getIdentityAuth}.
         * @param error Error, if any
         * @param [response] ApplicationGetIdentityAuthResponse
         */
        type GetIdentityAuthCallback = (error: (Error|null), response?: api.ApplicationGetIdentityAuthResponse) => void;

        /**
         * Callback as used by {@link api.ApplicationService#getConfiguration}.
         * @param error Error, if any
         * @param [response] IdentityGetConfigurationResponse
         */
        type GetConfigurationCallback = (error: (Error|null), response?: api.IdentityGetConfigurationResponse) => void;

        /**
         * Callback as used by {@link api.ApplicationService#getLatestConfiguration}.
         * @param error Error, if any
         * @param [response] IdentityGetConfigurationResponse
         */
        type GetLatestConfigurationCallback = (error: (Error|null), response?: api.IdentityGetConfigurationResponse) => void;
    }

    /** Represents a DelegatedAccessService */
    class DelegatedAccessService extends $protobuf.rpc.Service {

        /**
         * Constructs a new DelegatedAccessService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new DelegatedAccessService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): DelegatedAccessService;

        /**
         * Calls Create.
         * @param request DelegatedAccessPostRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and DelegatedAccessPostResponse
         */
        public create(request: api.IDelegatedAccessPostRequest, callback: api.DelegatedAccessService.CreateCallback): void;

        /**
         * Calls Create.
         * @param request DelegatedAccessPostRequest message or plain object
         * @returns Promise
         */
        public create(request: api.IDelegatedAccessPostRequest): Promise<api.DelegatedAccessPostResponse>;

        /**
         * Calls Get.
         * @param request DelegatedAccessGetRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and DelegatedAccessGetResponse
         */
        public get(request: api.IDelegatedAccessGetRequest, callback: api.DelegatedAccessService.GetCallback): void;

        /**
         * Calls Get.
         * @param request DelegatedAccessGetRequest message or plain object
         * @returns Promise
         */
        public get(request: api.IDelegatedAccessGetRequest): Promise<api.DelegatedAccessGetResponse>;

        /**
         * Calls GetKeys.
         * @param request DelegatedAccessGetKeysRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and DelegatedAccessGetKeysResponse
         */
        public getKeys(request: api.IDelegatedAccessGetKeysRequest, callback: api.DelegatedAccessService.GetKeysCallback): void;

        /**
         * Calls GetKeys.
         * @param request DelegatedAccessGetKeysRequest message or plain object
         * @returns Promise
         */
        public getKeys(request: api.IDelegatedAccessGetKeysRequest): Promise<api.DelegatedAccessGetKeysResponse>;

        /**
         * Calls PutKeys.
         * @param request DelegatedAccessPostKeysRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and Empty
         */
        public putKeys(request: api.IDelegatedAccessPostKeysRequest, callback: api.DelegatedAccessService.PutKeysCallback): void;

        /**
         * Calls PutKeys.
         * @param request DelegatedAccessPostKeysRequest message or plain object
         * @returns Promise
         */
        public putKeys(request: api.IDelegatedAccessPostKeysRequest): Promise<google.protobuf.Empty>;

        /**
         * Calls List.
         * @param request DelegatedAccessListRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and DelegatedAccessListResponse
         */
        public list(request: api.IDelegatedAccessListRequest, callback: api.DelegatedAccessService.ListCallback): void;

        /**
         * Calls List.
         * @param request DelegatedAccessListRequest message or plain object
         * @returns Promise
         */
        public list(request: api.IDelegatedAccessListRequest): Promise<api.DelegatedAccessListResponse>;
    }

    namespace DelegatedAccessService {

        /**
         * Callback as used by {@link api.DelegatedAccessService#create}.
         * @param error Error, if any
         * @param [response] DelegatedAccessPostResponse
         */
        type CreateCallback = (error: (Error|null), response?: api.DelegatedAccessPostResponse) => void;

        /**
         * Callback as used by {@link api.DelegatedAccessService#get}.
         * @param error Error, if any
         * @param [response] DelegatedAccessGetResponse
         */
        type GetCallback = (error: (Error|null), response?: api.DelegatedAccessGetResponse) => void;

        /**
         * Callback as used by {@link api.DelegatedAccessService#getKeys}.
         * @param error Error, if any
         * @param [response] DelegatedAccessGetKeysResponse
         */
        type GetKeysCallback = (error: (Error|null), response?: api.DelegatedAccessGetKeysResponse) => void;

        /**
         * Callback as used by {@link api.DelegatedAccessService#putKeys}.
         * @param error Error, if any
         * @param [response] Empty
         */
        type PutKeysCallback = (error: (Error|null), response?: google.protobuf.Empty) => void;

        /**
         * Callback as used by {@link api.DelegatedAccessService#list}.
         * @param error Error, if any
         * @param [response] DelegatedAccessListResponse
         */
        type ListCallback = (error: (Error|null), response?: api.DelegatedAccessListResponse) => void;
    }

    /** Properties of a TenantCustomer. */
    interface ITenantCustomer {

        /** TenantCustomer id */
        id?: (number|null);

        /** TenantCustomer name */
        name?: (string|null);
    }

    /** Represents a TenantCustomer. */
    class TenantCustomer implements ITenantCustomer {

        /**
         * Constructs a new TenantCustomer.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ITenantCustomer);

        /** TenantCustomer id. */
        public id: number;

        /** TenantCustomer name. */
        public name: string;

        /**
         * Creates a new TenantCustomer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TenantCustomer instance
         */
        public static create(properties?: api.ITenantCustomer): api.TenantCustomer;

        /**
         * Encodes the specified TenantCustomer message. Does not implicitly {@link api.TenantCustomer.verify|verify} messages.
         * @param message TenantCustomer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ITenantCustomer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TenantCustomer message, length delimited. Does not implicitly {@link api.TenantCustomer.verify|verify} messages.
         * @param message TenantCustomer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ITenantCustomer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TenantCustomer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TenantCustomer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.TenantCustomer;

        /**
         * Decodes a TenantCustomer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TenantCustomer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.TenantCustomer;

        /**
         * Verifies a TenantCustomer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TenantCustomer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TenantCustomer
         */
        public static fromObject(object: { [k: string]: any }): api.TenantCustomer;

        /**
         * Creates a plain object from a TenantCustomer message. Also converts values to other types if specified.
         * @param message TenantCustomer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.TenantCustomer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TenantCustomer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TenantGetCustomersResponse. */
    interface ITenantGetCustomersResponse {

        /** TenantGetCustomersResponse customers */
        customers?: (api.ITenantCustomer[]|null);
    }

    /** Represents a TenantGetCustomersResponse. */
    class TenantGetCustomersResponse implements ITenantGetCustomersResponse {

        /**
         * Constructs a new TenantGetCustomersResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: api.ITenantGetCustomersResponse);

        /** TenantGetCustomersResponse customers. */
        public customers: api.ITenantCustomer[];

        /**
         * Creates a new TenantGetCustomersResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TenantGetCustomersResponse instance
         */
        public static create(properties?: api.ITenantGetCustomersResponse): api.TenantGetCustomersResponse;

        /**
         * Encodes the specified TenantGetCustomersResponse message. Does not implicitly {@link api.TenantGetCustomersResponse.verify|verify} messages.
         * @param message TenantGetCustomersResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: api.ITenantGetCustomersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TenantGetCustomersResponse message, length delimited. Does not implicitly {@link api.TenantGetCustomersResponse.verify|verify} messages.
         * @param message TenantGetCustomersResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: api.ITenantGetCustomersResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TenantGetCustomersResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TenantGetCustomersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.TenantGetCustomersResponse;

        /**
         * Decodes a TenantGetCustomersResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TenantGetCustomersResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.TenantGetCustomersResponse;

        /**
         * Verifies a TenantGetCustomersResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TenantGetCustomersResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TenantGetCustomersResponse
         */
        public static fromObject(object: { [k: string]: any }): api.TenantGetCustomersResponse;

        /**
         * Creates a plain object from a TenantGetCustomersResponse message. Also converts values to other types if specified.
         * @param message TenantGetCustomersResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: api.TenantGetCustomersResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TenantGetCustomersResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents a TenantService */
    class TenantService extends $protobuf.rpc.Service {

        /**
         * Constructs a new TenantService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new TenantService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): TenantService;

        /**
         * Calls GetCustomers.
         * @param request Empty message or plain object
         * @param callback Node-style callback called with the error, if any, and TenantGetCustomersResponse
         */
        public getCustomers(request: google.protobuf.IEmpty, callback: api.TenantService.GetCustomersCallback): void;

        /**
         * Calls GetCustomers.
         * @param request Empty message or plain object
         * @returns Promise
         */
        public getCustomers(request: google.protobuf.IEmpty): Promise<api.TenantGetCustomersResponse>;
    }

    namespace TenantService {

        /**
         * Callback as used by {@link api.TenantService#getCustomers}.
         * @param error Error, if any
         * @param [response] TenantGetCustomersResponse
         */
        type GetCustomersCallback = (error: (Error|null), response?: api.TenantGetCustomersResponse) => void;
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

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileDescriptorSet. */
        interface IFileDescriptorSet {

            /** FileDescriptorSet file */
            file?: (google.protobuf.IFileDescriptorProto[]|null);
        }

        /** Represents a FileDescriptorSet. */
        class FileDescriptorSet implements IFileDescriptorSet {

            /**
             * Constructs a new FileDescriptorSet.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorSet);

            /** FileDescriptorSet file. */
            public file: google.protobuf.IFileDescriptorProto[];

            /**
             * Creates a new FileDescriptorSet instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileDescriptorSet instance
             */
            public static create(properties?: google.protobuf.IFileDescriptorSet): google.protobuf.FileDescriptorSet;

            /**
             * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorSet message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
             * @param message FileDescriptorSet message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorSet, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorSet;

            /**
             * Decodes a FileDescriptorSet message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorSet
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorSet;

            /**
             * Verifies a FileDescriptorSet message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorSet message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorSet
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorSet;

            /**
             * Creates a plain object from a FileDescriptorSet message. Also converts values to other types if specified.
             * @param message FileDescriptorSet
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorSet, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorSet to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileDescriptorProto. */
        interface IFileDescriptorProto {

            /** FileDescriptorProto name */
            name?: (string|null);

            /** FileDescriptorProto package */
            "package"?: (string|null);

            /** FileDescriptorProto dependency */
            dependency?: (string[]|null);

            /** FileDescriptorProto publicDependency */
            publicDependency?: (number[]|null);

            /** FileDescriptorProto weakDependency */
            weakDependency?: (number[]|null);

            /** FileDescriptorProto messageType */
            messageType?: (google.protobuf.IDescriptorProto[]|null);

            /** FileDescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** FileDescriptorProto service */
            service?: (google.protobuf.IServiceDescriptorProto[]|null);

            /** FileDescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** FileDescriptorProto options */
            options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo */
            sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax */
            syntax?: (string|null);
        }

        /** Represents a FileDescriptorProto. */
        class FileDescriptorProto implements IFileDescriptorProto {

            /**
             * Constructs a new FileDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileDescriptorProto);

            /** FileDescriptorProto name. */
            public name: string;

            /** FileDescriptorProto package. */
            public package: string;

            /** FileDescriptorProto dependency. */
            public dependency: string[];

            /** FileDescriptorProto publicDependency. */
            public publicDependency: number[];

            /** FileDescriptorProto weakDependency. */
            public weakDependency: number[];

            /** FileDescriptorProto messageType. */
            public messageType: google.protobuf.IDescriptorProto[];

            /** FileDescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** FileDescriptorProto service. */
            public service: google.protobuf.IServiceDescriptorProto[];

            /** FileDescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** FileDescriptorProto options. */
            public options?: (google.protobuf.IFileOptions|null);

            /** FileDescriptorProto sourceCodeInfo. */
            public sourceCodeInfo?: (google.protobuf.ISourceCodeInfo|null);

            /** FileDescriptorProto syntax. */
            public syntax: string;

            /**
             * Creates a new FileDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IFileDescriptorProto): google.protobuf.FileDescriptorProto;

            /**
             * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
             * @param message FileDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileDescriptorProto;

            /**
             * Decodes a FileDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileDescriptorProto;

            /**
             * Verifies a FileDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileDescriptorProto;

            /**
             * Creates a plain object from a FileDescriptorProto message. Also converts values to other types if specified.
             * @param message FileDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DescriptorProto. */
        interface IDescriptorProto {

            /** DescriptorProto name */
            name?: (string|null);

            /** DescriptorProto field */
            field?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto extension */
            extension?: (google.protobuf.IFieldDescriptorProto[]|null);

            /** DescriptorProto nestedType */
            nestedType?: (google.protobuf.IDescriptorProto[]|null);

            /** DescriptorProto enumType */
            enumType?: (google.protobuf.IEnumDescriptorProto[]|null);

            /** DescriptorProto extensionRange */
            extensionRange?: (google.protobuf.DescriptorProto.IExtensionRange[]|null);

            /** DescriptorProto oneofDecl */
            oneofDecl?: (google.protobuf.IOneofDescriptorProto[]|null);

            /** DescriptorProto options */
            options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange */
            reservedRange?: (google.protobuf.DescriptorProto.IReservedRange[]|null);

            /** DescriptorProto reservedName */
            reservedName?: (string[]|null);
        }

        /** Represents a DescriptorProto. */
        class DescriptorProto implements IDescriptorProto {

            /**
             * Constructs a new DescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IDescriptorProto);

            /** DescriptorProto name. */
            public name: string;

            /** DescriptorProto field. */
            public field: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto extension. */
            public extension: google.protobuf.IFieldDescriptorProto[];

            /** DescriptorProto nestedType. */
            public nestedType: google.protobuf.IDescriptorProto[];

            /** DescriptorProto enumType. */
            public enumType: google.protobuf.IEnumDescriptorProto[];

            /** DescriptorProto extensionRange. */
            public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

            /** DescriptorProto oneofDecl. */
            public oneofDecl: google.protobuf.IOneofDescriptorProto[];

            /** DescriptorProto options. */
            public options?: (google.protobuf.IMessageOptions|null);

            /** DescriptorProto reservedRange. */
            public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

            /** DescriptorProto reservedName. */
            public reservedName: string[];

            /**
             * Creates a new DescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DescriptorProto instance
             */
            public static create(properties?: google.protobuf.IDescriptorProto): google.protobuf.DescriptorProto;

            /**
             * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
             * @param message DescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto;

            /**
             * Decodes a DescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto;

            /**
             * Verifies a DescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto;

            /**
             * Creates a plain object from a DescriptorProto message. Also converts values to other types if specified.
             * @param message DescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.DescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace DescriptorProto {

            /** Properties of an ExtensionRange. */
            interface IExtensionRange {

                /** ExtensionRange start */
                start?: (number|null);

                /** ExtensionRange end */
                end?: (number|null);
            }

            /** Represents an ExtensionRange. */
            class ExtensionRange implements IExtensionRange {

                /**
                 * Constructs a new ExtensionRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IExtensionRange);

                /** ExtensionRange start. */
                public start: number;

                /** ExtensionRange end. */
                public end: number;

                /**
                 * Creates a new ExtensionRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ExtensionRange instance
                 */
                public static create(properties?: google.protobuf.DescriptorProto.IExtensionRange): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ExtensionRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
                 * @param message ExtensionRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IExtensionRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Decodes an ExtensionRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ExtensionRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Verifies an ExtensionRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ExtensionRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ExtensionRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ExtensionRange;

                /**
                 * Creates a plain object from an ExtensionRange message. Also converts values to other types if specified.
                 * @param message ExtensionRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ExtensionRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ExtensionRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ReservedRange. */
            interface IReservedRange {

                /** ReservedRange start */
                start?: (number|null);

                /** ReservedRange end */
                end?: (number|null);
            }

            /** Represents a ReservedRange. */
            class ReservedRange implements IReservedRange {

                /**
                 * Constructs a new ReservedRange.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.DescriptorProto.IReservedRange);

                /** ReservedRange start. */
                public start: number;

                /** ReservedRange end. */
                public end: number;

                /**
                 * Creates a new ReservedRange instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ReservedRange instance
                 */
                public static create(properties?: google.protobuf.DescriptorProto.IReservedRange): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ReservedRange message, length delimited. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
                 * @param message ReservedRange message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.DescriptorProto.IReservedRange, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Decodes a ReservedRange message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ReservedRange
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Verifies a ReservedRange message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ReservedRange message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ReservedRange
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.DescriptorProto.ReservedRange;

                /**
                 * Creates a plain object from a ReservedRange message. Also converts values to other types if specified.
                 * @param message ReservedRange
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.DescriptorProto.ReservedRange, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ReservedRange to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a FieldDescriptorProto. */
        interface IFieldDescriptorProto {

            /** FieldDescriptorProto name */
            name?: (string|null);

            /** FieldDescriptorProto number */
            number?: (number|null);

            /** FieldDescriptorProto label */
            label?: (google.protobuf.FieldDescriptorProto.Label|null);

            /** FieldDescriptorProto type */
            type?: (google.protobuf.FieldDescriptorProto.Type|null);

            /** FieldDescriptorProto typeName */
            typeName?: (string|null);

            /** FieldDescriptorProto extendee */
            extendee?: (string|null);

            /** FieldDescriptorProto defaultValue */
            defaultValue?: (string|null);

            /** FieldDescriptorProto oneofIndex */
            oneofIndex?: (number|null);

            /** FieldDescriptorProto jsonName */
            jsonName?: (string|null);

            /** FieldDescriptorProto options */
            options?: (google.protobuf.IFieldOptions|null);
        }

        /** Represents a FieldDescriptorProto. */
        class FieldDescriptorProto implements IFieldDescriptorProto {

            /**
             * Constructs a new FieldDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldDescriptorProto);

            /** FieldDescriptorProto name. */
            public name: string;

            /** FieldDescriptorProto number. */
            public number: number;

            /** FieldDescriptorProto label. */
            public label: google.protobuf.FieldDescriptorProto.Label;

            /** FieldDescriptorProto type. */
            public type: google.protobuf.FieldDescriptorProto.Type;

            /** FieldDescriptorProto typeName. */
            public typeName: string;

            /** FieldDescriptorProto extendee. */
            public extendee: string;

            /** FieldDescriptorProto defaultValue. */
            public defaultValue: string;

            /** FieldDescriptorProto oneofIndex. */
            public oneofIndex: number;

            /** FieldDescriptorProto jsonName. */
            public jsonName: string;

            /** FieldDescriptorProto options. */
            public options?: (google.protobuf.IFieldOptions|null);

            /**
             * Creates a new FieldDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IFieldDescriptorProto): google.protobuf.FieldDescriptorProto;

            /**
             * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
             * @param message FieldDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldDescriptorProto;

            /**
             * Decodes a FieldDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldDescriptorProto;

            /**
             * Verifies a FieldDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldDescriptorProto;

            /**
             * Creates a plain object from a FieldDescriptorProto message. Also converts values to other types if specified.
             * @param message FieldDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldDescriptorProto {

            /** Type enum. */
            enum Type {
                TYPE_DOUBLE = 1,
                TYPE_FLOAT = 2,
                TYPE_INT64 = 3,
                TYPE_UINT64 = 4,
                TYPE_INT32 = 5,
                TYPE_FIXED64 = 6,
                TYPE_FIXED32 = 7,
                TYPE_BOOL = 8,
                TYPE_STRING = 9,
                TYPE_GROUP = 10,
                TYPE_MESSAGE = 11,
                TYPE_BYTES = 12,
                TYPE_UINT32 = 13,
                TYPE_ENUM = 14,
                TYPE_SFIXED32 = 15,
                TYPE_SFIXED64 = 16,
                TYPE_SINT32 = 17,
                TYPE_SINT64 = 18
            }

            /** Label enum. */
            enum Label {
                LABEL_OPTIONAL = 1,
                LABEL_REQUIRED = 2,
                LABEL_REPEATED = 3
            }
        }

        /** Properties of an OneofDescriptorProto. */
        interface IOneofDescriptorProto {

            /** OneofDescriptorProto name */
            name?: (string|null);

            /** OneofDescriptorProto options */
            options?: (google.protobuf.IOneofOptions|null);
        }

        /** Represents an OneofDescriptorProto. */
        class OneofDescriptorProto implements IOneofDescriptorProto {

            /**
             * Constructs a new OneofDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofDescriptorProto);

            /** OneofDescriptorProto name. */
            public name: string;

            /** OneofDescriptorProto options. */
            public options?: (google.protobuf.IOneofOptions|null);

            /**
             * Creates a new OneofDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneofDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IOneofDescriptorProto): google.protobuf.OneofDescriptorProto;

            /**
             * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
             * @param message OneofDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofDescriptorProto;

            /**
             * Decodes an OneofDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofDescriptorProto;

            /**
             * Verifies an OneofDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofDescriptorProto;

            /**
             * Creates a plain object from an OneofDescriptorProto message. Also converts values to other types if specified.
             * @param message OneofDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumDescriptorProto. */
        interface IEnumDescriptorProto {

            /** EnumDescriptorProto name */
            name?: (string|null);

            /** EnumDescriptorProto value */
            value?: (google.protobuf.IEnumValueDescriptorProto[]|null);

            /** EnumDescriptorProto options */
            options?: (google.protobuf.IEnumOptions|null);
        }

        /** Represents an EnumDescriptorProto. */
        class EnumDescriptorProto implements IEnumDescriptorProto {

            /**
             * Constructs a new EnumDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumDescriptorProto);

            /** EnumDescriptorProto name. */
            public name: string;

            /** EnumDescriptorProto value. */
            public value: google.protobuf.IEnumValueDescriptorProto[];

            /** EnumDescriptorProto options. */
            public options?: (google.protobuf.IEnumOptions|null);

            /**
             * Creates a new EnumDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IEnumDescriptorProto): google.protobuf.EnumDescriptorProto;

            /**
             * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
             * @param message EnumDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumDescriptorProto;

            /**
             * Decodes an EnumDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumDescriptorProto;

            /**
             * Verifies an EnumDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumDescriptorProto;

            /**
             * Creates a plain object from an EnumDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueDescriptorProto. */
        interface IEnumValueDescriptorProto {

            /** EnumValueDescriptorProto name */
            name?: (string|null);

            /** EnumValueDescriptorProto number */
            number?: (number|null);

            /** EnumValueDescriptorProto options */
            options?: (google.protobuf.IEnumValueOptions|null);
        }

        /** Represents an EnumValueDescriptorProto. */
        class EnumValueDescriptorProto implements IEnumValueDescriptorProto {

            /**
             * Constructs a new EnumValueDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueDescriptorProto);

            /** EnumValueDescriptorProto name. */
            public name: string;

            /** EnumValueDescriptorProto number. */
            public number: number;

            /** EnumValueDescriptorProto options. */
            public options?: (google.protobuf.IEnumValueOptions|null);

            /**
             * Creates a new EnumValueDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumValueDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IEnumValueDescriptorProto): google.protobuf.EnumValueDescriptorProto;

            /**
             * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
             * @param message EnumValueDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueDescriptorProto;

            /**
             * Decodes an EnumValueDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueDescriptorProto;

            /**
             * Verifies an EnumValueDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueDescriptorProto;

            /**
             * Creates a plain object from an EnumValueDescriptorProto message. Also converts values to other types if specified.
             * @param message EnumValueDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceDescriptorProto. */
        interface IServiceDescriptorProto {

            /** ServiceDescriptorProto name */
            name?: (string|null);

            /** ServiceDescriptorProto method */
            method?: (google.protobuf.IMethodDescriptorProto[]|null);

            /** ServiceDescriptorProto options */
            options?: (google.protobuf.IServiceOptions|null);
        }

        /** Represents a ServiceDescriptorProto. */
        class ServiceDescriptorProto implements IServiceDescriptorProto {

            /**
             * Constructs a new ServiceDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceDescriptorProto);

            /** ServiceDescriptorProto name. */
            public name: string;

            /** ServiceDescriptorProto method. */
            public method: google.protobuf.IMethodDescriptorProto[];

            /** ServiceDescriptorProto options. */
            public options?: (google.protobuf.IServiceOptions|null);

            /**
             * Creates a new ServiceDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IServiceDescriptorProto): google.protobuf.ServiceDescriptorProto;

            /**
             * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
             * @param message ServiceDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceDescriptorProto;

            /**
             * Decodes a ServiceDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceDescriptorProto;

            /**
             * Verifies a ServiceDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceDescriptorProto;

            /**
             * Creates a plain object from a ServiceDescriptorProto message. Also converts values to other types if specified.
             * @param message ServiceDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodDescriptorProto. */
        interface IMethodDescriptorProto {

            /** MethodDescriptorProto name */
            name?: (string|null);

            /** MethodDescriptorProto inputType */
            inputType?: (string|null);

            /** MethodDescriptorProto outputType */
            outputType?: (string|null);

            /** MethodDescriptorProto options */
            options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming */
            clientStreaming?: (boolean|null);

            /** MethodDescriptorProto serverStreaming */
            serverStreaming?: (boolean|null);
        }

        /** Represents a MethodDescriptorProto. */
        class MethodDescriptorProto implements IMethodDescriptorProto {

            /**
             * Constructs a new MethodDescriptorProto.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodDescriptorProto);

            /** MethodDescriptorProto name. */
            public name: string;

            /** MethodDescriptorProto inputType. */
            public inputType: string;

            /** MethodDescriptorProto outputType. */
            public outputType: string;

            /** MethodDescriptorProto options. */
            public options?: (google.protobuf.IMethodOptions|null);

            /** MethodDescriptorProto clientStreaming. */
            public clientStreaming: boolean;

            /** MethodDescriptorProto serverStreaming. */
            public serverStreaming: boolean;

            /**
             * Creates a new MethodDescriptorProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodDescriptorProto instance
             */
            public static create(properties?: google.protobuf.IMethodDescriptorProto): google.protobuf.MethodDescriptorProto;

            /**
             * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodDescriptorProto message, length delimited. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
             * @param message MethodDescriptorProto message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodDescriptorProto, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodDescriptorProto;

            /**
             * Decodes a MethodDescriptorProto message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodDescriptorProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodDescriptorProto;

            /**
             * Verifies a MethodDescriptorProto message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodDescriptorProto message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodDescriptorProto
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodDescriptorProto;

            /**
             * Creates a plain object from a MethodDescriptorProto message. Also converts values to other types if specified.
             * @param message MethodDescriptorProto
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodDescriptorProto, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodDescriptorProto to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {

            /** FileOptions javaPackage */
            javaPackage?: (string|null);

            /** FileOptions javaOuterClassname */
            javaOuterClassname?: (string|null);

            /** FileOptions javaMultipleFiles */
            javaMultipleFiles?: (boolean|null);

            /** FileOptions javaGenerateEqualsAndHash */
            javaGenerateEqualsAndHash?: (boolean|null);

            /** FileOptions javaStringCheckUtf8 */
            javaStringCheckUtf8?: (boolean|null);

            /** FileOptions optimizeFor */
            optimizeFor?: (google.protobuf.FileOptions.OptimizeMode|null);

            /** FileOptions goPackage */
            goPackage?: (string|null);

            /** FileOptions ccGenericServices */
            ccGenericServices?: (boolean|null);

            /** FileOptions javaGenericServices */
            javaGenericServices?: (boolean|null);

            /** FileOptions pyGenericServices */
            pyGenericServices?: (boolean|null);

            /** FileOptions deprecated */
            deprecated?: (boolean|null);

            /** FileOptions ccEnableArenas */
            ccEnableArenas?: (boolean|null);

            /** FileOptions objcClassPrefix */
            objcClassPrefix?: (string|null);

            /** FileOptions csharpNamespace */
            csharpNamespace?: (string|null);

            /** FileOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFileOptions);

            /** FileOptions javaPackage. */
            public javaPackage: string;

            /** FileOptions javaOuterClassname. */
            public javaOuterClassname: string;

            /** FileOptions javaMultipleFiles. */
            public javaMultipleFiles: boolean;

            /** FileOptions javaGenerateEqualsAndHash. */
            public javaGenerateEqualsAndHash: boolean;

            /** FileOptions javaStringCheckUtf8. */
            public javaStringCheckUtf8: boolean;

            /** FileOptions optimizeFor. */
            public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

            /** FileOptions goPackage. */
            public goPackage: string;

            /** FileOptions ccGenericServices. */
            public ccGenericServices: boolean;

            /** FileOptions javaGenericServices. */
            public javaGenericServices: boolean;

            /** FileOptions pyGenericServices. */
            public pyGenericServices: boolean;

            /** FileOptions deprecated. */
            public deprecated: boolean;

            /** FileOptions ccEnableArenas. */
            public ccEnableArenas: boolean;

            /** FileOptions objcClassPrefix. */
            public objcClassPrefix: string;

            /** FileOptions csharpNamespace. */
            public csharpNamespace: string;

            /** FileOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new FileOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FileOptions instance
             */
            public static create(properties?: google.protobuf.IFileOptions): google.protobuf.FileOptions;

            /**
             * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FileOptions message, length delimited. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
             * @param message FileOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFileOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FileOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FileOptions;

            /**
             * Decodes a FileOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FileOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FileOptions;

            /**
             * Verifies a FileOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FileOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FileOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FileOptions;

            /**
             * Creates a plain object from a FileOptions message. Also converts values to other types if specified.
             * @param message FileOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FileOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FileOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FileOptions {

            /** OptimizeMode enum. */
            enum OptimizeMode {
                SPEED = 1,
                CODE_SIZE = 2,
                LITE_RUNTIME = 3
            }
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {

            /** MessageOptions messageSetWireFormat */
            messageSetWireFormat?: (boolean|null);

            /** MessageOptions noStandardDescriptorAccessor */
            noStandardDescriptorAccessor?: (boolean|null);

            /** MessageOptions deprecated */
            deprecated?: (boolean|null);

            /** MessageOptions mapEntry */
            mapEntry?: (boolean|null);

            /** MessageOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMessageOptions);

            /** MessageOptions messageSetWireFormat. */
            public messageSetWireFormat: boolean;

            /** MessageOptions noStandardDescriptorAccessor. */
            public noStandardDescriptorAccessor: boolean;

            /** MessageOptions deprecated. */
            public deprecated: boolean;

            /** MessageOptions mapEntry. */
            public mapEntry: boolean;

            /** MessageOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new MessageOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MessageOptions instance
             */
            public static create(properties?: google.protobuf.IMessageOptions): google.protobuf.MessageOptions;

            /**
             * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MessageOptions message, length delimited. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
             * @param message MessageOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMessageOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MessageOptions;

            /**
             * Decodes a MessageOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MessageOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MessageOptions;

            /**
             * Verifies a MessageOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MessageOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MessageOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MessageOptions;

            /**
             * Creates a plain object from a MessageOptions message. Also converts values to other types if specified.
             * @param message MessageOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MessageOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MessageOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {

            /** FieldOptions ctype */
            ctype?: (google.protobuf.FieldOptions.CType|null);

            /** FieldOptions packed */
            packed?: (boolean|null);

            /** FieldOptions jstype */
            jstype?: (google.protobuf.FieldOptions.JSType|null);

            /** FieldOptions lazy */
            lazy?: (boolean|null);

            /** FieldOptions deprecated */
            deprecated?: (boolean|null);

            /** FieldOptions weak */
            weak?: (boolean|null);

            /** FieldOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IFieldOptions);

            /** FieldOptions ctype. */
            public ctype: google.protobuf.FieldOptions.CType;

            /** FieldOptions packed. */
            public packed: boolean;

            /** FieldOptions jstype. */
            public jstype: google.protobuf.FieldOptions.JSType;

            /** FieldOptions lazy. */
            public lazy: boolean;

            /** FieldOptions deprecated. */
            public deprecated: boolean;

            /** FieldOptions weak. */
            public weak: boolean;

            /** FieldOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new FieldOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FieldOptions instance
             */
            public static create(properties?: google.protobuf.IFieldOptions): google.protobuf.FieldOptions;

            /**
             * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FieldOptions message, length delimited. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
             * @param message FieldOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IFieldOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.FieldOptions;

            /**
             * Decodes a FieldOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FieldOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.FieldOptions;

            /**
             * Verifies a FieldOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FieldOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FieldOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.FieldOptions;

            /**
             * Creates a plain object from a FieldOptions message. Also converts values to other types if specified.
             * @param message FieldOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.FieldOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FieldOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace FieldOptions {

            /** CType enum. */
            enum CType {
                STRING = 0,
                CORD = 1,
                STRING_PIECE = 2
            }

            /** JSType enum. */
            enum JSType {
                JS_NORMAL = 0,
                JS_STRING = 1,
                JS_NUMBER = 2
            }
        }

        /** Properties of an OneofOptions. */
        interface IOneofOptions {

            /** OneofOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an OneofOptions. */
        class OneofOptions implements IOneofOptions {

            /**
             * Constructs a new OneofOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IOneofOptions);

            /** OneofOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new OneofOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OneofOptions instance
             */
            public static create(properties?: google.protobuf.IOneofOptions): google.protobuf.OneofOptions;

            /**
             * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OneofOptions message, length delimited. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
             * @param message OneofOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IOneofOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.OneofOptions;

            /**
             * Decodes an OneofOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OneofOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.OneofOptions;

            /**
             * Verifies an OneofOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OneofOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OneofOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.OneofOptions;

            /**
             * Creates a plain object from an OneofOptions message. Also converts values to other types if specified.
             * @param message OneofOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.OneofOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OneofOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {

            /** EnumOptions allowAlias */
            allowAlias?: (boolean|null);

            /** EnumOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumOptions);

            /** EnumOptions allowAlias. */
            public allowAlias: boolean;

            /** EnumOptions deprecated. */
            public deprecated: boolean;

            /** EnumOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new EnumOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumOptions instance
             */
            public static create(properties?: google.protobuf.IEnumOptions): google.protobuf.EnumOptions;

            /**
             * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
             * @param message EnumOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumOptions;

            /**
             * Decodes an EnumOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumOptions;

            /**
             * Verifies an EnumOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumOptions;

            /**
             * Creates a plain object from an EnumOptions message. Also converts values to other types if specified.
             * @param message EnumOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {

            /** EnumValueOptions deprecated */
            deprecated?: (boolean|null);

            /** EnumValueOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEnumValueOptions);

            /** EnumValueOptions deprecated. */
            public deprecated: boolean;

            /** EnumValueOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new EnumValueOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns EnumValueOptions instance
             */
            public static create(properties?: google.protobuf.IEnumValueOptions): google.protobuf.EnumValueOptions;

            /**
             * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified EnumValueOptions message, length delimited. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
             * @param message EnumValueOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEnumValueOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.EnumValueOptions;

            /**
             * Decodes an EnumValueOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns EnumValueOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.EnumValueOptions;

            /**
             * Verifies an EnumValueOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an EnumValueOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns EnumValueOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.EnumValueOptions;

            /**
             * Creates a plain object from an EnumValueOptions message. Also converts values to other types if specified.
             * @param message EnumValueOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.EnumValueOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this EnumValueOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ServiceOptions. */
        interface IServiceOptions {

            /** ServiceOptions deprecated */
            deprecated?: (boolean|null);

            /** ServiceOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);
        }

        /** Represents a ServiceOptions. */
        class ServiceOptions implements IServiceOptions {

            /**
             * Constructs a new ServiceOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IServiceOptions);

            /** ServiceOptions deprecated. */
            public deprecated: boolean;

            /** ServiceOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new ServiceOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ServiceOptions instance
             */
            public static create(properties?: google.protobuf.IServiceOptions): google.protobuf.ServiceOptions;

            /**
             * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ServiceOptions message, length delimited. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
             * @param message ServiceOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IServiceOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ServiceOptions;

            /**
             * Decodes a ServiceOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ServiceOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ServiceOptions;

            /**
             * Verifies a ServiceOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ServiceOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ServiceOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ServiceOptions;

            /**
             * Creates a plain object from a ServiceOptions message. Also converts values to other types if specified.
             * @param message ServiceOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ServiceOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ServiceOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a MethodOptions. */
        interface IMethodOptions {

            /** MethodOptions deprecated */
            deprecated?: (boolean|null);

            /** MethodOptions uninterpretedOption */
            uninterpretedOption?: (google.protobuf.IUninterpretedOption[]|null);

            /** MethodOptions .google.api.http */
            ".google.api.http"?: (google.api.IHttpRule|null);
        }

        /** Represents a MethodOptions. */
        class MethodOptions implements IMethodOptions {

            /**
             * Constructs a new MethodOptions.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IMethodOptions);

            /** MethodOptions deprecated. */
            public deprecated: boolean;

            /** MethodOptions uninterpretedOption. */
            public uninterpretedOption: google.protobuf.IUninterpretedOption[];

            /**
             * Creates a new MethodOptions instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MethodOptions instance
             */
            public static create(properties?: google.protobuf.IMethodOptions): google.protobuf.MethodOptions;

            /**
             * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MethodOptions message, length delimited. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
             * @param message MethodOptions message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IMethodOptions, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.MethodOptions;

            /**
             * Decodes a MethodOptions message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MethodOptions
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.MethodOptions;

            /**
             * Verifies a MethodOptions message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MethodOptions message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MethodOptions
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.MethodOptions;

            /**
             * Creates a plain object from a MethodOptions message. Also converts values to other types if specified.
             * @param message MethodOptions
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.MethodOptions, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MethodOptions to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UninterpretedOption. */
        interface IUninterpretedOption {

            /** UninterpretedOption name */
            name?: (google.protobuf.UninterpretedOption.INamePart[]|null);

            /** UninterpretedOption identifierValue */
            identifierValue?: (string|null);

            /** UninterpretedOption positiveIntValue */
            positiveIntValue?: (number|Long|null);

            /** UninterpretedOption negativeIntValue */
            negativeIntValue?: (number|Long|null);

            /** UninterpretedOption doubleValue */
            doubleValue?: (number|null);

            /** UninterpretedOption stringValue */
            stringValue?: (Uint8Array|null);

            /** UninterpretedOption aggregateValue */
            aggregateValue?: (string|null);
        }

        /** Represents an UninterpretedOption. */
        class UninterpretedOption implements IUninterpretedOption {

            /**
             * Constructs a new UninterpretedOption.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IUninterpretedOption);

            /** UninterpretedOption name. */
            public name: google.protobuf.UninterpretedOption.INamePart[];

            /** UninterpretedOption identifierValue. */
            public identifierValue: string;

            /** UninterpretedOption positiveIntValue. */
            public positiveIntValue: (number|Long);

            /** UninterpretedOption negativeIntValue. */
            public negativeIntValue: (number|Long);

            /** UninterpretedOption doubleValue. */
            public doubleValue: number;

            /** UninterpretedOption stringValue. */
            public stringValue: Uint8Array;

            /** UninterpretedOption aggregateValue. */
            public aggregateValue: string;

            /**
             * Creates a new UninterpretedOption instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UninterpretedOption instance
             */
            public static create(properties?: google.protobuf.IUninterpretedOption): google.protobuf.UninterpretedOption;

            /**
             * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UninterpretedOption message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
             * @param message UninterpretedOption message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IUninterpretedOption, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption;

            /**
             * Decodes an UninterpretedOption message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UninterpretedOption
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption;

            /**
             * Verifies an UninterpretedOption message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UninterpretedOption message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UninterpretedOption
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption;

            /**
             * Creates a plain object from an UninterpretedOption message. Also converts values to other types if specified.
             * @param message UninterpretedOption
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.UninterpretedOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UninterpretedOption to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace UninterpretedOption {

            /** Properties of a NamePart. */
            interface INamePart {

                /** NamePart namePart */
                namePart: string;

                /** NamePart isExtension */
                isExtension: boolean;
            }

            /** Represents a NamePart. */
            class NamePart implements INamePart {

                /**
                 * Constructs a new NamePart.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.UninterpretedOption.INamePart);

                /** NamePart namePart. */
                public namePart: string;

                /** NamePart isExtension. */
                public isExtension: boolean;

                /**
                 * Creates a new NamePart instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns NamePart instance
                 */
                public static create(properties?: google.protobuf.UninterpretedOption.INamePart): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified NamePart message, length delimited. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
                 * @param message NamePart message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.UninterpretedOption.INamePart, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a NamePart message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Decodes a NamePart message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns NamePart
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Verifies a NamePart message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a NamePart message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns NamePart
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.UninterpretedOption.NamePart;

                /**
                 * Creates a plain object from a NamePart message. Also converts values to other types if specified.
                 * @param message NamePart
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.UninterpretedOption.NamePart, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this NamePart to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a SourceCodeInfo. */
        interface ISourceCodeInfo {

            /** SourceCodeInfo location */
            location?: (google.protobuf.SourceCodeInfo.ILocation[]|null);
        }

        /** Represents a SourceCodeInfo. */
        class SourceCodeInfo implements ISourceCodeInfo {

            /**
             * Constructs a new SourceCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ISourceCodeInfo);

            /** SourceCodeInfo location. */
            public location: google.protobuf.SourceCodeInfo.ILocation[];

            /**
             * Creates a new SourceCodeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SourceCodeInfo instance
             */
            public static create(properties?: google.protobuf.ISourceCodeInfo): google.protobuf.SourceCodeInfo;

            /**
             * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SourceCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
             * @param message SourceCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ISourceCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo;

            /**
             * Decodes a SourceCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SourceCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo;

            /**
             * Verifies a SourceCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SourceCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SourceCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo;

            /**
             * Creates a plain object from a SourceCodeInfo message. Also converts values to other types if specified.
             * @param message SourceCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.SourceCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SourceCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace SourceCodeInfo {

            /** Properties of a Location. */
            interface ILocation {

                /** Location path */
                path?: (number[]|null);

                /** Location span */
                span?: (number[]|null);

                /** Location leadingComments */
                leadingComments?: (string|null);

                /** Location trailingComments */
                trailingComments?: (string|null);

                /** Location leadingDetachedComments */
                leadingDetachedComments?: (string[]|null);
            }

            /** Represents a Location. */
            class Location implements ILocation {

                /**
                 * Constructs a new Location.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.SourceCodeInfo.ILocation);

                /** Location path. */
                public path: number[];

                /** Location span. */
                public span: number[];

                /** Location leadingComments. */
                public leadingComments: string;

                /** Location trailingComments. */
                public trailingComments: string;

                /** Location leadingDetachedComments. */
                public leadingDetachedComments: string[];

                /**
                 * Creates a new Location instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Location instance
                 */
                public static create(properties?: google.protobuf.SourceCodeInfo.ILocation): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Location message, length delimited. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
                 * @param message Location message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.SourceCodeInfo.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Location message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Decodes a Location message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Location
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Verifies a Location message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Location message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Location
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.SourceCodeInfo.Location;

                /**
                 * Creates a plain object from a Location message. Also converts values to other types if specified.
                 * @param message Location
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.SourceCodeInfo.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Location to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }

        /** Properties of a GeneratedCodeInfo. */
        interface IGeneratedCodeInfo {

            /** GeneratedCodeInfo annotation */
            annotation?: (google.protobuf.GeneratedCodeInfo.IAnnotation[]|null);
        }

        /** Represents a GeneratedCodeInfo. */
        class GeneratedCodeInfo implements IGeneratedCodeInfo {

            /**
             * Constructs a new GeneratedCodeInfo.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IGeneratedCodeInfo);

            /** GeneratedCodeInfo annotation. */
            public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

            /**
             * Creates a new GeneratedCodeInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GeneratedCodeInfo instance
             */
            public static create(properties?: google.protobuf.IGeneratedCodeInfo): google.protobuf.GeneratedCodeInfo;

            /**
             * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GeneratedCodeInfo message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
             * @param message GeneratedCodeInfo message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IGeneratedCodeInfo, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo;

            /**
             * Decodes a GeneratedCodeInfo message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GeneratedCodeInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo;

            /**
             * Verifies a GeneratedCodeInfo message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GeneratedCodeInfo message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GeneratedCodeInfo
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo;

            /**
             * Creates a plain object from a GeneratedCodeInfo message. Also converts values to other types if specified.
             * @param message GeneratedCodeInfo
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.GeneratedCodeInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GeneratedCodeInfo to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        namespace GeneratedCodeInfo {

            /** Properties of an Annotation. */
            interface IAnnotation {

                /** Annotation path */
                path?: (number[]|null);

                /** Annotation sourceFile */
                sourceFile?: (string|null);

                /** Annotation begin */
                begin?: (number|null);

                /** Annotation end */
                end?: (number|null);
            }

            /** Represents an Annotation. */
            class Annotation implements IAnnotation {

                /**
                 * Constructs a new Annotation.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation);

                /** Annotation path. */
                public path: number[];

                /** Annotation sourceFile. */
                public sourceFile: string;

                /** Annotation begin. */
                public begin: number;

                /** Annotation end. */
                public end: number;

                /**
                 * Creates a new Annotation instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Annotation instance
                 */
                public static create(properties?: google.protobuf.GeneratedCodeInfo.IAnnotation): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Annotation message, length delimited. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
                 * @param message Annotation message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: google.protobuf.GeneratedCodeInfo.IAnnotation, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Annotation message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Decodes an Annotation message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Annotation
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Verifies an Annotation message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Annotation message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Annotation
                 */
                public static fromObject(object: { [k: string]: any }): google.protobuf.GeneratedCodeInfo.Annotation;

                /**
                 * Creates a plain object from an Annotation message. Also converts values to other types if specified.
                 * @param message Annotation
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: google.protobuf.GeneratedCodeInfo.Annotation, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Annotation to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace api. */
    namespace api {

        /** Properties of a Http. */
        interface IHttp {

            /** Http rules */
            rules?: (google.api.IHttpRule[]|null);
        }

        /** Represents a Http. */
        class Http implements IHttp {

            /**
             * Constructs a new Http.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttp);

            /** Http rules. */
            public rules: google.api.IHttpRule[];

            /**
             * Creates a new Http instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Http instance
             */
            public static create(properties?: google.api.IHttp): google.api.Http;

            /**
             * Encodes the specified Http message. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Http message, length delimited. Does not implicitly {@link google.api.Http.verify|verify} messages.
             * @param message Http message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Http message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.Http;

            /**
             * Decodes a Http message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Http
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.Http;

            /**
             * Verifies a Http message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Http message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Http
             */
            public static fromObject(object: { [k: string]: any }): google.api.Http;

            /**
             * Creates a plain object from a Http message. Also converts values to other types if specified.
             * @param message Http
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.Http, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Http to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a HttpRule. */
        interface IHttpRule {

            /** HttpRule get */
            get?: (string|null);

            /** HttpRule put */
            put?: (string|null);

            /** HttpRule post */
            post?: (string|null);

            /** HttpRule delete */
            "delete"?: (string|null);

            /** HttpRule patch */
            patch?: (string|null);

            /** HttpRule custom */
            custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule selector */
            selector?: (string|null);

            /** HttpRule body */
            body?: (string|null);

            /** HttpRule additionalBindings */
            additionalBindings?: (google.api.IHttpRule[]|null);
        }

        /** Represents a HttpRule. */
        class HttpRule implements IHttpRule {

            /**
             * Constructs a new HttpRule.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.IHttpRule);

            /** HttpRule get. */
            public get: string;

            /** HttpRule put. */
            public put: string;

            /** HttpRule post. */
            public post: string;

            /** HttpRule delete. */
            public delete: string;

            /** HttpRule patch. */
            public patch: string;

            /** HttpRule custom. */
            public custom?: (google.api.ICustomHttpPattern|null);

            /** HttpRule selector. */
            public selector: string;

            /** HttpRule body. */
            public body: string;

            /** HttpRule additionalBindings. */
            public additionalBindings: google.api.IHttpRule[];

            /** HttpRule pattern. */
            public pattern?: ("get"|"put"|"post"|"delete"|"patch"|"custom");

            /**
             * Creates a new HttpRule instance using the specified properties.
             * @param [properties] Properties to set
             * @returns HttpRule instance
             */
            public static create(properties?: google.api.IHttpRule): google.api.HttpRule;

            /**
             * Encodes the specified HttpRule message. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified HttpRule message, length delimited. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
             * @param message HttpRule message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.IHttpRule, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a HttpRule message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.HttpRule;

            /**
             * Decodes a HttpRule message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns HttpRule
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.HttpRule;

            /**
             * Verifies a HttpRule message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a HttpRule message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns HttpRule
             */
            public static fromObject(object: { [k: string]: any }): google.api.HttpRule;

            /**
             * Creates a plain object from a HttpRule message. Also converts values to other types if specified.
             * @param message HttpRule
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.HttpRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this HttpRule to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CustomHttpPattern. */
        interface ICustomHttpPattern {

            /** CustomHttpPattern kind */
            kind?: (string|null);

            /** CustomHttpPattern path */
            path?: (string|null);
        }

        /** Represents a CustomHttpPattern. */
        class CustomHttpPattern implements ICustomHttpPattern {

            /**
             * Constructs a new CustomHttpPattern.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.api.ICustomHttpPattern);

            /** CustomHttpPattern kind. */
            public kind: string;

            /** CustomHttpPattern path. */
            public path: string;

            /**
             * Creates a new CustomHttpPattern instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CustomHttpPattern instance
             */
            public static create(properties?: google.api.ICustomHttpPattern): google.api.CustomHttpPattern;

            /**
             * Encodes the specified CustomHttpPattern message. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CustomHttpPattern message, length delimited. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
             * @param message CustomHttpPattern message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.api.ICustomHttpPattern, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.api.CustomHttpPattern;

            /**
             * Decodes a CustomHttpPattern message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CustomHttpPattern
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.api.CustomHttpPattern;

            /**
             * Verifies a CustomHttpPattern message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CustomHttpPattern message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CustomHttpPattern
             */
            public static fromObject(object: { [k: string]: any }): google.api.CustomHttpPattern;

            /**
             * Creates a plain object from a CustomHttpPattern message. Also converts values to other types if specified.
             * @param message CustomHttpPattern
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.api.CustomHttpPattern, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CustomHttpPattern to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
