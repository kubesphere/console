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

import React, { Component } from 'react'
import { observable } from 'mobx'
import { set, get } from 'lodash'
import { observer } from 'mobx-react'
import { PARMMETER_TYPES } from 'utils/constants'
import { TypeSelect } from 'components/Base'
import { Form } from '@kube-design/components'
import HelmForm from './HelmForm'
import KustomizeForm from './KustomizeForm'
import styles from '../index.scss'

@observer
export default class Parameter extends Component {
  constructor(props) {
    super(props)

    this.formRef = React.createRef()
    this.parameter_type = get(this.props.formData, 'parameter_type', 'auto')
  }

  @observable
  parameter_type = 'auto'

  get typeOptions() {
    return PARMMETER_TYPES.map(({ label, value, description }) => ({
      label: t(label),
      description: description ? t(description) : '',
      value,
    }))
  }

  handleTypeChange = type => {
    this.parameter_type = type
    set(this.props.formData, 'parameter_type', type)
  }

  resetFormParameterValue = () => {
    PARMMETER_TYPES.forEach(({ value }) => set(this.props.formData, value, {}))
  }

  renderTypes() {
    return (
      <div className={styles.wrapper_item_com}>
        <Form.Item>
          <TypeSelect
            name="parameter_type"
            defaultValue="auto"
            options={this.typeOptions}
            onChange={this.handleTypeChange}
          />
        </Form.Item>
      </div>
    )
  }

  renderForms() {
    if (this.parameter_type === 'auto') {
      return null
    }

    if (this.parameter_type === 'kustomize') {
      return (
        <KustomizeForm formData={this.props.formData} formRef={this.formRef} />
      )
    }

    if (this.parameter_type === 'helm') {
      return <HelmForm formData={this.props.formData} formRef={this.formRef} />
    }
  }

  render() {
    return (
      <>
        {this.renderTypes()}
        {this.renderForms()}
      </>
    )
  }
}
