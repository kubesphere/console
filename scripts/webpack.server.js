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
const webpack = require('webpack')

const root = path => resolve(__dirname, `../${path}`)

module.exports = {
  entry: {
    server: './server/server.js',
  },
  output: {
    path: root('dist/'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  optimization: {
    minimize: false,
  },
  externals: {
    hiredis: 'hiredis',
    webpack: 'webpack',
    'koa-webpack-middleware': 'koa-webpack-middleware',
  }, // Need this to avoid error when working with Express
  module: {
    rules: [
      {
        test: /\.(yml|html|css|svg|properties|ttf|otf|eot|woff2?)(\?.+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': false,
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
