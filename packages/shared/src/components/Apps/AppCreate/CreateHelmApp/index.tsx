/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo, useState } from 'react';
import { Templet } from '@kubed/icons';
import { notify } from '@kubed/components';
import { useParams } from 'react-router-dom';
import { PackageUpload } from '../../PackageUpload';
import { getCreateAppParams } from '../../../../utils';
import { openpitrixStore } from '../../../../stores';
import CheckFiles from './CheckFiles';
import CreateInfo from './CreateInfo';

import { IconHelm, StyledModal } from './styles';

type FormattedFileInfo = {
  status?: string;
  name?: string;
  base64Str?: string;
  icon?: string;
};

type Props = {
  visible: boolean;
  title?: ReactNode;
  description?: ReactNode;
  appName?: string;
  workspace?: string;
  type?: string;
  onOk?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
};

const { fileStore } = openpitrixStore;

export function CreateHelmApp({
  visible,
  workspace: ws,
  title,
  description,
  onCancel,
  onOk,
}: Props): JSX.Element {
  const { appName = '', workspace = ws } = useParams();
  const [appIcon, setIconStr] = useState<string>();
  const [canCreate, setCanCreate] = useState<boolean>(false);
  const [checkedFileInfo, setCheckedFileInfo] = useState<FormattedFileInfo>();
  // const htmlDesc = t('APP_CREATE_GUIDE', { docUrl: getWebsiteUrl() });
  const checkedUnSuccess = useMemo(
    () => checkedFileInfo?.status !== 'success',
    [checkedFileInfo?.status],
  );

  function initCheckedStatus(): void {
    setCheckedFileInfo(prevChecked => ({ ...prevChecked, status: 'init' }));
  }

  function handleCancel(): void {
    onCancel?.();
    setCanCreate(false);
    initCheckedStatus();
  }

  async function submitData(): Promise<void> {
    const data: Record<string, unknown> = getCreateAppParams({
      appType: 'helm',
      workspace,
      package: checkedFileInfo?.base64Str,
      ...checkedFileInfo,
      icon: appIcon,
    });
    await fileStore.uploadPackage('CREATE_APP', data, onOk);
  }

  async function handleSubmit() {
    if (checkedUnSuccess) {
      return notify.error(t('UPLOAD_PACKAGE_OK_NOTE'));
    }
    if (!canCreate) {
      return setCanCreate(!canCreate);
    }

    await submitData();
    setCanCreate(false);
    initCheckedStatus();
  }

  return (
    <StyledModal
      width={960}
      titleIcon={<Templet size={40} />}
      title={title || t('UPLOAD_HELM_TITLE')}
      description={description || t('UPLOAD_HELM_CHART_DESC')}
      visible={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okButtonProps={{ disabled: checkedUnSuccess }}
    >
      <IconHelm size={60} />
      <PackageUpload
        appName={appName}
        fileStore={fileStore}
        canCreate={canCreate}
        workspace={workspace}
        onCheckStatusChange={setCheckedFileInfo}
      />
      {!canCreate ? (
        <>
          <CheckFiles unSuccess={checkedUnSuccess} />
          {/*{showOutSiteLink() && (*/}
          {/*  <div>*/}
          {/*    💁‍♂️ <span dangerouslySetInnerHTML={{ __html: htmlDesc }} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </>
      ) : (
        <CreateInfo createInfo={checkedFileInfo} onIconChange={setIconStr} />
      )}
    </StyledModal>
  );
}

export default CreateHelmApp;
