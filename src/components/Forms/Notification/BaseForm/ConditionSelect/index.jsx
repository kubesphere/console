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

import React from 'react'

import { Select } from '@kube-design/components'
import { TagInput } from 'components/Inputs'

import { SEVERITY_LEVEL } from 'configs/alerting/metrics/rule.config'

import styles from './index.scss'

export default class ConditionSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.getInitialData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ ...this.getInitialData() })
    }
  }

  get keys() {
    return [
      {
        label: t('ALERTING_NAME'),
        value: 'alertname',
      },
      {
        label: t('ALERTING_SEVERITY'),
        value: 'severity',
      },
      {
        label: t('PROJECT'),
        value: 'namespace',
      },
      {
        label: t('POD'),
        value: 'pod',
      },
      {
        label: t('Container'),
        value: 'container',
      },
    ]
  }

  get operators() {
    return [
      {
        label: t('Include key values'),
        value: 'In',
      },
      {
        label: t('Not include key values'),
        value: 'NotIn',
      },
      {
        label: t('Exists key'),
        value: 'Exists',
      },
      {
        label: t('Does not exist key'),
        value: 'DoesNotExist',
      },
    ]
  }

  get severities() {
    return SEVERITY_LEVEL.map(item => ({
      label: t(item.label),
      value: item.value,
      level: item,
    }))
  }

  getInitialData() {
    const { key, operator, values } = this.props.value || {}
    return { key, operator, values }
  }

  handleKeyChange = key => {
    this.setState({ key, values: [] }, () => this.handleChange())
  }

  handleOperatorChange = operator => {
    this.setState({ operator }, () => this.handleChange())
  }

  handleValueChange = values => {
    this.setState({ values }, () => this.handleChange())
  }

  handleChange = () => {
    const { key, operator, values } = this.state

    this.props.onChange({
      key,
      operator,
      values,
    })
  }

  renderValues() {
    const { key, operator, values } = this.state
    if (operator === 'Exists' || operator === 'DoesNotExist') {
      return null
    }
    if (key === 'type') {
      return (
        <Select
          name="values"
          value={values}
          options={this.severities}
          multi
          onChange={this.handleValueChange}
        />
      )
    }
    return (
      <TagInput
        name="values"
        placeholder={t('Please input value')}
        value={values}
        onChange={this.handleValueChange}
      />
    )
  }

  render() {
    const { key, operator } = this.state

    return (
      <div className={styles.selectWrapper}>
        <Select
          name="key"
          value={key}
          options={this.keys}
          placeholder={t('Please select a tag')}
          onChange={this.handleKeyChange}
        />
        <Select
          name="operator"
          value={operator}
          options={this.operators}
          onChange={this.handleOperatorChange}
        />
        {this.renderValues()}
      </div>
    )
  }
}
