/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

const fs = require('fs-extra');
const { config, systemImports, KUBESPHERE_EDITION } = require('./config');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const styledComponentsTransformer = createStyledComponentsTransformer();
const getCustomTransformers = isDev ? () => ({ before: [styledComponentsTransformer] }) : {};

const { resolve, absResolve } = config;

const customConfigFilePath = resolve('configs/webpack.config.js');
const configFile = fs.pathExistsSync(customConfigFilePath);
const configs = configFile ? require(customConfigFilePath) : {};

const webpackBaseConfig = merge(configs, {
  entry: {
    main: config.webIndex,
    terminal: config.terminalIndex,
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.ts', '.tsx', '.json'],
    modules: [resolve('extensions'), resolve('packages'), 'node_modules'],
    alias: {
      'styled-components': resolve('node_modules/styled-components'),
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
    fallback: { path: require.resolve('path-browserify') },
  },
  module: {
    rules: [
      {
        resource: config.webIndex,
        use: [
          {
            loader: absResolve('webpack/systemjs-imports-loader.js'),
            options: { importsMap: systemImports },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('extensions'), resolve('packages')],
        options: {
          cacheDirectory: true,
          plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [resolve('extensions'), resolve('packages'), resolve('node_modules')],
        options: {
          transpileOnly: true,
          getCustomTransformers,
          // plugins: isDev ? [require.resolve('react-refresh/babel')] : [],
        },
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env.KUBESPHERE_EDITION': JSON.stringify(KUBESPHERE_EDITION),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${config.assetsPath}`,
          to: `${config.distAssetsPath}`,
          globOptions: { ignore: ['**/v3dist/**'] },
        },
        {
          from: `${config.assetsPath}/v3dist`,
          to: `${config.distPath}/v3dist`,
        },
      ],
    }),
    new WebpackBar({
      name: NODE_ENV || 'webpack-bar',
      color: 'green',
      profile: !isDev,
    }),
  ],
});

module.exports = webpackBaseConfig;
