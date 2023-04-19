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
  // Edit Information
  CODE_REPOSITORY: 'Kod Deposu',
  // Attributes
  TASK_STATUS: 'Görev Durumu',
  NOT_RUNNING: 'Çalışmıyor',
  QUEUED: 'Kuyrukta',
  ABORTED: 'İptal edildi',
  UNSTABLE: 'Kararsız',
  SKIPPED: 'Atlandı',
  NOT_BUILT: 'Yapılandırılmamış',
  SYNC_STATUS: 'Eşitleme Durumu',
  DEVOPS_PROJECT: 'DevOps Proje',
  // More > Edit Settings
  // More > Scan Repository
  SCAN_REPO_SUCCESSFUL: 'Depo taraması başarıyla tetiklendi.',
  // More > View Scan Logs
  VIEW_SCAN_LOGS: 'Tarama Günlüklerini Görüntüle',
  STARTED_BY_NAME: 'Tarafından başlatıldı:{name}',
  REPOSITORY_SCAN_LOGS: 'Depo Tarama Günlükleri',
  RESCAN: 'Yeniden tara',
  LOGS_OBTAINED_SUCCESSFULLY: 'Günlükler başarıyla alındı.',
  // Health Status
  HEALTH_STATUS_SCAP: 'Sağlık durumu',
  // Task Status
  PIPELINE_QUEUED_TITLE: 'Başlatmayı Tamamlamak üzere',
  INITIALIZING_PIPELINE: 'İşlem Hattı Başlatılıyor',
  PIPELINE_PREPARE_DESC: 'Ortam hazırlanıyor...',
  INITIALIZING_PIPELINE_DESC: 'Lütfen işlem hattı başlatma tamamlanana kadar bekleyin.',
  TASK_FAILED_NOT_OPERATIONAL: 'Aşama başarısız oldu ve çalışmıyor.',
  NO_PIPELINE_CONFIG_FILE_TIP: 'İşlem hattı yapılandırma dosyası bulunamadı.',
  // Task Status > Edit Pipeline
  EDIT_PIPELINE: 'İş hattını Düzenle',
  JENKINS_UNAVAILABLE: 'Jenkins is unready.',
  AGENT_TYPE_DESC: `Aracı Bölümü belirtir
    tüm iş hattı veya belirli bir aşamanın Jenkins ortamında yürütüleceği yer,
    Agent bölümünün nereye yerleştirildiğine bağlı olarak.
    Bu kısım, iş hattı bloğu içinde en üst düzeyde tanımlanmalıdır,
    ancak sahne seviyesi kullanımı isteğe bağlıdır. `,
  NOT_VALID_REPO: 'Code repo is not valid and cannot be created',
  CREATE_PIPELINE_DESC: 'İş hattı ile derleyin, test edin ve devreye alın',
  CI: 'Sürekli Entegrasyon',
  CI_DESC: 'Sürekli entegrasyon (CI), kaynak kodu değişikliklerinden sonra otomatik olarak algılama, çekme, oluşturma ve (çoğu durumda) birim testi sürecidir.',
  CICD: 'Sürekli Entegrasyon ve Teslimat (CI/CD)',
  CICD_DESC: 'Sürekli dağıtım (CD), yayın sürümünü sürekli teslim hattında son kullanıcılara otomatik olarak sağlama fikrini ifade eder. Kullanıcının yükleme yöntemine, bulut ortamında otomatik dağıtıma, uygulama yükseltmelerine (cep telefonlarındaki uygulamalar gibi), web sitesi güncellemelerine veya yalnızca mevcut sürümlerin listesine göre.',
  CUSTOM_PIPELIEN: 'Özel İş Hattı',
  CUSTOM_PIPELIEN_DESC: 'İşlem hattının içeriğini özelleştirmek için ihtiyaç duyduğunuz görevleri seçebilirsiniz.',
  CC: 'CC',
  CREDENTIAL_NAME: 'Kimlik Adı',
  REMOTE_REPOSITORY_URL: 'Uzak Depo URL\'si',
  SCM: 'SCM',
  INPUT_MESSAGE_DESC: 'Bu mesaj, işlem hattı çalışır durumdayken görüntülenecektir.',
  KUBERNETES_DEPLOY_DESC: `Kaynakları bir Kubernetes kümesinde dağıtın.
Sürekli bir entegrasyon veya sürekli dağıtım ortamında,
dağıtım adımına yalnızca düzenli olarak güncellenmesi gereken kaynaklar yerleştirilmelidir.
Bu nedenle, bu adım çoğunlukla bu tür kaynakların dağıtımını işlemek için kullanılır.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
   <label>Bu adım aşağıdaki ana özelliklere sahiptir:</label>
   <li>kubectl olmadan dağıtım</li>
   <li>Jenkinsfile'de değişken değiştirme, Dinamik dağıtım mümkündür. </li>
   <li>Özel resim havuzlarından liman işçisi resimlerini çekme desteği</li>
   <label> Şu anda bu adım aşağıdaki kaynakları desteklemektedir:</label>
   <br />
   <li>Yapılandırma </li>
   <li>Anahtar</li>
   <li>Dağıtla</li>
   <li>Dave İşlem Kümesi</li>
   <li>Uygulama Yönlendirme</li>
   <li>Ad alanı</li>
   <li>Görev</li>
   <li>Hizmet</li>
   <li>Çoğaltma Kümesi</li>
   <li>
   çoğaltma
   Denetleyici (sürekli güncellemeler desteklenmez ve sürekli güncellemeleri kullanmak istiyorsanız dağıtımı kullanın)
   </li>`,
  STAGE: 'Aşama',
  KUBERNETES_DEPLOY_DEPRECATED_TIP: 'Bu adım sonraki sürümlerde kullanımdan kaldırılacaktır ve diğer alternatifleri değerlendirmeniz önerilir.',
  ORIGINAL_IMAGE_ADDRESS: 'Orijinal Görüntü Adresi',
  NEW_IMAGE_ADDRESS: 'Yeni Görüntü Adresi',
  NEW_IMAGE_TAG: 'Yeni Görüntü Etiketi',
  CD_STEP_DESC: 'Sürekli dağıtım kullanarak görüntü bilgilerini güncelleyin.',
  UPDATE_CD_TITLE: 'Kaynakların sürekli dağıtımı',
  // Task Status > Edit Jenkinsfile
  EDIT_JENKINSFILE: 'Jenkinsdosya Düzenle',
  CLOSE_JENKINSFILE_EDITOR_TIP: 'Jenkinsdosya düzenleyicisini kapattığınızdan emin misiniz?',
  // Task Status > View Logs
  PIPELINE_RUN_LOGS: 'İş Hattı Çalışma Günlükleri',
  VIEW_LOGS: 'Günlükleri Görüntüle',
  DURATION_VALUE: 'Süre:{value}',
  DOWNLOAD_LOGS: 'Günlükleri İndir',
  // Task Status > View Logs > View Logs
  START_REAL_TIME_LOG: 'Eş zamanlı günlükleri etkinleştir',
  STOP_REAL_TIME_LOG: 'Eş zamanlı günlükleri devre dışı bırak',
  // Run Records
  RUN_RECORDS: 'Kayıtları Çalıştır',
  RUN: 'Çalıştır',
  ACTIVITY_EMPTY_TIP: 'İş hattı çalışmıyor.',
  COMMIT: 'Yap',
  LAST_MESSAGE: 'Son Mesaj',
  RUN_ID: 'Oturum Kimliği',
  STOP_PIPELINE_SUCCESSFUL: 'İş Hattı başarıyla durduruldu.',
  INVALID_JENKINSFILE_TIP: 'Geçerli Jenkinsdosyası, standart bir bildirimsel Jenkinsdosya değil ve grafiksel gösterim mevcut değil.',
  PAUSED: 'Duraklatıldı',
  // Run Records > Run
  SET_PARAMETERS: 'Parametre Ayarla',
  PARAMS_DESC: `Aşağıdaki parametreler, ardışık düzen ayarlarına göre oluşturulur veya
Jenkinsfile'nin operasyonel gereksinimlere göre girilen parametreler bölümü.`,
  PIPELINE_RUN_START_SI: 'İş hattını çalıştırmaya başlar...',
  PIPELINE_RUN_START_PL: 'İş hattını çalıştırmaya başlar...',
  // Run Records > Run Record Details > Details
  // Run Records > Run Record Details > Task Status
  BREAK: 'Mola',
  PROCEED: 'İlerle',
  WAITING_FOR_INPUT: 'Giriş yapılması için bekleniyor...',
  CANCELLED_IN_REVIEW: 'Incelemede iptal edildi',
  STEPS_COMPLETE_TOTAL: 'Adımlar:{complete}/{total}',
  // Run Records > Run Record Details > Commits
  COMMIT_PL: 'Yap',
  AUTHOR: 'Yazar',
  NO_COMMIT_FOUND: 'Taahhüt Bulunamadı.',
  // Run Records > Run Record Details > Artifacts
  ARTIFACT_PL: 'Eserler',
  NO_ARTIFACT_FOUND_TIP: 'Herhangi bir eser bulunamadı.',
  SIZE: 'Boyut',
  // Run Records > Run > Set Parameters
  // Branches
  BRANCH_SI: 'Şube',
  BRANCH_PL: 'Şubeler',
  SCAN_REPOSITORY: 'Kod Deposunu Tara',
  PIPELINE: 'İş Hattı',
  NO_BRANCHES_FOUND: 'Şube bulunamadı',
  // Branches > Code Check
  CODE_CHECK: 'Kod Kontrol',
  BUG_PL: 'Hatalar',
  VULNERABILITY_PL: 'Güvenlik açıkları',
  CODE_SMELL_PL: 'Kod Korkuları',
  CODE_LINE_COUNT: 'Kod Kuralları',
  COVERAGE: 'Kapsama ',
  TEST_RESULTS: 'Sonuçlar',
  ISSUE_PL: 'Sorunlar',
  CRITICAL: 'Kritik',
  MAJOR: 'Büyük',
  MINOR: 'Küçük',
  DISPLAY_ALL: 'Tümünü görüntüle',
  DISPLAY_ONLY_LAST_TEN: 'Sadece son 10 hatayı görüntüle.',
  LINE_VALUE: 'Hat: {value}',
  PASSED: 'Geçti',
  // Pull Requests
  PULL_REQUEST_PL: 'Değişiklik İsteği',
  FAILED_CHECK_SCRIPT_COMPILE: 'The check of script compile failed, if you want to bypass the step, please click the continue button',
  //Create pipeline modal -> Custom Pipeline
  General: 'General',
  Container: 'Konteyner',
  Review: 'Review',
  URL: 'URL',
  'Credential Name': 'Kimlik Adı',
  Branch: 'Şube',
  'SVN URL': 'SVN URL',
  'Credential Name': 'Kimlik Adı',
  'The message to print': 'Message to Print',
  'Shell command line': 'Shell command line',
  //   Recipient: 'Recipient',
  //   CC: 'CC',
  //   Subject: 'Subject',
  Body: 'Body',
  'Credential Name': 'Kimlik Adı',
  //   'Username Variable': 'Username Variable',
  //   'Password Variable': 'Password Variable',
  Variable: 'Variable',
  'KeyFile Variable': 'KeyFile Variable',
  'Passphrase Variable': 'Passphrase Variable',
  'Artifacts Location': 'Artifacts Location',
  Time: 'Zaman',
  Unit: 'Unit',
  //   'Timeout after no activity in logs for this block':
  // 'Timeout after no activity in logs for this block',
  'Groovy script': 'Groovy script',
  'Target Pipeline Name': 'Target Pipeline Name',
  'Quiet Period': 'Quiet Period',
  'Wait For Completion': 'Wait for completion',
  'Propagate Errors': 'Propagate errors',
  'Error Message': 'Error Message',
  Time: 'Zaman',
  Unit: 'Unit',
  'Test Results Location': 'Location of Test Results',
  'Allow Empty Results': 'Allow empty results',
  'Keep Long Output': 'Retain long output',
  'Skip Publishing Checks': 'Skip publishing checks',
  'Retry Count': 'Retry Times',
  Message: 'Mesaj',
  Submitter: 'Submitter',
  'Config Name': 'Configuration Item',
  'AbortPipeline if quality gate status is not green': 'Abort the pipeline if quality gate status is not green',
  'Container Name': 'Konteyner Adı',
  'Continuous Deployments': 'Sürekli Dağıtım',
  Branch: 'Şube',
  'Original Image Address': 'Orijinal Görüntü Adresi',
  'New Image Address': 'Yeni Görüntü Adresi',
  'New Image Tag': 'Yeni Görüntü Etiketi',
  Credential: 'Kimlik Bilgileri'
};