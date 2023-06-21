import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { RadioGroup, RadioButton, Icon } from '@kube-design/components'

import { isEmpty, get, set, unset } from 'lodash'
import styles from './index.scss'
import TemplateRule from './TemplateRule'
import CustomRule from './CustomRule'

const radioOptions = [
  {
    label: t('RULE_TEMPLATE'),
    value: 'ruleTemplate',
  },
  {
    label: t('CUSTOM_RULE'),
    value: 'customRule',
  },
]

const AddRuleForm = (props, context) => {
  const { editRule, namespace } = props

  const type = isEmpty(editRule)
    ? radioOptions[0].value
    : !isEmpty(get(editRule, 'exprBuilder', {}))
    ? radioOptions[0].value
    : radioOptions[1].value

  const [ruleType, setRuleType] = useState(type)
  const formRef = useRef()

  const handleSubmit = callback => {
    const { onSave } = props
    const form = formRef.current.target
    form &&
      form.validate(() => {
        const data = form.getData()
        // get for,severity
        if (ruleType === 'ruleTemplate') {
          const exprBuilderChildType = Object.keys(get(data, 'exprBuilder'))[0]
          const duration = get(data, `exprBuilder.${exprBuilderChildType}.for`)
          const severity = get(
            data,
            `exprBuilder.${exprBuilderChildType}.severity`
          )
          set(data, 'for', duration)
          set(data, 'severity', severity)
          set(data, 'expr', '')
          unset(data, `exprBuilder.${exprBuilderChildType}.for`)
          unset(data, `exprBuilder.${exprBuilderChildType}.severity`)
          if (namespace) {
            set(
              data,
              'exprBuilder.workload.kind',
              get(data, 'exprBuilder.workloadKind.kind')
            )
            set(data, 'exprBuilder.workload.names', [
              ...get(data, 'exprBuilder.workloadKind.names'),
            ])
            unset(data, 'exprBuilder.workloadKind')
          }
        }
        onSave(data)
        callback && callback()
      })
  }

  const handleBack = () => {
    const { resetSubRoute } = context
    resetSubRoute && resetSubRoute()
    props.onCancel()
  }

  useEffect(() => {
    const { registerSubRoute } = context
    const { onCancel } = props

    registerSubRoute && registerSubRoute(handleSubmit, onCancel)
  }, [ruleType])

  return (
    <div className={styles.AddRuleContainer}>
      <div className="h6" style={{ display: 'flex', alignItems: 'center' }}>
        <Icon name="return" size={20} onClick={handleBack} />
        <span>{t('ADD_ALERTING_RULE')}</span>
      </div>
      <div className={styles.AddForm}>
        <RadioGroup
          buttonWidth={132}
          value={ruleType}
          wrapClassName="radio"
          onChange={value => setRuleType(value)}
        >
          {radioOptions.map(option => (
            <RadioButton key={option.value} value={option.value}>
              {option.label}
            </RadioButton>
          ))}
        </RadioGroup>
        {ruleType === 'ruleTemplate' ? (
          <TemplateRule ref={formRef} {...props} />
        ) : (
          <CustomRule ref={formRef} {...props} />
        )}
      </div>
    </div>
  )
}

AddRuleForm.contextTypes = {
  registerSubRoute: PropTypes.func,
  resetSubRoute: PropTypes.func,
}

export default AddRuleForm
