const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')

require('dotenv').config()

const mode = process.env.NODE_ENV
const isDev = mode === 'development'

const plugins = [
	new Dotenv(),
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({
		template: './src/index.html',
		minify: {
			collapseWhitespace: !isDev,
			removeComments: !isDev
		}
	}),
	new MiniCssExtractPlugin({
		filename: isDev ? '[name].css' : '[name].[contenthash].css'
	}),
	new CopyPlugin({
		patterns: [
			{
				from: path.resolve(__dirname, 'public'),
				to: path.resolve(__dirname, 'dist/public')
			}
		]
	})
]

module.exports = {
	mode,
	entry: path.resolve(__dirname, './src/app.ts'),
	output: {
		filename: isDev ? '[name].js' : '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'public/[name].[contenthash][ext][query]'
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, 'src/')
		}
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 7000,
		hot: true,
		static: {
			directory: path.join(__dirname, 'public')
		},
		historyApiFallback: true
	},
	optimization: {
		minimize: !isDev,
		minimizer: [
			new CssMinimizerPlugin(),
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					format: {
						comments: false
					}
				}
			})
		]
	},
	plugins,
	module: {
		rules: [
			{
				test: /\.[cm]?ts$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript']
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.html$/i,
				loader: 'html-loader'
			},
			{
				test: /\.module\.scss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[local]_[hash:base64:7]'
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /^((?!\.module).)*scss$/i,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			}
		]
	}
}
