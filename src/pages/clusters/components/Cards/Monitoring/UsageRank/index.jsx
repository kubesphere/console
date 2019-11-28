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
import { action, observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get } from 'lodash'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Level, LevelLeft, LevelRight, Loading } from '@pitrix/lego-ui'

import WorkspaceStore from 'stores/rank/workspace'
import NodeStore from 'stores/rank/node'
import NodeTable from 'components/Cards/RankTable/NodeTable'
import WorkspaceTable from 'components/Cards/RankTable/WorkspaceTable'
import { THEME } from 'components/Tables/Ranking'
import Select from './select'

import styles from './index.scss'

const storeParams = {
  limit: 5,
  page: 1,
  sort_type: 'desc',
}

@inject('rootStore')
@observer
class UsageRanking extends React.Component {
  @observable
  tab = 'node'

  rankingMap = {
    node: {
      store: new NodeStore(storeParams),
      Table: NodeTable,
      text: t('Node Usage Top5'),
      link: '/monitoring/monitor-cluster/ranking',
    },
    workspace: {
      store: new WorkspaceStore(storeParams),
      Table: WorkspaceTable,
      text: t('Workspace Usage Top5'),
      link: '/monitoring/monitor-resource/ranking',
    },
  }

  @computed
  get store() {
    return get(this.rankingMap, `${this.tab}.store`)
  }

  @computed
  get Table() {
    return get(this.rankingMap, `${this.tab}.Table`)
  }

  @computed
  get link() {
    return get(this.rankingMap, `${this.tab}.link`)
  }

  componentDidMount() {
    this.store.fetchAll()
  }

  @action
  changeTab = e => {
    this.tab = e.target.dataset.tab
    this.store.fetchAll()
  }

  render() {
    return (
      <div className={classnames(styles.wrapper, this.props.className)}>
        <div className={styles.inner}>
          <Level>
            <LevelLeft>{this.renderTabs()}</LevelLeft>
            <LevelRight>
              <Select store={this.store} />
            </LevelRight>
          </Level>
          {this.renderTable()}
        </div>
        <p className={styles.link}>
          <Link to={this.link}>{t('View All')}</Link>
        </p>
      </div>
    )
  }

  renderTabs() {
    return (
      <div className={styles.pane}>
        <span className={styles.tabs}>
          {Object.entries(this.rankingMap).map(([tab, { text }]) => (
            <span
              key={tab}
              data-tab={tab}
              className={this.tab === tab ? styles.selected : ''}
              onClick={this.changeTab}
            >
              {text}
            </span>
          ))}
        </span>
      </div>
    )
  }

  renderTable() {
    const Table = this.Table
    return (
      <Loading spinning={this.store.isLoading}>
        <Table theme={THEME.transparent} store={this.store} />
      </Loading>
    )
  }
}

export default UsageRanking
