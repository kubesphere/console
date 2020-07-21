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
import { Icon } from '@pitrix/lego-ui'
import { formatSize } from 'utils'

import EmptyCard from '../../EmptyCard'
import Table from '../../Table'

@inject('rootStore')
@observer
export default class Artifacts extends React.Component {
  constructor(props) {
    super(props)
    this.name = 'Artifacts'
    this.store = props.detailStore || {}
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

  get routing() {
    return this.props.rootStore.routing
  }

  get prefix() {
    return this.props.match.url
  }

  getDownloadUrl = url => {
    const { params } = this.props.match
    return params.cluster === 'default' || !params.cluster
      ? `/kapis/devops.kubesphere.io/v1alpha2/jenkins${url}`
      : `/kapis/clusters/${
          params.cluster
        }/devops.kubesphere.io/v1alpha2/jenkins${url}`
  }

  getFilteredValue = dataIndex => this.store.list.filters[dataIndex]

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'path',
      width: '40%',
      render: (path, record) => (
        <a
          href={this.getDownloadUrl(record.url)}
          target="_blank"
          download={true}
        >
          {path}
        </a>
      ),
    },
    {
      title: t('Size'),
      dataIndex: 'size',
      width: '40%',
      render: size => formatSize(size),
    },
    {
      title: t('Download'),
      width: '20%',
      key: 'download',
      render: record => (
        <a
          href={this.getDownloadUrl(record.url)}
          target="_blank"
          download={true}
        >
          <Icon name="download" />
        </a>
      ),
    },
  ]

  render() {
    const { data, filters, isLoading, total, page, limit } = toJS(
      this.store.artifactsList
    )

    const isEmptyList = isLoading === false && total === 0

    const omitFilters = omit(filters, 'page')

    if (isEmptyList && !filters.page) {
      return <EmptyCard desc={t('No artifacts records')} />
    }

    const pagination = { total, page, limit }

    return (
      <Table
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        rowKey={'path'}
        pagination={pagination}
        isLoading={isLoading}
        onFetch={this.handleFetch}
        disableSearch
      />
    )
  }
}
