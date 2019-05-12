const jp = require('jsonpath/jsonpath.min');

module.exports = {
    parse: jp.parse.bind(jp)
};
