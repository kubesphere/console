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
import PropTypes from 'prop-types'
import { Input, Form, Alert } from '@kube-design/components'
import { PATTERN_NAME } from 'utils/constants'
import { MountInput } from 'components/Inputs'

import styles from './index.scss'

export default class AddHostPath extends React.Component {
  static propTypes = {
    formRef: PropTypes.object,
    formData: PropTypes.object,
    containers: PropTypes.array,
    checkVolumeNameExist: PropTypes.func,
  }

  static defaultProps = {
    formData: {},
    containers: [],
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
        callback({ message: t(''), field: rule.field })
      }
    })
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { currentName, checkVolumeNameExist } = this.props

    if (checkVolumeNameExist(value) && currentName !== value) {
      callback({ message: t('VOLUME_NAME_EXIST'), field: rule.field })
    } else {
      callback()
    }
  }

  render() {
    const { containers, formData, formRef, collectSavedLog } = this.props

    return (
      <div className={styles.wrapper}>
        <Alert className="margin-b12" type="info" message={t('HOSTPATH_TIP')} />
        <Form data={formData} ref={formRef}>
          <Form.Item
            label={t('VOLUME_NAME')}
            desc={t('NAME_DESC')}
            rules={[
              { required: true, message: t('VOLUME_NAME_EMPTY') },
              {
                pattern: PATTERN_NAME,
                message: t('INVALID_NAME_DESC'),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="name" autoFocus={true} maxLength={63} />
          </Form.Item>
          <Form.Item
            label={t('HOST_PATH')}
            rules={[{ required: true, message: t('HOST_PATH_EMPTY') }]}
          >
            <Input name="hostPath.path" />
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
