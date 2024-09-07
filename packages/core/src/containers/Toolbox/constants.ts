/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { DraggableProps } from 'react-draggable';

type DefaultPosition = DraggableProps['defaultPosition'];

export const KS_TOOLBOX_POSITION_KEY = 'ks-toolbox-position';

export const DEFAULT_KS_TOOLBOX_POSITION: DefaultPosition = { x: 0, y: 0 };

export const INTERNAL_TOOL_NAMES = [
  'log-query',
  'event-search',
  'auditing-search',
  'bill',
  'kubeconfig',
  'kubectl',
];

export const EXTENSIONS = [
  { key: 'log-query', extensionName: 'whizard-logging' },
  { key: 'event-search', extensionName: 'whizard-events' },
  { key: 'auditing-search', extensionName: 'whizard-auditing' },
];
