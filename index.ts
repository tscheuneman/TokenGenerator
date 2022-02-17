import TokenGenerator from './src/index';

(async () => {

    const tokenGen = new TokenGenerator('sdfsdfsdafsdfsdfsfsfsdfsdf');

    const base64EncodedString = tokenGen.sign('dddddssss', { test: 'one', other: 'two' });
    
    console.log(base64EncodedString);

    const decoded = tokenGen.verify(base64EncodedString, 'dddddssss');
    
    console.log(decoded);

})();

