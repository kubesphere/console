/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams } from '@ks-console/shared';

export type ApplicationPathParams = PathParams & { cluster_id?: string; zone?: string };

export type DeleteParams = {
  zone: string;
  cluster_id: string;
  workspace?: string;
  cluster?: string;
};

type AppVersion = {
  app_id: string;
  name: string;
  version_id: string;
};

type AppDetail = {
  app_id: string;
  category_set: unknown;
  chart_name: string;
  name: string;
};

type ClusterDetail = {
  name: string;
  additional_info: string;
  app_id: string;
  cluster_id: string;
  create_time: string;
  env: string;
  runtime_id: string;
  status: string;
  status_time: string;
  version_id: string;
  zone: string;
};

export type OPAppDetail = {
  name: string;
  version: AppVersion;
  app: AppDetail;
  selector: {
    'app.kubesphere.io/instance': string;
  };
  status: string;
  cluster?: string;
  workspace?: string;
} & ClusterDetail;

export type OPAppItem = {
  name: string;
  version: AppVersion;
  app: AppDetail;
  cluster: ClusterDetail;
};

export type OPAppsResponse = { items: OPAppItem[]; totalItems: number };
