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

import { get, set } from 'lodash'
import React from 'react'
import { Alert } from '@pitrix/lego-ui'
import { Form } from 'components/Base'
import { ResourceLimit } from 'components/Inputs'

import styles from './index.scss'

export default class AdvanceSettings extends React.Component {
  get formTemplate() {
    return this.props.formTemplate.LimitRange
  }

  get resourceLimit() {
    return {
      requests: get(this.formTemplate, 'spec.limits[0].defaultRequest', {}),
      limits: get(this.formTemplate, 'spec.limits[0].default', {}),
    }
  }

  handleChange = data => {
    set(this.formTemplate, 'spec.limits[0]', {
      default: data.limits,
      defaultRequest: data.requests,
      type: 'Container',
    })
  }

  render() {
    const { formRef } = this.props

    return (
      <div className={styles.wrapper}>
        <Alert
          className="margin-b12"
          type="info"
          message={t('DEFAULT_RESOURCE_ALERT')}
        />
        <Form data={this.formTemplate} ref={formRef}>
          <ResourceLimit
            defaultValue={this.resourceLimit}
            onChange={this.handleChange}
          />
        </Form>
      </div>
    )
  }
}
