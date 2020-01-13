const path = require('path');

module.exports = {
    tsconfig: {
        compilerOptions: {
            declaration: true
        }
    },
    // https://github.com/multiformats/js-cid/issues/96
    webpack: {
        resolve: {
            alias: {
                'multicodec/src/base-table': path.dirname(
                    require.resolve('multicodec/src/base-table.json')
                )
            }
        },
    },
    depCheck: {
        ignore: ['mocha', '@types/*', 'tasegir']
    }
}
