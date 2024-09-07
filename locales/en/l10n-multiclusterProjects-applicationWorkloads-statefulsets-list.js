/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  // List
  STATEFULSET_EMPTY_DESC: 'Please create a statefulset.',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  // List > Create > Pod Settings
  POD_SETTINGS: 'Pod Settings',
  POD_REPLICAS: 'Pod Replicas',
  ONDELETE: 'Update on Deletion',
  ONDELETE_DESC: 'Updates pod replicas only when they are manually deleted.',
  PARTITION_ORDINAL: 'Ordinal for Dividing Pod Replicas',
  PARTITION_ORDINAL_DESC:
    'Set an ordinal to divide the pod replicas into two groups. When the statefulset is updated, only pod replicas with an ordinal greater than or equal to the value of this parameter are updated.',
  // List > Create > Storage Settings
  PVC_NAME_PREFIX: 'PVC Name Prefix',
  PVC_NAME_PREFIX_DESC:
    'Prefix of persistent volume claim names. The prefix can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 253 characters.',
  PVC_NAME_PREFIX_EMPTY: 'Please enter the prefix of persistent volume claim names.',
  INVALID_PVC_NAME_PREFIX:
    'Invalid prefix. The prefix can contain only lowercase letters, numbers, and hyphens (-), and must start and end with a lowercase letter or number. The maximum length is 253 characters.',
  PVC_NAME_PREFIX_EXISTS: 'The prefix already exists. Please enter another prefix.',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE: 'Add Persistent Volume Claim Template',
  ADD_PERSISTENT_VOLUME_CLAIM_TEMPLATE_DESC:
    'Add a persistent volume claim template to mount a persistent volume to each pod of the statefulset.',
  VOLUME_CAPACITY_TCAP: 'Volume Capacity',
  MOUNT_PATH_TCAP: 'Mount Path',
  VOLUME_TEMPLATES: 'Volume Templates',
  // List > Create > Advanced Settings
  // List > Create > Cluster Differences
  SERVICE_PORT: 'Service Port',
  SERVICE_PORT_VALUE: 'Service Port: {value}',
  // List > Create > Cluster Differences (Displayed after you add a volume template)
  VOLUME_TEMPLATE_SETTINGS: 'Volume Template Settings',
  CLUSTER_VOLUME_DIFF_DESC: 'Use different storage settings in different clusters.',
  // Customize Columns
};
