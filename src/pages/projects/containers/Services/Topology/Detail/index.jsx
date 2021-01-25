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
import { Icon } from '@kube-design/components'

import BaseInfo from './BaseInfo'
import Connections from './Connections'
import Childrens from './Childrens'
import Tables from './Tables'

import styles from './index.scss'

@observer
export default class ServiceDetail extends Component {
  static defaultProps = {
    data: {},
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

  render() {
    const { onClose } = this.props
    const { node = {} } = toJS(this.props.store.detail)

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.title}>{node.label}</div>
          <Icon
            className={styles.close}
            name="close"
            type="light"
            size={20}
            clickable
            onClick={onClose}
          />
        </div>
        <div className={styles.content}>
          <BaseInfo detail={node} />
          <Connections detail={node} jumpTo={this.handleJump} />
          <Childrens detail={node} />
          <Tables detail={node} />
        </div>
      </div>
    )
  }
}
