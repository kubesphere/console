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
  // Details
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
  SERVICE_MONITORING_EXPORTER: '服务监控导出器',
  EXPORTER_SERVICE_PORTS: '导出服务端口',
  SCRAPE_INTERVAL_MIN: '采集间隔（分钟）',
  SCRAP_INTERVAL_DESC: '监控数据采集间隔，默认为 1 分钟。',
  SELECT_AUTHENTICATION_METHOD: '选择认证方式',
  PORT_CONNECTION_AUTHENTICATION: '端口连接认证。',
  NO_AUTH_TIP: '接口可直接连接，无需认证。',
  CREATE_A_NEW_SECRET: '创建新保密字典',
  REFRESH_SECRETS: '刷新保密字典。',
  SCRAP_TIMEOUT_DESC: '超时，默认值 10 秒。',
  CERTIFICATE_AUTHORITY: '发证机构',
  ENCRYPTION_KEY: '密钥',
  SERVER_NAME: '服务器名称',
  NO_AUTHENTICATION_TCAP: '无需认证',
  TLS_SETTINGS_TCAP: 'TLS 设置',
  BEARER_TOKEN_TCAP: 'Bearer 令牌',
  BASIC_AUTHENTICATION_TCAP: '基础认证',
  // More > Edit YAML
  // Details
  EXTERNAL_IP_ADDRESS: '外部 IP 地址',
  // Resource Status
  MONITORING_EXPORTER: '监控导出器',
  MONITORING_EXPORTER_VALUE: '监控导出器：{value}',
  PORT_PL: '端口',
  SERVICE_NODE_PORT_DESC: '如果您的客户机与集群在同一网段，您可以使用<节点 IP 地址>:<节点端口>访问服务。',
  IMAGE_BUILDING_FAILED: '镜像创建失败',
  IMAGE_BUILDING_SUCCESSFUL: '镜像创建成功',
  BUILDING_IMAGE: '创建镜像中'
};