/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import baseStore from './store';
import type { FormattedSecret, OriginalSecret } from '../types';
import { request, getOriginData, getBaseInfo, safeAtob, parser } from '../utils';

const module = 'secrets';

const secretDataParser = (data: OriginalSecret) => {
  if (data.type === 'kubernetes.io/basic-auth') {
    return Object.entries(get(data, 'data', {})).reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: safeAtob(value) === 'undefined' ? '' : safeAtob(value),
      }),
      {},
    );
  }

  return Object.entries(get(data, 'data', {})).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [key]:
        key === '.dockerconfigjson' ? parser.safeParseJSON(safeAtob(value), {}) : safeAtob(value),
    }),
    {},
  );
};

const mapper = (item: OriginalSecret): FormattedSecret => {
  return {
    ...getBaseInfo<OriginalSecret>(item),
    type: get(item, 'type', ''),
    data: secretDataParser(item),
    labels: get(item, 'metadata.labels', {}) as FormattedSecret['labels'],
    namespace: get(item, 'metadata.namespace'),
    annotations: get(item, 'metadata.annotations', {}) as FormattedSecret['annotations'],
    _originData: getOriginData<OriginalSecret>(item, {
      ownerReferences: true, // ??? fixed: console/pull/3262
    }),
  };
};

const { getPath, ...BaseStore } = baseStore<FormattedSecret>({ module, mapper });

const validateImageRegistrySecret = async ({
  fedFormTemplate,
  cluster,
  namespace,
  name,
}: any): Promise<any> => {
  const url = ` kapis/resources.kubesphere.io/v1alpha3${getPath({
    namespace,
    cluster,
  })}/registrysecrets/${name}/verify`;
  const result = {
    validate: true,
    reason: '',
  };

  await request
    .post(url, fedFormTemplate, { headers: { 'x-ignore-error-notify': 'true' } })
    .then()
    .catch((err: any) => {
      const msg = get(err, 'response.data', '');
      if (msg) {
        result.reason = t(msg);
      }
      result.validate = false;
    });

  return result;
};

const store = {
  getPath,
  ...BaseStore,
  module,
  mapper,
  validateImageRegistrySecret,
};

export default store;
