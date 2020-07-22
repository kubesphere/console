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

const locales = require('koa-locales')

const { root, getServerConfig } = require('../libs/utils')

const clientConfig = getServerConfig().client

module.exports = function(app) {
  locales(app, {
    functionName: 't',
    defaultLocale: clientConfig.defaultLang || 'en',
    queryField: 'lang',
    cookieField: 'lang',
    localeAlias: {
      'zh-cn': 'zh',
      'zh-tw': 'tc',
      'en-uk': 'en',
      'en-us': 'en',
    },
    dirs: [root('server/locales')],
  })
}
