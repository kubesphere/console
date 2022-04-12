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
  // Details
  TRUE: 'Doğru',
  FALSE: 'Yanlış',
  // More > Set as Default Storage Class
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Varsayılan Depolama Sınıfı Olarak Ayarla',
  SET_AS_DEFAULT_STORAGE_CLASS: 'Varsayılan Depolama Sınıfı Olarak Ayarla',
  STORAGE_CLASS_SET_DEFAULT_DESC: 'Varsayılan depolama sınıfı ayarlandıktan sonra, herhangi bir özel gereksinim eklenmemişse, sistem varsayılan olarak bu sınıfın birimlerini oluşturacaktır. KubeSphere kümesinde yalnızca bir varsayılan depolama sınıfına izin verilir.',
  // More > StorageClass Accessor
  STORAGECLASS_ACCESSOR: 'Storageclass Accessor',
  STORAGECLASS_ACCESSOR_SETTING: 'Storageclass Accessor Settings',
  STORAGECLASS_ACCESSOR_DES: 'Users can create accessors to achieve namespace-level management on the storage class which provisions PVC.',
  // More > Volume Management
  VOLUME_MANAGEMENT: 'Hacim Yönetimi',
  VOLUME_CLONE: 'Hacim Klon',
  ALLOW_VOLUME_CLONE_DESC: 'Kullanıcıların birimleri klonlamasına izin verir.',
  ALLOW_VOLUME_SNAPSHOT_DESC: 'Kullanıcıların toplu anlık görüntüler oluşturmasına olanak tanır.',
  'Volume Expansion': 'Depolama birimi genişletme',
  ALLOW_VOLUME_EXPANSION_DESC: 'Kullanıcıların birimleri genişletmesine izin verir. Hacimler yalnızca genişletilebilir ve daraltılamaz.',
  VOLUME_FUNCTION_MANAGEMENT_TIP: 'Birim Yönetimi yalnızca KubeSphere web konsolunda aşağıdaki özelliklerin etkinleştirilip etkinleştirilmediğini kontrol eder. Özellikler etkinleştirilmeden önce, depolama sistemi tarafından desteklendiğini doğrulamak için sistem yöneticinizle iletişime geçin.',
  VOLUME_SNAPSHOT: 'Birim Anlık Görüntüsü',
  // More > PVC Autoresizer
  PVC_AUTORESIZER_PL: 'PVC Autoresizer',
  PVC_AUTORESIZER_DESC: 'Pvc-autoresizer resizes PersistentVolumeClaims (PVCs) when the free amount of storage is below the threshold.',
  PVC_AUTORESIZER_SETTINGS: 'Autoresizer Settings',
  MAX_SIZE: 'Max size',
  THRESHOLD_DESC: 'Storage is increased when the amount of free space of the volume is below threshold.',
  INCREASE: 'Increase',
  INCREASE_DESC: 'The increase value is calculated as the current storage value multiplied by the percentage value, if given as a percentage.',
  AUTOMATIC_RESTART_WORKLOAD: 'Automatic restart workload',
  AUTOMATIC_RESTART_WORKLOAD_DESC: 'The restarter judges the workload that needs to be restarted automatically by checking the status of pvc.',
  AUTOMATIC_RESTART_WORKLOAD_TIP: 'If the automatic restart time of the PVC exceeds the maximum time, the corresponding workload will be annotated with "restart.kubesphere.io/skip". To enable the automatic restart function for the PVC again, delete the above annotation.',
  MAX_TIME: 'Max Time',
  STORAGE_LIMIT: 'Storage Limit',
  // More > Delete
  // Volumes
  VOLUME_COUNT: 'Birimler'
};