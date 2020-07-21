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
import classNames from 'classnames'

import { get } from 'lodash'

import { QUOTAS_MAP } from 'utils/constants'
import { Button, Panel } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { trigger } from 'utils/action'
import QuotaStore from 'stores/quota'

import QuotaItem from './QuotaItem'

import styles from './index.scss'

const RESERVED_KEYS = ['limits.cpu', 'limits.memory', 'pods']

@inject('rootStore')
@observer
@trigger
export default class ResourceQuota extends React.Component {
  store = new QuotaStore()

  state = {
    isFold: true,
  }

  componentDidMount() {
    this.fetchData()
  }

  showEdit = () => {
    const { namespace, cluster } = this.props
    this.trigger('project.quota.edit', {
      detail: { name: namespace, namespace, cluster: cluster.name },
      success: this.fetchData,
      isFederated: true,
    })
  }

  toggleFold = () => {
    this.setState(({ isFold }) => ({
      isFold: !isFold,
    }))
  }

  get items() {
    const detail = this.store.data
    return Object.entries(QUOTAS_MAP)
      .map(([key, value]) => ({
        key,
        name: key,
        total: get(detail, `hard["${value.name}"]`),
        used: get(detail, `used["${value.name}"]`, 0),
        left: get(detail, `left["${value.name}"]`),
      }))
      .filter(({ total, used, name }) => {
        if (!total && !Number(used) && RESERVED_KEYS.indexOf(name) === -1) {
          return false
        }

        return true
      })
  }

  fetchData = () => {
    const { namespace, cluster } = this.props
    this.store.fetch({ namespace, cluster: cluster.name })
  }

  render() {
    const { isFold } = this.state
    const { cluster } = this.props

    const items = this.items

    return (
      <Panel>
        <div className={styles.cluster}>
          <ClusterTitle cluster={cluster} theme="light" />
        </div>
        <div className={styles.actions}>
          <Button onClick={this.showEdit}>{t('Edit Quota')}</Button>
        </div>
        <div className={classNames(styles.content, { [styles.fold]: isFold })}>
          {items.map(props => (
            <QuotaItem {...props} />
          ))}
        </div>
        {items.length > 3 && (
          <div className={styles.folder}>
            <Button
              icon={isFold ? 'chevron-down' : 'chevron-up'}
              onClick={this.toggleFold}
            >
              {isFold ? t('Unfold') : t('Fold')}
            </Button>
          </div>
        )}
      </Panel>
    )
  }
}
