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

import { isEmpty } from 'lodash'
import React from 'react'
import { observer, inject } from 'mobx-react'
import { Loading, Pagination } from '@pitrix/lego-ui'
import { Button, Search } from 'components/Base'
import Banner from 'components/Cards/Banner'
import EmptyList from 'components/Cards/EmptyList'
import ClusterCard from 'clusters/components/Cards/Cluster'
import ClusterStore from 'stores/cluster'

import styles from './index.scss'

@inject('rootStore')
@observer
class Clusters extends React.Component {
  constructor(props) {
    super(props)

    this.store = new ClusterStore()
  }

  componentDidMount() {
    this.store.fetchList({ limit: 10 })
  }

  get authKey() {
    return 'clusters'
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.authKey,
    })
  }

  get routing() {
    return this.props.rootStore.routing
  }

  showAddCluster = () => {
    this.routing.push('/clusters/add')
  }

  handlePagination = page => {
    this.store.fetchList({ page, limit: 10 })
  }

  handleRefresh = () => {
    this.store.fetchList({ page: 1, limit: 10 })
  }

  handleSearch = name => {
    const params = { name, limit: 10 }
    this.store.fetchList(params)
  }

  enterCluster = async cluster => {
    this.routing.push(`/clusters/${cluster}/overview`)
  }

  renderList() {
    const { data, page, total, limit, filters, isLoading } = this.store.list

    if (isEmpty(data) && !isLoading && isEmpty(filters)) {
      return (
        <EmptyList
          icon="cluster"
          title={t('NO_CLUSTER_TIP')}
          desc={t('NO_CLUSTER_TIP_DESC')}
          actions={
            this.enabledActions.includes('create') ? (
              <Button type="control" onClick={this.showAddCluster}>
                {t('Add Cluster')}
              </Button>
            ) : null
          }
        />
      )
    }

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    return (
      <ul className={styles.cards}>
        <div className="h6">
          {t('Cluster List')} <span className={styles.total}>{total}</span>
        </div>
        {!isLoading && isEmpty(data) ? (
          <div className={styles.noData}>
            <img src="/assets/empty-card.svg" alt="" />
            <p>{t('RESOURCE_NOT_FOUND')}</p>
          </div>
        ) : (
          <>
            {data.map(item => (
              <ClusterCard
                key={item.name}
                data={item}
                onEnter={this.enterCluster}
              />
            ))}
            <div className="text-right margin-t12">
              <Pagination
                current={page}
                total={total}
                pageSize={limit}
                onChange={this.handlePagination}
              />
            </div>
          </>
        )}
      </ul>
    )
  }

  renderSearch() {
    return (
      <div className={styles.searchPanel}>
        <Search
          className={styles.search}
          onSearch={this.handleSearch}
          placeholder={t('Please input a keyword to find')}
        />
        <Button
          type="flat"
          icon="refresh"
          onClick={this.handleRefresh}
          data-test="cluster-refresh"
        />
        {this.enabledActions.includes('create') && (
          <Button
            type="control"
            onClick={this.showAddCluster}
            data-test="cluster-create"
          >
            {t('Add Cluster')}
          </Button>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Banner
          className={styles.banner}
          icon="cluster"
          title={t('Clusters Management')}
          description={t('CLUSTERS_MANAGE_DESC')}
          extra={this.renderSearch()}
        />
        {this.renderList()}
      </div>
    )
  }
}

export default Clusters
