/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { cloneDeep, get, isUndefined, keyBy, merge, omitBy, set } from 'lodash';

import { getPath } from '../hooks';
import projectStore from './project';
import ServiceStore from './service';
import { getBaseInfo, getOriginData } from '../utils';
import type { FormattedFederateProject, OriginalFederatedProject, PathParams } from '../types';

const { SERVICE_TYPES } = ServiceStore;
const { mapper: namespaceMapper } = projectStore;

const FED_ACTIVE_STATUS_MAP: string[] = [
  'FederatedApplication',
  'FederatedService',
  'FederatedDeployment',
  'FederatedStatfulSet',
  'FederatedVolume',
  'FederatedIngress',
];

const getResourceUrl = ({ workspace, ...params }: PathParams): string => {
  return `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}${getPath(
    params,
  )}/federatednamespaces`;
};

const getListUrl = ({ workspace }: PathParams): string => {
  return `kapis/tenant.kubesphere.io/v1beta1/workspaces/${workspace}/namespaces`;
};

const mapper = (item: OriginalFederatedProject): FormattedFederateProject => {
  const overrides = get(item, 'spec.overrides', []);
  const template = cloneDeep(get(item, 'spec.template', {}));
  const clusters = get(item, 'spec.placement.clusters', []);
  const overrideClusterMap = keyBy(overrides, 'clusterName') as Record<string, any>;
  const clusterTemplates: Record<string, any> = clusters.reduce(
    (acc: Record<string, any>, { name }: any) => {
      const tmp = cloneDeep(template);

      if (overrideClusterMap[name] && overrideClusterMap[name].clusterOverrides) {
        overrideClusterMap[name].clusterOverrides.forEach((cod: any) => {
          const path = cod.path.startsWith('/') ? cod.path.slice(1) : cod.path;
          set(tmp, path.replace(/\//g, '.'), cod.value);
        });
      }

      acc[name] = tmp;

      return acc;
    },
    [{}],
  );
  const type =
    get(template, 'spec.clusterIP') === 'None' ? SERVICE_TYPES.Headless : SERVICE_TYPES.VirtualIP;
  const resourceInfo = omitBy(
    namespaceMapper(merge(template, { metadata: item.metadata })),
    isUndefined,
  );
  const getStatus = () => {
    const deletionTimestamp = get(item, 'metadata.deletionTimestamp');

    if (deletionTimestamp) {
      return 'Deleting';
    }

    if (item.kind && FED_ACTIVE_STATUS_MAP.includes(item.kind)) {
      return 'Running';
    }

    return 'Active';
  };

  return {
    ...resourceInfo,
    ...getBaseInfo(item),
    overrides,
    template,
    clusters,
    clusterTemplates,
    type,
    isFedManaged: true,
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations', {}),
    app: get(item, 'metadata.labels["app.kubernetes.io/name"]'),
    status: getStatus(),
    _originData: getOriginData(item),
  };
};

const store = {
  mapper,
  getResourceUrl,
  getListUrl,
};

export default store;
