/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getBaseInfo, getOriginData, OriginData } from '../utils';
import { FormattedCRD } from '../types/crd';
import { PathParams } from '../types/globals';
import baseStore from './store';
import { getPath } from '../utils/urlHelper';

export const mapper = (data: OriginData<Record<string, any>>) => ({
  ...getBaseInfo(data),
  namespace: get(data, 'metadata.namespace'),
  spec: get(data, 'spec'),
  _originData: getOriginData(data),
});

const getListUrlFn = ({
  group,
  latestVersion,
  cluster,
  namespace,
  module,
  ksApi,
}: Partial<FormattedCRD> & PathParams) =>
  `${ksApi ? 'kapis' : 'apis'}/${group}/${latestVersion}${getPath({
    cluster,
    namespace,
  })}/${module}`;

const BaseStore = baseStore({
  module: 'customresourcedefinitions',
  mapper,
  getListUrlFn: getListUrlFn as any,
});

export default {
  ...BaseStore,
  module: 'customresourcedefinitions',
  mapper,
};
