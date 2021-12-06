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
  'All Components': '全部服務組件',
  components: '服務組件',
  Components: '服務組件',
  'Installed Components': '已安裝組件',
  'Not Installed Components': '未安裝組件',
  KS_ACCOUNT_DESC: '提供用戶、權限管理相關的 API',
  KS_APIGATEWAY_DESC: '負責處理服務請求和處理 API 調用過程中的所有任務',
  TILLER_DEPLOY_DESC: 'Helm 的服務端，負責管理發佈 release',
  OPENPITRIX_API_GATEWAY_DESC: '負責處理平台的服務請求和處理 API 調用過程中的所有任務',
  OPENPITRIX_APP_MANAGER_DESC: '提供 OpenPitrix 的應用生命週期管理',
  OPENPITRIX_CATEGORY_MANAGER_DESC: '提供 OpenPitrix 中的應用分類管理',
  OPENPITRIX_CLUSTER_MANAGER_DESC: '提供 OpenPitrix 中的應用實例生命週期管理',
  OPENPITRIX_DB_DESC: 'OpenPitrix 資料庫',
  OPENPITRIX_ETCD_DESC: '高可用鍵值儲存系統，用於共享配置、服務發現和全局鎖',
  OPENPITRIX_IAM_SERVICE_DESC: '控制哪些用戶可使用您的資源（身份驗證）以及可使用的資源和採用的方式（授權）',
  OPENPITRIX_JOB_MANAGER_DESC: '具體執行 OpenPitrix 應用實例生命週期 Action',
  OPENPITRIX_MINIO_DESC: '對象儲存服務，用於儲存非結構化數據',
  OPENPITRIX_REPO_INDEXER_DESC: '提供 OpenPitrix 的應用倉庫索引服務',
  OPENPITRIX_REPO_MANAGER_DESC: '提供 OpenPitrix 的應用倉庫管理',
  OPENPITRIX_RUNTIME_MANAGER_DESC: '提供平台中的雲運行時環境管理',
  OPENPITRIX_TASK_MANAGER_DESC: '具體執行 OpenPitrix 應用實例生命週期 Action 子任務',
  ISTIO_CITADEL_DESC: '透過内建身份和憑證管理賦予强大的服務之間和最終用戶身份驗證',
  ISTIO_GALLEY_DESC: '代表其他的 Istio 控制平面組件，用來驗證用戶編寫的 Istio API 配置',
  ISTIO_INGRESSGATEWAY_DESC: '提供外網訪問的網關',
  ISTIO_PILOT_DESC: '為 Envoy sidecar 提供服務發現功能',
  ISTIO_POLICY_DESC: '用於向 Envoy 提供訪問策略控制，黑白名單控制，速率限制等相關策略',
  ISTIO_SIDECAR_INJECTOR_DESC: '為配置注入的 Pod 自動注入 sidecar',
  ISTIO_TELEMETRY_DESC: '為 Envoy 提供了數據上報和紀錄搜集服務',
  JAEGER_OPERATOR_DESC: '負責創建 jaeger 服務，並在配置更新時自動應用到 Jaeger 服務',
  PROMETHEUS_K8S_SYSTEM_DESC: '提供 etcd, coredns, kube-apiserver, kube-scheduler, kube-controller-manager 等 Kubernetes 組件的監控數據',
  LOGSIDECAR_INJECTOR_DESC: '為指定 Pod 自動注入落盤紀錄收集 Sidecar 容器',
  CONTROLLER_MANAGER_METRICS_SERVICE_DESC: '提供 S2I 控制器的監控數據',
  KS_JENKINS_DESC: 'Jenkins master 服務，提供 DevOps 基礎功能',
  KS_JENKINS_AGENT_DESC: 'Jenkins agent 連接 Jenkins master 所使用的服務',
  KS_SONARQUBE_POSTGRESQL_DESC: '代碼質量分析組件 Sonarqube 的後端資料庫',
  KS_SONARQUBE_SONARQUBE_DESC: 'Sonarqube 的主服務',
  S2IOPERATOR_DESC: 'S2I 控制器，S2I 的全生命週期管理',
  UC_JENKINS_UPDATE_CENTER_DESC: 'Jenkins 更新中心，提供 Jenkins 插件的安裝包',
  MYSQL_DESC: '一個開源的資料庫管理系統，讓用戶能夠管理關係型資料庫。關係資料庫將數據保存在不同的表中，而不是將所有數據放在一個大倉庫内',
  ETCD_DESC: '一個可靠的分布式資料儲存，能夠持久化儲存集群配置',
  MINIO_DESC: '一個高性能的開源對象儲存伺服器，適合儲存大容量非結構化的數據',
  HYPERPITRIX_DESC: '針對基於 Helm 的應用程式提供應用商店服務，管理應用生命週期'
};