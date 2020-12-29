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
import { Icon, Tooltip } from '@kube-design/components'

import styles from './index.scss'

export default class Avatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
    to: PropTypes.string,
  }

  static defaultProps = {
    iconSize: 20,
  }

  getAvatarImage(avatar) {
    if (avatar.indexOf('http://') === 0 || avatar.indexOf('https://') === 0) {
      return avatar
    }
    avatar = `/kapis/openpitrix.io/v1//attachments/${avatar}?filename=raw`
    return avatar
  }

  renderClusterTip() {
    return (
      <div>
        <div className="tooltip-title">{t('Multi-cluster Deployment')}</div>
        <p>{t('MULTI_CLUSTER_TIP')}</p>
      </div>
    )
  }

  render() {
    const {
      className,
      avatar,
      icon,
      iconSize,
      title,
      desc,
      to,
      noLink,
      isMultiCluster,
    } = this.props

    const titleComponent = to ? <Link to={to}>{title}</Link> : title

    return (
      <div
        className={classNames(styles.wrapper, className, {
          [styles.link]: noLink || to,
        })}
      >
        {avatar ? (
          <img
            className={styles.image}
            src={this.getAvatarImage(avatar) || '/assets/default-user.svg'}
            alt=""
          />
        ) : (
          icon && <Icon className={styles.icon} name={icon} size={iconSize} />
        )}
        {(avatar || icon) && isMultiCluster && (
          <Tooltip content={this.renderClusterTip()}>
            <img className={styles.indicator} src="/assets/cluster.svg" />
          </Tooltip>
        )}
        <div className={styles.text}>
          <div className={styles.title}>{titleComponent}</div>
          <div className={classNames(styles.description, 'ks-avatar-desc')}>
            {desc}
          </div>
        </div>
      </div>
    )
  }
}
