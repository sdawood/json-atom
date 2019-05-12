const {identity, get, mod, set, matching, always} = require('shades');

const {parse} = require('./parser');
// const {data, simple: {one: {path: simplePathOne, ast: simpleASTOne}}} = require('../.sandbox/asts.data');

/**
 * Given Expression = [
    //     {
    //         "expression": {
    //             "type": "string_literal",
    //             "value": "home"
    //         }
    //     },
    //     {
    //         "expression": {
    //             "type": "string_literal",
    //             "value": "mobile"
    //         }
    //     }
 // ];
 *
 * composes: matching({home: always(true), mobile: always(true)}))
 * @param unionExpression
 * @return {Traversal<HasKey<[*]>> | Traversal<any> | Traversal<HasPattern<any>>}
 */
const select = unionExpression =>
    matching(unionExpression.reduce(
        (acc, expression) => {
            acc[expression.value] = always(true);
            return acc;
        },
        {}
    ));


const actors = {
    'member-child-identifier': identity,
    'subscript-child-string_literal': identity,
    'subscript-child-numeric_literal': identity,
    'subscript-child-union': value => select(value)
};

const createLense = ({operation, scope, expression}) => actors[`${operation}-${scope}-${expression.type}`](expression.value);

const astToLenses = ast => ast.reduce((lenses, step) => {
    const newLense = createLense(step);
    lenses.push(newLense);
    return lenses;
}, []);

const toLenses = path => astToLenses(parse(path).slice(1)); // drop the $.root node

// const simpleOneLenses = evalPath('$.user.contact.home.number');
// console.log(get(...simpleOneLenses)(data));
// console.log(JSON.stringify(mod(...simpleOneLenses)(x => 2000)(data), null, 2));
// console.log(JSON.stringify(set(...simpleOneLenses)(3000)(data), null, 2));
// console.log(JSON.stringify(data, null, 2));

// const simpleOneLenses = evalPath('$.user.posts[0].content');
// console.log(get(...simpleOneLenses)(data));
// console.log(JSON.stringify(mod(...simpleOneLenses)(x => 2000)(data), null, 2));
// console.log(JSON.stringify(set(...simpleOneLenses)(3000)(data), null, 2));
// console.log(JSON.stringify(data, null, 2));

module.exports = {
    toLenses
};
