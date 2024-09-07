/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { request, urlHelper } from '../utils';

const { getPath } = urlHelper;

const OpenELBStore = () => {
  const apiVersion = 'apis/network.kubesphere.io/v1alpha1';

  const isActive = async ({ clusters, namespace }: { clusters: string[]; namespace?: string }) => {
    const req: any[] = [];
    clusters.forEach((cluster: string) => {
      req.push(
        request.get(`${apiVersion}${getPath({ cluster, namespace })}/bgpconfs`, {
          headers: {
            'x-ignore-error-notify': 'true',
          },
        }),
      );
    });

    const res = await Promise.all(req);
    return res.every(item => !!item);
  };

  return {
    isActive,
  };
};

export default OpenELBStore();
