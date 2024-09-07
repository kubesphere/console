/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { Ref, forwardRef, useImperativeHandle, useRef } from 'react';
import { pick } from 'lodash';
import { useForm } from '@kubed/components';

import { PlacementForm } from './PlacementForm';
import { BasicInfoForm } from './BasicInfoForm';
import type { AppBasicInfoFormData } from './BasicInfoForm';
import type { AppPlacementConfigFormRef, AppPlacementFieldsData } from './PlacementForm';

export type { AppPlacementConfigFormRef } from './PlacementForm';

export type AppBaseInfoData = AppBasicInfoFormData & AppPlacementFieldsData;

export type AppBaseInfoFormRef = {
  formData: AppBaseInfoData;
  validateFields: () => Promise<AppBaseInfoData>;
};

interface Props {
  appName: string;
  versionID?: string;
  versionStatus?: string;
  confirmedData?: AppBaseInfoData;
}

function AppBaseInfoForm(
  { appName, versionStatus, confirmedData, versionID }: Props,
  ref?: Ref<AppBaseInfoFormRef>,
): JSX.Element {
  const [basicInfoForm] = useForm<AppBasicInfoFormData>();
  const placementFormRef = useRef<AppPlacementConfigFormRef>(null);

  const validateBaseInfoForm = async (): Promise<AppBaseInfoData> =>
    basicInfoForm.validateFields().then(async basicInfoData => {
      const placementData = (await placementFormRef.current?.validateFields()) || {};

      return { ...basicInfoData, ...placementData };
    });

  useImperativeHandle(ref, () => ({
    formData: { ...basicInfoForm.getFieldsValue(), ...placementFormRef.current?.formData },
    validateFields: validateBaseInfoForm,
  }));

  return (
    <>
      <BasicInfoForm
        confirmedBasicData={pick(confirmedData, [
          'name',
          'originalName',
          'versionID',
          'description',
          'appType',
        ])}
        appName={appName}
        form={basicInfoForm}
        versionID={versionID}
        versionStatus={versionStatus}
      />
      <PlacementForm
        confirmedPlacementData={pick(confirmedData, ['workspace', 'cluster', 'namespace'])}
        formRef={placementFormRef}
      />
    </>
  );
}

export default forwardRef(AppBaseInfoForm);
