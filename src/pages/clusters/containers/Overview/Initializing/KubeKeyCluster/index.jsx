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
import { reaction, toJS } from 'mobx'
import { observer } from 'mobx-react'

import WebsocketStore from 'stores/websocket'

import Progress from './Progress'
import Logs from './Logs'

@observer
export default class KubeKeyCluster extends Component {
  store = this.props.store

  websocket = new WebsocketStore()

  componentDidMount() {
    this.initWebsocket()
  }

  componentWillUnmount() {
    this.websocket.close()
    this.disposer && this.disposer()
  }

  initWebsocket = () => {
    const { name } = this.props

    if (!name) {
      return
    }

    const url = this.store.getWatchUrl({ name })
    if (url) {
      this.websocket.watch(url)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.type === 'MODIFIED' || message.type === 'ADDED') {
            this.store.detail = this.store.mapper(toJS(message.object))
          }
        }
      )
    }
  }

  render() {
    const detail = this.store.detail
    return (
      <div className="padding-12">
        <Progress detail={detail} />
        <Logs detail={detail} />
      </div>
    )
  }
}
