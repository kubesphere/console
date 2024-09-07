/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useRef, useState } from 'react';
import { pick } from 'lodash';
import { getDisplayName, useCacheStore as useStore } from '../../../index';
import { Button, Step, Steps } from '@kubed/components';

import Icon from '../../Icon';
import Image from '../../Image';
import { getAvatar, getRepoAppDisplayName } from '../../../utils';
import { openpitrixStore } from '../../../stores';
import type { AppBaseInfoFormRef, AppConfigRefType } from '../AppForms';
import { AppBaseInfoForm, AppConfigForm, AppBaseInfoData } from '../AppForms';
import type { ApplicationsInstanceDetail, AppDetailStore, AppDeployFormData } from '../../../types';

import { CloseModal, FooterBtns, HeadField, StyledDrawer } from './styles';

type Props = {
  visible: boolean;
  appName?: string;
  initFormData?: AppDeployFormData;
  detail?: ApplicationsInstanceDetail;
  onOk?: (data: AppDeployFormData) => void;
  onCancel: () => void;
  className?: string;
  versionID?: string;
};

const { useAppDetail } = openpitrixStore;

export function DeployVersionModal({
  appName = '',
  visible,
  initFormData,
  detail,
  onOk,
  onCancel,
  className,
  versionID,
}: Props): JSX.Element {
  const [active, setActive] = useState<number>(0);
  const nextStep = () => setActive(current => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));
  const baseInfoFormRef = useRef<AppBaseInfoFormRef>(null);
  const configFormRef = useRef<AppConfigRefType>(null);
  const [appDetail, setAppDetail] = useStore<AppDetailStore>('appDetail');
  const [confirmedBaseInfoData, setConfirmedBaseInfoData] = useState<AppBaseInfoData>(
    initFormData as AppBaseInfoData,
  );
  const { refetch } = useAppDetail(
    { appName },
    {
      enabled: !detail && !!appName,
      onSuccess: (appDetails: ApplicationsInstanceDetail) =>
        setAppDetail({ ...appDetails, refetchAppDetails: refetch }),
    },
  );

  const handleNextBtnClick = () =>
    baseInfoFormRef.current
      ?.validateFields()
      .then(data => setConfirmedBaseInfoData({ ...initFormData, ...data }))
      .then(() => nextStep());

  const handleDeploy = () =>
    onOk?.({
      ...confirmedBaseInfoData,
      conf: configFormRef.current?.conf,
      appName,
      originalName: getRepoAppDisplayName(appDetail),
    });

  useEffect(() => {
    const data = pick(initFormData, [
      'name',
      'versionID',
      'description',
      'workspace',
      'cluster',
      'namespace',
      'appType',
      'annotations',
      'originalName',
    ]) as AppBaseInfoData;

    setConfirmedBaseInfoData({
      ...data,
      versionID: versionID || (detail?.metadata.name as string),
    });
  }, [initFormData, detail]);

  return (
    <StyledDrawer
      maskClosable
      width={1070}
      placement="right"
      visible={visible}
      onClose={onCancel}
      className={className}
    >
      <CloseModal color="dark" shadow onClick={onCancel}>
        <Icon name="close" size={24} color="white" />
      </CloseModal>
      <HeadField
        avatar={
          <Image
            alt=""
            src={getAvatar(detail?.spec.icon || '')}
            iconSize={48}
            iconLetter={getDisplayName(detail)}
          />
        }
        value={getRepoAppDisplayName(appDetail)}
        label={getRepoAppDisplayName(appDetail)}
      />
      <Steps active={active} onStepClick={setActive}>
        <Step label={t('BASIC_INFORMATION')}>
          <AppBaseInfoForm
            ref={baseInfoFormRef}
            versionID={confirmedBaseInfoData?.versionID}
            appName={appName}
            confirmedData={confirmedBaseInfoData}
          />
        </Step>
        <Step label={t('APP_SETTINGS')}>
          <AppConfigForm
            ref={configFormRef}
            appName={appName}
            versionID={confirmedBaseInfoData?.versionID}
          />
        </Step>
      </Steps>
      <FooterBtns>
        {active === 0 ? (
          <Button color="secondary" onClick={handleNextBtnClick}>
            {t('NEXT')}
          </Button>
        ) : (
          <>
            <Button color="secondary" className="mr12" onClick={prevStep}>
              {t('PREVIOUS')}
            </Button>
            <Button color="secondary" onClick={handleDeploy}>
              {t('INSTALL')}
            </Button>
          </>
        )}
      </FooterBtns>
    </StyledDrawer>
  );
}
