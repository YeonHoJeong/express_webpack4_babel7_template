const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const APP_DIR = path.resolve(__dirname, "../bin/index.js");


module.exports = env => {
    const {PLATFORM, VERSION} = env;
    return merge([
        {
            entry:['@babel/polyfill', APP_DIR], // THIS IS JUST GIVING OUR WEBPACK 2 ENTRY POINT BABEL-POLYFILL AND SRC; BABEL-POLYFILL USES custom regenerator runtime and core-js.WHICH RUNS THE ASYNC AWAIT COMMANDS
            output:{
              filename :'index.js'
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                    },
                ]
            },
            plugins:[
                new webpack.DefinePlugin({
                    'process.env.VERSION': JSON.stringify(env.VERSION),
                    'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
                }),
            ],
            target : 'node',
            externals : [nodeExternals()]
        }
    ])

};