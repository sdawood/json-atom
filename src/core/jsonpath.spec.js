const {get, set, value, query} = require('./jsonpath');

const data = {
    a1: {b1: {c1: {value: 'Hello World!'}}},
    a2: {b2: {c2: {value: 'Goodbye World!'}}}
};

describe('scenario: curried jsonpath interface', () => {
    it('works: get', () => {
        const result = get('$.a1.b1.c1.value')(data);
        const expectedResult = data.a1.b1.c1.value;
        expect(result).toEqual(expectedResult);
    });
});