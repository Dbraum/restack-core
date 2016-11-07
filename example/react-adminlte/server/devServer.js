var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../webpack/dev.config');
var app = express();
var compiler = webpack(config);
var proxy=require('http-proxy-middleware')
app.use(this.middleware = require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	headers: { "X-Custom-Header": "yes" },
	stats: {
		colors: true
	},
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// 通常用于加载静态资源
app.use(express.static(__dirname + '/assets'))

// Proxy api requests
app.use('/:module/api', proxy({ target: "http://115.28.0.60", changeOrigin: true }))



//解决不在react-route根路径下刷新页面出现404的问题
app.get('*', function(req, res) {
	var index = this.middleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html'));
	res.end(index);
}.bind(this));

app.listen(8080, function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('Listening at http://localhost:8080');
});