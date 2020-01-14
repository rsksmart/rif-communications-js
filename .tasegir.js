const path = require('path');

module.exports = {
    tsconfig: {
        compilerOptions: {
            declaration: true
        }
    },
    depCheck: {
        ignore: ['mocha', '@types/*', 'tasegir']
    }
}
