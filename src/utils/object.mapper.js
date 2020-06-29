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
  get,
  set,
  pick,
  isEmpty,
  omit,
  uniqBy,
  find,
  keyBy,
  includes,
  cloneDeep,
} from 'lodash'
import {
  safeParseJSON,
  generateId,
  getDescription,
  getAliasName,
  getResourceCreator,
  replaceToLocalOrigin,
} from 'utils'
import { getWorkloadUpdateTime } from 'utils/workload'
import { getServiceType } from 'utils/service'
import { getNodeRoles } from 'utils/node'
import { getPodStatusAndRestartCount } from 'utils/status'

const getOriginData = item =>
  omit(item, [
    'status',
    'metadata.uid',
    'metadata.selfLink',
    'metadata.generation',
    'metadata.finalizers',
    'metadata.ownerReferences',
    'metadata.resourceVersion',
    'metadata.creationTimestamp',
    'metadata.managedFields',
  ])

const getBaseInfo = item => ({
  uid: get(item, 'metadata.uid'),
  name: get(item, 'metadata.name'),
  creator: getResourceCreator(item),
  description: getDescription(item),
  aliasName: getAliasName(item),
  createTime: get(item, 'metadata.creationTimestamp'),
  resourceVersion: get(item, 'metadata.resourceVersion'),
  isFedManaged: get(item, 'metadata.labels["kubefed.io/managed"]') === 'true',
})

const DefaultMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  _originData: getOriginData(item),
})

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
      get(item, 'spec.template.spec.manager') || getResourceCreator(item),
    clusters,
    networkIsolation:
      get(item, 'spec.template.spec.networkIsolation') === 'true',
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
  status: get(item, 'status.state', 'Pending'),
  conditions: get(item, 'status.conditions', []),
  _originData: getOriginData(item),
})

const NamespaceMapper = item => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]', ''),
  status: get(item, 'status.phase'),
  opRuntime: get(item, 'metadata.annotations.openpitrix_runtime'),
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
  volumes: get(item, 'spec.template.spec.volumes'),
  strategy: get(item, 'spec.strategy', {}),
  updateStrategy: get(item, 'spec.updateStrategy.type'),
  availableCondition:
    get(item, 'status.conditions', []).find(cd => cd.type === 'Available') ||
    {},
  app:
    get(item, 'metadata.labels.release') ||
    get(item, 'metadata.labels["app.kubernetes.io/name"]'),
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
  updateTime: get(item, 'status.startTime'),
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
  const targetMetrics = keyBy(get(item, 'spec.metrics') || [], metric =>
    get(metric, 'resource.name')
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
      targetMetrics,
      'cpu.resource.target.averageUtilization'
    ),
    memoryCurrentValue: get(
      currentMetrics,
      'memory.resource.current.averageValue',
      ''
    ),
    memoryTargetValue: get(
      targetMetrics,
      'memory.resource.target.averageValue',
      ''
    ),
    _originData: getOriginData(item),
  }
}

const NodeMapper = item => ({
  ...getBaseInfo(item),
  labels: get(item, 'metadata.labels'),
  role: getNodeRoles(get(item, 'metadata.labels')),
  annotations: get(item, 'metadata.annotations'),
  status: get(item, 'status'),
  conditions: get(item, 'status.conditions'),
  nodeInfo: get(item, 'status.nodeInfo'),
  spec: get(item, 'spec'),
  unschedulable: get(item, 'spec.unschedulable'),
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
  app:
    get(item, 'metadata.labels.release') ||
    get(item, 'metadata.labels["app.kubernetes.io/name"]'),
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

const EventsMapper = item => ({
  ...getBaseInfo(item),
  type: get(item, 'type'),
  reason: get(item, 'reason'),
  message: get(item, 'message'),
  startTime: get(item, 'firstTimestamp') || get(item, 'creationTimestamp'),
  endTime: get(item, 'lastTimestamp'),
  source: get(item, 'source.component'),
  _originData: getOriginData(item),
})

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
    inUse: get(item, 'metadata.annotations["kubesphere.io/in-use"]') === 'true',
    type: 'pvc',
    allowSnapshot:
      get(item, 'metadata.annotations["kubesphere.io/allow-snapshot"]') ===
      'true',
    _originData: getOriginData(item),
  }
}

const StorageClassMapper = item => ({
  ...getBaseInfo(item),
  annotations: get(item, 'metadata.annotations', {}),
  default:
    get(
      item,
      'metadata.annotations["storageclass.kubernetes.io/is-default-class"]',
      get(
        item,
        'metadata.annotations["storageclass.beta.kubernetes.io/is-default-class"]'
      )
    ) === 'true',
  parameters: get(item, 'parameters'),
  provisioner: get(item, 'provisioner'),
  reclaimPolicy: get(item, 'reclaimPolicy'),
  volumeBindingMode: get(item, 'volumeBindingMode'),
  allowVolumeExpansion: get(item, 'allowVolumeExpansion'),
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
    loadBalancerIngress: get(item, 'status.loadBalancer.ingress[0].ip'),
    app:
      get(item, 'metadata.labels.release') ||
      get(item, 'metadata.labels["app.kubernetes.io/name"]'),
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
  loadBalancerIngress: get(item, 'status.loadBalancer.ingress', []),
  app:
    get(item, 'metadata.labels.release') ||
    get(item, 'metadata.labels["app.kubernetes.io/name"]'),
  _originData: getOriginData(item),
})

const GatewayMapper = item => ({
  uid: get(item, 'metadata.uid'),
  namespace: get(item, 'metadata.labels.project'), // it's not metadata.namespace
  annotations: omit(
    get(item, 'metadata.annotations', {}),
    'servicemesh.kubesphere.io/enabled'
  ),
  createTime: get(item, 'metadata.creationTimestamp', {}),
  type: get(item, 'spec.type'),
  externalIPs: get(item, 'spec.externalIPs', []),
  ports: get(item, 'spec.ports', []),
  loadBalancerIngress: get(item, 'status.loadBalancer.ingress[0].ip'),
  serviceMeshEnable:
    get(item, 'metadata.annotations["servicemesh.kubesphere.io/enabled"]') ===
    'true',
  _originData: getOriginData(item),
})

const ConfigmapMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  labels: get(item, 'metadata.labels', {}),
  annotations: get(item, 'metadata.annotations', {}),
  data: get(item, 'data', {}),
  _originData: getOriginData(item),
})

const secretDataParser = data => {
  if (data.type === 'kubernetes.io/basic-auth') {
    return Object.entries(get(data, 'data', {})).reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: atob(value) === 'undefined' ? '' : atob(value),
      }),
      {}
    )
  }

  return Object.entries(get(data, 'data', {})).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        key === '.dockerconfigjson'
          ? safeParseJSON(atob(value), {})
          : atob(value),
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
      return 'Ready'
    }
  }

  return 'Updating'
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

  return {
    ...props,
    ...getBaseInfo(item),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    selector: get(item, 'spec.selector.matchLabels'),
    hosts: get(item, 'spec.template.spec.hosts[0]'),
    status: get(item, 'spec.assemblyPhase'),
    _originData: getOriginData(item),
  }
}

const AlertMapper = item => {
  const alertStatus = safeParseJSON(get(item, 'alert_status'), {})
  const policyConfig = safeParseJSON(get(item, 'policy_config'), {})
  const resourceFilter = safeParseJSON(get(item, 'rs_filter_param'), {})
  const resourceSelector = safeParseJSON(resourceFilter.selector, [])

  const targetCount = uniqBy(
    Object.keys(alertStatus.ResourceStatus || {}),
    resource => resource.split(' ').pop()
  ).length

  return {
    id: get(item, 'alert_id'),
    addressListId: get(item, 'nf_address_list_id'),
    name: get(item, 'alert_name'),
    displayName: get(item, 'policy_name'),
    desc: get(item, 'policy_description'),
    rulesCount: get(item, 'rules_count') || 0,
    alertStatus,
    targetCount,
    policyId: get(item, 'policy_id'),
    policyConfig,
    resourceId: get(item, 'rs_filter_id'),
    resourceType: get(item, 'rs_type_name'),
    resourceName: get(item, 'rs_filter_name'),
    resourceFilter,
    resourceSelector,
    workloadKind: get(resourceFilter, 'workload_kind'),
    metrics: get(item, 'metrics') || [],
    recentAlertTime: get(item, 'most_recent_alert_time'),
    availableStartTime: get(item, 'available_start_time'),
    availableEndTime: get(item, 'available_end_time'),
    createTime: (get(item, 'create_time.seconds') || 0) * 1000,
    creator: get(item, 'creator'),
    disabled: get(item, 'disabled'),
  }
}

const AlertRuleMapper = item => {
  const resources = get(item, 'resources') || []

  let alertStatus = isEmpty(resources) ? 'unknown' : 'cleared'
  resources.some(resource => {
    if (!resource.current_level) {
      alertStatus = 'unknown'
      return true
    }

    if (resource.current_level && resource.current_level !== 'cleared') {
      alertStatus = 'alerted'
      return true
    }

    return false
  })

  return {
    ...item,
    id: get(item, 'rule_id'),
    name: get(item, 'rule_name'),
    alertStatus,
    metricName: get(item, 'metric_name'),
    current_level: get(item, 'current_level'),
    createTime: (get(item, 'create_time.seconds') || 0) * 1000,
    updateTime: (get(item, 'update_time.seconds') || 0) * 1000,
  }
}

const AlertResourceMapper = item => {
  const resource_uri = safeParseJSON(get(item, 'resource_uri'), {})
  const selector = safeParseJSON(get(resource_uri, 'selector'), [])
  const node_id = (get(resource_uri, 'node_id') || '').split('|')
  const workload_name = (get(resource_uri, 'workload_name') || '').split('|')
  const workload_kind = get(resource_uri, 'workload_kind')

  return {
    ...item,
    createTime: (get(item, 'create_time.seconds') || 0) * 1000,
    updateTime: (get(item, 'update_time.seconds') || 0) * 1000,
    resource_uri,
    node_id,
    workload_name,
    workload_kind,
    selector,
  }
}

const AlertMessageMapper = item => {
  const notificationStatus = safeParseJSON(get(item, 'notification_status'), [])
  const resourceFilter = safeParseJSON(get(item, 'rs_filter_param'), {})

  let resources = ''
  switch (item.rs_type_name) {
    case 'node':
      resources = get(resourceFilter, 'node_id') || ''
      break
    case 'workload':
      resources = get(resourceFilter, 'workload_name') || ''
      break
    case 'pod':
      resources = get(resourceFilter, 'pod_name') || ''
      break
    default:
      break
  }

  let resourceName = ''
  let workloadKind = ''
  if (item.resource_name) {
    const data = String(item.resource_name).split(':')

    if (data.length > 1) {
      resourceName = get(data, '[1]')
      workloadKind = get(data, '[0]')
    } else {
      resourceName = get(data, '[0]')
      workloadKind = ''
    }
  }

  return {
    ...item,
    id: get(item, 'history_id'),
    name: get(item, 'history_name') || `history-${generateId()}`,
    alertName: get(item, 'alert_name'),
    ruleId: get(item, 'rule_id'),
    ruleName: get(item, 'rule_name'),
    namespace: get(resourceFilter, 'ns_name'),
    workloadKind,
    resourceType: get(item, 'rs_type_name'),
    resourceName,
    resources: resources.split('|'),
    metricName: get(item, 'metric_name'),
    createTime: (get(item, 'create_time.seconds') || 0) * 1000,
    updateTime: (get(item, 'update_time.seconds') || 0) * 1000,
    status: get(item, 'event'),
    notificationStatus,
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
  const rules = pick(spec, ['es', 'kafka', 'forward'])
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
    createTime: get(detail, 'imageBlob.created', ''),
    size,
    exposedPorts: Object.keys(
      get(detail, 'imageBlob.container_config.ExposedPorts', {})
    ),
    status: get(detail, 'status', ''),
    slug: get(detail, 'slug', ''),
  }
}

const VolumeSnapshotMapper = detail => {
  const { spec = {}, status = {}, metadata = {} } = detail
  const { error = {}, readyToUse } = status
  const { message } = error
  const { namespace = '' } = metadata
  const snapshotSourceName = get(spec, 'source.persistentVolumeClaimName')

  return {
    ...getBaseInfo(detail),
    snapshotClassName: get(spec, 'volumeSnapshotClassName', '-'),
    restoreSize: get(status, 'restoreSize', 0),
    error,
    errorMessage: message,
    generating: !readyToUse && isEmpty(error),
    readyToUse,
    backupStatus: readyToUse ? 'success' : message ? 'failed' : 'updating',
    namespace,
    snapshotSourceName,
  }
}

const ClusterMapper = item => {
  const conditions = keyBy(get(item, 'status.conditions', []), 'type')
  return {
    ...getBaseInfo(item),
    conditions,
    configz: get(item, 'status.configz', {}),
    provider: get(item, 'spec.provider'),
    isHost:
      get(
        item,
        'metadata.annotations["cluster.kubesphere.io/is-host-cluster"]'
      ) === 'true',
    nodeCount: get(item, 'status.nodeCount'),
    kubernetesVersion: get(item, 'status.kubernetesVersion'),
    labels: get(item, 'metadata.labels'),
    group: get(item, 'metadata.labels["cluster.kubesphere.io/group"]'),
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

const FederatedMapper = resourceMapper => item => {
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
    overrides,
    template,
    clusters,
    clusterTemplates,
    isFedManaged: true,
    resource: resourceMapper(template),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
    _originData: getOriginData(item),
  }
}

const DevOpsMapper = item => ({
  uid: get(item, 'metadata.uid'),
  name: get(item, 'metadata.name'),
  creator: getResourceCreator(item),
  description: getDescription(item),
  createTime: get(item, 'metadata.creationTimestamp'),
  workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]'),
  namespace: get(item, 'status.adminNamespace'),
  _originData: getOriginData(item),
})

const PipelinesMapper = item => ({
  ...getBaseInfo(item),
})

const CRDMapper = item => {
  const versions = get(item, 'spec.versions', [])
  return {
    versions,
    ...getBaseInfo(item),
    group: get(item, 'spec.group'),
    scope: get(item, 'spec.scope'),
    kind: get(item, 'spec.names.kind'),
    latestVersion: get(versions[versions.length - 1], 'name'),
    module: get(item, 'status.acceptedNames.plural'),
    _originData: getOriginData(item),
  }
}

const DashboardMapper = item => {
  const { metadata = {}, spec = {} } = item

  /**
   * name - uniqueName
   */
  const { creationTimestamp, name, namespace } = metadata

  /**
   * title - nickname
   */
  const { datasource, description, title } = spec

  return {
    creationTimestamp,
    name,
    namespace,
    datasource,
    description,
    title,
    _originData: item,
  }
}

const NetworkPoliciesMapper = item => ({
  ...getBaseInfo(item),
  namespace: get(item, 'metadata.namespace'),
  _originData: getOriginData(item),
  key: `${get(item, 'metadata.namespace')}-${get(item, 'metadata.name')}`,
})

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
  registries: RegistryMapper,
  pods: PodsMapper,
  events: EventsMapper,
  volumes: VolumeMapper,
  persistentvolumeclaims: VolumeMapper,
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
  secrets: SecretMapper,
  limitranges: LimitRangeMapper,
  applications: ApplicationMapper,
  strategies: StrategyMapper,
  servicepolicies: ServicePolicyMapper,
  alert: AlertMapper,
  alertrule: AlertRuleMapper,
  alertresource: AlertResourceMapper,
  alertmessage: AlertMessageMapper,
  workspaces: WorkspaceMapper,
  codequality: CodeQualityMapper,
  imageBlob: ImageDetailMapper,
  volumesnapshots: VolumeSnapshotMapper,
  users: UserMapper,
  clusters: ClusterMapper,
  federated: FederatedMapper,
  outputs: LogOutPutMapper,
  devops: DevOpsMapper,
  dashboards: DashboardMapper,
  customresourcedefinitions: CRDMapper,
  pipelines: PipelinesMapper,
  networkpolicies: NetworkPoliciesMapper,
  namespacenetworkpolicies: NetworkPoliciesMapper,
  storageclasscapabilities: StorageclasscapabilitiesMapper,
  default: DefaultMapper,
}
