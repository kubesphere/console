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
import { get, set } from 'lodash'
import { MODULE_KIND_MAP } from 'utils/constants'
import { Form } from 'components/Base'

import DataList from './DataList'
import DataForm from './DataForm'

export default class ConfigMapSettings extends React.Component {
  state = {
    state: '',
    selectDataKey: '',
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  handleData = data => {
    const { selectDataKey } = this.state
    const originData = get(this.fedFormTemplate, 'data', {})

    if (selectDataKey) {
      delete originData[selectDataKey]
    }

    set(this.fedFormTemplate, 'data', { ...originData, ...data })

    this.hideDataForm()
  }

  showDataForm = () => {
    this.setState({ state: 'data', selectDataKey: '' })
  }

  hideDataForm = () => {
    this.setState({ state: '', selectDataKey: '' })
  }

  handleDataItemEdit = key => {
    this.setState({ state: 'data', selectDataKey: key })
  }

  renderDataForm() {
    const { selectDataKey } = this.state
    const originData = get(this.fedFormTemplate, 'data', {})

    return (
      <DataForm
        detail={originData}
        selectKey={selectDataKey}
        onOk={this.handleData}
        onCancel={this.hideDataForm}
      />
    )
  }

  render() {
    const { formRef } = this.props
    const { state } = this.state

    if (state === 'data') {
      return this.renderDataForm()
    }

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        <Form.Item label={t('Config Value')}>
          <DataList
            name="data"
            onEdit={this.handleDataItemEdit}
            onAdd={this.showDataForm}
          />
        </Form.Item>
      </Form>
    )
  }
}
