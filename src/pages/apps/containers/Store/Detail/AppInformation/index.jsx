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
import { toJS } from 'mobx'
import { get } from 'lodash'

import { Card } from 'components/Base'
import AppInfo from 'appStore/components/AppInfo'

import styles from './index.scss'

@inject('detailStore', 'versionStore')
@observer
export default class AppInformation extends React.Component {
  componentDidMount() {
    const appId = get(this.props.match, 'params.appId', '')
    const versions = get(this.props.versionStore, 'list.data', [])

    if (versions.length === 0) {
      this.props.versionStore.fetchList({
        app_id: appId,
        order: 'create_time',
      })
    }
  }

  render() {
    const app = get(this.props.detailStore, 'detail', {})
    const versions = get(this.props.versionStore, 'list.data', [])

    return (
      <div>
        <h3 className={styles.title}>{t('App Information')}</h3>
        <Card>
          <AppInfo
            className={styles.appInfo}
            app={app}
            versions={toJS(versions)}
          />
        </Card>
      </div>
    )
  }
}
