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
import InternetAccess from './InternetAccess'
import LogCollection from './LogCollection'

@inject('rootStore', 'projectStore')
@observer
class AdvancedSettings extends React.Component {
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
      project: this.namespace,
      cluster: this.cluster,
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
        title: t('WHAT_IS_INTERNET_GATEWAY'),
        description: t('PROJECT_INTERNET_ACCESS_DESC'),
      },
      {
        title: t('What is collecting file log ?'),
        description: t('WHAT_IS_COLLECT_FILE_LOG_A'),
      },
    ]
  }

  render() {
    const { clusters, name } = this.store.detail
    return (
      <div>
        <Banner
          icon="cogwheel"
          title={t('Advanced Settings')}
          description={t('PROJECT_ADVANCED_SETTINGS_DESC')}
          tips={this.tips}
        />
        <InternetAccess
          match={this.props.match}
          actions={this.enableActions}
          clusters={clusters}
        />
        {!this.disabledLoggingSideCar && (
          <LogCollection namespace={name} actions={this.enableActions} />
        )}
      </div>
    )
  }
}

export default AdvancedSettings
