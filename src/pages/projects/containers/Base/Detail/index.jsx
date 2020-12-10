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

import { reaction, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Component as Base } from 'core/containers/Base/Detail'
import { MODULE_KIND_MAP } from 'utils/constants'

@withRouter
@inject('rootStore')
@observer
export default class DetailPage extends Base {
  componentDidMount() {
    this.props.watch && this.initWebsocket()
  }

  componentWillUnmount() {
    this.disposer && this.disposer()
  }

  get inCluster() {
    return this.props.match.path.startsWith('/clusters')
  }

  get websocket() {
    return this.props.rootStore.websocket
  }

  get enabledActions() {
    const { workspace, cluster, namespace } = this.props.match.params
    return globals.app.getActions({
      module: this.authKey,
      ...(this.inCluster
        ? { cluster }
        : { cluster, workspace, project: namespace }),
    })
  }

  initWebsocket() {
    const { detailStore } = this.props.stores
    if (detailStore && 'getWatchUrl' in detailStore) {
      const url = detailStore.getWatchUrl(this.props.match.params)

      this.websocket.watch(url)

      const kind = MODULE_KIND_MAP[this.props.module]

      const mapper = detailStore.mapper

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.object.kind === kind && message.type === 'MODIFIED') {
            Object.assign(detailStore.detail, {
              ...this.props.match.params,
              ...mapper(toJS(message.object)),
            })
          }
        }
      )
    }
  }
}
