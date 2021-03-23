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

import { get, cloneDeep, unset } from 'lodash'
import { MODULE_KIND_MAP } from './constants'

const getDeploymentTemplate = ({ namespace }) => ({
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {},
    },
    template: {
      metadata: { labels: {} },
      spec: {
        containers: [],
        serviceAccount: 'default',
      },
    },
    strategy: {
      type: 'RollingUpdate',
      rollingUpdate: {
        maxUnavailable: '25%',
        maxSurge: '25%',
      },
    },
  },
})

const getFederatedTemplate = ({ data, clusters, kind }) => {
  const namespace = get(data, 'metadata.namespace')

  const placement = { clusters: clusters.map(item => ({ name: item })) }

  const overrides = clusters.map(cluster => {
    const override = {
      clusterName: cluster,
      clusterOverrides: [],
    }

    return override
  })

  const template = cloneDeep(data)

  unset(template, 'apiVersion')
  unset(template, 'kind')
  unset(template, 'metadata.name')
  unset(template, 'metadata.annotations')

  return {
    apiVersion: 'types.kubefed.io/v1beta1',
    kind: `Federated${kind}`,
    metadata: { namespace },
    spec: { placement, template, overrides },
  }
}

const getDaemonSetTemplate = ({ namespace }) => ({
  apiVersion: 'apps/v1',
  kind: 'DaemonSet',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {},
    },
    template: {
      metadata: { labels: {} },
      spec: {
        containers: [],
        serviceAccount: 'default',
      },
    },
    updateStrategy: {
      type: 'RollingUpdate',
      rollingUpdate: {
        maxUnavailable: '20%',
      },
    },
    minReadySeconds: 0,
  },
})

const getStatefulSetTemplate = ({ namespace }) => ({
  apiVersion: 'apps/v1',
  kind: 'StatefulSet',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    replicas: 1,
    selector: {
      matchLabels: {},
    },
    template: {
      metadata: { labels: {} },
      spec: {
        containers: [],
        serviceAccount: 'default',
      },
    },
    updateStrategy: {
      type: 'RollingUpdate',
      rollingUpdate: {
        partition: 0,
      },
    },
  },
})

const getJobTemplate = ({ namespace }) => ({
  apiVersion: 'batch/v1',
  kind: 'Job',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    template: {
      metadata: { labels: {} },
      spec: {
        containers: [],
        restartPolicy: 'Never',
        serviceAccount: 'default',
      },
    },
  },
})

const getCronJobTemplate = ({ namespace }) => ({
  apiVersion: 'batch/v1beta1',
  kind: 'CronJob',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    concurrencyPolicy: 'Forbid',
    jobTemplate: {
      metadata: { labels: {} },
      spec: {
        template: {
          spec: {
            containers: [],
            restartPolicy: 'Never',
            serviceAccount: 'default',
          },
        },
      },
    },
  },
})

const getServiceTemplate = ({ namespace, selector = {} }) => ({
  apiVersion: 'v1',
  kind: 'Service',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    sessionAffinity: 'None',
    selector,
  },
})

const getIngressTemplate = ({ namespace }) => ({
  apiVersion: 'extensions/v1beta1',
  kind: 'Ingress',
  metadata: {
    namespace,
    labels: {},
  },
  spec: {
    rules: [],
  },
})

const getConfigmapTemplate = ({ namespace }) => ({
  apiVersion: 'v1',
  kind: 'ConfigMap',
  metadata: {
    namespace,
    labels: {},
  },
})

const getServiceAccountTemplate = ({ namespace }) => ({
  apiVersion: 'v1',
  kind: 'ServiceAccount',
  metadata: {
    namespace,
    labels: {},
  },
})

const getSecretTemplate = ({ namespace }) => ({
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    namespace,
    labels: {},
  },
  type: 'Opaque',
})

const getHorizontalPodAutoscalerTemplate = ({ name, namespace, target }) => ({
  apiVersion: 'autoscaling/v2beta2',
  kind: 'HorizontalPodAutoscaler',
  metadata: {
    name,
    namespace,
  },
  spec: {
    scaleTargetRef: {
      apiVersion: target.apiVersion,
      kind: target.kind,
      name,
    },
  },
})

const getRoleTemplate = ({ namespace }) => ({
  apiVersion: 'rbac.authorization.k8s.io/v1',
  kind: 'Role',
  metadata: {
    namespace,
  },
  rules: [],
})

const getClusterRoleTemplate = () => ({
  apiVersion: 'rbac.authorization.k8s.io/v1',
  kind: 'ClusterRole',
  rules: [],
})

const getGlobalRoleTemplate = () => ({
  apiVersion: 'iam.kubesphere.io/v1alpha2',
  kind: 'GlobalRole',
  rules: [],
})

const getWorkspaceRoleTemplate = () => ({
  apiVersion: 'iam.kubesphere.io/v1alpha2',
  kind: 'WorkspaceRole',
  rules: [],
})

const getVolumeTemplate = ({ namespace }) => ({
  apiVersion: 'v1',
  kind: 'PersistentVolumeClaim',
  metadata: {
    namespace,
  },
  spec: {
    accessModes: ['ReadWriteOnce'],
    resources: {
      requests: {
        storage: '10Gi',
      },
    },
  },
})

const getStorageClassTemplate = () => ({
  apiVersion: 'storage.k8s.io/v1',
  kind: 'StorageClass',
  metadata: {
    name: '',
    annotations: {},
  },
  parameters: {},
  reclaimPolicy: 'Delete',
  allowVolumeExpansion: 'false',
})

const getProjectTemplate = () => ({
  apiVersion: 'v1',
  kind: 'Namespace',
  metadata: {},
})

const getLimitRangeTemplate = () => ({
  apiVersion: 'v1',
  kind: 'LimitRange',
  metadata: {},
  spec: {
    limits: [
      {
        default: {
          cpu: '500m',
          memory: '500Mi',
        },
        defaultRequest: {
          cpu: '10m',
          memory: '10Mi',
        },
        type: 'Container',
      },
    ],
  },
})

const getAlertPolicyTemplate = ({ workspace, namespace } = {}) => ({
  alert: {
    alert_name: '',
  },
  resource_filter: {
    workspace,
    namespace,
    resource_type: '',
    rs_type_id: '',
    rs_filter_param: {},
  },
  policy: {
    creator: '',
    rs_type_id: '',
    policy_name: '',
    policy_description: '',
    policy_config: {
      critical: {
        repeat_type: 'fixed-minutes',
        repeat_interval_initvalue: 30,
        max_send_count: 2147483648,
      },
      major: {
        repeat_type: 'fixed-minutes',
        repeat_interval_initvalue: 120,
        max_send_count: 5,
      },
      minor: {
        repeat_type: 'not-repeat',
        repeat_interval_initvalue: 0,
        max_send_count: 1,
      },
    },
    available_start_time: '00:00:00',
    available_end_time: '23:59:00',
  },
  rules: [],
  action: {
    action_name: '',
    nf_address_list_id: '',
  },
})

const getCustomAlertPolicyTemplate = ({ namespace } = {}) => ({
  name: '',
  namespace,
  query: '',
  duration: '5m',
  labels: {
    severity: 'warning',
  },
  annotations: {
    summary: '',
    message: '',
  },
})

const getApplicationTemplate = ({ namespace }) => ({
  apiVersion: 'app.k8s.io/v1beta1',
  kind: 'Application',
  metadata: {
    name: '',
    namespace,
    labels: {
      'app.kubernetes.io/version': 'v1',
    },
  },
  spec: {
    selector: {
      matchLabels: {
        'app.kubernetes.io/version': 'v1',
      },
    },
    addOwnerRef: true,
  },
})

const getStrategyTemplate = ({ type, namespace }) => ({
  kind: 'Strategy',
  apiVersion: 'servicemesh.kubesphere.io/v1alpha2',
  metadata: {
    namespace,
    name: '',
  },
  spec: { type, strategyPolicy: 'WaitForWorkloadReady' },
})

const getStrategyPolicyTemplate = ({ name, namespace, selector }) => ({
  kind: 'ServicePolicy',
  apiVersion: 'servicemesh.kubesphere.io/v1alpha2',
  metadata: {
    name,
    namespace,
    labels: selector,
  },
  spec: {
    selector: { matchForLables: selector },
    template: {
      labels: selector,
      spec: {
        host: name,
      },
    },
  },
})

const getS2IBuilderTemplate = ({
  namespace,
  isS2i = true,
  languageType = '',
}) => ({
  apiVersion: 'devops.kubesphere.io/v1alpha1',
  kind: 'S2iBuilder',
  metadata: {
    labels: {
      'controller-tools.k8s.io': '1.0',
      's2i-type.kubesphere.io': isS2i ? 's2i' : 'b2i',
    },
    annotations: {
      languageType,
    },
    name: '',
    namespace,
  },
  spec: {
    config: {
      replicas: 0,
      export: true,
      outputBuildResult: true,
      builderPullPolicy: 'if-not-present',
      ...(isS2i ? {} : { isBinaryURL: true }),
    },
  },
})

const getBinaryTemplate = ({ namespace, name }) => ({
  apiVersion: 'devops.kubesphere.io/v1alpha1',
  kind: 'S2iBinary',
  metadata: {
    labels: {
      'controller-tools.k8s.io': '1.0',
    },
    name,
    namespace,
  },
})

const getWorkspaceTemplate = () => ({
  apiVersion: 'tenant.kubesphere.io/v1alpha2',
  kind: 'WorkspaceTemplate',
  metadata: {
    name: '',
  },
})

const getVolumeSnapshotTemplate = () => ({
  apiVersion: 'snapshot.storage.k8s.io/v1alpha1',
  kind: 'VolumeSnapshot',
  metadata: {
    name: '',
  },
  spec: {
    source: {
      kind: 'PersistentVolumeClaim',
    },
  },
})

const getNameSpaceNetworkPoliciesTemplate = ({ namespace }) => ({
  apiVersion: 'network.kubesphere.io/v1alpha1',
  kind: 'NamespaceNetworkPolicy',
  metadata: {
    namespace,
  },
  spec: {},
})

const getDashboardTemplate = ({ namespace }) => ({
  apiVersion: 'monitoring.kubesphere.io/v1alpha1',
  kind: 'Dashboard',
  metadata: {
    namespace,
  },
  spec: {},
})

const getClusterDashboardTemplate = () => ({
  apiVersion: 'monitoring.kubesphere.io/v1alpha1',
  kind: 'ClusterDashboard',
  metadata: {},
  spec: {},
})

const getServiceMonitorTemplate = ({ name, namespace }) => ({
  apiVersion: 'monitoring.coreos.com/v1',
  kind: 'ServiceMonitor',
  metadata: {
    name,
    namespace,
  },
  spec: {},
})

const getWorkspaceRoleBindingTemplate = ({ name, role }) => ({
  kind: 'WorkspaceRoleBinding',
  apiVersion: 'iam.kubesphere.io/v1alpha2',
  subjects: [
    {
      kind: 'Group',
      apiGroup: 'rbac.authorization.k8s.io',
      name,
    },
  ],
  roleRef: {
    apiGroup: 'iam.kubesphere.io/v1alpha2',
    kind: 'WorkspaceRole',
    name: role,
  },
})

const getRolebindingTemplate = ({ name, role }) => ({
  subjects: [
    {
      kind: 'Group',
      apiGroup: 'rbac.authorization.k8s.io',
      name,
    },
  ],
  roleRef: {
    apiGroup: 'rbac.authorization.k8s.io',
    kind: 'Role',
    name: role,
  },
})

const getGlobalSecretTemplate = ({ name }) => ({
  apiVersion: 'v1',
  kind: 'Secret',
  metadata: {
    name,
  },
  type: 'Opaque',
})

const getNotificationConfigTemplate = ({ name }) => ({
  apiVersion: 'notification.kubesphere.io/v2beta1',
  kind: 'Config',
  metadata: {
    name,
  },
  spec: {},
})

const getNotificationReceiverTemplate = ({ name, type }) => ({
  apiVersion: 'notification.kubesphere.io/v2beta1',
  kind: 'Receiver',
  metadata: {
    name,
  },
  spec: {
    [type]: {
      enabled: false,
    },
  },
})

const FORM_TEMPLATES = {
  deployments: getDeploymentTemplate,
  daemonsets: getDaemonSetTemplate,
  statefulsets: getStatefulSetTemplate,
  jobs: getJobTemplate,
  cronjobs: getCronJobTemplate,
  services: getServiceTemplate,
  ingresses: getIngressTemplate,
  configmaps: getConfigmapTemplate,
  serviceaccounts: getServiceAccountTemplate,
  secrets: getSecretTemplate,
  hpa: getHorizontalPodAutoscalerTemplate,
  roles: getRoleTemplate,
  clusterroles: getClusterRoleTemplate,
  globalroles: getGlobalRoleTemplate,
  workspaceroles: getWorkspaceRoleTemplate,
  volumes: getVolumeTemplate,
  storageclasses: getStorageClassTemplate,
  project: getProjectTemplate,
  limitRange: getLimitRangeTemplate,
  'alert-policies': getAlertPolicyTemplate,
  rules: getCustomAlertPolicyTemplate,
  applications: getApplicationTemplate,
  strategies: getStrategyTemplate,
  strategyPolicy: getStrategyPolicyTemplate,
  workspaces: getWorkspaceTemplate,
  s2ibuilders: getS2IBuilderTemplate,
  b2iBuilders: getBinaryTemplate,
  'volume-snapshots': getVolumeSnapshotTemplate,
  namespacenetworkpolicies: getNameSpaceNetworkPoliciesTemplate,
  dashboards: getDashboardTemplate,
  clusterdashboards: getClusterDashboardTemplate,
  federated: getFederatedTemplate,
  servicemonitors: getServiceMonitorTemplate,
  workspacerolebinding: getWorkspaceRoleBindingTemplate,
  rolebinding: getRolebindingTemplate,
  globalsecret: getGlobalSecretTemplate,
  notificationconfigs: getNotificationConfigTemplate,
  notificationreceivers: getNotificationReceiverTemplate,
}

export default FORM_TEMPLATES

export const getFormTemplate = (namespace, module) => {
  const kind = MODULE_KIND_MAP[module]

  if (!kind || !FORM_TEMPLATES[module]) {
    return {}
  }

  const template = FORM_TEMPLATES[module]({ namespace })

  return {
    [kind]: template,
  }
}
