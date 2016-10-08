var $webpack = require('webpack');

module.exports = function(webpackConfig){

	// 如果使用 webpack-dev-server/bin 的 --hot 参数
	// 则应该注释掉下面的插件，否则会引起报错：
	// "hmr.js:806 Uncaught RangeError: Maximum call stack size exceeded"
	webpackConfig.plugins.push(
		new $webpack.HotModuleReplacementPlugin()
	);

	var devClient = '';
	if(webpackConfig.devServer){
		devClient = [[
			require.resolve('webpack-dev-server/client'),
			'?',
			webpackConfig.devServer.protocol || 'http',
			'://',
			webpackConfig.devServer.host || '127.0.0.1',
			':',
			webpackConfig.devServer.port || 8080
		].join('')];
	}

	devClient.push('webpack/hot/dev-server');

	if(Array.isArray(webpackConfig.entry)){
		webpackConfig.entry = devClient.concat(webpackConfig.entry);
	}else if(typeof webpackConfig.entry === 'object'){
		Object.keys(webpackConfig.entry).forEach(function(key) {
			webpackConfig.entry[key] = devClient.concat(webpackConfig.entry[key]);
		});
	}

};


