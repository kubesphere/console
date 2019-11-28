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
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')

const baseConfig = require('./webpack.base')

const root = path => resolve(__dirname, `../${path}`)

module.exports = {
  mode: 'production',
  entry: {
    lego: root('src/scss/lego.theme.scss'),
  },
  output: {
    path: root('dist'),
  },
  module: {
    rules: [
      {
        test: /theme\.scss$/,
        loader: [
          MiniCssExtractPlugin.loader,
          { loader: 'cache-loader' },
          {
            loader: 'css-loader',
            options: { minimize: true, importLoaders: 1 },
          },
          {
            loader: 'postcss-loader',
            options: baseConfig.postCssOptions,
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'lego.css',
    }),
    new WebpackBar(),
  ],
  performance: {
    hints: false,
  },
}
