const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebPackPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    module: {
        rules: [

            {
                test: /styles\.css$/i,
                use:
                    [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]

            }, {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use:
                    [
                        'style-loader',
                        'css-loader'
                    ]

            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ],
            }
        ]
    },
    output: {

        clean: true
    },
    optimization: {
        // minimize: false,
        minimizer: [new CssMinimizerWebPackPlugin()]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/' }
            ]
        })
    ]
}