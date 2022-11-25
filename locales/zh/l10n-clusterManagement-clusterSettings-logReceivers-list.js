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
  LOG_RECEIVER_PL: '日志接收器',
  LOG_COLLECTION_DESC: '系统将收集每个容器的标准输出和标准错误输出日志，并将其发送到一个或多个目标服务。',
  // Banner > Add Log Receiver
  ADD_LOG_RECEIVER: '添加日志接收器',
  LOG_COLLECTION_TIPS: '每种类型的日志收集器只能添加一个。',
  ES_DESC: 'Elasticsearch 是分布式、RESTful 风格的搜索和分析引擎。',
  KAFKA_DESC: 'Kafka 是流行的开源流处理平台。',
  FLUENTD_DESC: 'Fluentd 是提供统一日志处理层的开源数据收集器。',
  // Banner > Add Log Receiver > Elasticsearch
  LOG_COLLECTION_ES_URL_TIPS: '默认使用系统部署的 Elasticsearch 服务，您也可以输入在集群内部或外部单独部署的 Elasticsearch 服务的地址。',
  LOG_COLLECTION_ES_INDEX_TIPS: '使用索引前缀进行快速搜索。系统以<索引前缀>-<年-月-日>格式自动生成索引前缀。',
  ADDRESS_VALUE: '地址：{value}',
  // Banner > Add Log Receiver > Kafka
  TOPIC: '主题',
  ADD_SERVICE_ADDRESS: '添加',
  SERVICE_ADDRESS: '服务地址',
  ENTER_SERVICE_ADDRESS: '请输入服务地址。',
  INVALID_SERVICE_ADDRESS: '请输入正确的服务地址。',
  SERVICE_ADDRESS_EXIST: '服务地址已存在，请输入其他服务地址。',
  EXAMPLE_VALUE: '例如：{value}',
  // Banner > Add Log Receiver > Fluentd
  LOG_COLLECTION_FLUENTD_URL_TIPS: '输入接收日志的 Fluentd 服务的地址。',
  // Container Logs
  EMPTY_LOG_COLLECTIONS: '未发现日志接收器。您可以添加日志接收器将日志发送到外部日志接收器中。',
  // Resource Events
  RESOURCE_EVENTS: '资源事件',
  // Audit Logs
  AUDIT_LOGS: '审计日志'
};