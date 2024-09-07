/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  PROJECT_DESC: '將根據項目資源進行分組，可以按項目對資源進行查看管理',
  SYSTEM_PROJECTS: '系統項目',
  USER_PROJECTS: '用戶項目',
  // List
  EMPTY_WRAPPER: '未發現{resource}',
  TERMINATING: '刪除中',
  ACTIVE: '活耀',
  // List > Assign Workspace
  PROJECT_ADMINISTRATOR: '項目管理員',
  PROJECT_ADMINISTRATOR_DESC: '選擇企業空間的用戶作為管理員。',
  PROJECT_ASSIGN_DESC: '項目一旦被分配到企業空間後將不允許修改企業空間',
  // List > Create
  CREATE_PROJECT_DESC:
    'KubeSphere 中的項目對應的是 Kubernetes 的 namespace，是對一組資源和對象的抽象集合，常用來將系統内部的對象劃分為不同的項目組或用戶組。',
  PROJECT_NAME_DESC:
    '最長 63 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母開頭, 字母或數字結尾',
  PROJECT_NAME_INVALID_DESC:
    '最長 63 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母開頭, 字母或數字結尾',
  CANCEL: '取消',
  CREATE_NAME: '創建{name}',
  DESCRIPTION: '描述資訊',
  NAME_VALIDATION_FAILED: '避免使用前綴為 kube- 的名稱，因為它是為 Kubernetes 系統命名空間保留的',
  PROJECT_NAME_EXIST_DESC:
    'The name already exists. Please enter another name. Project names must be unique on the entire platform.',
  NAME_EMPTY_DESC: '請輸入名稱。',
  OK: '確定',
  NAME_DESC:
    '最長 63 個字元，只能包含小寫字母、數字及分隔符號("-")，且必須以小寫字母或數字開頭及結尾',
  DESCRIPTION_DESC: '描述資訊不超過 256 個字元',
  ALIAS_DESC: '别名可以由任意字元组成，幫助您更好的區分資源，最長 63 個字元。',
  // List > Edit Information
  EDIT_INFORMATION: '編輯資訊',
  // List > Delete
  DELETE_TITLE_SI: '{type} 刪除確認？',
  DELETE_TITLE_PL: '{type} 刪除確認？',
  DELETE: '刪除',
  PROJECT_LOW: '項目',
  DELETED_SUCCESSFULLY: 'Deleted successfully.',
  STOP_SUCCESS_DESC: '停止成功。',
  DELETE_RESOURCE_TYPE_DESC_SI:
    '請輸入 {type} 名稱 <strong>{resource}</strong> 確保您已了解操作所帶來的風險。',
  DELETE_RESOURCE_TYPE_DESC_PL:
    '請輸入 {type} 名稱 <strong>{resource}</strong> 確保您已了解操作所帶來的風險。',
  DELETE_RESOURCE_TYPE_DESC_GW:
    '請輸入 {type} 名稱 <strong>{resource}</strong> 確保您已了解操作所帶來的風險。',
};
