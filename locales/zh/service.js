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
  SERVICE_TYPE_STATEFULSERVICE_SCAP: '有状态服务',
  SERVICE_TYPE_STATELESSSERVICE_SCAP: '无状态服务',
  SERVICE_TYPE_EXTERNALSERVICE_SCAP: '外部服务',
  ' has no corresponding workload.': '没有对应的工作负载',
  ACCESS_TYPE: '访问类型',
  'Add Route Rule': 'Add Route Rule',
  'Add Selector': '添加选择器',
  'Associated Application': '关联应用',
  'Automatically assign Service IP': '自动分配服务 IP',
  'Commonly included tags in the current workloads': '当前的工作负载中共同包含的标签',
  'Create Service': 'Create Service',
  'Create service by specifying workloads': '指定工作负载创建服务',
  'Create service by Yaml': '通过 Yaml 创建服务',
  Creating: '正在创建',
  'Creation failed, please delete and try again': '创建失败，请删除后重试',
  'Delete Service': '删除服务',
  'Do not assign Service IP': '不分配服务 IP',
  'External Address': 'External Address',
  EXTERNAL_IP_ADDRESS_SCAP: '外部 IP 地址',
  'External Service': 'External Service',
  'Internal access': '内部访问',
  'LoadBalancer IP': '负载均衡 IP',
  'Map Services outside the cluster': '映射集群外部的服务',
  'No related resources found with current service(s)': 'No related resources found with current service(s)',
  'Node Port': '节点端口',
  'Node Port(s)': '节点端口',
  'Not Associate': '不关联',
  'Path is Required': '请填写 Path',
  'Please input ExternalName': '请输入 ExternalName',
  'Please input selectors that have corresponding workloads': '请输入有对应工作负载的选择器',
  'Please input service name': '请输入服务名称',
  'Please select a workload': '请选择一个工作负载',
  'Please select Service': '请选择 Service',
  routes: '应用路由',
  selector: '选择器',
  'Service Mesh': '服务治理',
  'Service Name': '服务名称',
  SERVICE_TYPE_DESC: '选择一个服务类型。',
  'Simple Service': '简单服务',
  'Specify Node': 'Specify Node',
  'Service Type': 'Service Type',
  'Specify Workload': '指定工作负载',
  'Sure to delete the service(s)?': '确认删除服务',
  'Target Port': '目标端口',
  'The current selector': '当前设置的选择器',
  SERVICE_SELECTOR_AFFECT_1: '',
  SERVICE_SELECTOR_AFFECT_2: '共影响到 {count} 个工作负载',
  SERVICES_BASEINFO_DESC: '创建服务需要提供服务的名称和描述，服务名称不能和同一项目下已有的服务名称相同。',
  SERVICES_SETTINGS_DESC: '服务设置定义了如何来访问已有的工作负载。',
  HEADLESS_EXTERNAL_NAME_TITLE: '映射集群外部的地址来访 Headless (externalname)',
  HEADLESS_EXTERNAL_NAME_DESC: '将集群或者项目外部服务映射到集群或项目内。',
  SERVICE_TYPE_STATEFULSERVICE: '有状态服务',
  SERVICE_TYPE_STATELESSSERVICE: '无状态服务',
  SERVICE_TYPE_EXTERNALSERVICE: '外部服务',
  // Services
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  EXTERNALNAME_EXAMPLE: '例如：'
};