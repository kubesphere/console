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
  STORAGE_CLASS_PL: 'Speicherklassen',
  STORAGE_CLASS_DESC: 'Storage classes support dynamic volume provisioning, allowing administrators to create new storage volumes on demand.',
  // List
  STORAGE_CLASS_EMPTY_DESC: 'Please create a storage class.',
  DEFAULT_STORAGE_CLASS: 'Standardspeicherklasse',
  ALLOW_VOLUME_SNAPSHOT: 'Volume Snapshot Allowed',
  ALLOW_VOLUME_CLONE: 'Volume Clone Allowed',
  ALLOW_VOLUME_EXPANSION: 'Volume Expansion Allowed',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: 'Speichersystem auswählen',
  PROVISIONER_DEPENDENCE_DESC: 'You need to deploy a plugin in your storage system before it provides services.',
  QINGCLOUD_CSI_DESC: 'Use QingCloud CSI as the underlying storage plugin. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Learn More</a>',
  CUSTOM: 'Custom',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: 'Volume Expansion',
  RECLAIM_POLICY: 'Reclaim Policy',
  ACCESS_MODE: 'Zugriffsmodus',
  ACCESS_MODES_DESC: 'Select one or more access modes supported by the storage class.',
  STORAGE_SYSTEM: 'Speichersystem',
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  MAXSIZE: 'Maximale Größe',
  MINSIZE: 'Minimale Größe',
  STEPSIZE: 'Step Size',
  FSTYPE: 'Dateisystemtyp',
  QINGCLOUD_CSI_TYPE_DESC: 'On QingCloud Public Cloud Platform, 0 means high performance volume; 2 high capacity volume; 3 ultra-high performance volume; 5 enterprise server SAN (NeonSAN); 100 standard volume; 200 enterprise SSD.',
  CREATE_VOLUME_MAX_SIZE: 'Maximale Größe des Volumens.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Mindestgröße des Volumens.',
  VOLUME_FS_TYPE: 'Unterstützt ext3, ext4 und xfs. Der Standardtyp ist ext4.',
  QINGCLOUD_VOLUME_TAGS_DESC: 'Tags zum Speichervolumen hinzufügen. Verwenden Sie Kommas, um mehrere Tags zu trennen.',
  GID_RANGE_TIP: 'Der Wert darf nicht kleiner als 2000 oder größer als 2147483647 sein.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: 'Heketi REST URL that provisions volumes.',
  GLUSTERFS_ID_DESC: 'Gluster Cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Gluster enables authentication to the REST server.',
  GLUSTERFS_RESTUSER_DESC: 'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimale GID des Volumens.',
  GLUSTERFS_GID_MAX_DESC: 'Maximale GID des Volumens.',
  GLUSTERFS_VOLUME_TYPE_DESC: 'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentifizierung',
  REST_USER: 'REST Benutzer',
  VOLUME_TYPE: 'Volume-Typ',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'Wahr',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'Minimale GID',
  GID_MAX: 'Maximale GID',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'IP-Adresse von Ceph Monitoren.',
  CEPHRBD_ADMIN_ID_DESC: 'Ceph client ID that is capable of creating images in the pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'The namespace for adminSecretName.',
  CEPHRBD_POOL_DESC: 'Name des Ceph RBD Pools.',
  CEPHRBD_USERID_DESC: 'Ceph-Client-ID, die verwendet wird, um das RBD-Image zuzuordnen. Der Standardwert ist derselbe wie adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC: 'The name of Ceph secret for userId to map RBD image.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'The namespace for userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'Dateisystemtyp des Speichervolumes.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',
  CEPH_MONITOR_IP: 'IP-Adresse und Portnummer',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: 'Speicherklasseneinstellungen',
  PARAMETERS: 'Parameter',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: 'Speicherklasse',
  STORAGE_CLASS_LOW: 'speicherklasse',
  STORAGE_CLASS_DELETE_DESC: 'Are you sure you want to delete the storage class?',
  STORAGE_CLASS_DELETE_DESC_PL: 'Enter the {type} names <strong>{resource}</strong> to confirm that you understand the risks of this operation.'
};