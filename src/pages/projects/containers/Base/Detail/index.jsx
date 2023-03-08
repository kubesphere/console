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

import { set } from 'lodash'
import { reaction, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Component as Base } from 'core/containers/Base/Detail'
import { MODULE_KIND_MAP } from 'utils/constants'

import ClusterStore from 'stores/cluster'
import WorkspaceStore from 'stores/workspace'
import ProjectStore from 'stores/project'

@withRouter
@inject('rootStore')
@observer
export default class DetailPage extends Base {
  constructor(props) {
    super(props)

    this.clusterStore = new ClusterStore()
    this.workspaceStore = new WorkspaceStore()
    this.projectStore = new ProjectStore()
  }

  // state = {
  //   fetchFin: false,
  // }

  componentDidMount() {
    this.props.watch && this.initWebsocket()
    this.setGlobals()
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

  async setGlobals() {
    const storeArray = [
      { store: this.clusterStore, arrayName: 'clusterArray' },
      {
        store: this.workspaceStore,
        arrayName: 'workspaceArray',
      },
      {
        store: this.projectStore,
        arrayName: 'projectArray',
        searchKey: ['cluster', 'workspace'],
      },
    ]

    const param = {}
    storeArray.map(async item => {
      if (item.searchKey) {
        item.searchKey.forEach(para => {
          param[para] = this.props.match.params[para]
        })
      }
      await item.store.fetchList({ limit: Infinity, ...param })
      set(globals, item.arrayName, toJS(item.store.list.data))
    })

    this.setState({
      fetchFin: true,
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
