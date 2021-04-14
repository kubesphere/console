import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { toJS, observable } from 'mobx'
import moment from 'moment-mini'
import { Select, Loading, Icon } from '@kube-design/components'
import { TinyArea } from 'components/Charts'
import EventSearchStore from 'stores/eventSearch'

import Banner from '../components/Banner'
import SearchInput from '../SearchInput'
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
    const text = t('事件查询(Event)是KubeSphere提供的平台内资源的历史事件查询')
    return (
      <Banner
        imgSrc="/assets/log2-statistics.svg"
        titleText={t('事件查询')}
        desText={text}
      ></Banner>
    )
  }

  clusterRenderer = option => `${t('Cluster')}: ${option.label}`

  renderSearchBar = () => {
    const { searchInputState, clustersOpts } = this.props
    return (
      <div className={styles.searchPane}>
        <div className={styles.title}>{t('根据条件进行查找')}</div>
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
          <span>{t('集群管理')}</span>
          <span>
            {t('数据来源：内置服务')}
            <Icon name="cogwheel"></Icon>
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
      unit: t('个'),
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
              <div className={styles.desText}>集群</div>
            </div>
          </div>
          <div className={styles.chartText}>
            <div className={styles.titleText}>
              {cluster.eventSearchStore.logsCount}
            </div>
            <div className={styles.desText}>{t('事件数量')}</div>
          </div>
          <div className={styles.chart}>
            <TinyArea
              width={299}
              height={54}
              bgColor="transparent"
              {...config}
            ></TinyArea>
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
          {t(`共找到${clusterInfoList.length}个集群空间`)}
        </div>
      </div>
    )
  }

  renderDocHelp = () => {
    return (
      <div className={styles.docHelp}>
        <div className={styles.titleText}>
          {t('如何定义操作审计收集规则？')}🤔
        </div>
        <div className={styles.desText}>
          {t(
            'KubeSphere可以根据您设置的规则进行操作审计的收集，点击查看如何定义规则。'
          )}
        </div>
      </div>
    )
  }
}
