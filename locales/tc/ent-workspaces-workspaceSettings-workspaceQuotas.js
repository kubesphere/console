/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // edit Quotas
  STORAGE_RELATED_RESOURCE_LIMIT: 'Limit on Resources Bound with Storage Class',
  TOTAL_STORAGE_CLASS: 'Total Storage Classes',
  LIMITED_STORAGE_CLASS: 'Number of Limited Storage Classes',
  RELATED_RESOURCE_QUOTA: 'Bound Resource Quota',
  REQUESTS_STORAGE: 'PVC Limit',
  PERSISTENTVOLUMECLAIMS: 'PVC',
  TOTAL_STORAGE_RESOURCE: 'Total Storage Resources',
  STORAGE_RELATED_RESOURCE: 'Storage Class Bound Resources',
  TOTAL_STORAGE_LIMIT_LESS_THAN_RELATE_RESOURCE:
    'The total limit of storage resources cannot be less than that of bound resources.',
  // Storage Resource Quota > Storage Related Resources
  VOLUME_TOTAL_CAPACITY: 'Total Capacity of PVCs ({unit})',
  VOLUME_MAX_NUM: 'Total PVCs',
  SET_RELATED_STORAGE_CLASS_QUOTA: 'Set the quota for the PVC bound with the storage class.',
  SELECT_STORAGE_CLASS: 'Select Storage Class',
  STORAGE_QUOTA: 'Storage Resource Quota',
  WS_STORAGE_QUOTA_DESC: 'Limit the the total amount of storage resources under the workspace.',
  NS_STORAGE_QUOTA_DESC: 'Limit the the total amount of storage resources under the project.',
  STORAGE_VOLUME_LIMIT_NO_LIMIT: 'Resource limits: no limit on the PVC capacity',
  STORAGE_VOLUME_LIMIT_HAS_A_LIMIT: 'Resource limits: PVC capacity {num} Gi',
  STORAGE_PERSISTENT_VOLUME_NO_LIMIT: 'No limit on the number of PVCs.',
  STORAGE_PERSISTENT_VOLUME_HAS_A_LIMIT: 'number of PVCs {num}',
  STORAGE_LIMIT: 'PVC capacity limit',
  STORAGE_CLASS_VOLUME: 'Number of PVCs',
  SELECT_A_STORAGECLASS: 'Select Storage Class',
  VOLUME_COUNT: 'Bound PVCs',
  APPLICATION_RESOURCE_QUOTAS: 'Application Resource Quotas',
};
