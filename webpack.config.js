const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    externals: {
        JSDOM: 'JSDOM'
    },
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        port: 9000,
        devMiddleware: {
            writeToDisk: true
        },
        static: {
            directory: path.resolve(__dirname)
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                "index.html",
                {from: "res/", to: "res/"},
                {from: "img/", to: "img/"}
            ],
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|bmp|wav|mp3)$/,
                type: 'asset/resource'
            }
        ]
    }
}