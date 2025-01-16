/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty } from 'lodash';

import { useUrl } from '../hooks';
import { getOriginData, parser, getBaseInfo, request } from '../utils';
import type { PathParams, FormattedRole, OriginalRole } from '../types';
import baseStore from './store';

function mapper(item: OriginalRole): FormattedRole {
  return {
    ...getBaseInfo<OriginalRole>(item),
    labels: get(item, 'metadata.labels', {}) as FormattedRole['labels'],
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations', {}) as FormattedRole['annotations'],
    dependencies: parser.safeParseJSON(
      get(item, 'metadata.annotations["iam.kubesphere.io/dependencies"]', ''),
      [],
    ) as string[],
    roleTemplates: get(item, 'aggregationRoleTemplates.templateNames', []),
    rules: get(item, 'rules'),
    _originData: getOriginData<OriginalRole>(item),
  };
}

const store = (module = 'roles') => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getPath } = useUrl({ module });

  const apiVersion = 'kapis/iam.kubesphere.io/v1beta1';

  function getResourceUrlFn(params?: PathParams) {
    return `${apiVersion}${getPath(params)}/${module}`;
  }

  const checkIfIsPresetRole = (name: string) => {
    if (module === 'roles') {
      return isEmpty(globals.config?.presetRoles) && globals.config?.presetRoles.includes(name);
    }

    return (
      isEmpty(globals.config?.presetClusterRoles) &&
      globals.config?.presetClusterRoles.includes(name)
    );
  };

  const getTemplatesCategory = async (categoryModule: string) => {
    let labelSelector = `iam.kubesphere.io/scope=${categoryModule},kubesphere.io/managed=true`;
    const categoryUrl = `${apiVersion}/categories`;

    const res = <any>await request.get(categoryUrl, {
      params: {
        labelSelector: labelSelector,
      },
    });

    let data = [];
    if (Array.isArray(res.items)) {
      data = res.items.map((item: Record<string, any>) => {
        return {
          name: get(item, 'metadata.name'),
          displayName: get(item, 'spec.displayName'),
        };
      });
    }
    return data;
  };

  const getTemplates = async (tempModule: string, isEdit = false, labelSelector?: string) => {
    const res = <any>await request.get(`${apiVersion}/roletemplates`, {
      params: {
        labelSelector:
          labelSelector ||
          `iam.kubesphere.io/scope=${tempModule},kubesphere.io/managed=true${
            isEdit ? ',iam.kubesphere.io/hidden-role-template!=true' : ''
          }`,
      },
    });
    return res?.items?.map((item: OriginalRole) => mapper(item));
  };

  const BaseStore = baseStore<FormattedRole>({
    module,
    mapper: (item: OriginalRole) => mapper(item),
    getResourceUrlFn,
    getListUrlFn: getResourceUrlFn,
  });

  return {
    ...BaseStore,
    checkIfIsPresetRole,
    module,
    mapper,
    getTemplatesCategory,
    getTemplates,
  };
};

export default store;
