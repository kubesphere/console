/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { pick } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, notify, Tab } from '@kubed/components';

// import { Column } from '../../../DataTable';
// import { formatTime } from '../../../../utils';
import { Constants } from '../../../../constants';
// import { AuditRecords } from '../../AuditRecords';
// import { InstanceList } from '../../InstanceList';
// import { VersionStatus } from '../../VersionStatus';
import { openpitrixStore } from '../../../../stores';
import { InfoConfirmModal } from '../../../Modals/InfoConfirm';
import { DeleteConfirmModal } from '../../../Modals/DeleteConfirm';
import { AppDeploy } from '../../../Modals/AppDeploy';

import ConfigFile from './ConfigFile';
import VersionSubmitModal from './VersionSubmitModal';

import { ActionsWrapper, ItemDetailWrapper, StyledTabs } from './styles';

type VersionFormData = {
  name?: string;
  description?: string;
};

type Props = {
  detail?: any;
  appName?: any;
  isAdmin?: boolean;
  clusters?: any;
  refreshVersions?: () => void;
  refreshAppDetails?: () => void;
  hasPermission?: boolean;
  enabledDelete?: boolean;
  handleDeploy: () => void;
  actionKey: Record<string, string>;
};

const { deleteVersion, actionVersion, handleVersion, HANDLE_TYPE_TO_SHOW, APP_STORE_ACTIONS } =
  openpitrixStore;
const { STATUS_TO_ACTION, STATUS_TO_ACTION_ADMIN, CAN_DELETE_STATUS, ACTION_TO_NAME } = Constants;

function ListItemDetail({
  detail,
  appName,
  isAdmin,
  refreshVersions,
  refreshAppDetails,
  hasPermission,
  handleDeploy,
  actionKey,
}: Props): JSX.Element {
  const { metadata, status } = detail;
  const { workspace: workspaces } = useParams<'workspace'>();
  const navigate = useNavigate();
  const [modalType, setModalType] = useState<string>('view');
  const [currentTab, setCurrentTab] = useState<string>('configFile');
  const handleTypeMap = isAdmin ? STATUS_TO_ACTION_ADMIN : STATUS_TO_ACTION;
  const [handleType, setHandleType] = useState<string>('confirmVersion');
  const workspace = detail.metadata?.labels?.['kubesphere.io/workspace'];
  // const columns: Column[] = [
  //   {
  //     title: t('STATUS'),
  //     field: 'status.state',
  //     canHide: true,
  //     width: '25%',
  //     render: statusValue => <VersionStatus type={statusValue} name={statusValue} />,
  //   },
  //   {
  //     title: t('OPERATOR'),
  //     field: 'operator',
  //     canHide: true,
  //     width: '25%',
  //     render: (_, item) => item.operator || '-',
  //   },
  //   {
  //     title: t('REJECTION_REASON'),
  //     field: 'reject',
  //     canHide: true,
  //     width: '25%',
  //     render: (_, item) => item.message || '-',
  //   },
  //   {
  //     title: t('TIME'),
  //     field: 'spce.created',
  //     width: '25%',
  //     render: time => formatTime(time, 'YYYY-MM-DD HH:mm:ss'),
  //   },
  // ];

  function showHandleModel(type: string): void {
    if (type === 'view') {
      return navigate(`/apps/${appName}`);
    }

    setHandleType(type);
    setModalType(type === 'submit' ? 'submitVersion' : 'confirmVersion');
  }

  function closeModal(): void {
    setModalType('');
  }

  function onHandleVersion(): void {
    const pathParams: Record<string, string> = {
      appName,
      versionID: metadata?.name,
    };
    const data: Record<string, string> = {
      state: handleType === 'suspend' ? 'suspended' : handleType === 'cancel' ? 'draft' : 'active',
    };

    handleVersion(pathParams, data).then(() => {
      const type = HANDLE_TYPE_TO_SHOW[handleType] || handleType;
      refreshAppDetails?.();
      refreshVersions?.();

      closeModal();
      notify.success(t(`VERSION_${type.toUpperCase()}_SUCCESSFUL`));
    });
  }

  async function handleDeleteVersion(): Promise<void> {
    await deleteVersion({ appName, versionID: metadata?.name, workspace: workspaces });
    closeModal();
    notify.success(t('DELETED_SUCCESSFULLY'));
    refreshVersions?.();
  }

  function handleSubmitVersion(data: VersionFormData, handle?: boolean): void {
    const type = HANDLE_TYPE_TO_SHOW[status?.state] || handleType;

    actionVersion<{
      state: string;
      message?: string;
      userName: string;
    }>(
      {
        appName,
        versionID: metadata?.name,
        workspace,
      },
      {
        state: type,
        message: data.description,
        userName: globals.user.username,
      },
    ).then(() => {
      if (handle) {
        closeModal();
        notify.success(t(`${type.toUpperCase()}_SUCCESSFUL`));
        if (APP_STORE_ACTIONS.includes(handleType)) {
          refreshAppDetails?.();
        } else {
          refreshVersions?.();
        }
      }
    });
  }
  useEffect(() => setHandleType(handleTypeMap[status.state]), [status]);

  return (
    <>
      <ItemDetailWrapper>
        <StyledTabs
          activeKey={currentTab}
          onTabChange={setCurrentTab}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <Tab label={t('CHART_FILES')} key="configFile">
            <ConfigFile
              actionKey={actionKey}
              appName={appName}
              workspace={workspaces}
              versionID={metadata?.name}
              onVersionUpdate={handleSubmitVersion}
            />
          </Tab>
          {/* <Tab label={t('APP_REVIEW')} key="auditRecord">
            <AuditRecords
              className="simpleTable"
              simpleMode
              columns={columns}
              appName={appName}
              versionID={metadata?.name}
            />
          </Tab> */}
          {/*<Tab label={t('APP_INSTANCES')} key="deployInstances">*/}
          {/*  <InstanceList*/}
          {/*    title={t('APP_INSTANCES')}*/}
          {/*    versionID={metadata?.name}*/}
          {/*    appName={appName}*/}
          {/*    workspace={workspace}*/}
          {/*  />*/}
          {/*</Tab>*/}
        </StyledTabs>
        <ActionsWrapper>
          {CAN_DELETE_STATUS.includes(status?.state) && hasPermission && (
            <Button onClick={() => setModalType('deleteVersion')} color="error" shadow>
              {t('DELETE')}
            </Button>
          )}
          {!isAdmin && <Button onClick={handleDeploy}>{t('DEPLOYMENT_SCAP')}</Button>}
          {handleType && hasPermission && (
            <Button onClick={() => showHandleModel(handleType)} color="secondary" shadow>
              {t(ACTION_TO_NAME[handleType])}
            </Button>
          )}
        </ActionsWrapper>
      </ItemDetailWrapper>
      {modalType === 'deleteVersion' && (
        <DeleteConfirmModal
          visible={true}
          tip={t(`VERSION_DELETE_TIP`, { name: detail.metadata.name })}
          onOk={handleDeleteVersion}
          onCancel={closeModal}
        />
      )}
      {modalType === 'submitVersion' && (
        <VersionSubmitModal
          visible={true}
          onCancel={closeModal}
          onOk={data => handleSubmitVersion(data, true)}
          initialData={pick(detail, ['name', 'description'])}
        />
      )}
      {modalType === 'confirmVersion' && (
        <InfoConfirmModal
          visible={true}
          onCancel={closeModal}
          onOk={onHandleVersion}
          confirmLoading={false}
          content={t(`VERSION_${handleType.toUpperCase()}_TIP`, {
            name: detail.metadata?.name,
          })}
        />
      )}
      {modalType === 'deploy' && (
        <AppDeploy
          appName={appName}
          versionID={metadata.name}
          close={closeModal}
          onOk={handleDeploy}
        />
      )}
    </>
  );
}

export default ListItemDetail;
