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

import Banner from 'components/Cards/Banner'
import LogCollectionDetail from './LogCollection'

@inject('rootStore', 'projectStore')
@observer
class LogCollection extends React.Component {
  get store() {
    return this.props.projectStore
  }

  get namespace() {
    return this.props.match.params.namespace
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get enableActions() {
    return globals.app.getActions({
      module: 'project-settings',
      ...this.props.match.params,
      project: this.namespace,
    })
  }

  get disabledLoggingSideCar() {
    if (isEmpty(globals.config.disabledLoggingSidecarNamespace)) {
      return false
    }

    return globals.config.disabledLoggingSidecarNamespace.includes(
      this.namespace
    )
  }

  get tips() {
    return [
      {
        title: t('COLLECT_LOGS_ON_VOLUMES_Q'),
        description: t('COLLECT_LOGS_ON_VOLUMES_A'),
      },
    ]
  }

  render() {
    return (
      <div>
        <Banner
          icon="log"
          title={t('LOG_COLLECTION')}
          description={t('DISK_LOG_COLLECTION_DESC')}
          tips={this.tips}
        />
        {globals.app.hasClusterModule(this.cluster, 'logging') &&
          !this.disabledLoggingSideCar && (
            <LogCollectionDetail
              store={this.store}
              actions={this.enableActions}
            />
          )}
      </div>
    )
  }
}

export default LogCollection
