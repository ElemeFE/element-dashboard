const path = require('path');
const cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/app.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
    port: 10086,
    publicPath: '/'
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'lint', 'sass', 'autoprefixer']
});

module.exports = cooking.resolve();
