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
  VOLUME_EXPANSION: 'Volume Expansion',
  AVAILABLE_CAPACITY: 'Available capacity',
  CREATE_SNAPSHOT: 'Create Snapshot',
  'Create Storage Class': 'Create Storage Class',
  'Create Volume': 'Create Volume',
  CREATE_VOLUME_WITH_SNAPSHOT: 'Create volume based on snapshots',
  'Custom Provisioner': 'Custom Provisioner',
  DEFAULT: 'Default',
  'Default Storage Class': 'Default Storage Class',
  'Default Volume': 'Default Volume',
  'Delete Volume': 'Delete Volume',
  'Disable Volume Snapshot': 'Disable Volume Snapshot',
  'Apply immediately': 'Apply immediately',
  Expand: 'Expand',
  EXPAND_VOLUME: 'Expand Volume',
  EXPAND: 'Expand',
  AVAILABLE: 'Available',
  IN_USER: 'In use',
  MOUNT_INFORMATION: 'Mount Information',
  'Mount Options': 'Mount Options',
  // Volumes List Page
  MOUNT_STATUS: 'Mount Status',
  MOUNTED: 'Mounted',
  MOUNTED_PODS: 'Mounted Pods',
  NOT_MOUNTED: 'Not mounted',
  Parameters: 'Parameters',
  'Parameters (key-value pairs)': 'Parameters (key-value pairs)',
  PersistentVolumeClaim: 'Volume',
  PersistentVolumes: 'PersistentVolumes',
  RECLAIM_POLICY: 'Reclaim Policy',
  CREATE: 'Create',
  UPDATE: 'Update',
  Scalable: 'Scalable',
  SET_AS_DEFAULT_STORAGE_CLASS: 'Set as Default Storage Class',
  'Snapshot Message': 'Snapshot Message',
  'Snapshots Message': 'Snapshot Message',
  'Set as default storage class': 'Set as default storage class',
  SNAPSHOT_PL: 'Snapshots',
  'Storage Class': 'Storage Class',
  STORAGE_CLASS: 'Storage Class',
  STORAGE_CLASS_PL: 'Storage Classes',
  STORAGE_CLASS_LOW: 'storage class',
  STORAGE_CLASS_EMPTY_DESC: 'Please create a storage class.',
  STORAGE_CLASS_VALUE: 'Storage class: {value}',
  'Storage Class Name': 'Storage Class Name',
  STORAGE_CLASS_SETTINGS: 'Storage Class Settings',
  'storage classes': 'storage classes',
  STORAGE_SYSTEM: 'Storage System',
  STORAGE_CLASS_CREATE_DESC:
    'The Storage Class is configured by the cluster administrator to configure storage server parameters and provide storage for cluster users by class.',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  ALLOW_VOLUME_SNAPSHOT: 'Volume Snapshot Allowed',
  ALLOW_VOLUME_CLONE: 'Volume Clone Allowed',
  ALLOW_VOLUME_EXPANSION: 'Volume Expansion Allowed',
  PV: 'Volume Backend',
  VOLUME_BACKEND_TCAP: 'Volume Instance',
  PV_STATUS_AVAILABLE: 'Available',
  PV_STATUS_BOUND: 'Bound',
  PV_STATUS_RELEASED: 'Terminating',
  PV_STATUS_FAILED: 'Failed',
  'Bound Volume': 'Storage volume bound',
  RECYCLING_STRATEGY: 'Recycling Strategy',
  ACCESS_MODE: 'Access Mode',
  ACCESS_MODE_SCAP: 'Access mode',
  'Used Capacity': 'Used Capacity',
  CLONE_VOLUME: 'Clone Volume',
  CLONE: 'Clone',
  VOLUME: 'Volume',
  BACKEND_IDENTIFIER: 'Backend Identifier',
  VOLUMES: 'Volume',
  VOLUME_PL: 'Volumes',
  NUMBER_OF_VOLUMES: 'Number of volumes',
  VOLUME_LOW: 'volume',
  VOLUME_INSTANCE: 'Volume Instance',
  VOLUME_INSTANCE_PL: 'Volume Instances',
  VOLUME_INSTANCE_LOW: 'volume instance',
  VOLUME_INSTANCE_EMPTY_DESC: 'Please bind a volume to a workload.',
  'The volume name exists': 'The volume name exists',
  VOLUME_SIZE_TIP: 'The volume capacity must be greater than 0.',
  VOLUME_NAME_EXIST: 'The volume name already exists.',
  'The volume size must be greater than zero':
    'The volume size must be greater than zero',
  VOLUME_TEMPLATE_SETTINGS: 'Volume Template Settings',
  'Volume Usage': 'Volume Usage',
  VOLUME_DESC:
    'A volume is used for workloads created by users. It represents a resource object for the data persistence of workloads.',
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
  VOLUME_EMPTY_DESC: 'Please create a volume.',
  VOLUME_SETTINGS_DESC:
    'Fill in the capacity of the volume as needed, and the volume size and access mode must be compatible with the storage class and storage server capabilities. The access mode is usually selected as RWO.',
  VOLUME_STORAGE_CLASS_DESC:
    'Select a storage class to create a volume of a specific type.',

  PROVISIONER_DESC: 'Provide backend storage',

  // Volume Pages
  ACCESS_MODE_TCAP: 'Access Mode',

  ACCESS_MODES_DESC: 'Select an access mode supported by the storage class.',

  DELETE_STORAGE_TIP:
    'If the storage volume is being mounted, delete it when the workload is deleted.',
  SRORAGE_SETTING_DESC:
    'ReadWriteOnce: Single node read and write.<br/>ReadOnlyMany: Multi-node read-only.<br/>ReadWriteMany: Multi-node read and write.<br/>Only one mode can be used when mounting.',

  STORAGE_CLASS_DESC:
    'Storage classes support dynamic volume provisioning, allowing administrators to create new storage volumes on demand.',

  'STORAGE-CLASSES_BASEINFO_DESC':
    'The storage type records the configuration information of a certain type of storage provided by the administrator. Before creating a specific type of storage volume, the corresponding storage type must be configured.',
  STORAGE_CLASS_SETTING_DESC:
    'The storage type records the configuration information of a certain type of storage provided by the administrator. Before creating a specific type of storage volume, the corresponding storage type must be configured.',

  STORAGE_CLASS_SET_DEFAULT_DESC:
    'After the default storage class is set, the system will create volumes of this class by default if no special requirement is added. Only one default storage class is allowed in a KubeSphere cluster.',

  STORAGECLASSES_BASEINFO_DESC:
    'A StorageClass provides a way for administrators to configure the "classes" of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. You need to create a StorageClass before users can create volume (i.e., PVC) based on the StorageClass.',
  STORAGECLASS_PARAMETER_TIP:
    'Please refer to <a href="{link}" target="_blank">Kubernetes docs</a> for details.',
  VOLUME_BASEINFO_TIP:
    'The volume is provisioned through dynamic volume provisioning which allows storage volumes to be created on-demand. The volume is used for persisting data, and has explict lifecycle independent of any individual pod that uses it. At lease one StorageClass must be configured by adminstrators before creating a volume.',

  WHAT_IS_STORAGE_CLASS_Q: 'What is a storage class?',
  WHAT_IS_STORAGE_CLASS_A:
    'A storage class is a storage type configured by the cluster administrator. Different storage classes provide cluster users with different types of volumes.',

  WHAT_IS_LOCAL_VOLUME_Q: 'What is a local volume?',
  WHAT_IS_LOCAL_VOLUME_A:
    'A local volume is a volume created in the local file system of the cluster.',
  CHOOSE_STORAGE_SYSTEM_TIP: 'Select Storage System',
  PROVISIONER_DEPENDENCE_DESC:
    'You need to deploy a plugin in your storage system before it provides services.',

  VOLUME_EXPAND_TIPS:
    'The current PVC has been mounted to the work load, so the expansion will lead to the workload restart, and a new version. Business may be a brief interruption. ',

  QINGCLOUD_CSI_DESC:
    'Use QingCloud CSI as the underlying storage plugin. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Learn More</a>',

  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  TAGS: 'Tag',

  QINGCLOUD_CSI_TYPE_DESC:
    'On QingCloud Public Cloud Platform, 0 means high performance volume; 2 high capacity volume; 3 ultra-high performance volume; 5 enterprise server SAN (NeonSAN); 100 standard volume; 200 enterprise SSD.',
  CREATE_VOLUME_MAX_SIZE: 'Maximum size of the volume.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Minimum size of the volume.',
  VOLUME_FS_TYPE: 'Supports ext3, ext4, and XFS. The default type is ext4.',

  GLUSTERFS_RESTURL_DESC:
    'Heketi REST URL that provisions volumes, for example, <Heketi Service cluster IP Address>:<Heketi Service port number>.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC:
    'Gluster enables authentication to the REST server.',
  GLUSTERFS_RESTUSER_DESC:
    'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimum GID of the volume.',
  GLUSTERFS_GID_MAX_DESC: 'Maximum GID of the volume.',
  GLUSTERFS_VOLUME_TYPE_DESC:
    'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Add tags to the storage volume. Use commas to separate multiple tags.',

  CEPHRBD_MONITORS_DESC: 'IP address of Ceph monitors.',
  CEPHRBD_ADMIN_ID_DESC:
    'Ceph client ID that is capable of creating images in the pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'The namespace for adminSecretName.',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC:
    'Ceph client ID that is used to map the RBD image. Default is the same as adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC:
    'The name of Ceph Secret for userId to map RBD image.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'The namespace for userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC:
    'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC:
    'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',

  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    'Make sure if there are resources dependent on the storage class. If there are, you need to disable the resources before it the resource functions are affected.',

  CREATE_VOLUME_BY_STORAGE_CLASS: 'From Storage Class',
  CREATE_VOLUME_BY_SNAPSHOT: 'From Volume Snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Select a snapshot to create a volume.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME:
    'Select a storage class to create a volume.',
  VOLUME_SNAPSHOT_DESC:
    'A volume snapshot is the copy of a volume at a specific point in time. It can be used to provision a new volume with data pre-populated by the snapshot or restore a volume to its previous state that is captured by the snapshot.',
  VOLUME_SNAPSHOT_EMPTY_DESC:
    'Please go to the details page of a volume and create a volume snapshot',
  WHAT_IS_VOLUME_SNAPSHOTS: 'What are volume snapshots?',

  CLUSTER_VOLUME_DIFF_DESC:
    'Use different storage settings in different clusters.',

  VOLUME_MONITORING_TIP:
    'Currently, only usage data of mounted volumes can be collected. Usage data of path-based volumes such as OpenEBS, Local PV, and NFS volumes may be inaccurate. <a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">Learn More</a>',

  VOLUME_FUNCTION_MANAGEMENT_TIP:
    '存储卷功能管理只是控制是否在ks console中启用这项功能，并不表示存储系统支持这项功能，设置前需要和管理员确认。',
  // Storage Classes
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentication',
  REST_USER: 'REST User',
  VOLUME_TYPE: 'Volume Type',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'True',
  CEPH_MONITOR_IP: 'IP address and port number',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'Minimum GID',
  GID_MAX: 'Maximum GID',
  CUSTOM: 'Custom',
  PARAMETERS: 'Parameters',
  VOLUME_SNAPSHOT_CLASS: 'Volume Snapshot Class',
  SNAPSHOT_EMPTY_TIP: 'Please select a volume snapshot class.',
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  DEFAULT_STORAGE_CLASS: 'Default Storage Class',

  // Storage Class > Detail
  STORAGE_CLASS_SCAP: 'Storage class',
  CREATE_VOLUME: 'Create Volume',
  VOLUME_MANAGEMENT: 'Volume Management',
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Set as Default Storage Class',
  VOLUME_COUNT: 'Volumes',
}
