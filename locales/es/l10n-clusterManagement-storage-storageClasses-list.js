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
  // Banner
  STORAGE_CLASS_PL: 'Storage Classes',
  STORAGE_CLASS_DESC: 'Storage classes support dynamic volume provisioning, allowing administrators to create new storage volumes on demand.',
  // List
  STORAGE_CLASS_EMPTY_DESC: 'Please create a storage class.',
  DEFAULT_STORAGE_CLASS: 'Default Storage Class',
  ALLOW_VOLUME_SNAPSHOT: 'Permitir el almacenamiento de instantáneas de volumen',
  ALLOW_VOLUME_CLONE: 'Permitir la clonación del volumen de almacenamiento',
  ALLOW_VOLUME_EXPANSION: 'Permitir la expansión del volumen de almacenamiento',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: 'Elija el sistema de almacenamiento que necesita',
  PROVISIONER_DEPENDENCE_DESC: 'You need to deploy a plugin in your storage system before it provides services.',
  QINGCLOUD_CSI_DESC: 'Use QingCloud CSI as the underlying storage plugin. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Learn More</a>',
  CUSTOM: 'Custom',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: 'Volume Expansion',
  RECLAIM_POLICY: 'Reclaim Policy',
  ACCESS_MODE: 'Modo de acceso admitido',
  ACCESS_MODES_DESC: 'Select one or more access modes supported by the storage class.',
  STORAGE_SYSTEM: 'Sistema de almacenamiento',
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  QINGCLOUD_CSI_TYPE_DESC: 'En la plataforma de nube pública QingCloud, 0 representa un volumen de alto rendimiento. 2 representa volumen de alta capacidad. 3 representa un volumen súper alto rendimiento. 5 representa Enterprise Server SAN. 100 representa  volumen estándar.',
  CREATE_VOLUME_MAX_SIZE: 'Maximum size of the volume.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Minimum size of the volume.',
  VOLUME_FS_TYPE: 'Supports ext3, ext4, and xfs. The default type is ext4.',
  QINGCLOUD_VOLUME_TAGS_DESC: 'Add tags to the storage volume. Use commas to separate multiple tags.',
  GID_RANGE_TIP: 'The value cannot be less than 2000 or greater than 2147483647.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: 'Heketi REST URL that provisions volumes.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Habilite la autenticación en el servidor REST.',
  GLUSTERFS_RESTUSER_DESC: 'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimum GID of the volume.',
  GLUSTERFS_GID_MAX_DESC: 'Maximum GID of the volume.',
  GLUSTERFS_VOLUME_TYPE_DESC: 'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',
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
  CEPHRBD_ADMIN_ID_DESC: 'ID de cliente de Ceph que es capaz de crear imágenes en el pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'El namespace para adminSecretName',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC: 'ID de cliente Ceph que se utiliza para asignar la imagen RBD. El valor predeterminado es el mismo que adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC: 'El nombre de Ceph Secret para userId para mapear la imagen RBD',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'El namespace para userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',
  CEPH_MONITOR_IP: 'IP address and port number',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: 'Configuraciones de clase de almacenamiento',
  PARAMETERS: 'Parameters',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: 'Clase de almacenamiento',
  STORAGE_CLASS_LOW: 'storage class',
  STORAGE_CLASS_DELETE_DESC: 'Are you sure you want to delete the storage class?',
  STORAGE_CLASS_DELETE_DESC_PL: 'Introduce el {type} nombre <strong>{resource}</strong> para asegurarte de comprender los riesgos asociados con la operación.'
};