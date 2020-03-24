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
const autoprefixer = require('autoprefixer')
const HappyPack = require('happypack')
const WebpackBar = require('webpackbar')

const root = path => resolve(__dirname, `../${path}`)

module.exports = {
  entry: {
    main: './src/core/index.js',
  },
  moduleRules: [
    {
      test: /\.jsx?$/,
      include: [root('src'), root('common')],
      use: 'happypack/loader?id=jsx',
    },
    {
      test: /\.jsx?$/,
      include: root('node_modules'),
      use: 'cache-loader',
    },
    {
      test: /\.svg$/,
      issuer: { test: /\.jsx?$/ },
      use: [
        { loader: 'cache-loader' },
        { loader: '@svgr/webpack', options: { icon: true } },
      ],
    },
    {
      test: /\.(jpg|png|svg)(\?.+)?$/,
      include: root('src/assets'),
      use: 'url-loader?limit=100000',
    },
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    symlinks: false,
    modules: [root('src'), root('src/pages'), 'node_modules'],
    alias: {
      src: root('src'),
      scss: root('src/scss'),
      core: root('src/core'),
      configs: root('src/configs'),
      components: root('src/components'),
      layouts: root('src/layouts'),
      stores: root('src/stores'),
      utils: root('src/utils'),
    },
  },
  plugins: [
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader?cacheDirectory'],
    }),
    new WebpackBar(),
  ],
  postCssOptions: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
        flexbox: 'no-2009',
      }),
      require('postcss-remove-google-fonts'),
    ],
  },
}
