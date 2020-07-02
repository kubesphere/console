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
import classNames from 'classnames'
import { get } from 'lodash'

import Store from 'stores/rank/project'

import {
  Select,
  Pagination,
  Level,
  LevelLeft,
  LevelRight,
  Icon,
  Loading,
} from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import SortMetricSelect from 'clusters/components/Cards/Monitoring/UsageRank/select'
import Table from 'clusters/containers/Monitor/Resource/Ranking/Project/Table'

import styles from './index.scss'

@inject('rootStore', 'workspaceStore')
@observer
class Ranking extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cluster: '',
    }

    this.store = new Store({
      workspace: this.workspace,
      limit: 10,
      sort_type: 'desc',
    })
    this.workspaceStore = this.props.workspaceStore
  }

  get workspace() {
    return get(this.props, 'match.params.workspace')
  }

  get clusters() {
    return this.workspaceStore.clusters.data.map(cluster => ({
      label: `${t('Cluster')}: ${cluster.name}`,
      value: cluster.name,
    }))
  }

  export = () => {
    this.store.download('project.usage.rank.json')
  }

  fetchMetrics = () => {
    if (this.state.cluster) {
      this.store.cluster = this.state.cluster
      this.store.fetchAll()
    }
  }

  componentDidMount() {
    const cluster =
      this.workspaceStore.clusters.data.find(item => item.isHost) ||
      this.workspaceStore.clusters.data[0]
    if (cluster) {
      this.setState({ cluster: cluster.name }, () => {
        this.fetchMetrics()
      })
    }
  }

  handleClusterChange = cluster => {
    this.setState({ cluster }, () => {
      this.fetchMetrics()
    })
  }

  render() {
    if (this.workspaceStore.clusters.data.length > 0) {
      return (
        <div className={styles.wrapper}>
          {this.renderToolbar()}
          {this.renderList()}
        </div>
      )
    }

    return (
      <EmptyList
        icon="cluster"
        title={t('No Available Cluster')}
        desc={t('WORKSPACE_NO_CLUSTER_TIP')}
      />
    )
  }

  renderToolbar() {
    return (
      <div
        className={classNames(
          styles.toolbar,
          styles.pane__toolbar,
          styles.pane
        )}
      >
        <div className={styles.toolbar_filter}>
          <Select
            options={this.clusters}
            value={this.state.cluster}
            onChange={this.handleClusterChange}
          />
          <SortMetricSelect store={this.store} />
          <span className={styles.sort_button}>
            <Icon
              name={
                this.store.sort_type === 'desc'
                  ? 'sort-descending'
                  : 'sort-ascending'
              }
              type="coloured"
              size="small"
              onClick={this.store.changeSortType}
            />
          </span>
        </div>
        <div className={styles.toolbar_buttons}>
          <Button onClick={this.export}>{t('Export')}</Button>
        </div>
      </div>
    )
  }

  renderList() {
    return (
      <Loading spinning={this.store.isLoading}>
        <div>
          <Table store={this.store} />
          {this.renderPagination()}
        </div>
      </Loading>
    )
  }

  renderPagination() {
    const { page, total_page: total } = this.store
    const { limit } = this.store

    return (
      <div className={classNames(styles.pane, styles.pane__pagination)}>
        <Level>
          <LevelLeft />
          <LevelRight>
            <Pagination
              current={page}
              total={total * limit}
              pageSize={limit}
              onChange={this.store.changePagination}
            />
          </LevelRight>
        </Level>
      </div>
    )
  }
}

export default Ranking
