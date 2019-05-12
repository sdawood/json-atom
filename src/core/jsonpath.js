const jp = require('jsonpath/jsonpath.min');
// const {curry} = require('it-curry'); // one-time-use curried functions! intersting but not useful here
const {identity, get: get_, set: set_, mod} = require('shades');

const {toLenses} = require('./evaluate');

const value = path => modifier => data => mod(...toLenses(path))(modifier ? modifier : identity)(data);
const get = path => data => get_(...toLenses(path))(data);
const set = path => value => data => set_(...toLenses(path))(value)(data);
const query = path => data => jp.query(data, path);

const favorCurry = true;

const $interface = {
    value,
    apply: value,
    get,
    set,
    query
};

// const getIterface = ({curryAll = favorCurry} = {}) => ({
//     value: curryAll ? curry(value) : value,
//     valueFor: curryAll ? value : curry(value),
//     get: curryAll ? curry(get) : get,
//     getFor: curryAll ? get : curry(get),
//     set: curryAll ? curry(set) : set,
//     setFor: curryAll ? set : curry(set),
//     query: curryAll ? curry(query) : query,
//     queryFor: curryAll ? query : curry(query)
// });

module.exports = {
    ...$interface,
    // ...getIterface(),
    // getIterface
};
