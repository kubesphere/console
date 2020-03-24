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

import Banner from 'components/Cards/Banner'

@inject('rootStore')
@observer
export default class WorkloadBanner extends React.Component {
  get routing() {
    return this.props.rootStore.routing
  }

  handleTabChange = value => {
    const { namespace } = this.props
    this.routing.push(`/projects/${namespace}/${value}`)
  }

  get tabs() {
    return {
      value: this.props.module,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'deployments',
          label: t('Deployments'),
          count: this.props.deploymentsCount,
        },
        {
          value: 'statefulsets',
          label: t('StatefulSets'),
          count: this.props.statefulsetsCount,
        },
        {
          value: 'daemonsets',
          label: t('DaemonSets'),
          count: this.props.daemonsetsCount,
        },
      ],
    }
  }

  render() {
    return (
      <Banner
        className="margin-b12"
        title={t('Workloads')}
        description={t('WORKLOAD_DESC')}
        module={this.props.module}
        tabs={this.tabs}
      />
    )
  }
}
