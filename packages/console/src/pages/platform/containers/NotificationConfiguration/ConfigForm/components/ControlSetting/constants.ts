/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { Condition, SeverityLevel } from './types';

export const DEFAULT_CONDITION: Condition = {
  key: undefined,
  operator: undefined,
  values: undefined,
};

export const SEVERITY_LEVEL: SeverityLevel[] = [
  {
    type: 'critical',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#ca2621',
    },
    label: 'CRITICAL_ALERT',
    value: 'critical',
  },
  {
    type: 'error',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#f5a623',
    },
    label: 'ERROR_ALERT',
    value: 'error',
  },
  {
    type: 'warning',
    prefixIcon: 'information',
    color: {
      primary: '#fae7e5',
      secondary: '#79879c',
    },
    label: 'WARNING_ALERT',
    value: 'warning',
  },
];
