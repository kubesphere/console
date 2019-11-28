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

import { get, set, unset, debounce, isEmpty } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Columns, Column, Select } from '@pitrix/lego-ui'

import ServiceStore from 'stores/service'
import WorkloadStore from 'stores/workload'
import { mergeLabels, safeParseJSON } from 'utils'
import { PATTERN_NAME, PATTERN_COMPONENT_VERSION } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import { Form } from 'components/Base'
import { ReactComponent as BackIcon } from 'src/assets/back.svg'

import ContainerForm from 'components/Forms/Workload/ContainerSettings/ContainerForm'

import ContainerList from '../ContainerList'
import VolumeSettings from '../VolumeSettings'
import Replicas from '../Replicas'

import styles from './index.scss'

export default class ComponentForm extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    componentKey: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func,
  }

  static defaultProps = {
    detail: null,
    onOk() {},
    onCancel() {},
  }

  static contextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()

    const module = 'deployments'

    this.state = {
      formData: isEmpty(props.detail)
        ? this.getInitialFormData(module)
        : props.detail,
      state: '',
      selectContainer: {},
      selectVolume: {},
      workloadType: 'Deployment',
      module,
    }

    this.serviceStore = new ServiceStore()
    this.workloadStore = new WorkloadStore()

    this.workloadTypes = [
      { label: t('SERVICE_DEPLOYMENT'), value: 'Deployment' },
      { label: t('SERVICE_STATEFULSET'), value: 'StatefulSet' },
    ]
  }

  get title() {
    const { componentKey } = this.props

    const type = isEmpty(componentKey) ? 'Add New' : 'Edit'

    return `${t('Application Component')} > ${t(`${type} Component`)}`
  }

  get containerSecretPath() {
    return 'workload.spec.template.metadata.annotations["kubesphere.io/containerSecrets"]'
  }

  getInitialFormData(module) {
    const { namespace } = this.props
    const formData = {
      workload: FORM_TEMPLATES[module]({ namespace }),
      service: FORM_TEMPLATES['services']({ namespace }),
    }

    return formData
  }

  componentWillReceiveProps(nextProps) {
    if (
      !isEmpty(nextProps.detail) &&
      nextProps.detail !== this.state.formData
    ) {
      this.setState({ formData: nextProps.detail }, () => {
        this.checkPullSecret()
      })
    }
  }

  componentDidMount() {
    this.registerForm()
    this.checkPullSecret()
  }

  registerForm = () => {
    const { registerSubRoute } = this.context
    const { onCancel } = this.props

    registerSubRoute && registerSubRoute(this.handleSubmit, onCancel)
  }

  checkPullSecret = () => {
    const containers = get(
      this.state.formData,
      'workload.spec.template.spec.containers',
      []
    )
    const containerSecretMap = safeParseJSON(
      get(this.state.formData, this.containerSecretPath, '')
    )

    if (!isEmpty(containerSecretMap)) {
      containers.forEach(container => {
        if (containerSecretMap[container.name]) {
          container.pullSecret = containerSecretMap[container.name]
        }
      })
    }
  }

  showContainerForm = data => {
    this.setState({ state: 'ShowContainerForm', selectContainer: data || {} })
  }

  handleSubmit = () => {
    const { onOk, componentKey } = this.props
    const form = this.formRef.current

    form &&
      form.validate(() => {
        const data = form.getData()
        const containers = get(
          data,
          'workload.spec.template.spec.containers',
          []
        )

        // auto gen service ports by workload container ports
        const servicePorts = []
        containers.forEach(container => {
          if (container.ports) {
            container.ports.forEach(port => {
              if (port.servicePort) {
                servicePorts.push({
                  name: port.name,
                  protocol: port.protocol,
                  port: port.servicePort,
                  targetPort: port.containerPort,
                })
              }
            })
          }
        })
        set(data, 'service.spec.ports', servicePorts)

        if (get(data, 'workload.kind') === 'StatefulSet') {
          set(data, 'service.spec.clusterIP', 'None')
        } else {
          unset(data, 'service.spec.clusterIP')
        }

        onOk(componentKey || get(data, 'service.metadata.name'), data)
      })
  }

  updatePullSecrets = formData => {
    const pullSecrets = {}
    const containerSecretMap = {}

    const imagePullSecrets = 'workload.spec.template.spec.imagePullSecrets'
    const containerSecretPath = this.containerSecretPath

    const containers = get(
      formData,
      'workload.spec.template.spec.containers',
      []
    )

    containers.forEach(container => {
      if (container.pullSecret) {
        pullSecrets[container.pullSecret] = ''
        containerSecretMap[container.name] = container.pullSecret
      }
    })

    if (!isEmpty(pullSecrets)) {
      set(
        formData,
        imagePullSecrets,
        Object.keys(pullSecrets).map(key => ({ name: key }))
      )
      set(formData, containerSecretPath, JSON.stringify(containerSecretMap))
    } else {
      set(formData, imagePullSecrets, null)
      set(formData, containerSecretPath, null)
    }
  }

  handleAddContainer = data => {
    this.setState(
      ({ formData }) => {
        const containers = get(
          formData,
          'workload.spec.template.spec.containers',
          []
        )
        const container = containers.find(item => item.name === data.name)

        if (!isEmpty(container)) {
          Object.assign(container, data)
        } else {
          set(formData, 'workload.spec.template.spec.containers', [
            ...containers,
            data,
          ])
        }

        this.updatePullSecrets(formData)

        return { formData: { ...formData } }
      },
      () => {
        this.hideAddContainer()
      }
    )
  }

  handleDelete = () => {
    this.updatePullSecrets(this.state.formData)
  }

  hideAddContainer = () => {
    this.setState({ state: '', selectContainer: {} }, () => {
      this.registerForm()
    })
  }

  handleVolumeUpdateState = obj => {
    this.setState(obj, () => {
      if (obj.state === '') {
        this.registerForm()
      }
    })
  }

  handleWorkloadTypeChange = type => {
    const module = type === 'StatefulSet' ? 'statefulsets' : 'deployments'

    set(this.state.formData, 'workload.kind', type)
    set(this.state.formData, 'workload.spec.template.spec.containers', [])
    unset(this.state.formData, 'workload.spec.template.spec.volumes')
    unset(this.state.formData, 'workload.spec.volumeClaimTemplates')
    unset(this.state.formData, 'workload.spec.updateStrategy')
    unset(this.state.formData, 'workload.spec.strategy')

    if (type === 'StatefulSet') {
      set(this.state.formData, 'workload.spec.updateStrategy', {
        type: 'RollingUpdate',
        rollingUpdate: {
          partition: 0,
        },
      })
    } else {
      set(this.state.formData, 'workload.spec.strategy', {
        type: 'RollingUpdate',
        rollingUpdate: {
          maxUnavailable: '25%',
          maxSurge: '25%',
        },
      })
    }

    this.setState({ module, workloadType: type })
  }

  handleNameChange = debounce(value => {
    const { formData } = this.state

    const version = get(formData, 'workload.metadata.labels.version', '')

    set(formData, 'workload.metadata.name', `${value}-${version}`)

    mergeLabels(formData.workload, { app: value })
    mergeLabels(formData.service, { app: value })
  }, 200)

  handleVersionChange = debounce(value => {
    const { formData } = this.state

    const componentName = get(formData, 'service.metadata.name', '')
    set(formData, 'workload.metadata.name', `${componentName}-${value}`)

    mergeLabels(formData.workload, { version: value })
  }, 200)

  handleDisplayNameChange = debounce(value => {
    const { formData } = this.state

    set(
      formData,
      'service.metadata.annotations["kubesphere.io/alias-name"]',
      value
    )
  }, 200)

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { namespace } = this.props

    this.serviceStore.checkName({ name: value, namespace }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  versionValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { namespace } = this.props

    const componentName = get(
      this.state.formData,
      'workload.metadata.labels.app',
      ''
    )

    this.workloadStore.setModule(
      this.state.workloadType === 'StatefulSet' ? 'statefulsets' : 'deployments'
    )

    const name = `${componentName}-${value}`

    this.workloadStore.checkName({ name, namespace }).then(resp => {
      if (resp.exist) {
        return callback({
          message: t('WORKLOAD_NAME_EXIST', { name }),
          field: rule.field,
        })
      }
      callback()
    })
  }

  renderContainerForm() {
    const { configMaps, secrets, namespace } = this.props
    const { selectContainer, module } = this.state

    const type = !selectContainer.image ? 'Add' : 'Edit'

    const titlePrefix = `${this.title} > `

    return (
      <ContainerForm
        className={styles.containerForm}
        type={type}
        module={module}
        titlePrefix={titlePrefix}
        data={selectContainer}
        onSave={this.handleAddContainer}
        onCancel={this.hideAddContainer}
        namespace={namespace}
        configMaps={configMaps}
        secrets={secrets}
        withService
      />
    )
  }

  renderContainerList() {
    const { isGovernance } = this.props
    return (
      <Columns>
        <Column>
          <Form.Item
            label={t('Pod Template')}
            rules={[
              {
                required: true,
                message: t('Please add at least one container'),
              },
            ]}
          >
            <ContainerList
              name="workload.spec.template.spec.containers"
              className={styles.containers}
              onShow={this.showContainerForm}
              onDelete={this.handleDelete}
              isGovernance={isGovernance}
            />
          </Form.Item>
        </Column>
      </Columns>
    )
  }

  renderBaseInfo() {
    const { appName } = this.props
    const { workloadType } = this.state
    return (
      <>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={t('LONG_NAME_DESC')}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_NAME,
                  message: `${t('Invalid name')}, ${t('LONG_NAME_DESC')}`,
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input
                name="service.metadata.name"
                onChange={this.handleNameChange}
                placeholder={appName ? `${appName}-component` : ''}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Component Version')}
              desc={t('COMPONENT_VERSION_DESC')}
              rules={[
                {
                  required: true,
                  message: t('Please input component version'),
                },
                {
                  pattern: PATTERN_COMPONENT_VERSION,
                  message: t('Invalid component version'),
                },
                { validator: this.versionValidator },
              ]}
            >
              <Input
                name="workload.metadata.labels.version"
                onChange={this.handleVersionChange}
                maxLength={16}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
              <Input
                name="workload.metadata.annotations['kubesphere.io/alias-name']"
                onChange={this.handleDisplayNameChange}
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Workload Type')}
              desc={t('APP_WORKLOAD_TYPE_DESC')}
            >
              <Select
                name="service.metadata.annotations['kubesphere.io/workloadType']"
                defaultValue={workloadType}
                options={this.workloadTypes}
                onChange={this.handleWorkloadTypeChange}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item>
              <Replicas name="workload.spec.replicas" defaultValue={1} />
            </Form.Item>
          </Column>
        </Columns>
      </>
    )
  }

  renderVolumeSettings() {
    const { state, formData, selectVolume, workloadType } = this.state

    const module =
      workloadType === 'StatefulSet' ? 'statefulsets' : 'deployments'

    const formProps = { type: 'inner' }

    return (
      <VolumeSettings
        state={state}
        module={module}
        formData={formData}
        formProps={formProps}
        selectVolume={selectVolume}
        onUpdateState={this.handleVolumeUpdateState}
      />
    )
  }

  renderContent() {
    const { onCancel } = this.props
    const { formData } = this.state

    return (
      <div className={styles.wrapper}>
        <div className="h5">
          <a className="custom-icon" onClick={onCancel}>
            <BackIcon />
          </a>
          {this.title}
        </div>
        <div className={styles.formWrapper}>
          <Form ref={this.formRef} data={formData}>
            {this.renderBaseInfo()}
            {this.renderContainerList()}
            {this.renderVolumeSettings()}
          </Form>
        </div>
      </div>
    )
  }

  render() {
    const { state } = this.state

    let content = null

    switch (state) {
      case 'ShowContainerForm':
        content = this.renderContainerForm()
        break
      case 'ShowVolume':
      case 'ShowConfig':
      case 'ShowVolumeTemplate':
        content = this.renderVolumeSettings()
        break
      default:
        content = this.renderContent()
    }

    return content
  }
}
