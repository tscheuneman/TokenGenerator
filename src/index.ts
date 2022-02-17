import { encodeTimeIdentity, toBase64 } from './services/encoder';
import { decodeTimeIdentity, decodeBase64 } from './services/decoder';
import { generateHash } from './services/crypto';

class TokenGenerator {
    private secret: string;
    constructor(secret: string) {
        this.secret = secret;
    }

    sign(identity: string, data: any) {
        const encoded = this.encode(identity, data);
        return toBase64(`${generateHash(this.secret, identity)}:${encoded}`);
    }

    encode(identity: string, data: any): string {
        const dateIdentity = encodeTimeIdentity(identity);
        const encodedData = toBase64(JSON.stringify(data));

        return toBase64(`${dateIdentity}:${encodedData}`);
    }

    decode(token: string, identity: string) {
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