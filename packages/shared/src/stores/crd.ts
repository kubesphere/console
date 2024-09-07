/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getBaseInfo, getOriginData, getServedVersion } from '../utils/getter';
import { FormattedCRD, OriginalCRD } from '../types';
import baseStore from './store';

const module = 'customresourcedefinitions';

export const mapper = (crd: OriginalCRD): FormattedCRD => {
  const versions = get(crd, 'spec.versions', []);
  return {
    versions,
    ...getBaseInfo(crd),
    group: get(crd, 'spec.group'),
    scope: get(crd, 'spec.scope'),
    kind: get(crd, 'spec.names.kind'),
    latestVersion: getServedVersion(crd),
    module: get(crd, 'status.acceptedNames.plural'),
    _originData: getOriginData(crd),
  };
};

const BaseStore = baseStore({ module, mapper });

export default {
  ...BaseStore,
  module,
  mapper,
};
