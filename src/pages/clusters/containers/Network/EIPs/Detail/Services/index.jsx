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
import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'

import { getLocalTime } from 'utils'
import ServiceStore from 'stores/service'

import { Text, Card } from 'components/Base'
import ServiceAccess from 'projects/components/ServiceAccess'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Services extends React.Component {
  serviceStore = new ServiceStore()

  componentDidMount() {
    this.fetchServices()
  }

  get cluster() {
    return this.props.match.parmas
  }

  fetchServices = () => {
    const { name } = this.props.match.params
    this.serviceStore.fetchList({
      cluster: this.cluster,
      label: `eip.porter.kubesphere.io/v1alpha2=${name}`,
    })
  }

  render() {
    const { data = [] } = toJS(this.serviceStore.list)

    return (
      <Card
        className={styles.serviceWrapper}
        title={t('Services')}
        empty={t('NOT_AVAILABLE', { resource: t('Service') })}
        isEmpty={data.length === 0}
      >
        <div className={styles.wrapper}>
          {data.map(item => {
            return (
              <div className={styles.item} key={item.name}>
                <Text
                  icon="appcenter"
                  title={
                    <Link
                      to={`/clusters/${this.cluster}/projects/${item.namespace}/services/${item.name}`}
                    >
                      {item.name}
                    </Link>
                  }
                  description={item.description || '-'}
                />
                <Text
                  title={
                    item.serviceType
                      ? t(`SERVICE_TYPE_${item.serviceType.toUpperCase()}`)
                      : t('Custom Creation')
                  }
                  description={item.type || '-'}
                />
                <ServiceAccess data={item} />
                <Text
                  title={getLocalTime(item.time).format('YYYY-MM-DD HH:mm:ss')}
                  description={t('Create Time')}
                />
              </div>
            )
          })}
        </div>
      </Card>
    )
  }
}
