/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SERVICE_TYPES_Q: 'KubeSphere 支持哪些服务类型？',
  SERVICE_TYPES_A:
    'KubeSphere 支持无状态服务和有状态服务。无状态服务中的多个容器组副本共享一个卷，有状态服务中的每个容器组副本都拥有独立的卷。',
  SCENARIOS_FOR_SERVICES_Q: '无状态服务和有状态服务分别适用于哪些场景？',
  SCENARIOS_FOR_SERVICES_A:
    '无状态服务适用于不需要数据持久化的场景，例如 Nginx 和 Tomcat。有状态服务适用于需要数据持久化的场景，例如 MySQL 数据库、Kafka 和 ZooKeeper。',
  // Service List
  SERVICE_TYPE: '服务类型',
  SERVICE_LIST: '服务列表',
  SERVICE_TYPE_STATEFULSERVICE: '有状态服务',
  SERVICE_TYPE_STATELESSSERVICE: '无状态服务',
  SERVICE_TYPE_EXTERNALSERVICE: '外部服务',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
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
  PORT_INPUT_DESC: '端口名称已存在，请输入其他名称。',
  PORT_NAME_DESC:
    '端口名称只能包含小写字母、数字和连字符（-），必须以小写字母或数字开头和结尾，最长 63 个字符。',
  // List > Create > Select Service Type > Stateful Service
  // List > Create > Select Service Type > External Service
  CREATE_EXTERNAL_SERVICE_DESC: '创建一个服务并将其映射到一个外部服务。',
  CREATE_EXTERNAL_SERVICE: '创建外部服务',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: '请输入外部服务的域名。',
  EXTERNAL_SERVICE_ADDRESS: '外部服务地址',
  EXTERNAL_SERVICE_ADDRESS_DESC: '输入外部服务的域名。',
  // List > Create > Create Service from Source Code
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  LANGUAGE_TYPE_VALUE: '语言类型：{value}',
  // List > Create > Create Service from Source Code > Java > Basic Information
  // List > Create > Create Service from Source Code > Java > Build Settings
  // List > Create > Create Service from Source Code > Java > Pod Settings
  // List > Create > Create Service from Source Code > Java > Volume Settings
  // List > Create > Create Service from Source Code > Java > Advanced Settings
  // List > Create > Create Service from Source Code > Node.js > Basic Information
  // List > Create > Create Service from Source Code > Node.js > Build Settings
  // List > Create > Create Service from Source Code > Node.js > Pod Settings
  CONTAINER_SETTINGS: '容器设置',
  // List > Create > Create Service from Source Code > Node.js > Volume Settings
  // List > Create > Create Service from Source Code > Node.js > Advanced Settings
  // List > Create > Create Service from Source Code > Python > Basic Information
  // List > Create > Create Service from Source Code > Python > Build Settings
  // List > Create > Create Service from Source Code > Python > Pod Settings
  // List > Create > Create Service from Source Code > Python > Volume Settings
  // List > Create > Create Service from Source Code > Python > Advanced Settings
  // List > Create > Create Service from Artifact
  ARTIFACT_TYPE_VALUE: '制品类型：{value}',
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
  BINARY: '二进制',
  // List > Create > Create Service from Artifact > Binary > Build Settings
  // List > Create > Create Service from Artifact > Binary > Pod Settings
  // List > Create > Create Service from Artifact > Binary > Volume Settings
  // List > Create > Create Service from Artifact > Binary > Advanced Settings
  // List > Create > Customize Service > Specify Workload > Basic Information
  SPECIFY_WORKLOAD_TO_CREATE_SERVICE: '指定工作负载创建服务',
  EDIT_YAML_TO_CREATE_SERVICE: '编辑 YAML 创建服务',
  SPECIFY_WORKLOAD_DESC: '使用一个或多个现有的工作负载创建来创建服务。',
  // List > Create > Customize Service > Specify Workload > Service Settings
  // List > Create > Customize Service > Specify Workload > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Service
  // List > Edit External Access
  // List > Delete
  NO_RELATED_RESOURCE_FOUND: '没有关联的资源',
  NO_SERVICE_RELATED_RESOURCE_DESC: '当前服务没有关联的资源。',
  DELETE_SERVICE_DESC: '您即将删除服务 {resource}。请确认是否同时删除关联资源？',
  DELETE_SERVICE_DESC_PL:
    '您即将删除服务 {resource}。<br/>请确认是否同时删除以下与服务关联的资源？',
  DELETE_SERVICE_DESC_SI:
    '您即将删除服务 {resource}。<br/>请确认是否同时删除以下与服务关联的资源？',
  DELETE_SERVICE: '删除服务',
  DELETE_MULTIPLE_SERVICES: '批量删除服务',
  // Service Topology
  SERVICE_TOPOLOGY: '服务拓扑',
  AUTO_REFRESH: '自动刷新',
  POD_COUNT_VALUE: '容器组数量：{value}',
};
