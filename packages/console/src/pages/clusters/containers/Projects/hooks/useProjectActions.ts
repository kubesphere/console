/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { getLimitsRequestEndsWithDot } from '@ks-console/shared';
import { cloneDeep, get, isEmpty, set, unset } from 'lodash';
import { getUseModalAction } from '../../../../../components/useModal/useBaseModal';
import quotaStore from '../../../stores/quota';

export const useProjectEditBase = getUseModalAction({
  op: 'UPDATE',
});

export const useProjectDelete = getUseModalAction({
  op: 'DELETE',
  getVariablesByContext: ({ params, names }: Record<string, any>) => ({
    params,
    data: names,
  }),
});

export const useProjectAnnotations = getUseModalAction({
  op: 'PUT',
});

export const useProjectModify = useProjectEditBase;

export const useProjectCreate = getUseModalAction({
  op: 'POST',
  getVariablesByContext: ({ params }, data1) => {
    let data = data1 ?? {};
    const { workspace, cluster } = params;
    set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace);
    const selectCluster = get(data, 'cluster') ?? cluster;
    const params1 = {
      cluster: selectCluster,
      workspace,
    };
    return {
      params: params1,
      data,
    };
  },
});

const getLimitRangeTemplate = () => ({
  apiVersion: 'v1',
  kind: 'LimitRange',
  metadata: {},
  spec: {
    limits: [
      {
        default: {
          cpu: '500m',
          memory: '500Mi',
        },
        defaultRequest: {
          cpu: '10m',
          memory: '10Mi',
        },
        type: 'Container',
      },
    ],
  },
});

const getFederatedTemplate = ({
  data,
  clusters,
  kind,
}: {
  data: any;
  clusters: string[];
  kind: string;
}) => {
  const namespace = get(data, 'metadata.namespace');

  const placement = { clusters: clusters.map(item => ({ name: item })) };

  const overrides = clusters.map(cluster => {
    const override = {
      clusterName: cluster,
      clusterOverrides: [],
    };

    return override;
  });

  const template = cloneDeep(data);

  unset(template, 'apiVersion');
  unset(template, 'kind');
  unset(template, 'metadata.name');
  unset(template, 'metadata.annotations');

  return {
    apiVersion: 'types.kubefed.io/v1beta1',
    kind: `Federated${kind}`,
    metadata: { namespace },
    spec: { placement, template, overrides },
  };
};

export const useProjectEditDefaultQuotas = getUseModalAction({
  getVariablesByContext: (
    { detail, params: { namespace, cluster }, isFederated, projectDetail }: Record<string, any>,
    data: Record<string, any> = {},
  ) => {
    const { limits, requests } = getLimitsRequestEndsWithDot({
      limits: data.default,
      requests: data.defaultRequest || {},
    });
    data.default = { ...data.default, ...limits };
    data.defaultRequest = { ...data.defaultRequest, ...requests };
    if (isEmpty(detail)) {
      let formTemplate: Record<string, any> = getLimitRangeTemplate();

      if (isFederated) {
        formTemplate = getFederatedTemplate({
          data: getLimitRangeTemplate(),
          clusters: projectDetail.clusters.map((item: { name: string }) => item.name),
          kind: 'LimitRange',
        });
        set(formTemplate, 'metadata.name', namespace);
        set(formTemplate, 'spec.template.spec', {
          limits: [{ ...data, type: 'Container' }],
        });
      } else {
        set(formTemplate, 'spec', {
          limits: [{ ...data, type: 'Container' }],
        });
      }
      return {
        op: 'POST',
        params: { cluster, namespace },
        data: formTemplate,
      };
    } else {
      const formTemplate = {
        ...detail._originData,
      };

      if (isFederated) {
        set(formTemplate, 'spec.template.spec', {
          limits: [{ ...detail.limit, ...data }],
        });
      } else {
        set(formTemplate, 'spec', {
          limits: [{ ...detail.limit, ...data }],
        });
      }
      set(formTemplate, 'metadata.resourceVersion', detail.resourceVersion);

      return {
        op: 'PUT',
        params: { ...detail, cluster, namespace },
        data: formTemplate,
      };
    }
  },
});

export const useProjectQuotas = getUseModalAction({
  getVariablesByContext: async ({ detail }: Record<string, any>, hard: any) => {
    const params1 = {
      name: detail.name,
      namespace: detail.name,
      cluster: detail.cluster,
    };
    const resp = await quotaStore.checkName(params1, {});

    if (resp.exist) {
      return {
        op: 'PUT',
        data: {
          apiVersion: 'v1',
          kind: 'ResourceQuota',
          metadata: { ...params1, name: detail.name },
          spec: { hard },
        },
        params: params1,
      };
    } else {
      return {
        op: 'POST',
        data: {
          apiVersion: 'v1',
          kind: 'ResourceQuota',
          metadata: { ...params1, name: detail.name },
          spec: { hard },
        },
        params: params1,
      };
    }
  },
});
