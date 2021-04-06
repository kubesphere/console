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
import { observer, inject } from 'mobx-react'

import { toJS } from 'mobx'
import { parse } from 'qs'
import { omit } from 'lodash'

import CredentialStore from 'stores/devops/credential'
import { trigger } from 'utils/action'
import { getLocalTime } from 'utils'

import { Avatar } from 'components/Base'
import Banner from 'components/Cards/Banner'
import Table from 'components/Tables/Base'

import styles from './index.scss'

@inject('rootStore', 'devopsStore')
@observer
@trigger
class Credential extends React.Component {
  constructor(props) {
    super(props)

    this.store = new CredentialStore()
    this.formTemplate = {}
  }

  componentDidMount() {
    this.unsubscribe = this.routing.history.subscribe(location => {
      const params = parse(location.search.slice(1))
      const { devops, cluster } = this.props.match.params

      this.store.fetchList({
        devops,
        cluster,
        ...params,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'credentials',
      cluster: this.props.match.params.cluster,
      devops: this.props.devopsStore.devops,
    })
  }

  getData() {
    const { devops, cluster } = this.props.match.params
    const query = parse(location.search.slice(1))

    this.store.fetchList({
      devops,
      cluster,
      ...query,
    })
  }

  handleFetch = (params, refresh) => {
    this.routing.query(params, refresh)
  }

  get prefix() {
    if (this.props.match.url.endsWith('/')) {
      return this.props.match.url.slice(0, -1)
    }
    return this.props.match.url
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get module() {
    return 'cridentials'
  }

  get name() {
    return 'Credentials'
  }

  handleCreate = () => {
    const { devops, cluster } = this.props.match.params
    this.trigger('devops.credential.create', {
      devops,
      cluster,
      success: () => {
        this.getData()
      },
    })
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '35%',
      render: id => {
        const url = `${this.prefix}/${encodeURIComponent(id)}`
        return <Avatar to={this.isRuning ? null : url} title={id} />
      },
    },
    {
      title: t('Type'),
      dataIndex: 'type',
      width: '25%',
      render: type => t(type),
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      render: description => description,
      width: '25%',
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      width: '20%',
      render: createTime =>
        getLocalTime(createTime).format(`YYYY-MM-DD HH:mm:ss`),
    },
  ]

  renderContent() {
    const { data, filters, isLoading, total, page, limit } = toJS(
      this.store.list
    )
    const showCreate = this.enabledActions.includes('create')
      ? this.handleCreate
      : null

    const omitFilters = omit(filters, ['page', 'limit', 'sortBy'])
    const pagination = { total, page, limit }

    return (
      <Table
        data={data}
        columns={this.getColumns()}
        filters={omitFilters}
        pagination={pagination}
        rowKey="uid"
        isLoading={isLoading}
        onFetch={this.handleFetch}
        onCreate={showCreate}
        searchType="name"
        module={this.module}
        name={this.name}
      />
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Banner
          title={t('DevOps Credentials')}
          icon="key"
          description={t('DEVOPS_PROJECT_CREDENTIALS_DESC')}
          module={this.module}
        />
        {this.renderContent()}
      </div>
    )
  }
}

export default Credential
