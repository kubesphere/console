/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import {
  ListPage,
  useCommonActions,
  useActionMenu,
  Column,
  formatTime,
  useUrl,
  TableRef,
  networkPolicyStore,
  FormattedNetworkPolicy,
  yaml,
  Avatar,
} from '@ks-console/shared';
import { notify } from '@kubed/components';
import { useDisclosure } from '@kubed/hooks';
import { Link, useParams } from 'react-router-dom';
import { Documentation, Firewall, Pen, Trash } from '@kubed/icons';
import CreatePolicyModal from './CreatePolicyModal';

const NetworkPolicies = () => {
  const { module, usePostMutation } = networkPolicyStore;
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const { getDocsUrl } = useUrl({ module });
  const docUrl = getDocsUrl();
  const tableRef = useRef<TableRef<FormattedNetworkPolicy>>();

  const { isOpen, close, open } = useDisclosure();

  const callback = () => {
    tableRef?.current?.refetch();
  };

  const { mutate: createMutate, isLoading: isCreateLoading } = usePostMutation(
    {
      cluster,
    },
    {
      onSuccess: () => {
        close();
        notify.success(t('CREATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    },
  );

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: networkPolicyStore,
    params: { cluster },
    callback,
  });

  const renderItemActions = useActionMenu<FormattedNetworkPolicy>({
    authKey: module,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Pen />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Pen />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: editYaml,
      },
      {
        key: 'delete',
        icon: <Trash />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !row.isFedManaged,
        onClick: del,
      },
    ],
  });

  const renderTableActions = useActionMenu({
    authKey: module,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'create',
        text: t('CREATE'),
        action: 'create',
        props: {
          color: 'secondary',
          shadow: true,
          className: 'table-button',
        },
        onClick: open,
      },
    ],
  });

  const renderBatchActions = useActionMenu({
    authKey: module,
    params,
    autoSingleButton: true,
    actions: [
      {
        key: 'delete',
        text: t('DELETE'),
        action: 'delete',
        props: {
          color: 'error',
        },
        onClick: () => {
          del(tableRef?.current?.getSelectedFlatRows() || []);
        },
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, record) => {
        return (
          <Avatar
            description={record.description}
            record={record}
            module={module}
            to={`/clusters/${cluster}/projects/${record.namespace}/${module}/${value}`}
          />
        );
      },
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '22%',
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
    },
    {
      title: t('CREATION_TIME_TCAP'),
      field: 'createTime',
      sortable: true,
      canHide: true,
      width: 150,
      render: time => formatTime(time),
    },
    {
      id: 'more',
      title: ' ',
      width: 20,
      render: (value, record) => renderItemActions(record as FormattedNetworkPolicy),
    },
  ];

  const description = (
    <div className="banner-desc">
      {t('NETWORK_POLICY_DESC')}
      <Documentation size={20} />
      <a href={docUrl}>{t('LEARN_MORE')}</a>
    </div>
  );

  const bannerTips = [
    {
      title: t('NETWORK_POLICY_Q'),
      key: 'NETWORK_POLICY_Q',
      children: t('NETWORK_POLICY_A'),
    },
    {
      title: t('NETWORK_POLICY_Q1'),
      key: 'NETWORK_POLICY_Q1',
      children: <div dangerouslySetInnerHTML={{ __html: t('NETWORK_POLICY_A1') }} />,
    },
  ];

  const banner = {
    icon: <Firewall />,
    title: t('NETWORK_POLICY_PL'),
    description: docUrl ? description : t('NETWORK_POLICY_DESC'),
    tips: bannerTips,
  };

  const table = {
    ref: tableRef,
    columns,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  const handleCreate = (value: string) => {
    const data = yaml.load(value);
    createMutate({ data, params: { namespace: data?.metadata?.namespace } });
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={networkPolicyStore} hasNamespaceSelector />
      <CreatePolicyModal
        onOk={handleCreate}
        visible={isOpen}
        onCancel={close}
        isSubmitting={isCreateLoading}
      />
    </>
  );
};

export default NetworkPolicies;
