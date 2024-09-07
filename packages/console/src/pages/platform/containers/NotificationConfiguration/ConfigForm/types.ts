/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { BaseInfo, OriginData } from '@ks-console/shared';

export type BaseTemplateParam = {
  name: string;
};

export type VerifyTemplateParam = {
  user?: string;
};

export type ReceiverTemplateParam = BaseTemplateParam & { type: string };

export type BaseTemplate = {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    [key: string]: unknown;
  };
  spec?: Record<string, unknown>;
  type?: string;
};

export type FormNameMapType = {
  configName: string;
  receiverName: string;
  secretName: string;
};

export type FormStatus = 'create' | 'update';

export type ConfigFormData = {
  config: BaseTemplate;
  secret: BaseTemplate;
  receiver: BaseTemplate;
};

export type ConfigFormsStore = {
  formData: ConfigFormData;
  formStatus?: FormStatus;
};

export type ConfigurationResponse = {
  data: ConfigFormData;
  status?: FormStatus;
};

export type SubmitHandlerMapType = {
  [key: string]: (data: ConfigFormData) => Promise<void>;
};

export type VerifyFn = (data: ConfigFormData) => boolean;

export type TemplateMapper = (data: ConfigFormData) => Partial<ConfigFormData>;

export type MapperResult<T> = BaseInfo & {
  labels: Record<string, unknown>;
  annotations: Record<string, unknown>;
  type: string;
  data: Record<string, unknown>;
  _originData: T;
  namespace?: unknown;
};

export type MapperFn = (item: ItemType) => MapperResult<OriginData<ItemType>>;

export type DefaultMapper = (item: ItemType) => ItemType;

export type ItemType = any;
