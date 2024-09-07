/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Navigation Pane
  GATEWAY_SETTINGS: 'Gateway Settings',
  // Banner
  CLUSTER_GATEWAY_DESC:
    'Set up and manage the configuration of the external network access gateway and service management in the cluster.',
  // Cluster Gateway
  CLUSTER_GATEWAY_NOT_ENABLED: 'Cluster Gateway Not Enabled',
  CLUSTER_ENABLE_GATEWAY_DESC: 'Please enable the cluster gateway.',
  CLUSTER_GATEWAY: 'Cluster Gateway',
  GATEWAY_ADDRESS_SCAP: 'Gateway address',
  LOAD_BALANCER_PROVIDER_SCAP: 'Load balancer provider',
  // Cluster Gateway > Enable Gateway
  ENABLE_GATEWAY: 'Enable Gateway',
  GATEWAY_TRACING_TIP:
    'If ingresses cannot be accessed after <b>Tracing</b> is enabled, please add the annotation <b>nginx.ingress.kubernetes.io/service-upstream: true </b> to the ingress.',
  // Cluster Gateway > Manage > View Details
  VIEW_DETAILS: 'View Details',
  // Cluster Gateway > Manage > Disable
  DISABLE: 'Disable',
  DISABLE_GATEWAY: 'Disable Gateway',
  DISABLE_GATEWAY_TIP: 'Are you sure you want to disable the gateway?',
  DISABLE_SUCCESSFUL: 'Disabled successfully.',
  // Cluster Gateway > Manage > Edit
  EDIT: 'Edit',
  EDIT_TITLE: 'Edit {title}',
  // Cluster Gateway > Manage > Update
  UPDATE: 'Update',
  UPDATE_GATEWAY_DESC:
    'This operation may interrupt business for a short whilte. Exercise caution when performing this operation.',
  // Project Gateways
  PROJECT_GATEWAY_PL: 'Project Gateways',
  PROJECT_GATEWAY_NOT_ENABLED: 'Project Gateway Not Enabled',
  PROJECT_ENABLE_GATEWAY_DESC: 'Please enable the project gateway.',
  REPLICA_COUNT: 'Replicas',
  NODE_PORTS: 'Node Ports',
  UPDATE_GATEWAY_DESC: 'The current gateway can be updated.',
  // Workspace Gateways
  WORKSPACE_GATEWAY_PL: 'Workspace Gateways',
  // Project Gateways > Disable
  PROJECT_GATEWAY_LOW: 'project gateway',
  DISABLE_MULTIPLE_GATEWAYS: 'Disable Multiple Gateways',
};
