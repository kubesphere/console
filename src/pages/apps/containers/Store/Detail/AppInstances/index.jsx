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
import { get } from 'lodash'
import { inject } from 'mobx-react'

import InstanceList from 'apps/components/Lists/InstanceList'

@inject('detailStore', 'versionStore')
export default class AppInstances extends React.Component {
  render() {
    return (
      <InstanceList
        appStore={this.props.detailStore}
        versionStore={this.props.versionStore}
        appId={get(this.props.detailStore, 'detail.app_id', '')}
        title={t('App Instances')}
        empty={t('No app instances data')}
        hideFooter
      />
    )
  }
}
