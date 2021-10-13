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
import { trigger } from 'utils/action'
import Banner from 'components/Cards/Banner'

import Access from './Access'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class Getway extends React.Component {
  get store() {
    return this.props.projectStore
  }

  get clusters() {
    return this.store.detail.clusters
  }

  get namespace() {
    return this.props.match.params.namespace
  }

  get enableActions() {
    return globals.app.getActions({
      module: 'project-settings',
      project: this.namespace,
    })
  }

  render() {
    return (
      <>
        <Banner
          icon="loadbalancer"
          title={t('GATEWAY_SETTINGS')}
          description={t('PROJECT_GATEWAY_DESC')}
          tabs={this.tabs}
        />
        <div>
          {this.clusters.map(cluster => (
            <Access
              key={cluster.name}
              cluster={cluster}
              {...this.props}
              actions={this.enableActions}
            />
          ))}
        </div>
      </>
    )
  }
}
