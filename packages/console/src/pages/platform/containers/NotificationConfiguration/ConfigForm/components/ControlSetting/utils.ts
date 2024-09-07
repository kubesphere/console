/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isEmpty } from 'lodash';

import type { LabelValue } from '../../../../../types';
import type { Condition, ConditionItem } from './types';

export function initConditionItem(keys: LabelValue[], item: Condition): ConditionItem {
  const { key, operator, values } = item;

  // todo consider key is empty string, which keyItems type it is ?
  return {
    key,
    operator,
    values,
    keyName: '',
    keyItems:
      key && isEmpty(keys.find((keyItem: LabelValue) => keyItem.value === key))
        ? [...keys, { label: key, value: key }]
        : [...keys],
  };
}

export function showValues(operator: string): boolean {
  return !operator || ['In', 'NotIn'].includes(operator);
}

export function transformCondition(condKey: string, val: string | string[]): Condition {
  if (condKey === 'values' || (condKey === 'operator' && showValues(val as string))) {
    return { [`${condKey}`]: val };
  }

  return { [`${condKey}`]: val, values: [] };
}
