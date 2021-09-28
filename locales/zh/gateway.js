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
  GATEWAY_SETTING: '网关设置',
  GATEWAY_DESC: '对集群和项目中的外网访问网关以及服务治理等配置进行设置和管理',
  CLUSTER_GATEWAY: '集群网关',
  PROJECT_GATEWAY: '项目网关',
  CLUSTER_GATEWAYS_SETTING_DESC:
    '创建应用路由之前，需要先启用外网访问入口，即网关。这一步是创建对应的应用路由控制器，负责将请求转发到对应的后端服务。',
  PROJECT_GATEWAYS_SETTING_DESC:
    '集群管理页面不支持项目网关的设置，如需设置需要转到对应项目下进行设置。',
  'Cluster Gateway Not Set': '集群网关未设置',
  'Project Gateway Not Set': '没有找到 项目网关',
  'Gateway Not Set': '网关未设置',
  'View Gateway': '查看网关',
  'Set Gateway': '设置网关',
  'Edit Gateway': '编辑网关',
  'Update Gateway': '更新网关',
  'Gateway Config': '网关配置',
  'Add Gateway Config': '添加网关配置',
  'LoadBalancer Support': 'LoadBalancer提供商',
  'Use default annotations': '使用默认注解',
  GATEWAY_IP: '访问地址',
  UPDATE_GATEWAY_DESC: '当前网关可升级',
  DISK_LOG_COLLECTION_DESC:
    '日志收集功能允许系统收集保存在存储卷上的容器日志，并将日志发送到标准输出。',
  UPDATED_GATEWAY_DESC: '请在业务低峰期操作，升级过程可能会造成业务短暂中断。',
  UPDATED_GATEWAY_TITLE: '升级网关确认?',
  CLUSTER_GATEWAY_GUIDE_DESC:
    '开启集群网关后，无法再设置项目网关。若已存在项目网关，删除后无法重新设置。',
  'Request Count': '请求量',
  'Active Connections': '连接数',
  'Request Duration': '请求延迟',
  'Request Error': '请求错误',
  'Duration Average': '平均延迟',
  'Duration 50percentage': 'P50 延迟',
  'Duration 95percentage': 'P95 延迟',
  'Duration 99percentage': 'P99 延迟',
  'Request 4xx': '4xx 错误',
  'Request 5xx': '5xx 错误',
  'Total Requests': '总请求数',
  'Request Success': '请求成功',
  GATEWAYS_REPLICA_DESC:
    '部署 (Deployment) 用来描述期望应用达到的目标状态，主要用来描述无状态应用，副本的数量和状态由其背后的控制器来维护，确保状态与定义的期望状态一致。您可以增加副本数量来满足更高负载；回滚部署的版本来消除程序的错误修改；创建自动伸缩器来弹性应对不同场景下的负载。',
}
