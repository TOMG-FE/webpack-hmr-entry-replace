# webpack-hmr-entry-replace
用于以 webpack-dev-server API 方式触发 webpack HMR

## Getting Started

```shell
npm install webpack-hmr-entry-replace --save-dev
```

See [webpack-hmr-tutorial](http://andrewhfarmer.com/webpack-hmr-tutorial/).

Choose way : webpack-dev-server API.

```js
//webpack.config.js
var $fs = require('fs');
var $path = require('path');

var $webpack = require('webpack');
var $webpackDevServer = require('webpack-dev-server');
var $webpackHmrEntryReplace = require('webpack-hmr-entry-replace');

var webpackConfig = {
	entry: {
		'entry' : 'src/entry.js'
	},
	output: {
		path: 'dist',
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
		contentBase : 'dist',
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

$webpackHmrEntryReplace(webpackConfig);

var compiler = $webpack(webpackConfig);
var server = new $webpackDevServer(compiler, webpackConfig.devServer);
server.listen(webpackConfig.devServer.port);
```

## Release History

 * 2016-10-08 v0.1.0 发布第一个正式版。




