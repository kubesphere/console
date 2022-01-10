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

import Base from 'components/Forms/Service/ServiceSettings'
import { Form, Input } from '@kube-design/components'
import { Label, TypeSelect } from 'components/Base'

import styles from './index.scss'

export default class ServiceSettingsForm extends Base {
  renderName() {
    return (
      <Form.Item label={t('NAME')}>
        <Input name="metadata.name" disabled />
      </Form.Item>
    )
  }

  renderSelectorLabels() {
    const selectors = get(this.props.formTemplate, 'spec.selector', {})

    return (
      <Form.Item label={t('SELECTOR')}>
        <div className={styles.selectors}>
          {Object.keys(selectors).map(key => (
            <Label key={key} name={key} value={selectors[key]} />
          ))}
        </div>
      </Form.Item>
    )
  }

  renderTypeSelect() {
    return (
      <Form.Item label={t('INTERNAL_ACCESS_MODE')}>
        <TypeSelect
          className="margin-b12"
          value={this.state.serviceType}
          onChange={this.handleTypeChange}
          options={this.types}
          disabled
        />
      </Form.Item>
    )
  }

  render() {
    const { formRef } = this.props

    return (
      <div className={styles.wrapper}>
        <Form data={this.formTemplate} ref={formRef}>
          {this.renderName()}
          {this.renderTypeSelect()}
          {this.renderSelectorLabels()}
          {this.renderPorts()}
        </Form>
      </div>
    )
  }
}
