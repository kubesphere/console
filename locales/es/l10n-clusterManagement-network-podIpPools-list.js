/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  POD_IP_POOL_PL: 'Pod IP Pools',
  POD_IP_POOL_DESC:
    'Pod IP pools is used to manage the Pod network address space in the cluster. You can create Pod IP pools based on your needs.',
  IPPOOL_USAGE_Q: 'How do I manage a Pod network using a Pod IP pool?',
  IPPOOL_USAGE_A:
    'A Pod IP pool is used to manage the Pod network address space, and the address spaces between different Pod IP pools cannot overlap. When creating a workload, you can select a specific Pod IP pool to assign IP addresses from this Pod IP pool to the created Pods.',
  // List
  POD_IP_POOL_EMPTY_DESC: 'Please create a Pod IP pool.',
  TOTAL_VALUE: 'Total: {value}',
  ALL: 'Todos',
  NOT_ASSIGNED: 'No asignado',
  // List > Create
  CREATE_POD_IP_POOL: 'Create Pod IP Pool',
  NETWORK_SEGMENT: 'Network Segment',
  USED_IP_ADDRESSES: 'Used IP Addresses',
  QUANTITY: 'Quantity',
  IP_POOL_CREATE_DESC: 'Pod IP Pools to be created',
  IP_ADDRESS_EMPTY_DESC: 'Please enter an IP address.',
  MASK_TIP: 'Please enter a mask.',
  ENTER_NETWORK_SEGMENT_TIP: 'Please enter a network segment.',
  IP_POOL_NUM_TIP: 'Please enter the number of Pod IP pools to be created.',
  IP_POOL_CREATE_COUNT_DESC: 'Up to 10 Pod IP pools can be created at the same time.',
  INVALID_IP_DESC: 'Invalid IP address format.',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: 'Assign the Pod IP pool to a workspace.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'The Pod IP pool is in use and cannot be assigned to another specific workspace.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'The Pod IP pool is in use with a specific workspace assigned. The workspace cannot be changed.',
  ASSIGN_WORKSPACE: 'Asignar espacio de trabajo',
  SELECT_WORKSPACE_DESC: 'Elige un espacio de trabajo',
  // List > Delete
  POD_IP_POOL_LOW: 'Pod IP pool',
};
