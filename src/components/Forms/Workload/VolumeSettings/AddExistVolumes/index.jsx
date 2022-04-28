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

import { keyBy, isEmpty } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Form, Tag } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { MountInput } from 'components/Inputs'
import { getDisplayName } from 'utils'

import styles from './index.scss'

export default class AddExistVolumes extends React.Component {
  static propTypes = {
    formRef: PropTypes.object,
    formData: PropTypes.object,
    className: PropTypes.string,
    containers: PropTypes.array,
    volumes: PropTypes.array,
  }

  static defaultProps = {
    className: '',
    volumes: [],
    formData: {},
    containers: [],
  }

  get volumes() {
    return this.props.volumes.map(volume => ({
      uid: volume.name,
      icon: 'storage',
      label: (
        <span>
          {getDisplayName(volume)}{' '}
          <Tag>{volume.inUse ? t('IN_USER') : t('AVAILABLE')}</Tag>
        </span>
      ),
      description: volume.storageClassName,
      value: volume,
      details: [
        { label: volume.capacity, description: t('CAPACITY') },
        { label: volume.accessMode, description: t('ACCESS_MODE_SCAP') },
      ],
    }))
  }

  getMountPaths(item) {
    if (!this.mountPaths) {
      this.mountPaths = keyBy(this.props.containers, 'name')
    }

    if (
      isEmpty(this.mountPaths[item.containerName]) ||
      isEmpty(this.mountPaths[item.containerName].volumeMounts)
    ) {
      return []
    }

    return this.mountPaths[item.containerName].volumeMounts
      .filter(mount => mount.name !== item.name)
      .map(mount => mount.mountPath)
  }

  mountValidator = (rule, value, callback) => {
    if (isEmpty(value)) {
      return callback()
    }

    value.forEach(item => {
      if (!item) {
        return callback()
      }

      if (item.readOnly === 'null') {
        callback()
      } else if (item.mountPath) {
        if (this.getMountPaths(item).includes(item.mountPath)) {
          return callback({
            message: t('MOUNT_PATH_IN_USE'),
            field: rule.field,
          })
        }
        callback()
      } else {
        callback({
          message: t('READ_WRITE_MOUNT_EMPTY'),
          field: rule.field,
        })
      }
    })
  }

  render() {
    const {
      containers,
      formRef,
      formData,
      className,
      collectSavedLog,
    } = this.props

    const placeholder = {
      icon: 'storage',
      label: t('SELECT_PERSISITENT_VOLUME_CLAIM'),
      description: t('SELECT_PERSISITENT_VOLUME_CLAIM_DESC'),
    }

    return (
      <div className={classNames(styles.wrapper, className)}>
        <Form data={formData} ref={formRef}>
          <Form.Item rules={[{ required: true, message: t('PVC_NOT_SELECT') }]}>
            <TypeSelect
              name="volume"
              options={this.volumes}
              placeholder={placeholder}
            />
          </Form.Item>
          <Form.Item rules={[{ validator: this.mountValidator }]}>
            <MountInput
              name="volumeMounts"
              containers={containers}
              collectSavedLog={collectSavedLog}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
