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
  WORKLOAD_DESC: 'İş yükleri, hizmet isteklerini işlemek için kullanılır ve bir veya daha fazla bölme içerebilir. Günlüğe kaydetme ve izleme gibi sistem işlevleri de iş yükleri tarafından uygulanır.',
  // List
  DEPLOYMENT_EMPTY_DESC: 'Lütfen bir dağıtım oluşturun.',
  UPDATING: 'Güncelleniyor',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: 'Sonraki',
  INVALID_PROJECT: 'Invalid project.',
  // List > Create > Pod Settings > Replica Scheduling Mode
  REPLICA_SCHEDULING_MODE: 'Çoğaltma Zamanlama Modu',
  SPECIFY_REPLICAS: 'Kopyaları Belirtin',
  WEIGHTS: 'Yük',
  SPECIFY_WEIGHTS: 'Ağırlıkları Belirtin',
  SPECIFY_WEIGHTS_DESC: 'Toplam bölme çoğaltması sayısını ve her küme için bir ağırlık ayarlayın. Pod replikaları, ağırlıklara göre kümelere programlanacaktır.',
  SPECIFY_REPLICAS_DESC: 'Her kümedeki bölme çoğaltmalarının sayısını manuel olarak ayarlayın.',
  REPLICA_LOW_SI: 'kopya',
  REPLICA_LOW_PL: 'kopyalar',
  WEIGHT: 'yük',
  TOTAL_REPLICAS: 'Toplam Kopyalar',
  // List > Create > Pod Settings > Add Container > Container Settings
  COST: 'Cost',
  ADD_CONTAINER: 'Konteyner ekle',
  ADD_CONTAINER_DESC: 'Bir kapsayıcı oluşturmak için kapsayıcı ayarlarını özelleştirin.',
  CONTAINERS: 'Konteynerler',
  IMAGE_TIME_SIZE_LAYER: 'Güncelle {time}',
  IMAGE_DESC: 'Özel bir görüntü kayıt defteri kullanmak için önce bir görüntü kayıt defteri sırrı oluşturmanız gerekir. <a href={link} target="_blank">Daha Fazla Bilgi Edinin</a>',
  IMAGE_PLACEHOLDER: 'Nginx gibi resim adı veya yolu: en son',
  IMAGE_EMPTY: 'Lütfen bir görsel seçiniz.',
  ENTER_POSITIVE_INTEGER_DESC: 'Lütfen pozitif bir tam sayı girin.',
  TOTAL_REPLICAS_EMPTY_DESC: 'Lütfen tüm kümelerdeki toplam kapsül kopyası sayısını girin.',
  CONTAINER_NAME: 'Konteyner Adı',
  CONTAINER_TYPE: 'Konteyner tipi',
  USE_DEFAULT_PORTS: 'Varsayılan Bağlantı Noktaları',
  NO_DEFAULT_PORT: 'Varsayılan bağlantı noktası yapılandırması yok',
  REGISTRY: 'Kayıt Defteri',
  SET_IMAGE_DESC: 'Konteyner için bir görüntü ayarlayın.',
  WORKER_CONTAINER: 'Çalışan Konteyner',
  CONTAINER_RESOURCE_LIMIT_TIP: 'Konteynerin uygun düğümlere zamanlanması için kapsayıcının kaynak sınırlarını ve isteklerini ayarlayın.',
  GPU_TYPE: 'GPU Tipi',
  GPU_LIMIT: 'GPU Sınırı',
  NVIDIA_COM_GPU: 'NVIDIA GPU',
  NO_LIMIT: 'Limit yok',
  NO_REQUEST: 'Istek yok',
  NO_RESOURCE_LIMIT: 'Kaynak Limiti Yok',
  IGNORE_AND_RETRY: 'Yoksay ve Tekrar Deneyin',
  AVAILABLE_QUOTAS: 'Available Quotas',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: 'Bağlantı Noktası Ayarları',
  ISTIO_PROTOCOL_TIP: 'Uygulama Yönetimi işlevini tam olarak kullanmak için hizmet tarafından kullanılan protokolü seçin. Örneğin, bir HTTP hizmeti için HTTP\'yi seçin.',
  REQUIRED: 'Gerekli',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: 'Görüntüyü Her Zaman Çekin',
  IMAGE_PULL_POLICY_NEVER: 'Yalnızca Yerel Resmi Kullan',
  IMAGE_PULL_POLICY_ALWAYS_DESC: 'Pulls an image always when the pod is created or updated.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: 'Pulls an image only when the required image does not exist locally.',
  IMAGE_PULL_POLICY_NEVER_DESC: 'Yalnızca yerel bir görüntü kullanır. Gerekli görüntü yerel olarak mevcut değilse kapsayıcı anormal hale gelecektir.',
  IMAGE_PULL_POLICY_IFNOTPRESENT: 'Önce Yerel Resmi Kullan',
  // List > Create > Pod Settings > Add Container > Health Check
  LIVENESS_CHECK: 'Canlılık denetimi',
  READINESS_CHECK: 'Hazırlık Kontrolü',
  STARTUP_CHECK: 'Başlangıç Kontrolü',
  LIVENESS_CHECK_DESC: 'Konteynerin canlı olup olmadığını kontrol eder.',
  READINESS_CHECK_DESC: 'Kapsayıcının istekleri işlemeye hazır olup olmadığını kontrol eder.',
  STARTUP_CHECK_DESC: 'Kapsayıcının başarıyla başlatılıp başlatılmadığını kontrol eder.',
  ADD_PROBE: 'Sonda Ekle',
  COMMANDS: 'Komutlar',
  HEALTH_CHECK: 'Sağlık Kontrolü',
  STARTUP_CHECK_TIP: 'Kubernetes v1.18 veya üstü gereklidir.',
  HTTP_PATH_EMPTY: 'Please set a path for the HTTP check.',
  // List > Create > Pod Settings > Add Container > Life Management
  LIFECYCLE_MANAGEMENT: 'Yaşam Döngüsü Yönetimi',
  LIFECYCLE_MANAGEMENT_DESC: 'Kapsayıcı başlatıldıktan sonra veya ortam hazırlığı veya hassas kapatma için durdurulmadan önce gerçekleştirilecek eylemleri ekleyin.',
  POSTSTART_ACTION: 'Başlangıç Sonrası Eylem',
  PRESTOP_ACTION: 'Durdurma Öncesi Eylem',
  POSTSTART_ACTION_DESC: 'Kapsayıcı başlatıldıktan sonra gerçekleştirilecek bir eylem ekleyin.',
  PRESTOP_ACTION_DESC: 'Kapsayıcı durdurulmadan önce gerçekleştirilecek bir eylem ekleyin.',
  ADD_ACTION: 'Eylem Ekle',
  // List > Create > Pod Settings > Add Container > Environment Variables
  ADD_ENVIRONMENT_VARIABLE: 'Ortam Değişkenleri Ekle',
  KEY_IN_RESOURCE: 'Kaynakta anahtar',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  RESOURCE: 'Resource',
  CREATE_CONFIGMAP_SECRET_DESC: 'If no configmap or secret meets the requirements, you can',
  CREATE_CONFIG: 'create a configmap',
  OR: 'or',
  CREATE_SECRET: 'create a secret.',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: 'Konteyner Güvenliği Bağlamı',
  CONTAINER_SECURITY_CONTEXT_DESC: 'Kapsayıcının ayrıcalık ayarlarını özelleştirin.',
  PRIVILEGED_MODE: 'Ayrıcalıklı Mod',
  PRIVILEGED_MODE_DESC: 'Ana bilgisayarın kök kullanıcısı olarak kapsayıcı işlemlerini çalıştırır.',
  ALLOW_PRIVILEGE_ESCALATION: 'Ayrıcalık Yükseltmesine İzin Ver',
  ALLOW_PRIVILEGE_ESCALATION_DESC: 'Kapsayıcı işlemlerinin üst süreçten daha fazla ayrıcalık elde etmesine izin verir. Ayrıcalıklı mod etkinleştirildiğinde bu seçenek varsayılan olarak etkindir.',
  ROOT_DIRECTORY_READONLY: 'Kök Dizin Salt Okunur',
  ROOT_DIRECTORY_READONLY_DESC: 'Kapsayıcı dosya sisteminin kök dizinini salt okunur olarak ayarlar.',
  USER_AND_USER_GROUP: 'Kullanıcı ve Kullanıcı Grubu',
  USER_GROUP: 'Kullanıcı Grubu',
  RUN_AS_NON_ROOT: 'Kök olmayan olarak çalıştır',
  RUN_AS_NON_ROOT_DESC: 'Kapsayıcıyı başlatmadan önce kapsayıcının kök kullanıcı tarafından çalıştırılıp çalıştırılmayacağını kontrol eder. Evet ise, konteyner başlatılmayacaktır.',
  RUN_AS_USER_DESC: 'Kapsayıcı işleminin giriş noktasını çalıştırmak için UID. Varsayılan değer, görüntü meta verilerinde belirtilen UID\'dir.',
  RUN_AS_USER_GROUP_DESC: 'Kapsayıcı işleminin giriş noktasını çalıştırmak için GID. Varsayılan değer, kapsayıcı çalışma zamanı varsayılan GID\'sidir.',
  SELINUX_CONTEXT: 'SELinux Bağlamı',
  CAPABILITIES: 'Yetenekler',
  DROP: 'Bırak',
  ACCESS_CONTROL: 'Erişim Denetimi',
  LEVEL: 'Seviye',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC: 'Kapsayıcının saat dilimini ana bilgisayarınkiyle senkronize edin.',
  SYNC_HOST_TIMEZONE: 'Ana Bilgisayar Saat Dilimi\'ni Senkronize Et',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: 'Güncelleme Stratejisi',
  ROLLING_UPDATE_RECOMMENDED: 'Sürekli Güncelleme (önerilir)',
  SIMULTANEOUS_UPDATE: 'Eşzamanlı Güncelleme',
  ROLLINGUPDATE_DESC: 'Yavaş yavaş eski bölme kopyalarını yenileriyle değiştirir. Güncelleme işlemi sırasında hizmet kesintiye uğramaz.',
  SIMULTANEOUS_UPDATE_DESC: 'Yenilerini oluşturmadan önce mevcut tüm bölme kopyalarını siler. Güncelleme işlemi sırasında hizmet kesintiye uğrar.',
  ENTER_INTEGER_OR_PERCENTAGE: 'Lütfen bir tam sayı veya yüzde girin.',
  MAX_EXTRA_EMPTY: 'Lütfen güncelleme işlemi sırasında izin verilen fazladan pod replikalarının maksimum sayısını veya yüzdesini ayarlayın.',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: 'Pod Güvenliği Bağlamı',
  POD_SECURITY_CONTEXT_DESC: 'Bölme ayrıcalığı ayarlarını özelleştirin.',
  POD_SECURITY_CONTEXT_TIP: 'Kullanıcı, Kullanıcı Grubu ve SELinux Bağlamı ayarları hem pod Güvenlik Bağlamı hem de Kapsayıcı Güvenlik Bağlamı içinde tanımlanmışsa, Kapsayıcı Güvenlik Bağlamı ayarları, Kapsül Güvenlik Bağlamı ayarlarını geçersiz kılar.',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: 'Kapsül Zamanlama Yöntemi',
  POD_SCHEDULING_RULES_DESC: 'Bölme çoğaltmalarını düğümlere zamanlamak için kuralları belirtin.',
  DEFAULT_RULES: 'Varsayılan kurallar',
  DEFAULT_RULES_DESC: 'Pod replikalarını varsayılan kurallara göre düğümlere zamanlar.',
  DECENTRALIZED_SCHEDULING: 'Merkezi Olmayan Zamanlama',
  CUSTOM_RULES: 'Özel Kurallar',
  CUSTOM_RULES_DESC: 'Özel kurallara göre düğümlere bölme çoğaltmalarını zamanlar.',
  DECENTRALIZED_SCHEDULING_DESC: 'Mümkünse, bölme çoğaltmalarını farklı düğümlere zamanlar.',
  CENTRALIZED_SCHEDULING_DESC: 'Mümkünse bölme çoğaltmalarını aynı düğüme programlar.',
  CENTRALIZED_SCHEDULING: 'Merkezileştirilmiş Zamanlama',
  SCHEDULE_WITH_TARGET: 'Hedefle programlayın',
  SCHEDULE_AWAY_FROM_TARGET: 'Uzak Hedef için zamanlayın',
  MATCH_IF_POSSIBLE: 'Mümkünse eşleştir',
  MUST_MATCH: 'Zorunlu Eşleştirme',
  TARGET: 'Hedef',
  STRATEGY: 'Strateji',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: 'Metaveri Ekle',
  POD_ADD_METADATA_DESC: 'Pod replikalarına meta veriler ekleyin.',
  // List > Create > Storage Settings
  STORAGE_SETTINGS: 'Depolama Ayarları',
  READ_ONLY_LOW: 'salt-okunur',
  READ_AND_WRITE_LOW: 'okuma ve yazma',
  // List > Create > Storage Settings > Mount Volume
  MOUNT_VOLUME: 'Hacmi Monte et',
  WORKLOAD_MOUNT_VOLUME_DESC: 'Kapsayıcılara kalıcı birim, geçici birim veya HostPath birimi bağlayın.',
  SELECT_PERSISITENT_VOLUME_CLAIM: 'Kalıcı Hacim Talebi Seçin',
  SELECT_PERSISITENT_VOLUME_CLAIM_DESC: 'Kalıcı birim talebine göre oluşturulan kalıcı birimi kapsayıcılara bağlayın.',
  CAPACITY: 'Kapasite',
  PVC_NOT_SELECT: 'Lütfen kalıcı bir hacim talebi seçin.',
  TEMPORARY_VOLUME: 'Geçici Hacim',
  VOLUME_NAME: 'Hacim Adı',
  VOLUME_NAME_EMPTY: 'Lütfen birim için bir ad belirleyin.',
  HOST_PATH_EMPTY: 'Lütfen birim için Ana bilgisayar yolu belirleyin.',
  CONTAINER_NOT_SELECTED: 'Lütfen birimi en az bir konteynere bağlayın.',
  NOT_MOUNT: 'Bağlanamadı',
  HOSTPATH_VOLUME: 'HostPath Hacmi',
  HOSTPATH_TIP: 'Ana bilgisayar dosya sistemindeki bir dosyayı veya dizini kapsayıcılara bağlamak için bir HostPath birimi kullanın.',
  HOST_PATH: 'Sunucu Yolu',
  READ_AND_WRITE: 'Okuma ve yazma',
  READ_ONLY: 'Salt okunur',
  // List > Create > Storage Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: 'Configmap veya Secret bağla',
  MOUNT_CONFIGMAP_OR_SECRET_DESC: 'Konteynerlara bir yapılandırma haritası veya gizli anahtar ekleyin.',
  CONFIGMAP: 'Yapılandırma Haritası',
  SELECT_CONFIGMAP_DESC: 'Konteynerlara bir yapılandırma haritası ekleyin.',
  READ_WRITE_MOUNT_EMPTY: 'Lütfen birim erişim modunu ve bağlama yolunu belirtin.',
  SELECT_SPECIFIC_KEYS: 'Belirli Anahtarları Seçin',
  SELECT_SPECIFIC_KEYS_DESC: 'Konteynerlere monte edilecek belirli anahtarları seçin.',
  SELECT_SECRET_DESC: 'Konteynerlere bir sır takın.',
  CONFIGMAP_NOT_SELECT: 'Lütfen bir yapılandırma haritası seçin.',
  SECRET_NOT_SELECT: 'Lütfen bir sır seçin.',
  NO_AVAILABLE_RESOURCE: 'Kullanılabilir Kaynak Yok',
  // List > Create > Advanced Settings
  SELECT_NODES: 'Düğümü Seçin',
  SELECT_NODES_DESC: 'Belirli düğümlere bölme çoğaltmaları atayın. Düğümleri seçmek veya manuel olarak bir düğüm belirtmek için etiketleri kullanabilirsiniz.',
  ADD_NODE_SELECTOR: 'Düğüm Seçici Ekle',
  ADD_METADATA_DESC: 'Kaynağa meta veri ekleyin.',
  KEY: 'Anahtar',
  VALUE: 'Değer',
  ADVANCED_SETTINGS: 'Gelişmiş Ayarlar',
  DUPLICATE_LABELS: 'Duplicate labels cannot be added.',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: 'Belirli bir düğüme bölme kopyaları atayın.',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: 'Küme Farklılıkları',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC: 'Farklı kümelerde farklı kapsayıcı ayarları kullanın.',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: 'Farklı kümelerdeki kapsayıcılar için farklı bağlantı noktaları ayarlayın.',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: 'Farklı kümelerdeki kapsayıcılar için farklı ortam değişkenleri ayarlayın.',
  CONTAINER_IMAGE: 'Container Image'
};