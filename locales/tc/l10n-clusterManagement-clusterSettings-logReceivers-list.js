/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  LOG_RECEIVER_PL: '紀錄接收者',
  LOG_COLLECTION_DESC:
    '系統將收集每個容器的標準輸出和標準錯誤輸出紀錄，並將其發送到一個或多個目標服務',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: '添加紀錄接收器',
  LOG_COLLECTION_TIPS: '每種類型的紀錄收集器只能添加一個。',
  ES_DESC: 'Elasticsearch 是分布式、RESTful 風格的搜尋和分析引擎',
  KAFKA_DESC: 'Kafka 是流行的開源流處理平台',
  FLUENTD_DESC: 'Fluentd 是提供統一紀錄處理層的開源數據收集器',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS:
    '預設使用系統部署的 Elasticsearch 服務，您也可以輸入在集群内部或外部單獨部署的 Elasticsearch 服務的地址。',
  LOG_COLLECTION_ES_INDEX_TIPS:
    '使用索引前綴進行快速搜索。系統以<索引前綴>-<年-月-日>格式自動生成索引前綴。',
  ADDRESS_VALUE: 'Address: {value}',
  // Banner > Add Log Receiver > Kafka
  TOPIC: '主題',
  ADD_SERVICE_ADDRESS: '新增',
  SERVICE_ADDRESS: '服務地址',
  ENTER_SERVICE_ADDRESS: '請輸入服務地址。',
  INVALID_SERVICE_ADDRESS: '請輸入正確的服務地址。',
  SERVICE_ADDRESS_EXIST:
    'The service address already exists. Please enter another service address.',
  EXAMPLE_VALUE: 'Example: {value}',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: '輸入接收紀錄的 Fluentd 服務的地址。',
  // Container Logs
  EMPTY_LOG_COLLECTIONS: '未發現紀錄接收器。您可以添加紀錄接收器將記錄發送到外部紀錄接收器中。',
  // Resource Events
  RESOURCE_EVENTS: '資源事件',
  // Audit Logs
  AUDIT_LOGS: '審計紀錄',
};
