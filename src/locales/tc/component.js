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

export default {
  'Running Status': '運行狀態',
  'All Components': '全部服務組件',
  components: '服務組件',
  Components: '服務組件',
  'Installed Components': '已安裝組件',
  'Not Installed Components': '未安裝組件',
  'Instance Count': '實例數量',

  'Service Details': '服務詳情',

  SERVICE_COMPONENTS_DESC:
    '服務組件提供 KubeSphere、Kubernetes 和 OpenPitrix 集群内各項服務組件的健康狀態監控，可以查看目前集群的健康狀態和運行時間，能夠幫助使用者監測集群的狀況和即時定位問題。',

  'KS-ACCOUNT_DESC': '提供使用者、權限管理相關的 API',
  'KS-APIGATEWAY_DESC': '負責處理服務請求和處理 API 調用過程中的所有任務',
  'KS-APISERVER_DESC':
    '整個集群管理的 API 介面和集群内部各個模組之間通信的樞紐，以及集群安全控制',
  'KS-CONSOLE_DESC': '提供 KubeSphere 的控制台服務',
  OPENLDAP_DESC: '負責集中儲存和管理使用者帳號資訊',
  REDIS_DESC: '將結構化的數據儲存在記憶體中的儲存系統',

  COREDNS_DESC: '為 Kubernetes 集群提供服務發現的功能',
  'KUBE-CONTROLLER-MANAGER_DESC':
    '由一系列的控制器組成，處理集群中常規任務的後台線程',
  'KUBE-SCHEDULER_DESC':
    'Kubernetes 的調度器，將 Pod 調度到合適的 Node 節點上去',
  'METRICS-SERVER_DESC':
    'Kubernetes 的監控組件，從每個節點的 Kubelet 採集指標資訊',
  'TILLER-DEPLOY_DESC': 'Helm 的服務端，負責管理發佈 release',

  'OPENPITRIX-API-GATEWAY_DESC':
    '負責處理平台的服務請求和處理 API 調用過程中的所有任務',
  'OPENPITRIX-APP-MANAGER_DESC': '提供 OpenPitrix 的應用生命週期管理',
  'OPENPITRIX-CATEGORY-MANAGER_DESC': '提供 OpenPitrix 中的應用分類管理',
  'OPENPITRIX-CLUSTER-MANAGER_DESC': '提供 OpenPitrix 中的應用實例生命週期管理',
  'OPENPITRIX-DB_DESC': 'OpenPitrix 資料庫',
  'OPENPITRIX-ETCD_DESC': '高可用鍵值儲存系統，用於共享配置、服務發現和全局鎖',
  'OPENPITRIX-IAM-SERVICE_DESC':
    '控制哪些使用者可使用您的資源（身份驗證）以及可使用的資源和採用的方式（授權）',
  'OPENPITRIX-JOB-MANAGER_DESC': '具體執行 OpenPitrix 應用實例生命週期 Action',
  'OPENPITRIX-MINIO_DESC': '對象儲存服務，用於儲存非結構化數據',
  'OPENPITRIX-REPO-INDEXER_DESC': '提供 OpenPitrix 的應用倉庫索引服務',
  'OPENPITRIX-REPO-MANAGER_DESC': '提供 OpenPitrix 的應用倉庫管理',
  'OPENPITRIX-RUNTIME-MANAGER_DESC': '提供平台中的雲運行時環境管理',
  'OPENPITRIX-TASK-MANAGER_DESC':
    '具體執行 OpenPitrix 應用實例生命週期 Action 子任務',

  'ISTIO-CITADEL_DESC':
    '透過内建身份和憑證管理賦予强大的服務之間和最終使用者身份驗證',
  'ISTIO-GALLEY_DESC':
    '代表其他的 Istio 控制平面組件，用來驗證使用者編寫的 Istio API 配置',
  'ISTIO-INGRESSGATEWAY_DESC': '提供外網訪問的網關',
  'ISTIO-PILOT_DESC': '為 Envoy sidecar 提供服務發現功能',
  'ISTIO-POLICY_DESC':
    '用於向 Envoy 提供訪問策略控制，黑白名單控制，速率限制等相關策略',
  'ISTIO-SIDECAR-INJECTOR_DESC': '為配置注入的 Pod 自動注入 sidecar',
  'ISTIO-TELEMETRY_DESC': '為 Envoy 提供了數據上報和紀錄搜集服務',
  'JAEGER-COLLECTOR_DESC':
    '收集 sidecar 的數據，istio 裡面 sidecar 就是 jaeger-agent',
  'JAEGER-COLLECTOR-HEADLESS_DESC':
    '收集 sidecar 的數據，Istio 裡面 sidecar 就是 jaeger-agent',
  'JAEGER-OPERATOR_DESC':
    '負責創建 jaeger 服務，並在配置更新時自動應用到 Jaeger 服務',
  'JAEGER-QUERY_DESC':
    '接收查詢請求，然後從後端儲存系統中檢索 trace 並透過 UI 進行展示',

  'KUBE-STATE-METRICS_DESC':
    '監聽 Kubernetes API server 以獲取集群中各種 API 對象的狀態包括節點，工作負載和 Pod 等，並生成相關監控數據供 Prometheus 抓取',
  'NODE-EXPORTER_DESC': '收集集群各個節點的監控數據，供 Prometheus 抓取',
  'PROMETHEUS-K8S_DESC': '提供節點、工作負載、 API 對象相關監控數據',
  'PROMETHEUS-K8S-SYSTEM_DESC':
    '提供 etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager 等 Kubernetes 組件的監控數據',
  'PROMETHEUS-OPERATED_DESC':
    '所有 Prometheus 實例對應的服務，供 Prometheus Operator 内部使用',
  'PROMETHEUS-OPERATOR_DESC': '管理 Prometheus 實例的 Operator',

  'ELASTICSEARCH-LOGGING-DATA_DESC':
    '提供 Elasticsearch 數據儲存、備份、搜索等數據服務',
  'ELASTICSEARCH-LOGGING-DISCOVERY_DESC': '提供 Elasticsearch 集群管理服務',
  'LOGSIDECAR-INJECTOR_DESC': '為指定 Pod 自動注入落盤紀錄收集 Sidecar 容器',

  'CONTROLLER-MANAGER-METRICS-SERVICE_DESC': '提供 S2I 控制器的監控數據',
  'KS-JENKINS_DESC': 'Jenkins master 服務，提供 DevOps 基礎功能',
  'KS-JENKINS-AGENT_DESC': 'Jenkins agent 連接 Jenkins master 所使用的服務',
  'KS-SONARQUBE-POSTGRESQL_DESC': '代碼質量分析組件 Sonarqube 的後端資料庫',
  'KS-SONARQUBE-SONARQUBE_DESC': 'Sonarqube 的主服務',
  S2IOPERATOR_DESC: 'S2I 控制器，S2I 的全生命週期管理',
  'UC-JENKINS-UPDATE-CENTER_DESC':
    'Jenkins 更新中心，提供 Jenkins 插件的安裝包',
  'WEBHOOK-SERVER-SERVICE_DESC': '為 S2I 提供預設值和驗證 webhook',
}
