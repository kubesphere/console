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
import { get, set } from 'lodash'
import { TypeSelect } from 'components/Base'
import { Form, Loading } from '@kube-design/components'

import cookie from 'utils/cookie'

import styles from './index.scss'

export default class TemplateSelect extends React.PureComponent {
  static defaultProps = {
    builderTemplate: [],
    onEnvironmentChange: () => {},
  }

  get isB2i() {
    return (
      get(
        this.props.formTemplate,
        'metadata.labels["s2i-type.kubesphere.io"]'
      ) === 'b2i'
    )
  }

  get languageType() {
    return get(this.props.formTemplate, 'metadata.annotations.languageType')
  }

  get containerList() {
    const { builderTemplate } = this.props

    if (this.isB2i) {
      return builderTemplate.reduce((options, currentTemplate) => {
        if (
          get(
            currentTemplate,
            'metadata.labels["binary-type.kubesphere.io"]'
          ) === this.languageType
        ) {
          return options.concat(this.getOptions(currentTemplate))
        }
        return options
      }, [])
    }

    return builderTemplate.reduce((options, currentTemplate) => {
      if (get(currentTemplate, 'spec.codeFramework') === this.languageType) {
        return options.concat(this.getOptions(currentTemplate))
      }
      return options
    }, [])
  }

  getOptions(template) {
    const currentLang = cookie('lang') === 'en' ? 'EN' : 'CN'
    return get(template, 'spec.containerInfo', []).map(containerInfo => ({
      ...containerInfo,
      type: get(template, 'spec.codeFramework', ''),
      description:
        get(template, `metadata.annotations.description${currentLang}`, '') ||
        get(template, 'spec.description', ''),
      environment: get(template, 'spec.environment'),
      docUrl: get(
        template,
        'metadata.annotations["devops.kubesphere.io/s2i-template-url"]',
        ''
      ),
    }))
  }

  getDefaultValue = () => {
    const { builderTemplate } = this.props
    if (this.isB2i) {
      return get(this.containerList[0], 'builderImage', '')
    }

    return get(
      builderTemplate.find(
        template => get(template, 'spec.codeFramework') === this.languageType
      ),
      'spec.defaultBaseImage',
      ''
    )
  }

  getTemplateOptions() {
    return this.containerList.map(container => ({
      icon: container.type,
      value: container.builderImage,
      label: container.builderImage,
      description: container.description,
    }))
  }

  handleTemplateChange = value => {
    const { formTemplate } = this.props
    const currentContainer =
      this.containerList.find(container => container.builderImage === value) ||
      {}
    Object.keys(currentContainer).forEach(key => {
      if (['environment', 'docUrl', 'description'].includes(key)) return
      set(formTemplate, `spec.config.${key}`, currentContainer[key])
    })
    this.props.onEnvironmentChange(currentContainer)
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
        rules={[{ required: true, message: t('This param is required') }]}
        label={t('Build Environment')}
        className={styles.form}
      >
        <TypeSelect
          name="spec.config.builderImage"
          defaultValue={this.getDefaultValue()}
          options={this.getTemplateOptions()}
          onChange={this.handleTemplateChange}
        />
      </Form.Item>
    )
  }
}
