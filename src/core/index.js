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

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Loading, LocaleProvider } from '@pitrix/lego-ui'

import { isAppsPage } from 'utils'
import request from 'utils/request'

import Notify from 'components/Base/Notify'

import App from './App'
import GlobalValue from './global'
import i18n from './i18n'

require('@babel/polyfill')
require('utils/polyfills')

// request error handler
window.onunhandledrejection = function(e) {
  if (e && (e.status === 'Failure' || e.status >= 400)) {
    if (e.status === 401 || e.reason === 'Unauthorized') {
      // session timeout handler, except app store page.
      if (!isAppsPage()) {
        /* eslint-disable no-alert */
        location.href = `/login?referer=${location.pathname}`
        window.alert(
          t(
            'Session timeout or this account is logged in elsewhere, please login again'
          )
        )
      }
    } else if (globals.config.enableErrorNotify && (e.reason || e.message)) {
      Notify.error({ title: e.reason, content: t(e.message), duration: 6000 })
    }
  }
}

window.t = i18n.t
window.request = request

globals.app = new GlobalValue()

const render = async component => {
  const { locales } = await i18n.init()
  ReactDOM.render(
    <AppContainer>
      <Suspense fallback={<Loading className="ks-page-loading" />}>
        <LocaleProvider locales={locales} localeKey="lang" ignoreWarnings>
          {component}
        </LocaleProvider>
      </Suspense>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(<App />)

module.hot &&
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp />)
  })
