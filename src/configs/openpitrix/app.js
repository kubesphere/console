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

export const DEFAULT_QUERY_STATUS = 'draft|active|suspended|passed'

export const STORE_QUERY_STATUS = 'active|suspended'

export const MAX_LIMIT = 200
export const STORE_APP_LIMIT = 12

export const REVIEW_QUERY_STATUS = {
  all: 'active|rejected|passed|submitted|suspended',
  processed: 'active|rejected|passed|suspended',
  unprocessed: 'submitted',
}

export const CLUSTER_QUERY_STATUS =
  'creating|active|failed|deleting|upgrading|created|upgraded'

export const UPLOAD_STATUS_WORD = {
  init: 'UPLOAD_SUPPORT_FORMAT',
  uploading: 'Uploading',
  success: 'Upload successfully',
}

export const CATEGORY_ICONS = [
  'database',
  'export',
  'documentation',
  'mail',
  'calendar',
  'column',
  'earth',
  'picture',
  'firewall',
  'ai',
  'camera',
  'image',
  'increase',
  'network',
  'router',
  'storage',
  'scissors',
  'loadbalancer',
  'ip',
  'blockchain',
  'car',
  'nodes',
  'usb-redirection',
  'coding',
  'cdn',
  'ssh',
  'linechart',
  'cart',
  'cluster',
  'role',
  'wrench',
  'radio',
]

export const OPENPITRIX_LINKS = {
  helm_developer_guide:
    'https://kubesphere.io/docs/application-store/app-developer-guide/helm-specification/',
}

export const UPLOAD_CHECK_RULES = {
  package: {
    format: /\.(tgz|tar\.gz)$/,
    size: 2 * 1024 * 1024,
  },
  icon: {
    format: /\.(png|jpg|jpeg)$/,
    size: 20 * 1024,
  },
  screenshots: {
    format: /\.(png|jpg|jpeg)$/,
    size: 2 * 1024 * 1024,
  },
}

export const UPLOAD_FILE_TYPES = {
  package: 'application/x-gzip,application/x-tar',
  icon: 'image/png,image/jpg,image/jpeg',
  screenshot: 'image/png,image/jpg,image/jpeg',
}

export const SCREENSHOTS_LIMIT = 6
