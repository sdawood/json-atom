const {set, get, apply} = require('../jsonpath');

const getHEAD = ref => ref.$refs && ref.$refs.length ? ref.$refs.slice(-1).pop() : ref.state;
const commit = ref => newVersion => {
    if (ref.$refs) {
        ref.$refs.push(newVersion);
        return ref.$refs.length;
    }
};

const defineProperty = (ref, name, {
    // value = null,
    writable = false,
    enumerable = true,
    configurable = false,
    getPath = `$.${name}`,
    setPath = getPath
} = {}) => {
    console.log(`defineProperty(${ref}, ${name})`);
    ref.$refs = ref.$refs ||  [];
    ref.state = ref.state || {};

    const descriptor = {
        // value = null,// accessor descriptor has no writable attr
        // writable, // accessor descriptor has no writable attr
        enumerable,
        configurable,
        get() {
            const HEAD = getHEAD(ref);
            console.log(JSON.stringify(HEAD));
            console.log(`get(${getPath})`);
            return get(getPath)(HEAD);
        },
        set(newValue) {
            const HEAD = getHEAD(ref);
            console.log(`set(${getPath})`);
            const commitId = commit(ref)(set(setPath)(newValue)(HEAD));
            console.log(`Created commit: [${commitId}]`);
        }
    };
    ref.state = {...ref.state, [name]: undefined};
    Object.defineProperty(ref, name, descriptor);
};


const test = {};
// defineProperty(test, 'version');
// console.log(test.version);
// test.version = '1';
// console.log(test.version);
// console.log(test.$refs);
// test.version = '2';
// console.log(test.version);
// console.log(test.$refs);

// defineProperty(test, 'balance');
// console.log(test.balance);
// test.balance = '1';
// console.log(test.balance);
// console.log(test.$refs);
// test.balance = '2';
// console.log(test.balance);
// console.log(test.$refs);

// defineProperty(test, 'contact.firstName');
// console.log(test['contact.firstName']);
// test['contact.firstName'] = '1';
// console.log(test['contact.firstName']);
// console.log(test.$refs);
// test['contact.firstName'] = '2';
// console.log(test['contact.firstName']);
// console.log(test.$refs);

// Property Descriptors and shallow copying
defineProperty(test, 'balance');
console.log(test.balance);
test.balance = '1';
console.log(test.balance);
console.log(test.$refs);
console.log('shallow copy');
const test2 = {...test};
console.log('new ref lost the descriptors');
console.log(test2.balance);
// test2.balance = '3';
// console.log(test2.balance);
// console.log(test2.$refs);
