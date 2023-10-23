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
  ACCESS_MODES_DESC: 'Depolama sınıfı tarafından desteklenen bir veya daha fazla erişim modu seçin.',
  STORAGE_SYSTEM: 'Depolama Sistemi',
  VOLUME_BINDING_MODE: 'Hacim Bağlama Modu',
  IMMEDIATE_BINDING: 'Anında bağlama',
  BINDING_WAIT: 'Gecikmeli bağlama',
  MAXSIZE: 'En Fazla Boyut',
  MINSIZE: 'En Az Boyut',
  STEPSIZE: 'Adım Boyutu',
  FSTYPE: 'Dosya Sistemi Türü',
  QINGCLOUD_CSI_TYPE_DESC: 'QingCloud Public Cloud Platform\'da 0, yüksek performans hacmi anlamına gelir; 2 yüksek kapasiteli hacim; 3 ultra yüksek performans hacmi; 5 kurumsal sunucu SAN (NeonSAN); 100 standart hacim; 200 kurumsal SSD.',
  CREATE_VOLUME_MAX_SIZE: 'Hacmin en fazla boyutu.',
  CREATE_VOLUME_STEP_SIZE: 'Hacmin adım boyutu.',
  CREATE_VOLUME_MIN_SIZE: 'Hacmin en az boyutu.',
  VOLUME_FS_TYPE: 'Ext3, ext4 ve xfs\'yi destekler. Varsayılan tür ext4\'tür.',
  QINGCLOUD_VOLUME_TAGS_DESC: 'Depolama birimine etiketler ekleyin. Birden çok etiketi ayırmak için virgül kullanın.',
  GID_RANGE_TIP: 'The value cannot be less than 2000 or greater than 2147483647.',
  // List > Create > > GlusterFS > Storage Class Settings
  GLUSTERFS_RESTURL_DESC: 'Hacimleri sağlayan Heketi REST URL\'si.',
  GLUSTERFS_ID_DESC: 'Gluster küme kimliği.',
  GLUSTERFS_RESTAUTHENABLED_DESC: 'Gluster, REST sunucusuna kimlik doğrulaması sağlar.',
  GLUSTERFS_RESTUSER_DESC: 'Gluster REST hizmetinin veya Heketi hizmetinin kullanıcı adı.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Heketi kullanıcı sırrının ad alanı.',
  GLUSTERFS_SECRET_NAME_DESC: 'Heketi kullanıcı sırrının adı.',
  GLUSTERFS_GID_MIN_DESC: 'Hacimin en az GID\'si.',
  GLUSTERFS_GID_MAX_DESC: 'Hacimin en fazla GID\'si.',
  GLUSTERFS_VOLUME_TYPE_DESC: 'Hacim türü. Değer yok, replike:<Replicate count> veya disperse:<Data>:<Redundancy count> olabilir. Birim türü ayarlanmadıysa, varsayılan birim türü çoğaltma:3\'tür.',
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Küme Kimliği',
  REST_AUTH_ENABLED: 'REST Doğrulaması',
  REST_USER: 'Rest Kullanıcı',
  VOLUME_TYPE: 'Hacim Tipi',
  SECRET_NAME: 'Sır Adı',
  REST_AUTH_TRUE: 'Doğru',
  SECRET_NAMESPACE: 'Sır Alanadı',
  GID_MIN: 'En az GID',
  GID_MAX: 'En Fazla GID',
  // List > Create > > Ceph RBD > Storage Class Settings
  CEPHRBD_MONITORS_DESC: 'Ceph izleme İp adresi.',
  CEPHRBD_ADMIN_ID_DESC: 'Havuzda görüntü oluşturabilen Ceph istemci kimliği.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Adminid\'in gizli adı.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'AdminSecretName için ad alanı.',
  CEPHRBD_POOL_DESC: 'Ceph RBD havuzunun adı.',
  CEPHRBD_USERID_DESC: 'RBD görüntüsünü eşlemek için kullanılan Ceph istemci kimliği. Varsayılan, adminId ile aynıdır.',
  CEPHRBD_USER_SECRET_NAME_DESC: 'RBD görüntüsünü eşlemek için kullanıcı kimliği için Ceph gizli anahtarının adı.',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'UserSecretName için ad alanı',
  CEPHRBD_FS_TYPE_DESC: 'Depolama biriminin dosya sistemi türü.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Ceph hacmi seçeneği. Değer "1" veya "2" olabilir. imageFormat\'ı "2" olarak ayarladığınızda imageFeatures\'ın doldurulması gerekir.',
  CEPHRBD_IMAGE_FEATURES_DESC: 'Ceph kümesinin ek işlevi. Değer yalnızca imageFormat\'ı "2" olarak ayarladığınızda ayarlanmalıdır.',
  CEPH_MONITOR_IP: 'IP adresi ve portu',
  // List > Create > > Custom > Storage Class Settings
  STORAGE_CLASS_SETTINGS: 'Depolama Sınıfı Ayarları',
  PARAMETERS: 'Parametreler',
  // List > Edit Information
  // List > Delete
  STORAGE_CLASS: 'Depolama Sınıfı',
  STORAGE_CLASS_LOW: 'depolama Sınıfı',
  STORAGE_CLASS_DELETE_DESC: 'Are you sure you want to delete the storage class?',
  STORAGE_CLASS_DELETE_DESC_PL: 'Enter the {type} names <strong>{resource}</strong> to confirm that you understand the risks of this operation.'
};