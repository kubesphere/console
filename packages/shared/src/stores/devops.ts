import { capitalize, get } from 'lodash';

import { getPath } from '../hooks';
import { getBaseInfo, getOriginData } from '../utils';
import type { FormattedDevops, OriginalDevops, PathParams } from '../types';

const getDevopsTenantUrl = (params: PathParams) => {
  return `kapis/devops.kubesphere.io/v1alpha3${getPath(params)}/namespaces`;
};

const mapper = (item: OriginalDevops): FormattedDevops => {
  const phase = get(item, 'status.phase');
  const syncStatusKey = 'metadata.annotations["devopsproject.devops.kubesphere.io/syncstatus"]';
  const syncStatus = capitalize(get(item, syncStatusKey));
  const deletionTimestamp = get(item, 'metadata.deletionTimestamp');

  return {
    ...getBaseInfo(item),
    name: get(item, 'metadata.generateName', ''),
    devops: get(item, 'metadata.name'),
    workspace: get(item, 'metadata.labels["kubesphere.io/workspace"]'),
    namespace: get(item, 'status.adminNamespace'),
    status: deletionTimestamp ? 'Terminating' : phase || syncStatus || 'Active',
    sourceRepos: get(item, 'spec.argo.sourceRepos', []) as unknown[],
    destinations: get(item, 'spec.argo.destinations', []) as unknown[],
    _originData: getOriginData(item),
  };
};

const store = {
  mapper,
  getDevopsTenantUrl,
};

export default store;
