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
import { inject } from 'mobx-react'

import PhysicalResource from './Physical'
import VirtualResource from './Virtual'
import ProjectTrend from './Trend'

@inject('rootStore')
class ResourceUsage extends React.Component {
  renderPhysicalResource() {
    return <PhysicalResource {...this.props} />
  }

  renderVirtualResource() {
    return <VirtualResource {...this.props} />
  }

  renderProjectTrend() {
    return <ProjectTrend {...this.props} />
  }

  render() {
    return (
      <div>
        {this.renderPhysicalResource()}
        {this.renderVirtualResource()}
        {this.renderProjectTrend()}
      </div>
    )
  }
}

export default ResourceUsage
