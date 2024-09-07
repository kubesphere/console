/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { isEmpty } from 'lodash';

import { joinSelector } from '@ks-console/shared';

import WorkloadItem from './Item';
import ResourceCard from '../ResourceCard';
import { useBaseK8sList } from '../../store';

import { EmptyTips } from './styles';

type Props = {
  cluster?: string;
  namespace?: string;
  prefix?: string;
  selector?: any;
};

function Workloads({ cluster, namespace, prefix, selector }: Props): JSX.Element {
  const params = useMemo(() => {
    if (!isEmpty(selector)) {
      return {
        cluster,
        namespace,
        labelSelector: joinSelector(selector),
      };
    }

    return {};
  }, [selector]);
  const { data: deployments = [], isLoading: isDeploymentLoading } = useBaseK8sList({
    module: 'deployments',
    params,
    autoFetch: !isEmpty(params),
  });
  const { data: stateFulSets = [], isLoading: isStateFulSetsLoading } = useBaseK8sList({
    module: 'statefulsets',
    params,
    autoFetch: !isEmpty(params),
  });
  const { data: daemonsets = [], isLoading: isDaemonsetsLoading } = useBaseK8sList({
    module: 'daemonsets',
    params,
    autoFetch: !isEmpty(params),
  });
  const isLoading = useMemo(() => {
    return isDeploymentLoading || isStateFulSetsLoading || isDaemonsetsLoading;
  }, [isDeploymentLoading, isStateFulSetsLoading, isDaemonsetsLoading]);
  const workloads = useMemo(() => {
    return deployments.concat(stateFulSets, daemonsets);
  }, [deployments, stateFulSets, daemonsets]);

  return (
    <ResourceCard
      title={t('WORKLOAD_PL')}
      cardLoading={isLoading}
      data={workloads}
      emptyPlaceholder={
        <EmptyTips>{t('NO_AVAILABLE_RESOURCE_VALUE', { resource: t('WORKLOAD') })}</EmptyTips>
      }
      itemRender={item => (
        <WorkloadItem key={`${item.module}-${item.name}`} prefix={prefix} detail={item} />
      )}
    />
  );
}

export default Workloads;
