/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

const { resolve } = require('path')
const merge = require('lodash/merge')
const webpack = require('webpack')
const WebpackNotifier = require('webpack-notifier')
const baseConfig = require('./webpack.base')

const root = path => resolve(__dirname, `../${path}`)

const config = {
  mode: 'development',
  entry: {
    main: ['react-hot-loader/patch', './src/core/index.js'],
  },
  output: {
    filename: '[name].js',
    path: root('build/'),
    publicPath: '/',
    pathinfo: false,
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      ...baseConfig.moduleRules,
      {
        test: /\.scss$/,
        exclude: /lego.theme.scss/,
        include: root('src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]',
              modules: true,
            },
          },
          {
            loader: 'fast-sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
              importLoaders: 2,
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        include: root('src/assets'),
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  optimization: {
    flagIncludedChunks: true,
    occurrenceOrder: true,
    usedExports: true,
    sideEffects: true,
    concatenateModules: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](?!(ace-builds|react-ace|xterm)).*.jsx?$/,
          name: 'vendor',
          priority: 10,
        },
        lego: {
          test: /[\\/]node_modules[\\/]@pitrix[\\/].*.jsx?$/,
          name: 'lego',
          priority: 20,
        },
        common: {
          name: 'common',
          minChunks: 2,
          minSize: 30000,
        },
      },
    },
  },
  resolve: merge({}, baseConfig.resolve, {
    alias: { 'react-dom': '@hot-loader/react-dom' },
  }),
  plugins: [
    ...baseConfig.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.WatchIgnorePlugin([
      root('server'),
      root('build'),
      root('dist'),
    ]),
    new WebpackNotifier({
      title: `Kubesphere console`,
      alwaysNotify: true,
      excludeWarnings: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devServer: {
    publicPath: '/',
    compress: true,
    noInfo: false,
    quiet: false,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    host: '0.0.0.0',
    port: 8001,
  },
}

module.exports = config
