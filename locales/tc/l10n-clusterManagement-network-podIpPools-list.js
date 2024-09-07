/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  POD_IP_POOL_PL: '容器組 IP 池',
  POD_IP_POOL_DESC: '容器組 IP 池用於規劃集群內 Pod 的網絡地址空間，您可以按需創建容器組 IP 池。',
  IPPOOL_USAGE_Q: '如何利用 IP 地址範圍規劃容器組網路？',
  IPPOOL_USAGE_A:
    'IP 地址範圍用於規劃 Pod 網路地址空間，每個 IP 地址範圍之間地址空間不能。創建工作負載時，可選擇特定的 IP 地址範圍，這樣創建出的容器組將從該 IP 地址範圍中分配 IP。',
  // List
  POD_IP_POOL_EMPTY_DESC: '請創建一個容器組 IP 池。',
  TOTAL_VALUE: '總共：{value}',
  ALL: '全部',
  NOT_ASSIGNED: '未分配',
  // List > Create
  CREATE_POD_IP_POOL: '創建容器組 IP 池',
  NETWORK_SEGMENT: '網段',
  USED_IP_ADDRESSES: '已用 IP 地址',
  QUANTITY: 'Quantity',
  IP_POOL_CREATE_DESC: '即將創建的容器組 IP 池',
  IP_ADDRESS_EMPTY_DESC: '請輸入 IP 地址。',
  MASK_TIP: '請輸入遮罩。',
  ENTER_NETWORK_SEGMENT_TIP: '請輸入網段。',
  IP_POOL_NUM_TIP: '請輸入需要創建的容器組 IP 地址範圍數量。',
  IP_POOL_CREATE_COUNT_DESC: '可以同時創建多個容器組 IP 地址範圍，數量範圍為 1～10',
  INVALID_IP_DESC: 'IP 地址格式錯誤。',
  // List > Edit Information
  // List > View YAML
  // Assign Workspace
  IPPOOL_ASSIGN_WORKSPACE_DESC: '為 IP 池分配一個企業空間。',
  IPPOOL_ASSIGN_WORKSPACE_ALLOCATED_WARNING: 'IP 地址範圍已被使用，無法分配给某一個具體的企業空間',
  IPPOOL_ASSIGN_WORKSPACE_CHANGE_WARNING:
    'IP 地址範圍已被使用，且已指定具體的企業空間，無法更改目標企業空間',
  ASSIGN_WORKSPACE: '分配企業空間',
  SELECT_WORKSPACE_DESC: '選擇一個企業空間',
  // List > Delete
  POD_IP_POOL_LOW: '容器組 IP 池',
};
