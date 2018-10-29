const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.base.config');

const prodConfiguration = env => {
    return merge([
        {
            optimization: {
                runtimeChunk: 'single',
                minimizer: [new UglifyJsPlugin()],
            },
            plugins: [

            ],
        },
    ]);
};

module.exports = env => {
    return merge(baseConfig(env), prodConfiguration(env));
};