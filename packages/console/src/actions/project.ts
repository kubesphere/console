/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, set } from 'lodash';
import { getUseModal } from '../components/useModal';
import { CreateProjectModal } from '../pages/clusters';
import { FormattedNamespace, PathParams, isMultiCluster, quotaStore } from '@ks-console/shared';
import EditQuotas from '../components/EditQuotas';
import EditAnnotationsModal from '../components/EditAnnotations';

const getProjectTemplate = (cluster: string) => ({
  cluster,
  apiVersion: 'v1',
  kind: 'Namespace',
  metadata: {
    labels: {},
  },
});

export const useProjectCreateModal = getUseModal<
  {
    params: PathParams;
  },
  React.ComponentProps<typeof CreateProjectModal>
>({
  key: 'projectCreate',
  op: 'POST',
  component: CreateProjectModal,
  contextAndData2data: ({ params }, data1) => {
    let data = data1 ?? {};
    const { workspace, cluster } = params;
    set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace);
    set(data, 'metadata.labels["kubesphere.io/managed"]', 'true');

    if (get(globals, 'ksConfig.springcloud', false)) {
      set(data, 'metadata.labels["springcloud.kubesphere.io/enabled"]', 'true');
    }

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
  context2props: ({ params }) => {
    const { cluster } = params;
    return {
      hideCluster: !isMultiCluster() || !!cluster,
      initialValues: getProjectTemplate(cluster!),
    };
  },
});

export const useProjectAnnotationsModal = getUseModal<
  {
    params: PathParams;
  },
  React.ComponentProps<typeof EditAnnotationsModal>
>({
  key: 'ProjectAnnotation',
  component: EditAnnotationsModal,
  op: 'PUT',
});

export const useProjectEditQuotasModal = getUseModal<
  { detail: FormattedNamespace; params: PathParams },
  React.ComponentProps<typeof EditQuotas>
>({
  key: 'ProjectEditQuotas',
  component: EditQuotas,
  contextAndData2data: async ({ detail, params }: Record<string, any>, hard: any) => {
    const params1 = {
      name: detail.name,
      namespace: detail.name,
      workspace: params.workspace,
      cluster: params.cluster,
    };
    const resp = await quotaStore.checkName(params1, {});
    console.log(resp, params1);
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
