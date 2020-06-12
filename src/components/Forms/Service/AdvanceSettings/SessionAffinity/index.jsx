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
import { set } from 'lodash'
import { Form } from 'components/Base'
import { NumberInput } from 'components/Inputs'

export default class SessionAffinity extends React.Component {
  get fedPreifx() {
    return this.props.isFederated ? 'spec.template.' : ''
  }

  componentDidMount() {
    const { formTemplate } = this.props

    set(
      formTemplate,
      `Service.${this.fedPreifx}spec.sessionAffinity`,
      'ClientIP'
    )
  }

  componentWillUnmount() {
    const { formTemplate } = this.props

    set(formTemplate, `Service.${this.fedPreifx}spec.sessionAffinity`, 'None')
  }

  render() {
    return (
      <Form.Item label={t('Maximum session sticky time(s)')}>
        <NumberInput
          name={`Service.${
            this.fedPreifx
          }spec.sessionAffinityConfig.clientIP.timeoutSeconds`}
          defaultValue={10800}
          min={0}
        />
      </Form.Item>
    )
  }
}
