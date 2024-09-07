/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useRef, useState } from 'react';
import { useCacheStore as useStore } from '@ks-console/shared';
import { Button, Loading } from '@kubed/components';
import { useNavigate, useParams } from 'react-router-dom';

import {
  isRadonDB,
  safeBtoa,
  AppConfigForm,
  AppBaseInfoForm,
  openpitrixStore,
} from '@ks-console/shared';
import type { AppConfigRefType, AppBaseInfoData, AppBaseInfoFormRef } from '@ks-console/shared';

import Steps from './Steps';

import { FormWrapper, StepsWrapper, StyledCol } from './styles';

function AppDeploy(): JSX.Element {
  const navigate = useNavigate();
  const { appName = '' } = useParams<'appName'>();
  const { deployApp } = openpitrixStore;
  const baseInfoFormRef = useRef<AppBaseInfoFormRef>(null);
  const configRef = useRef<AppConfigRefType>(null);
  const [confirmedBaseInfoData, setConfirmedBaseInfoData] = useState<AppBaseInfoData>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [appListIsLoading] = useStore<boolean>('appListIsLoading');
  const [currentStep, setCurrentStep] = useStore<number>('currentStep');

  const steps = [
    {
      title: 'BASIC_INFORMATION',
      component: (
        <AppBaseInfoForm
          ref={baseInfoFormRef}
          appName={appName}
          versionStatus="active"
          confirmedData={confirmedBaseInfoData}
        />
      ),
      required: true,
      isForm: true,
    },
    {
      title: 'APP_SETTINGS',
      component: isRadonDB(appName) ? (
        <>{/* {TODO: Render DB App Config} */}</>
      ) : (
        <AppConfigForm
          ref={configRef}
          appName={appName}
          versionID={confirmedBaseInfoData?.versionID}
        />
      ),
      required: true,
    },
  ];

  const handleNext = () => {
    baseInfoFormRef.current
      ?.validateFields()
      .then(baseInfoData => {
        setConfirmedBaseInfoData(baseInfoData);
        setCurrentStep(current => (current < steps.length - 1 ? current + 1 : current));
      })
      .catch(() => null); // in order to avoid error tip in browser console when this validate is failed
  };

  const handleOk = async (): Promise<void> => {
    setIsSubmitting(true);
    const finalData = {
      // name: appName,
      ...confirmedBaseInfoData,
      value: configRef.current?.conf,
      appID: appName,
    };
    const { cluster, namespace, workspace } = finalData;
    const params = {
      kind: 'ApplicationRelease',
      metadata: {
        name: confirmedBaseInfoData?.name,
      },
      spec: {
        appID: appName,
        appType: 'helm',
        appVersionID: confirmedBaseInfoData?.versionID,
        values: safeBtoa(configRef.current?.conf),
      },
    };

    // TODO 临时移除 cluster, namespace, workspace
    // await deployApp(params, { cluster, namespace, workspace });
    await deployApp(params, {});

    setIsSubmitting(false);
    navigate(`/${workspace}/clusters/${cluster}/projects/${namespace}/deploy`);
  };

  useEffect(() => setCurrentStep(0), []);

  return (
    <>
      <StepsWrapper>
        <Steps steps={steps} current={currentStep} />
      </StepsWrapper>
      <FormWrapper>
        <StyledCol span={10}>
          {appListIsLoading && <Loading className="page-loading" />}
          {!appListIsLoading && steps[currentStep]?.component}
        </StyledCol>
        <StyledCol span={2}>
          {currentStep < steps.length - 1 ? (
            <Button color="dark" onClick={handleNext}>
              {t('NEXT')}
            </Button>
          ) : (
            <Button color="dark" onClick={handleOk} loading={isSubmitting}>
              {t('INSTALL')}
            </Button>
          )}
        </StyledCol>
      </FormWrapper>
    </>
  );
}

export default AppDeploy;
