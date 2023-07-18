import React from 'react'
import { Button, Loading } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get, omit, isEmpty } from 'lodash'
import { MultiArea as Chart } from 'components/Charts'
import TimeSelector from 'components/Cards/Monitoring/Controller/TimeSelector'
import { getMinuteValue, getTimeRange } from 'stores/monitoring/base'
import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'
import { getAreaChartOps, getFormatTime } from 'utils/monitoring'

import styles from './index.scss'

export default class AlertMonitor extends React.Component {
  state = {
    metrics: [],
    currentMetric: [],
    step: '30s',
    times: 60,
    isLoading: true,
    autoFetch: false,
  }

  timer = null

  get resourceType() {
    const { rule } = this.props
    return Object.keys(rule.exprBuilder)[0]
  }

  get exprBuilder() {
    const { rule } = this.props
    return get(rule, 'exprBuilder', {})
  }

  get ruleType() {
    return isEmpty(this.exprBuilder) ? 'Custom' : 'Template'
  }

  get thresholdType() {
    const metricThreshold = get(
      this.exprBuilder,
      `${[this.resourceType]}.metricThreshold`,
      {}
    )
    const kind = Object.keys(this.exprBuilder)[0]
    const type1 = Object.keys(metricThreshold)[0]
    const type2 = Object.keys(metricThreshold[type1])[0]
    const joinType = `${type1}:${type2}`

    return RESOURCE_METRICS_CONFIG[kind][joinType]
  }

  get threshold() {
    if (this.ruleType === 'Template') {
      const metricThreshold = get(
        this.exprBuilder,
        `${[this.resourceType]}.metricThreshold`,
        {}
      )
      const type1 = Object.keys(metricThreshold)[0]
      return Object.values(metricThreshold[type1])[0]
    }
    return ''
  }

  get ruleConfig() {
    return this.thresholdType.ruleConfig.filter(
      item => item.name === 'thresholds'
    )[0]
  }

  transformValue = value => {
    if (this.ruleType === 'Custom') {
      return value
    }

    const { reverser, unit } = this.ruleConfig
    const number = parseFloat(reverser(Number(value))).toFixed(2)
    return unit ? `${number}${unit}` : number
  }

  get chartTitleUnit() {
    if (this.ruleType === 'Custom') {
      return null
    }

    const unit = this.ruleConfig.unit

    return unit !== '' ? unit : null
  }

  get chartTitle() {
    if (this.ruleType === 'Custom') {
      return 'CUSTOM_RULE'
    }

    return this.thresholdType.tcapLabel
  }

  get tailText() {
    if (this.ruleType === 'Custom') {
      return null
    }

    return t('THRESHOLD_VALUE', { value: this.threshold })
  }

  get tableColumns() {
    return [
      {
        title: t('TIME'),
        dataIndex: 'time',
        width: '21.1%',
        render: time => <div>{time}</div>,
      },
      {
        title: t('VALUE'),
        dataIndex: 'value',
        width: '21.1%',
        render: value => <div>{value}</div>,
      },
      {
        title: t('MONITORING_TARGETS'),
        dataIndex: 'metric',
        render: metric => <div>{metric}</div>,
      },
    ]
  }

  get expr() {
    const { ruleStatus, expr } = this.props
    const statusExpr = get(ruleStatus, 'expr', '')
    return statusExpr !== '' ? statusExpr : expr
  }

  componentDidMount() {
    this.fetchMetrics()
    this.fetchCurrentMetic()
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  fetchMetrics = async params => {
    const { cluster, namespace } = this.props
    const { step, times } = this.state

    this.setState({ isLoading: true })
    const { start, end } = getTimeRange({ step, times })

    const result = await this.props.store.fetchMetric({
      expr: this.expr,
      end,
      start,
      step,
      cluster,
      namespace,
      ...params,
    })
    this.setState({
      metrics: result,
      times,
      step,
      isLoading: false,
      timer: null,
    })
  }

  autoFetch = () => {
    this.timer = setInterval(() => {
      this.fetchMetrics()
      this.fetchCurrentMetic()
    }, 5000)
  }

  handleAutoFetch = () => {
    this.setState(
      ({ autoFetch }) => ({ autoFetch: !autoFetch }),
      () => {
        this.autoFetch()
      }
    )
  }

  stopAutoFetch = () => {
    const { autoFetch } = this.state

    clearInterval(this.timer)
    this.timer = null

    this.setState({ autoFetch: !autoFetch })
  }

  fetchCurrentMetic = async () => {
    const { cluster, namespace } = this.props

    const result = await this.props.store.fetchMetric({
      expr: this.expr,
      cluster,
      namespace,
    })
    const metric = result.map(item => {
      const value = get(item, 'value', ['', ''])
      const _metric = get(item, 'metric', {})
      return {
        time: getFormatTime(value[0] * 1000, true),
        value: value[1],
        metric: JSON.stringify(_metric),
      }
    })
    this.setState({
      currentMetric: metric,
    })
  }

  handleChange = params => {
    const { step, times } = params

    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    this.setState(
      { step: getMinuteValue(step), times, autoFetch: false },
      () => {
        this.fetchMetrics()
        this.fetchCurrentMetic()
      }
    )
  }

  handleRefresh = () => {
    this.setState({ autoFetch: false }, () => {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }

      this.fetchMetrics()
      this.fetchCurrentMetic()
    })
  }

  renderOperations = () => {
    const { step, times, autoFetch } = this.state

    return (
      <div className={styles.opts}>
        <div className={styles.time}>
          <TimeSelector
            step={step}
            times={times}
            onChange={this.handleChange}
          />
        </div>
        <Button
          className={styles.refresh}
          type="control"
          icon={autoFetch ? 'pause' : 'start'}
          iconType="light"
          onClick={autoFetch ? this.stopAutoFetch : this.handleAutoFetch}
        />
        <Button
          className={styles.refresh}
          type="control"
          icon="refresh"
          iconType="light"
          onClick={this.handleRefresh}
        />
      </div>
    )
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props
    const { isLoading, metrics, currentMetric } = this.state

    const options = getAreaChartOps({
      height: 396,
      title: this.chartTitle,
      unit: this.chartTitleUnit,
      tailText: this.tailText,
      data: metrics,
      legend: metrics.map(item =>
        item.metric ? JSON.stringify(omit(item.metric, '__name__')) : ''
      ),
    })

    return (
      <Modal
        headerClassName={styles.header}
        bodyClassName={styles.body}
        visible={visible}
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        imageIcon={'/assets/monitor.svg'}
        title={t('VIEW_METRIC_DATA_TCAP')}
        operations={this.renderOperations()}
        hideFooter
        fullScreen
      >
        <Loading spinning={isLoading}>
          {metrics.length < 1 ? (
            <div className={styles.metricEmpty}>{t('NO_MONITOR_METRIC')}</div>
          ) : (
            <Chart {...options} />
          )}
        </Loading>
        <div className={styles.current}>
          <div className={styles.main}>
            <div className={styles.title}>
              <span className={styles.time}>{t('TIME')}</span>
              <span className={styles.value}>{t('VALUE')}</span>
              <span className={styles.metric}>{t('MONITORING_TARGETS')}</span>
            </div>
            <div className={styles.body}>
              {currentMetric.map((item, index) => (
                <div key={index} className={styles.line}>
                  <span className={styles.time}>{item.time}</span>
                  <span className={styles.value}>
                    {this.transformValue(item.value)}
                  </span>
                  <span className={styles.metric}>{item.metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
