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

import { Loading } from '@kube-design/components'
import { get } from 'lodash'
import { inject, observer, Provider } from 'mobx-react'
import React, { Component } from 'react'
import { getPipelinesStore } from 'stores/devops/getPipelines'

import { renderRoutes } from 'utils/router.config'
import routes from './routes'

@inject('rootStore', 'devopsStore')
@observer
export default class PipelinesLayout extends Component {
  constructor(props) {
    super(props)

    this.store = new (getPipelinesStore(this.ksVersion))()
    this.init(props.match.params)
  }

  get ksVersion() {
    const { cluster } = this.props.match.params
    return globals.app.isMultiCluster
      ? get(globals, `clusterConfig.${cluster}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')
  }

  async init(params) {
    this.store.initializing = true

    await Promise.all([
      this.props.devopsStore.fetchDetail(params),
      this.store.fetchDetail(params),
      this.props.rootStore.getRules({
        workspace: params.workspace,
      }),
    ])

    await this.props.rootStore.getRules({
      cluster: params.cluster,
      workspace: params.workspace,
      devops: params.devops,
    })

    this.store.initializing = false
  }

  render() {
    const { initializing } = this.store

    if (initializing) {
      return <Loading className="ks-page-loading" />
    }
    return (
      <Provider pipelineStore={this.store}>{renderRoutes(routes)}</Provider>
    )
  }
}
