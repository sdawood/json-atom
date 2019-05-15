const {get, set, apply, query} = require('./core/jsonpath');
const {catcher} = require('./core/virtual/accessors');

module.exports = {
    get,
    set,
    apply,
    query,
    catcher
};
