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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import BuilderRunStore from 'stores/devops/imageBuilderRun'

import {
  Level,
  LevelLeft,
  LevelRight,
  Pagination,
  Loading,
} from '@kube-design/components'
import RunItem from './Item/devops'

import styles from './index.scss'

@observer
export default class DevopsRunsCard extends React.Component {
  static propTypes = {
    prefix: PropTypes.string,
    title: PropTypes.string,
    detail: PropTypes.object,
    hideHeader: PropTypes.bool,
    hideFooter: PropTypes.bool,
    onSearch: PropTypes.func,
    onRefresh: PropTypes.func,
    onPage: PropTypes.func,
    limit: PropTypes.number,
    imageBuilderName: PropTypes.string,
  }

  static defaultProps = {
    isB2i: false,
    detail: {},
    hideHeader: false,
    hideFooter: true,
    onSearch() {},
    onRefresh() {},
    onPage() {},
  }

  constructor(props) {
    super(props)

    this.store = new BuilderRunStore(props.imageBuilderName)
  }

  componentDidMount() {
    this.fetchData()
  }

  setAutoRefresh = () => {
    const { data } = this.store.list
    clearInterval(this.timer)
    const hasRunning = data.some(run => {
      return (
        !['successful', 'failed'].includes(run.status.toLowerCase()) ||
        isEmpty(run.status)
      )
    })
    if (hasRunning) {
      this.timer = setInterval(this.fetchData, 4000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  get isTable() {
    const { hideHeader, hideFooter } = this.props
    return !hideHeader || !hideFooter
  }

  fetchData = async (params = {}) => {
    const { limit, params: _params } = this.props
    await this.store.fetchListByK8s({
      limit,
      ..._params,
      ...params,
    })
    this.setAutoRefresh()
  }

  getPagination = () => {
    const { page, limit, total } = this.store.list
    const pagination = { page, limit, total }
    return pagination
  }

  handleSearch = value => {
    this.searchValue = value
    this.fetchData({
      name: value,
    }).then(() => {
      this.props.onSearch(value)
    })
  }

  handlePage = page => {
    this.fetchData({ page }).then(() => {
      this.props.onPage(page)
    })
  }

  renderContent() {
    const { data, isLoading } = this.store.list

    const content = (
      <div className={styles.body}>
        {isEmpty(data) ? (
          <div className={styles.empty}>{t('NO_DATA')}</div>
        ) : (
          data.map(run => this.renderItem(run))
        )}
      </div>
    )

    return this.isTable ? (
      <Loading spinning={isLoading}>{content}</Loading>
    ) : (
      content
    )
  }

  renderItem(run) {
    const { isLoading } = this.store.list
    return (
      <RunItem
        key={run.name}
        runDetail={run}
        loading={isLoading}
        store={this.store}
        isB2i={false}
        hiddenLog={true}
      />
    )
  }

  renderFooter = () => {
    const { total, page, limit } = this.getPagination()

    return (
      <Level className={styles.footer}>
        <LevelLeft>{t('TOTAL_ITEMS', { num: total })}</LevelLeft>
        <LevelRight>
          <Pagination
            page={page}
            total={total}
            limit={limit}
            onChange={this.handlePage}
          />
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { className } = this.props

    return (
      <div className={classnames(className, styles.content)}>
        {this.renderContent()}
      </div>
    )
  }
}
