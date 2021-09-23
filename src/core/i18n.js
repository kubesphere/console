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

import moment from 'moment-mini'
import { LocaleProvider } from '@kube-design/components'
import get from 'lodash/get'
import cookie from 'utils/cookie'
import { getBrowserLang } from 'utils'

const { locale } = LocaleProvider

const init = async () => {
  const userLang = get(globals.user, 'lang') || getBrowserLang()
  if (userLang && cookie('lang') !== userLang) {
    cookie('lang', userLang)
  }

  if (userLang === 'zh') {
    moment.locale('zh', {
      relativeTime: {
        s: '1 秒',
        ss: '%d 秒',
        m: '1 分钟',
        mm: '%d 分钟',
        h: '1 小时',
        hh: '%d 小时',
        d: '1 天',
        dd: '%d 天',
        M: '1 个月',
        MM: '%d 个月',
        y: '1 年',
        yy: '%d 年',
        past: '%s前',
        future: '在 %s后',
      },
    })
  }

  const locales = {}
  const localePath = globals.localeManifest[`locale-${userLang}.json`]
  if (userLang && localePath) {
    const data = await request.get(`dist/${localePath}`)
    locales[userLang] = data
  }

  return { locales }
}

const t = (key, options) => {
  let value = key && locale.get(key, options)

  if (options && options.defaultValue && value === key) {
    value = options.defaultValue
  }

  return value
}

t.html = (key, options) => key && locale.getHTML(key, options)

export default {
  init,
  t,
}
