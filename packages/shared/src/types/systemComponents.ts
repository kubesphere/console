/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export type ComponentType = 'kubesphere' | 'kubernetes';

export type SystemComponent = {
  name: string;
  namespace: string;
  selfLink: string;
  label: {
    app: string;
    tier: string;
  };
  startedAt: string;
  totalBackends: number;
  healthyBackends: number;
};
