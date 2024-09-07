/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useRef, useState } from 'react';
import { useCacheStore as useStore } from '../../../index';
import { Button, Loading, Modal } from '@kubed/components';
import { Firewall } from '@kubed/icons';
import { isRadonDB, safeBtoa } from '../../../utils';

import { AppConfigForm, AppBaseInfoForm } from '../../../components/Apps/AppForms';
import { openpitrixStore } from '../../../stores';

import Steps from './Steps';
import type {
  AppConfigRefType,
  AppBaseInfoData,
  AppBaseInfoFormRef,
} from '../../../components/Apps/AppForms';

import { FormWrapper, StepsWrapper, StyledCol } from './styles';

interface Props {
  close: () => void;
  onOk: (data: any) => void;
  appName: string;
  versionID: string;
}
const { deployApp } = openpitrixStore;

export function AppDeploy({ close, appName, versionID }: Props): JSX.Element {
  // const navigate = useNavigate();
  // const { appName = 'configyaml-testyaml' } = useParams<'appName'>();
  const baseInfoFormRef = useRef<AppBaseInfoFormRef>(null);
  const configRef = useRef<AppConfigRefType>(null);
  const [confirmedBaseInfoData, setConfirmedBaseInfoData] = useState<AppBaseInfoData>();
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
          versionID={versionID}
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
    // setIsSubmitting(true);
    const finalData = {
      // name: appName,
      ...confirmedBaseInfoData,
      value: configRef.current?.conf,
      appType: confirmedBaseInfoData?.appType,
      appID: appName,
    };
    const { cluster, namespace, workspace } = finalData;
    const params = {
      kind: 'ApplicationRelease',
      metadata: {
        name: confirmedBaseInfoData?.name,
        labels: {
          'kubesphere.io/namespace': namespace,
        },
      },
      spec: {
        appID: appName,
        appType: finalData.appType,
        appVersionId: confirmedBaseInfoData?.versionID,
        values: safeBtoa(configRef.current?.conf),
      },
    };

    await deployApp(params, { cluster, namespace, workspace });
    // setIsSubmitting(false);
    // navigate(`/${workspace}/clusters/${cluster}/projects/${namespace}/applications`);
  };

  useEffect(() => setCurrentStep(0), []);

  return (
    <>
      <Modal
        width={691}
        visible={true}
        onOk={handleOk}
        onCancel={close}
        titleIcon={<Firewall size={20} />}
        title={'APP_DEPLOY'}
        footer={null}
      >
        <StepsWrapper>
          <Steps steps={steps} current={currentStep} />
        </StepsWrapper>
        <FormWrapper>
          <StyledCol span={12}>
            {appListIsLoading && <Loading className="page-loading" />}
            {!appListIsLoading && steps[currentStep]?.component}
          </StyledCol>
        </FormWrapper>
        <div className="kubed-modal-footer">
          {currentStep < 1 ? (
            <Button color="default" onClick={close}>
              {t('CANCEL')}
            </Button>
          ) : (
            <Button color="dark" onClick={() => setCurrentStep(0)}>
              {t('BEFORE')}
            </Button>
          )}
          {currentStep > 0 ? (
            <Button color="dark" onClick={handleOk}>
              {t('OK')}
            </Button>
          ) : (
            <Button color="dark" onClick={handleNext}>
              {t('NEXT')}
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
}

export default AppDeploy;
