import { OriginData } from '@ks-console/shared';

export interface EditDefaultContainerQuotas {
  detail: OriginData;
  namespace: string;
  visible?: boolean;
  onOk?: (value: OriginData) => void;
  onCancel?: () => void;
  confirmLoading?: boolean;
  supportGpuSelect?: boolean;
  isFederated?: boolean;
  clusters?: string[];
}

export type LimitValueType = string | number | undefined;

export interface LimitValue {
  limit?: {
    cpu?: LimitValueType;
    memory?: LimitValueType;
    [key: string]: LimitValueType;
  };
  request?: {
    cpu?: LimitValueType;
    memory?: LimitValueType;
    [key: string]: LimitValueType;
  };
}

export interface AvailableQuota {
  namespace: LimitValue;
  workspace: LimitValue;
}
