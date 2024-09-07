/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useState, useRef, useEffect } from 'react';
import { stringify } from 'qs';

import type { WebSocketClientOptions } from '../../utils';
import { WebSocketClient, urlHelper } from '../../utils';

const { getWebSocketProtocol, getClusterUrl } = urlHelper;

interface UseBaseWebSocketOptions<T> extends WebSocketClientOptions<T> {
  url: string;
  params?: any;
  enabled?: boolean;
}

export type { UseBaseWebSocketOptions };

export function useBaseWebSocket<T>({
  url,
  params,
  enabled = true,
  ...websocketClientOptions
}: UseBaseWebSocketOptions<T>) {
  const protocol = getWebSocketProtocol(window.location.protocol);
  const { host } = window.location;
  const pathname = getClusterUrl(`/${url}`);

  const [message, setMessage] = useState<T>();

  const { onMessage, ...rest } = websocketClientOptions;

  const query = stringify(params, {
    addQueryPrefix: true,
  });
  const finalUrl = `${protocol}://${host}${pathname}${query}`;

  const websocketRef = useRef<WebSocketClient<T>>();

  useEffect(() => {
    if (enabled) {
      websocketRef.current = new WebSocketClient<T>(finalUrl, {
        ...rest,
        onMessage: (data, ev) => {
          setMessage(data);
          if (typeof onMessage === 'function') {
            onMessage(data, ev);
          }
        },
      });

      return () => websocketRef.current?.close(true);
    }
  }, [enabled, finalUrl]);

  return { websocketClient: websocketRef.current, message };
}
