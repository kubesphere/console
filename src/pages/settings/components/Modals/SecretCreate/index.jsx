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

import { get, set, isEmpty, unset } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Input, Form, TextArea } from '@kube-design/components'

import { Modal } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'
import DataList from 'components/Forms/Secret/SecretSettings/DataList'
import DataForm from 'components/Forms/Secret/SecretSettings/DataForm'

import { MODULE_KIND_MAP, PATTERN_NAME } from 'utils/constants'

import styles from './index.scss'

@observer
export default class CreateModal extends React.Component {
  state = {
    type: 'Opaque',
    state: '',
    selectDataKey: '',
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  formRef = React.createRef()

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({
      subRoute: {
        onSave,
        onCancel,
      },
    })
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  handleData = data => {
    const { selectDataKey } = this.state
    const originData = get(this.formTemplate, 'data', {})

    if (selectDataKey) {
      delete originData[selectDataKey]
    }

    set(this.formTemplate, 'data', { ...originData, ...data })

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

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  handleSubFormSave = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onSave) {
      subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onCancel) {
      subRoute.onCancel()
      this.setState({ subRoute: {} })
    }
  }

  handleOk = () => {
    const { onOk } = this.props
    const form = this.formRef && this.formRef.current

    form &&
      form.validate(() => {
        unset(this.formTemplate, 'metadata.namespace')
        onOk(this.formTemplate)
      })
  }

  renderForm() {
    return (
      <Form data={this.formTemplate} ref={this.formRef}>
        <Form.Item
          label={t('Name')}
          desc={t('LONG_NAME_DESC')}
          rules={[
            { required: true, message: t('Please input name') },
            {
              pattern: PATTERN_NAME,
              message: `${t('Invalid name')}, ${t('LONG_NAME_DESC')}`,
            },
            { validator: this.nameValidator },
          ]}
        >
          <Input
            name="metadata.name"
            onChange={this.handleNameChange}
            maxLength={253}
            autoFocus={true}
          />
        </Form.Item>
        <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
          <Input
            name="metadata.annotations['kubesphere.io/alias-name']"
            maxLength={63}
          />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            maxLength={256}
          />
        </Form.Item>
        <Form.Item
          label={t('Data')}
          rules={[{ required: true, message: t('Please input data') }]}
        >
          <DataList
            name="data"
            onEdit={this.handleDataItemEdit}
            onAdd={this.showDataForm}
          />
        </Form.Item>
      </Form>
    )
  }

  renderDateForm() {
    const { selectDataKey } = this.state
    const originData = get(this.formTemplate, 'data', {})

    return (
      <DataForm
        detail={originData}
        selectKey={selectDataKey}
        onOk={this.handleData}
        onCancel={this.hideDataForm}
      />
    )
  }

  renderSaveBar() {
    const { subRoute } = this.state

    if (isEmpty(subRoute)) {
      return null
    }

    return (
      <Confirm
        className={styles.confirm}
        onOk={this.handleSubFormSave}
        onCancel={this.handleSubFormCancel}
      />
    )
  }

  render() {
    const { title, visible, onCancel, isSubmitting } = this.props
    const { subRoute, state } = this.state
    return (
      <Modal
        width={960}
        title={title || `${t('Create ')}${t('Secret')}`}
        icon="key"
        bodyClassName={styles.body}
        onCancel={onCancel}
        onOk={this.handleOk}
        isSubmitting={isSubmitting}
        visible={visible}
        disableSubmit={!isEmpty(subRoute)}
      >
        {state === 'data' ? this.renderDateForm() : this.renderForm()}
        {this.renderSaveBar()}
      </Modal>
    )
  }
}
