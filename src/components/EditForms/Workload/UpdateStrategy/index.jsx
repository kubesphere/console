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
import { get, set, cloneDeep } from 'lodash'

import { Form } from '@kube-design/components'
import UpdateStrategyForm from 'components/Forms/Workload/ContainerSettings/UpdateStrategy'

export default class UpdateStrategy extends React.Component {
  handleChange = () => {
    const { formTemplate } = this.props
    const number = /^[0-9]*$/
    const newFormTemplate = cloneDeep(formTemplate)
    const maxSurge = get(
      newFormTemplate,
      'spec.strategy.rollingUpdate.maxSurge'
    )
    const maxUnavailable = get(
      newFormTemplate,
      'spec.strategy.rollingUpdate.maxUnavailable'
    )
    if (
      number.test(get(formTemplate, 'spec.strategy.rollingUpdate.maxSurge'))
    ) {
      set(
        newFormTemplate,
        'spec.strategy.rollingUpdate.maxSurge',
        Number(maxSurge)
      )
    }
    if (
      number.test(
        get(formTemplate, 'spec.strategy.rollingUpdate.maxUnavailable')
      )
    ) {
      set(
        newFormTemplate,
        'spec.strategy.rollingUpdate.maxUnavailable',
        Number(maxUnavailable)
      )
    }

    this.props.setParentState(newFormTemplate)
  }

  render() {
    const {
      formTemplate,
      formRef,
      formProps,
      module,
      isFederated,
      isEdit,
    } = this.props

    return (
      <div className="margin-t12" onChange={this.handleChange}>
        <Form data={formTemplate} ref={formRef} {...formProps}>
          <UpdateStrategyForm
            module={module}
            data={formTemplate}
            isFederated={isFederated}
            isEdit={isEdit}
          />
        </Form>
      </div>
    )
  }
}
