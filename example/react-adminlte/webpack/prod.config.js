var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname, "..");
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		index: './src/index'
	},
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	//enable dev server
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true
	},
	//babel重要的loader在这里
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include: APP_PATH
			},
			{
				test: /\.js?$/,
				loader: 'babel',
				include: APP_PATH
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader","css-loader")
			},
			{test: /\.eot(\?\w+)?/, loader: 'url?limit=5000'}, // 'file' ?
			{test: /\.(woff|woff2)(\?\w+)?/, loader: 'url?limit=5000&mimetype=application/font-woff'},
			{test: /\.ttf(\?\w+)?/, loader: 'url?limit=5000&mimetype=application/octet-stream'},
			{test: /\.svg(\?\w+)?/, loader: 'url?limit=5000&mimetype=image/svg+xml'},
			{test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000'}
		]
	},
	plugins: [
		new CleanPlugin([BUILD_PATH], {root: ROOT_PATH}),
		new ExtractTextPlugin("styles.css"),
		new HtmlwebpackPlugin({
			title: 'My first react app',
			template: './src/assets/index.html', // Load a custom template
			inject: 'body' // Inject all scripts into the body
		}),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: false,
			__DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
		}),

		// optimizations
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
	]
}