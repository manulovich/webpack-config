const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const OUTPUT_DIR = 'dist';

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './scripts/app.ts'
    },
    output: {
        filename: 'scripts/[name].js', // '[name].[contenthash].js'
        path: path.resolve(__dirname, OUTPUT_DIR),
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        static: {
            directory: path.join(__dirname, OUTPUT_DIR),
        },
        compress: true,
        port: 3000,
        watchFiles: ['src/**/*'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './assets',
                    to: path.resolve(__dirname, `./${OUTPUT_DIR}/assets`)
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}