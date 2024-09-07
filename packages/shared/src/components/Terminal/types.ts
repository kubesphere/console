/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { ITerminalOptions, ITerminalInitOnlyOptions } from 'xterm';

type TerminalOptions = ITerminalOptions & ITerminalInitOnlyOptions;

interface TerminalProps {
  websocketUrl: string;
  terminalOptions?: TerminalOptions;
  initText?: string;
  isEdgeNode?: boolean;
  isLoading?: boolean;
  uploadUrl?: string;
  downloadUrl?: string;
}

interface TerminalRef {
  resizeTerminal: () => void;
}

interface WebSocketReceiveMessage {
  Op: 'stdout';
  Data: string;
  Cols: number;
  Rows: number;
}

export type { TerminalOptions, TerminalProps, TerminalRef, WebSocketReceiveMessage };
