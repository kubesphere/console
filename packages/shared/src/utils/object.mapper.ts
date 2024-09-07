/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';
import { getBaseInfo, getOriginData } from '../utils';
import { WorkLoadMapper, JobMapper, CronJobMapper } from '../stores/workload/mapper';

const RevisionMapper = (item: Record<string, any>) => {
  const spec = get(item, 'data.spec', get(item, 'spec', {}));

  return {
    spec,
    ...getBaseInfo(item),
    ownerKind: get(item, 'metadata.ownerReferences[0].kind', ''),
    ownerName: get(item, 'metadata.ownerReferences[0].name', ''),
    namespace: get(item, 'metadata.namespace'),
    labels: get(item, 'metadata.labels', {}),
    annotations: get(item, 'metadata.annotations'),
    revision:
      Number(
        get(item, 'metadata.annotations["deployment.kubernetes.io/revision"]', item.revision),
      ) || null,
    status: get(item, 'status'),
    podNums: get(spec, 'replicas'),
    selector: get(spec, 'selector.matchLabels'),
    containers: get(spec, 'template.spec.containers'),
    initContainers: get(spec, 'template.spec.initContainers'),
    volumes: get(spec, 'template.spec.volumes'),
    strategy: get(spec, 'strategy', {}),
    updateStrategy: get(spec, 'updateStrategy.type'),
    _originData: getOriginData(item),
  };
};

const ObjectMapper: Record<string, any> = {
  deployments: WorkLoadMapper,
  statefulsets: WorkLoadMapper,
  daemonsets: WorkLoadMapper,
  jobs: JobMapper,
  cronjobs: CronJobMapper,
  revisions: RevisionMapper,
};

export default ObjectMapper;
