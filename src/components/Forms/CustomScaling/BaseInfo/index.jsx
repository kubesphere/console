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

import { Column, Columns, Form, Input, TextArea } from '@kube-design/components'
import { get, set } from 'lodash'
import React from 'react'
import { PATTERN_ALIAS_NAME, PATTERN_NAME } from 'utils/constants'
import WorkloadAddCard from './WorkloadAddCard'
import WorkloadTableForm from './WorkloadTableForm'

export default class BaseInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      workloadData: {},
    }
  }

  get cluster() {
    return this.props.cluster
  }

  get namespace() {
    return get(this.props.formTemplate, 'metadata.namespace')
  }

  onShowAdd = () => {
    this.setState({
      visible: true,
      workloadData: {},
    })
  }

  onShowEdit = workload => {
    this.setState({
      visible: true,
      workloadData: workload,
    })
  }

  resetState = () => {
    this.setState({
      visible: false,
      workloadData: {},
    })
  }

  onSave = data => {
    set(this.props.formTemplate, 'spec.scaleTargetRef.name', data.name)
    set(this.props.formTemplate, 'spec.scaleTargetRef.apiVersion', 'apps/v1')

    set(this.props.formTemplate, 'metadata.name', data.name)

    this.setState({
      visible: false,
      workloadData: {},
    })
  }

  selectContainer = value => {
    set(
      this.props.formTemplate,
      'spec.scaleTargetRef.envSourceContainerName',
      value
    )
  }

  renderWorkloadTableForm() {
    const { formTemplate, cluster, namespace } = this.props

    return (
      <WorkloadTableForm
        formTemplate={formTemplate}
        cluster={cluster}
        namespace={namespace}
        onSave={this.onSave}
        onCancel={this.resetState}
      />
    )
  }

  render() {
    const {
      formRef,
      formTemplate,
      maxNameLength = 253,
      cluster,
      namespace,
    } = this.props

    const { visible } = this.state
    if (visible) {
      return this.renderWorkloadTableForm()
    }

    const desc = maxNameLength === 253 ? t('LONG_NAME_DESC') : t('NAME_DESC')

    return (
      <Form ref={formRef} data={formTemplate}>
        <Columns>
          <Column>
            <Form.Item
              label={t('NAME')}
              desc={desc}
              rules={[
                { required: true, message: t('NAME_EMPTY_DESC') },
                {
                  pattern: PATTERN_NAME,
                  message: t('INVALID_NAME_DESC', { message: desc }),
                },
              ]}
            >
              <Input name="metadata.name" maxLength={maxNameLength} disabled />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('ALIAS')}
              desc={t('ALIAS_DESC')}
              rules={[
                {
                  pattern: PATTERN_ALIAS_NAME,
                  message: t('INVALID_ALIAS_NAME_DESC'),
                },
              ]}
            >
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                maxLength={63}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metadata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
        </Columns>

        <Form.Item
          label={t('SCALING_OBJECT')}
          rules={[
            { required: true, message: t('EMPTY_SCALING_OBJECT_MESSAGE') },
          ]}
        >
          <WorkloadAddCard
            name="spec.scaleTargetRef.name"
            scaleTargetRef={get(this.props.formTemplate, 'spec.scaleTargetRef')}
            onShowAdd={this.onShowAdd}
            onShowEdit={this.onShowEdit}
            onCancel={this.resetState}
            cluster={cluster}
            selectContainer={this.selectContainer}
            namespace={namespace}
          />
        </Form.Item>
      </Form>
    )
  }
}
