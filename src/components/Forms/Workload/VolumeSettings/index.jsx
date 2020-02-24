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

import { get, set, unset, isUndefined } from 'lodash'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { Toggle, Tooltip, Icon } from '@pitrix/lego-ui'

import { generateId, safeParseJSON } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import { findVolume, isNotPersistentVolume } from 'utils/volume'
import { Alert, Form } from 'components/Base'
import VolumeStore from 'stores/volume'

import VolumeList from './VolumeList'
import AddVolume from './AddVolume'
import MountConfig from './MountConfig'
import VolumeTemplateList from './VolumeTemplateList'
import AddVolumeTemplate from './AddVolumeTemplate'

import styles from './index.scss'

class VolumeSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      state: '',
      selectVolume: {},
      collectSavedLog: get(this.formTemplate, this.collectSavedLogPath),
    }

    this.store = new VolumeStore()

    this.store.fetchList({ namespace: this.namespace, limit: -1 })

    this.handleVolume = this.handleVolume.bind(this)
    this.handleVolumeTemplate = this.handleVolumeTemplate.bind(this)
    this.handleLogToggle = this.handleLogToggle.bind(this)
  }

  get prefix() {
    return this.props.prefix || 'spec.template.'
  }

  get namespace() {
    return (
      this.props.namespace || get(this.formTemplate, 'metadata.namespace', '')
    )
  }

  get collectSavedLogPath() {
    return `${this.prefix}metadata.annotations["kubesphere.io/collectSavedLog"]`
  }

  get logPathPrefix() {
    return `${
      this.prefix
    }metadata.annotations["logging.kubesphere.io/logsidecar-config"]`
  }

  get projectEnableCollectingFileLog() {
    return (
      get(
        this.props.rootStore.project.data,
        'labels["logging.kubesphere.io/logsidecar-injection"]'
      ) === 'enabled'
    )
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get selectVolume() {
    return this.state.selectVolume
  }

  showVolume = () => {
    this.setState({
      state: 'ShowVolume',
      selectVolume: {},
    })
  }

  showEditVolume = volume => {
    let state

    if (!isUndefined(volume.configMap) || !isUndefined(volume.secret)) {
      state = 'ShowConfig'
    } else {
      state = 'ShowVolume'
    }

    this.setState({
      state,
      selectVolume: volume,
    })
  }

  showVolumeTemplate = () => {
    this.setState({
      state: 'ShowVolumeTemplate',
    })
  }

  showEditVolumeTemplate = volume => {
    this.setState({
      state: 'ShowVolumeTemplate',
      selectVolume: volume,
    })
  }

  resetState = state => {
    this.setState({ state: state || '' })
  }

  showConfig = () => {
    this.setState({
      state: 'ShowConfig',
      selectVolume: {},
    })
  }

  formatSpecVolume = (volume = {}, newVolume) => {
    let newSpecVolume

    if (isNotPersistentVolume(newVolume)) {
      newSpecVolume = newVolume
    } else {
      newSpecVolume = {
        name: volume.name || `volume-${generateId()}`,
        persistentVolumeClaim: { claimName: newVolume.name },
      }
    }

    return newSpecVolume
  }

  updateVolumes = newVolume => {
    const volumes = get(this.formTemplate, `${this.prefix}spec.volumes`, [])

    let newVolumes = []

    const existVolume = findVolume(volumes, newVolume)
    const newSpecVolume = this.formatSpecVolume(existVolume, newVolume)
    if (existVolume) {
      newVolumes = volumes.map(item =>
        item.name === newVolume.name ? newSpecVolume : item
      )
    } else {
      newVolumes = [...volumes, newSpecVolume]
    }

    set(this.formTemplate, `${this.prefix}spec.volumes`, newVolumes)
  }

  updateVolumeMounts = newVolumeMounts => {
    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )

    const volumes = get(this.formTemplate, `${this.prefix}spec.volumes`, [])

    newVolumeMounts.forEach(({ containerName, volume, ...rest }) => {
      const container = containers.find(item => item.name === containerName)
      const existVolume = findVolume(volumes, volume)

      if (existVolume && container) {
        container.volumeMounts = container.volumeMounts || []

        const newVolumeMount = { name: existVolume.name, ...rest }

        const volumeMount = container.volumeMounts.find(
          item => item.name === existVolume.name
        )

        if (volumeMount) {
          container.volumeMounts = container.volumeMounts.map(item =>
            item.name === existVolume.name ? newVolumeMount : item
          )
        } else {
          container.volumeMounts.push(newVolumeMount)
        }

        container.volumeMounts = container.volumeMounts
          .filter(vm => vm.readOnly !== 'null')
          .map(({ logPath, ...vm }) => ({
            ...vm,
            readOnly: vm.readOnly === 'true',
          }))
      }
    })

    set(this.formTemplate, `${this.prefix}spec.containers`, containers)
  }

  updateLogConfigs = newVolumeMounts => {
    const logConfig = safeParseJSON(
      get(this.formTemplate, this.logPathPrefix, ''),
      {}
    )

    const volumes = get(this.formTemplate, `${this.prefix}spec.volumes`, [])

    newVolumeMounts.forEach(vm => {
      const existVolume = findVolume(volumes, vm.volume)

      const path = `containerLogConfigs.${vm.containerName}.${vm.name ||
        existVolume.name}`

      if (vm.logPath) {
        set(logConfig, path, vm.logPath.split(','))
      } else {
        unset(logConfig, path)
      }
    })

    set(this.formTemplate, this.logPathPrefix, JSON.stringify(logConfig))
  }

  updateVolumeTemplate = data => {
    const namespace = get(this.formTemplate, 'metadata.namespace')

    const volumes = get(this.formTemplate, 'spec.volumeClaimTemplates', [])

    set(data, 'metadata.namespace', namespace)

    let newVolumes = []

    const volume = volumes.find(
      item => item.metadata.name === data.metadata.name
    )

    if (volume) {
      newVolumes = volumes.map(item =>
        item.metadata.name === data.metadata.name ? data : item
      )
    } else {
      newVolumes = [...volumes, data]
    }

    set(this.formTemplate, 'spec.volumeClaimTemplates', newVolumes)
  }

  updateVolumeTemplateMounts = newVolumeMounts => {
    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )

    newVolumeMounts.forEach(({ containerName, ...rest }) => {
      const container = containers.find(item => item.name === containerName)

      if (container) {
        container.volumeMounts = container.volumeMounts || []

        const newVolumeMount = rest

        const volumeMount = container.volumeMounts.find(
          item => item.name === newVolumeMount.name
        )

        if (volumeMount) {
          container.volumeMounts = container.volumeMounts.map(item =>
            item.name === newVolumeMount.name ? newVolumeMount : item
          )
        } else {
          container.volumeMounts.push(newVolumeMount)
        }

        container.volumeMounts = container.volumeMounts
          .filter(vm => vm.readOnly !== 'null')
          .map(vm => ({
            ...vm,
            readOnly: vm.readOnly === 'true',
          }))
      }
    })

    set(this.formTemplate, `${this.prefix}spec.containers`, containers)
  }

  handleVolume(newVolume = {}, newVolumeMounts = []) {
    this.updateVolumes(newVolume)
    this.updateVolumeMounts(newVolumeMounts)
    this.updateLogConfigs(newVolumeMounts)

    this.resetState()
  }

  handleVolumeTemplate(newVolume = {}, newVolumeMounts = []) {
    this.updateVolumeTemplate(newVolume)
    this.updateVolumeTemplateMounts(newVolumeMounts)
    this.updateLogConfigs(newVolumeMounts)

    this.resetState()
  }

  checkVolumeNameExist = name => {
    const volumes = get(this.formTemplate, `${this.prefix}spec.volumes`, [])
    const volumeTemplates = get(
      this.formTemplate,
      'spec.volumeClaimTemplates',
      []
    )

    return (
      volumes.some(volume => volume.name === name) ||
      volumeTemplates.some(volume => volume.name === name)
    )
  }

  renderVolume() {
    const { collectSavedLog } = this.state
    const volumes = this.store.list.data
    const isLoading = this.store.list.isLoading

    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )

    return (
      <AddVolume
        volumes={volumes}
        volume={this.selectVolume}
        namespace={this.namespace}
        module={this.props.module}
        containers={containers}
        onSave={this.handleVolume}
        onCancel={this.resetState}
        isLoading={isLoading}
        checkVolumeNameExist={this.checkVolumeNameExist}
        collectSavedLog={collectSavedLog}
      />
    )
  }

  renderConfig() {
    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )

    return (
      <MountConfig
        volume={this.selectVolume}
        containers={containers}
        namespace={this.namespace}
        containers={containers}
        onSave={this.handleVolume}
        onCancel={this.resetState}
        checkVolumeNameExist={this.checkVolumeNameExist}
      />
    )
  }

  renderVolumeTemplate() {
    const { collectSavedLog } = this.state
    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )
    const namespace = get(this.formTemplate, 'metadata.namespace', '')

    return (
      <AddVolumeTemplate
        volume={this.selectVolume}
        containers={containers}
        namepsace={namespace}
        onSave={this.handleVolumeTemplate}
        onCancel={this.resetState}
        checkVolumeNameExist={this.checkVolumeNameExist}
        collectSavedLog={collectSavedLog}
      />
    )
  }

  handleLogToggle() {
    this.setState(
      ({ collectSavedLog }) => ({
        collectSavedLog: collectSavedLog === 'true' ? 'false' : 'true',
      }),
      () => {
        set(
          this.formTemplate,
          this.collectSavedLogPath,
          this.state.collectSavedLog
        )

        if (this.state.collectSavedLog === 'false') {
          unset(this.formTemplate, this.logPathPrefix)
        }
      }
    )
  }

  renderToolTipContent() {
    return (
      <div>
        <div className="tooltip-title">
          {t('What is collecting file log ?')}
        </div>
        <p>{t('COLLECT_FILE_LOG_TIP')}</p>
      </div>
    )
  }

  renderToggle(disabled) {
    const { collectSavedLog } = this.state

    return (
      <span>
        <Toggle
          disabled={disabled}
          checked={collectSavedLog === 'true'}
          onChange={this.handleLogToggle}
        />
      </span>
    )
  }

  renderTitle() {
    return (
      <div className="font-bold margin-b8 relative">
        <span>{t('Mount Volumes')}</span>
        {globals.app.hasKSModule('logging') && (
          <div className={styles.toggle}>
            {!this.projectEnableCollectingFileLog ? (
              <Tooltip content={t('PROJECT_COLLECT_SAVED_DISABLED_DESC')}>
                {this.renderToggle(true)}
              </Tooltip>
            ) : (
              this.renderToggle()
            )}
            <span className="text-secondary align-middle">
              {' '}
              {t('Collecting file log')}{' '}
            </span>
            <Tooltip content={this.renderToolTipContent()}>
              <Icon name="question" />
            </Tooltip>
          </div>
        )}
      </div>
    )
  }

  renderList() {
    const { formRef, formProps = {}, module } = this.props
    const { collectSavedLog } = this.state

    const volumes = this.store.list.data
    const isLoading = this.store.list.isLoading

    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )

    const showTip =
      get(this.formTemplate, `${this.prefix}spec.volumes`, []).length === 0 &&
      get(this.formTemplate, `spec.volumeClaimTemplates`, []).length === 0

    const logPath = safeParseJSON(
      get(this.formTemplate, this.logPathPrefix, [])
    )

    const isSTS = module === 'statefulsets'

    return (
      <Form data={this.formTemplate} ref={formRef} {...formProps}>
        {this.renderTitle()}
        {collectSavedLog === 'true' && showTip && (
          <Alert
            className="margin-b12"
            icon="information"
            type="warning"
            title={t(
              isSTS
                ? 'Please add at least one volume or volume template'
                : 'Please add at least one volume'
            )}
            message={t('COLLECT_SAVED_LOG_DESC')}
          />
        )}
        <div className={styles.volumes}>
          {isSTS && (
            <Form.Item label={t('Volume Templates')}>
              <VolumeTemplateList
                prefix={this.prefix}
                name="spec.volumeClaimTemplates"
                containers={containers}
                onShowAddVolume={this.showVolumeTemplate}
                onShowEdit={this.showEditVolumeTemplate}
                collectSavedLog={collectSavedLog}
                logPath={logPath}
              />
            </Form.Item>
          )}
          <Form.Item label={t('Volumes')}>
            <VolumeList
              prefix={this.prefix}
              name={`${this.prefix}spec.volumes`}
              volumes={volumes}
              containers={containers}
              loading={isLoading}
              onShowVolume={this.showVolume}
              onShowConfig={this.showConfig}
              onShowEdit={this.showEditVolume}
              collectSavedLog={collectSavedLog}
              logPath={logPath}
            />
          </Form.Item>
        </div>
      </Form>
    )
  }

  render() {
    const { state } = this.state

    let content = null

    switch (state) {
      case 'ShowVolume':
        content = this.renderVolume()
        break
      case 'ShowConfig':
        content = this.renderConfig()
        break
      case 'ShowVolumeTemplate':
        content = this.renderVolumeTemplate()
        break
      default:
        content = this.renderList()
    }

    return content
  }
}

export const Component = VolumeSettings
export default inject('rootStore')(observer(VolumeSettings))
