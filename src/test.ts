import TokenGenerator from '.';

describe('Tests for inital classes', () => {

    const generator = new TokenGenerator('secret');

    it('Should Encode a token', () => {
        const token = generator.sign('test', 'data');
        expect(token).toBeTruthy();
    });

    it('Should Encode and Decode a token', () => {
        const token = generator.sign('test', 'data');
        const decoded = generator.verify(token, 'test');

        expect(decoded).toBe('data');
    });

    it('Should Encode and fail to decode with an inproper identity', () => {
        const token = generator.sign('test', 'data');

        expect(() => generator.verify(token, 'test2')).toThrow();
    });

    it('Should Encode and fail to decode with an inproper identity', () => {
        generator.verify(undefined, 'test2');
        expect(() => generator.verify('test-token', 'test2')).toThrow();
    });
});