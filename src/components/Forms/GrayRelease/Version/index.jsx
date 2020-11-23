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

import { get, set, debounce } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'

import { Column, Columns, Form, Input } from '@kube-design/components'
import { ReplicasInput } from 'components/Inputs'
import ContainerSettings from 'components/Forms/Workload/ContainerSettings'

import WorkloadStore from 'stores/workload'

import { mergeLabels } from 'utils'
import { PATTERN_COMPONENT_VERSION } from 'utils/constants'

import ContainerList from './ContainerList'

import styles from './index.scss'

@observer
export default class Version extends ContainerSettings {
  constructor(props) {
    super(props)
    this.module = get(
      props.formTemplate,
      'strategy.metadata.annotations["servicemesh.kubesphere.io/workloadType"]',
      'deployments'
    )
    this.workloadStore = new WorkloadStore(this.module)
  }

  get formTemplate() {
    return this.props.formTemplate.workload || {}
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  versionValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const componentName = get(this.formTemplate, 'metadata.labels.app', '')

    const name = `${componentName}-${value}`
    this.workloadStore
      .checkName({
        name,
        namespace: this.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({
            message: t(
              `${t('Deployments')} ${name} ${t('exists')}, ${t(
                'version number is invalid'
              )}`
            ),
            field: rule.field,
          })
        }
        callback()
      })
  }

  handleVersionChange = debounce(value => {
    const componentName = get(this.formTemplate, 'metadata.labels.app', '')

    const name = `${componentName}-${value}`
    set(this.formTemplate, 'metadata.name', name)
    mergeLabels(this.formTemplate, { version: value })
    set(
      this.props.formTemplate,
      'strategy.metadata.annotations["servicemesh.kubesphere.io/newWorkloadName"]',
      name
    )
  }, 200)

  renderReplicasControl() {
    return (
      <Column className="is-narrow">
        <Form.Item
          className={styles.narrow}
          label={t('Grayscale Release Version Number')}
          desc={t('GRAY_RELEASE_VERSION_FORMAT_DESC')}
          rules={[
            {
              required: true,
              message: t('Please input grayscale release version'),
            },
            {
              pattern: PATTERN_COMPONENT_VERSION,
              message: t('Invalid version'),
            },
            { validator: this.versionValidator },
          ]}
        >
          <Input
            name="metadata.labels.version"
            onChange={this.handleVersionChange}
            disabled={this.isEdit}
            maxLength={16}
          />
        </Form.Item>
        <div className={styles.specify}>
          <Form.Item>
            <ReplicasInput name="spec.replicas" />
          </Form.Item>
        </div>
      </Column>
    )
  }

  renderContainerList() {
    const specTemplate = get(this.formTemplate, `${this.prefix}spec`)

    return (
      <Column>
        <Form.Item rules={[{ validator: this.containersValidator }]}>
          <ContainerList
            className={styles.containers}
            name={`${this.prefix}spec.containers`}
            onShow={this.showContainer}
            onDelete={this.handleDelete}
            specTemplate={specTemplate}
            disabled={this.isEdit}
          />
        </Form.Item>
      </Column>
    )
  }

  render() {
    const { formRef, formProps } = this.props
    const { showContainer, selectContainer } = this.state

    if (showContainer) {
      return this.renderContainerForm(selectContainer)
    }

    return (
      <Form data={this.formTemplate} ref={formRef} {...formProps}>
        <Columns>
          {this.renderReplicasControl()}
          {this.renderContainerList()}
        </Columns>
      </Form>
    )
  }
}
