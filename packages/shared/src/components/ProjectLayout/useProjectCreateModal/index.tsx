/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, set } from 'lodash';
import { getUseModal } from '../useModal';
import CreateProjectModal from '../CreateProjectModal';
import { isMultiCluster } from '../../../utils';
import type { PathParams } from '../../../types';

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
  React.ComponentProps<any>
>({
  key: 'projectCreate',
  op: 'POST',
  component: CreateProjectModal,
  contextAndData2data: ({ params }, data1) => {
    let data = data1 ?? {};
    const { workspace, cluster } = params;
    set(data, 'metadata.labels["kubesphere.io/workspace"]', workspace);
    set(data, 'metadata.labels["kubesphere.io/managed"]', 'true');

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
