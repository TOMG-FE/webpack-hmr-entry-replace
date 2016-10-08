var $fs = require('fs');
var $path = require('path');

var $webpack = require('webpack');
var $webpackDevServer = require('webpack-dev-server');
var $htmlWebpackPlugin = require('html-webpack-plugin');
var $webpackHmrEntryReplacement = require('../index');

var $CONFIG = {};
$CONFIG.root = $path.resolve(__dirname);
$CONFIG.src = $path.join($CONFIG.root, 'src');
$CONFIG.dist = $path.join($CONFIG.root, 'dist');

var webpackConfig = {
	entry: {
		'entry' : 'src/entry.js'
	},
	output: {
		path: $CONFIG.dist,
		publicPath: '../',
		filename: 'js/[name].js',
		chunkFilename: 'js/chunk/[id].chunk.js'
	},
	devtool: 'eval-source-map',
	module: {
		loaders: []
	},
	plugins: [],
	devServer : {
		protocol : 'http',
		host : '127.0.0.1',
		port : 8090,
		contentBase : $CONFIG.dist,
		compress : false,
		quiet : false,
		noInfo : false,
		historyApiFallback : false,
		stats : {
			colors : true
		},
		hot : true
	}
};

webpackConfig.module.loaders.push({
	test : /\.css$/,
	loader: 'style!css'
});

webpackConfig.plugins.push(
	new $htmlWebpackPlugin({
		filename: 'html/demo.html',
		hash: true,
		chunks: [
			'entry'
		],
		chunksSortMode: 'none',
		minify: {
			removeComments: false,
			collapseWhitespace: false
		}
	})
);

var compiler = $webpack(webpackConfig);
var server = new $webpackDevServer(compiler, webpackConfig.devServer);
server.listen(webpackConfig.devServer.port);
