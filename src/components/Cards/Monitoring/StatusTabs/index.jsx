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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, isFunction } from 'lodash'

import { cacheFunc } from 'utils'
import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'

import { Loading } from '@kube-design/components'
import { Card, Empty } from 'components/Base'

import styles from './index.scss'

export default class StatusTabs extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    tabOptions: PropTypes.array,
    contentOptions: PropTypes.array,
    loading: PropTypes.bool,
    refreshing: PropTypes.bool,
    onFetch: PropTypes.func,
  }

  static defaultProps = {
    title: '',
    tabOptions: [],
    contentOptions: [],
    loading: true,
    refreshing: false,
    onFetch() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: 0,
    }

    this.fetchData()
  }

  componentDidMount() {
    startAutoRefresh(this, {
      interval: 10000,
      leading: false,
    })
  }

  componentWillUnmount() {
    stopAutoRefresh(this)
  }

  fetchData = (params = {}) => {
    this.props.onFetch(params)
  }

  handleTabClick = index =>
    cacheFunc(
      `_tab_${index}`,
      () => {
        this.setState({ activeIndex: Number(index) })
      },
      this
    )

  renderTabList() {
    const { tabOptions } = this.props
    const { activeIndex } = this.state

    if (isEmpty(tabOptions)) return null

    return (
      <div className={styles.tabList}>
        {tabOptions.map((op, index) => {
          const isActive = index === activeIndex
          const Component = op.component
          const render = op.render
          const props = {
            ...op.props,
            active: isActive,
          }

          return (
            <div
              key={index}
              className={classnames(styles.tab, {
                [styles.active]: isActive,
              })}
              onClick={this.handleTabClick(index)}
            >
              <i className={styles.img} />
              <div className={styles.inner}>
                {isFunction(render) ? render(props) : <Component {...props} />}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  renderTabContent() {
    const { contentOptions } = this.props
    const { activeIndex } = this.state
    const op = contentOptions[activeIndex] || {}
    const Component = op.component
    const render = op.render
    const props = {
      ...op.props,
    }

    return (
      <div className={styles.tabContent}>
        <div className={styles.inner}>
          {isEmpty(contentOptions) ? (
            <Empty />
          ) : isFunction(render) ? (
            render(props)
          ) : (
            <Component {...props} />
          )}
        </div>
      </div>
    )
  }

  render() {
    const { className, title, loading } = this.props

    return (
      <Card className={classnames(styles.card, className)} title={title}>
        <Loading spinning={loading}>
          <div className={styles.content}>
            {this.renderTabList()}
            {this.renderTabContent()}
          </div>
        </Loading>
      </Card>
    )
  }
}
