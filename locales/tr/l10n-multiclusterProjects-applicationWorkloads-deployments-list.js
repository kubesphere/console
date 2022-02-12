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
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: 'Sonraki',
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
  NO_LIMIT: 'Limit yok',
  NO_REQUEST: 'Istek yok',
  NO_RESOURCE_LIMIT: 'Kaynak Limiti Yok',
  IGNORE_AND_RETRY: 'Yoksay ve Tekrar Deneyin',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: 'Bağlantı Noktası Ayarları',
  ISTIO_PROTOCOL_TIP: 'Uygulama Yönetimi işlevini tam olarak kullanmak için hizmet tarafından kullanılan protokolü seçin. Örneğin, bir HTTP hizmeti için HTTP\'yi seçin.',
  REQUIRED: 'Gerekli',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: 'Görüntüyü Her Zaman Çekin',
  IMAGE_PULL_POLICY_NEVER: 'Yalnızca Yerel Resmi Kullan',
  IMAGE_PULL_POLICY_ALWAYS_DESC: 'Bölme oluşturulduğunda veya güncellendiğinde her zaman görüntüyü çeker.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: 'Görüntüyü yalnızca yerel olarak mevcut olmadığında çeker.',
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
  // List > Create > Pod Settings > Add Container > Environment Variables
  ADD_ENVIRONMENT_VARIABLE: 'Ortam Değişkenleri Ekle',
  USE_CONFIGMAP_OR_SECRET: 'Configmap veya Secret kullanın',
  KEY_IN_RESOURCE: 'Kaynakta anahtar',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: 'Konteyner Güvenliği Bağlamı',
  CONTAINER_SECURITY_CONTEXT_DESC: 'Kapsayıcının ayrıcalık ayarlarını özelleştirin.',
  PRIVILEGED_MODE: 'Ayrıcalıklı Mod',
  PRIVILEGED_MODE_DESC: 'Ana bilgisayarın kök kullanıcısı olarak kapsayıcı işlemlerini çalıştırır.',
  ALLOW_PRIVILEGE_ESCALATION: 'Ayrıcalık Yükseltmesine İzin Ver',
  ALLOW_PRIVILEGE_ESCALATION_DESC: 'Kapsayıcı işlemlerinin üst süreçten daha fazla ayrıcalık elde etmesine izin verir. Ayrıcalıklı mod etkinleştirildiğinde bu seçenek varsayılan olarak etkindir.',
  ROOT_DIRECTORY_READONLY: 'Root Directory Read-Only',
  ROOT_DIRECTORY_READONLY_DESC:
    'Sets the root directory of the container file system to read-only.',
  USER_AND_USER_GROUP: 'User and User Group',
  USER_GROUP: 'User Group',
  RUN_AS_NON_ROOT: 'Run as Non-root',
  RUN_AS_NON_ROOT_DESC:
    'Checks whether the container is to be run by the root user before starting the container. If yes, the container will not be started.',
  RUN_AS_USER_DESC:
    'UID to run the entrypoint of the container process. The default value is the UID specified in the image metadata.',
  RUN_AS_USER_GROUP_DESC:
    'GID to run the entrypoint of the container process. The default value is the container runtime default GID.',
  SELINUX_CONTEXT: 'SELinux Context',
  CAPABILITIES_BETA: 'Capabilities (beta)',
  DROP: 'Drop',
  ACCESS_CONTROL: 'Access Control',
  LEVEL: 'Level',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC:
    'Synchronize the time zone of the container with that of the host.',
  SYNC_HOST_TIMEZONE: 'Synchronize Host Timezone',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: 'Update Strategy',
  ROLLING_UPDATE_RECOMMENDED: 'Rolling Update (recommended)',
  SIMULTANEOUS_UPDATE: 'Simultaneous Update',
  ROLLINGUPDATE_DESC:
    'Gradually replaces old pod replicas with new ones. The service is not interrupted during the update process.',
  SIMULTANEOUS_UPDATE_DESC:
    'Deletes all existing pod replicas before creating new ones. The service is interrupted during the update process.',
  ENTER_INTEGER_OR_PERCENTAGE: 'Please enter an integer or percentage.',
  MAX_EXTRA_EMPTY:
    'Please set the maximum number or percentage of extra pod replicas allowed during the update process.',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: 'Pod Security Context',
  POD_SECURITY_CONTEXT_DESC: 'Customize the pod privilege settings.',
  POD_SECURITY_CONTEXT_TIP:
    'If User, User Group, and SELinux Context settings are defined in both pod Security Context and Container Security Context, the Container Security Context settings will override the Pod Security Context settings.',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: 'Pod Scheduling Rules',
  POD_SCHEDULING_RULES_DESC:
    'Specify the rules for scheduling the pod replicas to nodes.',
  DEFAULT_RULES: 'Default Rules',
  DEFAULT_RULES_DESC:
    'Schedules the pod replicas to nodes according to default rules.',
  DECENTRALIZED_SCHEDULING: 'Decentralized Scheduling',
  CUSTOM_RULES: 'Custom Rules',
  CUSTOM_RULES_DESC:
    'Schedules the pod replicas to nodes according to custom rules.',
  'Pod IP': 'Pod IP',
  DECENTRALIZED_SCHEDULING_DESC:
    'Schedules the pod replicas to different nodes if possible.',
  CENTRALIZED_SCHEDULING_DESC:
    'Schedules the pod replicas to the same node if possible.',
  CENTRALIZED_SCHEDULING: 'Centralized Scheduling',
  SCHEDULE_WITH_TARGET: 'Schedule with target',
  SCHEDULE_AWAY_FROM_TARGET: 'Schedule away from target',
  MATCH_IF_POSSIBLE: 'Match if possible',
  MUST_MATCH: 'Must match',
  TARGET: 'Target',
  STRATEGY: 'Strategy',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: 'Add Metadata',
  POD_ADD_METADATA_DESC: 'Add metadata to the pod replicas.',
  // List > Create > Volume Settings
  VOLUME_SETTINGS: 'Volume Settings',
  READ_ONLY_LOW: 'read-only',
  READ_AND_WRITE_LOW: 'read and write',
  // List > Create > Volume Settings > Mount Volume
  MOUNT_VOLUME: 'Mount Volume',
  WORKLOAD_MOUNT_VOLUME_DESC:
    'Mount an existing volume, temporary volume, or HostPath volume to the containers.',
  EXISTING_VOLUME: 'Existing Volume',
  SELECT_VOLUME: 'Select Volume',
  SELECT_VOLUME_DESC:
    'Select an existing volume and mount it to the containers.',
  CAPACITY: 'Capacity',
  VOLUME_NOT_SELECT: 'Please select a volume.',
  TEMPORARY_VOLUME: 'Temporary Volume',
  VOLUME_NAME: 'Volume Name',
  VOLUME_NAME_EMPTY: 'Please set a name for the volume.',
  CONTAINER_NOT_SELECTED: 'Please mount the volume to at least one container.',
  NOT_MOUNT: 'Not mounted',
  HOSTPATH_VOLUME: 'HostPath Volume',
  HOSTPATH_TIP:
    'Use a HostPath volume to mount a file or directory in the host file system to the containers.',
  HOST_PATH: 'Host Path',
  READ_AND_WRITE: 'Read and write',
  READ_ONLY: 'Read-only',
  // List > Create > Volume Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: 'Mount Configmap or Secret',
  MOUNT_CONFIGMAP_OR_SECRET_DESC:
    'Mount a configmap or secret to the containers.',
  CONFIGMAP: 'Configmap',
  SELECT_CONFIGMAP_DESC: 'Mount a configmap to the containers.',
  READ_WRITE_MOUNT_EMPTY:
    'Please specify the volume access mode and mount path.',
  SELECT_SPECIFIC_KEYS: 'Select Specific Keys',
  SELECT_SPECIFIC_KEYS_DESC:
    'Select specific keys to be mounted to the containers.',
  SELECT_SECRET_DESC: 'Mount a secret to the containers.',
  CONFIGMAP_NOT_SELECT: 'Please select a configmap.',
  SECRET_NOT_SELECT: 'Please select a secret.',
  NO_AVAILABLE_RESOURCE: 'No Available Resource',
  // List > Create > Advanced Settings
  SELECT_NODES: 'Select Nodes',
  SELECT_NODES_DESC:
    'Assign pod replicas to specific nodes. You can use labels to select nodes or manually specify a node.',
  ADD_NODE_SELECTOR: 'Add Node Selector',
  ADD_METADATA_DESC: 'Add metadata to the resource.',
  KEY: 'Key',
  VALUE: 'Value',
  ADVANCED_SETTINGS: 'Advanced Settings',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: 'Assign pod replicas to a specific node.',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: 'Cluster Differences',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC:
    'Use different container settings in different clusters.',
  CLUSTER_DIFF_PORT_SETTINGS_DESC:
    'Set different ports for containers in different clusters.',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC:
    'Set different environment variables for containers in different clusters.',
}
