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

import { getClusterUrl } from 'utils/index'

function getError(option, xhr) {
  const msg = `cannot post ${option.action} ${xhr.status}'`
  const err = new Error(msg)
  err.status = xhr.status
  err.method = option.method || 'post'
  err.url = option.action
  return err
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

/*
option {
 onProgress: (event: { percent: number }): void,
 onError: (event: Error, body?: Object): void,
 onSuccess: (body: Object): void,
 data: Object,
 filename: String,
 file: File,
 withCredentials: Boolean,
 action: String,
 headers: Object,
}
*/

export default function upload(option) {
  /* eslint-disable-next-line no-underscore-dangle */
  const xhr = new window.XMLHttpRequest()

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  option.action = getClusterUrl(option.action)

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file)

  xhr.onerror = function error(e) {
    option.onError(e)
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr))
    }
    return option.onSuccess(getBody(xhr), xhr)
  }

  xhr.open(option.method || 'post', option.action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  const headerKeys = Object.keys(headers)

  headerKeys.forEach(h => {
    xhr.setRequestHeader(h, headers[h])
  })

  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    },
  }
}
