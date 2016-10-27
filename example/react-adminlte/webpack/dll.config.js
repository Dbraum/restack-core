var webpack = require('webpack');
var path = require('path');


var pkg = require('../package.json')
var vendors = []
for (var i in pkg.dependencies) {
	if (i !== "express") {
		vendors.push(i)
	}
}
console.info(vendors)
module.exports = {
	entry: {
		vendor: vendors
	},
	output: {
		path: './build',
		filename: '[name].dll.js',
		library: '[name]_[hash]'
	},
	devtool: '#source-map',

	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, '../build', '[name]-manifest.json'),
			name: '[name]_[hash]',
			context: path.join(__dirname)
		}),
	],
};

