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
  STORAGE_VOLUME_EXTENSION: 'Storage Volume Extension',
  'Available Capacity': 'Available Capacity',
  'Create Snapshot': 'Create Snapshot',
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
  'Expand Volume': 'Expand Volume',
  AVAILABLE: 'Available',
  IN_USER: 'In use',
  'Mount Info': 'Mount Info',
  'Mount Options': 'Mount Options',
  'Mount Status': 'Mount Status',
  // Volumes List Page
  MOUNT_STATUS: 'Mount Status',
  MOUNTED_TCAP: 'Mounted',
  'Mounted Pods': 'Mounted Pods',
  NOT_MOUNTED: 'Not mounted',
  Parameters: 'Parameters',
  'Parameters (key-value pairs)': 'Parameters (key-value pairs)',
  PersistentVolumeClaim: 'Volume',
  PersistentVolumes: 'PersistentVolumes',
  RECLAMATION_POLICY: 'Reclamation Policy',
  CREATE: 'Create',
  Scalable: 'Scalable',
  'Set as default storage class': 'Set as default storage class',
  'Snapshot Message': 'Snapshot Message',
  'Snapshots Message': 'Snapshot Message',
  'Storage Class': 'Storage Class',
  STORAGE_CLASS: 'Storage Class',
  STORAGE_CLASS_PL: 'Storage Classes',
  STORAGE_CLASS_LOW: 'storage class',
  STORAGE_CLASS_VALUE: 'Storage class: {value}',
  'Storage Class Name': 'Storage Class Name',
  STORAGE_CLASS_SETTINGS: 'Storage Class Settings',
  'storage classes': 'storage classes',
  STORAGE_SYSTEM: 'Storage System',
  STORAGE_CLASS_CREATE_DESC:
    'The Storage Class is configured by the cluster administrator to configure storage server parameters and provide storage for cluster users by class.',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  VOLUME_SNAPSHOT_SUPPORT: 'Volume Snapshot Allow',
  VOLUME_CLONE_SUPPORT: 'Volume Clone Allow',
  VOLUME_EXPANSION_SUPPORT: 'Volume Expansion Allow',
  PV: 'Volume Backend',
  PV_STATUS_AVAILABLE: 'Available',
  PV_STATUS_BOUND: 'Bound',
  PV_STATUS_RELEASED: 'Released',
  PV_STATUS_FAILED: 'Failed',
  PV_STATUS_TERMINATING: 'Terminating',
  'Bound Volume': 'Storage volume bound',
  'Recycling mechanism': 'Recycling Mechanism',
  ACCESS_MODE: 'Access Mode',
  ACCESS_MODE_SCAP: 'Access mode',
  'Used Capacity': 'Used Capacity',
  'Clone Volume': 'Clone Volume',
  VOLUME: 'Volume',
  VOLUME_PL: 'Volumes',
  VOLUME_LOW: 'volumes',
  'The volume name exists': 'The volume name exists',
  VOLUME_SIZE_TIP: 'The volume capacity must be greater than zero.',
  VOLUME_COUNT: 'Volumes',
  VOLUME_NAME_EXIST: 'The volume name already exists.',
  'The volume size must be greater than zero':
    'The volume size must be greater than zero',
  'Volume Template Settings': 'Volume Template Settings',
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
    'Select a storage class to create a specific type of volume.',

  PROVISIONER_DESC: 'Provide backend storage',

  // Volume Pages
  ACCESS_MODE_TCAP: 'Access Mode',

  ACCESS_MODES_DESC: 'Select the access mode supported by the storage class.',

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
    'After the default storage class is set, the system will create volumes of this class by default if no special requirement is added. Only one default storage class is allowed in a Kubernetes cluster.',

  STORAGECLASSES_BASEINFO_DESC:
    'A StorageClass provides a way for administrators to configure the "classes" of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. You need to create a StorageClass before users can create volume (i.e., PVC) based on the StorageClass.',
  STORAGECLASS_PARAMETER_TIP:
    'Please refer to <a href="{link}" target="_blank">Kubernetes docs</a> for details.',
  VOLUME_BASEINFO_TIP:
    'The volume is provisioned through dynamic volume provisioning which allows storage volumes to be created on-demand. The volume is used for persisting data, and has explict lifecycle independent of any individual pod that uses it. At lease one StorageClass must be configured by adminstrators before creating a volume.',

  WHAT_IS_STORAGE_CLASS_Q: 'What is a Storage Class?',
  WHAT_IS_STORAGE_CLASS_A:
    'A Storage Class represents a kind of storage configured by the cluster administrator. Different Storage Classes provide cluster users with different kinds of volumes.',

  WHAT_IS_LOCAL_VOLUME_Q: 'What is a Local Volume?',
  WHAT_IS_LOCAL_VOLUME_A:
    'A Local Volume is a mounted local storage device, such as a disk, partition, or directory.',
  CHOOSE_STORAGE_SYSTEM_TIP: 'Select Storage System',
  PROVISIONER_DEPENDENCE_DESC:
    'Storage plug-ins need to be deployed in the storage system to provide services.',

  VOLUME_EXPAND_TIPS:
    'The current PVC has been mounted to the work load, so the expansion will lead to the workload restart, and a new version. Business may be a brief interruption. ',

  QINGCLOUD_CSI_DESC:
    'Use QingCloud CSI as the underlying storage plug-in. For more information, see <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">QingCloud CSI</a>.',

  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  TAGS: 'Tag',

  QINGCLOUD_CSI_TYPE_DESC:
    'On QingCloud Public Cloud Platform, 0 means high performance volume; 2 high capacity volume; 3 ultra-high performance volume; 5 enterprise server SAN (NeonSAN); 100 standard volume; 200 enterprise SSD.',
  CREATE_VOLUME_MAX_SIZE: 'Set the maximum size of the storage volume.',
  CREATE_VOLUME_STEP_SIZE: 'Set the step size of the storage volume.',
  CREATE_VOLUME_MIN_SIZE: 'Set the minimum size of the storage volume.',
  VOLUME_FS_TYPE:
    'Set the file system type of the storage volume. The value can be ext3, ext4, or xfs, and it defaults to ext4.',

  GLUSTERFS_RESTURL_DESC:
    'Gluster REST service or Heketi service URL that provisions Gluster volumes on demand.',
  GLUSTERFS_ID_DESC: 'The Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Enable authentication to the REST server.',
  GLUSTERFS_RESTUSER_DESC:
    'Gluster REST service or Heketi user who can create volumes in the Gluster Trusted Pool.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC:
    'The minimum value of GID range for the storage class.',
  GLUSTERFS_GID_MAX_DESC:
    'The maximum value of GID range for the storage class.',
  GLUSTERFS_VOLUME_TYPE_DESC: 'Optional type of the volume.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Add tags to the storage volume. Multiple tags need to be separated by commas.',

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

  CREATE_VOLUME_BY_STORAGE_CLASS: 'Create a Volume from Storage Class',
  CREATE_VOLUME_BY_SNAPSHOT: 'Create a Volume from Volume Snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Select a snapshot to create a volume.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME:
    'Select a storage class to create a volume.',
  VOLUMESNAPSHOT_DESC:
    'A volume snapshot is the copy of a volume at a specific point in time. It can be used to provision a new volume with data pre-populated by the snapshot or restore a volume to its previous state that is captured by the snapshot.',
  VOLUMESNAPSHOT_EMPTY_DESC:
    'Please go to the details page of a volume and create a volume snapshot',
  WHAT_IS_VOLUME_SNAPSHOTS: 'What are volume snapshots?',

  CLUSTER_VOLUME_DIFF_DESC:
    'You can specify different storage classes for different clusters.',

  VOLUME_MONITORING_TIP:
    'Kubernetes collects volume usage data, excluding data from unmounted volumes. For path-based volumes such as OpenEBS/Local PV and NFS, the data collected may be different from the actual amount. For detailed information, see <a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">volume monitoring data analysis</a>.',

  // Storage Classes
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentication',
  REST_USER: 'REST User',
  VOLUME_TYPE: 'Volume Type',
  REST_URL_EXAMPLE: 'IP address and port number',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'True',
  CEPH_MONITOR_IP: 'IP address and port number',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'GID Minimum Value',
  GID_MAX: 'GID Maximum Value',
  CUSTOM: 'Custom',
  PARAMETERS: 'Parameters',
  SNAPSHOT_TYPE: 'Snapshot type',
  SNAPSHOT_EMPTY_TIP: 'Please select a snapshot type.',
  VOLUME_BINDING_MODE: 'Storage volume binding mode',
  BINDING_IMMEDIATE: 'Bind now',
  BINDING_WAIT: 'Delayed binding',
}
