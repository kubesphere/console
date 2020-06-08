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

import { concat, get, set, unset, isEmpty, omitBy, has } from 'lodash'
import React from 'react'
import { safeParseJSON, generateId } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'

import { Form } from 'components/Base'
import PodAffinity from './PodAffinity'
import ReplicasControl from './ReplicasControl'
import ClusterReplicasControl from './ClusterReplicasControl'
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
    const initContainers = get(
      this.formTemplate,
      `${this.prefix}spec.initContainers`,
      []
    )
    const containerSecretMap = safeParseJSON(
      get(this.formTemplate, this.containerSecretPath, '')
    )

    if (!isEmpty(containerSecretMap)) {
      concat(containers, initContainers).forEach(container => {
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
    const { cluster } = this.props
    const namespace = get(this.formTemplate, 'metadata.namespace')

    Promise.all([
      this.configMapStore.fetchListByK8s({ cluster, namespace }),
      this.secretStore.fetchListByK8s({ cluster, namespace }),
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
    const initContainers = get(
      formData,
      `${this.prefix}spec.initContainers`,
      []
    )
    concat(containers, initContainers).forEach(container => {
      if (container.pullSecret) {
        pullSecrets[container.pullSecret] = ''
        containerSecretMap[container.name] = container.pullSecret
        delete container.pullSecret
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
    const { formTemplate, module, withService } = this.props

    if (!withService) {
      return
    }

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

    const placement = get(formData, 'spec.placement')
    if (placement) {
      set(formTemplate, 'Service.spec.placement', placement)
    } else {
      unset(formTemplate, 'Service.spec.placement')
    }

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

    data.type = data.type || 'worker'

    // merge init containers and worker containers, in order to fix container type change.
    const containers = get(
      this.formTemplate,
      `${this.prefix}spec.containers`,
      []
    ).map(c => ({ ...c, type: 'worker' }))
    const initContainers = get(
      this.formTemplate,
      `${this.prefix}spec.initContainers`,
      []
    ).map(c => ({ ...c, type: 'init' }))

    const mergedContainers = concat(containers, initContainers)

    const { selectContainer } = this.state
    // find if data exist in all containers
    const containerIndex = mergedContainers.findIndex(
      item => item.name === selectContainer.name
    )

    // update containers
    if (containerIndex > -1) {
      mergedContainers[containerIndex] = data
    } else {
      mergedContainers.push(data)
    }

    // split mergedContainers and update formTemplate
    const _containers = []
    const _initContainers = []
    mergedContainers.forEach(item => {
      if (item.type === 'worker') {
        delete item.type
        _containers.push(item)
      } else {
        delete item.type
        _initContainers.push(item)
      }
    })
    set(this.formTemplate, `${this.prefix}spec.containers`, _containers)
    set(this.formTemplate, `${this.prefix}spec.initContainers`, _initContainers)

    // update image pull secrets
    this.updatePullSecrets(this.formTemplate)

    this.updateService(this.formTemplate)

    this.hideContainer()
  }

  handleDelete = () => {
    this.updatePullSecrets(this.formTemplate)
    this.updateService(this.formTemplate)
  }

  handleClusterChange = value => {
    const { formTemplate, withService } = this.props
    if (withService) {
      set(formTemplate, 'Service.spec.placement.clusters', value)
    }
  }

  containersValidator = (rule, value, callback) => {
    if (isEmpty(value)) {
      return callback({ message: t('Please add at least one container') })
    }

    callback()
  }

  renderContainerForm(data) {
    const { cluster, withService } = this.props
    const { configMaps, secrets } = this.state
    const type = !data.image ? 'Add' : 'Edit'

    return (
      <ContainerForm
        type={type}
        module={this.module}
        cluster={cluster}
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

  renderDeployPlacementTip() {
    return (
      <div>
        <div className="tooltip-title">{t('What is deploy placement ?')}</div>
        <p>{t('DEPLOY_PLACEMENT_TIP')}</p>
      </div>
    )
  }

  renderReplicasControl() {
    if (this.module === 'daemonsets') {
      return null
    }

    const { projectDetail = {} } = this.props

    if (projectDetail.isFedManaged && !isEmpty(projectDetail.clusters)) {
      const defaultValue = projectDetail.clusters.map(cluster => ({
        ...cluster,
        replicas: 1,
      }))

      return (
        <Form.Item
          className="margin-b12"
          label={t('Deploy Placement')}
          tip={this.renderDeployPlacementTip()}
        >
          <ClusterReplicasControl
            name="spec.placement.clusters"
            module={this.module}
            template={this.formTemplate}
            clusters={projectDetail.clusters}
            defaultValue={defaultValue}
            onChange={this.handleClusterChange}
          />
        </Form.Item>
      )
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
    const initContainers = get(
      this.formTemplate,
      `${this.prefix}spec.initContainers`,
      []
    )

    return (
      <Form.Item
        label={t('Container Image')}
        rules={[{ validator: this.containersValidator }]}
      >
        <ContainerList
          name={`${this.prefix}spec.containers`}
          onShow={this.showContainer}
          onDelete={this.handleDelete}
          initContainers={initContainers}
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

  renderPodAffinity() {
    return (
      <div className="margin-b12">
        <PodAffinity module={this.module} template={this.formTemplate} />
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
        {this.renderPodAffinity()}
      </Form>
    )
  }
}
