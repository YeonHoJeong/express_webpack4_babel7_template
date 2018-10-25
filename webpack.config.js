//webpack 설정파일

module.exports = {
    module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_module/,
            use: {
                loader: "babel-loader",
            }
        },
        ]
    }
};