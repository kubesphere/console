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
  SYSTEM_COMPONENT_PL: 'Sistem bileşenleri',
  SERVICE_COMPONENTS_DESC: 'Sistem bileşenleri, KubeSphere sistemindeki çeşitli işlevleri sağlayan yazılım bileşenleridir. Servis bileşenlerinin çalışma durumunu bu sayfada görüntüleyebilirsiniz.',
  // KubeSphere
  STOPPED: 'Durduruldu',
  RUNNING_TIME: 'Çalışma süresi',
  KS_CONSOLE_DESC: 'KubeSphere konsol hizmetleri sağlar.',
  KS_APISERVER_DESC: 'Küme yönetimi için REST API\'leri sağlar. Bu bileşen ayrıca küme bileşenleri ve küme güvenlik denetimi arasındaki iletişim için de kullanılır.',
  OPENLDAP_DESC: 'Kullanıcı bilgilerini merkezi bir şekilde depolar ve yönetir.',
  REDIS_DESC: 'Veritabanı, önbellek ve ileti aracısı olarak kullanılan açık kaynaklı, bellek içi veri yapısı deposu.',
  TOWER_DESC: 'Proxy üzerinden kümeler arasında ağ bağlantısı için kullanılan araç.',
  KS_CONTROLLER_MANAGER_DESC: 'Servis mantığını uygular. Bu bileşen, bir çalışma alanı oluşturulduğunda izinler oluşturur ve hizmet stratejileri için Istio yapılandırması oluşturur.',
  // Kubernetes
  COREDNS_DESC: 'Kubernetes kümesi için hizmet bulma işlevini sağlar.',
  METRICS_SERVER_DESC: 'Her düğümün kubelet\'inden ölçümleri toplayan Kubernetes izleme bileşeni.',
  KUBE_SCHEDULER_DESC: 'Bölmeleri uygun düğümlere atayan Kubernetes zamanlayıcı.',
  KUBE_SCHEDULER_SVC_DESC: 'Bölmeleri uygun düğümlere atayan Kubernetes zamanlayıcı.',
  KUBE_CONTROLLER_MANAGER_SVC_DESC: 'Kubernetes ile birlikte gönderilen çekirdek kontrol döngülerini yerleştiren Daemon.',
  // Istio
  JAEGER_COLLECTOR_DESC: 'Sepet verilerini toplar. Istio\'nun sepeti jaeger ajanıdır.',
  JAEGER_COLLECTOR_HEADLESS_DESC: 'Sepet verilerini toplar. Istio\'nun sepeti jaeger ajanıdır.',
  JAEGER_QUERY_DESC: 'Sorgu isteklerini kabul eder, arka uç depolama sisteminden izleri alır ve verileri web kullanıcı arayüzünde görüntüler.',
  JAEGER_OPERATOR_METRICS_DESC: 'Operatör için izleme metrikleri sağlar.',
  // Monitoring
  MONITORING: 'İzleme',
  PROMETHEUS_K8S_DESC: 'Düğümlerin, iş yüklerinin ve API nesnelerinin izleme verilerini sağlar.',
  NODE_EXPORTER_DESC: 'Prometheus için tüm küme düğümlerinin izleme verilerini sağlar.',
  KUBE_STATE_METRICS_DESC: 'Düğümler, iş yükleri ve bölmeler gibi küme API nesnelerinin durumunu almak için Kubernetes API sunucusunu dinler ve Prometheus için izleme verileri oluşturur.',
  PROMETHEUS_OPERATED_DESC: 'Prometheus Operatörü tarafından dahili olarak kullanılan tüm Prometheus örneklerine karşılık gelen hizmet.',
  PROMETHEUS_OPERATOR_DESC: 'Prometheus örneklerini yönetir.',
  ALERTMANAGER_OPERATED_DESC: 'Alertmanager\'ı Prometheus ile entegre etmek için kullanılan Alertmanager hizmeti.',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web kullanıcı arayüzü servisi.',
  NOTIFICATION_MANAGER_SVC_DESC: 'E-postalar, WeChat mesajları ve Slack mesajları gibi bildirimlerin gönderilmesi için arayüzler sağlar.',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC: 'Bildirim Yöneticisi Denetleyicisi için dahili izleme verileri sağlar.',
  // Logging
  LOGGING: 'Log kayıtları',
  ELASTICSEARCH_LOGGING_DATA_DESC: 'Veri depolama, yedekleme ve arama gibi Elasticsearch hizmetleri sağlar.',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: 'Elasticsearch küme yönetimi hizmetleri sağlar.',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC: 'Disk günlüğü toplama için sepet kaplarını bölmelere otomatik olarak enjekte eder.',
  KS_EVENTS_ADMISSION_DESC: 'Olay kuralı yönetimi için kimlik doğrulama web kancasını sağlar.',
  KS_EVENTS_RULER_DESC: 'Filtreleme ve uyarı özellikleri sağlayan olay kuralı motoru hizmeti.',
  KUBE_AUDITING_WEBHOOK_SVC_DESC: 'Denetim toplama, karşılaştırma, kalıcılık ve uyarı için kullanılır.',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: 'Temel izleme verileri sağlayan S2I izleme hizmeti.',
  WEBHOOK_SERVER_SERVICE_DESC: 'S2I için varsayılan değerleri ve kimlik doğrulama web kancasını sağlar.'
};