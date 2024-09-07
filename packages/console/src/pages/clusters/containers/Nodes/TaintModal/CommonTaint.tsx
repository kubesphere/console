/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { SubTitle } from './styles';
import React from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { Button, Tooltip } from '@kubed/components';
import {
  Item,
  Action,
  StyledInput,
  StyledSelect,
  DeleteButton,
  SelectWrapper,
  Tips,
} from './TaintModal.styles';
import { Question, Trash } from '@kubed/icons';
import { useScheduleOptions } from './hooks';

export const CommonTaint = () => {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({ control, name: 'commonTaints' });
  const scheduleOptions = useScheduleOptions();
  return (
    <div>
      <SubTitle>{t('COMMON_TAINTS')}</SubTitle>
      {fields.map((field, index) => {
        return (
          <Item key={field.id}>
            <Controller
              name={`commonTaints.${index}.key`}
              render={({ field: { ...rest } }) => (
                <StyledInput placeholder={t('KEY')} {...rest}></StyledInput>
              )}
            ></Controller>
            <Controller
              name={`commonTaints.${index}.value`}
              render={({ field: { ...rest } }) => (
                <StyledInput placeholder={t('VALUE')} {...rest}></StyledInput>
              )}
            ></Controller>
            <SelectWrapper>
              <Controller
                name={`commonTaints.${index}.effect`}
                render={({ field: { ...rest } }) => (
                  <StyledSelect options={scheduleOptions} {...rest}></StyledSelect>
                )}
              ></Controller>
              <Tips>
                <Tooltip content={<div dangerouslySetInnerHTML={{ __html: t('TAINTS_TIPS') }} />}>
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
  );
};
