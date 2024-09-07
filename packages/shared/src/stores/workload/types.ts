/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { PathParams } from '../../types';

export { PathParams } from '../../types';

export interface SuccessProps {
  onSuccess?: () => void;
}

export interface DeploymentPatchProps {
  params: PathParams;
  data: Record<string, any>;
}

export interface DeleteProps extends PathParams {
  annotations?: Record<string, any>;
}

export interface BatchOptProps extends PathParams {
  data?: Record<string, any>[];
}
