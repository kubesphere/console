/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Record } from '@kubed/icons';
import React from 'react';
import { checkItemKey, mapIn, mapOut } from './utils';
import { RecordInputProps } from './interfaces';
import RecordInput1 from './RecordInput';

export const withRecordInputProps =
  <T, P>(props: Partial<RecordInputProps<T, P>>) =>
  (Component: React.ComponentType<RecordInputProps<T, P>>) =>
  (extraProps: Partial<RecordInputProps<T, P>>) =>
    React.createElement(Component, { ...props, ...extraProps } as unknown as RecordInputProps<
      T,
      P
    >);

export const RecordInput = RecordInput1;
export const KVRecordInput = withRecordInputProps<
  Record<string, any>,
  { key: string; value: string }
>({
  mapIn: mapIn,
  mapOut: mapOut,
  checkItemValid: checkItemKey,
})(RecordInput1);
