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
import { observer, inject } from 'mobx-react'
import { Icon, Loading } from '@kube-design/components'
import { Panel } from 'components/Base'
import VolumeSnapshot from 'stores/volumeSnapshot'

import { isEmpty } from 'lodash'
import styles from './index.scss'

@inject('detailStore')
@observer
export default class VolumeSnapshotContentStatus extends Component {
  store = new VolumeSnapshot()

  componentDidMount() {
    const {
      volumeSnapshot,
      namespace,
      status,
      cluster,
    } = this.props.detailStore.detail
    if (status !== 'ready') {
      this.store.isLoading = false
    } else {
      this.store.fetchDetail({ cluster, name: volumeSnapshot, namespace })
    }
  }

  renderItem = () => {
    const { detail } = this.store

    return (
      <div>
        <div className={styles.ItemBox}>
          <div className={styles.leftBox}>
            <Icon name="snapshot" size="40"></Icon>
            <div className={styles.rightBox}>
              <span className={styles.title}>{detail.name}</span>
              <span className={styles.des}>{t('NAME')}</span>
            </div>
          </div>
          <div className={styles.titleBox}>
            <span className={styles.title}>{detail.snapshotClassName}</span>
            <span className={styles.des}>{t('VOLUME_SNAPSHOT_CLASS')}</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { detail, isLoading } = this.store
    return (
      <Panel title={t('VOLUME_SNAPSHOT_PL')}>
        {!isEmpty(detail) && (
          <Loading spinning={isLoading}>{this.renderItem()}</Loading>
        )}
      </Panel>
    )
  }
}
