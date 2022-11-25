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
  // Navigation pane
  STORAGE: 'Depolama',
  // Banner
  PERSISTENT_VOLUME_CLAIM_DESC: 'Kalıcı hacim talepleri, depolama gereksinimlerini tanımlar. Sistem, kalıcı hacim taleplerine göre kalıcı birimler oluşturur.',
  PERSISTENT_VOLUME_CLAIM: 'Kalıcı Hacim Talebi',
  PERSISTENT_VOLUME_CLAIM_PL: 'Kalıcı Hacim Talebi',
  WHAT_IS_STORAGE_CLASS_Q: 'Depolama sınıfı nedir?',
  WHAT_IS_STORAGE_CLASS_A: 'Depolama sınıfı, küme yöneticisi tarafından yapılandırılan bir depolama türüdür. Farklı depolama sınıfları, küme kullanıcılarına farklı türde birimler sağlar.',
  WHAT_IS_LOCAL_VOLUME_Q: 'Yerel hacim nedir?',
  WHAT_IS_LOCAL_VOLUME_A: 'Yerel birim, kümenin yerel dosya sisteminde oluşturulan bir birimdir.',
  // List
  VOLUME_STATUS_BOUND: 'Bağlı',
  VOLUME_STATUS_LOST: 'Kayıp',
  VOLUME_STATUS_PENDING: 'Bekliyor',
  VOLUME_STATUS_TERMINATING: 'Sonlandırma',
  VOLUME_STATUS_UPDATING: 'Güncelleniyor',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Disk Genişletme',
  PERSISTENT_VOLUME_CLAIM_EMPTY_DESC: 'Lütfen kalıcı bir birim hak talebi oluşturun.',
  MOUNT_STATUS: 'Bağlılık Durumu',
  MOUNTED: 'Bağlandı',
  NOT_MOUNTED: 'Bağlanamadı',
  ACCESS_MODE_TCAP: 'Erişim modu',
  RWO_DESC: 'RWO: Single-node read and write',
  ROX_DESC: 'ROX: Multi-node readonly',
  RWX_DESC: 'RWX: Multi-node read and write',
  // List > Create > Basic Information
  CREATE: 'Oluştur',
  CREATE_PERSISTENT_VOLUME_CLAIM: 'Kalıcı Birim Talebi Oluştur',
  // List > Create > Storage Settings
  CREATION_METHOD: 'Oluşturma Yöntemi',
  CREATE_VOLUME_BY_STORAGE_CLASS: 'Depolama Sınıfından',
  CREATE_VOLUME_BY_SNAPSHOT: 'Birim Anlık Görüntüsü',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Birim oluşturmak için bir anlık görüntü seçin.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME: 'Birim oluşturmak için bir depolama sınıfı seçin.',
  VOLUME_CAPACITY: 'Bölüm Kapasitesi',
  PARAM_REQUIRED: 'Parametre gereklidir.',
  VOLUME_SIZE_TIP: 'Hacim kapasitesi 0\'dan büyük olmalıdır.',
  VOLUME_STORAGE_CLASS_DESC: 'Belirli bir türde birim oluşturmak için bir depolama sınıfı seçin.',
  // List > Advanced Settings
  // List > Edit
  // List > Edit YAML
  // List > Delete
  PERSISTENT_VOLUME_CLAIM_LOW: 'kalıcı hacim talebi'
};