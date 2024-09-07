/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState } from 'react';
import { Button, Form, FormItem, Steps, TabStep, useForm } from '@kubed/components';

import Icon from '../../../../Icon';
// import { Pattern } from '../../../../../constants';
// import { getWebsiteUrl, learnMoreTip } from '../../../../../utils';

import { Note, FirstStepText, StyledModal, TextArea } from './styles';

type VersionFormData = {
  name?: string;
  description?: string;
};

type Props = {
  visible: boolean;
  initialData: VersionFormData;
  onOk: (data: VersionFormData) => any;
  onCancel: () => void;
};

function VersionSubmitModal({ visible, initialData, onOk, onCancel }: Props): JSX.Element {
  const descMap: Record<string, string> = {
    init: t('NOT_SET'),
    completed: t('FINISHED'),
    progress: t('CURRENT'),
  };
  const [form] = useForm();
  const [active, setActive] = useState<number>(0);
  const nextStep = () => setActive(current => (current < 2 ? current + 1 : current));
  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  function handleNextBtnClick(): void {
    if (active === 0) {
      return nextStep();
    }

    form.validateFields().then(onOk);
  }

  return (
    <StyledModal
      width={960}
      title={t('SUBMIT_FOR_REVIEW')}
      description={t('SUBMIT_REVIEW_DESC')}
      titleIcon={<Icon name="templet" size={40} />}
      visible={visible}
      onCancel={onCancel}
      footer={
        <>
          {active !== 0 && <Button onClick={prevStep}>{t('PREVIOUS')}</Button>}
          <Button onClick={handleNextBtnClick} color="secondary">
            {active === 0 ? t('NEXT') : t('OK')}
          </Button>
        </>
      }
    >
      <Steps active={active} onStepClick={setActive} variant="tab">
        <TabStep
          label={t('TEST_STEPS')}
          description={descMap.init}
          completedDescription={descMap.completed}
          progressDescription={descMap.progress}
          icon={<Icon name="cdn" size={24} />}
        >
          <Note>{t('VERSION_SUBMIT_NOTE')}</Note>
          <FirstStepText dangerouslySetInnerHTML={{ __html: t('VERSION_SUBMIT_TEST_STEPS') }} />
          {/*<LearnMore*/}
          {/*  dangerouslySetInnerHTML={{*/}
          {/*    __html: learnMoreTip(t('APP_LEARN_MORE', { docUrl: getWebsiteUrl() })),*/}
          {/*  }}*/}
          {/*/>*/}
        </TabStep>
        <TabStep
          label={t('UPDATE_LOG')}
          description={descMap.init}
          completedDescription={descMap.completed}
          progressDescription={descMap.progress}
          icon={<Icon name="update" size={24} />}
        >
          <Form form={form} initialValues={initialData}>
            {/*<FormItem*/}
            {/*  name={['name']}*/}
            {/*  label={t('VERSION_NUMBER')}*/}
            {/*  rules={[*/}
            {/*    { required: true, message: t('ENTER_VERSION_NUMBER_TIP') },*/}
            {/*    {*/}
            {/*      pattern: Pattern.PATTERN_APPTEMPLATE_VERSION,*/}
            {/*      message: t('INVALID_VERSION_TIP'),*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <Input autoComplete="off" autoFocus={true} maxLength={30} />*/}
            {/*</FormItem>*/}
            <FormItem name={['description']} label={t('UPDATE_LOG')} help={t('UPDATE_LOG_DESC')}>
              <TextArea />
            </FormItem>
          </Form>
        </TabStep>
      </Steps>
    </StyledModal>
  );
}

export default VersionSubmitModal;
