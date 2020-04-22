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

import { get, keyBy, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Select, RadioGroup, RadioButton } from '@pitrix/lego-ui'
import { TypeSelect, Form } from 'components/Base'
import { ArrayInput, ObjectInput, MountInput } from 'components/Inputs'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'
import { generateId, getDisplayName } from 'utils'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'

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
  }

  componentDidMount() {
    const { onCancel } = this.props
    const { registerSubRoute } = this.context
    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)

    this.fetchData()
  }

  fetchData() {
    const { namespace } = this.props

    Promise.all([
      this.configMapStore.fetchListByK8s({ namespace }),
      this.secretStore.fetchListByK8s({ namespace }),
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
    const { configMaps, secrets } = this.state

    const configMap = configMaps.find(({ name }) => name === value)
    const secret = secrets.find(({ name }) => name === value)

    const data = configMap || secret || {}

    this.setState({ resource: data })
  }

  handleTypeChange = type => {
    this.setState({ type })
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

        if (resource.type) {
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
        description: t('ConfigMap'),
        value: item.name,
        icon: 'hammer',
      }))
    }

    if (type === 'secret' && !isEmpty(secrets)) {
      return secrets.map(item => ({
        label: getDisplayName(item),
        description: t('Secret'),
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

  renderContent() {
    const { containers, collectSavedLog } = this.props
    const { type, formData } = this.state

    const options = this.getResourceOptions()

    const placeholder = {
      label: isEmpty(options)
        ? t(`No Available Resource`)
        : t(`Please select a ${type}`),
      description: t(`REFFER_${type.toUpperCase()}_DESC`),
    }

    return (
      <Form data={formData} ref={this.formRef}>
        <div className={styles.card}>
          <Form.Item>
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
              containers={containers}
              collectSavedLog={collectSavedLog}
            />
          </Form.Item>
        </div>
        <Form.Group
          label={t('Select specific keys and paths')}
          desc={t('SELECT_SECRET_DESC')}
          checkable
          keepDataWhenUncheck
        >
          <Form.Item>
            <ArrayInput name="items" itemType="object" addText={t('Add')}>
              <ObjectInput>
                <Select
                  name="key"
                  placeholder={t('Select Key')}
                  options={this.getKeysOptions()}
                />
                <Input name="path" placeholder={t('Mount Path')} />
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
          {t('ConfigMap & Secret')}
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.title}>{t('Type')}</div>
          <RadioGroup
            wrapClassName="radio-default"
            value={type}
            onChange={this.handleTypeChange}
            size="small"
          >
            <RadioButton value="configmap">{t('ConfigMap')}</RadioButton>
            <RadioButton value="secret">{t('Secret')}</RadioButton>
          </RadioGroup>
          {this.renderContent()}
        </div>
      </div>
    )
  }
}
