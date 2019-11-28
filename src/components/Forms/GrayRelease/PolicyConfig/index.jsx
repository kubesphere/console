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
import { get } from 'lodash'

import Canary from './Canary'
import Bluegreen from './Bluegreen'
import Mirror from './Mirror'

const COMPONENTS = {
  Canary,
  Bluegreen,
  Mirror,
}

@observer
export default class PolicyConfig extends React.Component {
  get strategyType() {
    return get(this.formTemplate, 'strategy.spec.type', '')
  }

  get formTemplate() {
    return this.props.formTemplate
  }

  render() {
    const { formRef, formProps } = this.props

    const Component = COMPONENTS[this.strategyType]

    if (!Component) {
      return null
    }

    return (
      <Component
        formRef={formRef}
        formTemplate={this.formTemplate}
        {...formProps}
      />
    )
  }
}
