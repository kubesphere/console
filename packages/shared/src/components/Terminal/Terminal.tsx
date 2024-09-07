/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

// import 'xterm/css/xterm.css';

import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { merge, debounce } from 'lodash';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

import { WebSocketClient } from '../../utils/websocket.client';
import type { TerminalProps, TerminalRef, WebSocketReceiveMessage } from './types';
import { DEFAULT_TERMINAL_OPTIONS, DEFAULT_TERMINAL_PROPS } from './constants';
import { stringifyResize, stringifyStdin } from './utils';

export default forwardRef<TerminalRef, Omit<TerminalProps, 'isLoading'>>(function Terminal(
  {
    websocketUrl,
    terminalOptions,
    initText = DEFAULT_TERMINAL_PROPS.initText,
    isEdgeNode = DEFAULT_TERMINAL_PROPS.isEdgeNode,
  },
  ref,
) {
  const finalTerminalOptions = merge({}, DEFAULT_TERMINAL_OPTIONS, terminalOptions);

  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<XTerm>();
  const fitAddonRef = useRef<FitAddon>();
  const websocketRef = useRef<WebSocketClient<WebSocketReceiveMessage>>();

  const isFirstRef = useRef(true);
  const renderConnectingTimer = useRef<number | null>(null);
  const fitTerminalTimer = useRef<number | null>(null);

  const getIsWebSocketOpen = () => websocketRef.current?.client?.readyState === WebSocket.OPEN;

  const clearRenderConnectingTimer = () => {
    if (renderConnectingTimer.current) {
      window.clearInterval(renderConnectingTimer.current);
    }
  };

  const clearFitTerminalTimer = () => {
    if (fitTerminalTimer.current) {
      window.clearInterval(fitTerminalTimer.current);
    }
  };

  const renderConnecting = () => {
    let count = 0;
    return window.setInterval(() => {
      terminalRef.current?.reset();
      terminalRef.current?.write(`${initText}${'.'.repeat(++count)}`);
      if (count > 2) {
        count = 0;
      }
    }, 500);
  };

  const disableTerminalStdin = (disabled: boolean = true) => {
    const textarea = terminalRef.current?.textarea;
    if (textarea) {
      textarea.disabled = disabled;
    }
  };

  const resizeRemoteTerminal = () => {
    const cols = terminalRef.current?.cols;
    const rows = terminalRef.current?.rows;
    if (getIsWebSocketOpen() && typeof rows === 'number' && typeof cols === 'number') {
      const message = stringifyResize({ cols, rows });
      websocketRef.current?.send(message);
    }
  };

  const fatal = (message?: string) => {
    const isFirst = isFirstRef.current;
    let data = '';
    if (!message && isFirst) {
      data = `Could not connect to the ${
        isEdgeNode ? 'node' : 'container'
      }. Do you have sufficient privileges?`;
    } else if (!message) {
      data = 'disconnected';
    } else if (!isFirst) {
      data = `\r\n${message}`;
    } else if (isFirst) {
      terminalRef.current?.reset();
    }

    terminalRef.current?.write(`\x1b[31m${data}\x1b[m\r\n`);
  };

  const onWebSocketMessage = (data: WebSocketReceiveMessage) => {
    clearRenderConnectingTimer();

    if (isFirstRef.current) {
      isFirstRef.current = false;
      disableTerminalStdin(false);
      terminalRef.current?.reset();
      if (terminalRef.current?.element) {
        terminalRef.current.focus();
      }
      resizeRemoteTerminal();
    }

    terminalRef.current?.write(data.Data);
  };

  const onWebSocketError = (event: Event) => {
    clearRenderConnectingTimer();
    // @ts-ignore
    fatal(event.message);
  };

  const fitTerminal = () => fitAddonRef.current?.fit();

  const pollingFitTerminal = () => {
    fitTerminalTimer.current = window.setInterval(() => {
      const lastCols = terminalRef.current?.cols;
      fitTerminal();
      const currentCols = terminalRef.current?.cols;
      if (typeof currentCols === 'number' && lastCols === currentCols) {
        clearFitTerminalTimer();
      }
    }, 100);
  };

  const onResize = debounce(fitTerminal, 800);

  const onTerminalResize = () => {
    window.addEventListener('resize', onResize);
    terminalRef.current?.onResize(resizeRemoteTerminal);
  };

  const sendTerminalInput = (data: string) => {
    if (getIsWebSocketOpen()) {
      const message = stringifyStdin(data);
      websocketRef.current?.send(message);
    }
  };

  const disconnect = () => {
    disableTerminalStdin();
    websocketRef.current?.close(true);
  };

  const removeResizeListener = () => {
    window.removeEventListener('resize', onResize);
  };

  useImperativeHandle(ref, () => ({ resizeTerminal: onResize }), []);

  // init terminal
  useEffect(() => {
    terminalRef.current = new XTerm(finalTerminalOptions);
    fitAddonRef.current = new FitAddon();
    terminalRef.current?.loadAddon(fitAddonRef.current);

    if (containerRef.current) {
      terminalRef.current.open(containerRef.current);
      renderConnectingTimer.current = renderConnecting();
      fitTerminal();

      onTerminalResize();
      terminalRef.current?.onData(sendTerminalInput);

      disableTerminalStdin();

      // TODO: hack
      pollingFitTerminal();
    }

    return () => {
      terminalRef.current?.dispose();
      disconnect();
      removeResizeListener();
      clearRenderConnectingTimer();
      clearFitTerminalTimer();
    };
  }, []);

  // init WebSocket
  useEffect(() => {
    if (websocketRef.current) {
      websocketRef.current?.close(true);
    }
    websocketRef.current = new WebSocketClient(websocketUrl, {
      onMessage: onWebSocketMessage,
      onError: onWebSocketError,
      reopenLimit: Number.MAX_SAFE_INTEGER,
    });
    return () => disconnect();
  }, [websocketUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
});
