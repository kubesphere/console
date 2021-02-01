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
import { RadioGroup } from '@kube-design/components'

import ServiceMonitor from './ServiceMonitor'
import WorkloadMonitor from './WorkloadMonitor'

export default class Monitors extends React.Component {
  constructor(props) {
    super(props)
    this.state = { type: 'service' }
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  get types() {
    return [
      {
        label: t('Service'),
        value: 'service',
      },
      {
        label: t('Workload'),
        value: 'workload',
      },
    ]
  }

  render() {
    const { type } = this.state
    return (
      <div>
        <RadioGroup
          mode="button"
          buttonWidth={50}
          value={this.state.type}
          onChange={this.handleTypeChange}
          options={this.types}
        />
        {type === 'service' ? (
          <ServiceMonitor {...this.props} />
        ) : (
          <WorkloadMonitor {...this.props} />
        )}
      </div>
    )
  }
}
