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

import React from 'react'
import { includes, omit, isString } from 'lodash'
import { Icon } from '@pitrix/lego-ui'
import NotifyManager from './NotifyManager'
import { generateUUID } from './utils'

const PLACEMENT = ['topLeft', 'bottomLeft', 'bottomRight', 'topRight']
const prefixCls = 'kube-notify'
const IconMap = {
  success: 'check',
  warning: 'exclamation',
  error: 'exclamation',
}
const defaultTop = 24
const defaultBottom = 24
const notifyInstance = {}

const getPlacementStyle = placement => {
  let style
  switch (placement) {
    case 'topLeft':
      style = {
        left: 20,
        top: defaultTop,
        bottom: 'auto',
      }
      break
    case 'bottomLeft':
      style = {
        left: 20,
        top: 'auto',
        bottom: defaultBottom,
      }
      break
    case 'bottomRight':
      style = {
        right: 20,
        top: 'auto',
        bottom: defaultBottom,
      }
      break
    default:
      style = {
        right: 20,
        top: defaultTop,
        bottom: 'auto',
      }
      break
  }
  return style
}

const open = args => {
  const defaultOptions = {
    duration: 4500,
    closable: true,
    placement: 'topRight',
    type: 'info',
  }

  const options = { ...defaultOptions, ...args }

  let position
  if (!includes(PLACEMENT, options.placement)) {
    position = defaultOptions.placement
  } else {
    position = options.placement
  }

  const { title, content, type, btns, key } = options

  const cacheKey = `${prefixCls}-${position}`

  const newOptions = omit(options, [
    'title',
    'content',
    'placement',
    'icon',
    'btns',
  ])

  const target = key || generateUUID('notify')
  const createNotice = notify => {
    notify.createNotice({
      key: target,
      content: (
        <div className={`${prefixCls}-with-icon`}>
          <div className={`${prefixCls}-icon`}>
            <Icon name={IconMap[type] || 'check'} type="light" size={20} />
          </div>
          <div className={`${prefixCls}-text`}>
            {title && <div className={`${prefixCls}-title`}>{title}</div>}
            {content && <div className={`${prefixCls}-content`}>{content}</div>}
          </div>
          {btns ? <div className={`${prefixCls}-btns`}>{btns}</div> : null}
        </div>
      ),
      ...newOptions,
    })
  }

  if (notifyInstance[cacheKey]) {
    createNotice(notifyInstance[cacheKey])
  } else {
    NotifyManager.newInstance(
      {
        prefixCls,
        animation: 'drop',
        className: cacheKey,
        style: getPlacementStyle(position),
      },
      notify => {
        notifyInstance[cacheKey] = notify
        createNotice(notify)
      }
    )
  }
  return { ...notifyInstance[cacheKey], key: target }
}

const convert = (args1, args2, type) => {
  if (isString(args1)) {
    return open({ title: args1, content: args2, type })
  }
  return open({ ...args1, type })
}

export default {
  open: args => open(args),

  info: (args1, args2) => convert(args1, args2, 'info'),

  success: (args1, args2) => convert(args1, args2, 'success'),

  warning: (args1, args2) => convert(args1, args2, 'warning'),

  error: (args1, args2) => convert(args1, args2, 'error'),

  close: key => {
    Object.keys(notifyInstance).forEach(cacheKey =>
      notifyInstance[cacheKey].removeNotice(key)
    )
  },
}
