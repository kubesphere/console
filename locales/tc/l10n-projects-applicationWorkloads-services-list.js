/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  SERVICE_TYPES_Q: '服務的類型',
  SERVICE_TYPES_A:
    '服務分為無狀態服務 (Virtual Service + Depolyment) 及有狀態服務 (Headless Service +Statefulset), 無狀態服務中多個副本可以共享一個儲存卷、有狀態服務需要擁有自己獨立的儲存卷',
  SCENARIOS_FOR_SERVICES_Q: '無狀態服務和有狀態服務的使用場景?',
  SCENARIOS_FOR_SERVICES_A:
    '無狀態服務適用於不需要數據持久化的場景，並且多個實例對統一請求的響應式相同的場景(例如 Nginx、Tomcat 等)；有狀態服務適用於需要數據儲存功能的服務、或者指多線程類型的服務，列隊等 (mysql 資料庫、kafka、zookeeper 等)。',
  // Service List
  SERVICE_TYPE: '服務類型',
  SERVICE_LIST: '列表',
  SERVICE_TYPE_STATEFULSERVICE: '有狀態服務',
  SERVICE_TYPE_STATELESSSERVICE: '無狀態服務',
  SERVICE_TYPE_EXTERNALSERVICE: '外部服務',
  HEADLESS: 'Headless',
  EXTERNALNAME: 'ExternalName',
  // List > Create
  CREATE_SERVICE_DESC: 'Select a Service creation method.',
  SELECT_SERVICE_TYPE_DESC:
    'Create a stateless or stateful Service, or map a Service to an external Service.',
  SERVICE_FROM_CODE: '通過代碼構建新的服務',
  SERVICE_FROM_ARTIFACT: '通過成品構建新的服務',
  SERVICE_FROM_CODE_DESC: '您可以將已有的代碼通過  Source to Image 的方式構建成鏡像並部署',
  SERVICE_FROM_ARTIFACT_DESC: '您可以將已有成品構建成新的鏡像並完成部署',
  CUSTOMIZE_SERVICE: 'Customize Service',
  CUSTOMIZE_SERVICE_DESC: '您可以通過指定工作負載或者編輯配置 (Yaml) 來創建服務',
  // List > Create > Select Service Type > Stateless Service > Pod Settings > Port Settings
  PORT_INPUT_DESC: 'The port name already exists. Please enter another name.',
  PORT_NAME_DESC:
    'The port name can contain only lowercase letters, numbers, and hyphens (-) and must begin and end with a lowercase letter or number. The maximum length is 63 characters.',
  // List > Create > Select Service Type > Stateful Service
  // List > Create > Select Service Type > External Service
  CREATE_EXTERNAL_SERVICE_DESC: '通過返回 CNAME 和它的值，可以將服務映射到 externalName 字段的内容',
  CREATE_EXTERNAL_SERVICE: 'Create External Service',
  EXTERNAL_SERVICE_ADDRESS_EMPTY_DESC: '請輸入 ExternalName。',
  EXTERNAL_SERVICE_ADDRESS: 'External Service Address',
  EXTERNAL_SERVICE_ADDRESS_DESC: 'Enter the domain name of an external Service.',
  // List > Create > Create Service from Source Code
  JAVA: 'Java',
  NODEJS: 'Node.js',
  PYTHON: 'Python',
  LANGUAGE_TYPE_VALUE: '語言類型：{value}',
  // List > Create > Create Service from Source Code > Java > Basic Information
  // List > Create > Create Service from Source Code > Java > Build Settings
  // List > Create > Create Service from Source Code > Java > Pod Settings
  // List > Create > Create Service from Source Code > Java > Volume Settings
  // List > Create > Create Service from Source Code > Java > Advanced Settings
  // List > Create > Create Service from Source Code > Node.js > Basic Information
  // List > Create > Create Service from Source Code > Node.js > Build Settings
  // List > Create > Create Service from Source Code > Node.js > Pod Settings
  CONTAINER_SETTINGS: '容器設置',
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
  SPECIFY_WORKLOAD_DESC: '通過已有的容器組來創建服務',
  // List > Create > Customize Service > Specify Workload > Service Settings
  // List > Create > Customize Service > Specify Workload > Advanced Settings
  // List > Edit Information
  // List > Edit YAML
  // List > Edit Service
  // List > Edit External Access
  // List > Delete
  NO_RELATED_RESOURCE_FOUND: '沒有關聯的資源',
  NO_SERVICE_RELATED_RESOURCE_DESC: '目前服務下沒有關聯的資源',
  DELETE_SERVICE_DESC:
    'You are about to delete the service(s) {resource}. Please confirm whether to delete the associated resource?',
  DELETE_SERVICE_DESC_PL: '您即將刪除服務 {resource}，請您進行確認是否刪除關聯資源?',
  DELETE_SERVICE_DESC_SI:
    'You are about to delete the service {resource}.<br/>Do you want to also delete the following resource related to the service?',
  DELETE_SERVICE: 'Delete Service',
  DELETE_MULTIPLE_SERVICES: 'Delete Multiple Services',
  // Service Topology
  SERVICE_TOPOLOGY: 'Service Topology',
  AUTO_REFRESH: '自动',
  POD_COUNT_VALUE: 'Pods: {value}',
};
