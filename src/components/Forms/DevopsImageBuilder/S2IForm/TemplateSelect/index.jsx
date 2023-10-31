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

import { Form, Loading } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { get } from 'lodash'
import React from 'react'

import styles from './index.scss'

export default class TemplateSelect extends React.PureComponent {
  static defaultProps = {
    builderTemplate: [],
    onEnvironmentChange: () => {},
  }

  get languageType() {
    return get(this.props.formTemplate, 'metadata.annotations.languageType')
  }

  get containerList() {
    const { builderTemplate } = this.props
    return builderTemplate.reduce((options, currentTemplate) => {
      return options.concat(this.getOptions(currentTemplate))
    }, [])
  }

  getOptions(template) {
    return {
      ...template,
      type: get(template, 'metadata.labels.language', ''),
      description: get(template, 'spec.description', '-'),
      environment: '',
      builderImage: get(template, 'metadata.name'),
    }
  }

  getDefaultValue = () => {
    return this.containerList?.[0]?.builderImage
  }

  getTemplateOptions() {
    return this.containerList.map(container => ({
      icon: container.type,
      value: container.builderImage,
      label: container.builderImage,
      description: container.description,
    }))
  }

  render() {
    const { loading } = this.props

    if (loading) {
      return (
        <Form.Item>
          <Loading className={styles.loading} />
        </Form.Item>
      )
    }

    return (
      <Form.Item
        rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
        label={t('BUILD_ENVIRONMENT')}
        className={styles.form}
      >
        <TypeSelect
          name="spec.strategy.name"
          defaultValue={this.getDefaultValue()}
          options={this.getTemplateOptions()}
        />
      </Form.Item>
    )
  }
}
