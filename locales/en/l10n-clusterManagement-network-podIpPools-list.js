/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  POD_IP_POOL_PL: 'Pod IP Pools',
  POD_IP_POOL_DESC:
    'Pod IP pools is used to manage the pod network address space in the cluster. You can create pod IP pools based on your needs.',
  IPPOOL_USAGE_Q: 'How do I manage a pod network using a pod IP pool?',
  IPPOOL_USAGE_A:
    'A pod IP pool is used to manage the pod network address space, and the address spaces between different pod IP pools cannot overlap. When creating a workload, you can select a specific pod IP pool to assign IP addresses from this pod IP pool to the created pods.',
  // List
  POD_IP_POOL_EMPTY_DESC: 'Please create a pod IP pool.',
  TOTAL_VALUE: 'Total: {value}',
  ALL: 'All',
  NOT_ASSIGNED: 'Not assigned',
  // List > Create
  CREATE_POD_IP_POOL: 'Create Pod IP Pool',
  NETWORK_SEGMENT: 'Network Segment',
  USED_IP_ADDRESSES: 'Used IP Addresses',
  QUANTITY: 'Quantity',
  IP_POOL_CREATE_DESC: 'Pod IP Pools to be Created',
  IP_ADDRESS_EMPTY_DESC: 'Please enter an IP address.',
  MASK_TIP: 'Please enter a mask.',
  ENTER_NETWORK_SEGMENT_TIP: 'Please enter a network segment.',
  IP_POOL_NUM_TIP: 'Please enter the number of pod IP pools to be created.',
  IP_POOL_CREATE_COUNT_DESC: 'Up to 10 pod IP pools can be created at the same time.',
  INVALID_IP_DESC: 'Invalid IP address format.',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: 'Assign the pod IP pool to a workspace.',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING:
    'The pod IP pool is in use and cannot be assigned to another specific workspace.',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'The pod IP pool is in use with a specific workspace assigned. The workspace cannot be changed.',
  ASSIGN_WORKSPACE: 'Assign Workspace',
  SELECT_WORKSPACE_DESC: 'Select a workspace.',
  // List > Delete
  POD_IP_POOL_LOW: 'pod IP pool',
};
