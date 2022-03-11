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

import { toJS } from 'mobx'
import { omit } from 'lodash'

import { Button } from '@kube-design/components'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import CDStore from 'stores/devops/cd'
import Table from 'components/Tables/List'
import Empty from 'components/Tables/Base/Empty'
import Health from 'devops/components/Health'

import { withDevOpsList, ListPage } from 'components/HOCs/withList'
import { CD_WEATHER_STATUS, CD_SYNC_STATUS } from 'utils/constants'
import ChartCard from '../Components/ChartCard'
import styles from './index.scss'

@withDevOpsList({
  store: new CDStore(),
  module: 'pipelines',
  name: 'CD',
  rowKey: 'name',
})
export default class CDList extends React.Component {
  constructor(props) {
    super(props)

    this.formTemplate = {
      devopsName: this.devopsName,
      cluster: this.cluster,
      devops: this.devops,
      enable_timer_trigger: false,
      enable_discarder: true,
    }
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'pipelines',
      cluster: this.props.match.params.cluster,
      devops: this.devops,
    })
  }

  get devops() {
    return this.props.match.params.devops
  }

  get devopsName() {
    return this.props.devopsStore.devopsName
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
    // const { trigger, name } = this.props

    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: () => {},
      },
      {
        key: 'yaml',
        icon: 'pen',
        text: t('Edit by YAML'),
        action: 'edit',
        onClick: () => {},
      },
      {
        key: 'sync',
        icon: 'changing-over',
        text: t('Synchronize'),
        action: 'edit',
        onClick: () => {},
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('DELETE'),
        action: 'delete',
        onClick: () => {},
      },
    ]
  }

  getData = params => {
    this.props.store.fetchList({
      devops: this.devops,
      devopsName: this.devopsName,
      ...this.props.match.params,
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleCreate = () => {
    const { trigger, module } = this.props

    trigger('cd.create', {
      module,
      title: t('CREATE_PIPELINE'),
      formTemplate: this.formTemplate,
      devops: this.devops,
      cluster: this.cluster,
      noCodeEdit: true,
      success: () => {
        this.getData()
      },
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
        render: name => {
          const url = '1111'
          return <Avatar to={url} title={name} />
        },
      },

      {
        title: t('HEALTH'),
        dataIndex: 'weatherStatus',
        width: '30%',
        filters: this.getWeatherStatus(),
        filteredValue: getFilteredValue('weatherStatus'),
        isHideable: true,
        render: weatherScore => <Health score={weatherScore} />,
      },
      {
        title: t('SYNC_STATUS'),
        dataIndex: 'syncStatus',
        width: '25%',
        filters: this.getSyncStatus(),
        filteredValue: getFilteredValue('syncStatus'),
        isHideable: true,
        render: syncStatus => {
          return syncStatus
        },
      },
      {
        title: t('DEPLOY_LOCATION'),
        dataIndex: 'placement',
        width: '25%',
        isHideable: true,
        render: placement => {
          return placement
        },
      },
      {
        title: t('UPDATE_TIME_COLON'),
        dataIndex: 'updateTime',
        sorter: true,
        sortOrder: getSortOrder('updateTime'),
        width: '20%',
        isHideable: true,
        render: updateTime => {
          return updateTime
        },
      },
    ]
  }

  renderContent() {
    const {
      data = [],
      filters,
      isLoading,
      total,
      page,
      limit,
      selectedRowKeys,
    } = toJS(this.props.store.list)

    const isEmptyList = isLoading === false && total === 0
    const omitFilters = omit(filters, ['limit', 'page'])

    const showCreate = this.enabledActions.includes('create')
      ? this.handleCreate
      : null

    if (isEmptyList && Object.keys(omitFilters).length <= 0) {
      return (
        <Empty
          name="CD"
          icon=""
          title={t('EMPTY_CD_TITLE')}
          action={
            showCreate ? (
              <Button onClick={showCreate} type="control">
                {t('CREATE')}
              </Button>
            ) : null
          }
        />
      )
    }

    const pagination = { total, page, limit }

    const defaultTableProps = {
      hideCustom: false,
      onSelectRowKeys: this.props.store.setSelectRowKeys,
      selectedRowKeys,
      selectActions: [
        {
          key: 'run',
          type: 'primary',
          text: t('RUN'),
          action: 'delete',
          onClick: this.handleMultiBatchRun,
        },
        {
          key: 'delete',
          type: 'danger',
          text: t('DELETE'),
          action: 'delete',
          onClick: () =>
            this.props.trigger('pipeline.batch.delete', {
              type: 'PIPELINE',
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

    return (
      <Table
        rowKey="name"
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        onCreate={showCreate}
        searchType="name"
        tableActions={defaultTableProps}
        itemActions={this.itemActions}
        enabledActions={this.enabledActions}
      />
    )
  }

  handleFilter = () => {}

  renderStatusCard = () => {
    const WEATHER_CONFIG = [
      {
        title: 'Healthy',
        color: '#55BC8A',
        used: 90,
        total: 100,
        icon: '/assets/health.svg',
      },
      {
        title: 'Degraded',
        color: '#CA2621',
        used: 40,
        total: 100,
        icon: '/assets/health-error.svg',
      },
      {
        title: 'Progressing',
        color: '#F5A623',
        used: 10,
        total: 100,
        icon: '/assets/health.svg',
      },
    ]
    return (
      <div className={styles.warper__item}>
        {WEATHER_CONFIG.map(item => (
          <ChartCard item={item} key={item.title} click={this.handleFilter} />
        ))}
      </div>
    )
  }

  render() {
    const { bannerProps } = this.props

    return (
      <ListPage getData={this.getData} {...this.props}>
        <Banner {...bannerProps} />
        <div>
          <div className={styles.status__container}>
            <div className={styles.warper__container}>
              {this.renderStatusCard()}
            </div>
            <div className={styles.warper__container}>
              {this.renderStatusCard()}
            </div>
          </div>

          {this.renderContent()}
        </div>
      </ListPage>
    )
  }
}
