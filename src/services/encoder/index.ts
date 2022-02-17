import { stringToArrayBuffer }  from '../../utils/string';
import { numberToArrayBuffer } from '../../utils/number';

export const encodeTimeIdentity = (identity: string) => {    
    const dateBuffer = numberToArrayBuffer(Date.now());

    const identityBuffer = stringToArrayBuffer(identity);

    const theFinal = new Uint8Array(dateBuffer.byteLength + identityBuffer.byteLength);
    theFinal.set(new Uint8Array(dateBuffer), 0);
    theFinal.set(new Uint8Array(identityBuffer), dateBuffer.byteLength);


    return Buffer.from(theFinal).toString('base64');
}

