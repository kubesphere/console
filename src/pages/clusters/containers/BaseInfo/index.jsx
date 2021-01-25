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
import { observer, inject } from 'mobx-react'
import { Checkbox, Button, Alert } from '@kube-design/components'
import { Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import EditBasicInfoModal from 'clusters/components/Modals/EditBasicInfo'
import { getDisplayName } from 'utils'
import { trigger } from 'utils/action'
import { CLUSTER_PROVIDER_ICON } from 'utils/constants'

import {
  getSuitableUnit,
  getValueByUnit,
  getLastMonitoringData,
} from 'utils/monitoring'

import ClusterMonitorStore from 'stores/monitoring/cluster'

import styles from './index.scss'

const MetricTypes = {
  cpu_usage: 'cluster_cpu_total',
  memory_usage: 'cluster_memory_total',
  disk_size_usage: 'cluster_disk_size_capacity',
  node_count: 'cluster_node_total',
}

@inject('rootStore', 'clusterStore')
@observer
@trigger
export default class Overview extends React.Component {
  state = {
    confirm: false,
  }

  monitorStore = new ClusterMonitorStore()

  componentDidMount() {
    if (this.store.detail.isReady) {
      this.fetchData()
    }
  }

  get store() {
    return this.props.clusterStore
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'cluster-settings',
      cluster: this.props.match.params.cluster,
    })
  }

  getValue = (data, unitType) => {
    const value = get(data, 'value[1]', 0)
    const unit = getSuitableUnit(value, unitType) || unit
    const result = getValueByUnit(value, unit)

    return unit ? `${result} ${unit}` : result
  }

  fetchData = () => {
    this.store.fetchVersion({ cluster: this.store.detail.name })
    this.monitorStore.fetchMetrics({
      cluster: this.store.detail.name,
      metrics: Object.values(MetricTypes),
      last: true,
    })
  }

  fetchClusterDetail = () => {
    this.store.fetchDetail({ name: this.props.match.params.cluster })
  }

  getResourceOptions = () => {
    const { isLoading } = this.monitorStore

    if (isLoading) {
      return []
    }

    const data = getLastMonitoringData(this.monitorStore.data)

    return [
      {
        name: 'Node Count',
        icon: 'nodes',
        value: this.getValue(data[MetricTypes.node_count]),
      },
      {
        name: 'CPU',
        icon: 'cpu',
        value: this.getValue(data[MetricTypes.cpu_usage], 'cpu'),
      },
      {
        name: 'Memory',
        icon: 'memory',
        value: this.getValue(data[MetricTypes.memory_usage], 'memory'),
      },
      {
        name: 'Local Storage',
        icon: 'storage',
        value: this.getValue(data[MetricTypes.disk_size_usage], 'disk'),
      },
    ]
  }

  showEdit = () => {
    this.trigger('resource.baseinfo.edit', {
      detail: this.store.detail,
      modal: EditBasicInfoModal,
      success: this.fetchClusterDetail,
    })
  }

  handleChange = checked => {
    this.setState({ confirm: checked })
  }

  handleUnbind = () => {
    const { name } = this.store.detail
    this.store
      .delete({ name })
      .then(() => this.props.rootStore.routing.push('/clusters'))
  }

  render() {
    const { provider, kubernetesVersion } = this.store.detail

    const options = this.getResourceOptions()

    const actions = this.enabledActions

    return (
      <>
        <Banner
          icon="cluster"
          title={t('Basic Info')}
          description={t('CLUSTER_BASE_INFO_DESC')}
        />
        <Panel title={t('Cluster Info')}>
          <div className={styles.header}>
            <Text
              icon={CLUSTER_PROVIDER_ICON[provider] || 'kubernetes'}
              title={getDisplayName(this.store.detail)}
              description={t('Cluster')}
            />
            {provider && <Text title={provider} description={t('Provider')} />}
            <Text
              title={kubernetesVersion || this.store.version}
              description={t('Kubernetes Version')}
            />
            {actions.includes('edit') && globals.app.isMultiCluster && (
              <Button className={styles.action} onClick={this.showEdit}>
                {t('Edit Info')}
              </Button>
            )}
          </div>
          <div className={styles.content}>
            {options.map(option => (
              <Text
                key={option.name}
                icon={option.icon}
                title={option.value}
                description={t(option.name)}
              />
            ))}
          </div>
        </Panel>
        {globals.app.isMultiCluster && actions.includes('delete') && (
          <Panel title={t('Unbind Cluster')}>
            <Alert
              className={styles.tip}
              type="error"
              title={`${t('Unbind Cluster')} ?`}
              message={t('UNBIND_CLUSTER_DESC')}
            />
            <Button
              className={styles.unbind}
              type="danger"
              disabled={!this.state.confirm}
              onClick={this.handleUnbind}
            >
              {t('Unbind')}
            </Button>
            <Checkbox onChange={this.handleChange}>
              {t('SURE_TO_UNBIND_CLUSTER')}
            </Checkbox>
          </Panel>
        )}
      </>
    )
  }
}
