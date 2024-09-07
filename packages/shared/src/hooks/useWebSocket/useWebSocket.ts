/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { get } from 'lodash';

import { Constants } from '../../constants';
import type { UseBaseWebSocketOptions } from './useBaseWebSocket';
import { useBaseWebSocket } from './useBaseWebSocket';

const { MODULE_KIND_MAP } = Constants;

interface OriginalWebSocketMessage<TOriginalItem> extends Record<string, any> {
  type: 'ADDED' | 'DELETED' | 'MODIFIED';
  object: TOriginalItem;
}

interface FormattedWebSocketMessage<TOriginalItem, TFormattedItem>
  extends OriginalWebSocketMessage<TOriginalItem> {
  formattedItem?: TFormattedItem;
}

type OnMessage<TOriginalItem, TFormattedItem> = (
  data: { kind: string; message: FormattedWebSocketMessage<TOriginalItem, TFormattedItem> },
  ev: MessageEvent<OriginalWebSocketMessage<TOriginalItem>>,
) => void;

interface UseWebSocketOptions<
  TOriginalItem extends Record<string, any> = Record<string, any>,
  TFormattedItem extends Record<string, any> = Record<string, any>,
> extends Omit<UseBaseWebSocketOptions<OriginalWebSocketMessage<TOriginalItem>>, 'onMessage'> {
  module: string;
  isFederated?: boolean;
  isMatchKind?: boolean;
  format?: (originalData: TOriginalItem) => TFormattedItem;
  onMessage?: OnMessage<TOriginalItem, TFormattedItem>;
  onAdded?: OnMessage<TOriginalItem, TFormattedItem>;
  onDeleted?: OnMessage<TOriginalItem, TFormattedItem>;
  onAddedOrDeleted?: OnMessage<TOriginalItem, TFormattedItem>;
  onModified?: OnMessage<TOriginalItem, TFormattedItem>;
}

function isMatchKindFn<TOriginalItem>(
  message: OriginalWebSocketMessage<TOriginalItem>,
  kind: string,
  isForceMatch?: boolean,
) {
  if (isForceMatch) {
    return true;
  }

  // @ts-ignore
  return message?.object?.kind === kind;
}

function handleMessage<TOriginalItem, TFormattedItem>({
  message,
  format,
}: {
  message: OriginalWebSocketMessage<TOriginalItem>;
  format: (originalData: TOriginalItem) => TFormattedItem;
}): FormattedWebSocketMessage<TOriginalItem, TFormattedItem> {
  const formattedItem = format(message?.object);
  return { ...message, formattedItem };
}

export type { UseWebSocketOptions, OriginalWebSocketMessage, FormattedWebSocketMessage };

export function useWebSocket<
  TOriginalItem extends Record<string, any>,
  TFormattedItem extends Record<string, any>,
>({
  module,
  isFederated,
  isMatchKind = true,
  format,
  ...useWebSocketOptions
}: UseWebSocketOptions<TOriginalItem, TFormattedItem>) {
  const isForceMatch = !isMatchKind;
  const {
    onMessage: onMsg,
    onAdded,
    onDeleted,
    onAddedOrDeleted,
    onModified,
  } = useWebSocketOptions;
  let kind: string = get(MODULE_KIND_MAP, module, '');
  if (isFederated) {
    kind = `Federated${kind}`;
  }

  // TODO: Missing federated? May not be missing? Need more usage and testing.
  const formatFn = (() => {
    if (typeof format === 'function') {
      return format;
    }

    return (originalData: TOriginalItem) => originalData as unknown as TFormattedItem;
  })();

  const onMessage: UseBaseWebSocketOptions<OriginalWebSocketMessage<TOriginalItem>>['onMessage'] = (
    msg,
    ev,
  ) => {
    if (msg) {
      if (isMatchKindFn(msg, kind, isForceMatch)) {
        const { type } = msg;
        const formattedMsg = handleMessage<TOriginalItem, TFormattedItem>({
          message: msg,
          format: formatFn,
        });

        if (typeof onMsg === 'function') {
          onMsg({ kind, message: formattedMsg }, ev);
        }

        if (type === 'ADDED' && typeof onAdded === 'function') {
          onAdded({ kind, message: formattedMsg }, ev);
        }

        if (type === 'DELETED' && typeof onDeleted === 'function') {
          onDeleted({ kind, message: formattedMsg }, ev);
        }

        if (['ADDED', 'DELETED'].includes(type) && typeof onAddedOrDeleted === 'function') {
          onAddedOrDeleted({ kind, message: formattedMsg }, ev);
        }

        if (type === 'MODIFIED' && typeof onModified === 'function') {
          onModified({ kind, message: formattedMsg }, ev);
        }
      }
    }
  };
  const { message } = useBaseWebSocket<OriginalWebSocketMessage<TOriginalItem>>({
    ...useWebSocketOptions,
    onMessage,
  });

  if (message && isMatchKindFn(message, kind, isForceMatch)) {
    const formattedMessage = handleMessage<TOriginalItem, TFormattedItem>({
      message,
      format: formatFn,
    });

    return {
      kind,
      matchKind: message?.object?.kind === kind,
      message: formattedMessage,
    };
  }

  return { kind };
}
