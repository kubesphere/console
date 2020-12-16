export const CARD_CONFIG = [
  {
    icon: 'cluster',
    subTitle: 'Cluster Consumption',
    type: 'cluster',
    desc: 'CLUSTER_CONSUMPTION_DESC',
    infos: [
      'CLUSTER_RESOURCE_CONSUMPTION_DESC',
      'CLUSTER_NODE_CONSUMPTION_DESC',
    ],
  },
  {
    icon: 'enterprise',
    subTitle: 'Workspace Consumption',
    type: 'workspaces',
    desc: 'WORKSPACE_CONSUMPTION_DESC',
    infos: [
      'WORKSPACE_RESOURCE_CONSUMPTION_DESC',
      'WORKSPACE_PROJECT_CONSUMPTION_DESC',
      'PROJECT_CONSUMPTION_DESC',
    ],
  },
  {
    icon: 'openpitrix',
    subTitle: 'APP_CONSUMPTION_DESC',
    type: 'openpitrix',
    desc: 'APP_RESOURCE_CONSUMPTION_DESC',
    infos: [
      'APP_WORKSPACE_CONSUMPTION_DESC',
      'APP_WORKSPACE_PROJECT_CONSUMPTION_DESC',
    ],
  },
]

export const RESOURCES_METER_TYPE = {
  deployments: 'workload',
  statefulsets: 'workload',
  nodes: 'node',
  workspaces: 'workspace',
  namespaces: 'namespace',
  applications: 'application',
  services: 'service',
  pods: 'pod',
  cluster: 'cluster',
}

export const RESOURCES_TYPE = [
  'namespaces',
  'applications',
  'services',
  'deployments',
  'statefulsets',
  'nodes',
  'pods',
]

export const RESOURCE_TITLE = {
  nodes: 'Cluster Nodes',
  pods: 'Pods',
  openpitrix: 'App Templates',
  applications: 'Composing App',
  deployments: 'Deployments',
  statefulsets: 'StatefulSets',
  workspaces: 'Workspaces',
  cluster: 'Cluster',
  namespaces: 'Projects',
  services: 'Service',
}

export const METER_RESOURCE_TITLE = {
  cpu: 'CPU',
  memory: 'Memory',
  disk: 'Volumes',
  net_received: 'Net Received',
  net_transmitted: 'Net Transmitted',
}

export const METER_RESOURCE_USAGE_TITLE = {
  cpu: 'Meter CPU Usage',
  memory: 'Meter Memory Usage',
  disk: 'Meter Volume Usage',
  net_received: 'Meter Net Received Usage',
  net_transmitted: 'Meter Net Transmitted Usage',
}

export const MERTER_TYPE = Object.keys(METER_RESOURCE_USAGE_TITLE)

export const LEVEL_CONFIG = {
  openpitrix: [],
  workspaces: [
    {
      type: 'workspaces',
      children: ['namespaces'],
    },
    {
      type: 'namespaces',
      children: ['applications', 'services', 'deployments', 'statefulsets'],
      parent: ['workspaces'],
    },
    {
      type: 'applications',
      children: ['services', 'deployments', 'statefulsets'],
      parent: ['namespaces'],
    },
    {
      type: 'services',
      children: ['pods'],
      parent: ['applications', 'namespaces'],
    },
    {
      type: ['deployments', 'statefulsets'],
      children: ['pods'],
      parent: ['applications', 'namespaces'],
    },
    {
      type: 'pods',
      parent: ['deployments', 'statefulsets', 'namespaces', 'services'],
    },
  ],
  cluster: [
    { type: 'cluster', children: ['nodes'] },
    { type: 'nodes', children: ['pods'], parent: ['cluster'] },
    { type: 'pods', parent: ['nodes'] },
  ],
}

export const FEE_CONFIG = {
  cpu_per_core_per_hour: 'cpu',
  egress_network_traffic_per_gigabytes_per_hour: 'net_transmitted',
  ingress_network_traffic_per_giagabytes_per_hour: 'net_received',
  mem_per_gigabytes_per_hour: 'memory',
  pvc_per_gigabytes_per_hour: 'disk',
}

export const METER_RESOURCE_USAGE = {
  cpu: 'cpu_usage',
  memory: 'memory_usage_wo_cache',
  net_received: 'net_bytes_received',
  net_transmitted: 'net_bytes_transmitted',
  disk: 'pvc_bytes_total',
}
