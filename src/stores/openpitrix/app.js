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

import { DEFAULT_QUERY_STATUS } from 'configs/openpitrix/app'
import Base from 'stores/openpitrix/base'

let sequence = 0 // app screenshot for sort
export default class App extends Base {
  defaultStatus = DEFAULT_QUERY_STATUS

  resourceName = 'apps'

  @observable
  showAddVersion = false

  @observable
  allApps = []

  @action
  upload = async ({ app_id, ...data } = {}) => {
    await request.patch(this.getUrl({ app_id }), data)
  }

  uploadBySequence = (index, base64Str) => {
    setTimeout(
      () =>
        this.upload({
          app_id: this.detail.app_id,
          type: 'screenshot',
          attachment_content: base64Str,
          sequence: index,
        }),
      index * 300
    )
  }

  @action
  async deploy(params, { namespace }) {
    if (namespace) {
      await this.submitting(
        request.post(
          `${this.baseUrl}namespaces/${namespace}/applications`,
          params
        )
      )
    }
  }

  @action
  async upgrade(params) {
    await this.submitting(
      request.post(`${this.baseUrl}clusters/upgrade`, params)
    )
  }

  @action
  async rollback(params) {
    await this.submitting(
      request.post(`${this.baseUrl}clusters/rollback`, params)
    )
  }

  @action
  uploadIcon = base64Str =>
    this.upload({
      app_id: this.detail.app_id,
      type: 'icon',
      attachment_content: base64Str,
    })

  @action
  uploadScreenshot = async (base64Str, detail) => {
    const screenshotStr = get(this.detail, 'screenshots', '')
    const screenshots = screenshotStr ? screenshotStr.split(',') : []
    sequence = screenshots.length - 1
    sequence++

    if (sequence >= 6) {
      return false
    }

    const newScreenshots =
      sequence === 0 ? base64Str : `${screenshotStr},${base64Str}`
    this.detail = {
      ...detail,
      screenshots: newScreenshots,
    }
    this.uploadBySequence(sequence, base64Str)
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
    sequence = 0
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
