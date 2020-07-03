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
import { isEmpty } from 'lodash'

import {
  Dropdown,
  Buttons,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
} from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import BaseTable from 'components/Tables/Base'
import withTableActions from 'components/HOCs/withTableActions'
import ProjectSelect from './ProjectSelect'

class ResourceTable extends BaseTable {
  routing = this.props.rootStore.routing

  get showEmpty() {
    const { data, isLoading, filters, clusterStore } = this.props
    return (
      isEmpty(data) && !isLoading && isEmpty(filters) && !clusterStore.project
    )
  }

  fetchProjects = (params = {}) => {
    const { cluster } = this.props
    return this.props.clusterStore.fetchProjects({
      cluster,
      ...params,
    })
  }

  handleClusterChange = project => {
    this.props.clusterStore.setProject(project)
    this.props.onFetch({}, true)
  }

  renderNormalTitle() {
    const { hideCustom, module, cluster, clusterStore } = this.props
    return (
      <Level>
        <LevelLeft>
          <LevelItem>
            <ProjectSelect
              module={module}
              cluster={cluster}
              list={clusterStore.projects}
              namespace={clusterStore.project}
              onFetch={this.fetchProjects}
              onChange={this.handleClusterChange}
            />
          </LevelItem>
        </LevelLeft>
        <LevelItem>{this.renderSearch()}</LevelItem>
        <LevelRight>
          <Buttons>
            <Button
              type="flat"
              icon="refresh"
              onClick={this.handleRefresh}
              data-test="table-refresh"
            />
            {!hideCustom && (
              <Dropdown
                content={this.renderColumnsMenu()}
                placement="bottomRight"
              >
                <Button type="flat" icon="cogwheel" data-test="table-columns" />
              </Dropdown>
            )}
            {this.renderActions()}
          </Buttons>
        </LevelRight>
      </Level>
    )
  }
}

export default inject('rootStore', 'clusterStore')(
  observer(withTableActions(ResourceTable))
)
