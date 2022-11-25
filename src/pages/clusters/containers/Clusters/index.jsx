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

import { isEmpty, sortBy } from 'lodash'
import React from 'react'
import { observer, inject } from 'mobx-react'
import {
  Button,
  Loading,
  Pagination,
  InputSearch,
} from '@kube-design/components'
import Banner from 'components/Cards/Banner'
import EmptyList from 'components/Cards/EmptyList'
import ClusterCard from 'clusters/components/Cards/Cluster'
import ClusterStore from 'stores/cluster'
import { trigger } from 'utils/action'

import EditBasicInfoModal from 'clusters/components/Modals/EditBasicInfo'
import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
class Clusters extends React.Component {
  constructor(props) {
    super(props)

    this.store = new ClusterStore()
    this.hostStore = new ClusterStore()
  }

  componentDidMount() {
    this.initData()
  }

  get authKey() {
    return 'clusters'
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.authKey,
    })
  }

  get isOperation() {
    return this.enabledActions.includes('create')
  }

  get routing() {
    return this.props.rootStore.routing
  }

  initData = () => {
    this.fetchHostData()
    this.fetchData()
  }

  fetchData = (params = {}) => {
    this.store.fetchListByUser({
      ...params,
      limit: 10,
      labelSelector: '!cluster-role.kubesphere.io/host',
    })
  }

  fetchHostData = (params = {}) => {
    this.hostStore.fetchListByUser({
      ...params,
      labelSelector: 'cluster-role.kubesphere.io/host=',
      limit: -1,
    })
  }

  showAddCluster = () => {
    this.trigger('cluster.add', {
      module: 'clusters',
      success: this.routing.push,
    })
  }

  handlePagination = page => {
    this.fetchData({ page })
  }

  handleRefresh = () => {
    this.fetchData({ page: 1 })
  }

  handleSearch = name => {
    this.fetchData({ name })
    this.fetchHostData({ name })
  }

  enterCluster = async cluster => {
    this.routing.push(`/clusters/${cluster}/overview`)
  }

  getItemActions = item => {
    const actions = [
      {
        key: 'pen',
        icon: 'pen',
        text: t('EDIT_INFORMATION'),
        show: true,
        onClick: record => {
          this.trigger('resource.baseinfo.edit', {
            detail: record,
            modal: EditBasicInfoModal,
            success: this.initData,
          })
        },
      },
      {
        key: 'data',
        icon: 'data',
        text: t('UPDATE_KUBECONFIG'),
        show: !item.isHost && item.connectionType !== 'proxy',
        onClick: record => {
          this.trigger('cluster.updateKubeConfig', {
            detail: record,
            success: this.initData,
          })
        },
      },
      {
        key: 'trash',
        icon: 'trash',
        text: t('REMOVE_CLUSTER'),
        show: !item.isHost,
        onClick: record => {
          this.trigger('cluster.unbind', {
            detail: record,
            success: this.initData,
          })
        },
      },
    ]

    return actions.filter(action => action.show)
  }

  renderList() {
    const { data, page, total, limit, filters, isLoading } = this.store.list
    const {
      data: hostClusters,
      isLoading: isHostLoading,
      filters: hostFilters,
    } = this.hostStore.list

    if (
      isEmpty(data) &&
      !isLoading &&
      isEmpty(filters) &&
      !isHostLoading &&
      isEmpty(hostFilters) &&
      isEmpty(hostClusters)
    ) {
      return (
        <EmptyList
          icon="cluster"
          title={t('NO_CLUSTER_TIP')}
          desc={t('NO_CLUSTER_TIP_DESC')}
          actions={
            this.isOperation ? (
              <Button type="control" onClick={this.showAddCluster}>
                {t('ADD_CLUSTER')}
              </Button>
            ) : null
          }
        />
      )
    }

    if (isLoading || isHostLoading) {
      return <Loading className={styles.loading} />
    }

    if (
      !isLoading &&
      isEmpty(data) &&
      !isHostLoading &&
      isEmpty(hostClusters)
    ) {
      return (
        <>
          <div className="h6 margin-b12">
            {t('CLUSTER_PL')} <span className={styles.total}>{total}</span>
          </div>
          <div className={styles.noData}>
            <img src="/assets/empty-card.svg" alt="" />
            <p>{t('NO_RESOURCE_FOUND')}</p>
          </div>
        </>
      )
    }

    const _data = sortBy(data, item => item.expiredDay)

    return (
      <ul className={styles.cards}>
        {!isEmpty(hostClusters) && (
          <div className="margin-b12">
            <div className="h6">
              {hostClusters.length === 1
                ? t('HOST_CLUSTER_TCAP')
                : t('HOST_CLUSTER_PL_TCAP')}
            </div>
            {hostClusters.map(item => (
              <ClusterCard
                key={item.name}
                data={item}
                onEnter={this.enterCluster}
                isOperation={this.isOperation}
                itemActions={this.getItemActions(item)}
              />
            ))}
          </div>
        )}
        {!isEmpty(_data) && (
          <div>
            <div className="h6">
              {t('MEMBER_CLUSTER_TCAP_PL')}{' '}
              <span className={styles.total}>{total}</span>
            </div>
            {_data.map(item => (
              <ClusterCard
                key={item.name}
                data={item}
                onEnter={this.enterCluster}
                isOperation={this.isOperation}
                itemActions={this.getItemActions(item)}
              />
            ))}
            <div className="text-right margin-t12">
              <Pagination
                page={page}
                total={total}
                limit={limit}
                onChange={this.handlePagination}
              />
            </div>
          </div>
        )}
      </ul>
    )
  }

  renderSearch() {
    return (
      <div className={styles.searchPanel}>
        <InputSearch
          className={styles.search}
          onSearch={this.handleSearch}
          placeholder={t('SEARCH_BY_NAME')}
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
            {t('ADD_CLUSTER')}
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
          title={t('CLUSTER_MANAGEMENT')}
          description={t('CLUSTER_DESC')}
          extra={this.renderSearch()}
        />
        {this.renderList()}
      </div>
    )
  }
}

export default Clusters
