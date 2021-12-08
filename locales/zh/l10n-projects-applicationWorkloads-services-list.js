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
  SERVICE_TYPES_Q: 'KubeSphere 支持哪些服务类型？',
  SERVICE_TYPES_A: 'KubeSphere 支持无状态服务和有状态服务。无状态服务中的多个容器组副本共享一个存储卷，有状态服务中的每个容器组副本都拥有独立的存储卷。',
  SCENARIOS_FOR_SERVICES_Q: '无状态服务和有状态服务分别适用于哪些场景？',
  SCENARIOS_FOR_SERVICES_A: '无状态服务适用于不需要数据持久化的场景，例如 Nginx 和 Tomcat。有状态服务适用于需要数据持久化的场景，例如 MySQL 数据库、Kafka 和 ZooKeeper。',
  // Service List
  SERVICE_TYPE: '服务类型',
  SERVICE_LIST: '服务列表',
  // List > Create
  CREATE_SERVICE_DESC: '选择创建服务的方式。',
  SELECT_SERVICE_TYPE_DESC: '创建一个无状态或有状态服务，或将一个服务映射到外部服务。',
  SERVICE_FROM_CODE: '通过代码创建服务',
  SERVICE_FROM_ARTIFACT: '通过制品创建服务',
  SERVICE_FROM_CODE_DESC: '将现有的代码构建成镜像并部署。',
  SERVICE_FROM_ARTIFACT_DESC: '将现有的制品构建成镜像并部署。',
  CUSTOMIZE_SERVICE: '自定义服务',
  CUSTOMIZE_SERVICE_DESC: '通过指定工作负载或编辑 YAML 配置文件来创建服务。',
  // List > Create > Select Service Type > Stateless Service > Pod Settings > Port Settings
  PORT_INPUT_DESC: 'The port name already exists. Please enter another name.',
  PORT_NAME_DESC: 'The port name can contain only lowercase letters, numbers, and hyphens (-) and must start and end with a lowercase letter or number. The maximum length is 63 characters.',
  // List > Create > Select Service Type > Stateful Service
  // List > Create > Select Service Type > External Service
  CREATE_EXTERNAL_SERVICE_DESC: 'Create a service and map it to an external service.',
  CREATE_EXTERNAL_SERVICE: 'Create External Service',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: 'Please enter the domain name of an external service.',
  EXTERNAL_SERVICE_ADDRESS: 'External Service Address',
  EXTERNAL_SERVICE_ADDRESS_DESC: 'Enter the domain name of an external service.',
  // List > Create > Create Service from Source Code
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  LANGUAGE_TYPE_VALUE: 'Language Type: {value}',
  // List > Create > Create Service from Source Code > Java > Basic Information
  // List > Create > Create Service from Source Code > Java > Build Settings
  // List > Create > Create Service from Source Code > Java > Pod Settings
  // List > Create > Create Service from Source Code > Java > Volume Settings
  // List > Create > Create Service from Source Code > Java > Advanced Settings
  // List > Create > Create Service from Source Code > Node.js > Basic Information
  // List > Create > Create Service from Source Code > Node.js > Build Settings
  // List > Create > Create Service from Source Code > Node.js > Pod Settings
  CONTAINER_SETTINGS: 'Container Settings',
  // List > Create > Create Service from Source Code > Node.js > Volume Settings
  // List > Create > Create Service from Source Code > Node.js > Advanced Settings
  // List > Create > Create Service from Source Code > Python > Basic Information
  // List > Create > Create Service from Source Code > Python > Build Settings
  // List > Create > Create Service from Source Code > Python > Pod Settings
  // List > Create > Create Service from Source Code > Python > Volume Settings
  // List > Create > Create Service from Source Code > Python > Advanced Settings
  // List > Create > Create Service from Artifact
  ARTIFACT_TYPE_VALUE: 'Artifact Type: {value}',
  // List > Create > Create Service from Artifact > JAR > Basic Information
  // List > Create > Create Service from Artifact > JAR > Build Settings
  // List > Create > Create Service from Artifact > JAR > Pod Settings
  // List > Create > Create Service from Artifact > JAR > Volume Settings
  // List > Create > Create Service from Artifact > JAR > Advanced Settings
  // List > Create > Create Service from Artifact > WAR > Basic Information
  // List > Create > Create Service from Artifact > WAR > Build Settings
  // List > Create > Create Service from Artifact > WAR > Pod Settings
  // List > Create > Create Service from Artifact > WAR > Volume Settings
  // List > Create > Create Service from Artifact > WAR > Advanced Settings
  // List > Create > Create Service from Artifact > Binary > Basic Information
  BINARY: 'Binary',
  // List > Create > Create Service from Artifact > Binary > Build Settings
  // List > Create > Create Service from Artifact > Binary > Pod Settings
  // List > Create > Create Service from Artifact > Binary > Volume Settings
  // List > Create > Create Service from Artifact > Binary > Advanced Settings
  // List > Create > Customize Service > Specify Workload > Basic Information
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: 'Specify Workload to Create Service',
  EDIT_YAML_TO_CREATE_SERVICE: 'Edit YAML to Create Service',
  SPECIFY_WORKLOAD_DESC: 'Create a service by using one or more existing workloads.',
  // List > Create > Customize Service > Specify Workload > Service Settings
  // List > Create > Customize Service > Specify Workload > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Service
  // List > Edit External Access
  // List > Delete
  NO_RELATED_RESOURCE_FOUND: 'No Related Resource Found',
  NO_SERVICE_RELATED_RESOURCE_DESC: 'No resource related to the service is found.',
  DELETE_SERVICE_DESC: 'You are about to delete the service(s) {resource}. Please confirm whether to delete the associated resource?',
  DELETE_SERVICE_DESC_PL: 'You are about to delete the services {resource}.<br/>Do you want to also delete the following resources related to the services?',
  DELETE_SERVICE_DESC_SI: 'You are about to delete the ervice {resource}.<br/>Do you want to also delete the following resource related to the service?',
  DELETE_SERVICE: 'Delete Service',
  DELETE_MULTIPLE_SERVICES: 'Delete Multiple Services',
  // Service Topology
  SERVICE_TOPOLOGY: 'Service Topology',
  AUTO_REFRESH: 'Auto Refresh',
  POD_COUNT_VALUE: 'Pods: {value}'
};