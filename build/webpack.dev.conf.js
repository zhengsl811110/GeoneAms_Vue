var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var path = require('path');
var glob = require('glob');
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new FriendlyErrorsPlugin()
  ]
})

var chunks = utils.getChunks('./src/pages/**/*.js');
var pages = utils.getHtmls('./src/pages/**/*.html');
// console.log(chunks);
pages.forEach(function (pathname) {
  // filename 用文件夹名字
  var conf = {
    filename: pathname.substring(6, pathname.length - 4) + '.html', //生成的html存放路径，相对于path
    template: 'src/' + pathname + '.html', //html模板路径
  };
  var chunk = pathname.substring(6, pathname.length);
  if (chunks.indexOf(chunk) > -1) {
    conf.inject = 'body';
    conf.chunks = ['vendor', chunk,'manifest'];
  }
  // console.log(chunk);
  // console.log(conf);
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});