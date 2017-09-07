var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.pegjs$/,
                loader: 'pegjs-loader'
            }
        ]
    }
};
