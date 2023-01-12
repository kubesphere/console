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
  // Attributes
  ENDPOINT: '端点',
  SESSION_AFFINITY: '会话亲和性',
  // More
  EDIT_EXTERNAL_ACCESS: '编辑外部访问',
  EDIT_MONITORING_EXPORTER: '编辑监控导出器',
  EDIT_SERVICE: '编辑服务',
  // More > Edit Service
  // More > Edit Service > Specify Workload
  // More > Edit External Access > Access Mode
  ACCESS_NONE_TIP: '不提供外网访问，只能在集群内访问服务。',
  EXTERNAL_SERVICE: '外部服务',
  // More > Edit Monitoring Exporter
  COLLECTION_INTERVAL_MIN: '收集间隔（分钟）',
  COLLECTION_INTERVAL_MIN_DESC: '两次指标收集操作之间的间隔时间，单位为分钟。默认值为1。',
  COLLECTION_TIMEOUT_DESC: '每次指标收集操作的超时间隔，单位为秒。默认值为 10。',
  SELECT_AUTHENTICATION_METHOD: '选择认证方式',
  SELECT_AUTHENTICATION_METHOD_DESC: '选择在指标收集过程中使用的认证方式。',
  NO_AUTHENTICATION_TCAP: '无需认证',
  NO_AUTHENTICATION_TIP: '在指标收集过程中不使用认证。',
  CREATE_A_NEW_SECRET: '创建保密字典',
  REFRESH_SECRETS: '刷新保密字典。',
  CERTIFICATE_AUTHORITY: '发证机构',
  SERVER_NAME: '服务器名称',
  TLS_SETTINGS_TCAP: 'TLS 设置',
  BEARER_TOKEN_TCAP: 'Bearer 令牌',
  BASIC_AUTHENTICATION_TCAP: '基础认证',
  // More > Edit YAML
  // Attributes
  EXTERNAL_IP_ADDRESS: '外部 IP 地址',
  // Resource Status
  MONITORING_EXPORTER: '监控导出器',
  MONITORING_EXPORTER_VALUE: '监控导出器：{value}',
  PORT_PL: '端口',
  SERVICE_NODE_PORT_DESC: '如果您的客户机与集群在同一网段，您可以使用<节点 IP 地址>:<节点端口>访问服务。',
  IMAGE_BUILDING_FAILED: '镜像创建失败',
  IMAGE_BUILDING_SUCCESSFUL: '镜像创建成功',
  BUILDING_IMAGE: '创建镜像中',
  SERVICE_MONITORING_EXPORTER: 'Service Monitoring Exporter',
  EXPORTER_SERVICE_PORTS: 'Exporter Service Ports',
  SCRAPE_INTERVAL_MIN: 'Scape Interval Min'
};