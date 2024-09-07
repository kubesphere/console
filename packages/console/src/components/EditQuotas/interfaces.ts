/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams } from '@ks-console/shared';

export interface EditQuotasProps {
  visible: boolean;
  onCancel: () => void;
  onOk?: (data: Record<string, any>) => void;
  detail: Record<string, any>;
  title?: string;
  isFederated?: boolean;
  confirmLoading?: boolean;
  initialValues?: Record<string, any>;
  params: PathParams;
}

export interface IAppResourceQuota {
  isFederated?: boolean;
  value?: Record<string, any>;
  defaultValue?: Record<string, any>;
  onChange?: (v: Record<string, any>) => void;
  [key: string]: any;
}
