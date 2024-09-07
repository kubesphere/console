/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Icon } from '@ks-console/shared';
import { Button, Input, notify, Select } from '@kubed/components';

import TagInput from '../TagInput';
import { PATTERN_TAG } from '../constants';
import { SEVERITY_LEVEL } from './constants';
import type { Condition, ConditionItem, SeverityLevel } from './types';
import { initConditionItem, showValues, transformCondition } from './utils';
// todo ues the alias path
import type { LabelValue } from '../../../../../types';

import {
  ErrorText,
  ConditionWrapper,
  SelectWrapper,
  OptionsContainer,
  OptionsListWrapper,
  CustomSelect,
  IconWrapper,
} from './styles';

type Props = {
  item: Condition;
  onDelete: () => void;
  onChange?: (item: Condition) => void;
};

function ConditionSelect({ item, onDelete, onChange }: Props): JSX.Element {
  const keys: LabelValue[] = [
    {
      label: t('ALERTING_NAME'),
      value: 'alertname',
    },
    {
      label: t('ALERTING_SEVERITY'),
      value: 'severity',
    },
    {
      label: t('PROJECT'),
      value: 'namespace',
    },
    {
      label: t('POD'),
      value: 'pod',
    },
    {
      label: t('CONTAINER'),
      value: 'container',
    },
  ];
  const operators: LabelValue[] = [
    {
      label: t('INCLUDES_VALUES'),
      value: 'In',
    },
    {
      label: t('DOES_NOT_INCLUDE_VALUES'),
      value: 'NotIn',
    },
    {
      label: t('EXISTS'),
      value: 'Exists',
    },
    {
      label: t('DOES_NOT_EXIST'),
      value: 'DoesNotExist',
    },
  ];
  const severities = SEVERITY_LEVEL.map((level: SeverityLevel) => ({
    label: t(level.label),
    value: level.value,
    level: level,
  }));
  const [conditionItem, setConditionItem] = useState<ConditionItem>(initConditionItem(keys, item));
  const [keyErrorTip] = useState('');

  function handleConditionChange(condKey: string, value: string | string[]): void {
    const condition: Condition = transformCondition(condKey, value);

    setConditionItem(prevConditionItem => {
      return { ...prevConditionItem, ...condition };
    });
    onChange?.({ ...condition });
  }

  function onKeyChange(value: string): void {
    handleConditionChange('key', value);
  }

  function onValuesChange(value: string[]): void {
    handleConditionChange('values', value);
  }

  function onOperatorChange(value: string): void {
    handleConditionChange('operator', value);
  }

  function handleAddItem(): void {
    const { keyItems = [], keyName = '' } = conditionItem;

    if (!PATTERN_TAG.test(keyName)) {
      notify.error(t('PATTERN_TAG_INVALID_TIP'));
      return;
    }

    setConditionItem(prevConditionItem => {
      return {
        ...prevConditionItem,
        keyItems: [...keyItems, { label: keyName, value: keyName }],
        keyName: '',
      };
    });
  }

  function handleNameChange({ target }: ChangeEvent<HTMLInputElement>): void {
    setConditionItem(prevConditionItem => {
      return { ...prevConditionItem, keyName: target.value };
    });
  }

  function dropDownRender(options: any): JSX.Element {
    return (
      <OptionsContainer>
        <OptionsListWrapper>{options}</OptionsListWrapper>
        <CustomSelect>
          {/* to fix the value isn't change when keyName is empty string in shared Input component) */}
          <Input value={conditionItem.keyName} onChange={handleNameChange} />
          <IconWrapper onClick={handleAddItem}>
            <Icon name="add" variant="light" size={12} />
          </IconWrapper>
        </CustomSelect>
      </OptionsContainer>
    );
  }

  function transformSeverityValues(values: string[]): string[] {
    return values.filter((val: string) => severities.map(({ value }) => value).includes(val));
  }

  function valuesRender() {
    const { key = '', operator = '', values = [] } = conditionItem;

    if (!showValues(operator)) {
      return null;
    }

    if (key === 'severity') {
      // todo render arrow as checkbox
      return (
        <Select
          mode="multiple"
          name="values"
          value={transformSeverityValues(values)}
          placeholder={t('VALUES')}
          options={severities}
          onChange={onValuesChange}
        />
      );
    }

    return (
      <TagInput name="values" placeholder={t('VALUES')} values={values} onChange={onValuesChange} />
    );
  }

  useEffect(() => {
    const initItem = initConditionItem(keys, item);

    setConditionItem(initItem);
  }, [item]);

  return (
    <>
      <ConditionWrapper>
        <SelectWrapper>
          <Select
            name="key"
            value={conditionItem.key}
            options={conditionItem.keyItems}
            placeholder={t('LABEL')}
            onChange={onKeyChange}
            dropdownRender={dropDownRender}
          />
          <Select
            name="operator"
            value={conditionItem.operator}
            options={operators}
            onChange={onOperatorChange}
            placeholder={t('CONDITION_OPERATOR')}
          />
          {valuesRender()}
        </SelectWrapper>
        <Button className="button-flat" onClick={onDelete}>
          <Icon name="trash" />
        </Button>
      </ConditionWrapper>
      {keyErrorTip !== '' && <ErrorText>{keyErrorTip}</ErrorText>}
    </>
  );
}

export default ConditionSelect;
