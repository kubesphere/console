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
import { Form, Input } from '@kube-design/components'
import { PATTERN_NAME } from 'utils/constants'
import { MountInput } from 'components/Inputs'

import styles from './index.scss'

export default class AddTemporary extends React.Component {
  static propTypes = {
    formRef: PropTypes.object,
    formData: PropTypes.object,
    className: PropTypes.string,
    containers: PropTypes.array,
    checkVolumeNameExist: PropTypes.func,
  }

  static defaultProps = {
    className: '',
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

    return this.mountPaths[item.containerName].volumeMounts.filter(
      mount => mount.name !== item.name
    )
  }

  mountValidator = (rule, value, callback) => {
    if (isEmpty(value)) {
      return callback({
        message: t('Please select at least one container to mount'),
        field: rule.field,
      })
    }
    value.forEach(item => {
      if (!item) {
        return callback()
      }

      if (item.readOnly === 'null') {
        callback()
      } else if (item.mountPath) {
        const paths = this.getMountPaths(item)
        if (item.subPath) {
          if (
            paths.some(
              path =>
                path.mountPath === item.mountPath &&
                path.subPath === item.subPath
            )
          ) {
            return callback({
              message: t('Mount path is already in use'),
              field: rule.field,
            })
          }
        } else if (paths.some(path => path.mountPath === item.mountPath)) {
          return callback({
            message: t('Mount path is already in use'),
            field: rule.field,
          })
        }
        callback()
      } else {
        callback({
          message: t('Please specify the read and write mode and mount path'),
          field: rule.field,
        })
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
    const {
      containers,
      formData,
      formRef,
      className,
      collectSavedLog,
    } = this.props

    return (
      <div className={classNames(styles.wrapper, className)}>
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
          <Form.Item
            rules={[
              {
                required: t('Please input mount path'),
                validator: this.mountValidator,
              },
            ]}
          >
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
