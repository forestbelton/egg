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
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    'pegjs-loader'
                ]
            },
            {
                test: /\.purs$/,
                exclude: /node_modules/,
                loader: 'purs-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]
};
