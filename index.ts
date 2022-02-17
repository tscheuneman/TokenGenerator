import TokenGenerator from './src/index';

const tokenGen = new TokenGenerator('secret');

const base64EncodedString = tokenGen.sign('372c4670-77e2-4e36-b282-0015fdaf1eb2', { test: 'one', other: 'two' });

console.log(base64EncodedString);

const decoded = tokenGen.decode(base64EncodedString, '372c4670-77e2-4e36-b282-0015fdaf1eb2');

console.log(decoded);