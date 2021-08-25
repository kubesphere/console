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
  services: '服务',
  routes: '应用路由',
  Ports: '端口',
  selector: '选择器',
  Selector: '选择器',
  'External Address': '外部地址',
  'LoadBalancer IP': '负载均衡 IP',
  CREATE_SERVICE: '创建服务',
  'Delete Service': '删除服务',
  ACCESS_METHOD: '访问方式',
  'Target Port': '目标端口',
  CONTAINER_PORT: '容器端口',
  SERVICE_PORT: '服务端口',
  'Node Port': '节点端口',
  'Node Port(s)': '节点端口',
  EDIT_SERVICE: '编辑服务',
  EDIT_INTERNET_ACCESS: '编辑外网访问',
  'Please select Service': '请选择 Service',
  'Path is Required': '请填写 Path',
  VIRTUAL_IP: '虚拟 IP',

  SERVICE_TYPE_TCAP: '服务类型',
  'Service Access': '服务访问',
  STATELESS_SERVICE: '无状态服务',
  STATEFUL_SERVICE: '有状态服务',
  'External Service': '外部服务',
  'Simple Service': '简单服务',
  'Associated Application': '关联应用',
  'Service Mesh': '服务治理',

  'Internal access': '内部访问',
  ACCESS_TYPE: '访问类型',

  'Service Name': '服务名称',
  'Please input service name': '请输入服务名称',
  ENTER_EXTERNALNAME_DESC: '请输入 ExternalName。',
  SPECIFY_WORKLOAD: '指定工作负载',
  'Specify Node': '指定节点',
  'Add Selector': '添加选择器',

  INVALID_PORT_DESC: '请输入有效协议或端口号。',
  'Not Associate': '不关联',

  Auto: '自动',

  CUSTOM_CREATION: '自定义创建',
  'Specify Workloads': '指定工作负载',
  'Create service by specifying workloads': '指定工作负载创建服务',
  'Create service by Yaml': '通过 Yaml 创建服务',

  'Sure to delete the service(s)?': '确认删除服务',
  'No related resources found with current service(s)':
    '当前服务下没有关联的资源',

  'Automatically assign Service IP': '自动分配服务 IP',
  'Do not assign Service IP': '不分配服务 IP',
  'Map Services outside the cluster': '映射集群外部的服务',
  ENTER_PORT_NUMBER: '请输入端口号。',
  'Please select a workload': '请选择一个工作负载',
  ENTER_SELECTOR_TIP: '请输入有效的选择器。',
  TOTAL_WORKLOAD: '共 {count} 个工作负载',

  STICKY_SESSION: '会话保持',
  MAXIMUM_STICKINESS_DURATION: '最大会话保持时间（秒）',
  STICKY_SESSION_DESC: '会话保持时间默认是 10800 秒（即 3 小时）。',

  SERVICE_NAME_DESC:
    '名称只能包含小写字母、数字和连字符（-），必须以小写字母开头并以小写字母或数字结尾，最长 63 个字符。',

  SERVICE_DESC:
    '服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。',
  SERVICE_CREATE_DESC:
    '服务（Service）提供一种抽象的方法，将运行在容器组（Pod）上的应用程序公开为网络服务。您可选择服务的类型或者创建服务的方式。<br/>KubeSphere 支持无状态服务和有状态服务，并支持通过代码或者制品构建服务。',

  SERVICES_BASEINFO_DESC:
    '创建服务需要提供服务的名称和描述，服务名称不能和同一项目下已有的服务名称相同。',
  SERVICES_SETTINGS_DESC: '服务设置定义了如何来访问已有的工作负载。',

  SERVICE_EXTERNAL_NAME_DESC:
    '通过返回 CNAME 和它的值，可以将服务映射到 externalName 字段的内容',

  ACCESS_NONE_TIP: '不提供外网访问，只能在集群内访问服务。',
  ACCESS_NODEPORT_TIP: '通过集群节点的对应端口来访问服务。',
  ACCESS_LOADBALANCER_TIP: '通过云服务商提供的负载均衡器来访问服务。',

  'The current selector': '当前设置的选择器',
  'Commonly included tags in the current workloads':
    '当前的工作负载中共同包含的标签',
  SERVICE_SELECTOR_AFFECT_2: '共影响到 {count} 个工作负载',
  ' has no corresponding workload.': '没有对应的工作负载',
  'Please input selectors that have corresponding workloads':
    '请输入有对应工作负载的选择器',
  Creating: '正在创建',
  'Creation failed, please delete and try again': '创建失败，请删除后重试',

  ADD_ROUTE_RULE_TCAP: '添加路由规则',

  VIRTUAL_IP_TITLE: '虚拟 IP',
  VIRTUAL_IP_DESC:
    '集群为服务生成集群内唯一的 IP 地址，集群内部可以通过此 IP 地址来访问服务。',
  HEADLESS_SELECTOR_TITLE: 'Headless（选择器）',
  HEADLESS_SELECTOR_DESC:
    '集群不为服务生成 IP 地址，集群内部通过服务的 Endpoint IP 地址直接访问服务。',
  HEADLESS_EXTERNAL_NAME_TITLE:
    '映射集群外部的地址来访 Headless (externalname)',
  HEADLESS_EXTERNAL_NAME_DESC: '将集群或者项目外部服务映射到集群或项目内。',

  SERVICES_INTERNET_ACCESS_DESC: '将服务暴露给外网。',

  SERVICE_NODE_PORT_DESC:
    '如果您当前的网络与集群节点在同一网络内，那么您可以通集群IP地址+节点端口号进行访问，或者通过节点 IP+节点端口进行访问',

  SERVICE_TYPE: '您可以自定义创建 无状态服务 或者 有状态服务',

  SPECIFY_WORKLOAD_DESC: '将工作负载所创建的容器组副本的标签作为预填充内容。',

  SPECIFY_NODE_DESC: '将节点的标签作为预填充内容',

  SERVICE_TYPES_Q: '服务的类型',
  SERVICE_TYPES_A:
    '服务分为无状态服务 (Virtual Service + Depolyment) 及有状态服务 (Headless Service +Statefulset), 无状态服务中多个副本可以共享一个存储卷、有状态服务需要拥有自己独立的存储卷',

  SCENARIOS_FOR_SERVICES_Q: '无状态服务和有状态服务的使用场景？',
  SCENARIOS_FOR_SERVICES_A:
    '无状态服务适用于不需要数据持久化的场景，并且多个实例对统一请求的响应式相同的场景(例如 Nginx、Tomcat 等)；有状态服务适用于需要数据存储功能的服务、或者指多线程类型的服务，队列等 (mysql 数据库、kafka、zookeeper 等)。',
  STATEFUL_SERVICE_DESC:
    '有状态服务用来管理有状态应用，可以保证部署和扩容缩容的顺序，提供了稳定的持久化存储和网络标识，有序伸缩等',
  STATELESS_SERVICE_DESC:
    '容器服务中最常用的一种服务，通过定义容器组模板来控制容器组状态，包括滚动升级和回滚',
  SERVICE_FROM_CODE: '通过代码构建新的服务',
  SERVICE_FROM_ARTIFACTS: '通过制品构建新的服务',
  SERVICE_FROM_CODE_DESC:
    '您可以将已有的代码通过  Source to Image 的方式构建成镜像并部署',
  SERVICE_FROM_ARTIFACTS_DESC: '您可以将已有制品构建成新的镜像并完成部署',
  'Language Type': '语言类型',
  SERVISE_SIMPLE_DESC: '通过已有的容器组来创建服务',
  DELETE_SERVICE_DESC:
    '您即将删除服务 {resource}，请您进行确认是否删除关联资源?',

  SERVICE_CUSTOM_CREATE: '您可以通过指定工作负载或者编辑配置 (Yaml) 来创建服务',

  SERVICE_TYPE_STATEFULSERVICE: '有状态服务',
  SERVICE_TYPE_STATELESSSERVICE: '无状态服务',
  SERVICE_TYPE_EXTERNALSERVICE: '映射外部服务',

  SERVICE_PORTS_DESC: '设置容器镜像暴露的端口以及服务端口。',

  EIP_POOL_DESC: '集群内部访问方式(DNS)',

  STICKINESS_VALUE_RANGE: '取值范围：0-86400。',

  // Services
  PORT: '端口',
  PROTOCOL: '协议',
  ADD: '添加',
  LABEL_SELECTOR: '标签选择器',
  NONE: '无',
  UNKNOWN_SERVICE_TYPE: '未知服务类型',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  UNKNOWN: '未知',
  EXTERNALNAME_EXAMPLE: '例如：',
  PORTS: '端口',
  REQUIRED: '必填',
}
