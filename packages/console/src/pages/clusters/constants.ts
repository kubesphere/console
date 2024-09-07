/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const PROTOCOLS = [
  { label: 'GRPC', value: 'GRPC' },
  { label: 'HTTP', value: 'HTTP' },
  { label: 'HTTP2', value: 'HTTP2' },
  { label: 'HTTPS', value: 'HTTPS' },
  { label: 'MONGO', value: 'MONGO' },
  { label: 'REDIS', value: 'REDIS' },
  { label: 'TCP', value: 'TCP' },
  { label: 'TLS', value: 'TLS' },
  { label: 'UDP', value: 'UDP' },
];

export const JOB_STATUS_MAP: Record<string, any> = {
  completed: 'JOB_COMPLETED',
  unfinished: 'JOB_UNFINISHED',
  running: 'JOB_RUNNING',
  failed: 'JOB_FAILED',
  paused: 'CRONJOB_PAUSED',
};

export const IMPORT_CLUSTER_SPEC = {
  apiVersion: 'cluster.kubesphere.io/v1alpha1',
  kind: 'Cluster',
  spec: {
    provider: '',
    connection: {
      type: 'direct',
      kubeconfig: '',
    },
    joinFederation: true,
  },
};
