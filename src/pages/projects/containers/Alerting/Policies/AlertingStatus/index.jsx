import React from 'react'
import { Tooltip } from '@kube-design/components'
import classnames from 'classnames'
import styles from './index.scss'

const AlertStatus = ({ rulesStats }) => {
  const labelMapper = {
    pending: t('ALERT_RULE_PENDING'),
    inactive: t('ALERT_RULE_INACTIVE'),
    firing: t('ALERT_RULE_FIRING'),
    disabled: t('DISABLED'),
  }

  const ruleList = Object.entries(rulesStats).map(([key, value]) => ({
    label: labelMapper[key],
    type: key,
    value,
  }))

  const tipContent = () => {
    return (
      <>
        {ruleList.map((item, index) => (
          <div
            key={index}
            className={classnames(styles.tipContent, [styles[item.type]], {
              [styles.disabled]: item.value === 0,
            })}
          >
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </>
    )
  }

  return (
    <Tooltip content={tipContent()} placement={'right'}>
      <ul className={styles.statusBox}>
        {ruleList.map((item, index) => (
          <li
            key={index}
            className={classnames([styles[`li-${item.type}`]], {
              [styles.iconDisabled]: item.value === 0,
            })}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </Tooltip>
  )
}

export default AlertStatus
