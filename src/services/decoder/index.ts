import { arrayBufferToString }  from '../../utils/string';
import { arrayBuffertoNumber } from '../../utils/number';
import { DecodeTimeIdentityResults } from './types';

import { DATE_BYTES } from './constants';

export const decodeTimeIdentity = (token: string): DecodeTimeIdentityResults => {

    const tokenBuffer = Buffer.from(token, 'base64');

    const decodedDate = new Uint8Array(DATE_BYTES);
    decodedDate.set(tokenBuffer.slice(0, DATE_BYTES-1));

    const decodedUuid = new Uint8Array(tokenBuffer.byteLength - DATE_BYTES);
    decodedUuid.set(tokenBuffer.slice(DATE_BYTES));

    return {
        datetime: arrayBuffertoNumber(decodedDate.buffer),
        identity: arrayBufferToString(decodedUuid)
    }
}

export const decodeBase64 = (str: string): string => {
    return Buffer.from(str, 'base64').toString('utf-8');
}

