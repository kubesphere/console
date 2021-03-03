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
import { get, isEmpty } from 'lodash'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Panel, Text } from 'components/Base'

import WorkspaceStore from 'stores/workspace'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class Workspaces extends React.Component {
  store = this.props.detailStore

  workspaceStore = new WorkspaceStore()

  componentDidMount() {
    this.fetchWorkspaces()
  }

  fetchWorkspaces = () => {
    const { detail } = this.store
    const workspaces = get(detail, 'status.workspaces', {})

    this.workspaceStore.fetchList({
      names: Object.keys(workspaces).join(','),
      limit: -1,
    })
  }

  @computed
  get workspaces() {
    return this.workspaceStore.list.data.reduce(
      (prev, cur) => ({
        ...prev,
        [cur.name]: cur,
      }),
      {}
    )
  }

  render() {
    const { detail } = this.store
    const workspacesStatus = get(detail, 'status.workspaces', {})
    const workspaces = this.workspaces

    return (
      <Panel title={t('Workspaces')}>
        <div className={styles.wrapper}>
          {isEmpty(workspacesStatus) && (
            <div className={styles.empty}>
              {t('IPPOOL_WORKSPACE_EMPTY_TIP')}
            </div>
          )}
          {Object.keys(workspacesStatus).map(item => {
            const workspace = workspaces[item] || {}
            return (
              <div key={item} className={styles.item}>
                <Text
                  icon="enterprise"
                  title={item}
                  description={workspace.description || t('Workspace')}
                />
                <Text
                  title={workspacesStatus[item].allocations}
                  description={t('Used IP')}
                />
                <Text title={workspace.manager} description={t('Manager')} />
              </div>
            )
          })}
        </div>
      </Panel>
    )
  }
}
