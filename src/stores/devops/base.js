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

import { set } from 'lodash'
import BaseStore from '../devops'

export default class Base extends BaseStore {
  catchRequestError(method = 'get', ...rest) {
    return request[method](...rest).catch(error => {
      return Promise.reject(error)
    })
  }

  getCrumb = async ({ cluster } = { cluster: '' }) =>
    await this.catchRequestError(
      'get',
      `${this.getBaseUrlV2({ cluster })}crumbissuer`,
      null,
      null,
      () => true
    ).then(result => {
      if (result && result.crumb) {
        globals.user.crumb = result.crumb
      } else {
        globals.user.crumb = null
      }
    })

  handlePostRequest = async function(
    method,
    url,
    params,
    options = {},
    reject
  ) {
    if (!options) {
      options = {}
    }
    if (globals.user.crumb === undefined) {
      const match = url.match(/(clusters|klusters)\/([^/]*)\//)
      if (match && match.length === 3) {
        const cluster = match[2]
        await this.getCrumb({ cluster })
      } else {
        await this.getCrumb()
      }
    }
    if (globals.user.crumb) {
      set(options, 'headers.Jenkins-Crumb', globals.user.crumb)
    }

    return this.catchRequestError(method, url, params, options, reject)
  }

  request = {
    post: this.handlePostRequest.bind(this, 'post'),
    put: this.handlePostRequest.bind(this, 'put'),
    patch: this.handlePostRequest.bind(this, 'patch'),
    delete: this.handlePostRequest.bind(this, 'delete'),
    get: this.catchRequestError.bind(this, 'get'),
    defaults: this.catchRequestError.bind(this, 'defaults'),
  }
}
