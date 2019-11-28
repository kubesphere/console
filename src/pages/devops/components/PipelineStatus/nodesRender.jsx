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
import { observable, action, toJS, computed } from 'mobx'
import { observer } from 'mobx-react'

import Card from './card'
import Edges from '../Pipeline/Edges'

@observer
export default class PipelineNodes extends React.Component {
  @observable
  heights = []

  @computed
  get sumHeights() {
    const { stages = [] } = this.props

    return this.heights.slice(0, stages.length).map(height => {
      let tempHeight = 0
      return height.map(_height => {
        tempHeight += _height
        return tempHeight
      })
    })
  }

  @action
  setHeight = index => heights => {
    const _heights = [...this.heights]
    _heights[index] = heights
    this.heights = _heights
  }

  render() {
    const { stages } = this.props

    return (
      <React.Fragment>
        <Edges index={-1} heights={this.sumHeights} />
        {stages.map((stage, index) => (
          <React.Fragment key={JSON.stringify(stage)}>
            <Card
              nodes={toJS(stage)}
              index={index}
              setHeight={this.setHeight(index)}
              onProceed={this.props.onProceed}
              onBreak={this.props.onBreak}
            />
            <Edges index={index} heights={this.sumHeights} />
          </React.Fragment>
        ))}
      </React.Fragment>
    )
  }
}
