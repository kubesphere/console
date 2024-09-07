/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

export type ValueType = 'number' | 'string';

export interface RecordInputProps<T, P> {
  mapIn: (v?: T) => P[];
  mapOut: (v: P[]) => T;
  value?: T;
  defaultValue?: T;
  onChange?: (v: T) => void;
  mapItemPropsFromList?: (p: Record<string, any>) => T;
  validator?: (v: P[]) => boolean;
  children: React.ReactChild;
  checkItemValid?: (v: P) => boolean;
  onError?: (e: { valid: boolean; message: string }) => void;
}

export interface RecordItemProps {
  value?: Record<string, any>;
  onChange?: (v: Record<string, any>) => void;
  getPropsByList?: (p: any) => Record<string, any>;
  itemProps?: Record<string, any>;
  list?: Record<string, any>[];
  children: React.ReactChild[];
  error?: boolean;
}
