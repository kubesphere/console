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
import { get, set, isEmpty } from 'lodash'
import { Form } from '@kube-design/components'

import VersionSelect from './VersionSelect'

import styles from './index.scss'

export default class Bluegreen extends React.Component {
  state = {
    versions: [],
  }

  componentDidMount() {
    const { formTemplate } = this.props

    const host = get(formTemplate, 'strategy.spec.template.spec.hosts[0]')
    const oldVersion = get(formTemplate, 'strategy.spec.principal')
    const newVersion = get(formTemplate, 'workload.metadata.labels.version')
    const newReplicas = get(formTemplate, 'workload.spec.replicas')
    const oldReplicas = get(
      formTemplate,
      'strategy.metadata.annotations["servicemesh.kubesphere.io/workloadReplicas"]',
      0
    )

    const httpData = [
      {
        route: [
          { destination: { subset: oldVersion, host }, weight: 100 },
          { destination: { subset: newVersion, host }, weight: 0 },
        ],
      },
    ]

    // istio fix
    if (this.protocol === 'tcp') {
      httpData.forEach(item => {
        item.match = item.match || []
      })
    }

    if (isEmpty(get(this.formTemplate, 'spec.governor'))) {
      set(this.formTemplate, 'spec.governor', oldVersion)
    }

    if (isEmpty(get(this.formTemplate, this.strategyPath))) {
      set(this.formTemplate, this.strategyPath, httpData)
    }

    this.setState({
      versions: [
        { name: oldVersion, replicas: oldReplicas },
        { name: newVersion, replicas: newReplicas },
      ],
    })
  }

  get formTemplate() {
    return this.props.formTemplate.strategy
  }

  get protocol() {
    return get(this.formTemplate, 'spec.protocol', 'http')
  }

  get strategyPath() {
    return `spec.template.spec.${this.protocol}`
  }

  handleVersionChange = version => {
    const oldVersion = get(this.formTemplate, 'spec.principal')

    if (oldVersion === version) {
      set(this.formTemplate, `${this.strategyPath}[0].route[0].weight`, 100)
      set(this.formTemplate, `${this.strategyPath}[0].route[1].weight`, 0)
    } else {
      set(this.formTemplate, `${this.strategyPath}[0].route[0].weight`, 0)
      set(this.formTemplate, `${this.strategyPath}[0].route[1].weight`, 100)
    }
  }

  render() {
    const { formRef, formTemplate, ...rest } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <p>{t('BLUE_GREEN_STRATEGY_DESC')}</p>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>{t('SELECT_VERSION')}</div>
          <Form ref={formRef} data={this.formTemplate} {...rest}>
            <Form.Item>
              <VersionSelect
                name="spec.governor"
                options={this.state.versions}
                onChange={this.handleVersionChange}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
