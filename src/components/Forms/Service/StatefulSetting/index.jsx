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
import { get, set } from 'lodash'
import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { updateLabels } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'
import { MODULE_KIND_MAP } from 'utils/constants'
import styles from './index.scss'

export default class StatefulSetting extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
  }

  get namespace() {
    const { formTemplate } = this.props
    return get(formTemplate, 'Service.metadata.namespace', '')
  }

  getValue = () => {
    const { formTemplate } = this.props
    return get(formTemplate, 'StatefulSet') ? 'stateful' : 'stateless'
  }

  handleChange = type => {
    this.setTemplate(type)
    this.forceUpdate()
  }

  setTemplate = type => {
    const { formTemplate } = this.props
    const currentType = formTemplate.Deployment ? 'stateless' : 'stateful'
    if (type === currentType) {
      return
    }

    const module = type === 'stateless' ? 'deployments' : 'statefulsets'
    const oldModule = type === 'stateless' ? 'statefulsets' : 'deployments'
    const kind = MODULE_KIND_MAP[module]
    const oldKind = MODULE_KIND_MAP[oldModule]
    this.props.store.setModule(module)
    this.props.updateModule(module)

    const metadata = get(formTemplate[oldKind], 'metadata')
    const labels = get(formTemplate[oldKind], 'metadata.labels')
    set(
      formTemplate,
      kind,
      FORM_TEMPLATES[module]({ namespace: this.namespace })
    )
    if (metadata) {
      set(formTemplate, `${kind}.metadata`, metadata)
    }
    updateLabels(formTemplate, module, labels)

    delete formTemplate[oldKind]
  }

  render() {
    const options = [
      {
        icon: 'backup',
        value: 'stateful',
        label: t('STATEFUL_SERVICE'),
        description: t('STATEFUL_SERVICE_DESC'),
      },
      {
        icon: 'backup',
        value: 'stateless',
        label: t('STATELESS_SERVICE'),
        description: t('STATELESS_SERVICE_DESC'),
      },
    ]

    return (
      <Form.Item className={styles.formItem} label={t('SERVICE_TYPE')}>
        <TypeSelect
          value={this.getValue()}
          options={options}
          onChange={this.handleChange}
        />
      </Form.Item>
    )
  }
}
