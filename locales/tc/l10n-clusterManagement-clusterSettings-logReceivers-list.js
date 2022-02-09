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
  LOG_RECEIVER_PL: 'Log Receivers',
  LOG_COLLECTION_DESC: '系統將收集每個容器的標準輸出和標準錯誤輸出紀錄，並將其發送到一個或多個目標服務',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: '添加紀錄接收者',
  LOG_COLLECTION_TIPS: 'You can add one log receiver for each type.',
  ES_DESC: 'Elasticsearch 是分布式、RESTful 風格的搜索和分析引擎',
  KAFKA_DESC: 'Kafka 是流行的開源流處理平台',
  FLUENTD_DESC: 'Fluentd 是提供統一紀錄處理層的開源數據收集器',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS: 'The built-in Elasticsearch service is used by default. You can also enter the IP address of Elasticsearch independently deployed inside or outside the cluster.',
  LOG_COLLECTION_ES_INDEX_TIPS: 'Use the index prefix to speed up queries. The index prefix is automatically generated in <Index prefix>-<Year-month-date> format.',
  PARAMETER_REQUIRED: 'This parameter is mandatory.',
  // Banner > Add Log Receiver > Kafka
  TOPIC: '主題',
  ADD_SERVICE_ADDRESS: '添加',
  SERVICE_ADDRESS: '服務地址',
  ENTER_SERVICE_ADDRESS: '請輸入服務地址。',
  INVALID_SERVICE_ADDRESS: 'Please enter a correct service address.',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: 'Enter the address of the Fluentd service that receives logs.',
  // Container Logs
  LOG_COLLECTING: 'Collecting',
  LOG_DISABLED: 'Disabled',
  EMPTY_LOG_COLLECTIONS: 'No log receiver is found. You can add log receivers and send logs to external log receivers.',
  // Resource Events
  RESOURCE_EVENTS: 'Resource Events',
  // Audit Logs
  AUDIT_LOGS: 'Audit Logs'
};