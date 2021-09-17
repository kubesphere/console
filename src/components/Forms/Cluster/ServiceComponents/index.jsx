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
import { toJS } from 'mobx'
import { Form } from '@kube-design/components'
import ComponentSelect from './ComponentSelect'

import styles from './index.scss'

import Title from '../Title'

export default class ServiceComponents extends React.Component {
  constructor(props) {
    super(props)
    this.init()
  }

  init() {
    const { formTemplate } = this.props
    const { template, components = [] } = toJS(
      get(this.props.store.kubekey, 'parameters.kubesphere', {})
    )

    set(formTemplate, 'spec.addons[1]', template)

    const values = get(formTemplate, 'spec.addons[1].sources.chart.values', [])
    components.forEach(component => {
      if (component.parameters) {
        component.parameters.forEach(param => {
          if ('default' in param) {
            values.push(`${component.name}.${param.name}=${param.default}`)
          }
        })
      }
    })
    set(formTemplate, 'spec.addons[1].sources.chart.values', values)
  }

  render() {
    const { formRef, formTemplate } = this.props
    return (
      <div className={styles.wrapper}>
        <Title
          title={t('SYSTEM_COMPONENT_PL')}
          description={t('CLUSTER_COMPONENTS_DESC')}
        />
        <Form className={styles.form} data={formTemplate} ref={formRef}>
          <Form.Item>
            <ComponentSelect
              name="spec.addons[1].sources.chart.values"
              components={get(
                this.props.store.kubekey,
                'parameters.kubesphere.components',
                []
              )}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
