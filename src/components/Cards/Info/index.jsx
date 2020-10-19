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
import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class Info extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    iconProps: PropTypes.object,
    image: PropTypes.string,
    title: PropTypes.any,
    desc: PropTypes.any,
    size: PropTypes.string,
    width: PropTypes.number,
    url: PropTypes.string,
  }

  static defaultProps = {
    icon: '',
    iconProps: {},
    title: '',
    desc: '',
    size: 'default',
    width: 0,
  }

  renderContent() {
    const { icon, iconProps, image, title, desc, extra } = this.props

    return (
      <div>
        <div className={styles.icon}>
          {image ? (
            <img src={image} alt="" />
          ) : (
            <Icon name={icon} size={40} type="dark" {...iconProps} />
          )}
        </div>
        <div className={styles.text}>
          <div>{title}</div>
          <p>{desc}</p>
        </div>
        {extra}
      </div>
    )
  }

  render() {
    const { url, size, className } = this.props

    if (url) {
      return (
        <Link
          className={classNames(
            styles.info,
            styles.link,
            styles[size],
            className
          )}
          to={url}
        >
          {this.renderContent()}
        </Link>
      )
    }

    return (
      <div className={classNames(styles.info, styles[size], className)}>
        {this.renderContent()}
      </div>
    )
  }
}
