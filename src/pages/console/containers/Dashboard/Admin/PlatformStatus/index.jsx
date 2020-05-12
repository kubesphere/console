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

import React, { Component } from 'react'
import { Text } from 'components/Base'
import { getLocalTime } from 'utils'

import Resource from './Resource'

import styles from './index.scss'

export default class PlatformStatus extends Component {
  get resources() {
    return [
      {
        icon: 'enterprise',
        name: 'Workspaces',
      },
      {
        icon: 'human',
        name: 'Accounts',
      },
      {
        icon: 'appcenter',
        name: 'App Templates',
      },
    ]
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Text
            icon="blockchain"
            title={getLocalTime(Date.now()).format('YYYY-MM-DD HH:mm:ss')}
            description={t('Statistical time is up to')}
          />
        </div>
        {this.resources.map(resource => (
          <Resource key={resource.name} data={resource} />
        ))}
      </div>
    )
  }
}
