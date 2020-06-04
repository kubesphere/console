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
import { Icon, Input, TextArea } from '@pitrix/lego-ui'
import { PATTERN_NAME, CLUSTER_GROUP_TAG_TYPE } from 'utils/constants'
import { Form, Tag } from 'components/Base'
import { SelectInput } from 'components/Inputs'

import SubTitle from '../SubTitle'

export default class BaseInfo extends React.Component {
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

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  render() {
    return (
      <div>
        <SubTitle
          title={t('Cluster Settings')}
          description={t('CLUSTER_SETTINGS_DESC')}
        />
        <Form.Item
          label={t('Cluster Name')}
          desc={t('CLUSTER_NAME_DESC')}
          rules={[
            { required: true, message: t('Please input role name') },
            {
              pattern: PATTERN_NAME,
              message: `${t('Invalid name')}, ${t('CLUSTER_NAME_DESC')}`,
            },
            { validator: this.nameValidator },
          ]}
        >
          <Input name="metadata.name" />
        </Form.Item>
        <Form.Item label={t('CLUSTER_TAG')} desc={t('CLUSTER_TAG_DESC')}>
          <SelectInput
            name="metadata.labels['cluster.kubesphere.io/group']"
            options={this.groups}
            placeholder={t('Please select or input a tag')}
            optionRenderer={this.groupOptionRenderer}
          />
        </Form.Item>
        <Form.Item label={t('Provider')} desc={t('CLUSTER_PROVIDER_DESC')}>
          <SelectInput
            name="spec.provider"
            options={this.providers}
            placeholder={t('Please select or input a provider')}
            optionRenderer={this.providerOptionRenderer}
          />
        </Form.Item>
        <Form.Item label={t('Description')}>
          <TextArea name="metadata.annotations['kubesphere.io/description']" />
        </Form.Item>
      </div>
    )
  }
}
