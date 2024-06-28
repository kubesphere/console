import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import {
  Action,
  DeleteButton,
  Item,
  StyledInput,
  StyledSelect,
  SelectWrapper,
  Tips,
} from './TaintModal.styles';
import { Button, Tooltip } from '@kubed/components';
import { Question, Trash } from '@kubed/icons';
import { SubTitle } from './styles';
import { useScheduleOptions } from './hooks';

type TaintProps = {
  nodeIndex: number;
  nodeName: string;
};
export const Taint = ({ nodeIndex, nodeName }: TaintProps) => {
  const { control } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: `formattedNodes.${nodeIndex}.taints`,
  });
  const scheduleOptions = useScheduleOptions();
  return (
    <div>
      <SubTitle>{nodeName}</SubTitle>
      {fields.map((field, index) => {
        return (
          <Item key={field.id}>
            <Controller
              name={`formattedNodes.${nodeIndex}.taints.${index}.key`}
              render={({ field: { ...rest } }) => (
                <StyledInput placeholder={t('KEY')} {...rest}></StyledInput>
              )}
            ></Controller>
            <Controller
              name={`formattedNodes.${nodeIndex}.taints.${index}.value`}
              render={({ field: { ...rest } }) => (
                <StyledInput placeholder={t('VALUE')} {...rest}></StyledInput>
              )}
            ></Controller>
            <SelectWrapper>
              <Controller
                name={`formattedNodes.${nodeIndex}.taints.${index}.effect`}
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
