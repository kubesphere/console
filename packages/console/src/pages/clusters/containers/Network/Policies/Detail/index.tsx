/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  formatTime,
  DetailPage,
  DetailPageRef,
  useCommonActions,
  networkPolicyStore,
  FormattedNetworkPolicy,
} from '@ks-console/shared';
import { Pen, Trash } from '@kubed/icons';

const PATH = '/clusters/:cluster/projects/:namespace/networkpolicies/:name';

const { module } = networkPolicyStore;

export default function NetworkPolicyDetail() {
  const { cluster, name, namespace } = useParams();
  const navigate = useNavigate();
  const ref = useRef<DetailPageRef<FormattedNetworkPolicy>>(null);

  const attrs = (data: FormattedNetworkPolicy) => [
    { label: t('CLUSTER_PL'), value: cluster ? cluster : '' },
    { label: t('PROJECT_PL'), value: data?.namespace },
    {
      label: t('CREATION_TIME_TCAP'),
      value: data?.createTime ? formatTime(data?.createTime) : '',
    },
    {
      label: t('CREATOR'),
      value: data?.creator || '',
    },
  ];

  const tabs = [
    { path: `${PATH}/egress`, title: t('EGRESS_RULES') },
    { path: `${PATH}/ingress`, title: t('INGRESS_RULES') },
  ];

  const callback = (type: string) => {
    if (type === 'editBaseInfo' || type === 'editYaml') {
      ref.current?.refetch();
    } else {
      navigate(`/clusters/${cluster}/networkpolicies`);
    }
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: networkPolicyStore,
    params: { cluster, name, namespace },
    callback,
  });

  const actions = [
    {
      key: 'edit',
      text: t('EDIT_INFORMATION'),
      action: 'edit',
      show: true,
      onClick: editBaseInfo,
    },
    {
      key: 'editYaml',
      icon: <Pen />,
      text: t('EDIT_YAML'),
      action: 'edit',
      show: true,
      onClick: editYaml,
    },
    {
      key: 'delete',
      icon: <Trash />,
      text: t('DELETE'),
      action: 'delete',
      type: 'danger',
      show: true,
      onClick: del,
    },
  ];

  return (
    <DetailPage
      ref={ref}
      tabs={tabs}
      store={networkPolicyStore}
      authKey={module}
      sideProps={{
        actions,
        attrs,
        breadcrumbs: {
          label: t('NETWORK_POLICY_PL'),
          url: `/clusters/${cluster}/networkpolicies`,
        },
      }}
    />
  );
}
