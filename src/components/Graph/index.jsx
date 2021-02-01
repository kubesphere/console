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
import PropTypes from 'prop-types'
import classNames from 'classnames'
import isEqual from 'react-fast-compare'
import { Loading } from '@kube-design/components'

import { findParent } from 'utils/dom'
import { Dragger } from 'components/Base'

import { processData } from './utils'

import Edge from './Edge'
import App from './App'
import Detail from './Detail'

import styles from './index.scss'

export default class Graph extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object),
      edges: PropTypes.arrayOf(PropTypes.object),
    }),
    health: PropTypes.object,
  }

  static defaultProps = {
    data: { nodes: [], edges: [] },
    health: {},
  }

  static childContextTypes = {
    wrapperRef: PropTypes.object,
    selectedData: PropTypes.object,
    selectedType: PropTypes.string,
    onSelectApp: PropTypes.func,
  }

  getChildContext() {
    return {
      selectedData: this.state.selectedData,
      selectedType: this.state.selectedType,
      onSelectApp: this.handleSelect,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      graph: processData(props.data, props.health),
      selectedData: {},
      selectedEdges: [],
      selectedType: '',
      fullScreen: false,
    }
    this.draggerRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(this.props.data, prevProps.data) ||
      !isEqual(this.props.health, prevProps.health)
    ) {
      const graph = processData(this.props.data, this.props.health)
      this.setState({ graph })

      if (this.state.selectedData && this.state.selectedData.name) {
        const newData = graph.nodes.find(
          node => node.name === this.state.selectedData.name
        )
        this.setState({ selectedData: newData })
      }
    }
  }

  handleWrapperClick = e => {
    if (e && findParent(e.target, 'ks-app-component') === null) {
      if (this.state.selectedType === 'app') {
        const $selected = this.draggerRef.current.content.querySelector(
          `[data-component='${this.state.selectedData.name}']`
        )
        if ($selected && !$selected.contains(e.target)) {
          this.setState({
            selectedData: {},
            selectedType: '',
            selectedEdges: [],
          })
        }
      }
    }
  }

  toggleFullScreen = () => {
    this.setState(({ fullScreen }) => ({ fullScreen: !fullScreen }))
  }

  handleRefresh = () => {
    this.props.onFetch()
  }

  handleSelect = (data, type) => {
    this.setState({
      selectedData: data,
      selectedType: type,
      selectedEdges: [
        ...data.edges.in.map(item => item.data.id),
        ...data.edges.out.map(item => item.data.id),
      ],
    })
  }

  render() {
    const { store, loading } = this.props
    const {
      graph,
      selectedType,
      selectedData,
      selectedEdges,
      fullScreen,
    } = this.state

    return (
      <div
        className={classNames(styles.graph, {
          [styles.fullScreen]: fullScreen,
        })}
      >
        <div className={styles.loading}>
          <Loading spinning={loading} />
        </div>
        <Dragger
          className={styles.dragger}
          contentClassName={styles.mainContent}
          ref={this.draggerRef}
          onClick={this.handleWrapperClick}
          initialScale={0.6}
          onFullScreen={this.toggleFullScreen}
          controlStyle={{ right: selectedType ? 420 : 20 }}
          onRefresh={this.handleRefresh}
        >
          <div className={styles.graphContent}>
            {graph.nodes.map(app => (
              <App key={app.name} data={app} />
            ))}
            <svg className={styles.edgeWrapper}>
              {graph.edges.map(edge => (
                <Edge
                  key={edge.data.id}
                  data={edge}
                  selected={selectedEdges.includes(edge.data.id)}
                />
              ))}
            </svg>
          </div>
        </Dragger>
        {selectedType && (
          <Detail
            className={styles.detail}
            type={selectedType}
            data={selectedData}
            store={store}
            fullScreen={fullScreen}
          />
        )}
      </div>
    )
  }
}
