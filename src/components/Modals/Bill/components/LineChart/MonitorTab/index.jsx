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
import { get, isEmpty, isUndefined } from 'lodash'

import { getAreaChartOps } from 'utils/monitoring'

import { Text } from 'components/Base'

import { SimpleArea } from 'components/Charts'

import styles from './index.scss'

export default class MonitorTab extends React.Component {
  static propTypes = {
    tabs: PropTypes.array,
  }

  static defaultProps = {
    tabs: [],
  }

  state = {
    activeTab: get(this, 'props.tabs[0].key', ''),
  }

  handleTabClick = e =>
    this.setState({ activeTab: e.currentTarget.dataset.key })

  renderTabList() {
    const { tabs } = this.props
    const { activeTab } = this.state

    if (isEmpty(tabs)) return null

    return (
      <div className={styles.tabHeader}>
        {tabs.map(tab => (
          <div
            key={tab.key}
            className={classnames(styles.tabHeaderItem, {
              [styles.active]: tab.key === activeTab,
            })}
            data-key={tab.key}
            onClick={this.handleTabClick}
          >
            <Text
              icon={tab.icon}
              title={
                !tab.data || isUndefined(tab.titleValue)
                  ? '-'
                  : `${tab.titleValue} ${tab.unit}`
              }
              description={tab.title}
            />
          </div>
        ))}
      </div>
    )
  }

  renderTabContent() {
    const { tabs } = this.props
    const { activeTab } = this.state

    const tab = tabs.find(_tab => _tab.key === activeTab)

    if (!tab || !tab.data) {
      return null
    }

    const config = getAreaChartOps(tab)

    return (
      <div className={styles.tabContent}>
        <SimpleArea
          width="100%"
          height={200}
          yAxis={{
            hide: true,
            domain: [0, 100],
          }}
          {...config}
        />
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTabList()}
        {this.renderTabContent()}
      </div>
    )
  }
}
