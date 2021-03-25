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

import { concat, get, set, unset, isEmpty, omit, omitBy, has } from 'lodash'
import React from 'react'
import { generateId } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import { getLeftQuota } from 'utils/workload'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import LimitRangeStore from 'stores/limitrange'
import FederatedStore from 'stores/federated'
import QuotaStore from 'stores/quota'
import WorkspaceQuotaStore from 'stores/workspace.quota'
import ProjectStore from 'stores/project'

import { Form } from '@kube-design/components'
import AffinityForm from 'components/Forms/Workload/ContainerSettings/Affinity'
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
      limitRange: {},
      imageRegistries: [],
      replicas: this.getReplicas(),
      leftQuota: {},
    }

    this.module = props.module

    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()
    this.limitRangeStore = new LimitRangeStore()
    this.imageRegistryStore = new SecretStore()
    this.quotaStore = new QuotaStore()
    this.workspaceQuotaStore = new WorkspaceQuotaStore()
    this.projectStore = new ProjectStore()

    if (props.isFederated) {
      this.configMapStore = new FederatedStore({
        module: this.configMapStore.module,
      })
      this.secretStore = new FederatedStore({
        module: this.secretStore.module,
      })
      this.limitRangeStore = new FederatedStore({
        module: this.limitRangeStore.module,
      })
      this.imageRegistryStore = new FederatedStore({
        module: this.imageRegistryStore.module,
      })
    }

    this.handleContainer = this.handleContainer.bind(this)
  }

  componentDidMount() {
    this.fetchData()
    this.fetchQuota()
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

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  initService() {
    const workloadName = get(this.formTemplate, 'metadata.name')
    let serviceName = get(this.props.formTemplate, 'Service.metadata.name')

    if (workloadName && !serviceName) {
      serviceName = `${workloadName.slice(0, 57)}-${generateId(4)}`
      if (!/^[a-z]/.test(serviceName)) {
        serviceName = `s${serviceName}`
      }

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

      set(this.fedFormTemplate, `spec.serviceName`, serviceName)
    }
  }

  getReplicas = () => get(this.fedFormTemplate, `spec.replicas`) || 1

  fetchData() {
    const { cluster, isFederated } = this.props

    const params = {
      cluster,
      namespace: get(this.formTemplate, 'metadata.namespace'),
    }

    Promise.all([
      this.configMapStore.fetchListByK8s(params),
      this.secretStore.fetchListByK8s(params),
      this.limitRangeStore.fetchListByK8s(params),
      isFederated
        ? this.imageRegistryStore.fetchList({
            ...params,
            limit: -1,
            type: `kubernetes.io/dockerconfigjson`,
          })
        : this.imageRegistryStore.fetchListByK8s({
            ...params,
            fieldSelector: `type=kubernetes.io/dockerconfigjson`,
          }),
    ]).then(([configMaps, secrets, limitRanges, imageRegistries]) => {
      this.setState({
        configMaps,
        secrets,
        limitRange: get(limitRanges, '[0].limit'),
        imageRegistries,
      })
    })
  }

  fetchQuota() {
    const { cluster, projectDetail } = this.props
    const { workspace, name } = projectDetail || {}

    if (workspace && name) {
      Promise.all([
        this.quotaStore.fetch({
          cluster,
          namespace: name,
        }),
        this.workspaceQuotaStore.fetchDetail({
          name: workspace,
          workspace,
          cluster,
        }),
      ]).then(() => {
        this.setState({
          leftQuota: getLeftQuota(
            get(this.workspaceQuotaStore.detail, 'status.total'),
            this.quotaStore.data
          ),
        })
      })
    }
  }

  handleReplicaChange = value => {
    this.setState({ replicas: value })
  }

  handleClusterUpdate = () => {
    this.updateService()
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

  updateTimeZone = mergedContainers => {
    let volumes = get(this.fedFormTemplate, `${this.prefix}spec.volumes`, [])
    const hasLocalTime = mergedContainers.some(container =>
      (container.volumeMounts || []).some(
        vm => vm.mountPath === '/etc/localtime'
      )
    )

    if (hasLocalTime) {
      if (volumes.every(item => item.name !== 'host-time')) {
        volumes.push({
          hostPath: { path: '/etc/localtime', type: '' },
          name: 'host-time',
        })
      }
    } else {
      volumes = volumes.filter(
        volume =>
          !(volume.name === 'host-time' && volume.hostPath === '/etc/localtime')
      )
    }

    set(this.fedFormTemplate, `${this.prefix}spec.volumes`, volumes)
  }

  updatePullSecrets = () => {
    const pullSecrets = {}
    const imagePullSecretsPath = `${this.prefix}spec.imagePullSecrets`

    const containers = get(
      this.fedFormTemplate,
      `${this.prefix}spec.containers`,
      []
    )
    const initContainers = get(
      this.fedFormTemplate,
      `${this.prefix}spec.initContainers`,
      []
    )
    concat(containers, initContainers).forEach(container => {
      if (container.pullSecret) {
        pullSecrets[container.pullSecret] = ''
      }
    })

    set(
      this.fedFormTemplate,
      imagePullSecretsPath,
      !isEmpty(pullSecrets)
        ? Object.keys(pullSecrets).map(key => ({ name: key }))
        : null
    )
  }

  updateService = () => {
    const { formTemplate, module, withService } = this.props

    if (!withService) {
      return
    }

    const containers = get(
      this.fedFormTemplate,
      `${this.prefix}spec.containers`,
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

    const serviceTemplate = formTemplate.Service

    const serivcePrefix = this.props.isFederated ? 'spec.template.' : ''

    set(serviceTemplate, `${serivcePrefix}spec.ports`, servicePorts)

    const labels = get(this.formTemplate, 'metadata.labels', {})
    const podLabels = get(
      this.fedFormTemplate,
      `${this.prefix}metadata.labels`,
      {}
    )

    set(serviceTemplate, 'metadata.labels', labels)
    set(
      serviceTemplate,
      `${serivcePrefix}spec.selector`,
      omit(podLabels, 'version')
    )

    const placement = get(this.formTemplate, 'spec.placement')
    if (placement) {
      set(serviceTemplate, 'spec.placement', placement)
    } else {
      unset(serviceTemplate, 'spec.placement')
    }

    if (module === 'statefulsets') {
      set(serviceTemplate, `${serivcePrefix}spec.clusterIP`, 'None')
    } else {
      unset(serviceTemplate, `${serivcePrefix}spec.clusterIP`)
    }
  }

  handleContainer(data = {}) {
    if (has(data, 'resources.limits')) {
      data.resources.limits = omitBy(data.resources.limits, isEmpty)
    }

    data.type = data.type || 'worker'

    // merge init containers and worker containers, in order to fix container type change.
    const containers = get(
      this.fedFormTemplate,
      `${this.prefix}spec.containers`,
      []
    ).map(c => ({ ...c, type: 'worker' }))
    const initContainers = get(
      this.fedFormTemplate,
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
    set(this.fedFormTemplate, `${this.prefix}spec.containers`, _containers)
    set(
      this.fedFormTemplate,
      `${this.prefix}spec.initContainers`,
      _initContainers
    )

    this.updateTimeZone(mergedContainers)

    // update image pull secrets
    this.updatePullSecrets()

    this.updateService()

    this.hideContainer()
  }

  handleDelete = () => {
    this.updatePullSecrets()
    this.updateService()
  }

  containersValidator = (rule, value, callback) => {
    if (isEmpty(value)) {
      return callback({ message: t('Please add at least one container.') })
    }

    callback()
  }

  renderContainerForm(data) {
    const { withService, isFederated } = this.props
    const { configMaps, secrets, limitRange, imageRegistries } = this.state
    const type = !data.image ? 'Add' : 'Edit'
    const params = { configMaps, secrets, limitRange, imageRegistries }

    return (
      <ContainerForm
        type={type}
        module={this.module}
        namespace={this.namespace}
        data={data}
        onSave={this.handleContainer}
        onCancel={this.hideContainer}
        withService={withService}
        isFederated={isFederated}
        {...params}
      />
    )
  }

  renderDeployPlacementTip() {
    return (
      <div>
        <div className="tooltip-title">{t('DEPLOY_PLACEMENT_TIP_TITLE')}</div>
        <p>{t('DEPLOY_PLACEMENT_TIP_VALUE')}</p>
      </div>
    )
  }

  renderReplicasControl() {
    if (this.module === 'daemonsets') {
      return null
    }

    const { projectDetail, isFederated } = this.props

    if (isFederated) {
      return (
        <Form.Item
          className="margin-b12"
          label={t('Deployment Location')}
          tip={this.renderDeployPlacementTip()}
        >
          <ClusterReplicasControl
            module={this.module}
            template={this.formTemplate}
            clusters={projectDetail.clusters}
            onClusterUpdate={this.handleClusterUpdate}
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
    const specTemplate = get(this.fedFormTemplate, `${this.prefix}spec`)

    return (
      <Form.Item
        label={t('Container Image')}
        rules={[{ validator: this.containersValidator }]}
      >
        <ContainerList
          name={`${this.prefix}spec.containers`}
          onShow={this.showContainer}
          onDelete={this.handleDelete}
          specTemplate={specTemplate}
          leftQuota={this.state.leftQuota}
          projectDetail={this.props.projectDetail}
          replicas={this.state.replicas}
        />
      </Form.Item>
    )
  }

  renderUpdateStrategy() {
    const { module } = this.props
    return (
      <div className="margin-t12">
        <UpdateStrategy module={module} data={this.fedFormTemplate} />
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
    const { cluster, namespace } = this.props
    return (
      <div className="margin-b12">
        <AffinityForm
          initial
          data={this.fedFormTemplate}
          module={this.module}
          cluster={cluster}
          namespace={namespace}
          checkable={true}
        />
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
      <Form data={this.fedFormTemplate} ref={formRef}>
        {this.renderReplicasControl()}
        {this.renderContainerList()}
        {this.renderUpdateStrategy()}
        {this.renderPodSecurityContext()}
        {this.renderPodAffinity()}
      </Form>
    )
  }
}
