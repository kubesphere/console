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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Button, Collapse, Icon } from '@kube-design/components'

import BaseInfo from './BaseInfo'
import Connections from './Connections'
import Childrens from './Childrens'
import Containers from './Containers'
import Tables from './Tables'

import styles from './index.scss'

const { CollapseItem } = Collapse

@observer
export default class ServiceDetail extends Component {
  static defaultProps = {
    data: {},
  }

  state = {
    activeKey: ['Info'],
  }

  componentDidMount() {
    this.fetchDetail(this.props.data.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.id !== this.props.data.id) {
      this.fetchDetail(this.props.data.id)
    }
  }

  fetchDetail(id) {
    const { store, match } = this.props
    const { cluster, namespace } = match.params
    if (id) {
      store.fetchDetail({
        cluster,
        namespace,
        name: id,
      })
    }
  }

  handleJump = params => {
    this.fetchDetail(params.id)
  }

  handleCollapseChange = value => {
    this.setState({
      activeKey: value,
    })
  }

  render() {
    const { onClose } = this.props
    const { node = {} } = toJS(this.props.store.detail)
    const { match } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <Icon name="appcenter" size={40} />
          </div>
          <div className={styles.title}>{node.label}</div>
          <Button
            className={styles.close}
            icon="close"
            iconType="light"
            type="control"
            onClick={onClose}
            data-test="modal-close"
          />
        </div>
        <div className={styles.content}>
          <Collapse
            activeKey={this.state.activeKey}
            onChange={this.handleCollapseChange}
            accordion
          >
            <CollapseItem label="info" key="info">
              <BaseInfo detail={node} />
            </CollapseItem>
            <CollapseItem label="Traffic" key="traffic">
              <Connections detail={node} jumpTo={this.handleJump} />
            </CollapseItem>
            <CollapseItem label="Pods" key="pods">
              <Childrens detail={node} />
            </CollapseItem>
            <CollapseItem label="Containers" key="containers">
              <Containers detail={node} match={match} />
            </CollapseItem>
            <CollapseItem label="Kubernetes labels" key="labels">
              <Tables detail={node} />
            </CollapseItem>
          </Collapse>
        </div>
      </div>
    )
  }
}
