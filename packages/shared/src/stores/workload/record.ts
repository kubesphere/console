/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get, isEmpty } from 'lodash';
import baseStore from '../store';
import { JobMapper } from './mapper';
import { request, joinSelector } from '../../utils';
import type { OriginalJob, PathParams } from '../../types';

const recordStore = () => {
  const module = 'jobs';
  const BaseStore = baseStore({
    module,
    mapper: JobMapper,
  });
  const { getPath } = BaseStore;

  const fetchListByK8s = async ({
    cluster,
    namespace,
    selector,
    ...params
  }: Record<string, any>) => {
    if (!isEmpty(selector)) {
      params.labelSelector = joinSelector(selector);
    }

    const result: Record<string, any> = await request.get(
      `apis/batch/v1${getPath({ cluster, namespace })}/${module}`,
      { params },
    );
    console.log(result);
    const data = result.items || [];

    return data.map(JobMapper);
  };

  const fetchStepListByK8s = async ({
    cluster,
    namespace,
    selector,
    ...params
  }: Record<string, any>) => {
    if (!isEmpty(selector)) {
      params.labelSelector = joinSelector(selector);
    }

    const result: Record<string, any> = await request.get(
      `apis/batch/v1${getPath({ cluster, namespace })}/${module}`,
      { params },
    );
    const data = result.items || [];

    return { data: data.map(JobMapper), _originData: result };
  };

  const fetchExecuteRecords = async (params: PathParams) => {
    const result = await request.get<any, OriginalJob, any>(
      `apis/batch/v1${getPath(params)}/${module}/${params.name}`,
    );
    const detail = JobMapper(result);

    let data: Record<string, any>[] = [];
    try {
      const records: Record<string, any> = JSON.parse(get(detail, 'annotations.revisions', ''));
      data = Object.entries(records).map(([key, value]) => ({
        ...value,
        id: key,
      }));
    } catch (e) {}

    return data;
  };

  return {
    ...BaseStore,
    fetchListByK8s,
    fetchStepListByK8s,
    fetchExecuteRecords,
  };
};

export default recordStore();
