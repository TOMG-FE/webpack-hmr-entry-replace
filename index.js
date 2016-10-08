var $webpack = require('webpack');

module.exports = function(webpackConfig){

	// 如果使用 webpack-dev-server/bin 的 --hot 参数
	// 则应该注释掉下面的插件，否则会引起报错：
	// "hmr.js:806 Uncaught RangeError: Maximum call stack size exceeded"
	webpackConfig.plugins.push(
		new $webpack.HotModuleReplacementPlugin()
	);

	var devClient = [[
		require.resolve('webpack-dev-server/client'),
		'?',
		webpackConfig.devServer.protocol,
		'://',
		webpackConfig.devServer.host,
		':',
		webpackConfig.devServer.port
	].join('')];

	devClient.push('webpack/hot/dev-server');

	if(!Array.isArray(webpackConfig.entry)){
		Object.keys(webpackConfig.entry).forEach(function(key) {
			webpackConfig.entry[key] = devClient.concat(webpackConfig.entry[key]);
		});
	}else{
		webpackConfig.entry = devClient.concat(webpackConfig.entry);
	}

};


