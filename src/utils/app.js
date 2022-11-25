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

import { capitalize } from 'lodash'

import { STATUS_TRANSFER_MAP } from 'configs/openpitrix/version'

export const transferAppStatus = status => {
  if (STATUS_TRANSFER_MAP[status]) {
    return t(
      `APP_STATUS_${STATUS_TRANSFER_MAP[status]
        .toUpperCase()
        .replace(/[^A-Z]+/g, '_')}`
    )
  }

  return status
}

export const transferVersionStatus = status => {
  if (STATUS_TRANSFER_MAP[status]) {
    return status === 'draft'
      ? t('APP_STATUS_NOT_SUBMITTED')
      : t(
          `APP_STATUS_${STATUS_TRANSFER_MAP[status]
            .toUpperCase()
            .replace(/[^A-Z]+/g, '_')}`
        )
  }
  return status
}

export const transferReviewStatus = status => {
  let transStatus
  switch (status) {
    case 'submitted':
      transStatus = 'to-be-reviewed'
      break
    case 'passed':
    case 'suspended':
    case 'rejected':
    case 'active':
      transStatus = status
      break
    default:
      transStatus = 'in-review'
  }

  return transStatus
}

export const getVersionTypesName = typeStr => {
  if (!typeStr) {
    return '-'
  }

  const types = typeStr.split(',')
  return types.map(type => capitalize(type)).join(' ')
}

export const getAppCategoryNames = categories => {
  const names = []
  categories.forEach(({ category_id, name, status }) => {
    if (category_id && status !== 'disabled') {
      const result =
        category_id === 'ctg-uncategorized' ? t('APP_CATE_UNCATEGORIZED') : name
      names.push(t(result || category_id))
    }
  })

  return names.length ? names.join(', ') : '-'
}

export const downloadFileFromBase64 = (base64Str = '', fileName) => {
  const a = document.createElement('a')
  a.href = `data:application/tar+gzip;base64,${base64Str}`
  a.download = `${fileName}.tgz`
  a.click()
}

export const compareVersion = (v1, v2) => {
  if (typeof v1 + typeof v2 !== 'stringstring') {
    return false
  }

  const a = v1.split('.')
  const b = v2.split('.')
  const len = Math.max(a.length, b.length)

  for (let i = 0; i < len; i++) {
    if (
      (a[i] && !b[i] && parseInt(a[i], 10) > 0) ||
      parseInt(a[i], 10) > parseInt(b[i], 10)
    ) {
      return 1
    }
    if (
      (b[i] && !a[i] && parseInt(b[i], 10) > 0) ||
      parseInt(a[i], 10) < parseInt(b[i], 10)
    ) {
      return -1
    }
  }

  return 0
}

export const checkRepoInvalidReason = errCode => {
  const errReason = {
    // 901: '', // ErrNotExpect
    // 101: '', // ErrVisibility
    102: 'UNRECOGNIZED_URL', // ErrNotUrl
    103: 'INVALID_CREDENTIAL_FORMAT', // ErrCredentialNotJson
    104: 'MISSING_ACCESS_KEY_ID', // ErrNoAccessKeyId
    105: 'MISSING_SECRET_ACCESS_KEY', // ErrNoSecretAccessKey
    106: 'S_THREE_ACCESS_DENIED', // ErrS3AccessDeny
    107: 'INVALID_URL_FORMAT', // ErrUrlFormat
    108: 'INVALID_HTTP_SCHEME', // ErrSchemeNotHttp
    109: 'HTTP_ACCESS_DENIED', // ErrHttpAccessDeny
    110: 'INVALID_HTTPS_SCHEME', // ErrSchemeNotHttps
    111: 'INVALID_TYPE', // ErrType
    112: 'INVALID_PROVIDERS', // ErrProviders
    113: 'INVALID_REPO_URL', // ErrNotRepoUrl
    114: 'INVALID_S_THREE_SCHEME', // ErrSchemeNotS3
    // 115: 'Bad Index YAML', // ErrBadIndexYaml
  }
  return t(errReason[errCode] || 'INVALID_URL_DESC')
}
