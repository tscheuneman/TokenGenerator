import { encodeTimeIdentity, toBase64 } from './services/encoder';
import { decodeTimeIdentity, decodeBase64 } from './services/decoder';
import { generateHash } from './services/crypto';

import { TokenGeneratorOptions } from './types';

const defaults: TokenGeneratorOptions = {
    timeValidMs: (1000 * 60) * 60
}

class TokenGenerator {
    private secret: string;
    private options: TokenGeneratorOptions;

    constructor(secret: string, options?: TokenGeneratorOptions) {
        this.secret = secret;
        this.options = {
            ...defaults,
            ...options
        };
    }

    sign(identity: string, data: any) {
        const encoded = this.encode(identity, data);
        return toBase64(`${generateHash(this.secret, identity)}:${encoded}`);
    }

    verify(token: string, identity: string) {
        if(!token) {
            throw Error('Token is Invalid');
        } 
        const {dateIdentity, data} = this.decode(token, identity);
        if(Date.now() <= dateIdentity.datetime + this.options.timeValidMs) {
            return data;
        } else {
            throw Error('Token is expired');
        }
    }

    private encode(identity: string, data: any): string {
        const dateIdentity = encodeTimeIdentity(identity);
        const encodedData = toBase64(JSON.stringify(data));

        return toBase64(`${dateIdentity}:${encodedData}`);
    }

    private decode(token: string, identity: string) {
        const decodedToken = decodeBase64(token);
        const [signature, encodedToken] = decodedToken.split(':');
        if(signature === generateHash(this.secret, identity)) {
            const [encodedDateIdentity, encodedData] = decodeBase64(encodedToken).split(':');
            const dateIdentity = decodeTimeIdentity(encodedDateIdentity);
            const data = JSON.parse(decodeBase64(encodedData));

            return {
                dateIdentity,
                data
            }

        } else {
            throw new Error('Error, could not verify identity');
        }
    }
}

export default TokenGenerator;