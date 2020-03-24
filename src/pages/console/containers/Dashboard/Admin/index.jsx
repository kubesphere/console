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
import { Columns, Column } from '@pitrix/lego-ui'

import ResourceStatistics from './Statistics'
import ClusterStatus from './ClusterStatus'
import ResourceUsage from './ResourceUsage'

export default class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <Columns className="is-variable is-1_1">
          <Column className="is-4">
            <ResourceStatistics />
          </Column>
          <Column className="is-8">
            <ClusterStatus />
          </Column>
        </Columns>
        <Columns>
          <Column className="is-12">
            <ResourceUsage />
          </Column>
        </Columns>
      </div>
    )
  }
}
