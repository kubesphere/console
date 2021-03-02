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

import React, { Component } from 'react'
import classNames from 'classnames'
import { observer } from 'mobx-react'
import { Button, Loading } from '@kube-design/components'
import { zoom } from 'd3-zoom'
import { select, event as d3Event } from 'd3-selection'

import { Panel } from 'components/Base'
import TopologyStore from 'stores/network/topology'
import { startAutoRefresh, stopAutoRefresh } from 'utils/monitoring'

import RadioButtons from './RadioButtons'
import Service from './Service'
import Edge from './Edge'
import Detail from './Detail'

import styles from './index.scss'

@observer
export default class Topology extends Component {
  state = {
    type: 'pause',
    selectService: null,
    fullscreen: false,
  }

  store = new TopologyStore()

  componentDidMount() {
    this.fetchData()

    this.svg = select('#canvas').call(
      zoom()
        .extent([
          [0, 0],
          [9999, 9999],
        ])
        .scaleExtent([0.1, 1.5])
        .on('zoom', this.handleZoom)
    )
    this.transPan = this.svg.select('g.transform')
  }

  componentWillUnmount() {
    stopAutoRefresh(this)
  }

  handleZoom = () => {
    const { transform } = d3Event
    this.transPan.attr(
      'transform',
      `scale(${transform.k}) translate(${transform.x /
        transform.k}, ${transform.y / transform.k})`
    )
  }

  get options() {
    return [
      { label: 'Auto', icon: 'start', value: 'auto' },
      { label: 'Pause', icon: 'pause', value: 'pause' },
    ]
  }

  fetchData = (params = {}) => {
    this.store.fetchList({ ...this.props.match.params, ...params })
  }

  handleChange = value => {
    this.setState({ type: value }, () => {
      if (this.state.type === 'auto') {
        startAutoRefresh(this, {
          method: 'fetchData',
          leading: false,
          interval: 10000,
        })
      } else {
        stopAutoRefresh(this)
      }
    })
  }

  handleRefresh = () => {
    this.fetchData()
  }

  handleServiceClick = service => {
    this.setState(({ selectService }) => ({
      selectService:
        selectService && selectService.id === service.id ? null : service,
    }))
  }

  handleDetailClose = () => {
    this.setState({ selectService: null })
  }

  toggleFullscreen = () => {
    this.setState(({ fullscreen }) => ({
      fullscreen: !fullscreen,
    }))
  }

  render() {
    const { type, fullscreen, selectService } = this.state
    const {
      topologies: { nodes = [], edges = [] },
      isLoading,
    } = this.store

    return (
      <Panel className={classNames({ [styles.fullscreen]: fullscreen })}>
        <div className={styles.toolbar}>
          <RadioButtons
            value={type}
            options={this.options}
            onChange={this.handleChange}
          />
          <div className={styles.right}>
            <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
            <Button
              type="flat"
              icon={fullscreen ? 'minimize' : 'maximize'}
              onClick={this.toggleFullscreen}
            />
          </div>
        </div>
        <div className={styles.content}>
          <svg id="canvas">
            <g className="transform">
              <g className="chart">
                {edges.map(edge => (
                  <Edge key={edge.v + edge.w} data={edge} />
                ))}
                {nodes.map(node => (
                  <Service
                    key={node.id}
                    data={node}
                    isSelected={selectService && selectService.id === node.id}
                    onClick={this.handleServiceClick}
                  />
                ))}
              </g>
            </g>
          </svg>
          {isLoading && <Loading className={styles.loading} />}
          {!!selectService && (
            <Detail
              data={selectService}
              store={this.store}
              match={this.props.match}
              onClose={this.handleDetailClose}
            />
          )}
        </div>
      </Panel>
    )
  }
}
