var path = require('path');
var webpack = require('webpack');

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
                use: [
                    'babel-loader',
                    'pegjs-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
