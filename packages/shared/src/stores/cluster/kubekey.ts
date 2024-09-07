/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import BaseStore from '../base';
import type { FormattedKubeKey } from '../../types';
import { request, parser, getBaseInfo, getOriginData } from '../../utils';

const module = 'clusters';

const formatKKCluster = (item: any): FormattedKubeKey => {
  return {
    ...getBaseInfo(item),
    status: get(item, 'status', {}),
    labels: get(item, 'metadata.labels'),
    _originData: getOriginData(item),
  };
};

function KKClusterFn({ ...res }) {
  const fetchParameters = async () => {
    const result = await request.get(
      `api/v1/namespaces/kubekey-system/configmaps/kubekey-parameters`,
    );

    return parser.safeParseJSON(get(result, "data['parameters.json']", ''), {});
  };

  return {
    ...res,
    module,
    formatKKCluster,
    fetchParameters,
  };
}

export const kubekeyClusterStore = BaseStore<FormattedKubeKey>({
  module,
  apiVersion: 'apis/kubekey.kubesphere.io/v1alpha1',
  mapper: formatKKCluster,
  storeFn: KKClusterFn,
});
