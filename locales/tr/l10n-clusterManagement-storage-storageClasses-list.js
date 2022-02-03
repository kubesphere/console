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
  STORAGE_CLASS_PL: 'Depolama Sınıfları',
  STORAGE_CLASS_DESC: 'Depolama sınıfları, dinamik birim sağlamayı destekleyerek yöneticilerin talep üzerine yeni depolama birimleri oluşturmasına olanak tanır.',
  // List
  STORAGE_CLASS_EMPTY_DESC: 'Lütfen bir depolama sınıfı oluşturun.',
  DEFAULT_STORAGE_CLASS: 'Varsayılan Depolama Sınıfı',
  ALLOW_VOLUME_SNAPSHOT: 'İzin verilen Birim Anlık Görüntüsü',
  ALLOW_VOLUME_CLONE: 'Birim Klonuna izin verildi',
  ALLOW_VOLUME_EXPANSION: 'Birim genişlemesine izin verildi',
  // List > Create
  // List > Create > Basic Information
  // List > Create > Storage System
  CHOOSE_STORAGE_SYSTEM_TIP: 'Depolama sistemini seç',
  PROVISIONER_DEPENDENCE_DESC: 'Hizmet sağlamadan önce depolama sisteminize bir eklenti dağıtmanız gerekir.',
  QINGCLOUD_CSI_DESC: 'Temel depolama eklentisi olarak QingCloud CSI kullanın. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Daha Fazla Bilgi Edinin</a>',
  CUSTOM: 'Özel',
  // List > Create > > QingCloud CSI > Storage Class Settings
  VOLUME_EXPANSION: 'Hacim Genişletme',
  RECLAIM_POLICY: 'Geri alma ilkesi',
  ACCESS_MODE: 'Erişim modu',
  ACCESS_MODES_DESC: 'Depolama sınıfı tarafından desteklenen bir erişim modu seçin.',
  STORAGE_SYSTEM: 'Depolama Sistemi',
  VOLUME_BINDING_MODE: 'Hacim Bağlama Modu',
  IMMEDIATE_BINDING: 'Anında bağlama',
  BINDING_WAIT: 'Gecikmeli bağlama',
  MAXSIZE: 'En Fazla Boyut',
  MINSIZE: 'En Az Boyut',
  STEPSIZE: 'Adım Boyutu',
  FSTYPE: 'Dosya Sistemi Türü',
  TAGS: 'Etiket',
  QINGCLOUD_CSI_TYPE_DESC: 'QingCloud Public Cloud Platform\'da 0, yüksek performans hacmi anlamına gelir; 2 yüksek kapasiteli hacim; 3 ultra yüksek performans hacmi; 5 kurumsal sunucu SAN (NeonSAN); 100 standart hacim; 200 kurumsal SSD.',
  CREATE_VOLUME_MAX_SIZE: 'Hacmin en fazla boyutu.',
  CREATE_VOLUME_STEP_SIZE: 'Hacmin adım boyutu.',
  CREATE_VOLUME_MIN_SIZE: 'Hacmin en az boyutu.',
  VOLUME_FS_TYPE: 'Ext3, ext4 ve XFS\'yi destekler. Varsayılan tür ext4\'tür.',
  QINGCLOUD_VOLUME_TAGS_DESC: 'Depolama birimine etiketler ekleyin. Birden çok etiketi ayırmak için virgül kullanın.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: 'Heketi REST URL that provisions volumes, for example, <Heketi service cluster IP address>:<Heketi service port number>.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Gluster enables authentication to the REST server.',
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
  CEPHRBD_ADMIN_ID_DESC: 'Ceph client ID that is capable of creating images in the pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'The namespace for adminSecretName.',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC: 'Ceph client ID that is used to map the RBD image. Default is the same as adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC: 'The name of Ceph secret for userId to map RBD image.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'The namespace for userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',
  CEPH_MONITOR_IP: 'IP address and port number',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: 'Storage Class Settings',
  PARAMETERS: 'Parameters',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: 'Storage Class',
  STORAGE_CLASS_LOW: 'storage class'
};