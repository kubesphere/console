import React, { useState } from 'react'

import { ALERT_GROUP_MAX_LIMIT } from 'utils/constants'
import { get } from 'lodash'
import styles from './index.scss'
import Card from './Card'

const RuleList = props => {
  const {
    AddRuleClick,
    formTemplate,
    handleEdit,
    handleDisable,
    handleDelete,
    onEdit,
  } = props

  const [rules] = useState(get(formTemplate, 'spec.rules', []))

  const handleAddRuleClick = () => {
    AddRuleClick()
  }

  const handleEditClick = (index, rule) => {
    handleEdit(index, rule)
    onEdit && onEdit()
  }

  return (
    <div className={styles.ruleContainer}>
      {rules.map((rule, index) => (
        <Card
          rule={rule}
          key={index}
          handleEdit={() => handleEditClick(index, rule)}
          handleDisable={status => handleDisable(index, status)}
          handleDelete={() => handleDelete(index)}
          builtInRule={props.builtInRule}
        />
      ))}
      {!props.builtInRule && rules.length < ALERT_GROUP_MAX_LIMIT && (
        <div className={styles.addRuleContainer} onClick={handleAddRuleClick}>
          <span>{t('ADD_ALERTING_RULE')}</span>
          <span>{t('ADD_ALERTING_RULE_DESC')}</span>
        </div>
      )}
    </div>
  )
}

export default RuleList
