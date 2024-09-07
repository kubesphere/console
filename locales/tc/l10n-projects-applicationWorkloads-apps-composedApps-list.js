/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  COMPOSED_APP_PL: '自制應用',
  // List
  NO_COMPOSED_APP_FOUND: 'No Composed App Found',
  COMPOSED_APP_EMPTY_DESC: '通過資源編排的方式發佈服務構建應用(支持應用治理功能)',
  // List > Edit Information
  // List > Delete
  // List > Create
  STATEFUL_SERVICE: '有狀態服務',
  STATELESS_SERVICE: '無狀態服務',
  CREATE_COMPOSED_APP: '構建應用',
  SAVE_FORM_TIP: '請先保存目前表單',
  // List > Create > Edit YAML
  YAML_FILE: 'YAML File',
  CREATE_BY_YAML_DESC: 'Customize the settings in the YAML file.',
  // List > Create > Basic Information
  APPLICATION_GOVERNANCE: '應用治理',
  VERSION_DESC: '最長 16 個字元，只能包含小寫字母及數字',
  APPLICATION_GOVERNANCE_DESC:
    'Enable Application Governace to use the Traffic Monitoring, Grayscale Release, and Tracing features for the app.',
  APP_BASIC_INFORMATION_DESC: 'ˇ對應用的名稱描述資訊等基本的資訊定義',
  // List > Create > Service Settings
  APP_SELECT_SERVICE_TYPE_DESC: 'Create a stateless or stateful Service.',
  STATEFUL_SERVICE_DESC:
    '有狀態服務用來管理有狀態應用，可以保證部署和擴容縮容的順序，提供了穩定的持久化儲存和網路標識，有序伸縮等',
  STATELESS_SERVICE_DESC:
    '容器服務中最常用的一種服務，通過定義容器組模板來控制容器組狀態，包括滾動升級和回滾',
  APPLICATION_SERVICE_DESC:
    '根據應用中服務類型的不同設置不同類型的服務組件，支持無狀態服務和有狀態服務',
  APP_CREATE_SERVICE_DESC: 'Create a service for the app.',
  // List > Create > Ingress Settings
  ROUTE_SETTINGS: 'Route Settings',
  ROUTING_RULES: '路由規則',
  ROUTE_SETTINGS_DESC: '可以設置應用的外網訪問規則 (Ingress)',
  ADD_ROUTE_SUCCESS: 'The route was added successfully.',
};
