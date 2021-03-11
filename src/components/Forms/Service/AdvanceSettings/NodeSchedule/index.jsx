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
import { Form } from '@kube-design/components'
import SelectorsInput from './SelectorsInput'

export default class NodeSchedule extends React.Component {
  get prefix() {
    return this.props.isFederated
      ? `${this.props.kind}.spec.template.spec.template.spec.`
      : `${this.props.kind}.spec.template.spec.`
  }

  render() {
    return (
      <Form.Item>
        <SelectorsInput
          name={`${this.prefix}nodeSelector`}
          addText={t('Add Node Selector')}
          {...this.props}
        />
      </Form.Item>
    )
  }
}
