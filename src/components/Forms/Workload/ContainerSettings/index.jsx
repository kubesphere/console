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

import { Form, Icon, Tooltip } from '@kube-design/components'
import AffinityForm from 'components/Forms/Workload/ContainerSettings/Affinity'
import {
  concat,
  endsWith,
  get,
  has,
  isEmpty,
  isUndefined,
  mergeWith,
  min,
  omit,
  omitBy,
  pickBy,
  reduce,
  set,
  unset,
} from 'lodash'
import React from 'react'
import FederatedStore from 'stores/federated'
import LimitRangeStore from 'stores/limitrange'
import ProjectStore from 'stores/project'
import QuotaStore from 'stores/quota'

import SecretStore from 'stores/secret'
import WorkspaceQuotaStore from 'stores/workspace.quota'
import { cancelContainerDot, generateId, resourceLimitKey } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import { getLeftQuota } from 'utils/workload'
import ClusterReplicasControl from './ClusterReplicasControl'
import ContainerForm from './ContainerForm'
import ContainerList from './ContainerList'
import styles from './index.scss'

import Metadata from './Metadata'
import PodSecurityContext from './PodSecurityContext'
import ReplicasControl from './ReplicasControl'
import TerminationSeconds from './TerminationSeconds'
import UpdateStrategy from './UpdateStrategy'

export default class ContainerSetting extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showContainer: false,
      selectContainer: {},
      limitRange: {},
      imageRegistries: [],
      replicas: this.getReplicas(),
      leftQuota: {},
    }

    this.module = props.module

    this.limitRangeStore = new LimitRangeStore()
    this.imageRegistryStore = new SecretStore()
    this.quotaStore = new QuotaStore()
    this.workspaceQuotaStore = new WorkspaceQuotaStore()
    this.projectStore = new ProjectStore()

    if (props.isFederated) {
      this.limitRangeStore = new FederatedStore({
        module: this.limitRangeStore.module,
      })
      this.imageRegistryStore = new FederatedStore({
        module: this.imageRegistryStore.module,
      })
    }

    this.handleContainer = this.handleContainer.bind(this)
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const { store } = this.props
    this.fetchData()
    this.fetchQuota()
    if (this.props.withService) {
      this.initService(this.formTemplate)
    }
    if (store.renderScheduleTab) {
      this.props.store.setMetadata(this.formTemplate.metadata)
    }
  }

  componentDidUpdate() {
    const containerRef = this.containerRef.current
    const error = get(containerRef, 'state.error', null)

    const containers = get(
      this.props.formTemplate,
      `${this.prefix}spec.containers`,
      []
    )

    if (error && containers.length > 0) {
      containerRef.setState({ error: null })
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
    const template = get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
    template.totalReplicas = ''
    return template
  }

  get fedFormTemplate() {
    return this.props.isFederated
      ? get(this.formTemplate, 'spec.template')
      : this.formTemplate
  }

  get workspaceQuota() {
    const nsQuota = get(this.state.availableQuota, 'namespace', {})
    const wsQuota = get(this.state.availableQuota, 'workspace', {})
    return mergeWith(nsQuota, wsQuota, (ns, ws) => {
      if (!ns && !ws) {
        return undefined
      }
      if (!isUndefined(ns)) {
        return ns < ws ? ns : ws
      }
      return ws
    })
  }

  get clusters() {
    const { projectDetail } = this.props
    return projectDetail.clusters.map(cluster => cluster.name)
  }

  get containers() {
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

    return concat(containers, initContainers)
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
    ]).then(([limitRanges, imageRegistries]) => {
      this.setState({
        limitRange: get(limitRanges, '[0].limit'),
        imageRegistries,
      })
    })
  }

  singleClusterQuota = (workspace, namespace, cluster) => {
    return new Promise(resolve => {
      Promise.all([
        this.quotaStore.fetch({
          cluster,
          namespace,
        }),
        this.workspaceQuotaStore.fetchDetail({
          name: workspace,
          workspace,
          cluster,
        }),
      ]).then(dataArr => {
        const namespaceQuota = get(dataArr[0], 'data.hard')
        const { namespace: ns, workspace: ws } = getLeftQuota(
          dataArr[1],
          get(dataArr[0], 'data')
        )
        resolve({
          workspaceQuota: ws,
          namespaceQuota: {
            ...ns,
            ...omit(namespaceQuota, resourceLimitKey),
          },
        })
      })
    })
  }

  multiClusterQuota = (workspace, namespace) => {
    const fetchArr = []
    const defaults = {
      'limits.cpu': undefined,
      'limits.memory': undefined,
    }
    this.clusters.forEach(cluster =>
      fetchArr.push(this.singleClusterQuota(workspace, namespace, cluster))
    )
    Promise.all(fetchArr).then(AllClusterQuota => {
      const workspaceQuotas = AllClusterQuota.map(item =>
        get(item, 'workspaceQuota', defaults)
      )
      const namespaceQuotas = AllClusterQuota.map(item =>
        get(item, 'namespaceQuota', defaults)
      )
      const gpuQuotas = AllClusterQuota.map(item =>
        omit(get(item, 'namespaceQuota', {}), resourceLimitKey)
      )

      this.setState({
        leftQuota: {
          workspace: this.transformQuota(workspaceQuotas),
          namespace: this.transformQuota(namespaceQuotas),
        },
        availableQuota: {
          workspace: this.transformQuota(workspaceQuotas),
          namespace: {
            ...this.transformQuota(namespaceQuotas),
            ...this.transformGpu(gpuQuotas),
          },
        },
      })
    })
  }

  transformQuota = data => {
    return {
      'limits.cpu': this.findCpuOrMemoryMin(data, 'limits.cpu'),
      'limits.memory': this.findCpuOrMemoryMin(data, 'limits.memory'),
      'requests.cpu': this.findCpuOrMemoryMin(data, 'requests.cpu'),
      'requests.memory': this.findCpuOrMemoryMin(data, 'requests.memory'),
    }
  }

  findCpuOrMemoryMin = (dataArr, key) => {
    const toArr = dataArr.map(item => item[key])
    return min(toArr)
  }

  transformGpu = data => {
    const supportGpu = globals.config.supportGpuType
    const gpuArr = data.map(item =>
      pickBy(item, (_, key) => supportGpu.some(type => endsWith(key, type)))
    )
    return reduce(
      gpuArr,
      (total, current) => {
        const hasKey = get(total, `${Object.keys(current)[0]}`)
        if (hasKey) {
          return Number(hasKey) > Number(Object.values(current)[0])
            ? { ...total, ...current }
            : { ...total }
        }
        return { ...total, ...current }
      },
      {}
    )
  }

  fetchQuota = async () => {
    let workspace
    const namespace = this.namespace
    const { cluster, projectDetail, isFederated } = this.props

    if (!projectDetail) {
      workspace = this.props.workspace
    } else {
      workspace = projectDetail.workspace
    }

    if (workspace && namespace) {
      if (!isFederated) {
        const {
          workspaceQuota,
          namespaceQuota,
        } = await this.singleClusterQuota(workspace, namespace, cluster)
        const leftQuota = {
          workspace: workspaceQuota,
          namespace: namespaceQuota,
        }
        this.setState({
          leftQuota,
          availableQuota: leftQuota,
        })
      } else {
        this.multiClusterQuota(workspace, namespace)
      }
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
          !(
            volume.name === 'host-time' &&
            volume?.hostPath?.path === '/etc/localtime'
          )
      )
    }

    set(this.fedFormTemplate, `${this.prefix}spec.volumes`, volumes)
  }

  updatePullSecrets = () => {
    const pullSecrets = {}
    const imagePullSecretsPath = `${this.prefix}spec.imagePullSecrets`
    const annotationsImagePullSecretsPath = `${this.prefix}metadata.annotations["kubesphere.io/imagepullsecrets"]`

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
        pullSecrets[container.name] = container.pullSecret
      }

      if (container.annotationOfImagePullSecrets) {
        delete container.annotationOfImagePullSecrets
      }
    })

    set(
      this.fedFormTemplate,
      imagePullSecretsPath,
      !isEmpty(pullSecrets)
        ? Object.values(pullSecrets).map(value => ({ name: value }))
        : null
    )

    const pullSecretsString = JSON.stringify(pullSecrets)

    set(
      this.fedFormTemplate,
      annotationsImagePullSecretsPath,
      pullSecretsString
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

    _initContainers.forEach(item => {
      cancelContainerDot(item)
    })

    _containers.forEach(item => {
      cancelContainerDot(item)
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
      return callback({ message: t('CONTAINER_EMPTY_DESC') })
    }

    callback()
  }

  renderContainerForm(data) {
    const {
      withService,
      isFederated,
      cluster,
      supportGpuSelect,
      projectDetail,
    } = this.props
    const { limitRange, imageRegistries } = this.state
    const type = !data.image ? 'Add' : 'Edit'
    const params = {
      limitRange,
      imageRegistries,
    }

    return (
      <ContainerForm
        type={type}
        module={this.module}
        namespace={this.namespace}
        data={data}
        projectDetail={projectDetail}
        onSave={this.handleContainer}
        onCancel={this.hideContainer}
        withService={withService}
        isFederated={isFederated}
        workspaceQuota={this.workspaceQuota}
        cluster={cluster}
        supportGpuSelect={supportGpuSelect}
        containers={this.containers}
        {...params}
      />
    )
  }

  renderDeployPlacementTip() {
    return (
      <div className={styles.tipBox}>
        <div className={styles.tipTitle}>{t('SPECIFY_REPLICAS')}</div>
        <p>{t('SPECIFY_REPLICAS_DESC')}</p>
        <br />
        <div className={styles.tipTitle}>{t('SPECIFY_WEIGHTS')}</div>
        <p>{t('SPECIFY_WEIGHTS_DESC')}</p>
      </div>
    )
  }

  renderDeployPlace() {
    const { projectDetail } = this.props

    return (
      <Form.Item
        className="margin-b12"
        label={t('POD_REPLICAS')}
        tip={this.renderDeployPlacementTip()}
      >
        <ClusterReplicasControl
          module={this.module}
          template={this.formTemplate}
          clusters={projectDetail.clusters}
          onClusterUpdate={this.handleClusterUpdate}
          omitAlias={12}
        />
      </Form.Item>
    )
  }

  renderDeployMode() {
    const { projectDetail } = this.props

    return (
      <div className="margin-b12">
        <div className={styles.formTip}>
          <span className={styles.tipLabel}>
            {t('REPLICA_SCHEDULING_MODE')}
          </span>
          <Tooltip placement="right" content={this.renderDeployPlacementTip()}>
            <Icon name="question" size="20"></Icon>
          </Tooltip>
        </div>
        <Form.Item>
          <ClusterReplicasControl
            module={this.module}
            template={this.formTemplate}
            clusters={projectDetail.clusters}
            onClusterUpdate={this.handleClusterUpdate}
            store={this.props.store}
            omitAlias={12}
          />
        </Form.Item>
      </div>
    )
  }

  renderReplicasControl() {
    if (this.module === 'daemonsets') {
      return null
    }

    const { isFederated, store } = this.props

    if (isFederated) {
      return store.renderScheduleTab
        ? this.renderDeployMode()
        : this.renderDeployPlace()
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
        label={t('CONTAINERS')}
        rules={[{ validator: this.containersValidator }]}
        ref={this.containerRef}
      >
        <ContainerList
          name={`${this.prefix}spec.containers`}
          onShow={this.showContainer}
          onDelete={this.handleDelete}
          specTemplate={specTemplate}
          leftQuota={this.state.leftQuota}
          projectDetail={this.props.projectDetail}
          replicas={this.state.replicas}
          isEdit={this.props.isEdit}
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

  renderTerminationSeconds() {
    return (
      <div className="margin-b12">
        <Form.Group
          label={t('POD_GRACE_PERIOD')}
          desc={t('POD_GRACE_PERIOD_DESC')}
          keepDataWhenUnCheck
          checkable
        >
          <TerminationSeconds prefix={this.prefix} />
        </Form.Group>
      </div>
    )
  }

  renderMetadata() {
    return (
      <div className="margin-b12">
        <Form.Group
          label={t('ADD_METADATA')}
          desc={t('POD_ADD_METADATA_DESC')}
          keepDataWhenUnCheck
          checkable
        >
          <Metadata />
        </Form.Group>
      </div>
    )
  }

  render() {
    const { formRef } = this.props
    const { showContainer, selectContainer } = this.state

    const annotationOfImagePullSecrets = JSON.parse(
      get(
        this.fedFormTemplate,
        'metadata.annotations["kubesphere.io/imagepullsecrets"]',
        '{}'
      )
    )

    if (showContainer) {
      return this.renderContainerForm({
        ...selectContainer,
        annotationOfImagePullSecrets,
      })
    }

    return (
      <Form data={this.fedFormTemplate} ref={formRef}>
        {this.renderReplicasControl()}
        {this.renderContainerList()}
        {this.renderUpdateStrategy()}
        {this.renderPodSecurityContext()}
        {this.renderPodAffinity()}
        {this.renderTerminationSeconds()}
        {this.renderMetadata()}
      </Form>
    )
  }
}
