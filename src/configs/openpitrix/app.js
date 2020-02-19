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
  all: 'submitted|admin-rejected|admin-passed',
  processed: 'admin-rejected|admin-passed',
  unprocessed: 'submitted',
}

export const CLUSTER_QUERY_STATUS = 'active|stopped|ceased|pending|suspended'

export const UPLOAD_STATUS_WORD = {
  init: 'UPLOAD_SUPPORT_FORMAT',
  uploading: 'Uploading',
  success: 'Upload successfully',
}

export const CATEGORY_ICONS = [
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
    'https://openpitrix.io/docs/v0.4/zh-CN/developer-guide/helm-developer-guide',
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
    maxHeight: 1280,
    maxWidth: 720,
  },
}

export const UPLOAD_FILE_TYPES = {
  package: 'application/x-gzip',
  icon: 'image/png,image/jpg',
  screenshot: 'image/png,image/jpg',
}

export const WORKSPACE_REPO_ID = 'repo-helm'

export const SCREENSHOTS_LIMIT = 6
