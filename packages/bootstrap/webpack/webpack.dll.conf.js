/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { config: configShared } = require('./config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const resolveShared = configShared.resolve;
const absResolve = configShared.absResolve;
const WebpackAssetsManifest = require('webpack-assets-manifest');

const resolve = dir => path.join(__dirname, '../dist', dir);

const config = {
  devtool: false,
  mode: 'production',
  entry: {
    common: [
      'react',
      // 'react-is',
      'react-dom',
      'react-router-dom',
      'react-query',
      'lodash',
      '@kubed/components',
      '@kubed/hooks',
      '@kubed/icons',
      '@kubed/code-editor',
      '@kubed/charts',
      'styled-components',
      'react-markdown',
      'wujie-react',
      'dayjs',
      '@ks-console/shared',
    ],
  },
  output: {
    path: resolveShared('dist/dll'),
    filename: '[name].[chunkhash:8].dll.js',
    library: '[name]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '.json'],
    modules: [absResolve('packages'), 'node_modules'],
    alias: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolveShared('shared'), resolveShared('packages')],
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolveShared('shared'), resolveShared('packages')],
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new WebpackBar({
      name: 'build dll',
      color: 'green',
      profile: true,
    }),
    new CleanWebpackPlugin({
      root: resolve('dll'),
    }),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:8].css',
    }),
    new webpack.DllPlugin({
      path: resolveShared('dist/dll/[name]-manifest.json'),
      name: '[name]',
    }),
    new WebpackAssetsManifest({
      entrypoints: false,
      writeToDisk: true,
      output: resolveShared('dist/dll/manifest.json'),
    }),
  ],
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false,
  },
};

if (process.env.bundleAnalyzerReport) {
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 3002 }));
}

module.exports = config;
