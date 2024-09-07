/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { openpitrixStore, request } from '@ks-console/shared';

const { getBaseUrl } = openpitrixStore;

const resourceName: string = 'reviews';

type HandleParams = {
  appName: string;
  [key: string]: unknown;
};

const handleReview = async ({ appName, ...data }: HandleParams) => {
  const url = getBaseUrl({ appName, name: 'action' }, resourceName);

  await request.post(url, data);
};

export default { handleReview };
