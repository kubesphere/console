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
  PIPELINE_PL: 'İş hatları',
  // List
  HEALTH: 'Sağlık',
  PULL_REQUEST_COUNT: 'Çekme İstekleri',
  HEALTHY: 'Sağlıklı',
  SUB_HEALTHY: 'Alt-sağlık',
  NO_STATUS: 'Durum yok',
  BRANCH_COUNT: 'Şubeler',
  PIPELINE_EMPTY_DESC: 'Lütfen bir işhattı oluşturun.',
  // List > Run
  BATCH_RUN_SUCCESS_SI: 'İş hattı başarıyla çalıştı.',
  BATCH_RUN_SUCCESS_PL: 'İş hatları başarıyla çalıştırıldı.',
  BATCH_RUN_UNSUPPORTED_DESC: 'Çok şubeli işlem hatları toplu olarak çalıştırılamaz.',
  // List > Edit
  // List > Copy
  COPY: 'Kopyala',
  COPY_PIPELINE: 'İş hattını Kopyala',
  PIPELINE_NAME_DESC: 'İş hattının adı. Aynı projedeki iş hatlarından farklı adları olmalıdır.',
  PIPELINE_NAME_TIP: 'Lütfen bir iş hattı adı girin.',
  // List > Delete
  // List > Create
  CREATE_PIPELINE: 'İş hattı oluştur',
  // List > Create > Basic Information
  SELECT_CODE_REPOSITORY: 'Kod Deposu Seç',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: 'İş hattının ait olduğu DevOps projesini seçin.',
  CODE_REPOSITORY_OPTIONAL: 'Kod Deposu (opsiyonel)',
  GO_CREATE_REPO: 'No code repository is available. Please create a code repository.',
  CODE_REPO_EXISTS: 'code repository already exists',
  SELECT_CODE_REPO_DESC: 'İş hattı tarafından kullanılacak bir kod deposu seçin.',
  RESELECT: 'Yeniden seç',
  // List > Create > Basic Information > Code Repository > GitHub
  CREDENTIAL_SI: 'Kimlik Bilgileri',
  CREDENTIAL: 'Kimlik Bilgileri',
  PIPELINE_CREDENTIAL_EMPTY_TIP: 'Lütfen bir kimlik bilgisi seçin.',
  SELECT_CREDENTIAL_DESC: 'Kod deposuna erişmek için kullanılan bir kimlik bilgisi seçin.',
  GITHUB_CREDENTIAL_EMPTY: 'Lütfen bir GitHub kimlik bilgisi ayarlayın.',
  INCORRECT_GITHUB_TOKEN_DESC: `Yanlış GitHub anahtarı.
   <a
     class="float-sağ"
     href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
     hedef="_blank"
   >
     GitHub abahtarı Alın
   </a>`,
  LOAD_MORE: 'Daha Fazla Yükle',
  NO_REPO_FOUND_DESC: 'Kod deposu bulunamadı.',
  // List > Create > Basic Information > Code Repository > GitLab
  GITLAB_SERVER_ADDRESS: 'GitLab Sunucu Adresi',
  GITLAB_SERVER_EMPTY_TIP: 'Lütfen bir GitLab sunucusunun adresini girin.',
  PROJECT_GROUP_OWNER: 'Proje Grubu/Sahiplik',
  PROJECT_GROUP_OWNER_EMPTY_TIP: 'Lütfen GitLab proje grubunun veya proje sahibinin adını girin.',
  REPOSITORY_NAME: 'Kod Deposu',
  REPOSITORY_NAME_EMPTY_TIP: 'Lütfen bir kod deposunun adını girin.',
  // List > Create > Basic Information > Code Repository > Bitbucket
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket Sunucu Adresi',
  BITBUCKET_SERVER_EMPTY_TIP: 'Lütfen bir Bitbucket sunucusunun adresini girin.',
  INCORRECT_USERNAME_OR_PASSWORD: 'Hatalı kullanıcı adı veya şifre.',
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: 'Lütfen bir Bitbucket sunucusu ve kimlik bilgisi ayarlayın.',
  BITBUCKET_ADDRESS_EMPTY_TIP: 'Lütfen bir Bitbucket sunucusunun adresini girin.',
  BITBUCKET_ADDRESS_INVALID_TIP: 'Geçersiz Bitbucket sunucu adresi.',
  // List > Create > Basic Information > Code Repository > Git
  CODE_REPOSITORY_ADDRESS_DESC: 'Jenkinsfile içeren bir depo kullanın.',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: 'Lütfen bir kod deposunun adresini girin.',
  CODE_REPOSITORY_ADDRESS: 'Kod Depo URL',
  // List > Create > Basic Information > Code Repository > SVN
  SINGLE_SVN: 'Tek-Şube SVN',
  SVN: 'SVN',
  BRANCH_EXCLUDED: 'Hariç Tutulan Şubeler',
  BRANCH_INCLUDED: 'Dahil Tutulan Şubeler',
  // List > Create > Advanced Settings
  DELETE_OUTDATED_BRANCHES: 'Eski şubeleri sil',
  DELETE_OUTDATED_BRANCHES_TIP: 'Disk alanından tasarruf etmek için sistemi güncel olmayan şubeleri otomatik olarak silecek şekilde ayarlayın.',
  BRANCH_SETTINGS: 'Şube Ayarları',
  BRANCH_RETENTION_PERIOD_DAYS: 'Şube Tutma Süresi (gün)',
  MAXIMUM_BRANCHES: 'En Fazla Şubeler',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: 'Saklama süresini aşan şubeler silinir. Varsayılan değer 7\'dir.',
  MAXIMUM_BRANCHES_DESC: 'Şube sayısı izin verilen maksimum sayıyı aştığında, en erken şube silinir. Varsayılan değer 5\'tir.',
  ADD_STRATEGY: 'Strateji ekle',
  DISCOVER_TAG_BRANCHES: 'Etiketleri Keşfet',
  DISCOVER_BRANCHES: 'Şubeleri Keşfet',
  ALL_BRANCHES: 'Tüm şubeleri dahil et',
  ONLY_PR_BRANCHES: 'Yalnızca PR olarak dosyalanan şubeleri dahil et',
  EXCLUDE_PR_BRANCHES: 'PR olarak dosyalanan şubeleri hariç tut',
  ENABLE_TAG_BRANCH_DISCOVERY: 'Etiket keşfini etkinleştir',
  DISABLE_TAG_BRANCH_DISCOVERY: 'Etiket keşfini devre dışı bırak',
  PULL_STRATEGY: 'Çekme Stratejisi',
  OPTIONS_PR_PARAMS_1: 'PR birleştirilmiş ile kodu çekin',
  OPTIONS_PR_PARAMS_2: 'PR noktasındaki kodu çekin',
  OPTIONS_PR_PARAMS_3: 'Sırasıyla iki ardışık düzen oluşturun',
  REGEX: 'Düzenli ifade',
  FILTER_BY_REGEX: 'Normal ifadeye göre filtrele',
  FILTER_BY_REGEX_DESC: 'Şubeleri PR\'leri ve etiketleri filtrelemek için normal bir ifade kullanın',
  SCRIPT_PATH: 'Komut Dosyası Yolu',
  SCRIPT_PATH_DESC: 'Jenkinsfile dosyasının yolunu kod deposunda ayarlayın.',
  SCAN_TRIGGER: 'Tarama Tetikle',
  SCAN_PERIODICALLY: 'Periyodik olarak tarayın',
  TIME_TRIGGER_DESC: 'Kod deposunu periyodik olarak tarayın.',
  SCAN_INTERVAL: 'Tarama Aralığı',
  SELECT_PIPELINE_SCAP: 'İş hattını seç',
  WHEN_DELETE_PIPELINE_DESC: 'Bir işlem hattı silindiğinde, belirtilen işlem hattındaki görevler otomatik olarak tetiklenir.',
  WHEN_CREATE_PIPELINE_DESC: 'Yeni bir işlem hattı oluşturulduğunda, belirtilen işlem hattındaki görevler otomatik olarak tetiklenir.',
  PIPELINE_EVENT_TRIGGER: 'İşlem hattı olayları aracılığıyla tetikleme',
  WHEN_CREATE_PIPELINE: 'İşlem Hattı Oluşturmada Tetikleme',
  WHEN_DELETE_PIPELINE: 'İşlem Hattı Silmesinde Tetikleme',
  CLONE_SETTINGS: 'Klonlama Ayarları',
  CLONE_TIMEOUT_PERIOD: 'Klon Zaman Aşımı Süresi (dk)',
  CLONE_DEPTH: 'Klon Derinliği',
  ENABLE_SHALLOW_CLONE: 'Sığ klonu etkinleştir',
  WEBHOOK_PUSH_URL: 'Web kancası Push URL\'si',
  WEBHOOK_PUSH_DESC: 'Deponun taranmasını tetiklemek için bu URL\'ye bir mesaj gönderin. ',
  TRUSTED_USERS: 'Güvenilen Kullanıcı',
  CONTRIBUTORS: 'Katkıda bulunanlar',
  EVERYONE: 'Herkes',
  NOBODY: 'Hiçbiri',
  USERS_WITH_PERMISSION: 'Yönetici veya yazma iznine sahip kullanıcılar',
  // List > Create > Advanced Settings (no repo specified)
  OPTIONS: 'Şeçenekler',
  BUILD_SETTINGS: 'Yapı Ayarları',
  DELETE_OUTDATED_BUILD_RECORDS: 'Eski yapı kayıtlarını sil',
  DELETE_OUTDATED_BUILD_RECORDS_TIP: `Sistemi disk alanından tasarruf etmek için konsol çıktısı, arşivlenmiş eserler ve meta veriler dahil olmak üzere eski yapı kayıtlarını otomatik olarak silecek şekilde ayarlayın.`,
  BUILD_RECORD_RETENTION_PERIOD_DAYS: 'Oluşturma Kaydı Tutma Süresi (gün)',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC: 'Saklama süresini aşan derleme kayıtları silinir. Varsayılan değer 7\'dir.',
  MAXIMUM_BUILD_RECORDS: 'En fazla Yapı Kayıtları',
  MAXIMUM_BUILD_RECORDS_DESC: 'Yapı kayıtlarının sayısı izin verilen maksimum sayıyı aştığında, en eski yapı kaydı silinir. Varsayılan değer 10\'dur.',
  NO_CONCURRENT_BUILDS: 'Eşzamanlı derleme yok',
  NO_CONCURRENT_BUILD_DESC: 'İşlem hattını bir seferde yalnızca bir derleme görevi çalıştıracak şekilde ayarlayın.',
  BUILD_PARAMETERS: 'Parametreleri Oluştur',
  BUILD_PARAMETERS_TIP: 'Yapı parametrelerini işlem hattına iletin.',
  PARAMS_STRING: 'Yazı',
  PIPELINE_PARAM_DEFAULT_DESC: 'Parametrenin varsayılan değerini ayarlayın. İşlem hattını el ile çalıştırmadan önce değeri değiştirebilirsiniz.',
  PARAMS_TEXT: 'Çok satırlı metin',
  PARAMS_TEXT_TCAP: 'Çok satırlı metin',
  PARAMETER_DESCRIPTION_DESC: 'Komut parametresi açıklamaları girin.',
  PARAMS_BOOLEAN: 'Boolean',
  PARAMS_CHOICE: 'Şeçenekler',
  CHOICE_PARAM_OPTION_DESC: 'Her satıra bir seçenek girin. İlk satır varsayılan seçenek olarak kullanılır.',
  PARAMS_PASSWORD: 'Parola',
  BUILD_TRIGGER: 'Tetikleyici Oluştur',
  BUILD_PERIODICALLY: 'Periyodik olarak oluşturun',
  BUILD_PERIODICALLY_TIP: 'İşlem hattını düzenli aralıklarla derleme görevlerini çalıştıracak şekilde ayarlayın.',
  PIPELINE_CRON_DESC: 'İşlem hattı bir dahaki sefere {nextTime}\'da çalıştırılacak.',
  PIPELINE_SCHEDULE_DESC: 'Bir program ayarlamak için bir CRON ifadesi girin. <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">Daha Fazla Bilgi Edinin</a>',
  DEFAULT_VALUE: 'Varsayılan Değer',
  PARAMETER_NAME_EMPTY_DESC: 'Lütfen parametre adını ayarlayın.',
  SELECT_TEMPLATE: 'Şablon seç',
  PARAMETER_CONFIG: 'Parametre yapılandırması',
  PREVIEW: 'Ön İzleme',
  EMPTY_PARAMS_CONFIG: 'Bu işlem parametre yapılandırması gerektirmez.',
  PIPELINE_VALIDATOR_DESC: 'Lütfen mevcut bir şablon seçiniz.'
};