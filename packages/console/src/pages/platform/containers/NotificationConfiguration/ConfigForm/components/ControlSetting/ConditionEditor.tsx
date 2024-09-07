/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useEffect, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { Button } from '@kubed/components';

import type { Condition } from './types';
import ConditionSelect from './ConditionSelect';
import { DEFAULT_CONDITION } from './constants';

import { ConditionEditorWrapper, ConditionsFooter } from './styles';

type Props = {
  conditions: Condition[];
  desc?: ReactNode;
  addText?: string;
  className?: string;
  onChange?: (conditions: Condition[]) => void;
};

function ConditionEditor({ desc, addText, className, conditions, onChange }: Props): JSX.Element {
  const unAddAble = useMemo(() => {
    if (!isEmpty(conditions)) {
      const { key, operator } = conditions[conditions.length - 1];
      return !key || !operator;
    }
  }, [conditions]);

  function handleConditionChange(item: Condition, index: number): void {
    if (!onChange) {
      return;
    }

    const newConditions = [...conditions];
    newConditions[index] = Object.assign(conditions[index], item);
    onChange(newConditions);
  }

  function handleAdd(): void {
    onChange?.(conditions.concat([{ ...DEFAULT_CONDITION }]));
  }

  function handleDelete(index: number): void {
    const newConditions = [...conditions];
    newConditions.splice(index, 1);
    onChange?.(newConditions);
  }

  useEffect(() => {
    if (isEmpty(conditions)) {
      handleAdd();
    }
  }, [conditions]);

  // todo fix the key is the same after user edit
  return (
    <ConditionEditorWrapper className={className}>
      {conditions?.map((item, index) => {
        return (
          <ConditionSelect
            item={item}
            key={`${item.key}_${item.operator}_${index}`}
            onDelete={() => handleDelete(index)}
            onChange={newItem => handleConditionChange(newItem, index)}
          />
        );
      })}
      <ConditionsFooter>
        {desc}
        <Button onClick={handleAdd} disabled={unAddAble}>
          {addText}
        </Button>
      </ConditionsFooter>
    </ConditionEditorWrapper>
  );
}

export default ConditionEditor;
