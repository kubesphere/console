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

module.exports = {
  'Allow Volume Expansion': 'Allow Volume Expansion',
  'Available Capacity': 'Available Capacity',
  'Create Snapshot': 'Create Snapshot',
  'Create Storage Class': 'Create Storage Class',
  'Create Volume': 'Create Volume',
  CREATE_VOLUME_WITH_SNAPSHOT: 'Create volume based on snapshots',
  'Custom Provisioner': 'Custom Provisioner',
  Default: 'Default',
  'Default Storage Class': 'Default Storage Class',
  'Default Volume': 'Default Volume',
  'Delete Volume': 'Delete Volume',
  'Disable Volume Snapshot': 'Disable Volume Snapshot',
  'Apply immediately': 'Apply immediately',
  Expand: 'Expand',
  'Expand Volume': 'Expand Volume',
  Idle: 'Idle',
  'In Use': 'In Use',
  'Mount Info': 'Mount Info',
  'Mount Options': 'Mount Options',
  'Mount Status': 'Mount Status',
  Mounted: 'Mounted',
  'Mounted Pods': 'Mounted Pods',
  'Not Mounted': 'Not Mounted',
  Parameters: 'Parameters',
  'Parameters (key-value pairs)': 'Parameters (key-value pairs)',
  PersistentVolumeClaim: 'PersistentVolumeClaim',
  PersistentVolumes: 'PersistentVolumes',
  'Reclaim Policy': 'Reclaim Policy',
  Scalable: 'Scalable',
  'Set as default storage class': 'Set as default storage class',
  'Snapshot Message': 'Snapshot Message',
  'Snapshots Message': 'Snapshot Message',
  'Storage Class': 'Storage Class',
  'Storage Class Name': 'Storage Class Name',
  'Storage Class Settings': 'Storage Class Settings',
  'storage classes': 'storage classes',
  'Storage System': 'Storage System',
  STORAGE_CLASS_CREATE_DESC:
    'The Storage Class is configured by the cluster administrator to configure storage server parameters and provide storage for cluster users by class.',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  'Support Volume Snapshot': 'Support Volume Snapshot',
  'Supported Access Mode': 'Supported Access Mode',
  'Used Capacity': 'Used Capacity',
  'Clone Volume': 'Clone Volume',
  'Volume Count': 'Volume Count',
  'The volume name exists': 'The volume name exists',
  'The volume size must be greater than zero':
    'The volume size must be greater than zero',
  'Volume Template Settings': 'Volume Template Settings',
  'Volume Usage': 'Volume Usage',
  VOLUME_DESC:
    'A volume is used for workloads created by users. It represents a resource object for the persistent storage of workloads.',
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Creating',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Creation failed',
  VOLUME_SNAPSHOT_STATUS_READY: 'Created successfully',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Deleting',
  volumes: 'volumes',
  VolumeSnapshots: 'Volume Snapshots',

  'Storage Classs': 'Storage Classes',
  ACCESS_MODE_RWO: 'Single node read-write',
  ACCESS_MODE_ROX: 'Multi-node read-only',
  ACCESS_MODE_RWX: 'Multi-node read-write',

  VOLUME_STATUS_BOUND: 'Bound',
  VOLUME_STATUS_LOST: 'Lost',
  VOLUME_STATUS_PENDING: 'Pending',
  VOLUME_STATUS_TERMINATING: 'Terminating',
  VOLUME_STATUS_UPDATING: 'Updating',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Disk Expanding',

  VOLUMES_BASEINFO_DESC:
    'The volume can persist data, and its lifecycle is independent of the workload. Make sure the storage class is created before you create a volume.',
  VOLUME_CREATE_DESC:
    'A volume is used for workloads created by users. It represents a resource object for the persistent storage of workloads.',
  VOLUME_SETTINGS_DESC:
    'Fill in the capacity of the volume as needed, and the volume size and access mode must be compatible with the storage class and storage server capabilities. The access mode is usually selected as RWO.',
  VOLUME_STORAGE_CLASS_DESC:
    'The cluster administrator configures the storage server parameters and provides storage for the user by type.',

  PROVISIONER_DESC: 'Provide backend storage',

  ACCESS_MODES_DESC: 'Select the access mode supported by the storage class.',

  DELETE_STORAGE_TIP:
    'If the storage volume is being mounted, delete it when the workload is deleted.',
  SRORAGE_SETTING_DESC:
    'ReadWriteOnce: Single node read and write.<br/>ReadOnlyMany: Multi-node read-only.<br/>ReadWriteMany: Multi-node read and write.<br/>Only one mode can be used when mounting.',

  STORAGE_CLASS_DESC:
    'A StorageClass provides a way for administrators to configure the "classes" of storage they offer.',

  'STORAGE-CLASSES_BASEINFO_DESC':
    'The storage type records the configuration information of a certain type of storage provided by the administrator. Before creating a specific type of storage volume, the corresponding storage type must be configured.',
  STORAGE_CLASS_SETTING_DESC:
    'The storage type records the configuration information of a certain type of storage provided by the administrator. Before creating a specific type of storage volume, the corresponding storage type must be configured.',

  STORAGE_CLASS_SET_DEFAULT_DESC:
    'After the default storage class is set, the system will create volumes of this class by default if no special requirement is added. Only one default storage class is allowed in a Kubernetes cluster.',

  STORAGECLASSES_BASEINFO_DESC:
    'A StorageClass provides a way for administrators to configure the "classes" of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. You need to create a StorageClass before users can create volume (i.e., PVC) based on the StorageClass.',
  STORAGECLASS_PARAMETER_TIP:
    'Please refer to <a href="{link}" target="_blank">Kubernetes docs</a> for details.',
  VOLUME_BASEINFO_TIP:
    'The volume is provisioned through dynamic volume provisioning which allows storage volumes to be created on-demand. The volume is used for persisting data, and has explict lifecycle independent of any individual pod that uses it. At lease one StorageClass must be configured by adminstrators before creating a volume.',

  WHAT_IS_STORAGE_CLASS_Q: 'What is a Storage Class?',
  WHAT_IS_STORAGE_CLASS_A:
    'The Storage Class is configured by the cluster administrator to configure storage server parameters and provide storage for cluster users by class.',

  WHAT_IS_LOCAL_VOLUME_Q: 'What is a Local Volume?',
  WHAT_IS_LOCAL_VOLUME_A:
    'A local volume is a mounted local storage device, such as a disk, partition, or directory.',
  CHOOSE_STORAGE_SYSTEM_TIP: 'Choose the Storage System You Need',
  PROVISIONER_DEPENDENCE_DESC:
    'You need to deploy the corresponding storage plugin for a storage system first so that it can provide services.',

  VOLUME_EXPAND_TIPS:
    'The current PVC has been mounted to the work load, so the expansion will lead to the workload restart, and a new version. Business may be a brief interruption. ',

  QINGCLOUD_CSI_DESC:
    'The QingCloud CSI plugin implements the Container Storage Interface (CSI) of Kubernetes, enabling the container orchestrator (CO) to use QingCloud storage. Currently, the QingCloud CSI plugin supports block storage services on QingCloud Platform. For detailed information, refer to <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">features</a>.',

  QINGCLOUD_CSI_TYPE_DESC:
    'On QingCloud Public Cloud Platform, 0 represents high performance volume. 2 represents high capacity volume. 3 represents super high performance volume. 5 represents Enterprise Server SAN. 100 represents standard volume.',
  CREATE_VOLUME_MAX_SIZE: 'Volume size upper limit',
  CREATE_VOLUME_STEP_SIZE: 'Volume size increment',
  CREATE_VOLUME_MIN_SIZE: 'Volume size lower limit',
  VOLUME_FS_TYPE: 'ext3, ext4, xfs',

  GLUSTERFS_RESTURL_DESC:
    'Heketi service url which provisions gluster volumes on demand. ',
  GLUSTERFS_ID_DESC: 'Gluster ID',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Enable authentication to the REST server.',
  GLUSTERFS_RESTUSER_DESC:
    'The Gluster REST service/Heketi user who has access to creating volumes in the Gluster Trusted Pool.',
  GLUSTERFS_SECRET_NAMESPACE_DESC:
    'Identification of Secret instance that contains user password to use when talking to Gluster REST service.',
  GLUSTERFS_SECRET_NAME_DESC:
    'These parameters are optional; an empty password will be used when both secretNamespace and secretName are omitted.',
  GLUSTERFS_GID_MIN_DESC:
    'The minimum value of GID range for the storage class. A unique value (GID) in this range (gidMin-gidMax) will be used for dynamically provisioned volumes. These are optional values.',
  GLUSTERFS_GID_MAX_DESC:
    'The maximum value of GID range for the storage class. A unique value (GID) in this range (gidMin-gidMax) will be used for dynamically provisioned volumes. These are optional values.',
  GLUSTERFS_VOLUME_TYPE_DESC:
    'The volume type and its parameters can be configured with this optional value.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Tags will be associated automatically when a hard drive is created. Please separate multiple tags with commas.',

  CEPHRBD_MONITORS_DESC:
    'Ceph monitors, comma delimited. This parameter is required.',
  CEPHRBD_ADMIN_ID_DESC:
    'Ceph client ID that is capable of creating images in the pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC:
    'The provided secret must have type “kubernetes.io/rbd”.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'The namespace for adminSecretName',
  CEPHRBD_POOL_DESC: 'Ceph RBD pool',
  CEPHRBD_USERID_DESC:
    'Ceph client ID that is used to map the RBD image. Default is the same as adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC:
    'The name of Ceph Secret for userId to map RBD image',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'The namespace for userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'fsType that is supported by kubernetes.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Ceph RBD image format, “1” or “2”',
  CEPHRBD_IMAGE_FEATURES_DESC:
    'This parameter is optional and should only be used if you set imageFormat to “2”.',

  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    'Please check if the storage class is being used by other resources. If there is any resource dependent on the storage class, you need to disable the resource first.',

  CREATE_VOLUME_BY_STORAGECLASS: 'Create a volume by StorageClass',
  CREATE_VOLUME_BY_SNAPSHOT: 'Create a volume by VolumeSnapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Select a snapshot to create a volume.',
  VOLUMESNAPSHOT_DESC:
    'A volume snapshot refers to a snapshot of a volume at a particular time point. It can be used to create new volumes (preset the snapshot data) or restore an existing volume to its previous status (displayed in snapshots).',
  VOLUMESNAPSHOT_CREATE_DESC:
    'A volume snapshot refers to a snapshot of a volume at a particular time point. It can be used to create new volumes (preset the snapshot data) or restore an existing volume to its previous status (displayed in snapshots).',
  WHAT_IS_VOLUME_SNAPSHOTS: 'What are volume snapshots?',

  CLUSTER_VOLUME_DIFF_DESC:
    'You can specify different storage classes for different clusters.',

  VOLUME_MONITORING_TIP:
    'Kubernetes collects volume usage data, excluding data from unmounted volumes. For path-based volumes such as OpenEBS/Local PV and NFS, the data collected may be different from the actual amount. For detailed information, see <a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">volume monitoring data analysis</a>.',
}
