/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const RESERVED_MODULES = ['limits.cpu', 'requests.cpu', 'limits.memory', 'requests.memory'];

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

export const FEDERATED_PROJECT_UNSOPPORT_QUOTA = ['daemonsets', 'jobs', 'cronjobs'];
