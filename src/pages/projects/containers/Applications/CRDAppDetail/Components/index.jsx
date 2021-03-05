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
import { observer, inject } from 'mobx-react'
import Services from 'projects/components/Cards/Services'
import Workloads from 'projects/components/Cards/Workloads'
import Ingresses from 'projects/components/Cards/Ingresses'
import Volumes from 'projects/components/Cards/Volumes'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class ResourceStatus extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module
  }

  get prefix() {
    const { workspace, cluster, namespace } = this.props.match.params
    return `/${workspace}/clusters/${cluster}/projects/${namespace}`
  }

  render() {
    const { cluster, namespace, selector } = this.store.detail

    return (
      <div className={styles.main}>
        <Ingresses
          selector={selector}
          cluster={cluster}
          namespace={namespace}
          prefix={this.prefix}
        />
        <Services
          selector={selector}
          cluster={cluster}
          namespace={namespace}
          prefix={this.prefix}
        />
        <Workloads
          selector={selector}
          cluster={cluster}
          namespace={namespace}
          prefix={this.prefix}
        />
        <Volumes
          selector={selector}
          cluster={cluster}
          namespace={namespace}
          prefix={this.prefix}
        />
      </div>
    )
  }
}
