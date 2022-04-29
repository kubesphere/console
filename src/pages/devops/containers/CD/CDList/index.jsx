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

import { toJS, computed } from 'mobx'
import { getLocalTime, getDisplayName } from 'utils'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import CDStore from 'stores/cd'
import Table from 'components/Tables/List'
import ClusterStore from 'stores/cluster'
import withList, { ListPage } from 'components/HOCs/withList'
import { CD_WEATHER_STATUS, CD_SYNC_STATUS } from 'utils/constants'
import { omit, get, pick } from 'lodash'
import Destination from '../Components/Destination'
import StatusText from '../Components/StatusText'
import ChartCard from '../Components/ChartCard'
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
      cluster: this.props.match.params.cluster,
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

  get itemActions() {
    const { trigger, routing } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: item => {
          trigger('resource.baseinfo.edit', {
            detail: item,
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
            detail: item,
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
            success: routing.query,
          })
        },
      },
    ]
  }

  getData = async params => {
    await this.props.store.fetchList({
      devops: this.devops,
      ...this.props.match.params,
      ...params,
    })
    await this.props.store.fetchStatusSummary({ devops: this.devops })
  }

  componentDidMount() {
    this.clusterStore.fetchList({ limit: -1 })
    this.getData()
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleCreate = () => {
    const { trigger } = this.props

    trigger('cd.create', {
      title: t('CREATE_CONTINUOUS_DEPLOYMENT'),
      devops: this.devops,
      cluster: this.cluster,
      module: 'cds',
      noCodeEdit: true,
      success: this.getData,
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
      success: this.getData,
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
    return [
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
          return getLocalTime(get(record, 'status.reconciledAt')).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        },
      },
    ]
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
      ? this.handleCreate
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
        title: 'OUT_OF_SYNC',
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
      <ListPage {...this.props} getData={this.getData}>
        <Banner {...bannerProps} />
        <div>
          <div className={styles.status__container}>
            <div className={styles.warper__container}>
              {this.renderStatusCard()}
            </div>
            <div className={styles.warper__container}>
              {this.renderSyncStatusCard()}
            </div>
          </div>

          {this.renderContent()}
        </div>
      </ListPage>
    )
  }
}
