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
  Pagination,
  Level,
  LevelLeft,
  LevelRight,
  Icon,
  Loading,
} from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import SortMetricSelect from 'console/components/Cards/Monitoring/UsageRank/select'
import Table from 'console/containers/MonitoringCenter/Monitoring/Resource/Ranking/Project/Table'

import styles from './index.scss'

@inject('rootStore')
@observer
class Ranking extends React.Component {
  constructor(props) {
    super(props)

    this.store = new Store({
      workspace: this.workspace,
      limit: 10,
      sort_type: 'desc',
    })
  }

  get workspace() {
    return get(this.props, 'match.params.workspace')
  }

  export = () => {
    this.store.download('project.usage.rank.json')
  }

  componentDidMount() {
    this.store.fetchAll()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderToolbar()}
        {this.renderList()}
      </div>
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
