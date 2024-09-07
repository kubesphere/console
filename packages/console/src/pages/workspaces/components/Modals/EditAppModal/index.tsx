/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef, useState } from 'react';
import { Pen } from '@kubed/icons';
import { isEmpty, pick } from 'lodash';
import { useForm } from '@kubed/components';
import MarkDownEditor, { IToolbar } from 'for-editor';

import { AppDetail, openpitrixStore } from '@ks-console/shared';

import AppBaseEditForm from './AppBaseEditForm';
import ScreenShotsEdit, { ScreenShotsRef } from './ScreenShotsEdit';

import { BaseEditWrapper, H5Text, OthersEditWrapper, StyledModal } from './styles';

const { useScreenShotsMutation } = openpitrixStore;

const toolbar: IToolbar = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  link: true,
  code: true,
  preview: true,
  expand: true,
  undo: true,
  redo: true,
  subfield: true,
};

type Props = {
  visible: boolean;
  detail: AppDetail;
  onOk?: (data: Partial<AppDetail>) => void;
  onCancel?: () => void;
};

function EditAppModal({ visible, detail, onOk, onCancel }: Props): JSX.Element {
  const isSubmitting = false;
  const [form] = useForm();
  const screenshotsRef = useRef<ScreenShotsRef>(null);
  // TODO 缺少字段 detail.abstraction || ''
  const [abstraction, setAbstraction] = useState<string>('');
  const { mutate: screenshotsMutate } = useScreenShotsMutation(detail);

  function handleReadmeChange(value: string): void {
    form.setFieldValue('abstraction', value);
    setAbstraction(value);
  }

  async function submitScreenshots(initScreenshots: string[]): Promise<void> {
    const newScreenshots: string[] = screenshotsRef.current?.getValues() || [];

    if (isEmpty(initScreenshots) && !isEmpty(newScreenshots)) {
      return screenshotsMutate({ screenshots: newScreenshots, type: 'add' });
    }

    if (!isEmpty(initScreenshots) && isEmpty(newScreenshots)) {
      return screenshotsMutate({ screenshots: initScreenshots, type: 'delete' });
    }

    const changeIndex = initScreenshots.findIndex(
      (str: string, index: number) => str !== newScreenshots[index],
    );

    if (changeIndex >= 0) {
      await screenshotsMutate({
        screenshots: initScreenshots,
        type: 'delete',
        startIndex: changeIndex,
      });

      return screenshotsMutate({
        screenshots: newScreenshots.slice(changeIndex),
        type: 'add',
        startIndex: changeIndex,
      });
    }
  }

  function handleOk(): void {
    const formData: AppDetail = form.getFieldsValue(true);
    // @ts-ignore TODO
    const initScreenshots: string[] = formData.screenshots ? formData.screenshots.split(',') : [];

    submitScreenshots(initScreenshots);

    form.validateFields().then(() => {
      const data: Partial<AppDetail> = pick(formData, [
        'app_id',
        'name',
        'abstraction',
        'description',
        'home',
        'icon',
        'category_id',
        'readme',
        'workspace',
      ]);

      onOk?.(data);
    });
  }

  return (
    <StyledModal
      width={1389}
      visible={visible}
      titleIcon={<Pen size={40} />}
      title={t('EDIT_INFORMATION')}
      description={t('EDIT_APP_DESC')}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={isSubmitting}
    >
      <BaseEditWrapper>
        <H5Text>{t('BASIC_INFORMATION')}</H5Text>
        <AppBaseEditForm form={form} detail={detail} />
      </BaseEditWrapper>
      <OthersEditWrapper>
        <H5Text>{t('APP_SCREENSHOTS')}</H5Text>
        <ScreenShotsEdit ref={screenshotsRef} detail={detail} />
        <H5Text>{t('APP_INTRODUCTION')}</H5Text>
        <MarkDownEditor
          value={abstraction}
          toolbar={toolbar}
          onChange={handleReadmeChange}
          placeholder={t('START_EDITING')}
        />
      </OthersEditWrapper>
    </StyledModal>
  );
}

export default EditAppModal;
