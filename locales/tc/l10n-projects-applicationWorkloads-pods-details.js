/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Attributes
  QOS_CLASS: 'QoS Class',
  NODE_NAME: '主機名稱',
  POD_IP_ADDRESS: '容器組 IP 地址',
  // Run Records
  JOB_UNFINISHED: 'Unfinished',
  // Resource Status
  TERMINATED: 'Terminated',
  // Scheduling Information
  SCHEDULED_TO_NODE: '調度至 {value}',
  SCHEDULING_NOT_SUCCESSFUL: 'Scheduling Not Successful',
  SCHEDULING_INFORMATION: '調度資訊',
  SCHEDULING_RESULT: '節點調度資訊',
  POD_SCHEDULING_METHOD: '容器組如何被調度至節點?',
  POD_ASSIGNED_DESC:
    '根據容器組中容器設置的請求值 (即 Request) 作為容器調度時資源分配的判斷依據。只有節點上可分配總量 ≥ 容器請求值時，才允許將容器調度到該節點。',
  STATUS_INFORMATION: '狀態分析(Conditions)',
  WORKLOAD_CONDITION_AVAILABLE: '可用性(Available)',
  WORKLOAD_CONDITION_PROGRESSING: '創建進度(Progressing)',
  NOT_SUCCESSFUL: 'Not successful',
  CURRENT_STATUS: '目前階段(phase)',
  POD_CONDITION_INITIALIZED: 'Initialized',
  POD_CONDITION_INITIALIZED_DESC: '所有 init 容器都已成功啟動',
  POD_CONDITION_READY: '開始運行(Ready)',
  POD_CONDITION_READY_DESC: '容器組已經開始運行，並可以通過服務進行訪問',
  POD_CONDITION_CONTAINERSREADY: '容器準備就緒(ContainersReady)',
  POD_CONDITION_CONTAINERSREADY_DESC: '容器組内容器準備就緒.',
  POD_CONDITION_PODSCHEDULED: '調度成功(PodScheduled)',
  POD_CONDITION_PODSCHEDULED_DESC: '容器組已經被安排到一個節點中',
};
