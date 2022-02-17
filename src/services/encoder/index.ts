import { stringToArrayBuffer }  from '../../utils/string';
import { numberToArrayBuffer } from '../../utils/number';

export const encodeTimeIdentity = (identity: string) => {    
    const dateBuffer = numberToArrayBuffer(Date.now());

    const identityBuffer = stringToArrayBuffer(identity);

    const dateIdentityBuffer = new Uint8Array(dateBuffer.byteLength + identityBuffer.byteLength);
    dateIdentityBuffer.set(new Uint8Array(dateBuffer), 0);
    dateIdentityBuffer.set(new Uint8Array(identityBuffer), dateBuffer.byteLength);


    return Buffer.from(dateIdentityBuffer).toString('base64');
}

export const toBase64 = (data: string) => {
    return Buffer.from(data, 'utf-8').toString('base64');
}
