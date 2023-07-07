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
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import withList, { ListPage } from 'components/HOCs/withList'
import Table from 'components/Tables/List'
import { get, omit, pick } from 'lodash'

import { computed, toJS } from 'mobx'
import React from 'react'
import CDStore from 'stores/cd'
import ClusterStore from 'stores/cluster'
import { getDisplayName, getLocalTime } from 'utils'
import { isArgo } from 'utils/devops'
import { CD_SYNC_STATUS, CD_WEATHER_STATUS } from 'utils/constants'
import ChartCard from '../Components/ChartCard'
import Destination from '../Components/Destination'
import StatusText from '../Components/StatusText'
import styles from './index.scss'

@withList({
  store: new CDStore(),
  module: 'cds',
  name: 'CONTINUOUS_DEPLOYMENT',
  rowKey: 'name',
  authKey: 'applications',
})
export default class CDList extends React.Component {
  clusterStore = new ClusterStore()

  @computed
  get clusters() {
    return this.clusterStore.list.data
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'applications',
      cluster: this.cluster,
      devops: this.devops,
    })
  }

  get devops() {
    return this.props.match.params.devops
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get prefix() {
    if (this.props.match.url.endsWith('/')) {
      return this.props.match.url
    }
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get hideSummary() {
    const { healthStatus = {}, syncStatus = {} } = toJS(
      this.props.store.summary
    )

    const isEmpty = []
      .concat(Object.values(healthStatus))
      .concat(Object.values(syncStatus))
      .every(item => !item)

    return isEmpty
  }

  get itemActions() {
    const { trigger, routing } = this.props

    return isArgo
      ? [
          {
            key: 'edit',
            icon: 'pen',
            text: t('EDIT_INFORMATION'),
            action: 'edit',
            onClick: item => {
              trigger('resource.baseinfo.edit', {
                detail: { ...item, cluster: this.cluster },
                success: routing.query,
              })
            },
          },
          {
            key: 'settings',
            icon: 'pen',
            text: t('EDIT_SETTINGS'),
            action: 'edit',
            onClick: item => {
              trigger('cd.edit', {
                detail: { ...item, cluster: this.cluster },
                store: this.props.store,
                devops: this.devops,
                module: 'cds',
                cluster: this.cluster,
                success: routing.query,
              })
            },
          },
          {
            key: 'yaml',
            icon: 'pen',
            text: t('EDIT_YAML'),
            action: 'edit',
            onClick: item => {
              trigger('resource.yaml.edit', {
                detail: { ...item, cluster: this.cluster },
                success: routing.query,
              })
            },
          },
          {
            key: 'sync',
            icon: 'changing-over',
            text: t('SYNC'),
            action: 'edit',
            onClick: record => {
              this.handleSync(record)
            },
          },
          {
            key: 'delete',
            icon: 'trash',
            text: t('DELETE'),
            action: 'delete',
            onClick: record => {
              trigger('cd.delete', {
                type: 'CONTINUOUS_DEPLOYMENT',
                detail: record,
                cluster: this.cluster,
                success: routing.query,
              })
            },
          },
        ]
      : [
          {
            key: 'edit',
            icon: 'pen',
            text: t('EDIT_INFORMATION'),
            action: 'edit',
            onClick: item => {
              trigger('resource.baseinfo.edit', {
                detail: { ...item, cluster: this.cluster },
                success: routing.query,
              })
            },
          },
          {
            key: 'yaml',
            icon: 'pen',
            text: t('EDIT_YAML'),
            action: 'edit',
            onClick: item => {
              trigger('resource.yaml.edit', {
                detail: { ...item, cluster: this.cluster },
                success: routing.query,
              })
            },
          },
          {
            key: 'delete',
            icon: 'trash',
            text: t('DELETE'),
            action: 'delete',
            onClick: record => {
              trigger('fluxcd.delete', {
                type: 'CONTINUOUS_DEPLOYMENT',
                detail: record,
                cluster: this.cluster,
                success: routing.query,
              })
            },
          },
        ]
  }

  getArgoData = async params => {
    await this.props.store.fetchList({
      devops: this.devops,
      ...this.props.match.params,
      ...params,
    })
    await this.props.store.fetchStatusSummary({
      devops: this.devops,
      cluster: this.cluster,
    })
  }

  getFluxData = async params => {
    await this.props.store.fetchList({
      devops: this.devops,
      ...this.props.match.params,
      ...params,
    })
  }

  componentDidMount() {
    // ArgoCD & FluxCD both needs cluster info
    this.clusterStore.fetchList({ limit: -1 })
    isArgo ? this.getArgoData() : this.getFluxData()
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleArgoCreate = () => {
    const { trigger } = this.props

    trigger('cd.create', {
      title: t('CREATE_CONTINUOUS_DEPLOYMENT'),
      devops: this.devops,
      cluster: this.cluster,
      module: 'cds',
      noCodeEdit: true,
      success: this.getArgoData,
      trigger: this.props.trigger,
    })
  }

  handleFluxCreate = () => {
    const { trigger } = this.props

    trigger('fluxcd.create', {
      title: t('CREATE_CONTINUOUS_DEPLOYMENT'),
      devops: this.devops,
      cluster: this.cluster,
      module: 'cds',
      noCodeEdit: true,
      success: this.getFluxData,
    })
  }

  handleSync = item => {
    const { trigger, module } = this.props

    trigger('cd.sync', {
      module,
      title: t('SYNC_RESOURCE'),
      formTemplate: pick(item, 'repoSource'),
      devops: this.devops,
      cluster: this.cluster,
      application: item.name,
      noCodeEdit: true,
      success: this.getArgoData,
    })
  }

  getWeatherStatus = () => {
    return CD_WEATHER_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getSyncStatus = () => {
    return CD_SYNC_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getColumns = () => {
    const { getSortOrder, getFilteredValue } = this.props
    const columns = isArgo
      ? [
          {
            title: t('NAME'),
            dataIndex: 'name',
            width: '20%',
            sorter: true,
            sortOrder: getSortOrder('name'),
            search: true,
            render: (name, record) => {
              return (
                <Avatar
                  to={`${this.prefix}/${name}`}
                  desc={record.description}
                  title={getDisplayName(record)}
                />
              )
            },
          },

          {
            title: t('HEALTH_STATUS'),
            dataIndex: 'healthStatus',
            width: '20%',
            filters: this.getWeatherStatus(),
            filteredValue: getFilteredValue('healthStatus'),
            search: true,
            render: (healthStatus = 'Unknown') => (
              <StatusText type={healthStatus} label={t(healthStatus)} />
            ),
          },
          {
            title: t('SYNC_STATUS'),
            dataIndex: 'syncStatus',
            filters: this.getSyncStatus(),
            filteredValue: getFilteredValue('syncStatus'),
            search: true,
            width: '20%',
            render: (syncStatus = 'Unknown') => (
              <StatusText type={syncStatus} label={syncStatus} />
            ),
          },
          {
            title: t('DEPLOY_LOCATION'),
            dataIndex: 'destination',
            isHideable: true,
            width: '20%',
            render: destination => {
              return (
                <Destination
                  destination={destination}
                  clustersDetail={this.clusters}
                />
              )
            },
          },
          {
            title: t('UPDATE_TIME_TCAP'),
            dataIndex: 'updateTime',
            sorter: true,
            sortOrder: getSortOrder('updateTime'),
            isHideable: true,
            width: '20%',
            render: (updateTime, record) => {
              const reconciledAt = get(record, 'status.reconciledAt')
              return reconciledAt
                ? getLocalTime(reconciledAt).format('YYYY-MM-DD HH:mm:ss')
                : '-'
            },
          },
        ]
      : [
          {
            title: t('NAME'),
            dataIndex: 'name',
            width: '20%',
            sorter: true,
            sortOrder: getSortOrder('name'),
            search: true,
            render: (name, record) => {
              return (
                <Avatar
                  to={`${this.prefix}/${name}`}
                  desc={record.description}
                  title={getDisplayName(record)}
                />
              )
            },
          },
          {
            title: '类型',
            dataIndex: 'fluxAppType',
            width: '20%',
            render: fluxAppType => {
              return fluxAppType || '-'
            },
          },
          {
            title: '源',
            dataIndex: 'fluxSource',
            width: '20%',
            render: fluxSource => {
              return (
                fluxSource && `${fluxSource.kind}/${fluxSource.name.slice(7)}`
              )
            },
          },
          {
            title: '版本',
            dataIndex: 'fluxLastRevision',
            width: '20%',
            render: fluxLastRevision => {
              return fluxLastRevision || '-'
            },
          },
          {
            title: '就绪个数',
            dataIndex: 'fluxAppReadyNum',
            width: '20%',
            render: fluxAppReadyNum => {
              return fluxAppReadyNum ? fluxAppReadyNum.replace('-', '/') : '-'
            },
          },
        ]
    return columns
  }

  renderContent() {
    const { tableProps } = this.props
    const { filters, selectedRowKeys, isLoading, total } = toJS(
      this.props.store.list
    )
    const omitFilters = omit(filters, ['limit', 'page'])

    const defaultTableProps = {
      onSelectRowKeys: this.props.store.setSelectRowKeys,
      selectedRowKeys,
      selectActions: [
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () =>
            this.props.trigger('cd.batch.delete', {
              rowKey: 'name',
              devops: this.devops,
              cluster: this.cluster,
              success: () => {
                setTimeout(() => {
                  this.handleFetch()
                }, 1000)
              },
            }),
        },
      ],
    }

    const showCreate = this.enabledActions.includes('create')
      ? isArgo
        ? this.handleArgoCreate
        : this.handleFluxCreate
      : null

    const showEmpty =
      isLoading === false && total === 0 && Object.keys(omitFilters).length <= 0

    return (
      <Table
        rowKey="name"
        {...tableProps}
        columns={this.getColumns()}
        onCreate={showCreate}
        onFetch={this.handleFetch}
        tableActions={defaultTableProps}
        itemActions={this.itemActions}
        isLoading={isLoading}
        showEmpty={showEmpty}
        enabledActions={this.enabledActions}
      />
    )
  }

  handleFilter = params => {
    const { filters } = this.props.store.list

    Object.keys(filters).forEach(key => {
      if (Object.values(params).includes(filters[key])) {
        params[key] = ''
      }
    })

    this.handleFetch(params)
  }

  renderStatusCard = () => {
    const { filters } = this.props.store.list
    const { total = 0, healthStatus = {} } = this.props.store.summary

    const WEATHER_CONFIG = [
      {
        title: 'HEALTHY',
        color: '#55BC8A',
        used: healthStatus.Healthy || 0,
        total,
        icon: '/assets/cd/health.svg',
        label: 'HEALTH_STATUS',
      },
      {
        title: 'DEGRADED',
        color: '#CA2621',
        used: healthStatus.Degraded || 0,
        total,
        icon: '/assets/cd/degraded.svg',
        label: 'HEALTH_STATUS',
      },
      {
        title: 'PROGRESSING',
        color: '#F5A623',
        used: healthStatus.Progressing || 0,
        total,
        icon: '/assets/cd/progressing.svg',
        label: 'HEALTH_STATUS',
      },
    ]
    return (
      <div className={styles.warper__item}>
        {WEATHER_CONFIG.map(item => (
          <ChartCard
            item={item}
            key={item.title}
            type="healthStatus"
            click={this.handleFilter}
            label={item.label}
            filters={filters}
          />
        ))}
      </div>
    )
  }

  renderSyncStatusCard = () => {
    const { filters } = this.props.store.list
    const { total = 0, syncStatus = {} } = this.props.store.summary

    const WEATHER_CONFIG = [
      {
        title: 'SYNCED',
        color: '#55BC8A',
        used: syncStatus.Synced || 0,
        total,
        icon: '/assets/cd/synced.svg',
        label: 'SYNC_STATUS',
      },
      {
        title: 'OUTOFSYNC',
        filterValue: 'OutOfSync',
        color: '#F5A623',
        used: syncStatus.OutOfSync || 0,
        total,
        icon: '/assets/cd/outofsync.svg',
        label: 'SYNC_STATUS',
      },
      {
        title: 'UNKNOWN',
        color: '#36435C',
        used: syncStatus.Unknown || 0,
        total,
        icon: '/assets/cd/unknown.svg',
        label: 'SYNC_STATUS',
      },
    ]
    return (
      <div className={styles.warper__item}>
        {WEATHER_CONFIG.map(item => (
          <ChartCard
            item={item}
            type="syncStatus"
            key={item.title}
            click={this.handleFilter}
            label={item.label}
            filters={filters}
          />
        ))}
      </div>
    )
  }

  render() {
    const { bannerProps } = this.props

    return (
      <ListPage
        {...this.props}
        getData={isArgo ? this.getArgoData : this.getFluxData}
      >
        <Banner {...bannerProps} />
        <div>
          {isArgo && !this.hideSummary && (
            <div className={styles.status__container}>
              <div className={styles.warper__container}>
                {this.renderStatusCard()}
              </div>
              <div className={styles.warper__container}>
                {this.renderSyncStatusCard()}
              </div>
            </div>
          )}

          {this.renderContent()}
        </div>
      </ListPage>
    )
  }
}
