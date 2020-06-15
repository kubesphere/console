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
import EmptyList from 'components/Cards/EmptyList'
import withTableActions from 'components/HOCs/withTableActions'

import ClusterSelect from './ClusterSelect'

class ResourceTable extends BaseTable {
  renderNormalTitle() {
    const { hideCustom, clusters, cluster, onClusterChange } = this.props

    return (
      <Level>
        {globals.app.isMultiCluster && (
          <LevelLeft>
            <LevelItem>
              <ClusterSelect
                clusters={clusters}
                cluster={cluster}
                onChange={onClusterChange}
              />
            </LevelItem>
          </LevelLeft>
        )}
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

  render() {
    const { clusters } = this.props
    if (isEmpty(clusters)) {
      return (
        <EmptyList
          icon="cluster"
          title={t('No Available Cluster')}
          desc={t('NO_CLUSTER_TIP')}
        />
      )
    }

    return BaseTable.prototype.render.call(this)
  }
}

export default withTableActions(ResourceTable)
