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
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Icon } from '@pitrix/lego-ui'

import styles from './index.scss'

const ICON_COLORS = {
  info: {
    primary: '#fff',
    secondary: '#329dce',
  },
  error: {
    primary: '#ea8573',
    secondary: '#fff',
  },
  warning: {
    primary: '#8d663e',
    secondary: '#ffc781',
  },
}

const ICONS = {
  info: 'question',
  error: 'close',
  warning: 'exclamation',
  default: 'question',
}

export default class Alert extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['info', 'error', 'warning', 'default']),
    icon: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    hideIcon: PropTypes.bool,
  }

  static defaultProps = {
    type: 'default',
    message: '',
    hideIcon: false,
  }

  render() {
    const { className, type, title, hideIcon, message } = this.props

    return (
      <div className={classnames(styles.alert, className, styles[type])}>
        {hideIcon || this.renderIcon()}
        <div className={styles.message}>
          {title && <h3>{title}</h3>}
          <span>{message}</span>
        </div>
      </div>
    )
  }

  renderIcon() {
    const { icon, type, title } = this.props
    const iconName = icon || ICONS[type]
    const iconSize = title ? 34 : 20
    return (
      <Icon
        className={styles.icon}
        name={iconName}
        size={iconSize}
        color={ICON_COLORS[type]}
      />
    )
  }
}
