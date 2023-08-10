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

import { Icon, Tooltip } from '@kube-design/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

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

  renderClusterTip() {
    return (
      <div>
        <div className="tooltip-title">{t('MULTI_CLUSTER_PROJECT')}</div>
        <p>{t('MULTI_CLUSTER_PROJECT_TIP')}</p>
      </div>
    )
  }

  render() {
    const {
      className,
      avatar,
      icon,
      iconSize,
      title: titleProp,
      desc,
      to,
      noLink,
      isMultiCluster,
    } = this.props

    const title =
      typeof titleProp === 'string' ? (
        <span title={titleProp}>{titleProp}</span>
      ) : (
        titleProp
      )
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
            src={avatar || '/assets/default-user.svg'}
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
          <div
            className={classNames(styles.description, 'ks-avatar-desc')}
            title={typeof desc === 'string' ? desc : undefined}
          >
            {desc}
          </div>
        </div>
      </div>
    )
  }
}
