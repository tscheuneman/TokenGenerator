import { arrayBufferToString }  from '../../utils/string';
import { arrayBuffertoNumber } from '../../utils/number';
import { DecodeTimeIdentityResults } from './types';


export const decodeTimeIdentity = (token: string): DecodeTimeIdentityResults => {

    const tokenBuffer = Buffer.from(token, 'base64');

    const decodedDate = new Uint8Array(8);
    decodedDate.set(tokenBuffer.slice(0, 7));

    const decodedUuid = new Uint8Array(tokenBuffer.byteLength - 8);
    decodedUuid.set(tokenBuffer.slice(8));

    return {
        datetime: arrayBuffertoNumber(decodedDate.buffer),
        identity: arrayBufferToString(decodedUuid)
    }
}


