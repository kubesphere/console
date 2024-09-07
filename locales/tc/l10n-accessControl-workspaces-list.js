/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  WORKSPACE_PL: '企業空間',
  WORKSPACE_DESC:
    '企業空間是一個組織您的項目和 DevOps 項目、管理資源訪問權限以及在團隊内部共享資源等的邏輯單元，可以作為團隊工作的獨立工作空間。',
  // List
  CLUSTER_PL: '集群',
  ALL_CLUSTERS: 'All Clusters',
  // List > Create > Basic Information
  CREATE_WORKSPACE: '創建企業空間',
  WORKSPACE_NAME_EMPTY_DESC: '請輸入企業空間名稱。',
  WORKSPACE_CREATE_DESC: '設置企業空間的基本資訊。',
  ADMINISTRATOR: '管理員',
  WORKSPACE_NAME_EXISTS_DESC: 'The workspace name already exists.',
  INVALID_WORKSPACE_NAME: 'Invalid workspace name.',
  // List > Create > Cluster Settings
  SELECT_CLUSTERS_DESC: '選擇企業空間下可用的集群',
  NO_CLUSTER_AVAILABLE: 'No Cluster Available',
  NO_CLUSTER_AVAILABLE_DESC:
    '暫無可用的公開集群，請在企業空間創建完畢後，向平台管理員或集群管理員申請集群的授權。',
  WORKSPACE_NO_CLUSTER_TIP: '您需要聯繫平台管理員或者集群管理員為企業空間授權集群的訪問權限。',
  AVAILABLE_CLUSTERS: '可用集群',
  CLUSTER_SETTINGS: '集群設置',
  SELECT_HOST_CLUSTER_WARNING:
    '目前系統為多集群系統，請盡量避免在主集群上創建資源。主集群負載過高會導致多集群系統穩定性下降。',
  // List > Edit Information
  // List > Delete
  DELETE_WORKSPACE: '刪除企業空間',
  WORKSPACE_LOW: '企業空間',
};
