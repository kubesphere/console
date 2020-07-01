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

import { action, observable } from 'mobx'
import { get } from 'lodash'

import { DEFAULT_QUERY_STATUS, SCREENSHOTS_LIMIT } from 'configs/openpitrix/app'
import Base from 'stores/openpitrix/base'

export default class App extends Base {
  defaultStatus = DEFAULT_QUERY_STATUS

  resourceName = 'apps'

  @observable
  showAddVersion = false

  @observable
  allApps = []

  uploadScreenshots = []

  @action
  upload = async ({ app_id, ...data } = {}) => {
    await request.patch(this.getUrl({ app_id }), data)
  }

  uploadBySequence = async (start, index, base64Str, detail) => {
    await this.upload({
      app_id: this.detail.app_id,
      type: 'screenshot',
      attachment_content: base64Str,
      sequence: start + index,
    })

    const screenshotStr = get(this.detail, 'screenshots', '')
    const newScreenshots = screenshotStr
      ? `${screenshotStr},${base64Str}`
      : base64Str
    this.detail = {
      ...detail,
      screenshots: newScreenshots,
    }

    const nextIndex = index + 1
    const nextBase64Str = this.uploadScreenshots[nextIndex]
    if (nextBase64Str) {
      await this.uploadBySequence(start, nextIndex, nextBase64Str, detail)
    }
  }

  @action
  async deploy(params, { namespace, cluster }) {
    if (namespace) {
      await this.submitting(
        request.post(
          `${
            this.baseUrl
          }clusters/${cluster}/namespaces/${namespace}/applications`,
          params
        )
      )
    }
  }

  @action
  uploadIcon = base64Str =>
    this.upload({
      app_id: this.detail.app_id,
      type: 'icon',
      attachment_content: base64Str,
    })

  @action
  uploadScreenshot = async (base64Str, detail, index) => {
    const screenshotStr = get(this.detail, 'screenshots', '')
    const screenshots = screenshotStr ? screenshotStr.split(',') : []
    const total = index + screenshots.length

    if (total >= SCREENSHOTS_LIMIT) {
      return false
    }

    if (index === 0) {
      this.uploadScreenshots = [base64Str]
      await this.uploadBySequence(screenshots.length, index, base64Str, detail)
    } else {
      this.uploadScreenshots.push(base64Str)
    }
  }

  @action
  deleteScreenshot = async (index, detail) => {
    const screenshotStr = get(this.detail, 'screenshots', '')
    const screenshots = screenshotStr ? screenshotStr.split(',') : []

    if (index >= 0) {
      screenshots.splice(index, 1)
      this.detail = {
        ...detail,
        screenshots: screenshots.join(','),
      }

      await this.upload({
        app_id: this.detail.app_id,
        type: 'screenshot',
        attachment_content: '',
        sequence: index,
      })

      return
    }

    this.detail.screenshots = ''
    for (let i = screenshots.length - 1; i >= 0; i--) {
      await this.upload({
        app_id: this.detail.app_id,
        type: 'screenshot',
        attachment_content: '',
        sequence: i,
      })
    }
  }

  // data action value is: suspend、recover
  @action
  handle = async ({ app_id, ...data } = {}) => {
    const url = this.getUrl({ app_id, name: 'action' })
    return await this.submitting(request.post(url, data))
  }
}
