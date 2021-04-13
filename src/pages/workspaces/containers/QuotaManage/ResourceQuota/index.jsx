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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { get } from 'lodash'
import { Button } from '@kube-design/components'
import { compareVersion } from 'utils'
import { WORKSPACE_QUOTAS_MAP } from 'utils/constants'
import { Panel } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { trigger } from 'utils/action'
import QuotaStore from 'stores/workspace.quota'

import QuotaItem from './QuotaItem'

import styles from './index.scss'

const RESERVED_KEYS = ['limits.cpu', 'limits.memory']

@inject('rootStore')
@observer
@trigger
export default class ResourceQuota extends React.Component {
  store = new QuotaStore()

  componentDidMount() {
    this.fetchData()
  }

  showEdit = () => {
    const { workspace, cluster } = this.props
    this.trigger('workspace.quota.edit', {
      detail: { name: workspace, workspace, cluster: cluster.name },
      success: this.fetchData,
      isFederated: true,
    })
  }

  get requiredVersion() {
    return 'v3.1.0'
  }

  get needUpgrade() {
    return (
      compareVersion(
        globals.app.isMultiCluster
          ? this.props.cluster.configz.ksVersion
          : get(globals, 'ksConfig.ksVersion'),
        this.requiredVersion
      ) < 0
    )
  }

  get items() {
    const detail = toJS(this.store.detail)
    return Object.entries(WORKSPACE_QUOTAS_MAP)
      .map(([key, value]) => ({
        key,
        name: key,
        total: get(detail, `spec.quota.hard["${value.name}"]`),
        used: get(detail, `status.total.used["${value.name}"]`, 0),
      }))
      .filter(({ total, used, name }) => {
        if (!total && !Number(used) && RESERVED_KEYS.indexOf(name) === -1) {
          return false
        }

        return true
      })
  }

  fetchData = () => {
    const { workspace, cluster, needUpgrade } = this.props
    if (needUpgrade) {
      return
    }

    this.store.fetchDetail({
      workspace,
      name: workspace,
      cluster: cluster.name,
    })
  }

  render() {
    const { cluster, canEdit } = this.props

    if (this.needUpgrade) {
      return (
        <Panel>
          <div className={styles.cluster}>
            <ClusterTitle
              cluster={cluster}
              theme="light"
              noStatus={!globals.app.isMultiCluster}
            />
          </div>
          <div className={styles.disabledTip}>
            {t('CLUSTER_UPGRADE_REQUIRED', { version: this.requiredVersion })}
          </div>
        </Panel>
      )
    }

    const items = this.items

    return (
      <Panel>
        <div className={styles.cluster}>
          <ClusterTitle
            cluster={cluster}
            theme="light"
            noStatus={!globals.app.isMultiCluster}
          />
        </div>
        {canEdit && (
          <div className={styles.actions}>
            <Button onClick={this.showEdit}>{t('Edit Quota')}</Button>
          </div>
        )}
        <div className={styles.content}>
          {items.map(props => (
            <QuotaItem {...props} />
          ))}
        </div>
      </Panel>
    )
  }
}
