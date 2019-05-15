const F = require('functional-pipelines');

const {get: getPath, set: setPath} = require('../../index');

const catcher = function (keys) {
    const setInto = self => path => value => setPath(path[0] === '$' ? path : `$.${path}`)(value)(self);
    const getFrom = self => path => getPath(path[0] === '$' ? path : `$.${path}`)(self);

    return {
        ['___KEYS']() {
            return keys;
        },
        //
        [`get___`](newValues) {
            if (newValues === undefined) {
                const getter = getFrom(this);
                const ___keys = this.___KEYS();
                console.log(`GET-ATTR::${___keys}`);
                return ___keys.map(k => (console.log('<< K::', k), console.log('<< V::', getter(k)), getter(k)));
            } else {
                const setter = setInto(this);
                const ___keys = this.___KEYS();

                const reducingFn = ({revisionSetter, value}, [k, nV]) => {
                    const newRevision = revisionSetter(k)(nV);
                    return {revisionSetter: setInto(newRevision), value: newRevision};
                };
                const initFn = () => ({revisionSetter: setInto(this)});
                const enumerable = F.zip(___keys, newValues);
                const resultFn = x => x.value;


                const revisions = F.reduce(reducingFn, initFn, enumerable, resultFn);
                //
                // const revisions = F.map(
                //     ([k, nV]) => (console.log('>> K::', k), console.log('>> V::', nV), setter(k)(nV)),
                //     F.zip(___keys, newValues));
                console.log(`SET-ATTR::${___keys} ---> ${JSON.stringify(newValues, null, 0)}`);
                return revisions;
            }
        }
    };
};

module.exports = {
    catcher
};
