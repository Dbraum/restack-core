var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname,"..");
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
module.exports= {
	entry: [
		// necessary for hot reloading with IE:
		'eventsource-polyfill',
		// listen to code updates emitted by hot middleware:
		'webpack-hot-middleware/client',
		// your code:
		'./src/index'
	],
	context: path.resolve(__dirname, '..'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	devtool: 'eval-source-map',
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
				loaders: ['style', 'css'],
			},
			{test: /\.eot(\?\w+)?/, loader: 'url?limit=5000'}, // 'file' ?
			{test: /\.(woff|woff2)(\?\w+)?/, loader: 'url?limit=5000&mimetype=application/font-woff'},
			{test: /\.ttf(\?\w+)?/, loader: 'url?limit=5000&mimetype=application/octet-stream'},
			{test: /\.svg(\?\w+)?/, loader: 'url?limit=5000&mimetype=image/svg+xml'},
			{test: /\.(png|jpg|gif)$/, loader: 'url?limit=25000'}
		]
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DllReferencePlugin({
			context: path.join(__dirname),
			manifest: require('../build/vendor-manifest.json')
		}),

		new AddAssetHtmlPlugin({
			filepath: require.resolve('../build/vendor.dll.js'),
			includeSourcemap: true
		}),
		new HtmlwebpackPlugin({
			title: 'My first react app',
			template: './src/assets/index.html', // Load a custom template
			inject: 'body' // Inject all scripts into the body
		}),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__SERVER__: false,
			__DEVELOPMENT__: true,
			__DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
		}),
	]
}