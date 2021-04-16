import React from 'react'
import { get, set, isEmpty, isEqual, isArray } from 'lodash'

import { Loading } from '@kube-design/components'
import { SimpleArea } from 'components/Charts'

import { getAreaChartOps, getValueByUnit } from 'utils/monitoring'
import EmptyList from 'components/Cards/EmptyList'
import MonitorTab from './MonitorTab'
import {
  METER_RESOURCE_TITLE,
  METER_RESOURCE_USAGE_TITLE,
} from '../../constats'
import styles from './index.scss'

export default class LineChart extends React.Component {
  state = {
    chartData: this.props.chartData,
    loading: false,
  }

  get priceConfig() {
    return this.props.priceConfig
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.loading !== nextState.loading ||
      !isEqual(this.props.chartData, nextProps.chartData)
    )
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.chartData, prevProps.chartData)) {
      this.setAreaChartData(this.props.chartData)
    }
  }

  setNoPriceChartData = data => {
    data.forEach(item => {
      item.title = METER_RESOURCE_TITLE[item.type]
    })

    this.setState({
      chartData: data,
    })
  }

  setAreaChartData = data => {
    this.setState({ loading: true }, () => {
      if (isEmpty(data)) {
        this.setState({ loading: false, chartData: [] })
        return
      }

      if (isEmpty(this.priceConfig)) {
        this.setNoPriceChartData(data)
      } else {
        data.forEach(item => {
          item.values = item.values.map(_item => {
            const value = get(_item, [1])

            const valueConvertedByUnit =
              value === '-1' ? null : getValueByUnit(value, item.unit.value)

            const priceUnit = this.priceConfig[item.type]

            const valueConvertedByPrice = valueConvertedByUnit * priceUnit

            set(_item, [1], valueConvertedByPrice)

            return _item
          })

          item.type = METER_RESOURCE_TITLE[item.type]
        })

        const legend = data.map(record => get(record, `type`))
        const _result = {
          title: t('Consumer Trends'),
          unit: this.priceConfig.currency === 'CNY' ? t('￥') : t('$'),
          data,
          legend,
        }
        const chartData = getAreaChartOps(_result)
        chartData.data.shift()

        this.setState({
          chartData,
        })
      }
      this.setState({ loading: false })
    })
  }

  renderNoPriceChart = () => {
    const { chartData } = this.state
    if (isEmpty(chartData) || !isArray(chartData)) {
      return null
    }

    const METER_ICON = {
      CPU: 'cpu',
      Memory: 'memory',
      Volumes: 'storage',
      'Net Received': 'network',
      'Net Transmitted': 'network',
    }

    const tabs = chartData.map(item => {
      const config = {
        key: item.title,
        icon: METER_ICON[item.title],
        unit: item.unit.value,
        legend: [item.title],
        title: t(METER_RESOURCE_USAGE_TITLE[item.type]),
        data: [item],
        yAxis: true,
        titleValue: item.sum_value,
        dot: 3,
      }
      return config
    })

    return <MonitorTab tabs={tabs} />
  }

  render() {
    return (
      <div className={styles.chartContainer}>
        <Loading spinning={this.state.loading}>
          {isEmpty(this.state.chartData) ? (
            <EmptyList
              className="no-shadow"
              icon="exclamation"
              title={t('No Data')}
              desc={t('RESOURCE_NOT_FOUND')}
            />
          ) : isEmpty(this.priceConfig) ? (
            this.renderNoPriceChart()
          ) : (
            <SimpleArea width="100%" height={245} {...this.state.chartData} />
          )}
        </Loading>
      </div>
    )
  }
}
