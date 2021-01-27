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
import PropTypes from 'prop-types'
import copy from 'fast-copy'
import { isUndefined, isFunction, get } from 'lodash'
import { Form, Input } from '@kube-design/components'

import { Modal, Switch } from 'components/Base'
import { NumberInput } from 'components/Inputs'
import EditMode from 'components/EditMode'

import { PATTERN_IP } from 'utils/constants'

import styles from './index.scss'

export default class EditBPGConfModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCodeMode: false,
      formData: copy(props.detail),
    }
    this.editor = React.createRef()
  }

  handleOk = () => {
    const { isCodeMode, formData } = this.state
    const { onOk, onCancel } = this.props
    const value = this.editor.current.getData()
    const data = isCodeMode ? value : formData
    if (isUndefined(data)) {
      onCancel()
    } else {
      onOk(data)
    }
  }

  handleModeChange = () => {
    this.setState(({ isCodeMode, formData }) => {
      const newState = { formData, isCodeMode: !isCodeMode }
      if (isCodeMode && isFunction(get(this, 'editor.current.getData'))) {
        newState.formData = this.editor.current.getData()
      }
      return newState
    })
  }

  renderOperations() {
    const { isCodeMode } = this.state

    return (
      <Switch
        className={styles.switch}
        text={t('Edit Mode')}
        onChange={this.handleModeChange}
        checked={isCodeMode}
      />
    )
  }

  renderForm() {
    return (
      <Form data={this.state.formData}>
        <Form.Item
          label={t('ASN')}
          desc={t('ASN_DESC')}
          rules={[{ required: true, message: t('Please input ASN') }]}
        >
          <NumberInput name="spec.as" integer />
        </Form.Item>
        <Form.Item
          label={t('Router ID')}
          rules={[
            { required: true, message: t('Please input router id') },
            {
              pattern: PATTERN_IP,
              message: t('Invalid router id'),
            },
          ]}
        >
          <Input name="spec.routerId" />
        </Form.Item>
        <Form.Item
          label={t('Listen Port')}
          rules={[{ required: true, message: t('Please input listen port') }]}
        >
          <NumberInput name="spec.listenPort" min={0} max={65535} integer />
        </Form.Item>
      </Form>
    )
  }

  renderCodeEditor() {
    return <EditMode ref={this.editor} value={this.state.formData} />
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props
    const { isCodeMode } = this.state

    return (
      <Modal
        width={960}
        title={t('Edit BGP Global Config')}
        icon="network-router"
        operations={this.renderOperations()}
        onOk={this.handleOk}
        okText={t('Update')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        {!isCodeMode ? this.renderForm() : this.renderCodeEditor()}
      </Modal>
    )
  }
}
