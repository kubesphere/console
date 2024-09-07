/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useRef } from 'react';
import { merge } from 'lodash';
import { useDisclosure } from '@kubed/hooks';
import { Field, notify } from '@kubed/components';
import { useParams, Link } from 'react-router-dom';

import {
  Icon,
  Column,
  TableRef,
  ListPage,
  formatTime,
  useActionMenu,
  getDisplayName,
  useCommonActions,
  serviceAccountStore,
} from '@ks-console/shared';
import type { FormattedServiceAccount } from '@ks-console/shared';

import { NAME } from './constants';
import ModifyServiceAccountRole from './ModifyRole';

function ServiceAccounts(): JSX.Element {
  const { module, getDocsUrl, usePatchMutation } = serviceAccountStore;
  const params: Record<string, any> = useParams();
  const { cluster } = params;
  const tableRef = useRef<TableRef<FormattedServiceAccount>>(null);
  const docUrl = getDocsUrl();
  const serviceAccountCreateModal = useDisclosure();
  const modifyServiceAccountRoleModal = useDisclosure();
  const [activeRecord, setActiveRecord] = useState<FormattedServiceAccount>();
  const { mutate: mutateEditServiceAccountRole, isLoading: isEditRoleLoading } = usePatchMutation(
    {},
    {
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleCloseModifyServiceAccountRoleModal();
        notify.success(t('UPDATE_SUCCESSFUL'));
        tableRef?.current?.refetch();
      },
    },
  );

  const desc = (
    <div className="banner-desc">
      {t('SERVICE_ACCOUNT_DESC')}
      <Icon name="documentation" size={20} />
      <a href={docUrl} target="_blank">
        {t('LEARN_MORE')}
      </a>
    </div>
  );

  const banner = {
    icon: <Icon name="client" />,
    title: t('SERVICE_ACCOUNT_PL'),
    description: docUrl ? desc : t('SERVICE_ACCOUNT_DESC'),
  };

  const callback = () => {
    tableRef?.current?.refetch();
  };

  const { editBaseInfo, editYaml, del } = useCommonActions({
    store: serviceAccountStore,
    params: { cluster },
    callback,
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
        },
        onClick: serviceAccountCreateModal.open,
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
        onClick: () => del(tableRef?.current?.getSelectedFlatRows() || []),
        props: {
          color: 'error',
        },
      },
    ],
  });

  const renderItemAction = useActionMenu<FormattedServiceAccount>({
    authKey: module,
    params,
    actions: [
      {
        key: 'edit',
        icon: <Icon name="pen" />,
        text: t('EDIT_INFORMATION'),
        action: 'edit',
        show: row => !row.isFedManaged,
        onClick: editBaseInfo,
      },
      {
        key: 'editYaml',
        icon: <Icon name="pen" />,
        text: t('EDIT_YAML'),
        action: 'edit',
        onClick: editYaml,
      },
      {
        key: 'modify',
        icon: <Icon name="pen" />,
        text: t('CHANGE_ROLE'),
        action: 'edit',
        onClick: record => {
          setActiveRecord(record);
          modifyServiceAccountRoleModal.open();
        },
      },
      {
        key: 'delete',
        icon: <Icon name="trash" />,
        text: t('DELETE'),
        action: 'delete',
        show: row => !row.isFedManaged,
        onClick: record => del({ ...record, type: NAME }),
      },
    ],
  });

  const columns: Column[] = [
    {
      title: t('NAME'),
      field: 'name',
      sortable: true,
      searchable: true,
      render: (value, row) => {
        return (
          <Field
            value={
              <Link to={`/clusters/${cluster}/projects/${row.namespace}/${module}/${value}`}>
                {getDisplayName(row)}
              </Link>
            }
            avatar={<Icon name="client" size={40} />}
            label={row.description || '-'}
          />
        );
      },
    },
    {
      title: t('PROJECT'),
      field: 'namespace',
      canHide: true,
      width: '16%',
      render: ns => <Link to={`/clusters/${cluster}/projects/${ns}`}>{ns}</Link>,
    },
    {
      title: t('ROLE'),
      field: 'role',
      canHide: true,
      render: role => role ?? '',
    },
    {
      title: t('SECRET'),
      field: 'secrets',
      canHide: true,
      render: (secrets, record) =>
        secrets &&
        secrets.map((item: { name: string }) => (
          <div key={item.name}>
            <Link to={`/clusters/${cluster}/projects/${record.namespace}/secrets/${item.name}`}>
              {item.name}
            </Link>
          </div>
        )),
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
      render: (_, row) => renderItemAction(row as FormattedServiceAccount),
    },
  ];

  const table = {
    ref: tableRef,
    columns,
    toolbarRight: renderTableActions({}),
    batchActions: renderBatchActions({}),
  };

  const handleEditRole = (info: object) => {
    const data = merge(activeRecord?._originData, info);
    mutateEditServiceAccountRole({
      params: {
        name: activeRecord?.name,
        namespace: activeRecord?.namespace,
      },
      data,
    });
  };

  const handleCloseModifyServiceAccountRoleModal = () => {
    modifyServiceAccountRoleModal.close();
    setActiveRecord(undefined);
  };

  return (
    <>
      <ListPage banner={banner} table={table} store={serviceAccountStore} hasNamespaceSelector />
      {modifyServiceAccountRoleModal.isOpen && activeRecord && (
        <ModifyServiceAccountRole
          detail={activeRecord}
          visible={true}
          onOk={handleEditRole}
          onCancel={handleCloseModifyServiceAccountRoleModal}
          initialValue={activeRecord._originData}
          confirmLoading={isEditRoleLoading}
        />
      )}
    </>
  );
}

export default ServiceAccounts;
