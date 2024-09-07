/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Loading, TypeSelect } from '@kubed/components';
import { CodeEditor } from '@kubed/code-editor';
import { isEmpty } from 'lodash';

import { useKubeConfigQuery } from '../../../stores/kubeConfig';
import { TerminalWindow } from '../../Terminal/TerminalWindow';
import type { TerminalWindowProps } from '../../Terminal/TerminalWindow';

import { LoadingWrapper, KubeConfigWrapper, TipsWrapper } from './styles';
import { clusterStore } from '../../../stores';
import { FormattedCluster } from '../../../types';
import { Constants } from '../../../constants';
import Icon from '../../../components/Icon';

const { CLUSTER_PROVIDER_ICON } = Constants;

const { fetchGrantedList } = clusterStore;

export interface KubeConfigModalProps
  extends Required<Pick<TerminalWindowProps, 'visible' | 'onCancel'>> {
  params?: {
    cluster?: string;
  };
}

export function KubeConfigModal({ visible, params, onCancel }: KubeConfigModalProps) {
  const [cluster, setCluster] = React.useState(params?.cluster);
  const { data: formattedClusters = [], isLoading: isClusterLoading } = fetchGrantedList(
    { limit: -1 },
    {
      onSuccess: (data: FormattedCluster[]) => {
        if (!isEmpty(data) && !cluster) {
          setCluster(data[0].name);
        }
      },
    },
  );
  const { isLoading, kubeConfig } = useKubeConfigQuery(
    { params: { cluster } },
    {
      enabled: !!cluster,
    },
  );

  const content = isLoading ? (
    <LoadingWrapper>
      <Loading />
    </LoadingWrapper>
  ) : (
    <KubeConfigWrapper>
      <CodeEditor
        mode="yaml"
        value={kubeConfig}
        readOnly
        fileName={`cluster-${cluster}-kubeconfig.yaml`}
        hasUpload={false}
      />
    </KubeConfigWrapper>
  );

  const clusterOptions = formattedClusters.map(formattedCluster => ({
    value: formattedCluster.name,
    label: formattedCluster.name,
    icon: (
      <Icon
        size={40}
        name={CLUSTER_PROVIDER_ICON[formattedCluster.provider ?? ''] || 'kubernetes'}
      />
    ),
    description: formattedCluster.provider,
  }));

  const tips = (
    <div>
      <TypeSelect
        key={isClusterLoading ? 'loading' : 'loaded'}
        options={clusterOptions}
        value={cluster}
        onChange={setCluster}
        searchable
      />
      <TipsWrapper
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: t('KUBECONFIG_TIP') }}
      />
    </div>
  );

  return (
    <TerminalWindow
      content={content}
      tips={tips}
      localStorageKey="kubectl-config"
      visible={visible}
      title="kubeconfig"
      onCancel={onCancel}
    />
  );
}
