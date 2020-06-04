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

import { Icon, Input, TextArea } from '@pitrix/lego-ui'
import { Form, Modal, Tag } from 'components/Base'
import { SelectInput } from 'components/Inputs'

import { CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'

export default class EditBasicInfoModal extends React.Component {
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
      formData: copy(props.detail),
    }
  }

  get groups() {
    return [
      {
        label: 'production',
        value: 'production',
      },
      {
        label: 'development',
        value: 'development',
      },
      {
        label: 'testing',
        value: 'testing',
      },
      {
        label: 'demo',
        value: 'demo',
      },
    ]
  }

  get providers() {
    return [
      {
        label: 'Aliyun ACK',
        value: 'Aliyun ACK',
        icon: 'aliyun',
      },
      {
        label: 'Aure Kubernetes Service',
        value: 'Aure Kubernetes Service',
        icon: 'windows',
      },
      {
        label: 'Huawei Cloud CCE',
        value: 'Huawei Cloud CCE',
        icon: 'kubernetes',
      },
      {
        label: 'Amazon EKS',
        value: 'Amazon EKS',
        icon: 'aws',
      },
      {
        label: 'Google Kubernetes Engine',
        value: 'Google Kubernetes Engine',
        icon: 'google-plus',
      },
      {
        label: 'QingCloud Kubernetes Engine',
        value: 'QingCloud Kubernetes Engine',
        icon: 'qingcloud',
      },
      {
        label: 'Tencent Kubernetes Engine',
        value: 'Tencent Kubernetes Engine',
        icon: 'kubernetes',
      },
    ]
  }

  groupOptionRenderer = option => (
    <>
      <Tag type={CLUSTER_GROUP_TAG_TYPE[option.value]}>
        {t(`ENV_${option.label.toUpperCase()}`)}
      </Tag>
      &nbsp;&nbsp;
      {option.label}
    </>
  )

  providerOptionRenderer = option => (
    <>
      <Icon name={option.icon} type="light" size={20} />
      {option.label}
    </>
  )

  handleOk = data => {
    const { onOk } = this.props
    onOk(data)
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props
    const { formData } = this.state

    return (
      <Modal.Form
        data={formData}
        width={691}
        title={t('Edit Cluster Info')}
        description={t('Edit cluster basic information')}
        icon="cluster"
        onOk={this.handleOk}
        okText={t('Update')}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Cluster Name')} desc={t('CLUSTER_NAME_DESC')}>
          <Input name="metadata.name" disabled />
        </Form.Item>
        <Form.Item label={t('CLUSTER_TAG')} desc={t('CLUSTER_TAG_DESC')}>
          <SelectInput
            name="metadata.labels['cluster.kubesphere.io/group']"
            options={this.groups}
            optionRenderer={this.groupOptionRenderer}
          />
        </Form.Item>
        <Form.Item label={t('Provider')} desc={t('CLUSTER_PROVIDER_DESC')}>
          <SelectInput
            name="spec.provider"
            options={this.providers}
            optionRenderer={this.providerOptionRenderer}
          />
        </Form.Item>
        <Form.Item label={t('Description')}>
          <TextArea name="metadata.annotations['kubesphere.io/description']" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
