/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, OriginData } from '../utils';
import { ObjectMeta } from '.';

interface InvolvedObject {
  kind: string;
  namespace: string;
  name: string;
  uid: string;
  apiVersion: string;
  resourceVersion: string;
}

export interface ItemsData {
  metadata: ObjectMeta;
  involvedObject: InvolvedObject;
  reason: string;
  message: string;
  source: Record<string, any>;
  firstTimestamp: string;
  lastTimestamp: string | number;
  count: number;
  type: string;
  eventTime?: any;
  reportingComponent: string;
  reportingInstance: string;
}
export interface IEventData {
  kind: string;
  apiVersion: string;
  metadata: {
    resourceVersion: '1045769';
  };
  items: ItemsData[];
}

export interface IEventDetail extends BaseInfo {
  reason?: string;
  message?: string;
  from?: string;
  lastTimestamp: string | number;
  type?: string;
  annotations?: Record<string, unknown>;
  workspace?: string;
  status?: unknown;
  age: string;
  _originData: OriginData<any>;
}
