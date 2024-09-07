/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { KubernetesObjectBase, ObjectMeta, OriginData } from '../index';

type Condition = {
  type: string;
  status: 'True' | 'False';
  lastTransitionTime: string;
  reason: string;
  message: string;
};

type SchemaType = 'string' | 'object' | 'array';

interface BaseSchema {
  type: SchemaType;
  description?: string;
}

type SingleSchema = StringSchema | ArraySchema | ObjectSchema;

interface StringSchema extends BaseSchema {
  type: 'string';
  format?: string;
}

interface ArraySchema extends BaseSchema {
  type: 'array';
  items: SingleSchema;
}

interface ObjectSchema extends BaseSchema {
  type: 'object';
  properties: Record<string, SingleSchema>;
}

export interface OriginalCRD extends KubernetesObjectBase {
  metadata: Required<
    Pick<
      ObjectMeta,
      | 'name'
      | 'uid'
      | 'resourceVersion'
      | 'generation'
      | 'creationTimestamp'
      | 'annotations'
      | 'managedFields'
    >
  >;
  spec: {
    group: string;
    names: Record<string, string>;
    scope: string;
    versions: {
      name: string;
      served: boolean;
      storage: boolean;
      schema: Record<string, SingleSchema>;
      subresources: {};
      additionalPrinterColumns: {
        name: string;
        type: string;
        description: string;
        jsonPath: string;
      }[];
    }[];
    conversion: Record<string, string>;
  };
  status: {
    conditions: Condition[];
    acceptedNames: Record<string, string>;
    storedVersions: string[];
  };
}

export interface FormattedCRD {
  versions: {
    name: string;
    served: boolean;
    storage: boolean;
    schema: Record<string, SingleSchema>;
    subresources: {};
    additionalPrinterColumns: {
      name: string;
      type: string;
      description: string;
      jsonPath: string;
    }[];
  }[];
  uid: string;
  name: string;
  creator: string;
  description: string;
  aliasName: string;
  createTime: string;
  resourceVersion: string;
  isFedManaged: boolean;
  group: string;
  scope: string;
  kind: string;
  latestVersion: string;
  module: string;
  _originData: OriginData<OriginalCRD>;
}
