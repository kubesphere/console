/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MergeJsonPlugin = require('webpack-merge-json-plugin');
const { config, locales } = require('./config');
const baseConfig = require('./webpack.base.conf');
const resolve = config.resolve;

const localePatterns = locales.map(locale => {
  return {
    pattern: `./node_modules/@ks-console/locales/dist/${locale}/*.json`,
    to: `./locales/${locale}.json`,
  };
});

const webpackDevConfig = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: config.webIndex,
    // extensions: resolve('extensions/entry.ts'),
  },
  output: {
    path: resolve('dist'),
    publicPath: 'http://localhost:8001/',
  },
  module: {
    rules: [
      // { parser: { system: false } },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[name].[ext]',
            publicPath: '/',
            esModule: false,
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'assets/fonts/[name].[ext]',
            publicPath: '/',
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.EXTENSIONS_PATH': JSON.stringify(resolve('extensions/')),
    }),
    new MergeJsonPlugin({
      groups: localePatterns,
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new FriendlyErrorsPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [resolve('server'), resolve('node_modules'), resolve('build'), resolve('scripts')],
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    minimize: false,
    splitChunks: false,
  },
  devServer: {
    hot: true,
    port: 8001,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    // contentBase: [resolve('dist')],
    // publicPath: config.assetsPublicPath,
    // watchContentBase: true,
    // compress: true,
    open: false,
    // inline: true,
    client: {
      overlay: true,
    },
    static: {
      directory: resolve('dist'),
      publicPath: config.assetsPublicPath,
      watch: true,
    },
    // stats: 'errors-only',
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
  },
  stats: {
    assets: false,
    modules: false,
    entrypoints: false,
  },
});

module.exports = webpackDevConfig;
