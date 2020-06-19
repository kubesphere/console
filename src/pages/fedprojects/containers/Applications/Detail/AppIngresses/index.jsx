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
import { inject, observer } from 'mobx-react'

import Ingresses from './Ingresses'

@inject('detailStore')
@observer
export default class AppIngresses extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
  }

  render() {
    const { workspace } = this.props.match.params
    const { clusters, resource, namespace } = this.store.detail

    return clusters.map(cluster => (
      <Ingresses
        key={cluster.name}
        cluster={cluster.name}
        namespace={namespace}
        workspace={workspace}
        detail={resource}
      />
    ))
  }
}
