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

import { Button, Icon, Menu } from '@kube-design/components'
import EditBasicInfoModal from 'clusters/components/Modals/EditBasicInfo'
import { Panel, Text } from 'components/Base'
import Banner from 'components/Cards/Banner'
import { get } from 'lodash'
import { inject, observer } from 'mobx-react'
import React from 'react'

import ClusterMonitorStore from 'stores/monitoring/cluster'
import { getDisplayNameNew, getDomTitle } from 'utils'
import { trigger } from 'utils/action'

import { CLUSTER_PROVIDER_ICON } from 'utils/constants'

import {
  getLastMonitoringData,
  getSuitableUnit,
  getValueByUnit,
} from 'utils/monitoring'
import styles from './index.scss'
import ManageButton from './ManageButton'

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

  get editPromission() {
    return globals.user.globalRules.clusters.includes('manage')
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
        name:
          this.getValue(data[MetricTypes.node_count]) === 1 ? 'NODE' : 'NODES',
        icon: 'nodes',
        value: this.getValue(data[MetricTypes.node_count]),
      },
      {
        name: 'CPU',
        icon: 'cpu',
        value: this.getValue(data[MetricTypes.cpu_usage], 'cpu'),
      },
      {
        name: 'MEMORY',
        icon: 'memory',
        value: this.getValue(data[MetricTypes.memory_usage], 'memory'),
      },
      {
        name: 'DISK',
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
    this.trigger('cluster.unbind', {
      store: this.store,
      detail: this.store.detail,
      success: () => this.props.rootStore.routing.push('/clusters'),
    })
  }

  updateKubeConfig = () => {
    this.trigger('cluster.updateKubeConfig', {
      detail: this.store.detail,
      success: this.fetchClusterDetail,
    })
  }

  get enableManageAction() {
    const { isHost = false, connectionType } = this.store.detail
    const proxyConnect = connectionType === 'proxy'
    const actions = this.enabledActions
    const option = []

    if (actions.includes('edit') && globals.app.isMultiCluster) {
      option.push({
        actionName: 'resource.baseinfo.edit',
        onClick: this.showEdit,
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
      })
    }
    if (
      globals.app.isMultiCluster &&
      !isHost &&
      !proxyConnect &&
      actions.includes('edit')
    ) {
      option.push({
        actionName: 'cluster.update.kubeconfig',
        icon: 'data',
        text: t('UPDATE_KUBECONFIG'),
        onClick: this.updateKubeConfig,
      })
    }
    if (
      globals.app.isMultiCluster &&
      actions.includes('delete') &&
      !this.store.detail.isHost
    ) {
      option.push({
        actionName: 'cluster.unbind',
        onClick: this.handleUnbind,
        icon: 'trash',
        text: t('REMOVE_CLUSTER'),
      })
    }
    return option
  }

  manageButtonClick = (e, actionName) => {
    const clickItem = this.enableManageAction.filter(
      item => item.actionName === actionName
    )[0]
    clickItem && clickItem.onClick()
  }

  renderManageButton = () => {
    const action = this.enableManageAction
    const content = (
      <Menu onClick={this.manageButtonClick}>
        {action.map(option => (
          <Menu.MenuItem key={option.actionName}>
            <Icon name={option.icon} type="light"></Icon>
            {option.text}
          </Menu.MenuItem>
        ))}
      </Menu>
    )

    if (action.length > 1) {
      return (
        <ManageButton
          className={styles.manage}
          content={content}
        ></ManageButton>
      )
    }

    return (
      action.length > 0 && (
        <Button
          className={styles.singleButton}
          onClick={() => action[0].onClick()}
        >
          {action[0].text}
        </Button>
      )
    )
  }

  render() {
    const { provider, kubernetesVersion } = this.store.detail

    const options = this.getResourceOptions()

    return (
      <>
        <Banner
          icon="cluster"
          title={t('BASIC_INFORMATION')}
          description={t('CLUSTER_BASE_INFO_DESC')}
        />
        <Panel title={t('CLUSTER_INFORMATION')}>
          <div className={styles.header}>
            <Text
              icon={CLUSTER_PROVIDER_ICON[provider] || 'kubernetes'}
              title={getDomTitle(getDisplayNameNew(this.store.detail))}
              description={t('CLUSTER')}
              ellipsis
            />
            {provider && <Text title={provider} description={t('PROVIDER')} />}
            <Text
              title={kubernetesVersion || this.store.version}
              description={t('KUBERNETES_VERSION')}
            />
            {this.editPromission && this.renderManageButton()}
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
      </>
    )
  }
}
