/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const API_VERSIONS: Record<string, string> = {
  nodes: 'api/v1',
  users: 'apis/iam.kubesphere.io/v1beta1',
  components: 'kapis/resources.kubesphere.io/v1alpha2',
  namespace: 'api/v1',
  namespaces: 'api/v1',
  globalroles: 'apis/iam.kubesphere.io/v1beta1',
  clusters: 'apis/cluster.kubesphere.io/v1alpha1',
  customresourcedefinitions: 'apis/apiextensions.k8s.io/v1',
  secrets: 'api/v1',
  configmaps: 'api/v1',
  serviceaccounts: 'api/v1',
  services: 'api/v1',
  pods: 'api/v1',
  gateways: 'kapis/gateway.kubesphere.io/v1alpha1',
  persistentvolumeclaims: 'api/v1',
  persistentvolumes: 'api/v1',
  storageclasses: 'apis/storage.k8s.io/v1',
  volumesnapshots: 'apis/snapshot.storage.k8s.io/v1',
  volumesnapshotclasses: 'apis/snapshot.storage.k8s.io/v1beta1',
  volumesnapshotcontents: 'apis/snapshot.storage.k8s.io/v1',
  networkpolicies: 'apis/networking.k8s.io/v1',
  deployments: 'apis/apps/v1',
  statefulsets: 'apis/apps/v1',
  daemonsets: 'apis/apps/v1',
  jobs: 'apis/batch/v1',
  cronjobs: 'apis/batch/v1beta1',
  ippools: 'apis/network.kubesphere.io/v1alpha1',
  ingresses: 'apis/networking.k8s.io/v1',
  validatingwebhookconfigurations: '/apis/admissionregistration.k8s.io/v1',
  horizontalpodautoscalers: 'apis/autoscaling/v2beta2',
  licenses: 'kapis/license.kubesphere.io/v1alpha1',
  resourcequotas: 'api/v1',
  limitranges: 'api/v1',
};

export const MODULE_KIND_MAP: { [key: string]: string } = {
  deployments: 'Deployment',
  statefulsets: 'StatefulSet',
  daemonsets: 'DaemonSet',
  jobs: 'Job',
  cronjobs: 'CronJob',
  pods: 'Pod',
  services: 'Service',
  ingresses: 'Ingress',
  persistentvolumeclaims: 'PersistentVolumeClaim',
  persistentvolumes: 'PersistentVolumes',
  storageclasses: 'StorageClass',
  'alert-policies': 'AlertingPolicy',
  configmaps: 'ConfigMap',
  serviceaccounts: 'ServiceAccount',
  secrets: 'Secret',
  s2ibuilders: 'S2iBuilder',
  nodes: 'Node',
  volumesnapshots: 'VolumeSnapshot',
  volumesnapshotclass: 'VolumeSnapshotClass',
  namespaces: 'Namespace',
  workspaces: 'WorkspaceTemplate',
  clusters: 'Cluster',
  dashboards: 'Dashboard',
  clusterdashboards: 'ClusterDashboard',
  applications: 'Application',
  users: 'User',
  devops: 'DevOpsProject',
  pipelines: 'Pipelines',
  ippools: 'IPPool',
  groups: 'Group',
  volumes: 'Volumes',
  hpas: 'HPA',
  extensions: 'Extension',
  installplans: 'InstallPlan',
};

export const ICON_TYPES: Record<string, string> = {
  deployments: 'backup',
  statefulsets: 'stateful-set',
  daemonsets: 'deamon-set',
  jobs: 'backup',
  cronjobs: 'backup',
  services: 'appcenter',
  ingresses: 'loadbalancer',
  routes: 'loadbalancer',
  applications: 'application',
  app_templates: 'documentation',
  repos: 'catalog',
  images: 'cdn',
  registries: 'cdn',
  volumes: 'storage',
  persistentvolumeclaims: 'storage',
  storageclasses: 'database',
  nodes: 'nodes',
  edgenodes: 'nodes',
  devops: 'strategy-group',
  projects: 'project',
  namespaces: 'project',
  users: 'human',
  roles: 'role',
  members: 'group',
  globalroles: 'role',
  clusterroles: 'role',
  workspaceroles: 'role',
  components: 'components',
  accounts: 'human',
  workspaces: 'enterprise',
  clusters: 'cluster',
  pods: 'pod',
  containers: 'container',
  'limits.cpu': 'cpu',
  'limits.memory': 'memory',
  'requests.cpu': 'cpu',
  'requests.memory': 'memory',
  configmaps: 'hammer',
  serviceaccounts: 'client',
  secrets: 'key',
  'alert-messages': 'loudspeaker',
  'alert-policies': 'wrench',
  apiserver: 'api',
  etcd: 'etcd',
  scheduler: 'scheduler',
  s2ibuilders: 'vnas',
  apps: 'appcenter',
  'volume-snapshots': 'snapshot',
  'volume-snapshot-content': 'snapshot',
  customresourcedefinitions: 'select',
  network: 'eip-group',
  networkpolicies: 'firewall',
  namespacenetworkpolicies: 'firewall',
  pipelines: 'blockchain',
  ippools: 'eip-group',
  cluster: 'cluster',
  notification: 'loudspeaker',
  notificationhistory: 'record',
  gpu: 'gpu',
  'gpu.limit': 'gpu',
  microservices: 'java',
  configurations: 'hammer',
  microservicegateways: 'springcloudgateway',
  gatewayrouteconfigs: 'loadbalancer',
  cds: 'rocket',
  codeRepos: 'code',
  allowlists: 'allowlist',
  'notification-language': 'earth',
  'silent-policy': 'volume_off_duotone',
};

export const COMPONENT_ICON_MAP: Record<string, string> = {
  kubernetes: 'kubernetes',
  kubesphere: 'kubesphere',
  istio: 'istio',
  openpitrix: 'openpitrix',
  devops: 'jenkins',
  logging: 'record',
  monitoring: 'monitor',
  alerting: 'loudspeaker',
  auditing: 'login-servers',
  events: 'thunder',
  notification: 'mail',
  servicemesh: 'istio',
  metrics_server: 'monitor',
};

export const CLUSTER_PROVIDER_ICON: Record<string, string> = {
  'Aliyun ACK': 'aliyun',
  'Azure Kubernetes Service': 'windows',
  'Huawei Cloud CCE': 'kubernetes',
  'Amazon EKS': 'aws',
  'Google Kubernetes Engine': 'google-plus',
  'QingCloud Kubernetes Engine': 'qingcloud',
  'Tencent Kubernetes Engine': 'kubernetes',
  kubesphere: 'kubernetes',
};

export const CLUSTER_PROVIDERS = [
  {
    label: 'Alibaba Cloud ACK',
    value: 'Aliyun ACK',
    icon: 'aliyun',
  },
  {
    label: 'Azure Kubernetes Service',
    value: 'Aure Kubernetes Service',
    icon: 'windows',
  },
  {
    label: 'Huawei Cloud CCE',
    value: 'Huawei Cloud CCE',
    icon: 'kubernetes',
  },
  {
    label: 'Amazon EKS',
    value: 'Amazon EKS',
    icon: 'aws',
  },
  {
    label: 'Google Kubernetes Engine',
    value: 'Google Kubernetes Engine',
    icon: 'google-plus',
  },
  {
    label: 'QingCloud Kubernetes Engine',
    value: 'QingCloud Kubernetes Engine',
    icon: 'qingcloud',
  },
  {
    label: 'Tencent Kubernetes Engine',
    value: 'Tencent Kubernetes Engine',
    icon: 'kubernetes',
  },
];

export const CLUSTER_PRESET_GROUPS = [
  {
    label: 'production',
    value: 'production',
  },
  {
    label: 'development',
    value: 'development',
  },
  {
    label: 'testing',
    value: 'testing',
  },
  {
    label: 'demo',
    value: 'demo',
  },
];

export const CLUSTER_GROUP_TAG_TYPE: Record<string, string> = {
  production: 'warning',
  development: 'default',
  testing: 'info',
  demo: 'success',
};

export const DEFAULT_CLUSTER = {
  apiVersion: 'cluster.kubesphere.io/v1alpha1',
  kind: 'Cluster',
  metadata: {
    annotations: {
      'cluster.kubesphere.io/is-host-cluster': 'true',
    },
    labels: {
      'cluster.kubesphere.io/visibility': 'public',
    },
    name: globals?.config?.defaultClusterName || 'default',
  },
};

export const LIST_DEFAULT_ORDER: Record<string, string> = {
  deployments: 'updateTime',
  jobs: 'updateTime',
  pods: 'startTime',
  notificationhistory: 'notificationTime',
};

export const VOLUME_STATUS = [
  { text: 'VOLUME_STATUS_BOUND', value: 'bound' },
  { text: 'VOLUME_STATUS_LOST', value: 'lost' },
  { text: 'VOLUME_STATUS_PENDING', value: 'pending' },
];

export const ACCESS_MODE_MAPPER: { [key: string]: string } = {
  ReadWriteOnce: 'RWO',
  ReadOnlyMany: 'ROX',
  ReadWriteMany: 'RWX',
};

export const PV_STATUS = [
  { text: 'PV_STATUS_AVAILABLE', value: 'available' },
  { text: 'PV_STATUS_BOUND', value: 'bound' },
  { text: 'PV_STATUS_RELEASED', value: 'released' },
  { text: 'PV_STATUS_FAILED', value: 'failed' },
];

export const VOLUME_SNAPSHOT_STATUS = [
  { text: 'VOLUME_SNAPSHOT_STATUS_CREATING', value: 'creating' },
  { text: 'VOLUME_SNAPSHOT_STATUS_READY', value: 'ready' },
  { text: 'VOLUME_SNAPSHOT_STATUS_DELETING', value: 'deleting' },
];

export const VOLUME_SNAPSHOT_CLASS_STATUS = [
  { text: 'READY', value: 'true' },
  { text: 'UNREADY', value: 'false' },
];

export const QUOTAS_MAP = {
  'limits.cpu': {
    name: 'limits.cpu',
    placeholder: 'eg: 1 or 1000m',
  },
  'requests.cpu': {
    name: 'requests.cpu',
    placeholder: 'eg: 1 or 1000m',
  },
  'limits.memory': {
    name: 'limits.memory',
    placeholder: 'eg: 100Gi',
  },
  'requests.memory': {
    name: 'requests.memory',
    placeholder: 'eg: 100Gi',
  },
  pods: {
    name: 'count/pods',
    placeholder: 'eg: 100',
  },
  deployments: {
    name: 'count/deployments.apps',
    placeholder: 'eg: 100',
  },
  statefulsets: {
    name: 'count/statefulsets.apps',
    placeholder: 'eg: 100',
  },
  daemonsets: {
    name: 'count/daemonsets.apps',
    placeholder: 'eg: 100',
  },
  jobs: {
    name: 'count/jobs.batch',
    placeholder: 'eg: 100',
  },
  cronjobs: {
    name: 'count/cronjobs.batch',
    placeholder: 'eg: 100',
  },
  volumes: {
    name: 'persistentvolumeclaims',
    placeholder: 'eg: 100',
  },
  services: {
    name: 'count/services',
    placeholder: 'eg: 100',
  },
  routes: {
    name: 'count/ingresses.extensions',
    placeholder: 'eg: 100',
  },
  secrets: {
    name: 'count/secrets',
    placeholder: 'eg: 100',
  },
  configmaps: {
    name: 'count/configmaps',
    placeholder: 'eg: 100',
  },
};

export const NODE_CONDITION_ICONS: Record<string, string> = {
  Ready: 'templet',
  OutOfDisk: 'storage',
  PIDPressure: 'pie-chart',
  MemoryPressure: 'memory',
  DiskPressure: 'storage',
  NetworkUnavailable: 'earth',
  ConfigOK: 'record',
  KubeletReady: 'cluster',
};

export const STATUS_TO_ICON: Record<string, string> = {
  submitted: 'review',
  'in-review': 'review',
  rejected: 'suspended',
  active: 'passed',
};

export const STATUS_TRANSFER_MAP: Record<string, string> = {
  active: 'active',
  suspended: 'suspended',
  suspend: 'suspending',
  submitted: 'submitted',
  passed: 'passed',
  draft: 'draft',
  rejected: 'rejected',
};

export const APP_VERSION_STATUS_MAP: Record<string, string> = {
  active: 'active',
  suspended: 'suspended',
};

export const RADON_DB_APP_ID_MAP: Record<string, string> = {
  ClickHouse: 'app-clickhouse',
  PostgreSQL: 'app-postgresql',
  MySQL: 'app-mysql',
};

export const CAN_DELETE_STATUS: string[] = ['draft', 'rejected', 'passed', 'suspended'];

export const ACTION_TO_NAME: Record<string, string> = {
  submit: 'SUBMIT_FOR_REVIEW',
  cancel: 'CANCEL_SUBMISSION',
  release: 'RELEASE',
  view: 'VIEW_IN_STORE',
  suspend: 'APP_VERSION_SUSPENDED',
  recover: 'APP_VERSION_RELEASE',
};

export const STATUS_TO_ACTION: Record<string, string> = {
  draft: 'submit',
  submitted: 'cancel',
  rejected: 'submit',
  passed: 'release',
  active: 'view',
};

export const STATUS_TO_ACTION_ADMIN: Record<string, string> = {
  active: 'suspend',
  suspended: 'recover',
};

export const SCREENSHOTS_LIMIT = 6;

export const UPLOAD_FILE_TYPES: Record<string, string[]> = {
  package: ['application/x-gzip', 'application/x-tar'],
  icon: ['image/png', 'image/jpg', 'image/jpeg'],
  screenshot: ['image/png', 'image/jpg', 'image/jpeg'],
};

export const UPLOAD_STATUS_WORD: Record<string, string> = {
  init: 'HELM_CHART_FORMAT_DESC',
  uploading: 'UPLOADING',
  success: 'UPLOAD_SUCCESSFUL',
};

export const UPLOAD_CHECK_RULES: Record<string, Record<string, any>> = {
  package: {
    format: /\.(tgz|tar\.gz)$/,
    size: 2 * 1024 * 1024,
  },
  icon: {
    format: /\.(png|jpg|jpeg)$/,
    size: 512 * 1024,
  },
  screenshots: {
    format: /\.(png|jpg|jpeg)$/,
    size: 2 * 1024 * 1024,
  },
};

export const CAN_EDIT_STATUS = ['draft', 'rejected'];

export const UN_CATE_KEY = 'ctg-uncategorized';

export const INGRESS_ANNOTATIONS = [
  'nginx.ingress.kubernetes.io/app-root',
  'nginx.ingress.kubernetes.io/affinity',
  'nginx.ingress.kubernetes.io/auth-realm',
  'nginx.ingress.kubernetes.io/auth-secret',
  'nginx.ingress.kubernetes.io/auth-type',
  'nginx.ingress.kubernetes.io/auth-tls-secret',
  'nginx.ingress.kubernetes.io/auth-tls-verify-depth',
  'nginx.ingress.kubernetes.io/auth-tls-verify-client',
  'nginx.ingress.kubernetes.io/auth-tls-error-page',
  'nginx.ingress.kubernetes.io/auth-tls-pass-certificate-to-upstream',
  'nginx.ingress.kubernetes.io/auth-url',
  'nginx.ingress.kubernetes.io/auth-snippet',
  'nginx.ingress.kubernetes.io/enable-global-auth',
  'nginx.ingress.kubernetes.io/backend-protocol',
  'nginx.ingress.kubernetes.io/canary',
  'nginx.ingress.kubernetes.io/canary-by-header',
  'nginx.ingress.kubernetes.io/canary-by-header-value',
  'nginx.ingress.kubernetes.io/canary-by-cookie',
  'nginx.ingress.kubernetes.io/canary-weight',
  'nginx.ingress.kubernetes.io/client-body-buffer-size',
  'nginx.ingress.kubernetes.io/configuration-snippet',
  'nginx.ingress.kubernetes.io/custom-http-errors',
  'nginx.ingress.kubernetes.io/default-backend',
  'nginx.ingress.kubernetes.io/enable-cors',
  'nginx.ingress.kubernetes.io/cors-allow-origin',
  'nginx.ingress.kubernetes.io/cors-allow-methods',
  'nginx.ingress.kubernetes.io/cors-allow-headers',
  'nginx.ingress.kubernetes.io/cors-allow-credentials',
  'nginx.ingress.kubernetes.io/cors-max-age',
  'nginx.ingress.kubernetes.io/force-ssl-redirect',
  'nginx.ingress.kubernetes.io/from-to-www-redirect',
  'nginx.ingress.kubernetes.io/http2-push-preload',
  'nginx.ingress.kubernetes.io/limit-connections',
  'nginx.ingress.kubernetes.io/limit-rps',
  'nginx.ingress.kubernetes.io/permanent-redirect',
  'nginx.ingress.kubernetes.io/permanent-redirect-code',
  'nginx.ingress.kubernetes.io/temporal-redirect',
  'nginx.ingress.kubernetes.io/proxy-body-size',
  'nginx.ingress.kubernetes.io/proxy-cookie-domain',
  'nginx.ingress.kubernetes.io/proxy-cookie-path',
  'nginx.ingress.kubernetes.io/proxy-connect-timeout',
  'nginx.ingress.kubernetes.io/proxy-send-timeout',
  'nginx.ingress.kubernetes.io/proxy-read-timeout',
  'nginx.ingress.kubernetes.io/proxy-next-upstream',
  'nginx.ingress.kubernetes.io/proxy-next-upstream-timeout',
  'nginx.ingress.kubernetes.io/proxy-next-upstream-tries',
  'nginx.ingress.kubernetes.io/proxy-request-buffering',
  'nginx.ingress.kubernetes.io/proxy-redirect-from',
  'nginx.ingress.kubernetes.io/proxy-redirect-to',
  'nginx.ingress.kubernetes.io/enable-rewrite-log',
  'nginx.ingress.kubernetes.io/rewrite-target',
  'nginx.ingress.kubernetes.io/satisfy',
  'nginx.ingress.kubernetes.io/secure-verify-ca-secret',
  'nginx.ingress.kubernetes.io/server-alias',
  'nginx.ingress.kubernetes.io/server-snippet',
  'nginx.ingress.kubernetes.io/service-upstream',
  'nginx.ingress.kubernetes.io/session-cookie-name',
  'nginx.ingress.kubernetes.io/session-cookie-path',
  'nginx.ingress.kubernetes.io/ssl-redirect',
  'nginx.ingress.kubernetes.io/ssl-passthrough',
  'nginx.ingress.kubernetes.io/upstream-hash-by',
  'nginx.ingress.kubernetes.io/x-forwarded-prefix',
  'nginx.ingress.kubernetes.io/load-balance',
  'nginx.ingress.kubernetes.io/upstream-vhost',
  'nginx.ingress.kubernetes.io/whitelist-source-range',
  'nginx.ingress.kubernetes.io/proxy-buffering',
  'nginx.ingress.kubernetes.io/proxy-buffers-number',
  'nginx.ingress.kubernetes.io/proxy-buffer-size',
  'nginx.ingress.kubernetes.io/ssl-ciphers',
  'nginx.ingress.kubernetes.io/connection-proxy-header',
  'nginx.ingress.kubernetes.io/enable-access-log',
  'nginx.ingress.kubernetes.io/lua-resty-waf',
  'nginx.ingress.kubernetes.io/lua-resty-waf-debug',
  'nginx.ingress.kubernetes.io/lua-resty-waf-ignore-rulesets',
  'nginx.ingress.kubernetes.io/lua-resty-waf-extra-rules',
  'nginx.ingress.kubernetes.io/lua-resty-waf-allow-unknown-content-types',
  'nginx.ingress.kubernetes.io/lua-resty-waf-score-threshold',
  'nginx.ingress.kubernetes.io/lua-resty-waf-process-multipart-body',
  'nginx.ingress.kubernetes.io/enable-influxdb',
  'nginx.ingress.kubernetes.io/influxdb-measurement',
  'nginx.ingress.kubernetes.io/influxdb-port',
  'nginx.ingress.kubernetes.io/influxdb-host',
  'nginx.ingress.kubernetes.io/influxdb-server-name',
  'nginx.ingress.kubernetes.io/use-regex',
  'nginx.ingress.kubernetes.io/enable-modsecurity',
  'nginx.ingress.kubernetes.io/enable-owasp-core-rules',
  'nginx.ingress.kubernetes.io/modsecurity-transaction-id',
  'nginx.ingress.kubernetes.io/modsecurity-snippet',
];

export const COLORS_MAP = {
  white: '#fff',
  light: '#f9fbfd',
  lightest: '#f9fbfd',
  dark: '#242e42',
  grey: '#e3e9ef',
  green: '#55bc8a',
  blue: '#329dce',
  red: '#ca2621',
  yellow: '#f5a623',
  darkerGreen: '#479e88',
  darkerBlue: '#3385b0',
  darkerRed: '#ab2f29',
  darkerYellow: '#e0992c',
  darkestGreen: '#3b747a',
  darkestBlue: '#326e93',
  darkestRed: '#8c3231',
  darkestYellow: '#8d663e',
  lighterGreen: '#a2d8bb',
  lighterBlue: '#7eb8dc',
  lighterRed: '#ea8573',
  lighterYellow: '#ffc781',
  lightestGreen: '#c4e6d4',
  lightestBlue: '#c7deef',
  lightestRed: '#fae7e5',
  lightestYellow: '#ffe1be',
  darkGray: '#79879C',
};
