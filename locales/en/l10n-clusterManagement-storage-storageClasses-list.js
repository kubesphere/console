/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  STORAGE_CLASS_PL: 'Storage Classes',
  STORAGE_CLASS_DESC:
    'Storage classes support dynamic volume provisioning, allowing administrators to create new storage volumes on demand.',
  // List
  STORAGE_CLASS_EMPTY_DESC: 'Please create a storage class.',
  DEFAULT_STORAGE_CLASS: 'Default Storage Class',
  ALLOW_VOLUME_SNAPSHOT: 'Volume Snapshot Allowed',
  ALLOW_VOLUME_CLONE: 'Volume Clone Allowed',
  ALLOW_VOLUME_EXPANSION: 'Volume Expansion Allowed',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: 'Select Storage System',
  PROVISIONER_DEPENDENCE_DESC:
    'You need to deploy a plugin in your storage system before it provides services.',
  QINGCLOUD_CSI_DESC:
    'Use QingCloud CSI as the underlying storage plugin. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Learn More</a>',
  CUSTOM: 'Custom',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: 'Volume Expansion',
  RECLAIM_POLICY: 'Reclaim Policy',
  ACCESS_MODE: 'Access Mode',
  ACCESS_MODES_DESC: 'Select one or more access modes supported by the storage class.',
  STORAGE_SYSTEM: 'Storage System',
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  QINGCLOUD_CSI_TYPE_DESC:
    'On QingCloud Public Cloud Platform, 0 means high performance volume; 2 high capacity volume; 3 ultra-high performance volume; 5 enterprise server SAN (NeonSAN); 100 standard volume; 200 enterprise SSD.',
  CREATE_VOLUME_MAX_SIZE: 'Maximum size of the volume.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Minimum size of the volume.',
  VOLUME_FS_TYPE: 'Supports ext3, ext4, and xfs. The default type is ext4.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Add tags to the storage volume. Use commas to separate multiple tags.',
  GID_RANGE_TIP: 'The value cannot be less than 2000 or greater than 2147483647.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: 'Heketi REST URL that provisions volumes.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Gluster enables authentication to the REST server.',
  GLUSTERFS_RESTUSER_DESC: 'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimum GID of the volume.',
  GLUSTERFS_GID_MAX_DESC: 'Maximum GID of the volume.',
  GLUSTERFS_VOLUME_TYPE_DESC:
    'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentication',
  REST_USER: 'REST User',
  VOLUME_TYPE: 'Volume Type',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'True',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'Minimum GID',
  GID_MAX: 'Maximum GID',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'IP address of Ceph monitors.',
  CEPHRBD_ADMIN_ID_DESC: 'Ceph client ID that is capable of creating images in the pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'The namespace for adminSecretName.',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC:
    'Ceph client ID that is used to map the RBD image. Default is the same as adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC: 'The name of Ceph secret for userId to map RBD image.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'The namespace for userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC:
    'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC:
    'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',
  CEPH_MONITOR_IP: 'IP address and port number',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: 'Storage Class Settings',
  PARAMETERS: 'Parameters',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: 'Storage Class',
  STORAGE_CLASS_LOW: 'storage class',
  STORAGE_CLASS_DELETE_DESC:
    'Deleting the volume snapshot class may affect the normal use of volume snapshots. Are you sure you want to delete the volume snapshot class?',
  STORAGE_CLASS_DELETE_DESC_PL:
    'Deleting the volume snapshot class may affect the normal use of volume snapshots. Enter the {type} names <strong>{resource}</strong> to confirm that you understand the risks of this operation.',
};
