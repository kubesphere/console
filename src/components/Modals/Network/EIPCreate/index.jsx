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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Input, Form, TextArea } from '@kube-design/components'

import { Modal } from 'components/Base'

import { PATTERN_NAME } from 'utils/constants'
import Select from '@kube-design/components/lib/components/Select'

@observer
export default class CreateModal extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    module: PropTypes.string,
    formTemplate: PropTypes.object,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    module: 'eips',
    onOk() {},
    onCancel() {},
  }

  state = {
    protocol: 'bgp',
  }

  get protocols() {
    return [
      { label: t('bgp'), value: 'bgp' },
      { label: t('layer2'), value: 'layer2' },
    ]
  }

  handleProtocolChange = value => {
    this.setState({ protocol: value })
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { cluster, namespace } = this.props

    this.props.store
      .checkName({ name: value, cluster, namespace })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const { title, visible, onOk, onCancel, formTemplate } = this.props
    const { protocol } = this.state

    return (
      <Modal.Form
        width={600}
        title={title || t('Create EIP')}
        icon="eip"
        data={formTemplate}
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
      >
        <Form.Item
          label={t('Name')}
          desc={t('NAME_DESC')}
          rules={[
            { required: true, message: t('Please input name') },
            {
              pattern: PATTERN_NAME,
              message: `${t('Invalid name')}, ${t('NAME_DESC')}`,
            },
            { validator: this.nameValidator },
          ]}
        >
          <Input name="metadata.name" autoFocus={true} maxLength={63} />
        </Form.Item>
        <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
          <Input
            name="metadata.annotations['kubesphere.io/alias-name']"
            maxLength={63}
          />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
          <TextArea
            name="metaddata.annotations['kubesphere.io/description']"
            maxLength={256}
          />
        </Form.Item>
        <Form.Item
          label={t('IP Address')}
          rules={[{ required: true, message: t('Please input ip address') }]}
        >
          <Input name="spec.address" />
        </Form.Item>
        <Form.Item label={t('Protocol')}>
          <Select
            name="spec.protocol"
            defaultValue="bgp"
            options={this.protocols}
            onChange={this.handleProtocolChange}
          />
        </Form.Item>
        {protocol === 'layer2' && (
          <Form.Item label={t('Interface')}>
            <Input name="spec.interface" />
          </Form.Item>
        )}
      </Modal.Form>
    )
  }
}
