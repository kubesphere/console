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
import { get } from 'lodash'

import { Icon, Radio } from '@kube-design/components'

import styles from './index.scss'

export default class ServiceComponentItem extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    data: {},
    checked: false,
    onClick() {},
  }

  get component() {
    return get(this.props.data, 'name')
  }

  handleClick = () => {
    this.props.onClick(this.component)
  }

  render() {
    const { data, checked } = this.props
    const {
      icon,
      healthy_pod_count,
      total_pod_count,
      service_count,
      running_time,
      status,
    } = data || {}

    return (
      <div className={styles.item} onClick={this.handleClick}>
        <div className={styles.info}>
          <div className={styles.head}>
            <div className={styles.icon}>
              <Icon name={icon || 'appcenter'} size={40} />
              <span
                className={classnames(styles.status, {
                  [styles.active]: status === 'Healthy',
                })}
              />
            </div>
            <div
              className={classnames(styles.checkbox, {
                [styles.checked]: checked,
              })}
            >
              <Radio checked={checked} onChange={this.handleClick} />
            </div>
          </div>
          <div className={styles.desc}>
            <strong>{this.component}</strong>
            <p>{`${t('Pod')}: ${healthy_pod_count}/${total_pod_count}`}</p>
          </div>
        </div>
        <div className={styles.metrics}>
          <div>
            <strong>{service_count}</strong>
            <p>{t('Service Count')}</p>
          </div>
          <div>
            <strong>{running_time}</strong>
            <p>{t('Running Time')}</p>
          </div>
          <div>
            <strong>{t(status)}</strong>
            <p>{t('Service Status')}</p>
          </div>
        </div>
      </div>
    )
  }
}
