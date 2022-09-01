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
import { observer } from 'mobx-react'
import { Form, Select } from '@kube-design/components'
import Base from 'components/Forms/Workload/ContainerSettings'

@observer
export default class PodTemplate extends Base {
  getRestartPolicyOptions() {
    return [
      {
        label: t('RESTART_POLICY_NEVER_DESC'),
        value: 'Never',
      },
      {
        label: t('RESTART_POLICY_ONFAILURE_DESC'),
        value: 'OnFailure',
      },
    ]
  }

  renderRestartPolicy() {
    return (
      <Form.Item label={t('RESTART_POLICY')} desc={t(`RESTART_POLICY_DESC`)}>
        <Select
          name={`${this.prefix}spec.restartPolicy`}
          options={this.getRestartPolicyOptions()}
        />
      </Form.Item>
    )
  }

  render() {
    const { formRef } = this.props
    const { showContainer, selectContainer } = this.state

    if (showContainer) {
      return this.renderContainerForm(selectContainer)
    }

    return (
      <Form data={this.formTemplate} ref={formRef}>
        {this.renderRestartPolicy()}
        {this.renderContainerList()}
      </Form>
    )
  }
}
