/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { ObjectMeta } from './kubernetes';

export interface IAddress {
  ip?: string;
  nodeName?: string;
  targetRef?: {
    kind?: string;
    name?: string;
    namespace?: string;
    resourceVersion?: string;
    uid?: string;
  };
}

export interface IPorts {
  port?: string;
  protocol?: string;
}

export interface ISubsets {
  address?: IAddress[];
  ports?: IPorts[];
}

export interface IOriginalEndPoint {
  apiVersion?: string;
  kind?: string;
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'name'
      | 'uid'
      | 'resourceVersion'
      | 'generation'
      | 'creationTimestamp'
      | 'annotations'
      | 'finalizers'
      | 'managedFields'
    >
  >;
  subsets?: ISubsets[];
}

export interface IFormatEndPoint {
  addresses?: IAddress[];
  ports?: IPorts[];
}
