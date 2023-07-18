import React, { useState } from 'react'
import { Icon, Toggle } from '@kube-design/components'
import { get, isEmpty, cloneDeep } from 'lodash'
import classnames from 'classnames'
import { RESOURCE_METRICS_CONFIG } from 'configs/alerting/metrics'
import { severityOptions } from '../../AddRuleForm/CustomRule'
import styles from './index.scss'

const mapperIcon = {
  cpu: 'cpu',
  pod: 'pod',
  memory: 'memory',
  disk: 'storage',
  network: 'network',
}

const Card = props => {
  const { rule, handleEdit } = props
  const ruleType = !isEmpty(get(rule, 'exprBuilder', ''))
    ? 'template'
    : 'custom'
  const exprBuilderType =
    !isEmpty(get(rule, 'exprBuilder', '')) && Object.keys(rule.exprBuilder)[0]

  const [disabled, setDisabled] = useState(get(rule, 'disable', false))
  const severity = severityOptions.filter(
    item => item.value === get(rule, 'severity')
  )[0]

  const renderIcon = () => {
    const iconName =
      Object.keys(
        get(rule.exprBuilder, `${exprBuilderType}.metricThreshold.`, {})
      )[0] || 'pod'

    return (
      <div
        className={classnames(styles.icon, {
          [styles.iconDisabled]: disabled,
          [styles.iconOn]: !disabled,
        })}
      >
        {ruleType === 'custom' ? (
          <Icon name="computing-setting" size={40} />
        ) : (
          <Icon size={40} name={mapperIcon[iconName]} />
        )}
      </div>
    )
  }

  const renderRuleName = () => {
    return <span className={styles.ruleName}>{rule.alert}</span>
  }

  const renderSeverity = () => {
    return severity ? (
      <span
        style={{
          backgroundColor: severity.bgColor,
          color: severity.color,
          fontWeight: 600,
        }}
      >
        {severity.label}
      </span>
    ) : null
  }

  const resourceMetricsConfig =
    cloneDeep(RESOURCE_METRICS_CONFIG[exprBuilderType || 'node']) || {}

  const renderTemplateRule = () => {
    const nodes = get(rule, `exprBuilder.${exprBuilderType}.names`, [])
    const metricThreshold = get(
      rule,
      `exprBuilder.${exprBuilderType}.metricThreshold`
    )
    const podType = Object.keys(metricThreshold)[0]
    const secondType = Object.keys(metricThreshold[podType])[0]
    const joinType = `${podType}:${secondType}`

    const config = resourceMetricsConfig[joinType]
    const alterTypeText = t(`${config.label}`)
      .replace(/[(（]%[)）]/g, '')
      .replace(/\s$/, '')
    const reverser = config.ruleConfig.filter(
      item => item.name === 'thresholds'
    )[0].reverser

    const comparator = get(rule, `exprBuilder.${exprBuilderType}.comparator`)
    const thresholds = reverser(
      Number(Object.values(metricThreshold[podType])[0])
    )
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

    return (
      <>
        <div className={styles.rule_inline}>
          <span className={styles.title}>{t('MONITORING_TARGETS')}:</span>
          <span className={styles.descText}>{nodes.join(', ')}</span>
        </div>
        <div className={styles.last_inline}>
          <span className={styles.title}>{t('TRIGGER_CONDITION')}:</span>
          <span className={styles.descText}>
            {unit === '%'
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
                })}
          </span>
        </div>
      </>
    )
  }

  const handleDeleteClick = () => {
    props.handleDelete()
  }

  const handleDisable = () => {
    setDisabled(!disabled)
    props.handleDisable(!disabled)
  }

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>
          {renderIcon()}
          <div className={styles.text}>
            <p>
              {renderRuleName()}
              {renderSeverity()}
            </p>
            <p>{disabled ? t('DISABLED') : t('ENABLED')}</p>
          </div>
        </div>
        <div className={styles.opt}>
          {!props.builtInRule && (
            <div className={styles.iconBg}>
              <Icon name="trash" size={16} onClick={handleDeleteClick} />
            </div>
          )}
          <div className={styles.iconBg}>
            <Icon name="pen" size={16} onClick={() => handleEdit()} />
          </div>
          <div className={styles.sToggle}>
            <div className={styles.tooltip}>
              <span>{disabled ? t('ENABLE_RULE') : t('DISABLE_RULE')}</span>
            </div>
            <div className={styles.triangle}></div>
            <Toggle checked={!disabled} onChange={handleDisable} />
          </div>
        </div>
      </div>
      <div className={styles.desc}>
        {ruleType === 'template' ? (
          renderTemplateRule()
        ) : (
          <div className={styles.customLine}>
            <span className={styles.title}>{t('RULE_EXPRESSION')}:</span>
            <span className={styles.exprText}>{rule.expr}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card
