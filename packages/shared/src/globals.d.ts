/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Emitter } from 'mitt';

interface Globals {
  app?: any;
  config: Record<string, any>;
  ksConfig: {
    k8sVersion: string;
    ksVersion: string;
    multicluster?: any;
  };
  installedExtensions?: any[];
  context: any;
  run: any;
  user: {
    email?: string;
    lang?: string;
    username?: string;
    [key: string]: any;
  };
  manifest?: Record<string, string>;
  clusterRole?: string;
  emitter: Emitter<any>;
}

interface Window {
  globals: Globals;
  t: any;
}

declare var t: any;
declare var globals: Globals;
