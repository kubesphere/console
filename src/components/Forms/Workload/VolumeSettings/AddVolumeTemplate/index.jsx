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
import classNames from 'classnames'

import { observer } from 'mobx-react'
import { Form, Input } from '@kube-design/components'
import { MountInput } from 'components/Inputs'

import { PATTERN_NAME } from 'utils/constants'
import { ReactComponent as BackIcon } from 'assets/back.svg'

import VolumeFormTemplate from 'components/Forms/Volume/VolumeSettings/FormTemplate'

import VolumeStore from 'stores/volume'

import styles from './index.scss'

@observer
export default class AddVolume extends React.Component {
  static propTypes = {
    containers: PropTypes.array,
    volume: PropTypes.object,
    cluster: PropTypes.string,
    namespace: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    checkVolumeNameExist: PropTypes.func,
  }

  static defaultProps = {
    volume: {},
    containers: [],
    cluster: '',
    namespace: '',
    onSave() {},
    onCancel() {},
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    this.volumeStore = new VolumeStore()

    this.state = {
      formData: props.volume,
    }
  }

  componentDidMount() {
    const { onCancel } = this.props
    const { registerSubRoute } = this.context
    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
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

  handleGoBack = () => {
    const { resetSubRoute } = this.context

    resetSubRoute && resetSubRoute()

    this.props.onCancel()
  }

  handleSubmit = callback => {
    const { onSave } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const { volumeMounts = [], ...volume } = form.getData()
        onSave(
          volume,
          volumeMounts.map(vm => ({
            ...vm,
            name: volume.metadata.name,
          }))
        )
        callback && callback()
      })
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

    const { volume, cluster, namespace, checkVolumeNameExist } = this.props

    if (checkVolumeNameExist(value) && volume.metadata.name !== value) {
      callback({ message: t('The volume name exists'), field: rule.field })
    } else {
      this.volumeStore
        .checkName({ name: value, cluster, namespace })
        .then(resp => {
          if (resp.exist) {
            return callback({
              message: t('The volume name exists'),
              field: rule.field,
            })
          }
          callback()
        })
    }
  }

  render() {
    const {
      containers,
      className,
      contentClassName,
      collectSavedLog,
      cluster,
      namespace,
    } = this.props
    const { formData } = this.state

    return (
      <div className={classNames(styles.wrapper, className)}>
        <div className="h6">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {t('Add Volume Template')}
        </div>
        <div className={classNames(styles.contentWrapper, contentClassName)}>
          <div className={styles.card}>
            <Form data={formData} ref={this.formRef}>
              <Form.Item
                className={styles.name}
                label={t('Volume Name')}
                desc={t('LONG_NAME_DESC')}
                rules={[
                  { required: true, message: t('Please input volume name') },
                  {
                    pattern: PATTERN_NAME,
                    message: t('Invalid name', {
                      message: t('LONG_NAME_DESC'),
                    }),
                  },
                  { validator: this.nameValidator },
                ]}
              >
                <Input name="metadata.name" autoFocus={true} maxLength={253} />
              </Form.Item>
              <VolumeFormTemplate cluster={cluster} namespace={namespace} />
              <Form.Item
                label={t('Mount Path')}
                rules={[{ validator: this.mountValidator }]}
              >
                <MountInput
                  name="volumeMounts"
                  containers={containers}
                  collectSavedLog={collectSavedLog}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  }
}
