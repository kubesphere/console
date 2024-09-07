/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { apiVersion } from '../monitoring';

type ApiParams = {
  cluster?: string;
};

export const resourceName = 'node';
export const getApi = ({}: ApiParams) => `${apiVersion({})}/node_metrics`;
