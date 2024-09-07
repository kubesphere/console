/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SYSTEM_COMPONENT_PL: '服務組件',
  SERVICE_COMPONENTS_DESC:
    '服務組件提供 KubeSphere、Kubernetes 和 OpenPitrix 集群内各項服務組件的健康狀態監控，可以查看目前集群的健康狀態和運行時間，能夠幫助用戶監測集群的狀況和即時定位問題。',
  // KubeSphere
  STOPPED: 'Stopped',
  RUNNING_TIME: '運行時間',
  KS_CONSOLE_DESC: '提供 KubeSphere 的控制台服務',
  KS_APISERVER_DESC: '整個集群管理的 API 介面和集群内部各個模組之間通信的樞紐，以及集群安全控制',
  OPENLDAP_DESC: '負責集中儲存和管理用戶帳號資訊',
  REDIS_DESC: '將結構化的數據儲存在記憶體中的儲存系統',
  TOWER_DESC: '一個可以在集群間通過代理方式創建網路連接的工具',
  KS_CONTROLLER_MANAGER_DESC:
    '實現業務邏輯，例如創建企業空間時，為其創建對應的權限；創建服務策略時，生成對應的 Istio 配置等',
  // Kubernetes
  COREDNS_DESC: '為 Kubernetes 集群提供服務發現的功能',
  METRICS_SERVER_DESC: 'Kubernetes 的監控組件，從每個節點的 Kubelet 採集指標資訊',
  KUBE_SCHEDULER_DESC: 'Kubernetes 的調度器，將 Pod 調度到合適的 Node 節點上去',
  KUBE_SCHEDULER_SVC_DESC: 'Kubernetes 的調度器，將 Pod 調度到合適的 Node 節點上去',
  KUBE_CONTROLLER_MANAGER_SVC_DESC: '由一系列的控制器組成，處理集群中常規任務的背景執行緒',
  // Istio
  JAEGER_COLLECTOR_DESC: '收集 sidecar 的數據，istio 裡面 sidecar 就是 jaeger-agent',
  JAEGER_COLLECTOR_HEADLESS_DESC: '收集 sidecar 的數據，Istio 裡面 sidecar 就是 jaeger-agent',
  JAEGER_QUERY_DESC: '接收查詢請求，然後從後端儲存系統中檢索 trace 並透過 UI 進行展示',
  JAEGER_OPERATOR_METRICS_DESC: '提供 operator 的監控 metrics',
  // Monitoring
  MONITORING: '監控',
  PROMETHEUS_K8S_DESC: '提供節點、工作負載、 API 對象相關監控數據',
  NODE_EXPORTER_DESC: '收集集群各個節點的監控數據，供 Prometheus 抓取',
  KUBE_STATE_METRICS_DESC:
    '監聽 Kubernetes API server 以獲取集群中各種 API 對象的狀態包括節點，工作負載和 Pod 等，並生成相關監控數據供 Prometheus 抓取',
  PROMETHEUS_OPERATED_DESC: '所有 Prometheus 實例對應的服務，供 Prometheus Operator 内部使用',
  PROMETHEUS_OPERATOR_DESC: '管理 Prometheus 實例的 Operator',
  ALERTMANAGER_OPERATED_DESC: 'Alertmanager 服務，用於 Prometheus 等與 Alertmanager 集成',
  ALERTMANAGER_MAIN_DESC: 'Alertmanager Web UI 服務',
  NOTIFICATION_MANAGER_SVC_DESC:
    'Notification Manager 服務，提供發送郵件、微信、Slack 等通知的接口',
  NOTIFICATION_MANAGER_CONTROLLER_METRICS_DESC:
    '提供 Notification Manager Controller 内部監控數據的服務',
  // Logging
  LOGGING: '紀錄',
  ELASTICSEARCH_LOGGING_DATA_DESC: '提供 Elasticsearch 數據儲存、備份、搜索等數據服務',
  ELASTICSEARCH_LOGGING_DISCOVERY_DESC: '提供 Elasticsearch 集群管理服務',
  LOGSIDECAR_INJECTOR_ADMISSION_DESC: '為指定 Pod 自動注入落盤紀錄收集 Sidecar 容器',
  KS_EVENTS_ADMISSION_DESC: '為 Events 規則管理提供驗證 webhook',
  KS_EVENTS_RULER_DESC: 'Events 規則引擎服務，提供 Events 過濾和告警功能',
  KUBE_AUDITING_WEBHOOK_SVC_DESC: '負責審計紀錄的收集、比對、持久化和告警',
  // DevOps
  S2IOPERATOR_METRICS_SERVICE_DESC: 'S2I 監控服務組件，提供基礎監控數據',
  WEBHOOK_SERVER_SERVICE_DESC: '為 S2I 提供預設值和驗證 webhook',
};
