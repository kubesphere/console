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
import { observer, inject } from 'mobx-react'
import Graph from '../components/Graph/ComposeWithLegends'

@inject('monitoringStore')
@observer
export default class GraphMonitorOverview extends React.Component {
  render() {
    const { from, to } = this.props.monitoringStore.getTimeRange()

    const timeRange = {
      start: from.valueOf(),
      end: to.valueOf(),
    }

    const { config, valueFormatter, graphData, legends } = this.props.monitor
    const { title, lines, bars, stack } = config

    return (
      <Graph
        key={legends.map(legend => legend.ID).join(',')}
        title={title}
        line={lines}
        bar={bars}
        stacked={stack}
        timeRange={timeRange}
        valueFormatter={valueFormatter}
        legends={legends}
        data={graphData}
      />
    )
  }
}
