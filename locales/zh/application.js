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
  'According to the HTTP header': '根据 HTTP header',
  'Add Component': '添加组件',
  'Add Component Successfully': '添加组件成功',
  'Add an Internet access rule for the application': '为应用添加外网访问规则',
  'Add New Component': '添加新组件',
  'App store deployment': '应用商店部署',
  'App Template': '应用模板',
  'App Types': '应用的类型',
  APP_ICON_TIP: '点击上传应用图标，尺寸最大为 120px * 120px',
  application: '应用',
  'Application Component': '应用组件',
  APP_COMPONENT_PL: '应用组件',
  'Application components combine workloads and services as components in applications': '应用组件组合了工作负载和服务作为应用中的组件',
  'Application governance is not enabled': '应用治理未开启',
  'Application Icon': '应用图标',
  'Application Route': '应用路由',
  APP_VERSION: '应用版本',
  'Build an app by app template': '应用模板部署',
  'Build an app by services': '通过服务构建应用',
  'Called Depth': '调用深度',
  'Called Services': '调用服务',
  'Choose existing services or create new service components to build an app': '选择已有服务或者新建服务组件来构建应用',
  'Cluster Select': '集群选择',
  'Cluster Selection': '集群选择',
  'Component Version': '组件版本',
  'Composing App': '自制应用',
  'Create Application by Service': '通过服务构建应用',
  'Current Version': '当前版本',
  DEPLOY: '部署',
  'Deploy App': '部署应用',
  'Deploy applications with one-click application templates provided by Kubesphere': '通过 Kubesphere 提供的应用模板一键部署应用',
  'Deploy sample app Bookinfo': '部署示例应用 Bookinfo',
  'From third party Helm': '来自第三方 Helm',
  'How to use Application Governance': '如何使用应用治理',
  'If you need to access applications by application route, add routing rules': '如果您需要将应用通过应用路由的方式进行访问，请添加路由规则',
  Log: '日志',
  'Max request retries': '最大请求重试次数',
  METHOD: '方式',
  'No Components': '未发现组件',
  'No result found': '未查询到结果',
  Off: '关闭',
  On: '开启',
  'Please finish the sub form first': '请完成子表单的编辑',
  'Please input an application name': '请输入应用名称',
  'Please input component version': '请输入组件版本',
  Process: '进程',
  Receive: '接收',
  Rollback: '回滚',
  'Sample apps can help you get started with app creation and app governance': '示例应用可以帮助您快速入手应用创建, 以及应用治理功能',
  Send: '发送',
  'Service components should not be empty': '服务组件不能为空',
  SERVICE_PORTS: '服务端口',
  SERVICE_PORT_NAME_DESC: '端口的名字必须遵循如下格式 <protocol>[-<suffix>]，可以是 http、http2、 grpc、 mongo、 或者 redis 作为 <protocol> ，这样才能使用 Istio 的路由功能。例如 name: http2-foo 和 name: http 都是有效的端口名称，而 name: http2foo 不是。',
  'Services & Operations': '服务与操作',
  'Session retention': '会话保持',
  'Success rate': '成功率',
  Tags: '标签',
  TOTAL_COLLECTIONS: '共计 {num} 个接收器',
  Traffic: '流量',
  'Traffic Monitoring': '流量监测',
  Upgrade: '升级',
  'Workload Type': '负载类型',
  TOTAL_APPS: '共计 {num} 个应用',
  APP_WORKLOAD_TYPE_DESC: '支持无状态服务(部署)及有状态服务(有状态副本集)',
  TYPE_SERVICE_DEPLOYMENT: '类型：无状态服务（部署）',
  TYPE_SERVICE_STATEFULSET: '类型：有状态服务（有状态副本集）',
  'Last {hour} hour': '最近 {hour} 小时',
  'Last {hour} hours': '最近 {hour} 小时',
  'Last {day} days': '最近 {day} 天',
  WORKLOAD_NAME_EXIST: '工作负载 {name} 已存在',
  TIP_APP_TYPE: 'KubeSphere 支持来自于应用商店和应用仓库的应用部署(基于 Helm)，同样也支持自制应用 (Application CRD)。',
  TIP_APP_GOVERNANCE: '使用应用治理需要创建自制应用并对每项服务开启服务治理功能',
  APP_REPOS_DESC: '应用仓库来自于第三方的 Helm Chart Repo，通过可视化的方式在 KubeSphere 中展示并提供部署及管理功能，用户可以基于应用仓库中的模板快速地一键部署应用。',
  TRAFFIC_MANAGEMENT_NO_MICROSERVICE_TIP: '流量治理依赖于微服务模块, 当前集群未开启微服务模块',
  TRACING_NO_MICROSERVICE_TIP: '请在当前集群中开启应用治理组件。'
};