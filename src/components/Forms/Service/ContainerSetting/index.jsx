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
import { MODULE_KIND_MAP } from 'utils/constants'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'

import { Form } from '@kube-design/components'
import ReplicasControl from 'components/Forms/Workload/ContainerSettings/ReplicasControl'
import UpdateStrategy from 'components/Forms/Workload/ContainerSettings/UpdateStrategy'

import ContainerForm from './ContainerForm'

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

    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()

    this.handleContainer = this.handleContainer.bind(this)
  }

  componentDidMount() {
    const { formRef } = this.props

    this.fetchData()
    if (this.props.withService) {
      this.initService(this.formTemplate)
    }
    formRef.current.setCustomValidator(this.validator)
  }

  validator = cb => {
    this.handleContainer()
    cb && cb()
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

  initService() {
    const workloadName = get(this.formTemplate, 'metadata.name')
    let serviceName = get(this.props.formTemplate, 'Service.metadata.name')

    if (workloadName && !serviceName) {
      serviceName = `${workloadName}-service`
      set(this.props.formTemplate, 'Service.metadata.name', serviceName)
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

  updatePullSecrets = formData => {
    const pullSecrets = {}

    const imagePullSecretsPath = `${this.prefix}spec.imagePullSecrets`

    const containers = get(formData, `${this.prefix}spec.containers`, [])
    containers.forEach(container => {
      if (container.pullSecret) {
        pullSecrets[container.pullSecret] = ''
      }
    })

    set(
      formData,
      imagePullSecretsPath,
      !isEmpty(pullSecrets)
        ? Object.keys(pullSecrets).map(key => ({ name: key }))
        : null
    )
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

    if (module === 'StatefulSet') {
      set(formTemplate, 'Service.spec.clusterIP', 'None')
    } else {
      unset(formTemplate, 'Service.spec.clusterIP')
    }
  }

  handleContainer() {
    const container = get(this.formTemplate, `${this.prefix}spec.containers[0]`)

    if (has(container, 'resources.limits')) {
      container.resources.limits = omitBy(container.resources.limits, isEmpty)
    }

    // update image pull secrets
    this.updatePullSecrets(this.formTemplate)

    if (this.props.withService) {
      this.updateService(this.formTemplate)
    }
  }

  renderContainerForm() {
    const { withService, cluster, module } = this.props
    const { configMaps, secrets } = this.state

    return (
      <ContainerForm
        module={module}
        cluster={cluster}
        namespace={this.namespace}
        data={this.formTemplate}
        configMaps={configMaps}
        secrets={secrets}
        withService={withService}
      />
    )
  }

  renderReplicasControl() {
    return (
      <div className="margin-b12">
        <ReplicasControl
          template={this.formTemplate}
          onChange={this.handleReplicaChange}
        />
      </div>
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

  render() {
    const { formRef } = this.props

    return (
      <Form data={this.formTemplate} ref={formRef}>
        {this.renderReplicasControl()}
        {this.renderContainerForm()}
        {this.renderUpdateStrategy()}
      </Form>
    )
  }
}
