/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { AxiosResponse } from 'axios';

export type GlobalMessage = {
  status: number;
  reason: string;
  message?: string;
  response?: AxiosResponse;
};

export type PathParams = {
  cluster?: string;
  namespace?: string;
  apiVersion?: string;
  module?: string;
  dryRun?: boolean;
  name?: string;
  workspace?: string;
  devops?: string;
  labelSelector?: string;
  appName?: string;
  versionID?: string;
  annotation?: string;
  ksApi?: boolean;
};
