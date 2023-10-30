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

import {
  capitalize,
  get,
  set,
  has,
  merge,
  pick,
  isEmpty,
  omit,
  omitBy,
  find,
  keyBy,
  includes,
  cloneDeep,
  isUndefined,
} from 'lodash'
import {
  safeParseJSON,
  getDescription,
  getAliasName,
  getResourceCreator,
  replaceToLocalOrigin,
  getLocalTime,
  formaDayTime,
} from 'utils'

import { safeAtob } from 'utils/base64'
import { getWorkloadUpdateTime, getJobUpdateTime } from 'utils/workload'
import { getServiceType } from 'utils/service'
import { getNodeRoles } from 'utils/node'
import { getPodStatusAndRestartCount } from 'utils/status'
import { FED_ACTIVE_STATUS, SERVICE_TYPES } from 'utils/constants'
import moment from 'moment-mini'

const getOriginData = item =>
  omit(item, [
    'status',
    'metadata.uid',
    'metadata.selfLink',
    'metadata.generation',
    'metadata.ownerReferences',
    'metadata.resourceVersion',
    'metadata.creationTimestamp',
    'metadata.managedFields',
  ])

const getServedVersion = item => {
  const versions = get(item, 'spec.versions', [])
  if (versions.length === 0) {
    return ''
  }
  let servedVersion = get(versions[versions.length - 1], 'name')
  versions.some(ver => {
    if (get(ver, 'served', false)) {
      servedVersion = get(ver, 'name', servedVersion)
      return true
    }
    return false
  })
  return servedVersion
}

const getBaseInfo = item => ({
  uid: get(item, 'metadata.uid'),
  name: get(item, 'metadata.name'),
  creator: getResourceCreator(item),
  description: getDescription(item),
  aliasName: getAliasName(item),
  createTime: get(item, 'metadata.creationTimestamp', ''),
  resourceVersion: get(item, 'metadata.resourceVersion'),
  isFedManaged: get(item, 'metadata.labels["kubefed.io/managed"]') === 'true',
})

const DefaultMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  spec: get(item, 'spec'),
  _originData: getOriginData(item),
})

const CRDEditMapper = item => {
  return {
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    spec: get(item, 'spec'),
    _originData: omit(item, [
      'metadata.uid',
      'metadata.selfLink',
      'metadata.generation',
      'metadata.ownerReferences',
      'metadata.resourceVersion',
      'metadata.creationTimestamp',
      'metadata.managedFields',
    ]),
  }
}

const WorkspaceMapper = item => {
  const overrides = get(item, 'spec.overrides', [])
  const template = get(item, 'spec.template', {})
  const clusters = get(item, 'spec.placement.clusters', [])

  const overrideClusterMap = keyBy(overrides, 'clusterName')
  const clusterTemplates = {}
  clusters.forEach(({ name }) => {
    clusterTemplates[name] = cloneDeep(template)
    if (overrideClusterMap[name] && overrideClusterMap[name].clusterOverrides) {
      overrideClusterMap[name].clusterOverrides.forEach(cod => {
        const path = cod.path.startsWith('/') ? cod.path.slice(1) : cod.path
        set(clusterTemplates[name], path.replace(/\//g, '.'), cod.value)
      })
    }
  })

  return {
    ...getBaseInfo(item),
    annotations: get(item, 'metadata.annotations', {}),
    manager:
      get(item, 'spec.template.spec.manager') ||
      get(item, 'spec.manager') ||
      getResourceCreator(item),
    clusters,
    networkIsolation: get(item, 'spec.template.spec.networkIsolation'),
    overrides,
    clusterTemplates,
    _originData: getOriginData(item),
  }
}

const UserMapper = item => ({
  ...getBaseInfo(item),
  username: get(item, 'metadata.name', ''),
  email: get(item, 'spec.email', ''),
  role: get(item, 'metadata.annotations["iam.kubesphere.io/role"]', ''),
  globalrole: get(
    item,
    'metadata.annotations["iam.kubesphere.io/globalrole"]',
    ''
  ),
  clusterrole: get(
    item,
    'metadata.annotations["iam.kubesphere.io/clusterrole"]',
    ''
  ),
  workspacerole: get(
    item,
    'metadata.annotations["iam.kubesphere.io/workspacerole"]',
    ''
  ),
  roleBind: get(
    item,
    'metadata.annotations["iam.kubesphere.io/role-binding"]',
    ''
  ),
  groups: get(item, 'spec.groups', []),
  status: get(item, 'status.state', 'Pending'),
  conditions: get(item, 'status.conditions', []),
  lastLoginTime: get(item, 'status.lastLoginTime'),
  _originData: getOriginData(item),
})

const NamespaceMapper = item => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]', ''),
  status: get(item, 'status.phase'),
  isFedHostNamespace:
    get(item, 'metadata.labels["kubesphere.io/kubefed-host-namespace"]') ===
    'true',
  _originData: getOriginData(item),
})

const WorkLoadMapper = item => ({
  ...getBaseInfo(item),
  kind: get(item, 'kind'),
  updateTime: getWorkloadUpdateTime(item),
  labels: get(item, 'metadata.labels', {}),
  namespace: get(item, 'metadata.namespace'),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status', {}),
  availablePodNums: get(item, 'status.availableReplicas', 0),
  readyPodNums: get(item, 'status.readyReplicas', 0),
  spec: get(item, 'spec', {}),
  podNums: get(item, 'spec.replicas', 0),
  selector: get(item, 'spec.selector.matchLabels'),
  containers: get(item, 'spec.template.spec.containers'),
  initContainers: get(item, 'spec.template.spec.initContainers'),
  volumes: get(item, 'spec.template.spec.volumes'),
  strategy: get(item, 'spec.strategy', {}),
  updateStrategy: get(item, 'spec.updateStrategy.type'),
  availableCondition:
    get(item, 'status.conditions', []).find(cd => cd.type === 'Available') ||
    {},
  app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
  ownerReference: get(item, 'metadata.ownerReferences[0]', {}),
  hasS2i: Object.keys(get(item, 'metadata.labels', {})).some(labelKey =>
    labelKey.startsWith('s2ibuilder')
  ),
  builderNames: Object.entries(get(item, 'metadata.labels', {}))
    .filter(labelArray => labelArray[0].startsWith('s2ibuilder'))
    .map(array => array[1]), // polyfill for multi s2i in one workload
  _originData: getOriginData(item),
})

const RevisionMapper = item => {
  const spec = get(item, 'data.spec', get(item, 'spec', {}))

  return {
    spec,
    ...getBaseInfo(item),
    ownerKind: get(item, 'metadata.ownerReferences[0].kind', ''),
    ownerName: get(item, 'metadata.ownerReferences[0].name', ''),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations'),
    revision:
      Number(
        get(
          item,
          'metadata.annotations["deployment.kubernetes.io/revision"]',
          item.revision
        )
      ) || null,
    status: get(item, 'status'),
    podNums: get(spec, 'replicas'),
    selector: get(spec, 'selector.matchLabels'),
    containers: get(spec, 'template.spec.containers'),
    initContainers: get(spec, 'template.spec.initContainers'),
    volumes: get(spec, 'template.spec.volumes'),
    strategy: get(spec, 'strategy', {}),
    updateStrategy: get(spec, 'updateStrategy.type'),
    _originData: getOriginData(item),
  }
}

const JobMapper = item => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels', {}),
  namespace: get(item, 'metadata.namespace'),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status'),
  updateTime: getJobUpdateTime(item),
  startTime: get(item, 'status.startTime'),
  spec: get(item, 'spec', {}),
  selector: get(item, 'spec.selector.matchLabels'),
  containers: get(item, 'spec.template.spec.containers'),
  volumes: get(item, 'spec.template.spec.volumes'),
  _originData: getOriginData(item),
})

const S2IBuildersMapper = item => {
  const sourceUrl = get(item, 'spec.config.sourceUrl', '')

  return {
    ...getBaseInfo(item),
    serviceName: get(item, 'metadata.annotations.serviceName'),
    displayName: get(item, 'metadata.annotations.displayName'),
    createTime: get(item, 'metadata.creationTimestamp'),
    labels: get(item, 'metadata.labels', {}),
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations'),
    status: get(item, 'status'),
    spec: get(item, 'spec', {}),
    selector: get(item, 'spec.selector.matchLabels'),
    containers: get(item, 'spec.template.spec.containers'),
    tag: get(item, 'spec.config.tag', ''),
    sourceUrl: get(item, 'spec.config.isBinaryURL', '')
      ? replaceToLocalOrigin(sourceUrl)
      : sourceUrl,
    type: get(item, 'metadata.labels["s2i-type.kubesphere.io"]', 's2i'),
    module: get(item, 'kind')
      ? `${get(item, 'kind').toLowerCase()}s`
      : 's2ibuilders',
    _originData: getOriginData(item),
  }
}

const S2IRunsMappper = item => {
  let status = get(item, 'status.runState', '')
  status = status === 'Running' ? 'Building' : status

  return {
    ...getBaseInfo(item),
    status,
    isBinary: !isEmpty(get(item, 'metadata.["s2ibinary-name.kubesphere.io"]')),
    binaryName: get(item, 'status.s2iBuildSource.binaryName', '-'),
    binarySize: get(item, 'status.s2iBuildSource.binarySize', '-'),
    generation: get(item, 'metadata.generation', ''),
    startTime: get(item, 'status.startTime', ''),
    completionTime: get(item, 'status.completionTime', ''),
    info: get(item, 'status', {}),
    newTag: get(item, 'spec.newTag', ''),
    branch: get(item, 'spec.status.s2iBuildResult.revisionId', ''),
    imageName: get(item, 'status.s2iBuildResult.imageName', ''),
    imageSize: get(item, 'status.s2iBuildResult.imageSize', 0),
    commandPull: get(item, 'status.s2iBuildResult.commandPull', ''),
    imageCreated: get(item, 'status.s2iBuildResult.imageCreated', ''),
    sourceUrl: get(item, 'status.s2iBuildSource.sourceUrl', ''),
    builderImage: get(item, 'status.s2iBuildSource.builderImage', ''),
    revisionId: get(item, 'status.s2iBuildSource.revisionId', ''),
    logURL: get(item, 'status.logURL'),
    _originData: item,
  }
}

const CronJobMapper = item => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels', {}),
  namespace: get(item, 'metadata.namespace'),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status'),
  spec: get(item, 'spec', {}),
  selector: get(item, 'spec.jobTemplate.metadata.labels'),
  suspend: get(item, 'spec.suspend'),
  _originData: getOriginData(item),
})

const HpaMapper = item => {
  const currentMetrics = keyBy(
    get(item, 'status.currentMetrics') || [],
    metric => get(metric, 'resource.name')
  )

  return {
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations'),
    status: get(item, 'status'),
    minReplicas: get(item, 'spec.minReplicas', 0),
    maxReplicas: get(item, 'spec.maxReplicas', 0),
    currentReplicas: get(item, 'status.currentReplicas', 0),
    desiredReplicas: get(item, 'status.desiredReplicas', 0),
    cpuCurrentUtilization: get(
      currentMetrics,
      'cpu.resource.current.averageUtilization'
    ),
    cpuTargetUtilization: get(
      item,
      'metadata.annotations.cpuTargetUtilization'
    ),
    memoryCurrentValue: get(
      currentMetrics,
      'memory.resource.current.averageValue',
      0
    ),
    memoryTargetValue: get(item, 'metadata.annotations.memoryTargetValue', ''),
    _originData: getOriginData(item),
  }
}

const NodeMapper = item => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels'),
  role: getNodeRoles(get(item, 'metadata.labels')),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status'),
  conditions: get(item, 'status.conditions', []),
  nodeInfo: get(item, 'status.nodeInfo'),
  spec: get(item, 'spec'),
  unschedulable: get(item, 'spec.unschedulable'),
  importStatus: get(
    item,
    'metadata.labels["kubekey.kubesphere.io/import-status"]',
    'success'
  ),
  taints: get(item, 'spec.taints', []),
  ip:
    (get(item, 'status.addresses', []).find(a => a.type === 'InternalIP') || {})
      .address || '-',
  _originData: getOriginData(item),
})

const RegistryMapper = item => ({
  name: get(item, 'display_name'),
  ...item,
})

const getContainers = (containers, statuses, namespace) =>
  containers.map(container => {
    const status = omit(
      statuses.find(item => item.name === container.name) || {},
      'image'
    )

    return {
      ...container,
      ...status,
      namespace,
    }
  })

const PodsMapper = item => ({
  ...getBaseInfo(item),
  deletionTime: get(item, 'metadata.deletionTimestamp'),
  labels: get(item, 'metadata.labels'),
  namespace: get(item, 'metadata.namespace'),
  annotations: get(item, 'metadata.annotations'),
  podNums: get(item, 'spec.replicas'),
  status: get(item, 'status', {}),
  podStatus: getPodStatusAndRestartCount(item),
  spec: get(item, 'spec', {}),
  metrics: get(item, 'metrics'),
  node: get(item, 'spec.nodeName', ''),
  nodeIp: get(item, 'status.hostIP', 'none'),
  podIp: get(item, 'status.podIP'),
  networksStatus: safeParseJSON(
    get(item, 'metadata.annotations["k8s.v1.cni.cncf.io/networks-status"]', ''),
    []
  ),
  app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
  containers: getContainers(
    get(item, 'spec.containers', []),
    get(item, 'status.containerStatuses', []),
    get(item, 'metadata.namespace')
  ),
  initContainers: getContainers(
    get(item, 'spec.initContainers', []),
    get(item, 'status.initContainerStatuses', []),
    get(item, 'metadata.namespace')
  ),
  startTime: get(item, 'status.startTime'),
  updateTime: get(item, 'status.startTime'),
  volumes: get(item, 'spec.volumes'),
  ownerKind: get(item, 'metadata.ownerReferences[0].kind', ''),
  ownerName: get(item, 'metadata.ownerReferences[0].name', ''),
  _originData: getOriginData(item),
})

const EventsMapper = item => {
  const now = Date.now()

  item.lastTimestamp = item.lastTimestamp || now

  const age =
    item.count > 1
      ? item.count === 2
        ? t.html('EVENT_AGE_DATA_TWICE', {
            lastTime: moment(item.lastTimestamp).fromNow(),
            duration: moment(item.firstTimestamp).to(now, true),
          })
        : t.html('EVENT_AGE_DATA', {
            lastTime: moment(item.lastTimestamp).fromNow(),
            count: item.count,
            duration: moment(item.firstTimestamp).to(now, true),
          })
      : moment(item.firstTimestamp).fromNow()

  return {
    ...getBaseInfo(item),
    age,
    type: get(item, 'type'),
    reason: get(item, 'reason'),
    message: get(item, 'message'),
    from: get(item, 'source.component'),
    lastTimestamp: item.lastTimestamp,
    _originData: getOriginData(item),
  }
}

const getVolumePhase = item => {
  const phase = get(item, 'status.phase')
  const deletionTime = get(item, 'metadata.deletionTimestamp')

  if (deletionTime) {
    return 'Terminating'
  }

  return phase
}

const VolumeMapper = item => {
  const deletionTime = get(item, 'metadata.deletionTimestamp')

  return {
    deletionTime,
    phase: getVolumePhase(item),
    ...getBaseInfo(item),
    storageProvisioner: get(
      item,
      'metadata.annotations["volume.beta.kubernetes.io/storage-provisioner"]'
    ),
    status: get(item, 'status', {}),
    conditions: get(item, 'status.conditions', []),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels'),
    annotations: get(item, 'metadata.annotations'),
    accessMode: get(item, 'spec.accessModes[0]'),
    accessModes: get(item, 'spec.accessModes'),
    storageClassName: get(item, 'spec.storageClassName'),
    resources: get(item, 'spec.resources'),
    capacity: get(
      item,
      'status.capacity.storage',
      get(item, 'spec.resources.requests.storage')
    ),
    inUse:
      get(item, 'metadata.annotations["kubesphere.io/in-use"]') === 'true' ||
      get(item, 'status.phase') === 'Bound',
    type: 'pvc',
    _originData: getOriginData(item),
  }
}

const PVMapper = item => {
  const creationTime = get(item, 'metadata.creationTimestamp')

  return {
    creationTime,
    phase: getVolumePhase(item),
    ...getBaseInfo(item),
    storageProvisioner: get(
      item,
      'metadata.annotations["pv.kubernetes.io/provisioned-by"]'
    ),
    status: get(item, 'status', {}),
    resourceVersion: get(item, 'metadata.resourceVersion'),
    annotations: get(item, 'metadata.annotations'),
    labels: get(item, 'metadata.labels'),
    accessMode: get(item, 'spec.accessModes[0]'),
    accessModes: get(item, 'spec.accessModes'),
    storageClassName: get(item, 'spec.storageClassName'),
    capacity: get(
      item,
      'spec.capacity.storage',
      get(item, 'spec.resources.requests.storage')
    ),
    volumeHandle: get(item, 'spec.csi.volumeHandle'),
    inUse: get(item, 'metadata.annotations["kubesphere.io/in-use"]') === 'true',
    type: 'pvc',
    persistentVolumeReclaimPolicy: get(
      item,
      'spec.persistentVolumeReclaimPolicy'
    ),
    volumeMode: get(item, 'spec.volumeMode'),
    _originData: getOriginData(item),
  }
}

const StorageClassMapper = item => ({
  ...getBaseInfo(item),
  annotations: get(item, 'metadata.annotations', {}),
  default:
    get(
      item,
      'metadata.annotations["storageclass.kubernetes.io/is-default-class"]'
    ) === 'true' ||
    get(
      item,
      'metadata.annotations["storageclass.beta.kubernetes.io/is-default-class"]'
    ) === 'true',
  parameters: get(item, 'parameters'),
  provisioner: get(item, 'provisioner'),
  reclaimPolicy: get(item, 'reclaimPolicy'),
  volumeBindingMode: get(item, 'volumeBindingMode'),
  allowVolumeExpansion: get(item, 'allowVolumeExpansion'),
  supportSnapshot:
    get(
      item,
      "metadata.annotations['storageclass.kubesphere.io/support-snapshot']"
    ) === 'true',
  associationPVCCount: Number(
    get(item, 'metadata.annotations["kubesphere.io/pvc-count"]')
  ),
  _originData: getOriginData(item),
})

const ServiceMapper = item => {
  const specType = get(item, 'spec.type')
  const clusterIP = get(item, 'spec.clusterIP')
  const selector = get(item, 'spec.selector', {})

  return {
    type: getServiceType(item),
    clusterIP,
    selector,
    specType,
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    status: get(item, 'status'),
    ports: get(item, 'spec.ports', []),
    workloadType: get(
      item,
      'metadata.annotations["kubesphere.io/workloadType"]',
      'Deployment'
    ),
    sessionAffinity: get(item, 'spec.sessionAffinity'),
    externalIPs: get(item, 'spec.externalIPs', []),
    externalName: get(item, 'spec.externalName'),
    loadBalancerIngress: get(item, 'status.loadBalancer.ingress', []).map(
      lb => lb.ip || lb.hostname
    ),
    app:
      get(item, 'metadata.labels["app.kubernetes.io/name"]') ||
      get(item, 'metadata.labels.app'),
    _originData: getOriginData(item),
  }
}

const EndpointMapper = item => ({
  addresses: item.addresses || [],
  ports: item.ports || [],
})

const getRoleBaseInfo = (item, module) => {
  const baseInfo = getBaseInfo(item)

  const labels = get(item, 'metadata.labels', {})
  if (!labels['iam.kubesphere.io/role-template']) {
    switch (module) {
      case 'workspaceroles': {
        const name = baseInfo.name.slice(
          labels['kubesphere.io/workspace'].length + 1
        )
        if (globals.config.presetWorkspaceRoles.includes(name)) {
          baseInfo.description = t(
            `ROLE_WORKSPACE_${name.toUpperCase().replace(/-/g, '_')}`
          )
        }
        break
      }
      case 'globalroles': {
        const name = baseInfo.name
        if (globals.config.presetGlobalRoles.includes(name)) {
          baseInfo.description = t(
            `ROLE_${name.toUpperCase().replace(/-/g, '_')}`
          )
        }
        break
      }
      case 'clusterroles': {
        const name = baseInfo.name
        if (globals.config.presetClusterRoles.includes(name)) {
          baseInfo.description = t(
            `ROLE_${name.toUpperCase().replace(/-/g, '_')}`
          )
        }
        break
      }
      case 'roles': {
        const name = baseInfo.name
        if (globals.config.presetRoles.includes(name)) {
          baseInfo.description = t(
            `ROLE_PROJECT_${name.toUpperCase().replace(/-/g, '_')}`
          )
        }
        break
      }
      case 'devopsroles': {
        const name = baseInfo.name
        if (globals.config.presetRoles.includes(name)) {
          baseInfo.description = t(
            `ROLE_DEVOPS_${name.toUpperCase().replace(/-/g, '_')}`
          )
        }
        break
      }
      default:
    }
  }

  return baseInfo
}

const RoleMapper = (item, kind = 'roles') => ({
  ...getRoleBaseInfo(item, kind),
  labels: get(item, 'metadata.labels', {}),
  namespace: get(item, 'metadata.namespace'),
  annotations: get(item, 'metadata.annotations'),
  dependencies: safeParseJSON(
    get(item, 'metadata.annotations["iam.kubesphere.io/dependencies"]', ''),
    []
  ),
  roleTemplates: safeParseJSON(
    get(
      item,
      'metadata.annotations["iam.kubesphere.io/aggregation-roles"]',
      ''
    ),
    []
  ),
  rules: get(item, 'rules'),
  _originData: getOriginData(item),
})

const RoleBindMapper = item => ({
  ...getBaseInfo(item),
  role: get(item, 'roleRef.name'),
  users: item.subjects
    .filter(subject => subject.kind === 'User')
    .map(subject => subject.name),
  _originData: getOriginData(item),
})

const IngressMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  rules: get(item, 'spec.rules', []),
  tls: get(item, 'spec.tls', []),
  loadBalancerIngress: get(item, 'status.loadBalancer.ingress', []).map(
    lb => lb.ip || lb.hostname
  ),
  app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
  _originData: getOriginData(item),
})

const GatewayMapper = item => {
  item.apiVersion = 'gateway.kubesphere.io/v1alpha1'
  item.kind = 'Gateway'

  const loadBalancerIngress = get(item, 'status.loadBalancer.ingress', [])
  const lbSupport = get(
    item,
    "metadata.annotations['kubesphere.io/annotations']",
    ''
  )

  // get the first ipv4 ingress's ip, because the k8s can't support ipv6's colon
  const ingressItem = loadBalancerIngress.find(i => i.ip && !i.ip.includes(':'))
  const defaultIngressIPV4 = get(ingressItem, 'ip')

  return {
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'), // it's not metadata.namespace
    annotations: omit(
      get(item, 'spec.service.annotations', {}),
      'servicemesh.kubesphere.io/enabled'
    ),
    externalIPs: get(item, 'spec.externalIPs', []),
    ports: get(item, 'status.service', []),
    loadBalancerIngress: loadBalancerIngress.map(lb => lb.ip || lb.hostname),
    defaultIngress:
      defaultIngressIPV4 || get(loadBalancerIngress, '[0].hostname'),
    isHostName: !!get(loadBalancerIngress, '[0].hostname'),
    serviceMeshEnable:
      get(
        item,
        'spec.deployment.annotations["servicemesh.kubesphere.io/enabled"]'
      ) === 'true',
    replicas: get(item, 'spec.deployment.replicas'),
    type: get(item, 'spec.service.type'),
    config: get(item, 'spec.controller.config', {}),
    lb: lbSupport,
    _originData: getOriginData(item),
  }
}

const ConfigmapMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  data: get(item, 'data', {}),
  _originData: getOriginData(item),
})

const ServiceAccountMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  role: get(item, 'metadata.annotations["iam.kubesphere.io/role"]'),
  secrets: get(item, 'secrets', []),
  _originData: getOriginData(item),
})

const secretDataParser = data => {
  if (data.type === 'kubernetes.io/basic-auth') {
    return Object.entries(get(data, 'data', {})).reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: safeAtob(value) === 'undefined' ? '' : safeAtob(value),
      }),
      {}
    )
  }

  return Object.entries(get(data, 'data', {})).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        key === '.dockerconfigjson'
          ? safeParseJSON(safeAtob(value), {})
          : safeAtob(value),
    }),
    {}
  )
}

const SecretMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  type: get(item, 'type', ''),
  data: secretDataParser(item),
  isDefault:
    get(
      item,
      'metadata.annotations["secret.kubesphere.io/is-default-class"]'
    ) === 'true',
  _originData: getOriginData(item),
})

const LimitRangeMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  limit: get(item, 'spec.limits[0]', ''),
  _originData: getOriginData(item),
})

const getApplicationStatus = item => {
  const conditions = get(item, 'status.conditions', [])

  for (let index = 0; index < conditions.length; index++) {
    const condition = conditions[index]
    if (condition.type === 'Error' && condition.status === 'True') {
      return 'Error'
    }
    if (condition.type === 'Ready' && condition.status === 'True') {
      return 'Running'
    }
  }

  return 'Updating'
}

const getApplicationServices = item => {
  return get(item, 'status.components', [])
    .filter(com => com.kind === 'Service')
    .map(com => com.name)
}

const getApplicationWorkloads = item => {
  const workloadKinds = ['Deployment', 'StatefulSet']
  return get(item, 'status.components', [])
    .filter(com => workloadKinds.includes(com.kind))
    .map(com => com.name)
}

const getApplicationUpdateTime = item => {
  return get(item, 'status.conditions', []).reduce((max, cur = {}) => {
    const { lastUpdateTime } = cur
    if (!max) {
      return lastUpdateTime
    }
    if (!lastUpdateTime) {
      return max
    }
    return max > lastUpdateTime ? max : lastUpdateTime
  }, undefined)
}

const ApplicationMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  version: get(item, 'metadata.labels["app.kubernetes.io/version"]'),
  icon: get(item, 'spec.descriptor.icons[0].src'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  selector: get(item, 'spec.selector.matchLabels', {}),
  serviceMeshEnable:
    get(item, 'metadata.annotations["servicemesh.kubesphere.io/enabled"]') ===
    'true',
  status: getApplicationStatus(item),
  services: getApplicationServices(item),
  workloads: getApplicationWorkloads(item),
  updateTime: getApplicationUpdateTime(item),
  _originData: getOriginData(item),
})

const ServicePolicyMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  selector: get(item, 'spec.selector.matchLabels', {}),
  connectPoolEnable: !isEmpty(
    get(item, 'spec.template.spec.trafficPolicy.connectionPool')
  ),
  outlierDetectionEnable: !isEmpty(
    get(item, 'spec.template.spec.trafficPolicy.outlierDetection')
  ),
  _originData: getOriginData(item),
})

const StrategyMapper = item => {
  const type = get(item, 'spec.type')
  const principal = get(item, 'spec.principal')
  const governor = get(item, 'spec.governor')
  const http =
    get(item, 'spec.template.spec.http') ||
    get(item, 'spec.template.spec.tcp', [])
  const byContent = http.some(it => !!it.match && it.match.length > 0)

  const protocol = !isEmpty(get(item, 'spec.template.spec.http'))
    ? 'http'
    : 'tcp'

  set(item, 'spec.protocol', protocol)

  const props = { type, principal, governor, protocol }

  if (type === 'Bluegreen' || (type === 'Canary' && !byContent)) {
    const routes = get(http, '[0].route', [])
    props.oldRoute =
      routes.find(route => get(route, 'destination.subset') === principal) || {}
    props.newRoute =
      routes.find(route => get(route, 'destination.subset') !== principal) || {}
    props.newVersion = get(props.newRoute, 'destination.subset')
    props.oldVersion = get(props.oldRoute, 'destination.subset')
  } else if (type === 'Canary' && byContent) {
    const newHttp = http.find(it => !!it.match) || {}
    const oldHttp = http.find(it => !it.match) || {}
    props.newRoute = { ...get(newHttp, 'route[0]', {}), match: newHttp.match }
    props.oldRoute = get(oldHttp, 'route[0]', {})
    props.newVersion = get(props.newRoute, 'destination.subset')
    props.oldVersion = get(props.oldRoute, 'destination.subset')
    props.byContent = true
  } else if (type === 'Mirror') {
    const http0 = http[0] || {}
    props.oldRoute = get(http0, 'route[0]')
    props.mirror = http0.mirror
    props.newVersion = get(props.mirror, 'subset')
    props.oldVersion = get(props.oldRoute, 'destination.subset')
    props.governor = props.oldVersion
  }

  props.hosts = get(item, 'spec.template.spec.hosts[0]')

  props.oldWorkloadName = get(
    item,
    'metadata.annotations["servicemesh.kubesphere.io/oldWorkloadName"]',
    `${props.hosts}-${props.oldVersion}`
  )
  props.newWorkloadName = get(
    item,
    'metadata.annotations["servicemesh.kubesphere.io/newWorkloadName"]',
    `${props.hosts}-${props.newVersion}`
  )

  return {
    ...props,
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    selector: get(item, 'spec.selector.matchLabels'),
    status: get(item, 'spec.assemblyPhase'),
    _originData: getOriginData(item),
  }
}

const findCodeDetail = (messures, key, path, defaultValue) => {
  const detail = find(
    messures,
    item => item.metric === key || item.val === key,
    {}
  )
  return get(detail, path || 'value', defaultValue || '')
}

const LogOutPutMapper = item => {
  const { metadata, spec } = item
  const rules = pick(spec, ['es', 'kafka', 'forward', 'opensearch'])
  const type = get(Object.keys(rules), '[0]', '')
  const address =
    type === 'kafka'
      ? get(rules, 'kafka.brokers')
      : `${get(rules, `${type}.host`)}:${get(rules, `${type}.port`)}`

  return {
    uid: metadata.uid,
    creationTimestamp: metadata.creationTimestamp,
    rules: pick(spec, ['es', 'kafka', 'forward']),
    type,
    name: metadata.name,
    address,
    enabled:
      get(metadata, 'labels["logging.kubesphere.io/enabled"]') === 'true',
    config: spec[type],
    component: get(metadata, 'labels["logging.kubesphere.io/component"]'),
    _originData: item,
  }
}

const CodeQualityMapper = item => {
  const messures = get(item, 'measures.component.measures', [])
  const severities = find(
    get(item, 'issues.facets', []),
    facetsItem => facetsItem.property === 'severities',
    {}
  ).values

  return {
    totalCode: findCodeDetail(messures, 'ncloc', '', 0),
    bugRating: findCodeDetail(messures, 'reliability_rating', '', 1),
    bugs: findCodeDetail(messures, 'bugs', '', 0),
    securityRating: findCodeDetail(messures, 'security_rating', '', 1),
    vulnerabilities: findCodeDetail(messures, 'vulnerabilities', '', 0),
    codeSmells: findCodeDetail(messures, 'code_smells', '', 0),
    coverage: findCodeDetail(messures, 'coverage', '', '0.0'),
    totalStatus: findCodeDetail(messures, 'quality_gate_details', ''),
    critical: findCodeDetail(severities, 'CRITICAL', 'count', 0),
    major: findCodeDetail(severities, 'MAJOR', 'count', 0),
    minor: findCodeDetail(severities, 'MINOR', 'count', 0),
    info: findCodeDetail(severities, 'INFO', 'count', 0),
    blocker: findCodeDetail(severities, 'blocker', 'count', 0),
    issues: get(item, 'issues.issues', []),
    sonarqubeDashboardUrl: get(item, 'jenkinsAction.sonarqubeDashboardUrl', ''),
    key: get(item, 'measures.component.key', ''),
  }
}

const ImageDetailMapper = detail => {
  const layers = get(detail, 'imageManifest.layers', [])
  const size = layers.reduce((prev, layer) => prev + layer.size, 0)
  return {
    imageTag: get(detail, 'imageTag', ''),
    message: get(detail, 'message', ''),
    registry: get(detail, 'registry', ''),
    layers: layers.length,
    createTime: get(detail, 'created', ''),
    size,
    exposedPorts: Object.keys(get(detail, 'config.ExposedPorts', {})),
    status: get(detail, 'status', ''),
    slug: get(detail, 'slug', ''),
  }
}

const VolumeSnapshotMapper = detail => {
  const { spec = {}, status = {}, metadata = {} } = detail
  const { error = {}, readyToUse } = status
  const { message } = error
  const { namespace = '', deletionTimestamp = '' } = metadata
  const snapshotSourceName = get(spec, 'source.persistentVolumeClaimName')

  return {
    ...getBaseInfo(detail),
    snapshotClassName: get(spec, 'volumeSnapshotClassName', '-'),
    restoreSize: get(status, 'restoreSize', 0),
    error,
    errorMessage: message,
    generating: !readyToUse && isEmpty(error),
    readyToUse,
    backupStatus: deletionTimestamp
      ? 'deleting'
      : readyToUse
      ? 'success'
      : 'updating',
    namespace,
    snapshotSourceName,
    _originData: getOriginData(detail),
  }
}

const VolumeSnapshotContentMapper = detail => {
  const { spec = {}, status = {}, metadata = {} } = detail
  const { deletionTimestamp = '', creationTimestamp = '' } = metadata
  const { error = {}, readyToUse, snapshotHandle } = status
  const { message } = error

  return {
    ...getBaseInfo(detail),
    creationTimestamp,
    deletionTimestamp,
    namespace: get(spec, 'volumeSnapshotRef.namespace'),
    snapshotClassName: get(spec, 'volumeSnapshotClassName', '-'),
    volumeSnapshot: get(spec, 'volumeSnapshotRef.name'),
    annotations: get(detail, 'metadata.annotations'),
    labels: get(detail, 'metadata.labels'),
    deletionPolicy: get(spec, 'deletionPolicy', '-'),
    driver: get(spec, 'driver', ''),
    source: get(spec, 'source', {}),
    error,
    errorMessage: message,
    generating: !readyToUse && isEmpty(error),
    readyToUse,
    status: readyToUse ? 'ready' : 'unready',
    snapshotHandle,
    restoreSize: get(status, 'restoreSize', 0),
    _originData: getOriginData(detail),
  }
}

const VolumeSnapshotClassesMapper = detail => {
  const { metadata = {}, apiVersion, driver, deletionPolicy, kind } = detail
  const { deletionTimestamp = '', creationTimestamp = '' } = metadata

  return {
    ...getBaseInfo(detail),
    apiVersion,
    driver,
    deletionPolicy,
    kind,
    count: get(metadata, 'annotations["kubesphere.io/snapshot-count"]', 0),
    creationTimestamp,
    deletionTimestamp,
    _originData: detail,
  }
}

const ClusterMapper = item => {
  const conditions = keyBy(get(item, 'status.conditions', []), 'type')
  const configz = get(item, 'status.configz', {})
  configz.ksVersion = get(item, 'status.kubeSphereVersion', '')

  const expiredDate = get(
    conditions,
    'KubeConfigCertExpiresInSevenDays.message',
    undefined
  )

  const expiredDay = expiredDate
    ? formaDayTime(getLocalTime(expiredDate) - new Date())
    : undefined

  return {
    ...getBaseInfo(item),
    conditions,
    configz,
    provider: get(item, 'spec.provider'),
    isHost: has(
      get(item, 'metadata.labels', {}),
      'cluster-role.kubesphere.io/host'
    ),
    expiredDay,
    kkName: get(item, 'metadata.labels["kubekey.kubesphere.io/name"]', ''),
    nodeCount: get(item, 'status.nodeCount'),
    kubernetesVersion: get(item, 'status.kubernetesVersion'),
    labels: get(item, 'metadata.labels'),
    group: get(item, 'metadata.labels["cluster.kubesphere.io/group"]', ''),
    isReady: globals.app.isMultiCluster
      ? get(conditions, 'Ready.status') === 'True'
      : true,
    visibility: get(
      item,
      'metadata.labels["cluster.kubesphere.io/visibility"]'
    ),
    connectionType: get(item, 'spec.connection.type'),
    _originData: getOriginData(item),
  }
}

const KKClusterMapper = item => {
  return {
    ...getBaseInfo(item),
    status: get(item, 'status', {}),
    labels: get(item, 'metadata.labels'),
    _originData: getOriginData(item),
  }
}

const FederatedMapper = resourceMapper => item => {
  const baseInfo = getBaseInfo(item)
  const overrides = get(item, 'spec.overrides', [])
  const template = cloneDeep(get(item, 'spec.template', {}))
  const clusters = get(item, 'spec.placement.clusters', [])
  const overrideClusterMap = keyBy(overrides, 'clusterName')
  const clusterTemplates = {}
  clusters.forEach(({ name }) => {
    clusterTemplates[name] = cloneDeep(template)
    if (overrideClusterMap[name] && overrideClusterMap[name].clusterOverrides) {
      overrideClusterMap[name].clusterOverrides.forEach(cod => {
        const path = cod.path.startsWith('/') ? cod.path.slice(1) : cod.path
        set(clusterTemplates[name], path.replace(/\//g, '.'), cod.value)
      })
    }
  })

  const type =
    get(template, 'spec.clusterIP') === 'None'
      ? SERVICE_TYPES.Headless
      : SERVICE_TYPES.VirtualIP

  const resourceInfo = omitBy(
    resourceMapper(merge(template, { metadata: item.metadata })),
    isUndefined
  )

  return {
    ...resourceInfo,
    ...baseInfo,
    overrides,
    template,
    clusters,
    clusterTemplates,
    type,
    isFedManaged: true,
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
    status: get(item, 'metadata.deletionTimestamp')
      ? 'Deleting'
      : FED_ACTIVE_STATUS[item.kind] || 'Active',
    _originData: getOriginData(item),
  }
}

const DevOpsMapper = item => {
  const phase = get(item, 'status.phase')
  const syncStatusKey =
    'metadata.annotations["devopsproject.devops.kubesphere.io/syncstatus"]'
  const syncStatus = capitalize(get(item, syncStatusKey))

  const deletionTimestamp = get(item, 'metadata.deletionTimestamp')

  return {
    ...getBaseInfo(item),
    name: get(item, 'metadata.generateName'),
    devops: get(item, 'metadata.name'),
    workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]'),
    namespace: get(item, 'status.adminNamespace'),
    status: deletionTimestamp ? 'Terminating' : phase || syncStatus || 'Active',
    sourceRepos: get(item, 'spec.argo.sourceRepos', []),
    destinations: get(item, 'spec.argo.destinations', []),
    _originData: getOriginData(item),
  }
}

const PipelinesMapper = item => {
  const jenkinsKey =
    'metadata.annotations["pipeline.devops.kubesphere.io/jenkins-metadata"]'

  const pipelineObject = safeParseJSON(get(item, jenkinsKey), {})
  const ns = get(item, 'metadata.namespace')
  const name = get(item, 'metadata.name')
  const disabledBrancheNames = safeParseJSON(
    get(
      item,
      'metadata.annotations["pipeline.devops.kubesphere.io/jenkins-branches"]'
    ),
    []
  )
    .filter(i => i.disabled)
    .map(i => i.name)
  return {
    ...getBaseInfo(item),
    annotations: omit(get(item, 'metadata.annotations'), jenkinsKey),
    displayName: get(item, 'metadata.name'),
    fullDisplayName: `${ns}/${name}`,
    fullName: `${ns}/${name}`,
    status: get(
      item,
      'metadata.annotations["pipeline.devops.kubesphere.io/syncstatus"]'
    ),
    name,
    isMultiBranch: get(item, 'spec.type', '') === 'multi-branch-pipeline',
    type: get(item, 'spec.type', ''),
    numberOfPipelines: 0,
    numberOfFolders: 0,
    pipelineFolderNames: [],
    totalNumberOfBranches: 0,
    numberOfFailingBranches: 0,
    numberOfSuccessfulBranches: 0,
    numberOfFailingPullRequests: 0,
    numberOfSuccessfulPullRequests: 0,
    branchNames: [],
    parameters: [],
    disabled: false,
    weatherScore: 100,
    validate:
      get(
        item,
        'metadata.annotations["pipeline.devops.kubesphere.io/jenkinsfile.validate"]',
        'success'
      ) === 'success',

    // codeRepoKey: get(item, 'metadata.annotations["devops.codeRepo"]'),
    disabledBrancheNames,
    ...pipelineObject,
    _originData: getOriginData(item),
  }
}

const CRDMapper = item => {
  const versions = get(item, 'spec.versions', [])
  return {
    versions,
    ...getBaseInfo(item),
    group: get(item, 'spec.group'),
    scope: get(item, 'spec.scope'),
    kind: get(item, 'spec.names.kind'),
    latestVersion: getServedVersion(item),
    module: get(item, 'status.acceptedNames.plural'),
    _originData: getOriginData(item),
  }
}

const DashboardMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  title: get(item, 'spec.title'),
  datasource: get(item, 'spec.datasource'),
  _originData: getOriginData(item),
})

const NetworkPoliciesMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  _originData: getOriginData(item),
  key: `${get(item, 'metadata.namespace')}-${get(item, 'metadata.name')}`,
})

const IPPoolsMapper = item => {
  const baseInfo = getBaseInfo(item)
  return {
    ...baseInfo,
    cidr: get(item, 'spec.cidr'),
    status: get(item, 'status', {}),
    workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]', ''),
    isDefault: !isUndefined(
      get(item, 'metadata.labels["ippool.network.kubesphere.io/default"]')
    ),
    selector: {
      'ippool.network.kubesphere.io/name': baseInfo.name,
    },
    _originData: getOriginData(item),
  }
}

const StorageclasscapabilitiesMapper = item => {
  const { metadata, spec } = item
  const volumeFeature = get(spec, 'features.volume')
  return {
    metadata,
    spec,
    snapshotFeature: get(spec, 'features.snapshot'),
    volumeFeature,
    supportExpandVolume: includes(
      ['OFFLINE', 'ONLINE'],
      volumeFeature.expandMode
    ),
  }
}

const ServiceMonitorMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  endpoints: get(item, 'spec.endpoints', []),
  _originData: getOriginData(item),
})

const GroupsMapper = item => ({
  ...getBaseInfo(item),
  key: get(item, 'metadata.name'),
  title: get(item, 'metadata.generateName'),
  group_id: get(item, 'metadata.name'),
  group_name: get(item, 'metadata.generateName'),
  alias_name: get(item, 'metadata.annotations["kubesphere.io/alias-name"]'),
  parent_id: get(item, 'metadata.labels["iam.kubesphere.io/group-parent"]'),
  _originData: getOriginData(item),
})

const AlertingRuleMapper = item => {
  const rules = safeParseJSON(get(item, 'spec.rules'), [])

  return {
    ...getBaseInfo(item),
    enabled: get(item, 'metadata.labels["alerting.kubesphere.io/enable"]'),
    interval: get(item, 'spec.interval', ''),
    rules,
    evaluationTime: get(item, 'status.evaluationTime', '-'),
    lastEvaluation: get(item, 'status.lastEvaluation', '-'),
    rulesStats: get(item, 'status.rulesStats', {}),
    rulesStatus: get(item, 'status.rulesStatus', []),
    _originData: getOriginData(item),
    _originDataWithStatus: cloneDeep(item),
  }
}

const CDSMapper = item => {
  const status = safeParseJSON(get(item, 'status.argoApp', ''), {})
  const syncStatus = get(status, 'sync.status')
  const healthStatus = get(status, 'health.status')
  const devops = get(item, 'devops')
  const argoApp = get(item, 'spec.argoApp', {})

  const repoSource = get(argoApp, 'spec.source', {})
  const destination = get(argoApp, 'spec.destination', {})
  const operation = get(argoApp, 'operation', {})
  const syncOptions = get(argoApp, 'spec.syncPolicy.syncOptions', [])
  const syncType = Object.keys(get(argoApp, 'spec.syncPolicy', {})).includes(
    'automated'
  )
    ? 'automated'
    : 'manual'
  const _syncOptions = {}

  if (syncOptions.length > 0) {
    syncOptions.forEach(syncOption => {
      const itemArrayValue = syncOption.split('=')
      _syncOptions[itemArrayValue[0]] = safeParseJSON(
        itemArrayValue[1],
        itemArrayValue[1]
      )
    })
  }

  // fluxcd
  const fluxAppType = get(item, 'metadata.labels.["gitops.kubepshere.io/type"]')
  const fluxAppReadyNum = get(
    item,
    'metadata.labels.["gitops.kubesphere.io/ready-number"]'
  )
  const fluxLastRevision = get(
    item,
    'metadata.annotations.["gitops.kubesphere.io/last-revision"]'
  )
  const fluxApp = get(item, 'spec.fluxApp', {})
  const fluxSource = get(fluxApp, 'spec.source.sourceRef')
  const fluxStatus = get(item, 'status.fluxApp', {})
  const fluxHelmReleaseStatus = get(fluxStatus, 'helmReleaseStatus', {})
  const fluxKustomizationStatus = get(fluxStatus, 'kustomizationStatus', {})

  return {
    ...getBaseInfo(item),
    syncStatus,
    healthStatus,
    status,
    devops,
    repoSource,
    destination,
    operation,
    syncType,
    syncOptions: _syncOptions,
    fluxAppType,
    fluxAppReadyNum,
    fluxLastRevision,
    fluxSource,
    fluxHelmReleaseStatus,
    fluxKustomizationStatus,
    _originData: getOriginData(omit(item, 'devops')),
  }
}

const CodeRepoMapper = item => {
  const spec = get(item, 'spec', {})

  return {
    ...getBaseInfo(item),
    provider: spec.provider,
    repoURL: spec.url,
    secret: spec.secret || {},
    webhooks: spec.webhooks || [],
    _originData: getOriginData(omit(item, 'devops')),
  }
}

export default {
  deployments: WorkLoadMapper,
  daemonsets: WorkLoadMapper,
  statefulsets: WorkLoadMapper,
  jobs: JobMapper,
  s2ibuilders: S2IBuildersMapper,
  s2iruns: S2IRunsMappper,
  cronjobs: CronJobMapper,
  namespaces: NamespaceMapper,
  revisions: RevisionMapper,
  horizontalpodautoscalers: HpaMapper,
  nodes: NodeMapper,
  edgenodes: NodeMapper,
  registries: RegistryMapper,
  pods: PodsMapper,
  events: EventsMapper,
  volumes: VolumeMapper,
  persistentvolumeclaims: VolumeMapper,
  persistentvolumes: PVMapper,
  storageclasses: StorageClassMapper,
  services: ServiceMapper,
  endpoints: EndpointMapper,
  ingresses: IngressMapper,
  roles: RoleMapper,
  clusterroles: RoleMapper,
  globalroles: RoleMapper,
  workspaceroles: RoleMapper,
  rolebinds: RoleBindMapper,
  gateway: GatewayMapper,
  configmaps: ConfigmapMapper,
  serviceaccounts: ServiceAccountMapper,
  secrets: SecretMapper,
  limitranges: LimitRangeMapper,
  applications: ApplicationMapper,
  strategies: StrategyMapper,
  servicepolicies: ServicePolicyMapper,
  workspaces: WorkspaceMapper,
  codequality: CodeQualityMapper,
  imageBlob: ImageDetailMapper,
  volumesnapshots: VolumeSnapshotMapper,
  volumesnapshotcontents: VolumeSnapshotContentMapper,
  volumesnapshotclasses: VolumeSnapshotClassesMapper,
  users: UserMapper,
  clusters: ClusterMapper,
  kkclusters: KKClusterMapper,
  federated: FederatedMapper,
  outputs: LogOutPutMapper,
  devops: DevOpsMapper,
  dashboards: DashboardMapper,
  clusterdashboards: DashboardMapper,
  customresourcedefinitions: CRDMapper,
  customresourcedefinitionsedit: CRDEditMapper,
  pipelines: PipelinesMapper,
  networkpolicies: NetworkPoliciesMapper,
  namespacenetworkpolicies: NetworkPoliciesMapper,
  ippools: IPPoolsMapper,
  storageclasscapabilities: StorageclasscapabilitiesMapper,
  servicemonitors: ServiceMonitorMapper,
  groups: GroupsMapper,
  default: DefaultMapper,
  rules: AlertingRuleMapper,
  cds: CDSMapper,
  codeRepos: CodeRepoMapper,
}
