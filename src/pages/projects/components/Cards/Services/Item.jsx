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

import { isArray } from 'lodash'
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

    let ports = detail.ports
    if (isArray(ports)) {
      ports = ports
        .map(item => `${item.port}:${item.targetPort}/${item.protocol}`)
        .join(';')
    }

    const { type, clusterIP, loadBalancerIngress, externalName } = detail
    const content =
      type === 'Virtual IP'
        ? clusterIP
        : loadBalancerIngress.join(';') || externalName

    return (
      <div className={classnames(styles.item, className)}>
        <div className={styles.icon}>
          <Icon name="network-router" size={40} />
        </div>
        <div className={styles.name}>
          <Link to={`${prefix}/${detail.name}`}>{detail.name}</Link>
          <p>
            {t(type)}: {content || '-'}
          </p>
        </div>
        <div className={styles.status}>
          <p>
            <span>{t('Port')}</span>: {ports}
          </p>
          <p>
            <span>{t('IP')}</span>: {detail.virtualIp || '-'}
          </p>
        </div>
      </div>
    )
  }
}
