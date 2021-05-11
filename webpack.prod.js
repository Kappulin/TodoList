const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebPackPlugin = require('css-minimizer-webpack-plugin');
const TerserMinimizerWebPackPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:
                    [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
            },
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
        filename: 'main.[contenthash].js',
        clean: true
    },
    optimization: {
        // minimize: false,
        minimizer:
            [
                new CssMinimizerWebPackPlugin(),
                new TerserMinimizerWebPackPlugin()
            ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets/', noErrorOnMissing: true }
            ]
        })
    ]
}