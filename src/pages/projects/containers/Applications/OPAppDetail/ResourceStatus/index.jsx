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

import { isEmpty, flatten } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import Workloads from 'projects/components/Cards/Workloads'
import Services from 'projects/components/Cards/Services'
import Ingresses from '../../CRDAppDetail/Ingresses'

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
    const { detail, isLoading } = toJS(this.store)

    let workloads = []
    if (!isEmpty(detail.workloads)) {
      workloads = flatten(
        Object.keys(detail.workloads).map(key =>
          detail.workloads[key].map(item => ({
            ...item,
            type: key,
          }))
        )
      )
    }

    return (
      <div className={styles.main}>
        {!isEmpty(detail.ingresses) && (
          <Ingresses
            data={detail.ingresses}
            loading={isLoading}
            prefix={`${this.prefix}/ingresses`}
          />
        )}
        {!isEmpty(detail.services) && (
          <Services
            className="margin-t12"
            data={detail.services}
            loading={isLoading}
            prefix={`${this.prefix}/services`}
          />
        )}
        <Workloads
          className="margin-t12"
          data={workloads}
          loading={isLoading}
          prefix={this.prefix}
        />
      </div>
    )
  }
}
