/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useMemo } from 'react';
import { notify } from '@kubed/components';

import { Constants } from '../../../../constants';
import { openpitrixStore } from '../../../../stores';
import { PackageInfo, PackageUpload } from '../../PackageUpload';
import { getPackageName, hasPermission, getAnnotationsDescription } from '../../../../utils';

import { ConfigFileWrapper, ConfigBox, Title } from './styles';

type Props = {
  versionID?: string;
  appName?: string;
  workspace?: string;
  actionKey: Record<string, string>;
  onVersionUpdate: (data: PackageInfo) => void;
};

const { useVersionDetail, fileStore } = openpitrixStore;

function ConfigFile({
  actionKey,
  versionID,
  appName,
  onVersionUpdate,
  workspace,
}: Props): JSX.Element {
  const {
    data: detail,
    isLoading,
    refetch,
  } = useVersionDetail({
    appName: appName,
    versionID,
    workspace,
  });
  const canEdit = useMemo(
    () =>
      hasPermission({
        module: actionKey.appKey,
        actions: [actionKey.create, 'manage'],
      }) &&
      Constants.CAN_EDIT_STATUS.includes(detail?.status?.state || '') &&
      detail?.spec?.appType === 'heml',
    [detail],
  );

  function modifyPackage(data: PackageInfo): void {
    onVersionUpdate(data);
    notify.success(t('MODIFY_SUCCESSFUL'));

    if (appName && versionID) {
      refetch();
    }
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <ConfigFileWrapper>
      <PackageUpload
        hasPackage
        className="mb12"
        canEdit={canEdit}
        fileStore={fileStore}
        appName={appName}
        versionID={versionID}
        type={'MODIFY_VERSION'}
        packageName={getPackageName(detail)}
        updateTime={detail?.spec.created || ''}
        appType={detail?.spec.appType || ''}
        // updateTime={detail?.update_time || detail?.status_time}
        onOk={modifyPackage}
        disabledUpload
      />
      <ConfigBox>
        {getAnnotationsDescription(detail) && <Title>{t('VERSION_INFO')}</Title>}
        <pre>{getAnnotationsDescription(detail) || t('NO_VERSION_INFO_DESC')}</pre>
      </ConfigBox>
    </ConfigFileWrapper>
  );
}

export default ConfigFile;
