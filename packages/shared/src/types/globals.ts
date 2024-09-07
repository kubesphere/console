/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

export type GlobalMessage = {
  status: number;
  reason: string;
  message?: string;
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
