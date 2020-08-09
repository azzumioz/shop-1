const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/static/app.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./src/public")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/static',
                    to: '',
                    globOptions: {
                        ignore: [
                            "*.jsx"
                        ],
                    },
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react'],
                    }
                }
            }
        ]
    },
};
