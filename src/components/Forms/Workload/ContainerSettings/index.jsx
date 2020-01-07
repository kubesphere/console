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

import { get, set, unset, isEmpty, omitBy, has } from 'lodash'
import React from 'react'
import { safeParseJSON, generateId } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'

import { Form } from 'components/Base'
import ReplicasControl from './ReplicasControl'
import UpdateStrategy from './UpdateStrategy'
import ContainerList from './ContainerList'
import ContainerForm from './ContainerForm'
import PodSecurityContext from './PodSecurityContext'

export default class ContainerSetting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showContainer: false,
      selectContainer: {},
      configMaps: [],
      secrets: [],
      replicas: this.getReplicas(),
    }

    this.module = props.module

    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()

    this.handleContainer = this.handleContainer.bind(this)
  }

  componentDidMount() {
    this.fetchData()
    this.checkPullSecret()
    if (this.props.withService) {
      this.initService(this.formTemplate)
    }
  }

  get prefix() {
    return this.props.prefix || 'spec.template.'
  }

  get namespace() {
    return get(this.formTemplate, 'metadata.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  get containerSecretPath() {
    return `${
      this.prefix
    }metadata.annotations["kubesphere.io/containerSecrets"]`
  }

  checkPullSecret() {
    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )
    const containerSecretMap = safeParseJSON(
      get(this.formTemplate, this.containerSecretPath, '')
    )

    if (!isEmpty(containerSecretMap)) {
      containers.forEach(container => {
        if (containerSecretMap[container.name]) {
          container.pullSecret = containerSecretMap[container.name]
        }
      })
    }
  }

  initService() {
    const workloadName = get(this.formTemplate, 'metadata.name')
    let serviceName = get(this.props.formTemplate, 'Service.metadata.name')

    if (workloadName && !serviceName) {
      serviceName = `${workloadName}-${generateId()}`
      set(this.props.formTemplate, 'Service.metadata.name', serviceName)
      set(
        this.props.formTemplate,
        'Service.metadata.annotations["kubesphere.io/alias-name"]',
        workloadName
      )
      set(
        this.props.formTemplate,
        'Service.metadata.annotations["kubesphere.io/serviceType"]',
        'statefulservice'
      )
      set(this.formTemplate, 'spec.serviceName', serviceName)
    }
  }

  getReplicas = () => get(this.formTemplate, `spec.replicas`) || 1

  fetchData() {
    const namespace = get(this.formTemplate, 'metadata.namespace')

    Promise.all([
      this.configMapStore.fetchByK8s({ namespace }),
      this.secretStore.fetchByK8s({ namespace }),
    ]).then(([configMaps, secrets]) => {
      this.setState({ configMaps, secrets })
    })
  }

  handleReplicaChange = value => {
    this.setState({ replicas: value })
  }

  showContainer = data => {
    this.setState({
      showContainer: true,
      selectContainer: data || {},
    })
  }

  hideContainer = () => {
    this.setState({
      showContainer: false,
      selectContainer: {},
    })
  }

  updatePullSecrets = formData => {
    const pullSecrets = {}
    const containerSecretMap = {}

    const containerSecretPath = this.containerSecretPath
    const imagePullSecretsPath = `${this.prefix}spec.imagePullSecrets`

    const containers = get(formData, `${this.prefix}spec.containers`, [])
    containers.forEach(container => {
      if (container.pullSecret) {
        pullSecrets[container.pullSecret] = ''
        containerSecretMap[container.name] = container.pullSecret
      }
    })

    if (!isEmpty(pullSecrets)) {
      set(
        formData,
        imagePullSecretsPath,
        Object.keys(pullSecrets).map(key => ({ name: key }))
      )
      set(formData, containerSecretPath, JSON.stringify(containerSecretMap))
    } else {
      set(formData, imagePullSecretsPath, null)
      set(formData, containerSecretPath, null)
    }
  }

  updateService = formData => {
    const { formTemplate, module } = this.props
    const containers = get(formData, `${this.prefix}spec.containers`, [])

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

    set(formTemplate, 'Service.spec.ports', servicePorts)

    const labels = get(formData, 'metadata.labels', {})
    const podLabels = get(formData, `${this.prefix}metadata.labels`, {})

    set(formTemplate, 'Service.metadata.labels', labels)
    set(formTemplate, 'Service.spec.selector', podLabels)

    if (module === 'statefulsets') {
      set(formTemplate, 'Service.spec.clusterIP', 'None')
    } else {
      unset(formTemplate, 'Service.spec.clusterIP')
    }
  }

  handleContainer(data = {}) {
    if (has(data, 'resources.limits')) {
      data.resources.limits = omitBy(data.resources.limits, isEmpty)
    }

    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )
    const container = containers.find(item => item.name === data.name)

    if (!isEmpty(container)) {
      Object.assign(container, data)
    } else {
      set(this.formTemplate, `${this.prefix}spec.containers`, [
        ...containers,
        data,
      ])
    }

    // update image pull secrets
    this.updatePullSecrets(this.formTemplate)

    if (this.props.withService) {
      this.updateService(this.formTemplate)
    }

    this.hideContainer()
  }

  handleDelete = () => {
    this.updatePullSecrets(this.formTemplate)

    if (this.props.withService) {
      this.updateService(this.formTemplate)
    }
  }

  containersValidator = (rule, value, callback) => {
    if (isEmpty(value)) {
      return callback({ message: t('Please add at least one container') })
    }

    callback()
  }

  renderContainerForm(data) {
    const { withService } = this.props
    const { configMaps, secrets } = this.state
    const type = !data.image ? 'Add' : 'Edit'

    return (
      <ContainerForm
        type={type}
        module={this.module}
        namespace={this.namespace}
        data={data}
        onSave={this.handleContainer}
        onCancel={this.hideContainer}
        configMaps={configMaps}
        secrets={secrets}
        withService={withService}
      />
    )
  }

  renderReplicasControl() {
    if (this.module === 'daemonsets') {
      return null
    }

    return (
      <div className="margin-b12">
        <ReplicasControl
          module={this.module}
          replicas={this.state.replicas}
          template={this.formTemplate}
          onChange={this.handleReplicaChange}
        />
      </div>
    )
  }

  renderContainerList() {
    return (
      <Form.Item
        label={t('Container Image')}
        rules={[{ validator: this.containersValidator }]}
      >
        <ContainerList
          name={`${this.prefix}spec.containers`}
          onShow={this.showContainer}
          onDelete={this.handleDelete}
        />
      </Form.Item>
    )
  }

  renderUpdateStrategy() {
    const { formRef, module } = this.props
    const { replicas } = this.state
    return (
      <div className="margin-t12">
        <UpdateStrategy
          formRef={formRef}
          module={module}
          data={this.formTemplate}
          replicas={replicas}
        />
      </div>
    )
  }

  renderPodSecurityContext() {
    return (
      <div className="margin-t12">
        <PodSecurityContext prefix={`${this.prefix}spec.securityContext`} />
      </div>
    )
  }

  render() {
    const { formRef } = this.props
    const { showContainer, selectContainer } = this.state

    if (showContainer) {
      return this.renderContainerForm(selectContainer)
    }

    return (
      <Form data={this.formTemplate} ref={formRef}>
        {this.renderReplicasControl()}
        {this.renderContainerList()}
        {this.renderUpdateStrategy()}
        {this.renderPodSecurityContext()}
      </Form>
    )
  }
}
