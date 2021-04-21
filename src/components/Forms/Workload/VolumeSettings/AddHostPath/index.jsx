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
            message: t('Mount path is already in use'),
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
      callback({ message: t('The volume name exists'), field: rule.field })
    } else {
      callback()
    }
  }

  render() {
    const { containers, formData, formRef, collectSavedLog } = this.props

    return (
      <div className={styles.wrapper}>
        <Alert
          className="margin-b12"
          type="warning"
          message={t('HOST_PATH_WARNING')}
        />
        <Form data={formData} ref={formRef}>
          <Form.Item
            label={t('Volume Name')}
            desc={t('NAME_DESC')}
            rules={[
              { required: true, message: t('Please input volume name') },
              {
                pattern: PATTERN_NAME,
                message: t('Invalid name', { message: t('NAME_DESC') }),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="name" autoFocus={true} maxLength={63} />
          </Form.Item>
          <Form.Item label={t('HostPath')}>
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
