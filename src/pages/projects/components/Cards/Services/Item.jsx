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

import { Tooltip, Icon } from '@kube-design/components'
import { Text } from 'components/Base'
import ServiceAccess from 'projects/components/ServiceAccess'
import { getDisplayName } from 'utils'

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

    const serviceMonitor = get(detail, 'monitor.name')
    const detailName = getDisplayName(detail)

    return (
      <div className={classnames(styles.item, className)}>
        <Text
          icon="network-router"
          title={
            <>
              <Link to={`${prefix}/services/${detail.name}`}>{detailName}</Link>
              {serviceMonitor && (
                <Tooltip
                  content={`${t('Monitoring Exporter')}: ${serviceMonitor}`}
                >
                  <Icon className="margin-l8" name="monitor" size={20} />
                </Tooltip>
              )}
            </>
          }
          description={t(detail.type)}
        />
        <Text
          title={
            get(detail, 'annotations["servicemesh.kubesphere.io/enabled"]') ===
            'true'
              ? t('On')
              : t('Off')
          }
          description={t('Application Governance')}
        />
        <ServiceAccess data={detail} />
      </div>
    )
  }
}
