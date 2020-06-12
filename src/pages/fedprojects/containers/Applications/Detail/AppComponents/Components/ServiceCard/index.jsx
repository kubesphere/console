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

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

import { Text } from 'components/Base'

import styles from './index.scss'

export default class ServiceCard extends Component {
  render() {
    const { data, prefix } = this.props
    const serviceType = get(data, 'annotations["kubesphere.io/serviceType"]')
    return (
      <div className={styles.wrapper}>
        <Text
          icon="appcenter"
          title={
            <Link to={`${prefix}/services/${data.name}`}>{data.name}</Link>
          }
          description={t(`SERVICE_TYPE_${serviceType.toUpperCase()}`)}
        />
        <Text
          title={`${data.name}.${data.namespace}.svc`}
          description={t('EIP_POOL_DESC')}
        />
        <Text title={data.clusterIP} description={t('Virtual IP')} />
      </div>
    )
  }
}
