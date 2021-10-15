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
import { Alert, Form } from '@kube-design/components'

export default class Mirror extends React.Component {
  componentDidMount() {
    const { formTemplate } = this.props

    const host = get(formTemplate, 'strategy.spec.template.spec.hosts[0]')
    const oldVersion = get(formTemplate, 'strategy.spec.principal')
    const newVersion = get(formTemplate, 'workload.metadata.labels.version')

    const httpData = [
      {
        route: [{ destination: { subset: oldVersion, host }, weight: 100 }],
        mirror: { host, subset: newVersion },
      },
    ]

    // istio fix
    if (this.protocol === 'tcp') {
      httpData.forEach(item => {
        item.match = item.match || []
      })
    }

    if (isEmpty(get(this.formTemplate, this.strategyPath))) {
      set(this.formTemplate, this.strategyPath, httpData)
    }
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

  render() {
    const { formRef, formTemplate } = this.props
    return (
      <Form ref={formRef} data={formTemplate}>
        <Alert type="info" message={t('MIRROR_POLICY_DESC')} />
      </Form>
    )
  }
}
