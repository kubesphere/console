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
import { observer, inject } from 'mobx-react'
import { parse } from 'qs'
import { omit } from 'lodash'
import { Icon } from '@kube-design/components'
import { formatSize } from 'utils'

import Table from 'components/Tables/List'
import EmptyCard from 'devops/components/Cards/EmptyCard'

@inject('rootStore', 'detailStore')
@observer
export default class Artifacts extends React.Component {
  name = 'Artifacts'

  store = this.props.detailStore || {}

  get routing() {
    return this.props.rootStore.routing
  }

  get prefix() {
    return this.props.match.url
  }

  componentDidMount() {
    const { params } = this.props.match

    this.unsubscribe = this.routing.history.subscribe(location => {
      if (location.pathname === this.props.match.url) {
        const query = parse(location.search.slice(1))
        this.getData({ ...params, ...query })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  getData(params) {
    this.store.getArtifacts({
      ...params,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  getDownloadUrl = (pipeline, pipelineRun, path) => {
    const { params } = this.props.match

    return params.cluster === 'default' || !params.cluster
      ? `/kapis/devops.kubesphere.io/v1alpha3/namespaces/${params.devops}/pipelineruns/${pipelineRun}/artifacts/download?filename=${path}`
      : `/kapis/clusters/${params.cluster}/devops.kubesphere.io/v1alpha3/namespaces/${params.devops}/pipelineruns/${pipelineRun}/artifacts/download?filename=${path}`
  }

  getFilteredValue = dataIndex => this.store.list.filters[dataIndex]

  getColumns = (pipeline, pipelineRun) => [
    {
      title: t('NAME'),
      dataIndex: 'path',
      width: '40%',
      render: path => (
        <a
          href={this.getDownloadUrl(pipeline, pipelineRun, path)}
          target="_blank"
          download={true}
          rel="noreferrer noopener"
        >
          {path}
        </a>
      ),
    },
    {
      title: t('SIZE'),
      dataIndex: 'size',
      width: '40%',
      render: size => formatSize(size),
    },
    {
      title: t('DOWNLOAD'),
      width: '20%',
      key: 'download',
      render: (download, { path }) => (
        <a
          href={this.getDownloadUrl(pipeline, pipelineRun, path)}
          target="_blank"
          download={true}
          rel="noreferrer noopener"
        >
          <Icon name="download" />
        </a>
      ),
    },
  ]

  render() {
    const {
      data,
      pipeline,
      pipelineRun,
      filters,
      isLoading,
      total,
      page,
      limit,
    } = toJS(this.store.artifactsList)
    const isEmptyList = total === 0
    const omitFilters = omit(filters, 'page', 'workspace')

    if (isEmptyList && !filters.page) {
      return <EmptyCard desc={t('NO_ARTIFACT_FOUND_TIP')} />
    }

    const pagination = { total, page, limit }

    return (
      <Table
        data={data}
        columns={this.getColumns(pipeline, pipelineRun)}
        filters={omitFilters}
        rowKey={'path'}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        hideSearch
      />
    )
  }
}
