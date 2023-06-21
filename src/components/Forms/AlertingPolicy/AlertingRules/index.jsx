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
import React, { useState } from 'react'

import { get, cloneDeep, isEmpty, set } from 'lodash'
import { Form } from '@kube-design/components'
import RuleList from './RuleList'
import AddRuleForm from './AddRuleForm'

export const severityOptions = [
  {
    label: t('CRITICAL_ALERT'),
    value: 'critical',
    bgColor: '#CA2621',
    color: '#FFFFFF',
  },
  {
    label: t('ERROR_ALERT'),
    value: 'error',
    color: '#FFFFFF',
    bgColor: '#F5A623',
  },
  {
    label: t('WARNING_ALERT'),
    value: 'warning',
    color: '#36435C',
    bgColor: '#D8DEE5',
  },
]

const AlertingRules = props => {
  const [addEdit, setShowEdit] = useState(false)

  const [formTemplate, setFormTemplate] = useState(get(props, 'formTemplate'))

  const [editIndex, setEditIndex] = useState(null)
  const [editRule, setEditRule] = useState({})

  const resetEditMode = () => {
    setEditIndex(null)
    setEditRule({})
  }

  const handleSave = data => {
    const rules = get(formTemplate, 'spec.rules', [])
    if (!isEmpty(editRule)) {
      const newRule = { ...cloneDeep(rules[editIndex]), ...data }
      rules.splice(editIndex, 1, newRule)
    } else {
      rules.push(data)
    }

    setFormTemplate({
      ...formTemplate,
      spec: {
        ...formTemplate.spec,
        rules,
      },
    })
    setShowEdit(false)
    resetEditMode()
  }

  const handleCancel = () => {
    setShowEdit(false)
    resetEditMode()
  }

  const handleEditRule = (index, rule) => {
    setShowEdit(true)
    setEditRule(cloneDeep(rule))
    setEditIndex(index)
  }

  const handleDelete = index => {
    const rules = get(formTemplate, 'spec.rules', [])
    rules.splice(index, 1)
    setFormTemplate({
      ...formTemplate,
      spec: {
        ...formTemplate.spec,
        rules,
      },
    })
  }

  const handleDisable = (index, status) => {
    const rules = get(formTemplate, 'spec.rules', [])

    set(rules[index], 'disable', status)

    setFormTemplate({
      ...formTemplate,
      spec: {
        ...formTemplate.spec,
        rules,
      },
    })
  }

  return (
    <>
      <Form data={formTemplate} ref={props.formRef} />
      <div>
        {addEdit ? (
          <AddRuleForm
            {...props}
            formTemplate={formTemplate}
            onCancel={handleCancel}
            onSave={handleSave}
            editRule={editRule}
          />
        ) : (
          <RuleList
            formTemplate={formTemplate}
            AddRuleClick={() => setShowEdit(true)}
            handleEdit={handleEditRule}
            handleDisable={handleDisable}
            handleDelete={handleDelete}
            onEdit={props.onEdit}
            index={'ruleList'}
            builtInRule={get(props, 'type', 'custom') === 'builtin'}
          />
        )}
      </div>
    </>
  )
}
export default AlertingRules
