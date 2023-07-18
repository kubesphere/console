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
  Button,
  Select,
  Pagination,
  Level,
  LevelLeft,
  LevelRight,
  Icon,
  Loading,
} from '@kube-design/components'
import EmptyList from 'components/Cards/EmptyList'
import Table from 'clusters/containers/Monitor/Resource/Ranking/Project/Table'
import StatusReason from 'clusters/components/StatusReason'
import { showNameAndAlias } from 'utils'

import styles from './index.scss'

@inject('rootStore', 'workspaceStore')
@observer
class Ranking extends React.Component {
  constructor(props) {
    super(props)

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
      label: cluster.name,
      value: cluster.name,
      disabled: !cluster.isReady,
      cluster,
    }))
  }

  get options() {
    return this.store.sort_metric_options.map(option => ({
      value: option,
      label: t(`SORT_BY_${option.toUpperCase()}`),
    }))
  }

  valueRenderer = option =>
    t('CLUSTER_VALUE', { value: showNameAndAlias(option.cluster) })

  optionRenderer = option => (
    <div>
      <div>{showNameAndAlias(option.cluster)}</div>
      {!option.cluster.isReady && (
        <div>
          <StatusReason data={option.cluster} noTip />
        </div>
      )}
    </div>
  )

  export = () => {
    this.store.download('project.usage.rank.json')
  }

  fetchMetrics = () => {
    if (this.workspaceStore.cluster) {
      this.store.cluster = this.workspaceStore.cluster
      this.store.fetchAll()
    }
  }

  componentDidMount() {
    this.fetchMetrics()
  }

  handleClusterChange = cluster => {
    this.workspaceStore.selectCluster(cluster)
    this.fetchMetrics()
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
        title={t('NO_CLUSTER_AVAILABLE')}
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
            value={this.workspaceStore.cluster}
            onChange={this.handleClusterChange}
            valueRenderer={this.valueRenderer}
            optionRenderer={this.optionRenderer}
          />
          <Select
            value={this.store.sort_metric}
            onChange={this.store.changeSortMetric}
            options={this.options}
          />
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
          <Button onClick={this.export}>{t('EXPORT')}</Button>
        </div>
      </div>
    )
  }

  renderList() {
    return (
      <Loading spinning={this.store.isLoading}>
        <div>
          <Table
            store={this.store}
            cluster={this.workspaceStore.cluster}
            workspace={this.workspace}
          />
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
              page={page}
              total={total}
              limit={limit}
              onChange={this.store.changePagination}
            />
          </LevelRight>
        </Level>
      </div>
    )
  }
}

export default Ranking
