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
const fs = require('fs')
const { resolve } = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const LocalePlugin = require('./locale-plugin')

const root = path => resolve(__dirname, `../${path}`)

const isDev = process.env.NODE_ENV === 'development'

const langs = fs.readdirSync(root('locales'))
const entries = langs.reduce(
  (prev, cur) => ({
    ...prev,
    [`locale-${cur}`]: `./locales/${cur}/index.js`,
  }),
  {}
)

const filename = isDev ? '[name].json' : '[name].[chunkhash].json'

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  entry: entries,
  output: {
    filename,
    path: root('dist/'),
    publicPath: '/dist/',
  },
  plugins: [
    new LocalePlugin({ output: '../dist' }),
    new WebpackAssetsManifest({
      entrypoints: true,
      writeToDisk: true,
      output: '../dist/manifest.locale.json',
    }),
  ],
}
