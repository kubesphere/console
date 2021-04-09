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
import { get } from 'lodash'
import PropTypes from 'prop-types'
import copy from 'fast-copy'

import {
  Form,
  Icon,
  Input,
  Select,
  Tag,
  TextArea,
} from '@kube-design/components'
import { Modal } from 'components/Base'

import {
  CLUSTER_GROUP_TAG_TYPE,
  CLUSTER_PROVIDERS,
  CLUSTER_PRESET_GROUPS,
} from 'utils/constants'

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
      region: get(
        props.detail,
        'metadata.labels["topology.kubernetes.io/region"]',
        ''
      ),
      formData: copy(props.detail),
    }
  }

  get regions() {
    return get(globals.config, 'regionZones', []).map(item => ({
      label: item.alias,
      value: item.name,
    }))
  }

  get zones() {
    const region = get(globals.config, 'regionZones', []).find(
      item => item.name === this.state.region
    )

    if (region && region.zones) {
      return region.zones.map(item => ({
        label: item.alias,
        value: item.name,
      }))
    }

    return []
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

  handleRegionSelect = region => {
    this.setState({ region })
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
        <Form.Item label={t('Cluster Name')} desc={t('NAME_DESC')}>
          <Input name="metadata.name" disabled />
        </Form.Item>
        <Form.Item label={t('CLUSTER_TAG')} desc={t('CLUSTER_TAG_DESC')}>
          <Select
            name="metadata.labels['cluster.kubesphere.io/group']"
            options={CLUSTER_PRESET_GROUPS}
            optionRenderer={this.groupOptionRenderer}
          />
        </Form.Item>
        <Form.Item label={t('Provider')} desc={t('CLUSTER_PROVIDER_DESC')}>
          <Select
            name="spec.provider"
            options={CLUSTER_PROVIDERS}
            optionRenderer={this.providerOptionRenderer}
          />
        </Form.Item>
        <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
          <TextArea
            name="metadata.annotations['kubesphere.io/description']"
            maxLength={256}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
