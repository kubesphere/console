/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  HOST_CLUSTER: 'Host cluster',
  MEMBER_CLUSTER: 'Member cluster',
  // Baisc Information
  PROVIDER: 'Provider',
  KUBERNETES_VERSION: 'Kubernetes version',
  KUBESPHERE_VERSION: 'KubeSphere version',
  VISIBILITY_PARTIAL: 'Visible to Some Workspaces',
  VISIBILITY_PUBLIC: 'Visible to All Workspaces',
  CLUSTER_BASE_INFO_DESC:
    'Basic information provides an overview of the cluster. You can view and edit cluster information.',
  // System Components
  // Resource Usage
  MEMORY: 'Memory',
  TOTAL: 'Total',
  USED: 'Used',
  // Tools
  TOOLS: 'Tools',
  KUBECTL_DESC: 'Command line tool used to control the current cluster.',
  KUBECONFIG_DESC: 'File used to configure the access information about the current cluster.',
  // Kubernetes Status
  KUBERNETES_STATUS: 'Kubernetes Status',
  API_REQUESTS_PER_SECOND: 'API requests per second',
  VALUE_REQUESTS_SECOND: '1 request/s',
  VALUE_REQUESTS_SECOND_PL: '{value} requests/s',
  API_REQUEST_LATENCY: 'API request latency',
  SCHEDULING_OPERATIONS: 'Scheduling operations',
  SCHEDULING_OPERATION: 'Scheduling operation',
  SCHEDULING_FAILURES: 'Scheduling failures',
  SCHEDULING_FAILURE: 'Scheduling failure',
  // Nodes
  VIEW_MORE: 'View More',
  NODE_CPU_UTILISATION: 'CPU usage',
  NODE_LOAD1: 'Average CPU load (1 min)',
  NODE_MEMORY_UTILISATION: 'Memory usage',
  NODE_DISK_SIZE_UTILISATION: 'Disk usage',
  NODE_DISK_INODE_UTILISATION: 'Inode usage',
  NODE_POD_UTILISATION: 'Pod usage',
  // Cluster Initializing
  WAIT_FOR_CLUSTER: 'Waiting for the cluster to join...',
  WAIT_FOR_CLUSTER_DESC:
    'The cluster is unavailable. Perform the following steps to add the cluster.',
  CLUSTER_AGENT_TIP_1:
    '1. Log in to the cluster over SSH and run the <span class="code">vi agent.yaml</span> command to create a configuration file.',
  CLUSTER_AGENT_TIP_2:
    '2. Copy the following information to the <span class="code">agent.yaml</span> file.',
  CLUSTER_AGENT_TIP_3:
    '3. Run the <span class="code">kubectl create -f agent.yaml</span> command to add the cluster.',
  CLUSTER_AGENT_TIP_3_DESC:
    'This operation may take a while. Please wait until the cluster status is updated.',
  CREATING_CLUSTER: 'Creating the cluster...',
  CREATING_CLUSTER_DESC: 'The cluster is being created and is currently unavailable.',
  CLUSTER_INIT_FAILED: 'Cluster initialization failed.',
  CLUSTER_CREATION_PROGRESS: 'Cluster Creation Progress',
  FETCHING_LOGS: 'Fetching logs...',
  CURRENT_STEP: 'Current step: {step}',
  CLUSTER_CREATION_PROGRESS_TIP:
    'Depending on the cluster size and infrastructure environment, cluster creation may take 30 to 60 minutes.',
};
