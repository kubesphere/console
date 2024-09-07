/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export const REQUIRED_VERSION = 'v3.1.0';

export const WORKSPACE_QUOTAS_MAP = {
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
};

export const RESERVED_KEYS = ['limits.cpu', 'limits.memory'];
