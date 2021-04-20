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
import { observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import moment from 'moment-mini'
import { Select, Loading, Icon } from '@kube-design/components'
import { TinyArea } from 'components/Charts'
import EventSearchStore from 'stores/eventSearch'

import Banner from '../components/Banner'
import SearchInput from '../components/SearchInput'
import { dropDownItems } from '../../utils'

import styles from './index.scss'

@observer
export default class Home extends Component {
  @observable loading = true

  componentDidMount() {
    const { clustersOpts, clusterInfoList } = this.props
    clustersOpts.forEach(cluster => {
      const eventSearchStore = new EventSearchStore()
      const fetchData = async function() {
        try {
          await this.eventSearchStore.fetchTodayHistogram({
            cluster: cluster.value,
          })
          await this.eventSearchStore.fetchHistogram({ cluster: cluster.value })
          await this.eventSearchStore.fetchQuery({
            start_time: Math.ceil(Date.now() / 1000) - 60 * 60 * 12,
            endTime: Math.ceil(Date.now() / 1000),
            interval: '24m',
            cluster: cluster.value,
          })
          this.loading = false
        } catch (err) {
          this.loading = true
        }
      }
      const obCluster = {
        clusterValue: cluster.value,
        eventSearchStore,
        loading: true,
        fetchData,
      }
      clusterInfoList.push(obCluster)
    })
    this.updateStatistics()
  }

  updateStatistics() {
    const { clusterInfoList } = this.props
    clusterInfoList.forEach(cluster => {
      cluster.fetchData()
    })
  }

  onClusterChange = cluster => {
    this.props.searchInputState.setCluster(cluster)
  }

  onSearchParamsChange = () => {
    this.props.formStepState.next()
  }

  render() {
    return (
      <div className={styles.pane}>
        {this.renderBanner()}
        {this.renderSearchBar()}
        {this.renderClusterBar()}
        {this.renderBottomLine()}
        {this.renderDocHelp()}
      </div>
    )
  }

  renderBanner = () => {
    const text = t('EVENT_QUERY_DES')
    return (
      <Banner
        imgSrc="/assets/log2-statistics.svg"
        titleText={t('Event Query')}
        desText={text}
      ></Banner>
    )
  }

  clusterRenderer = option => `${t('Cluster')}: ${option.label}`

  renderSearchBar = () => {
    const { searchInputState, clustersOpts } = this.props
    return (
      <div className={styles.searchPane}>
        <div className={styles.title}>{t('SEARCH_BY_CONDITION')}</div>
        <div className={styles.searchContainer}>
          <div className={styles.innerBox}>
            {globals.app.isMultiCluster && (
              <Select
                className={styles.clusterSelector}
                value={searchInputState.cluster}
                options={clustersOpts}
                valueRenderer={this.clusterRenderer}
                onChange={this.onClusterChange}
              />
            )}
            <SearchInput
              className={styles.searchBar}
              onChange={this.onSearchParamsChange}
              params={searchInputState}
              dropDownItems={dropDownItems}
            />
          </div>
        </div>
      </div>
    )
  }

  renderClusterBar = () => {
    const { clusterInfoList } = this.props
    return (
      <div className={styles.clusterContainer}>
        <div className={styles.clusterTitle}>
          <span>{t('Cluster Management')}</span>
          <span>
            <span>{t('Data Sources')}</span>
            <span>{t('Built-in Service')}</span>
            <Icon name="cogwheel" className={styles.icon}></Icon>
          </span>
        </div>
        {clusterInfoList.map((cluster, index) => {
          return this.renderChart(cluster, index)
        })}
      </div>
    )
  }

  renderChart = (cluster, key) => {
    const histogramStore = toJS(cluster.eventSearchStore)
    const chartData = Object.assign([], histogramStore.histogramData.buckets)
    chartData.forEach(logCount => {
      logCount.time = moment(logCount.time).format(`${t('LOG_DATE')}`)
    })
    const config = {
      xKey: 'time',
      title: ``,
      unit: t('Pieces'),
      legend: ['count'],
      data: chartData || [],
      areaColors: ['green'],
      dot: {
        stroke: '#55bc8a',
        strokeWidth: 1,
        fill: '#ffffff',
        fillOpacity: 1,
      },
    }
    return (
      <Loading spinning={cluster.eventSearchStore.isLoading} key={key}>
        <div className={styles.clusterChart}>
          <div className={styles.chartHead}>
            <img src="/assets/cluster.svg" alt="clusterIcon"></img>
            <div className={styles.titleBox}>
              <div className={styles.titleText}>{cluster.clusterValue}</div>
              <div className={styles.desText}>{t('Cluster')}</div>
            </div>
          </div>
          <div className={styles.chartText}>
            <div className={styles.titleText}>
              {cluster.eventSearchStore.logsCount}
            </div>
            <div className={styles.desText}>{t('Event Num')}</div>
          </div>
          <div className={styles.chart}>
            {chartData.length > 0 && (
              <TinyArea
                width={299}
                height={54}
                bgColor="transparent"
                {...config}
              ></TinyArea>
            )}
          </div>
        </div>
      </Loading>
    )
  }

  renderBottomLine = () => {
    const { clusterInfoList } = this.props
    return (
      <div className={styles.endLine}>
        <div className={styles.text}>
          {t('HOW_MANY_CLUSTER_HAVE', { num: clusterInfoList.length })}
        </div>
      </div>
    )
  }

  renderDocHelp = () => {
    return (
      <div className={styles.docHelp}>
        <div className={styles.titleText}>{t('CARD_TIPS_Q')}🤔</div>
        <div className={styles.desText}>{t('CARD_TIPS_A')}</div>
      </div>
    )
  }
}
