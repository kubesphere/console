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
import { isString } from 'lodash'

import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Banner extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string,
    rightIcon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element,
    ]),
    name: PropTypes.string,
    desc: PropTypes.string,
  }

  static defaultProps = {
    type: 'light',
    icon: 'appcenter',
    iconClass: '',
    name: '',
    desc: '',
  }

  renderRightIcon() {
    const { rightIcon } = this.props

    if (!rightIcon) return null

    if (isString(rightIcon)) {
      return <img className={styles.rightIcon} src={rightIcon} alt="" />
    }

    return rightIcon
  }

  renderExtraInfo() {
    const { extra } = this.props

    if (!extra) return null

    return extra
  }

  render() {
    const { className, iconClass, type, icon, name, desc } = this.props

    const isImage = icon && icon.startsWith('/')

    const isWhite = type === 'white'

    return (
      <div className={classnames(styles.banner, className, styles[type])}>
        {this.renderRightIcon()}
        <div className={classnames(styles.icon, iconClass)}>
          {isImage ? (
            <img src={icon} alt="" />
          ) : (
            <Icon
              name={icon}
              type={isWhite ? 'dark' : 'light'}
              size={isWhite ? 40 : 36}
            />
          )}
        </div>
        <div className={styles.title}>
          <div className="h3">{name}</div>
          <p>{desc}</p>
        </div>
        {this.renderExtraInfo()}
      </div>
    )
  }
}
