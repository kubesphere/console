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
  'Create Service': '创建服务',
  'Delete Service': '删除服务',
  'Access Method': '访问方式',
  'Target Port': '目标端口',
  'Container Port': '容器端口',
  'Service Port': '服务端口',
  'Node Port': '节点端口',
  'Node Port(s)': '节点端口',
  'Edit Service': '编辑服务',
  'Edit Internet Access': '编辑外网访问',
  'Please select Service': '请选择 Service',
  'Path is Required': '请填写 Path',
  'Virtual IP': '虚拟 IP',

  'Service Type': '服务类型',
  'Service Access': '服务访问',
  'Stateless Service': '无状态服务',
  'Stateful Service': '有状态服务',
  'External Service': '外部服务',
  'Simple Service': '简单服务',
  'Associated Application': '关联应用',
  'Service Mesh': '服务治理',

  'Internal access': '内部访问',
  'Access Type': '访问类型',

  'Service Name': '服务名称',
  'Please input service name': '请输入服务名称',
  'Please input ExternalName': '请输入 ExternalName',
  'Specify Workload': '指定工作负载',
  'Specify Node': '指定节点',
  'Add Selector': '添加选择器',

  'Invalid port': '无效端口',
  'Not Associate': '不关联',

  Auto: '自动',

  'Custom Creation': '自定义创建',
  'Specify Workloads': '指定工作负载',
  'Create service by specifying workloads': '指定工作负载创建服务',
  'Create service by Yaml': '通过 Yaml 创建服务',

  'Sure to delete the service(s)?': '确认删除服务',
  'No related resources found with current service(s)':
    '当前服务下没有关联的资源',

  'Automatically assign Service IP': '自动分配服务 IP',
  'Do not assign Service IP': '不分配服务 IP',
  'Map Services outside the cluster': '映射集群外部的服务',
  'Please input ports': '请输入端口',
  'Please select a workload': '请选择一个工作负载',
  'Please input valid Selector': '请输入有效的选择器',
  TOTAL_WORKLOAD: '共 {count} 个工作负载',

  'Enable Sticky Session': '开启会话保持',
  'Maximum Session Sticky Time (s)': '最大会话保持时间(秒)',
  'The maximum session sticky time is 10800s (3 hours).':
    '会话保持时间默认是 10800 秒(即 3 小时)',

  SERVICE_NAME_DESC:
    '最长 63 个字符，只能包含小写字母、数字及分隔符("-")，且必须以小写字母开头, 字母或数字结尾',

  SERVICE_DESC:
    '服务 (Service) 是定义了一类容器组的逻辑集合和一个用于访问它们的策略。',
  SERVICE_CREATE_DESC:
    '服务是定义了一类 Pod 的逻辑集合和一个用于访问它们的策略。您可选择服务的类型或者创建服务的方式。<br/>KubeSphere 支持无状态服务和有状态服务，并支持通过代码或者制品构建服务。',

  SERVICES_BASEINFO_DESC:
    '创建服务需要提供服务的名称和描述，服务名称不能和同一项目下已有的服务名称相同。',
  SERVICES_SETTINGS_DESC: '服务设置定义了如何来访问已有的工作负载。',

  SERVICE_EXTERNAL_NAME_DESC:
    '通过返回 CNAME 和它的值，可以将服务映射到 externalName 字段的内容',

  ACCESS_NONE_TIP: '不提供外网访问',
  ACCESS_NODEPORT_TIP: '通过访问集群节点的对应端口来访问服务（NodePort）',
  ACCESS_LOADBALANCER_TIP:
    '通过云服务商提供的负载均衡器来访问服务 (LoadBalancer)',

  'The current selector': '当前设置的选择器',
  'Commonly included tags in the current workloads':
    '当前的工作负载中共同包含的标签',
  SERVICE_SELECTOR_AFFECT_2: '共影响到 {count} 个工作负载',
  ' has no corresponding workload.': '没有对应的工作负载',
  'Please input selectors that have corresponding workloads':
    '请输入有对应工作负载的选择器',
  Creating: '正在创建',
  'Creation failed, please delete and try again': '创建失败，请删除后重试',

  'Add Route Rule': '添加路由规则',

  VIRTUAL_IP_TITLE: '通过集群内部IP来访问服务 Virtual IP',
  VIRTUAL_IP_DESC:
    '以集群为服务生成的集群内唯一的 IP 为基础，集群内部可以通过此 IP 来访问服务。',
  HEADLESS_SELECTOR_TITLE:
    '集群内部通过服务的后端 Endpoint IP 直接访问服务 Headless (selector)',
  HEADLESS_SELECTOR_DESC:
    '集群不为服务生成 IP，集群内部通过服务的后端 Endpoint IP 直接访问服务。此类型适合后端异构的服务，比如需要区分主从的服务。',
  HEADLESS_EXTERNAL_NAME_TITLE:
    '映射集群外部的地址来访 Headless (externalname)',
  HEADLESS_EXTERNAL_NAME_DESC: '将集群或者项目外部服务映射到集群或项目内。',

  SERVICES_INTERNET_ACCESS_DESC: '将服务暴露给外网',

  SERVICE_NODE_PORT_DESC:
    '如果您当前的网络与集群节点在同一网络内，那么您可以通集群IP地址+节点端口号进行访问，或者通过节点 IP+节点端口进行访问',

  SERVICE_TYPE: '您可以自定义创建 无状态服务 或者 有状态服务',

  SPECIFY_WORKLOAD_DESC:
    '指定工作负载可以将工作负载所创建的容器组副本的 Label 作为预填充内容',

  SPECIFY_NODE_DESC: '指定节点可以将节点的 Label 作为预填充内容',

  SERVICE_TYPES_Q: '服务的类型',
  SERVICE_TYPES_A:
    '服务分为无状态服务 (Virtual Service + Depolyment) 及有状态服务 (Headless Service +Statefulset), 无状态服务中多个副本可以共享一个存储卷、有状态服务需要拥有自己独立的存储卷',

  SCENARIOS_FOR_SERVICES_Q: '无状态服务和有状态服务的使用场景?',
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

  SERVICE_PORTS_DESC: '设置容器镜像暴露的端口以及服务端口',

  EIP_POOL_DESC: '集群内部访问方式(DNS)',

  SERVICE_SESSION_STICKY_DESC: '最小为 0，最大为 86400',
}
