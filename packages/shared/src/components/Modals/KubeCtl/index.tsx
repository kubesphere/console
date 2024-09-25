/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState, useMemo } from 'react';
import { Alert } from '@kubed/components';

import { Constants } from '../../../constants';
import { isMultiCluster } from '../../../utils';
import { TerminalWindow } from '../../Terminal/TerminalWindow';
import type { TerminalWindowProps } from '../../Terminal/TerminalWindow';
import Icon from '../../Icon';
import type { TerminalRef } from '../../Terminal';
import { Terminal } from '../../Terminal';
import type { UseKubectlWebSocketUrlQueryOptions } from './hooks';
import { useKubectlWebSocketUrlQuery } from './hooks';
import { TerminalWrapper, Doc, TypeSelectWrapper } from './styles';
import { FormattedCluster } from '../../../types';
import clusterStore from '../../../stores/cluster';

const { fetchGrantedList } = clusterStore;
const { CLUSTER_PROVIDER_ICON } = Constants;

export interface KubectlModalProps
  extends Required<Pick<TerminalWindowProps, 'visible' | 'title' | 'onCancel'>> {
  params?: {
    nodename?: string;
    cluster?: string;
    isEdgeNode?: boolean;
    isClusterQuery?: boolean;
  };
}

export function KubectlModal({ visible, title, params, onCancel }: KubectlModalProps) {
  const nodename = params?.nodename;
  const cluster = params?.cluster;
  const isEdgeNode = params?.isEdgeNode;
  const { isClusterQuery = false } = params ?? {};

  const ref = useRef<TerminalRef>(null);
  const [selectedCluster, setSelectedCluster] = useState(cluster);

  const enableClustersQuery = (!cluster && isMultiCluster() && !isEdgeNode) || isClusterQuery;

  const {
    data: formattedClusters = [],
    isSuccess,
    isLoading = false,
  } = fetchGrantedList(
    { limit: -1 },
    {
      onSuccess: (list: FormattedCluster[]) => {
        const arr = list.filter(({ isReady }) => isReady);
        if (!selectedCluster || arr.findIndex(({ name }) => name === selectedCluster) === -1) {
          setSelectedCluster(arr[0]?.name);
        }
      },
      enable: !!enableClustersQuery,
    },
  ) || {
    data: [],
    isLoading: false,
  };

  // TODO: nodename? isEdgeNode?

  const clusterOptions = useMemo(
    () =>
      formattedClusters
        ?.filter(({ isReady }) => isReady)
        .map(formattedCluster => ({
          value: formattedCluster.name,
          label: formattedCluster.name,
          icon: (
            <Icon
              size={40}
              name={CLUSTER_PROVIDER_ICON[formattedCluster.provider ?? ''] || 'kubernetes'}
            />
          ),
          description: formattedCluster.provider,
        })),
    [formattedClusters],
  );

  const useKubectlWebSocketUrlQueryOptions: UseKubectlWebSocketUrlQueryOptions = useMemo(() => {
    if (nodename) {
      return { nodename, cluster: selectedCluster };
    }

    if (!isMultiCluster()) {
      return {};
    }

    if (!cluster) {
      return {
        cluster: selectedCluster,
        enabled: Boolean(isSuccess) && !isLoading && !!clusterOptions.length,
      };
    }

    return { cluster: selectedCluster };
  }, [nodename, cluster, selectedCluster]);

  const { isFetching, websocketUrl } = useKubectlWebSocketUrlQuery(
    useKubectlWebSocketUrlQueryOptions,
  );

  const terminal = (
    <TerminalWrapper>
      <Terminal ref={ref} isLoading={isFetching} websocketUrl={websocketUrl} />
    </TerminalWrapper>
  );

  const tips = (
    <div>
      {enableClustersQuery && clusterOptions.length > 0 && (
        <TypeSelectWrapper
          options={clusterOptions}
          value={selectedCluster}
          onChange={setSelectedCluster}
          searchable
        />
      )}
      {!isLoading && !clusterOptions?.length && (
        <Alert type="warning">{t('NO_AVAILABLE_CLUSTER')}</Alert>
      )}
      <Doc className="markdown-body" dangerouslySetInnerHTML={{ __html: t('KUBECTL_TIP') }} />
    </div>
  );

  return (
    <TerminalWindow
      content={terminal}
      tips={tips}
      localStorageKey="kubectl-doc"
      onToggleHelpDoc={() => ref.current?.resizeTerminal()}
      visible={visible}
      title={title}
      onCancel={onCancel}
    />
  );
}
