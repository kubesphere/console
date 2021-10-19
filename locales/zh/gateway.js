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
  GATEWAY_SETTINGS: '网关设置',
  CLUSTER_GATEWAY_DESC:
    '对集群中的外网访问网关以及服务治理等配置进行设置和管理。',
  PROJECT_GATEWAY_DESC:
    '对项目中的外网访问网关以及服务治理等配置进行设置和管理。',
  CLUSTER_GATEWAY: '集群网关',
  PROJECT_GATEWAY: '项目网关',
  CLUSTER_GATEWAY_LOW: '集群网关',
  PROJECT_GATEWAY_PL: '项目网关',
  PROJECT_GATEWAY_LOW: '项目网关',
  CLUSTER_SET_GATEWAY_DESC: '请设置集群网关。',
  PROJECT_SET_GATEWAY_DESC: '请设置项目网关。',
  CLUSTER_GATEWAY_NOT_SET: '集群网关未设置',
  PROJECT_GATEWAY_NOT_SET: '项目网关未设置',
  'Gateway Not Set': '网关未设置',
  'Set Gateway': '设置网关',
  EDIT_GATEWAY: '编辑网关',
  'Update Gateway': '更新网关',
  CONFIGURATION_OPTIONS: '配置选项',
  GATEWAY_LOW: '网关',
  'Gateway Config': '网关配置',
  GATEWAY_LOGS: '网关日志',
  'Add Gateway Config': '添加网关配置',
  LOAD_BALANCER_PROVIDER: '负载均衡器提供商',
  LOAD_BALANCER_PROVIDER_SCAP: '负载均衡器提供商',
  LOAD_BALANCER_SCAP: '负载均衡器',
  LOAD_BALANCERS_SCAP: '负载均衡器',
  USE_DEFAULT_ANNOTATIONS: '使用默认注解',
  GATEWAY_IP: '访问地址',
  UPDATE_GATEWAY_DESC: '当前网关可更新。',
  DISK_LOG_COLLECTION_DESC:
    '日志收集功能允许系统收集保存在存储卷上的容器日志，并将日志发送到标准输出。',
  UPDATED_GATEWAY_DESC: '请在业务低峰期操作，升级过程可能会造成业务短暂中断。',
  UPDATED_GATEWAY_TITLE: '升级网关确认?',
  CLUSTER_GATEWAY_GUIDE_DESC:
    '如果同时存在集群网关和项目网关，项目网关关闭后无法再次启用。建议仅使用集群网关或仅使用项目网关。',
  'Request Count': '请求量',
  CONNECTION_COUNT: '连接数量',
  FAILED_REQUEST_COUNT: '失败请求数量',
  AVERAGE_LATENCY: '平均延迟',
  P_FIFTY_LATENCY: 'P50 延迟',
  P_NINETY_FIVE_LATENCY: 'P95 延迟',
  P_NINETY_NINE_LATENCY: 'P99 延迟',
  FOUR_XX_REQUEST_COUNT: '4XX 请求数量',
  FIVE_XX_REQUEST_COUNT: '5XX 请求数量',
  TOTAL_REQUESTS: '总请求数量',
  SUCCESSFUL_REQUESTS: '成功请求',
  GATEWAYS_REPLICA_DESC:
    '部署 (Deployment) 用来描述期望应用达到的目标状态，主要用来描述无状态应用，副本的数量和状态由其背后的控制器来维护，确保状态与定义的期望状态一致。您可以增加副本数量来满足更高负载；回滚部署的版本来消除程序的错误修改；创建自动伸缩器来弹性应对不同场景下的负载。',
  PROJECT_GATEWAY_EMPTY_DESC:
    '集群管理页面不支持项目网关的设置，如需设置需要转到对应项目下进行设置。',
}
