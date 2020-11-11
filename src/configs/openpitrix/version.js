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

export const DEFAULT_QUERY_STATUS =
  'draft|submitted|rejected|in-review|passed|active|suspended'

export const STATUS_TRANSFER_MAP = {
  active: 'published',
  suspended: 'recalled',
  suspend: 'recall',
}

export const STATUS_TO_ICON = {
  submitted: 'review',
  'in-review': 'review',
  rejected: 'suspended',
  active: 'passed',
}

export const CAN_EDIT_STATUS = ['draft', 'rejected']

export const CAN_DELETE_STATUS = ['draft', 'rejected', 'passed', 'suspended']

export const APP_STORE_ACTIONS = ['suspend', 'recover']

export const STATUS_TO_ACTION = {
  draft: 'submit',
  submitted: 'cancel',
  rejected: 'submit',
  passed: 'release',
  active: 'view',
}

export const STATUS_TO_ACTION_ADMIN = {
  active: 'suspend',
  suspended: 'recover',
}

export const ACTION_TO_STATUS = {
  suspend: 'active',
  recover: 'suspended',
}

export const HANDLE_TYPE_TO_SHOW = {
  recover: 'activate',
}

export const ACTION_TO_NAME = {
  submit: 'Submit for Review',
  cancel: 'Cancel Review',
  release: 'Release to Store',
  view: 'View in Store',
  suspend: 'Suspend Version',
  recover: 'Activate Version',
}

export const REVIEW_PASS_ACTIONS = [
  {
    role: 'isv',
    action: 'review',
  },
  {
    role: 'isv',
    action: 'pass',
  },
  {
    role: 'business',
    action: 'review',
  },
  {
    role: 'business',
    action: 'pass',
  },
  {
    role: 'technical',
    action: 'review',
  },
  {
    role: 'technical',
    action: 'pass',
  },
]
