var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssPath = function (_path) {
  var assetsImgDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsImgDirectory
    : config.dev.assetsImgDirectory
  return path.posix.join(assetsImgDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}


exports.getEntry=function(globPath) {
    var entries = {};
    glob.sync(globPath).forEach(function (name) {
        var n = name.slice(name.lastIndexOf('src/') + 10, name.length -3);
        entries[n] = [name];
    });
    return entries;
}

exports.getChunks=function(globPath) {
    var chunks = [];
    glob.sync(globPath).forEach(function (name) {
        var n = name.slice(name.lastIndexOf('src/') + 10, name.length -3);
        chunks.push(n);
    });
    return chunks;
}

exports.getHtmls=function(globPath) {
  var htmls = [];
  glob.sync(globPath).forEach(function (name) {
    var n = name.slice(name.lastIndexOf('src/') + 4, name.length - 5);
    htmls.push(n);
  });
  return htmls;
}