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
import { cloneDeep, get, isEmpty, omit } from 'lodash'

import { Button, Notify } from '@kube-design/components'
import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import PipelineStore from 'stores/devops/pipelines'
import Table from 'components/Tables/List'
import Empty from 'components/Tables/Base/Empty'
import Health from 'devops/components/Health'

import { withDevOpsList, ListPage } from 'components/HOCs/withList'

@withDevOpsList({
  store: new PipelineStore(),
  module: 'pipelines',
  name: 'Pipeline',
  rowKey: 'name',
})
export default class PipelinesList extends React.Component {
  constructor(props) {
    super(props)

    this.formTemplate = {
      devopsName: this.devopsName,
      cluster: this.cluster,
      devops: this.devops,
      enable_timer_trigger: false,
      enable_discarder: true,
    }
    this.refreshTimer = setInterval(() => this.refreshHandler(), 4000)
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props.match
    const { params: nextParams } = nextProps.match

    if (params.devops !== nextParams.devops) {
      this.getData(nextParams)
    }
  }

  componentDidUpdate() {
    if (this.refreshTimer === null && this.isRuning) {
      clearInterval(this.refreshTimer)
      this.refreshTimer = setInterval(() => this.refreshHandler(), 4000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshTimer)
    this.unsubscribe && this.unsubscribe()
  }

  refreshHandler = () => {
    if (this.isRuning) {
      this.getData()
    } else {
      clearInterval(this.refreshTimer)
      this.refreshTimer = null
    }
  }

  get isRuning() {
    const { data } = toJS(this.props.store.list)
    const runingData = data.filter(
      item => item.status !== 'failed' && item.status !== 'successful'
    )
    return !isEmpty(runingData)
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
    const { trigger, name } = this.props

    return [
      {
        key: 'run',
        icon: 'triangle-right',
        text: t('Run'),
        action: 'edit',
        onClick: record => {
          this.handleRun(record)
        },
      },
      {
        key: 'activity',
        icon: 'calendar',
        text: t('Activity'),
        action: 'view',
        onClick: record => {
          this.props.rootStore.routing.push(
            `${this.prefix}/${encodeURIComponent(record.name)}/activity`
          )
        },
      },
      {
        key: 'edit',
        icon: 'pen',
        text: t('Edit'),
        action: 'edit',
        onClick: record => {
          this.handleAdvanceEdit(record.name)
        },
      },
      {
        key: 'copy',
        icon: 'copy',
        text: t('Copy Pipeline'),
        action: 'edit',
        onClick: record => {
          this.handleCopy(record.name)
        },
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: record => {
          trigger('resource.delete', {
            type: t(name),
            resource: record.name,
            detail: {
              name: record.name,
              devops: this.devops,
              cluster: this.cluster,
            },
            success: () => {
              this.handleFetch()
            },
          })
        },
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

  async handleRun(record) {
    const hasBranches = record.branchNames && record.branchNames.length
    const hasParameters = record.parameters && record.parameters.length
    const { trigger } = this.props
    const { params } = this.props.match

    if (hasBranches || hasParameters) {
      trigger('pipeline.params', {
        devops: this.devops,
        cluster: this.cluster,
        branches: record.branchNames,
        parameters: record.parameters,
        params: {
          ...params,
          name: get(record, 'name', ''),
        },
        success: branch => {
          this.props.rootStore.routing.push(
            `${this.prefix}/${encodeURIComponent(record.name)}/${
              branch ? `branch/${branch}/` : ''
            }activity`
          )
        },
      })
    } else {
      await this.props.store.runBranch({
        cluster: params.cluster,
        devops: params.devops,
        name: record.name,
      })

      this.props.rootStore.routing.push(
        `${this.prefix}/${encodeURIComponent(record.name)}/activity`
      )
    }
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  handleCreate = () => {
    const { trigger, module } = this.props

    trigger('pipeline.create', {
      module,
      title: t('Create Pipeline'),
      formTemplate: this.formTemplate,
      devops: this.devops,
      cluster: this.cluster,
      noCodeEdit: true,
      success: () => {
        this.getData()
      },
    })
  }

  handleCopy = async name => {
    const { trigger } = this.props
    const formData = await this.getCRDDetail(name)

    trigger('pipeline.copy', {
      title: t('Copy Pipeline'),
      formTemplate: formData,
      devops: this.devops,
      cluster: this.cluster,
      success: () => {
        this.getData()
      },
    })
  }

  getCRDDetail = async name => {
    await this.props.store.fetchDetail({
      cluster: this.cluster,
      name,
      devops: this.devops,
    })

    const formData = cloneDeep(this.props.store.getPipeLineConfig())
    formData.devops = this.devops
    formData.cluster = this.cluster
    formData.devopsName = this.devopsName

    return formData
  }

  handleAdvanceEdit = async name => {
    const formData = await this.getCRDDetail(name)

    this.props.trigger('pipeline.advance.edit', {
      title: t('Edit Pipeline'),
      formTemplate: formData,
      cluster: this.cluster,
      devops: this.devops,
      success: () => {
        this.handleFetch()
      },
    })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '20%',
      render: (name, record) => {
        const url = `/${this.workspace}/clusters/${this.cluster}/devops/${
          this.devops
        }/pipelines/${encodeURIComponent(record.name)}${
          record.numberOfFailingBranches !== undefined ? '/activity' : ''
        }`
        return <Avatar to={this.isRuning ? null : url} title={name} />
      },
    },

    {
      title: t('WeatherScore'),
      dataIndex: 'weatherScore',
      width: '30%',
      isHideable: true,
      render: weatherScore => <Health score={weatherScore} />,
    },
    {
      title: t('Branch'),
      dataIndex: 'totalNumberOfBranches',
      width: '25%',
      isHideable: true,
      render: totalNumberOfBranches =>
        totalNumberOfBranches === undefined ? '-' : totalNumberOfBranches,
    },
    {
      title: t('PullRequest'),
      dataIndex: 'totalNumberOfPullRequests',
      width: '20%',
      isHideable: true,
      render: totalNumberOfPullRequests =>
        totalNumberOfPullRequests === undefined
          ? '-'
          : totalNumberOfPullRequests,
    },
  ]

  handleMultiBatchRun = () => {
    const { selectedRowKeys, data } = toJS(this.props.store.list)

    const multiData = selectedRowKeys.filter(item => {
      const multi = data.find(_item => _item.name === item)
      return multi.totalNumberOfBranches
    })

    const isMulti = !isEmpty(multiData)

    if (isMulti) {
      Notify.error(t('BATCH_RUN_DESC'))
      return false
    }

    this.props.trigger('pipeline.batch.run', {
      type: t('Pipeline'),
      rowKey: 'name',
      devops: this.devops,
      cluster: this.cluster,
      success: () => {
        setTimeout(() => {
          this.handleFetch()
        }, 1000)
      },
    })
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
          name="Pipeline"
          action={
            showCreate ? (
              <Button onClick={showCreate} type="control">
                {t('Create')}
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
          text: t('Run'),
          action: 'delete',
          onClick: this.handleMultiBatchRun,
        },
        {
          key: 'delete',
          type: 'danger',
          text: t('Delete'),
          action: 'delete',
          onClick: () =>
            this.props.trigger('pipeline.batch.delete', {
              type: t('Pipeline'),
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

  render() {
    const { bannerProps } = this.props

    return (
      <ListPage getData={this.getData} {...this.props}>
        <Banner {...bannerProps} />
        {this.renderContent()}
      </ListPage>
    )
  }
}
