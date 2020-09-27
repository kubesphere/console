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

import { get } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Icon } from '@kube-design/components'

import styles from './index.scss'

export default class ServiceItem extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    prefix: PropTypes.string,
    detail: PropTypes.object,
  }

  static defaultProps = {
    prefix: '',
    detail: {},
  }

  render() {
    const { className, detail, prefix } = this.props

    if (!detail) {
      return null
    }

    return (
      <div className={classnames(styles.item, className)}>
        <div className={styles.icon}>
          <Icon name="network-router" size={40} />
        </div>
        <div className={styles.name}>
          <Link to={`${prefix}/${detail.name}`}>{detail.name}</Link>
          <p>{t(detail.type)}</p>
        </div>
        <div className={styles.status}>
          <p>
            <span>{t('Grayscale Release Version')}</span>:{' '}
            {get(detail, 'grayRelease.oldVersion', '-')}{' '}
            {get(detail, 'grayRelease.newVersion', '-')}
          </p>
          <p>
            <span>{t('Pod Count')}</span>: {detail.podNums}
          </p>
        </div>
        <div className={styles.status}>
          <p>
            <span>{t('Access Method')}</span>: {t('Internal access')}
          </p>
          <p>
            <span>{t('IP')}: </span>
            <span>
              {detail.ports.map((port, index) => {
                let protocol = ''
                if (port.name && port.name.indexOf('-') !== -1) {
                  protocol = (port.name.split('-')[0] || '').toUpperCase()
                }
                return (
                  <span key={index}>
                    {protocol === 'HTTP'
                      ? `http://${detail.clusterIP}:${port.targetPort}`
                      : `${detail.clusterIP}:${port.targetPort}/${protocol}`}
                  </span>
                )
              })}
            </span>
          </p>
        </div>
      </div>
    )
  }
}
