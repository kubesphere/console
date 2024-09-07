/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { ReactNode } from 'react';

export interface Tool {
  key?: string;
  name: string;
  icon: string;
  title: string;
  description: string;
  link: string;
  action: string;
  isShown: boolean;
  isDisabled?: boolean;
  isThirdPartyTool?: boolean;
}

export interface ToolGroup {
  name: string;
  // key: string;
  title: string;
  tools: Tool[];
}

export interface Action {
  isOpen: boolean;
  modal: ReactNode;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
