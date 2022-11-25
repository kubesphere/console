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
import { get, set } from 'lodash'
import { ScrollLoad } from 'components/Base'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { AccessModes } from 'components/Inputs'
import classNames from 'classnames'
import { Form, Icon, Loading } from '@kube-design/components'
import PropTypes from 'prop-types'

import SnapshotStore from 'stores/volumeSnapshot'

import SnapshotClassStore from 'stores/volumeSnapshotClasses'
import VolumeStore from 'stores/volume'

import { safeParseJSON } from 'utils'
import { ACCESS_MODES } from 'utils/constants'

import styles from './index.scss'

@observer
export default class SanpshotForm extends Component {
  snapshotStore = new SnapshotStore()

  snapshotClassStore = new SnapshotClassStore()

  volumeStore = new VolumeStore()

  static contextTypes = {
    formData: PropTypes.object,
  }

  componentDidMount() {
    if (this.storageClassName) {
      this.fetchStorageClassDetail()
    }
  }

  get storageClassName() {
    return get(this.context.formData, 'spec.storageClassName')
  }

  get supportedAccessModes() {
    return safeParseJSON(
      get(
        this.snapshotClassStore.detail,
        'annotations["storageclass.kubesphere.io/supported-access-modes"]',
        ''
      )
    )
  }

  fetchSnapshots = (params = { limit: 10 }) => {
    const { namespace, cluster } = this.props
    this.snapshotStore
      .fetchList({
        ...params,
        namespace,
        cluster,
        status: 'ready',
      })
      .then(() => {
        const { data } = this.snapshotStore.list
        const name = get(data, '[0].name')
        if (name) {
          set(this.context.formData, 'spec.dataSource.name', name)
          this.handeSnapshotChange(name)
        }
      })
  }

  fetchStorageClassDetail = () => {
    if (
      this.storageClassName &&
      this.storageClassName !== this.snapshotClassStore.detail.name
    ) {
      this.snapshotClassStore.fetchDetail({
        cluster: this.props.cluster,
        name: this.storageClassName,
      })
    }
  }

  getSnapshotSourceVolumeInfo = name => {
    const { namespace, cluster } = this.props
    return this.volumeStore.fetchDetail({ name, namespace, cluster })
  }

  handeSnapshotChange = async name => {
    const { data } = this.snapshotStore.list
    const selectSnapshot =
      toJS(data).find(snapshot => snapshot.name === name) || {}
    await this.getSnapshotSourceVolumeInfo(selectSnapshot.snapshotSourceName)
    set(
      this.context.formData,
      'spec.resources.requests.storage',
      selectSnapshot.restoreSize
    )
    set(
      this.context.formData,
      'spec.storageClassName',
      this.volumeStore.detail.storageClassName
    )
    set(this.context.formData, 'spec.dataSource.kind', 'VolumeSnapshot')
    set(
      this.context.formData,
      'spec.dataSource.apiGroup',
      'snapshot.storage.k8s.io'
    )

    this.fetchStorageClassDetail()
  }

  render() {
    const { data: snapshots, total, page, isLoading } = this.snapshotStore.list
    const { isLoading: isSnapshotClassLoading } = this.snapshotClassStore
    const supportedAccessModes = this.supportedAccessModes

    return (
      <>
        <Form.Item
          label={t('VOLUME_SNAPSHOT')}
          rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
          className={styles.snapshotContainer}
        >
          <SnapshotSelect
            className={styles.snapshots}
            name="spec.dataSource.name"
            snapshots={toJS(snapshots)}
            total={total}
            page={page}
            loading={isLoading}
            onChange={this.handeSnapshotChange}
            onFetch={this.fetchSnapshots}
          />
        </Form.Item>
        {this.storageClassName && (
          <Loading spinning={isSnapshotClassLoading}>
            <Form.Item
              className="margin-t12"
              label={t('ACCESS_MODE')}
              rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
            >
              <AccessModes
                name="spec.accessModes[0]"
                defaultValue={
                  get(supportedAccessModes, '[0]') ||
                  Object.keys(ACCESS_MODES)[0]
                }
                supportedAccessModes={supportedAccessModes}
              />
            </Form.Item>
          </Loading>
        )}
      </>
    )
  }
}

function SnapshotSelect({
  onChange,
  snapshots,
  total,
  page,
  loading,
  onFetch,
  value,
  className,
}) {
  return (
    <ScrollLoad
      className={className}
      data={snapshots}
      total={total}
      page={page}
      loading={loading}
      onFetch={onFetch}
    >
      {snapshots.map(snapshot => (
        <div
          className={classNames(
            {
              [styles.selected]: snapshot.name === value,
            },
            styles.snapshot
          )}
          key={snapshot.uid}
          onClick={() => onChange(snapshot.name)}
        >
          <Icon
            name={'snapshot'}
            type={snapshot.name === value ? 'light' : 'dark'}
            size={40}
          />
          <div>
            <h3>{snapshot.name}</h3>
            <p>{snapshot.snapshotClassName}</p>
          </div>
          <div>
            <h3>{snapshot.restoreSize || 0}</h3>
            <p>{t('CAPACITY')}</p>
          </div>
          <div>
            <h3>{snapshot.createTime}</h3>
            <p>{t('CREATION_TIME_TCAP')}</p>
          </div>
        </div>
      ))}
    </ScrollLoad>
  )
}
