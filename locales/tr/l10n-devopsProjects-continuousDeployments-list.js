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
  CONTINUOUS_DEPLOYMENT_PL: 'Sürekli Dağıtımlar',
  CONTINUOUS_DEPLOYMENT_DESC: 'GitOps\'u kullanarak kaynakları sürekli olarak dağıtmak için sürekli dağıtımları yönetin. ',
  // List
  CONTINUOUS_DEPLOYMENT_EMPTY_DESC: 'Lütfen sürekli bir dağıtım kaynağı oluşturun.',
  DEGRADED: 'Bozulmuş',
  PROGRESSING: 'İlerleme',
  SYNCED: 'Senkronize Edildi',
  MISSING: 'Eksik',
  SUSPENDED: 'Askıya alındı',
  OUTOFSYNC: 'Senkron dışında',
  DEPLOY_LOCATION: 'Dağıtım konumu',
  // List > Create
  CREATE_CONTINUOUS_DEPLOYMENT: 'Sürekli dağıtım oluşturun',
  CD_SELECT_CODE_REPO_DESC: 'İş hattı tarafından kullanılacak bir kod deposu seçin.',
  DEPLOYMENT_SETTINGS: 'Dağıtım ayarları',
  CODE_REPOSITORY_SETTINGS: 'Kod Deposu Ayarları',
  SYNC_STRATEGY_TCAP: 'Senkronizasyon stratejileri',
  AUTO_SYNC_DESC: 'Otomatik olarak belirlenen kurallara göre senkronize edin.',
  MANUAL_SYNC_DESC: 'Özel kurallara göre senkronize edin.',
  PRUNE_RESOURCES: 'Kaynakları kısıtlama',
  SELF_HEAL: 'Kendini iyileştirme',
  MANIFEST_FILE_PATH: 'Manifest Dosya Yolu',
  MANIFEST_FILE_PATH_DESC: 'Kaynak dosya yolunu ayarlayın. ',
  DIRECTORY_RECURSE: 'Directory recurse',
  REPO_EMPTY_DESC: 'Lütfen yeni bir depo yakalayıcısı seçin.',
  // List > Delete
  CONTINUOUS_DEPLOYMENT: 'Sürekli Dağıtım',
  CONTINUOUS_DEPLOYMENT_LOW: 'sürekli Dağıtım',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI: '{resource} sürekli dağıtımını silmek üzeresiniz. <br/>Lütfen sürekli dağıtım tarafından oluşturulan kaynakların silinip silinmeyeceğini onaylayın.',
  DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL: '{resource} sürekli dağıtımlarını silmek üzeresiniz. <br/>Lütfen sürekli dağıtımlar tarafından oluşturulan kaynakların silinip silinmeyeceğini onaylayın.',
  NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC: 'Sürekli dağıtım tarafından oluşturulan kaynak bulunamadı.',
  DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT: 'Birden Çok Sürekli Dağıtımı Sil',
  DELETE_CONTINUOUS_DEPLOYMENT: 'Sürekli Dağıtımı Kurma',
  DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC: '{resourceName} tarafından oluşturulan kaynakları silin',
  // List > Sync
  SYNC: 'Senkronizasyon',
  SYNC_RESOURCE: 'Senkronizasyon Kaynağı',
  REVISION: 'Revizyon',
  REVISION_DESC: 'Kod deposunun dalını ve etiketini ayarlayın.',
  PRUNE: 'Kısıtlama',
  DRY_RUN: 'Kuru Çalışma',
  APPLY_ONLY: 'Yalnızca uygulama',
  FORCE: 'Kuvvet',
  SYNC_SETTINGS: 'Senkronizasyon Ayarları',
  SKIP_SCHEMA_VALIDATION: 'Şema doğrulamasını atla',
  AUTO_CREATE_PROJECT: 'Otomatik proje oluştur',
  PRUNE_LAST: 'Son Kısıtlama',
  APPLY_OUT_OF_SYNC_ONLY: 'Yalnızca senkronizasyon dışı uygula',
  PRUNE_PROPAGATION_POLICY: 'Budama Yayılma Politikası',
  REPLACE_RESOURCE: 'Kaynağı Değiştir',
  REPLACE_RESOURCE_DESC: 'Zaten varolan dosyaları değiştirin.',
  EMPTY_CD_TITLE: 'Sürekli Dağıtım Bulunamadı',
  SYNC_TRIGGERED: 'Kaynak senkronizasyonu başarıyla tetiklendi.',
  // List > Parameter
  PARAMETER_SETTINGS: 'Parameter Settings',
  AUTO_PARAMETER: 'Auto',
  AUTO_PARAMETER_DESC: 'Set automatically.',
  HELM_PARAMETER: 'Helm',
  HELM_PARAMETER_DESC: 'Set Helm parameter.',
  KUSTOMIZE_PARAMETER: 'Kustomize',
  KUSTOMIZE_PARAMETER_DESC: 'Set Kustomize parameters.',
  PASS_CREDENTIALS: 'Pass Credentials',
  IGNORE_MISSING_VALUE_FILES: 'Ignore Missing Value Files',
  SKIP_CRDS: 'Skip Crds',
  RELEASE_NAME: 'Release Name',
  VALUE_FILES: 'Value Files',
  FORCE_STRING: 'Force String',
  FILE_PARAMETERS: 'File Parameters',
  NAME_PREFIX: 'Name Prefix',
  NAME_SUFFIX: 'Name Suffix',
  IMAGES: 'Images',
  COMMON_LABELS: 'Common Labels',
  COMMON_ANNOTATIONS: 'Common Annotations'
};