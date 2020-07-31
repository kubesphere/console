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
import { Form, ScrollLoad } from 'components/Base'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { AccessModes } from 'components/Inputs'
import classNames from 'classnames'
import { Icon, Loading } from '@pitrix/lego-ui'
import PropTypes from 'prop-types'

import SnapshotStore from 'stores/volumeSnapshot'

import StorageClassStore from 'stores/storageClass'

import { safeParseJSON } from 'utils'
import { ACCESS_MODES } from 'utils/constants'

import styles from './index.scss'

const ACCESSMODE_KEY = 'spec.accessModes[0]'

@observer
export default class SanpshotForm extends Component {
  snapshotStore = new SnapshotStore()

  storageClassStore = new StorageClassStore()

  static contextTypes = {
    formData: PropTypes.object,
  }

  componentDidMount() {
    if (this.storageClassName) {
      this.fetchStorageClassDetail()
    }
  }

  get storageClassName() {
    return get(this.context.formData, 'storageClassName')
  }

  get supportedAccessModes() {
    return safeParseJSON(
      get(
        this.storageClassStore.detail,
        'annotations["storageclass.kubesphere.io/supported-access-modes"]',
        ''
      )
    )
  }

  fetchSnapshots = (params = { limit: 10 }) => {
    const { namespace, cluster } = this.props
    this.snapshotStore.fetchList({
      ...params,
      namespace,
      cluster,
      status: 'ready',
    })
  }

  fetchStorageClassDetail = () => {
    if (
      this.storageClassName &&
      this.storageClassName !== this.storageClassStore.detail.name
    ) {
      this.storageClassStore.fetchDetail({
        cluster: this.props.cluster,
        name: this.storageClassName,
      })
    }
  }

  handeSnapshotChange = name => {
    const { data } = this.snapshotStore.list
    const selectSnapshot =
      toJS(data).find(snapshot => snapshot.name === name) || {}
    set(
      this.context.formData,
      'spec.resources.requests.storage',
      selectSnapshot.restoreSize
    )
    set(
      this.context.formData,
      'storageClassName',
      selectSnapshot.snapshotClassName
    )
    set(this.context.formData, 'dataSource.kind', 'VolumeSnapshot')
    set(this.context.formData, 'dataSource.apiGroup', 'snapshot.storage.k8s.io')

    this.fetchStorageClassDetail()
  }

  render() {
    const { data: snapshots, total, page, isLoading } = this.snapshotStore.list
    const { isLoading: isStorageClassLoading } = this.storageClassStore
    const supportedAccessModes = this.supportedAccessModes

    return (
      <>
        <Form.Item
          label={t('Volume Snapshot')}
          rules={[{ required: true, message: t('This param is required') }]}
          controlClassName={styles.snapshotContainer}
        >
          <SnapshotSelect
            className={styles.snapshots}
            name={'dataSource.name'}
            snapshots={toJS(snapshots)}
            total={total}
            page={page}
            loading={isLoading}
            onChange={this.handeSnapshotChange}
            onFetch={this.fetchSnapshots}
          />
        </Form.Item>
        {this.storageClassName && (
          <Loading spinning={isStorageClassLoading}>
            <Form.Item
              className="margin-t12"
              label={t('Access Mode')}
              rules={[{ required: true, message: t('This param is required') }]}
            >
              <AccessModes
                name={ACCESSMODE_KEY}
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
            <p>{t('Capacity')}</p>
          </div>
          <div>
            <h3>{snapshot.createTime}</h3>
            <p>{t('Created Time')}</p>
          </div>
        </div>
      ))}
    </ScrollLoad>
  )
}
