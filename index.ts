import { encodeTimeIdentity } from './src/services/encoder';
import { decodeTimeIdentity } from './src/services/decoder';

const base64EncodedString = encodeTimeIdentity('372c4670-77e2-4e36-b282-0015fdaf1eb2');

console.log('base64', base64EncodedString);

const decodedString = decodeTimeIdentity(base64EncodedString);

console.log('decoded', decodedString);