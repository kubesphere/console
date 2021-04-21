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
import { PropTypes } from 'prop-types'
import { Form, Input, Select, TextArea } from '@kube-design/components'
import { PATTERN_NAME, PATTERN_SERVICE_VERSION } from 'utils/constants'
import { updateFederatedAnnotations, generateId } from 'utils'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  static propTypes = {
    onLabelsChange: PropTypes.func,
  }

  static defaultProps = {
    onLabelsChange() {},
  }

  get formTemplate() {
    return this.props.formData.application
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  get governances() {
    return [
      { label: t('On'), value: 'true' },
      { label: t('Off'), value: 'false' },
    ]
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store
      .checkName({
        name: value,
        namespace: this.props.namespace,
        cluster: this.props.cluster,
      })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  handleNameChange = debounce(value => {
    set(this.formTemplate, 'metadata.labels["app.kubernetes.io/name"]', value)
    set(
      this.fedFormTemplate,
      'metadata.labels["app.kubernetes.io/name"]',
      value
    )
    set(
      this.fedFormTemplate,
      'spec.selector.matchLabels["app.kubernetes.io/name"]',
      value
    )
    this.props.onLabelsChange(
      get(this.fedFormTemplate, 'spec.selector.matchLabels')
    )

    set(
      this.props.formData,
      'ingress.metadata.name',
      `${value}-ingress-${generateId()}`
    )

    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }
  }, 200)

  handleVersionChange = debounce(value => {
    set(
      this.fedFormTemplate,
      'spec.selector.matchLabels["app.kubernetes.io/version"]',
      value
    )
    this.props.onLabelsChange(
      get(this.fedFormTemplate, 'spec.selector.matchLabels')
    )
  }, 200)

  handleGovernanceChange = value => {
    this.props.onGovernanceChange(value)
    if (this.props.isFederated) {
      updateFederatedAnnotations(this.formTemplate)
    }
  }

  render() {
    const { formRef, serviceMeshEnable } = this.props

    return (
      <div className={styles.wrapper}>
        <div className={styles.step}>
          <div>{t('Basic Info')}</div>
          <p>{t('APPLICATION_BASEINFO_DESC')}</p>
        </div>
        <Form data={this.formTemplate} ref={formRef}>
          <Form.Item
            label={t('Application Name')}
            desc={t('NAME_DESC')}
            rules={[
              {
                required: true,
                message: t('Please input an application name'),
              },
              {
                pattern: PATTERN_NAME,
                message: t('Invalid name', { message: t('NAME_DESC') }),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input
              name="metadata.name"
              onChange={this.handleNameChange}
              maxLength={63}
            />
          </Form.Item>
          <Form.Item
            label={t('Application Version(Optional)')}
            desc={`${t('COMPONENT_VERSION_DESC')}`}
            rules={[
              {
                pattern: PATTERN_SERVICE_VERSION,
                message: t('COMPONENT_VERSION_DESC'),
              },
            ]}
          >
            <Input
              name="metadata.labels['app.kubernetes.io/version']"
              onChange={this.handleVersionChange}
              maxLength={16}
            />
          </Form.Item>
          <Form.Item
            label={t('Application Governance')}
            desc={t.html('APP_GOVERNANCE_DESC')}
          >
            <Select
              name="metadata.annotations['servicemesh.kubesphere.io/enabled']"
              options={this.governances}
              onChange={this.handleGovernanceChange}
              disabled={!serviceMeshEnable}
            />
          </Form.Item>
          <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
            <TextArea
              name="metadata.annotations['kubesphere.io/description']"
              maxLength={256}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
