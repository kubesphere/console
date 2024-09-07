/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';
import {
  StatusIndicator,
  DetailPagee,
  nodeStore,
  formatTime,
  getDisplayName,
  getNodeStatus,
  getNodeRoles,
  FormattedNode,
  hasClusterModule,
} from '@ks-console/shared';
import { Nodes, Start, Stop, Wrench, Pen } from '@kubed/icons';
import { Loading, notify } from '@kubed/components';
import { useCacheStore as useStore } from '@ks-console/shared';
import { authKey, MASTER_ROLE } from '../contants';
import { TaintSingleModal } from '../TaintModal/TaintSingleModal';
import ObjectEditModal from '../ObjectEdit';

const { nodeCordon, nodeUncordon, useGetMutation, useLabelMutation, useBatchPatchTaints } =
  nodeStore;

const PATH = '/clusters/:cluster/nodes/:name';

function NodeDetail() {
  const { cluster, name } = useParams();
  const [taintVisible, setTaintVisible] = useState<boolean>(false);
  const [labelVisible, setLabelVisible] = useState<boolean>(false);
  const {
    data: detail = {} as FormattedNode,
    refetch,
    isLoading,
    isError,
  } = useGetMutation({ name, cluster });

  const [, setDetailProps] = useStore('detailProps', detail);

  useEffect(() => {
    setDetailProps(detail);
  }, [detail]);

  const tabs =
    cluster && hasClusterModule(cluster, 'whizard-monitoring')
      ? [
          { path: `${PATH}/status`, title: t('RUNNING_STATUS') },
          { path: `${PATH}/pods`, title: t('PODS') },
          { path: `${PATH}/metadata`, title: t('METADATA') },
          { path: `${PATH}/monitors`, title: t('MONITORING') },
          { path: `${PATH}/events`, title: t('EVENT_PL') },
        ]
      : [
          { path: `${PATH}/status`, title: t('RUNNING_STATUS') },
          { path: `${PATH}/pods`, title: t('PODS') },
          { path: `${PATH}/metadata`, title: t('METADATA') },
          { path: `${PATH}/events`, title: t('EVENT_PL') },
        ];

  const status = useMemo(() => {
    const statusStr = getNodeStatus(detail);
    return (
      <StatusIndicator type={statusStr}>
        {t(`NODE_STATUS_${statusStr.toUpperCase()}`)}
      </StatusIndicator>
    );
  }, [detail]);

  const { mutate: mutateNodesTaint, isLoading: isNodesTaintLoading } = useBatchPatchTaints({
    onSuccess: () => {
      refetch();
      notify.success(t('UPDATE_SUCCESSFUL'));
      setTaintVisible(false);
    },
  });

  const { mutate: mutateNodesLabel, isLoading: isNodesLabelLoading } = useLabelMutation({
    detail,
    onSuccess: () => {
      refetch();
      setLabelVisible(false);
      notify.success(t('UPDATE_SUCCESSFUL'));
    },
  });

  const attrs = () => {
    const nodeInfo = detail.nodeInfo || {};
    return [
      {
        label: t('STATUS'),
        value: status,
      },
      {
        label: t('IP_ADDRESS'),
        value: detail ? get(detail, 'status.addresses[0].address', '-') : '',
      },
      {
        label: t('ROLE'),
        value: !getNodeRoles(detail.labels)?.some((role: string) => MASTER_ROLE.includes(role))
          ? t('WORKER')
          : t('CONTROL_PLANE'),
      },
      {
        label: t('OS_VERSION'),
        value: nodeInfo.osImage || '',
      },
      {
        label: t('OS_TYPE'),
        value: nodeInfo.operatingSystem ? t(nodeInfo.operatingSystem.toUpperCase()) : '',
      },
      {
        label: t('KERNEL_VERSION'),
        value: nodeInfo.kernelVersion || '',
      },
      {
        label: t('CONTAINER_RUNTIME'),
        value: nodeInfo.containerRuntimeVersion || '',
      },
      {
        label: t('KUBELET_VERSION'),
        value: nodeInfo.kubeletVersion || '',
      },
      {
        label: t('KUBE_PROXY_VERSION'),
        value: nodeInfo.kubeProxyVersion || '',
      },
      {
        label: t('ARCHITECTURE'),
        value: nodeInfo.architecture ? nodeInfo.architecture.toUpperCase() : '',
      },
      {
        label: t('CREATION_TIME_TCAP'),
        value: detail?.createTime ? formatTime(detail?.createTime) : '',
      },
    ];
  };

  const getOperations = () => {
    const { unschedulable } = detail;
    return [
      {
        key: 'cordon',
        icon: unschedulable ? <Start /> : <Stop />,
        text: unschedulable ? t('UNCORDON') : t('CORDON'),
        action: 'edit',
        props: { color: unschedulable ? 'secondary' : 'error' },
        onClick: () => {
          if (unschedulable) {
            nodeUncordon(detail).then(() => refetch?.());
          } else {
            nodeCordon(detail).then(() => refetch?.());
          }
        },
      },
      {
        key: 'eidtLabel',
        icon: <Pen />,
        text: t('EDIT_LABELS'),
        action: 'edit',
        onClick: () => {
          setLabelVisible(true);
        },
      },
      {
        key: 'taintManagement',
        icon: <Wrench />,
        text: t('EDIT_TAINTS'),
        action: 'edit',
        onClick: () => {
          setTaintVisible(true);
        },
      },
    ];
  };

  return isLoading || isError ? (
    <Loading className="page-loading" />
  ) : (
    <>
      <DetailPagee
        tabs={tabs}
        cardProps={{
          params: { cluster, name },
          name: getDisplayName<FormattedNode>(detail),
          authKey,
          actions: getOperations(),
          attrs: attrs(),
          icon: <Nodes size={28} />,
          breadcrumbs: {
            label: t('CLUSTER_NODE_PL'),
            url: `/clusters/${cluster}/nodes`,
          },
          desc: detail?.description,
        }}
      />
      {taintVisible && (
        <TaintSingleModal
          visible={taintVisible}
          detail={detail}
          onOk={mutateNodesTaint}
          onCancel={() => setTaintVisible(false)}
          confirmLoading={isNodesTaintLoading}
        />
      )}
      {labelVisible && (
        <ObjectEditModal
          title={t('LABEL_PL')}
          visible={labelVisible}
          detail={detail}
          onOk={mutateNodesLabel}
          onCancel={() => setLabelVisible(false)}
          confirmLoading={isNodesLabelLoading}
        />
      )}
    </>
  );
}
export default NodeDetail;
