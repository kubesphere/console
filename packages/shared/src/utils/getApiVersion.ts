/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { API_VERSIONS } from '../constants/common';
const semver = require('semver');

export function isK8sVersionAbove(target: string, version: string): boolean {
  return semver.gte(version, target);
}

export const getApiVersion = (module?: string, k8sVersion?: string) => {
  if (!module) return '';
  if (!k8sVersion) return API_VERSIONS[module];
  return {
    ...API_VERSIONS,
    horizontalpodautoscalers: isK8sVersionAbove('v1.23.0', k8sVersion)
      ? 'autoscaling/v2'
      : 'autoscaling/v2beta2',
    cronjobs: isK8sVersionAbove('v1.21.0', k8sVersion) ? 'apis/batch/v1' : 'apis/batch/v1beta1',
  }[module];
};
