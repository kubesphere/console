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

import { get, set, keyBy, isEmpty, isUndefined, uniq } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  RadioButton,
  RadioGroup,
  Select,
} from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import { ArrayInput, ObjectInput, MountInput } from 'components/Inputs'
import { ReactComponent as BackIcon } from 'assets/back.svg'
import { generateId, getDisplayName } from 'utils'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import FederatedStore from 'stores/federated'

import styles from './index.scss'

export default class MountConfig extends React.Component {
  static propTypes = {
    containers: PropTypes.array,
    volume: PropTypes.object,
    namespace: PropTypes.string,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    volume: {},
    containers: [],
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
    this.specificKeyRef = React.createRef()

    if (!isEmpty(props.volume)) {
      const data = props.volume.configMap || props.volume.secret || {}
      this.state = {
        formData: {
          name: data.name || data.secretName,
          items: data.items,
          volumeMounts: props.volume.volumeMounts,
        },
        configMaps: [],
        secrets: [],
        resource: {},
        type: props.volume.configMap ? 'configmap' : 'secret',
      }
    } else {
      this.state = {
        formData: {},
        configMaps: [],
        secrets: [],
        resource: {},
        type: 'configmap',
      }
    }

    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()

    if (props.isFederated) {
      this.configMapStore = new FederatedStore({
        module: this.configMapStore.module,
      })
      this.secretStore = new FederatedStore({
        module: this.secretStore.module,
      })
    }
  }

  componentDidMount() {
    const { onCancel } = this.props
    const { registerSubRoute } = this.context
    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)

    this.fetchData()
  }

  fetchData() {
    const { cluster, namespace } = this.props

    const params = {
      namespace,
      cluster,
    }

    Promise.all([
      this.configMapStore.fetchListByK8s(params),
      this.secretStore.fetchListByK8s(params),
    ]).then(([configMaps, secrets]) => {
      this.setState({ configMaps, secrets }, () => {
        if (this.state.formData.name) {
          this.handleSelectChange(this.state.formData.name)
        }
      })
    })
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

  handleSelectChange = value => {
    const { configMaps, secrets, type } = this.state
    let data = {}
    if (type === 'configmap') {
      data = configMaps.find(({ name }) => name === value)
    } else {
      data = secrets.find(({ name }) => name === value)
    }

    this.setState({ resource: data })
  }

  handleTypeChange = type => {
    const { formData } = this.state
    const form = this.formRef.current
    this.setState({ type, formData: set(formData, 'name', undefined) }, () => {
      form.validate()
    })
  }

  handleSubmit = callback => {
    const { onSave } = this.props
    const { resource } = this.state
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const { volumeMounts, name, items } = form.getData()
        const volume = {
          name: get(this.props, 'volume.name', `volume-${generateId()}`),
        }

        if (resource.module === 'secrets') {
          volume.secret = { secretName: name, items }
        } else {
          volume.configMap = { name, items }
        }

        let newVolumeMounts = []
        if (volumeMounts) {
          newVolumeMounts = volumeMounts.map(item => ({
            ...item,
            volume,
          }))
        }

        onSave(volume, newVolumeMounts)
        callback && callback()
      })
  }

  getResourceOptions() {
    const { type, configMaps, secrets } = this.state

    if (type === 'configmap' && !isEmpty(configMaps)) {
      return configMaps.map(item => ({
        label: getDisplayName(item),
        description: t('CONFIGMAP'),
        value: item.name,
        icon: 'hammer',
      }))
    }

    if (type === 'secret' && !isEmpty(secrets)) {
      return secrets.map(item => ({
        label: getDisplayName(item),
        description: t('SECRET'),
        value: item.name,
        icon: 'key',
      }))
    }

    return []
  }

  getKeysOptions() {
    const { resource } = this.state

    return Object.keys(resource.data || {}).map(key => ({
      label: key,
      value: key,
    }))
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

  nameValidator = (rule, value, callback) => {
    const { formData, type } = this.state
    const volumeMounts = get(formData, 'volumeMounts')

    const hasVolume = volume => {
      return !isEmpty(volume) && get(volume, '[0].readOnly') !== 'null'
    }

    if (hasVolume(volumeMounts) && !value) {
      return type === 'configmap'
        ? callback({ message: t('CONFIGMAP_NOT_SELECT') })
        : callback({ message: t('SECRET_NOT_SELECT') })
    }

    if (!hasVolume(volumeMounts) || value) {
      return callback()
    }
  }

  relativePathValidator = (rule, value, callback) => {
    this.validateSpecificKey(value, callback)

    if (!value) {
      return callback()
    }

    const pathHasEmpty = value.some(item => item.path === '')
    if (pathHasEmpty) {
      return callback({ message: t('MOUNT_PATH_EMPTY') })
    }

    const absPath = value.some(item => /^\//.test(item.path))
    if (absPath) {
      return callback({ message: t('PLEASE_USE_RELATIVE_PATH') })
    }

    const notSupportRelPath = value.some(item => /^(\.)\1{1,}/.test(item.path))
    if (notSupportRelPath) {
      return callback({ message: t('RELATIVE_PATH_NOT_SUPPORT') })
    }

    const pathIncorrect = value.some(item =>
      /(\/)\1{1,}|(\.)\2{1,}/.test(item.path)
    )
    if (pathIncorrect) {
      return callback({ message: t('MOUNT_PATH_INCORRECT') })
    }

    this.checkMountPathRepeat(value, callback)

    return callback()
  }

  validateSpecificKey(value, callback) {
    const { isCheck } = this.specificKeyRef.current.state

    if (isCheck && isUndefined(value)) {
      callback({ message: t('MOUNT_PATH_NOT_SPECIFIED') })
    }
  }

  checkMountPathRepeat(value, callback) {
    const mountPath = value.map(item => item.path)
    if (uniq(mountPath).length !== value.length) {
      callback({ message: t('MOUNT_PATH_REPEATED') })
    }
  }

  renderContent() {
    const { containers, collectSavedLog } = this.props
    const { type, formData } = this.state

    const options = this.getResourceOptions()
    const supportedAccessModes = ['READ_ONLY', 'NOT_MOUNT']

    const placeholder = {
      label: isEmpty(options)
        ? t('NO_AVAILABLE_RESOURCE')
        : t('SELECT_TYPE', { type: t(type.toUpperCase()) }),
      description: t(`SELECT_${type.toUpperCase()}_DESC`),
    }

    return (
      <Form data={formData} ref={this.formRef}>
        <div className={styles.card}>
          <Form.Item rules={[{ validator: this.nameValidator }]}>
            <TypeSelect
              name="name"
              options={options}
              placeholder={placeholder}
              onChange={this.handleSelectChange}
            />
          </Form.Item>
          <Form.Item rules={[{ validator: this.mountValidator }]}>
            <MountInput
              name="volumeMounts"
              supportedAccessModes={supportedAccessModes}
              containers={containers}
              collectSavedLog={collectSavedLog}
            />
          </Form.Item>
        </div>
        <Form.Group
          label={t('SELECT_SPECIFIC_KEYS')}
          desc={t('SELECT_SPECIFIC_KEYS_DESC')}
          ref={this.specificKeyRef}
          checkable
          keepDataWhenUncheck
        >
          <Form.Item rules={[{ validator: this.relativePathValidator }]}>
            <ArrayInput name="items" itemType="object" addText={t('ADD')}>
              <ObjectInput>
                <Select
                  name="key"
                  placeholder={t('KEY')}
                  options={this.getKeysOptions()}
                />
                <Input name="path" placeholder={t('PATH')} />
              </ObjectInput>
            </ArrayInput>
          </Form.Item>
        </Form.Group>
      </Form>
    )
  }

  render() {
    const { type } = this.state

    return (
      <div className={styles.wrapper}>
        <div className="h6">
          <a className="custom-icon" onClick={this.handleGoBack}>
            <BackIcon />
          </a>
          {t('STORAGE_SETTINGS')}
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{t('MOUNT_CONFIGMAP_OR_SECRET')}</div>
          <RadioGroup
            mode="button"
            value={type}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="configmap">{t('CONFIGMAP')}</RadioButton>
            <RadioButton value="secret">{t('SECRET')}</RadioButton>
          </RadioGroup>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
