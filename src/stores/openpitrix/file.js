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
import { keys } from 'lodash'
import { safeAtob } from 'utils/base64'

import { downloadFileFromBase64 } from 'utils/app'
import { UPLOAD_CHECK_RULES } from 'configs/openpitrix/app'

import Base from './base'

export default class File extends Base {
  resourceName = 'files'

  @observable
  files = {}

  @observable
  isLoading = false

  filters = {}

  @action
  async fetch({ app_id, version_id, ...filters } = {}) {
    this.isLoading = true
    this.filters = Object.assign(this.filters, filters)
    const result = await request.get(
      this.getUrl({ app_id, version_id }),
      this.filters,
      null,
      this.reject
    )

    if (result) {
      const files = result.files || {}
      Object.keys(files).forEach(name => {
        files[name] = safeAtob(files[name])
      })

      this.files = files
      this.isLoading = false
    }
  }

  @action
  checkFile = (uploadFile, type) => {
    const rule = UPLOAD_CHECK_RULES[type]

    if (!rule.format.test(uploadFile.name.toLocaleLowerCase())) {
      return `FILE_FORMAT_${type.toLocaleUpperCase()}`
    }

    if (uploadFile.size > rule.size) {
      return `FILE_MAX_${type.toLocaleUpperCase()}`
    }

    return ''
  }

  @action
  handleFileByBase64Str = async (file, handleFun) => {
    const reader = new FileReader()
    reader.readAsDataURL(file, 'UTF-8')
    reader.addEventListener('load', async () => {
      const readerResult = reader.result
      const base64Str = readerResult.substring(
        readerResult.indexOf(',') + 1,
        readerResult.length
      )
      await handleFun(base64Str)
    })
  }

  @action
  validateImageSize = async base64Str => {
    const image = new Image()
    image.src = base64Str
    return new Promise(resolve => {
      image.addEventListener('load', async () => {
        let result = true
        if (image.width > 96 || image.height > 96) {
          result = false
        }
        resolve(result)
      })
    })
  }

  @action
  validatePackage = async (base64Str, app_id) => {
    this.isSubmitting = true
    const data = {}

    if (app_id) {
      data.type = 'helm'
      data.package = base64Str
    } else {
      data.version_type = 'helm'
      data.version_package = base64Str
    }

    const name = app_id ? 'versions' : 'apps'
    const result = await request.post(
      `${this.getUrl({ app_id, name })}?validate=true`,
      data,
      {},
      this.reject
    )
    this.isSubmitting = false

    if (result && result.name) {
      result.base64Str = base64Str
    }

    if (result && result.error_details) {
      result.missFile = keys(result.error_details)
      result.error = 'MISS_FILE_NOTE'
    }

    return result
  }

  /**
   *
   * @param type CREATE_APP, CREATE_VERSION, MODIFY_VERSION
   * @param params Object {version_type: 'helm', version_package: base64}
   * @param callFun createApp, createVersion, modifyVersion
   */
  @action
  uploadPackage = async (type, params = {}, callFun) => {
    const data = {
      ...params,
    }

    if (type === 'CREATE_APP') {
      data.version_package = params.base64Str
    } else {
      data.package = params.base64Str
    }
    delete data.base64Str

    return await callFun(data)
  }

  @action
  downloadPackage = async ({ app_id, version_id, packageName } = {}) => {
    const url = this.getUrl({ app_id, version_id, name: 'package' })
    const result = await this.submitting(request.get(url))
    downloadFileFromBase64(result.package, packageName)
  }

  reject = res => {
    this.isLoading = false
    window.onunhandledrejection(res)
  }
}
