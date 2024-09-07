/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { FormattedNode, TaintType } from '@ks-console/shared';
import { Question, Trash, Wrench } from '@kubed/icons';
import { Content, SubTitle, Title, Wrapper } from './styles';
import { Alert, Button, Modal, Tooltip } from '@kubed/components';
import React from 'react';
import { Controller, useFieldArray, useForm, FormProvider } from 'react-hook-form';
import {
  Action,
  DeleteButton,
  Item,
  SelectWrapper,
  StyledInput,
  StyledSelect,
  Tips,
} from './TaintModal.styles';
import { isEmpty } from 'lodash';
import { useScheduleOptions } from './hooks';

type TaintSingleModalProps = {
  visible: boolean;
  detail: FormattedNode;
  confirmLoading?: boolean;
  onOk: (data: any) => void;
  onCancel: () => void;
};
type FormValues = {
  taints: TaintType[];
};

export const TaintSingleModal = ({
  visible,
  detail,
  confirmLoading,
  onOk,
  onCancel,
}: TaintSingleModalProps) => {
  const scheduleOptions = useScheduleOptions();

  const formMethods = useForm<FormValues>({
    defaultValues: {
      taints: detail?.taints ?? [],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control: formMethods.control,
    name: 'taints',
  });

  const handleOk = () => {
    const taints = formMethods.getValues('taints');
    onOk([
      {
        ...detail,
        taints: taints.filter(taint => !isEmpty(taint.key)),
      },
    ]);
  };
  return (
    <Modal
      width={1162}
      visible={visible}
      titleIcon={<Wrench size={20} />}
      title={t('EDIT_TAINTS')}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      onOk={handleOk}
    >
      <FormProvider {...formMethods}>
        <Wrapper>
          <Title>{t('TAINTS')}</Title>
          <Alert type="info" showIcon={false}>
            {t('TAINTS_DESC')}
          </Alert>
          <Content>
            <div>
              <SubTitle>{detail.name}</SubTitle>
              {fields.map((field, index) => {
                return (
                  <Item key={field.id}>
                    <Controller
                      name={`taints.${index}.key`}
                      render={({ field: { ...rest } }) => (
                        <StyledInput placeholder={t('KEY')} {...rest}></StyledInput>
                      )}
                    ></Controller>
                    <Controller
                      name={`taints.${index}.value`}
                      render={({ field: { ...rest } }) => (
                        <StyledInput placeholder={t('VALUE')} {...rest}></StyledInput>
                      )}
                    ></Controller>
                    <SelectWrapper>
                      <Controller
                        name={`taints.${index}.effect`}
                        render={({ field: { ...rest } }) => (
                          <StyledSelect options={scheduleOptions} {...rest}></StyledSelect>
                        )}
                      ></Controller>
                      <Tips>
                        <Tooltip
                          content={<div dangerouslySetInnerHTML={{ __html: t('TAINTS_TIPS') }} />}
                        >
                          <Question size={16} />
                        </Tooltip>
                      </Tips>
                    </SelectWrapper>
                    <Tooltip content={t('DELETE')}>
                      <DeleteButton onClick={() => remove(index)} variant="text" radius="lg">
                        <Trash />
                      </DeleteButton>
                    </Tooltip>
                  </Item>
                );
              })}
              <Action>
                <Button
                  onClick={() => {
                    append({
                      key: '',
                      value: '',
                      effect: 'NoSchedule',
                    });
                  }}
                >
                  {t('ADD')}
                </Button>
              </Action>
            </div>
          </Content>
        </Wrapper>
      </FormProvider>
    </Modal>
  );
};
