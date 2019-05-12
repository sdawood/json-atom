const {get, set, value, query} = require('./jsonpath');

const data = {
    user: {
        contact: {
            home: {
                number: 11111
            }, mobile: {
                number: 22222
            }
        },
        posts: [
            {content: 'Hello World!', likes: 10},
            {content: 'Goodbye World!', likes: 1}
        ]
    }
};

describe('get set mod', () => {
    it('get simple path', () => {
        const result = get('$.user.contact.home.number')(data);
        const expectedResult = data.user.contact.home.number;
        expect(result).toEqual(expectedResult);
    });
    it('set simple path', () => {
        const result = set('$.user.contact.home.number')(99999)(data);
        expect(result !== data).toBeTruthy();
    });

    it('uses structural sharing, which is a typical behavior of immutable lenses', () => {
        const result = set('$.user.contact.home.number')(99999)(data);
        expect(result !== data).toBeTruthy();
        result.user.contact.mobile.number = 'SHARED_REFERENCE';
        expect(data.user.contact.mobile.number).toEqual('SHARED_REFERENCE');
    });

    it('get branching path', () => {
        const result = get('$.user.contact["home","mobile"].number')(data);
        const expectedResult = {home: data.user.contact.home.number, mobile: data.user.contact.mobile.number};
        expect(result).toEqual(expectedResult);
    });

    it('set branching path', () => {
        const result = set('$.user.contact["home","mobile"].number')(99999)(data);
        expect(result.user.contact.home.number).toEqual(result.user.contact.mobile.number);
        expect(result.user.contact.home.number).toEqual(99999);
    });
});
