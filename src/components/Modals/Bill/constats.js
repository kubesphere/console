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
  // {
  //   icon: 'openpitrix',
  //   subTitle: 'APP_CONSUMPTION_DESC',
  //   type: 'openpitrix',
  //   desc: 'APP_RESOURCE_CONSUMPTION_DESC',
  //   infos: [
  //     'APP_WORKSPACE_CONSUMPTION_DESC',
  //     'APP_WORKSPACE_PROJECT_CONSUMPTION_DESC',
  //   ],
  // },
]

export const RESOURCES_METER_TYPE = {
  deployments: 'workload',
  statefulsets: 'workload',
  daemonsets: 'workload',
  nodes: 'node',
  workspaces: 'workspace',
  namespaces: 'namespace',
  applications: 'application',
  openpitrixs: 'application',
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
  'daemonsets',
  'openpitrixs',
  'nodes',
  'pods',
]

export const RESOURCE_TITLE = {
  nodes: 'Cluster Node',
  pods: 'Pod',
  openpitrixs: 'App Template',
  applications: 'Composing App',
  deployments: 'Deployment',
  statefulsets: 'StatefulSet',
  daemonsets: 'DaemonSet',
  workspaces: 'Workspace',
  cluster: 'Cluster',
  namespaces: 'Project',
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
  openpitrix: [
    {
      type: 'openpitrix',
      children: ['service'],
    },
  ],
  workspaces: [
    {
      type: 'workspaces',
      children: ['namespaces'],
    },
    {
      type: 'namespaces',
      children: [
        'applications',
        'deployments',
        'statefulsets',
        'openpitrixs',
        'daemonsets',
      ],
      parent: ['workspaces'],
    },
    {
      type: 'applications',
      children: ['deployments', 'statefulsets', 'daemonsets'],
      parent: ['namespaces'],
    },
    {
      type: 'openpitrixs',
      children: ['deployments', 'statefulsets', 'daemonsets'],
      parent: ['namespaces'],
    },
    {
      type: 'services',
      children: ['pods'],
      parent: ['applications', 'namespaces', 'openpitrixs', 'daemonsets'],
    },
    {
      type: ['deployments', 'statefulsets', 'daemonsets'],
      children: ['pods'],
      parent: ['applications', 'namespaces', 'openpitrixs'],
    },
    {
      type: 'pods',
      parent: [
        'deployments',
        'statefulsets',
        'namespaces',
        'services',
        'daemonsets',
      ],
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
  egress_network_traffic_per_megabytes_per_hour: 'net_transmitted',
  ingress_network_traffic_per_megabytes_per_hour: 'net_received',
  mem_per_gigabytes_per_hour: 'memory',
  pvc_per_gigabytes_per_hour: 'disk',
  currency: 'currency',
}

export const METER_RESOURCE_USAGE = {
  cpu: 'cpu_usage',
  memory: 'memory_usage_wo_cache',
  net_received: 'net_bytes_received',
  net_transmitted: 'net_bytes_transmitted',
  disk: 'pvc_bytes_total',
}

export const AREA_COLORS = [
  'green',
  'blue',
  'yellow',
  'red',
  'darkestGreen',
  'darkestBlue',
  'darkestYellow',
  'darkestRed',
  'lightestGreen',
  'lightestBlue',
  'lightestYellow',
  'lightestRed',
]

export const PIE_COLORS = [
  '#3b747a',
  '#479e88',
  '#55bc8a',
  '#a2d8bb',
  '#326e93',
  '#3385b0',
  '#329dce',
  '#7eb8dc',
  '#c7deef',
  '#8c3231',
  '#ab2f29',
  '#ca2621',
  '#ea8573',
  '#fae7e5',
  '#8d663e',
  '#e0992c',
  '#f5a623',
  '#ffc781',
  '#ffe1be',
]

export const UNIT_CONFIG = {
  cpu: { label: 'Core', value: 'core' },
  memory: { label: 'Gi', value: 'Gi' },
  number: { label: 'M', value: 'Mi' },
  disk: { label: 'GB', value: 'Gi' },
  net_received: { label: 'M', value: 'Mi' },
  net_transmitted: { label: 'M', value: 'Mi' },
}
