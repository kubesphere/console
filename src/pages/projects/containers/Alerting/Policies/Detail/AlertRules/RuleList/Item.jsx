import React from 'react'
import { Icon, Tooltip } from '@kube-design/components'
import classnames from 'classnames'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'
import { isEmpty, get } from 'lodash'
import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'
import { getLocalTime } from 'utils'
import { observer, inject } from 'mobx-react'
import { trigger } from 'utils/action'
import { ReactComponent as CustomIcon } from 'assets/computing-setting.svg'
import styles from './index.scss'

const mapperIcon = {
  cpu: 'cpu',
  pod: 'pod',
  memory: 'memory',
  disk: 'storage',
  network: 'network',
}

const timeUnit = {
  s: t('SECONDS'),
  m: t('MINUTES'),
  h: t('HOURS'),
}

const statusTextMapper = {
  disabled: t('DISABLED'),
  firing: t('ALERT_RULE_FIRING'),
  inactive: t('ALERT_RULE_INACTIVE'),
  pending: t('ALERT_RULE_PENDING'),
}

const workloadValuesMapper = {
  Deployment: 'DEPLOYMENTS_VALUES',
  StatefulSet: 'STATEFULSETS_VALUES',
  DaemonSet: 'DAEMONSETS_VALUES',
}

@inject('rootStore')
@observer
@trigger
export default class AlertRuleItem extends React.Component {
  get ruleType() {
    const { rule } = this.props
    const exprBuilder = get(rule, 'exprBuilder', {})

    return isEmpty(exprBuilder) ? 'Custom' : 'Template'
  }

  get monitorType() {
    const { rule } = this.props
    return Object.keys(get(rule, 'exprBuilder', {}))[0]
  }

  get severityConfig() {
    return SEVERITY_LEVEL.map(({ value, label }) => ({ value, label }))
  }

  get resourceType() {
    const { rule } = this.props
    return Object.keys(rule.exprBuilder)[0]
  }

  get metricThreshold() {
    const { rule } = this.props

    return get(rule.exprBuilder[this.resourceType], 'metricThreshold', {})
  }

  get disabled() {
    const { rule } = this.props
    return JSON.parse(get(rule, 'disable', 'false'))
  }

  get ruleExpr() {
    const { rule } = this.props
    const isCustom = this.ruleType === 'Custom'
    if (!rule.for) {
      return '-'
    }
    const forTime = get(rule, 'for', '')

    const time = forTime.slice(0, -1)

    if (isCustom) {
      return `${time}${timeUnit[forTime.slice(-1)]}`
    }

    const type = Object.keys(this.metricThreshold)[0]
    const type2 = Object.keys(this.metricThreshold[type])[0]
    const joinType = `${type}:${type2}`
    const config = RESOURCE_METRICS_CONFIG[this.monitorType][joinType]

    const alterTypeText = t(`${config.label}`)
      .replace(/[(（]%[)）]/g, '')
      .replace(/\s$/, '')

    const reverser = config.ruleConfig.filter(
      item => item.name === 'thresholds'
    )[0].reverser

    const comparator = get(rule, `exprBuilder.${this.monitorType}.comparator`)
    const metricThreshold = get(
      rule,
      `exprBuilder.${this.monitorType}.metricThreshold.${type}.${type2}`
    )
    const thresholds = reverser(Number(metricThreshold))
    const unit =
      config.ruleConfig[1].unit === 'core'
        ? thresholds === 1
          ? t('CORE')
          : t('CORE_PL')
        : config.ruleConfig[1].unit
    const durationValue = rule.for.slice(0, -1)
    const durationUnit = rule.for.slice(-1)

    const percentRules = {
      s: 'ALERT_RULE_TEXT_PERCENT_SECOND',
      m: 'ALERT_RULE_TEXT_PERCENT_MINUTE',
      h: 'ALERT_RULE_TEXT_PERCENT_HOUR',
    }
    const otherRules = {
      s: 'ALERT_RULE_TEXT_SECOND',
      m: 'ALERT_RULE_TEXT_MINUTE',
      h: 'ALERT_RULE_TEXT_HOUR',
    }

    return unit === '%'
      ? t(percentRules[durationUnit], {
          alterTypeText,
          comparator,
          thresholds,
          durationValue,
        })
      : t(otherRules[durationUnit], {
          alterTypeText,
          comparator,
          thresholds,
          unit,
          durationValue,
        })
  }

  handleExpandClick = () => {
    const { index, onExpandClick } = this.props
    onExpandClick(index)
  }

  renderIcon = () => {
    const { status, isExpand } = this.props
    const { state } = status

    const styleName = this.disabled
      ? styles[`status_disabled`]
      : styles[`status_${state}`]

    if (this.ruleType === 'Custom') {
      return (
        <div className={classnames(styles.headIcon, styleName)}>
          {isExpand ? (
            <CustomIcon width={40} height={40} />
          ) : (
            <Icon name="computing-setting" size={40} />
          )}
        </div>
      )
    }

    let icon = 'pod'
    const type = Object.keys(this.metricThreshold)[0]
    icon = mapperIcon[type]

    return (
      <div className={classnames(styles.headIcon, [styles[`status_${state}`]])}>
        <Icon type={isExpand ? 'light' : 'dark'} name={icon} size={40} />
      </div>
    )
  }

  handleMonitor = e => {
    const { rule, store, cluster, namespace, status } = this.props

    this.trigger('alerting.rule.monitor', {
      rule,
      store,
      cluster,
      namespace,
      ruleStatus: status,
      expr: rule.expr,
    })
    e.stopPropagation()
  }

  renderHead = () => {
    const { status, rule } = this.props
    const { state } = status

    const label =
      this.severityConfig.filter(item => item.value === rule.severity)[0]
        ?.label ?? 'WARNING_ALERT'

    const className = this.disabled
      ? styles['info_disabled']
      : styles[`info_${state}`]

    return (
      <div className={styles.head}>
        {this.renderIcon()}
        <div>
          <div className={styles.headLine}>
            <div className={styles.title}>{rule.alert}</div>
            <Tooltip content={t('VIEW_METRIC_DATA')}>
              <img src="/assets/monitor.svg" onClick={this.handleMonitor} />
            </Tooltip>
            <div className={classnames(styles.severity, styles[rule.severity])}>
              {t(label)}
            </div>
          </div>
          <div className={classnames(styles.statusLine, className)}>
            {(state !== 'inactive' || this.disabled) && (
              <Icon name="information" size={16} />
            )}
            <div className={styles.desc}>
              {this.disabled ? t('DISABLED') : statusTextMapper[state]}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMonitorTarget = () => {
    const { rule } = this.props
    if (this.ruleType === 'Custom') {
      return <div className={styles.target}></div>
    }
    const names = get(rule, `exprBuilder.${this.monitorType}.names`, [])
    const kind = get(rule, `exprBuilder.${this.monitorType}.kind`)

    return (
      <div className={styles.target}>
        <div className={styles.title}>
          {this.monitorType === 'node'
            ? t('NODES_VALUES', { values: names.join(',') })
            : t(workloadValuesMapper[kind], {
                values: names.join(','),
              })}
        </div>
        <div className={styles.desc}>{t('MONITORING_TARGETS')}</div>
      </div>
    )
  }

  renderAlertRule = () => {
    const isCustom = this.ruleType === 'Custom'

    return (
      <p>
        <span className={styles.label}>
          {isCustom ? t('DURATION') : t('TRIGGER_CONDITION')}：
        </span>
        <span>{this.ruleExpr}</span>
      </p>
    )
  }

  renderExtraContent = () => {
    const { rule, isExpand } = this.props
    const message = get(rule, 'annotations.message', '')
    const description = get(rule, 'annotations.description', '-')
    const detail = message !== '' ? message : description

    return (
      <div
        className={classnames(styles.itemExtra, {
          [styles.itemExtraShow]: isExpand,
        })}
      >
        <div className={styles.ms_content}>
          {this.renderAlertRule()}
          <p>
            <span className={styles.label}>{t('RULE_EXPRESSION')}:</span>
            <span className={styles.ruleExpr}>{rule.expr}</span>
          </p>
        </div>
        <div className={styles.ms_content}>
          <p>
            <span className={styles.label}>{t('MESSAGE_SUMMARY')}:</span>
            <span>{get(rule, 'annotations.summary', '')}</span>
          </p>
          <p>
            <span className={styles.label}>{t('MESSAGE_DETAILS')}:</span>
            <span>{detail}</span>
          </p>
        </div>
      </div>
    )
  }

  renderTime = () => {
    const { status } = this.props
    const time = get(status, 'lastEvaluation', false)
    return (
      <div className={styles.timeLabel}>
        <span
          className={classnames(styles.time, {
            [styles.time_white]: this.props.isExpand,
          })}
        >
          {time ? getLocalTime(time).format(`YYYY-MM-DD HH:mm:ss`) : '-'}
        </span>
        <div className={styles.desc}>{t('RECENT_DETECT_TIME')}</div>
      </div>
    )
  }

  render() {
    const { isExpand } = this.props

    return (
      <div className={styles.item}>
        <div
          className={classnames(styles.content, {
            [styles.expanded]: isExpand,
          })}
          onClick={this.handleExpandClick}
        >
          {this.renderHead()}
          {this.renderMonitorTarget()}
          {this.renderTime()}
          <Icon name="chevron-down" type={isExpand ? 'light' : ''} size={20} />
        </div>
        {this.renderExtraContent()}
      </div>
    )
  }
}
