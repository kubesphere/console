/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import baseStore from '../store';
import ObjectMapper from '../../utils/object.mapper';
import { useState } from 'react';
import { Constants } from '../../constants';
import { getCurrentRevision } from '../../utils/workloads';
import { joinSelector, request } from '../../utils';

const MODULE_KIND_MAP: Record<string, string> = Constants.MODULE_KIND_MAP;

const revisionStore = ({ module }: { module: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<Record<string, any>[]>([]);
  const [detail, setDetail] = useState<Record<string, any>>();
  const [workloadDetail, setWorkloadDetail] = useState<Record<string, any>>();
  const [currentRevision, setCurrentRevision] = useState<Number>(0);

  const mapper = ObjectMapper[module];
  const BaseStore = baseStore({
    module,
    mapper: mapper,
  });
  const { getPath } = BaseStore;

  const getDetailUrl = ({
    name,
    cluster,
    namespace,
    revision,
  }: {
    name: string;
    cluster: string;
    namespace: string;
    revision: string;
  }) =>
    `kapis/resources.kubesphere.io/v1alpha2${getPath({
      cluster,
      namespace,
    })}/${module}/${name}/revisions/${revision}`;

  const fetchDetail = async ({
    name,
    cluster,
    namespace,
    revision,
  }: {
    name: string;
    cluster: string;
    namespace: string;
    revision: string;
  }) => {
    setIsLoading(true);

    const result = await request.get(getDetailUrl({ name, cluster, namespace, revision }));
    const mappedDetail = ObjectMapper.revision(result);

    setDetail(mappedDetail);
    setIsLoading(false);
  };

  const fetchList = async ({
    name,
    cluster,
    namespace,
    selector,
  }: {
    name: string;
    cluster: string;
    namespace: string;
    selector: string;
  }) => {
    setIsLoading(true);

    const labelSelector = joinSelector(selector);
    const prefix =
      module === 'deployments'
        ? `apis/apps/v1${getPath({ cluster, namespace })}/replicasets`
        : `apis/apps/v1${getPath({
            cluster,
            namespace,
          })}/controllerrevisions`;
    const result: Record<string, any> = await request.get(
      `${prefix}?labelSelector=${labelSelector}`,
    );
    const items: Record<string, any>[] = result.items;
    const data: any = items
      .map(ObjectMapper.revisions)
      .filter(
        (revision: any) =>
          revision.ownerName === name && revision.ownerKind === MODULE_KIND_MAP[module],
      );
    setList(data);
    setIsLoading(false);
    return data;
  };

  const fetchWorkloadDetail = async ({
    name,
    cluster,
    namespace,
  }: {
    name: string;
    cluster: string;
    namespace: string;
  }) => {
    const result = await request.get(
      `apis/apps/v1${getPath({ cluster, namespace })}/${module}/${name}`,
    );
    const mappedResult = ObjectMapper.revisions(result);
    setWorkloadDetail(mappedResult);
  };

  const fetchCurrentRevision = async (workload: {
    [key: string]: string;
    name: string;
    cluster: string;
    namespace: string;
    selector: string;
  }) => {
    await fetchList(workload);

    const version = getCurrentRevision({
      workloadDetail: workload,
      revisions: list,
      module: module,
    });
    setCurrentRevision(version);
  };

  return {
    ...BaseStore,
    list,
    isLoading,
    detail,
    getDetailUrl,
    workloadDetail,
    currentRevision,
    fetchList,
    fetchDetail,
    fetchWorkloadDetail,
    fetchCurrentRevision,
  };
};

export default revisionStore;
