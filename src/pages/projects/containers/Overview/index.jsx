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
import { Columns, Column } from '@kube-design/components'
import { get } from 'lodash'

import BaseInfo from './BaseInfo'
import Applications from './Applications'
import ResourceUsage from './ResourceUsage'
import UsageRanking from './UsageRanking'
import Help from './Help'
import Quota from './Quota'
import LimitRange from './LimitRange'

@inject('rootStore', 'projectStore')
@observer
export default class Overview extends React.Component {
  get routing() {
    return this.props.rootStore.routing
  }

  get namespace() {
    return get(this.props.match, 'params.namespace')
  }

  get project() {
    return this.props.projectStore
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'project-settings',
      ...this.props.match.params,
      project: this.namespace,
    })
  }

  render() {
    const { detail } = this.project
    return (
      <div>
        <div className="h3 margin-b12">{t('Overview')}</div>
        <Columns>
          <Column className="is-8">
            <BaseInfo className="margin-b12" detail={detail} />
            {this.enabledActions.includes('edit') && (
              <>
                <Quota match={this.props.match} />
                <LimitRange match={this.props.match} />
              </>
            )}
            {globals.app.hasKSModule('openpitrix') && (
              <Applications className="margin-b12" match={this.props.match} />
            )}
            <ResourceUsage match={this.props.match} />
          </Column>
          <Column className="is-4">
            <Help className="margin-b12" />
            <UsageRanking match={this.props.match} />
          </Column>
        </Columns>
      </div>
    )
  }
}
