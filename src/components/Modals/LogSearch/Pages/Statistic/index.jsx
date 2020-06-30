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

import React, { Component } from 'react'
import { Icon, Loading } from '@pitrix/lego-ui'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import PropTypes from 'prop-types'
import moment from 'moment-mini'

import Statistic from 'stores/logging/v3/statistic'
import FieldsInput from 'components/Modals/LogSearch/components/FieldsSearchBar'

import styles from './index.scss'

/**
 * Only render view and export events;
 */
class LogStatisticPage extends Component {
  static propTypes = {
    isLoadingStatistic: PropTypes.bool,
    logStatistic: PropTypes.number,
    containerStatistic: PropTypes.number,
    statisticStartTime: PropTypes.number,
    fields: PropTypes.array,

    onQueryFieldChange: PropTypes.func,
    supportQueryFields: PropTypes.array,
  }

  static defaultProps = {
    isLoadingStatistic: false,
    logStatistic: 0,
    containerStatistic: 0,
    statisticStartTime: 0,
    fields: [],
    onQueryFieldChange() {},
    supportQueryFields: [],
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          {this.renderHeader()}
          {this.renderSearchBar()}
          {/* {this.renderWorkspaces()} */}
          {this.renderStatistic()}
        </div>
      </div>
    )
  }

  renderHeader() {
    return (
      <header>
        <h1>
          <Icon name={'log'} size="large" />
          <span>{t('LOG_SEARCH_TOOL')}</span>
        </h1>
        <p>{t('LOG_SEARCH_TOOL_DESC')}</p>
      </header>
    )
  }

  renderSearchBar() {
    const { supportQueryFields, onQueryFieldChange, fields } = this.props

    return (
      <div className={styles.searchBar}>
        <h3>{t('LOG_SEARCH_BAR_LABEL')}</h3>
        <FieldsInput
          fields={fields}
          onChange={onQueryFieldChange}
          supportFields={supportQueryFields}
        />
      </div>
    )
  }

  renderWorkspaces() {
    return 'workspaces'
  }

  renderStatistic() {
    const {
      isLoadingStatistic,
      logStatistic,
      containerStatistic,
      statisticStartTime,
    } = this.props
    const startTime = moment(statisticStartTime).format(t('LOG_DATE'))

    return (
      <div className={styles.statistics}>
        <h3>{t('LOG_COLLECTION_STATUS')} 💁‍♂️</h3>
        <Loading spinning={isLoadingStatistic}>
          <div className={styles.statisticsStatus}>
            <div>
              <Icon name="log" size={40} />
              <div className={styles.items}>
                <strong>{logStatistic}</strong>
                <p>{t('COLLECTED_LOG_COUNT')}</p>
              </div>
            </div>
            <div>
              <Icon name={'docker'} size={40} />
              <div className={styles.items}>
                <strong>{containerStatistic}</strong>
                <p>{t('COLLECTED_CONTAINERS_COUNT')}</p>
              </div>
            </div>
            <div>
              <Icon name={'calendar'} size={40} />
              <div className={styles.items}>
                <strong>{startTime}</strong>
                <p>{t('LOG_COLLECTION_START_TIME')}</p>
              </div>
            </div>
          </div>
        </Loading>
      </div>
    )
  }
}

/**
 * Container 负责处理 LogStatisticPage 的全部事件
 * 建议重构，参考自定义监控的组织方式
 *  */
@observer
export default class LogStatisticPageContainer extends Component {
  statisticStore = new Statistic({
    startTime: moment()
      .startOf('day')
      .valueOf(),
    endTime: Date.now(),
  })

  componentDidMount() {
    this.statisticStore.fetch()
  }

  onQueryFieldChange = fields => {
    /**
     * 写入数据并跳转到下一个页面
     */
    this.props.tab.updateFields(fields)
    this.props.tab.linkToSearchPage()
  }

  render() {
    const statisticStore = this.statisticStore
    const {
      isLoading,
      containersCount,
      timeRange,
      supportQueryFields,
      logsCount,
    } = statisticStore
    const { startTime } = timeRange
    const { tab } = this.props
    const fields = toJS(tab.fields)

    return (
      <LogStatisticPage
        fields={fields}
        logStatistic={logsCount}
        isStatisticLoading={isLoading}
        containerStatistic={containersCount}
        statisticStartTime={startTime}
        supportQueryFields={supportQueryFields}
        onQueryFieldChange={this.onQueryFieldChange}
      />
    )
  }
}
