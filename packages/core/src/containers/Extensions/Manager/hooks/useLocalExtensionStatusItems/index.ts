/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { find, isEqual, sortBy } from 'lodash';
import { useCallback, useMemo, useState } from 'react';

type LocalExtensionStatus =
  | undefined
  | 'localInstalling'
  | 'localUpgrading'
  | 'localUninstalling'
  | 'localForceUninstalling';

interface LocalExtensionStatusItem {
  extensionName: string;
  status: LocalExtensionStatus;
}

function useLocalExtensionStatusItems(initialState?: LocalExtensionStatusItem[]) {
  const initialLocalExtensionStatusItems = initialState ?? [];

  const [localExtensionStatusItems, setLocalExtensionStatusItems] = useState<
    LocalExtensionStatusItem[]
  >(initialLocalExtensionStatusItems);

  const memoizedLocalExtensionStatusItems = useMemo(
    () => sortBy(localExtensionStatusItems, ['extensionName', 'status']),
    [localExtensionStatusItems],
  );

  const getLocalExtensionStatusItem = useCallback(
    ({ extensionName }: Pick<LocalExtensionStatusItem, 'extensionName'>) =>
      find<LocalExtensionStatusItem>(memoizedLocalExtensionStatusItems, {
        extensionName,
      }),
    [memoizedLocalExtensionStatusItems],
  );

  const setLocalExtensionStatusItem = useCallback(
    ({ extensionName, status }: LocalExtensionStatusItem) => {
      const newState = memoizedLocalExtensionStatusItems.map(item => {
        if (item.extensionName === extensionName) {
          return { extensionName, status };
        }

        return item;
      });

      if (!isEqual(memoizedLocalExtensionStatusItems, newState)) {
        setLocalExtensionStatusItems(newState);
      }
    },
    [memoizedLocalExtensionStatusItems],
  );

  const resetLocalExtensionStatusItem = useCallback(
    ({ extensionName }) => {
      setLocalExtensionStatusItem({
        extensionName,
        status: undefined,
      });
    },
    [setLocalExtensionStatusItem],
  );

  return {
    localExtensionStatusItems: memoizedLocalExtensionStatusItems,
    setLocalExtensionStatusItems,
    getLocalExtensionStatusItem,
    setLocalExtensionStatusItem,
    resetLocalExtensionStatusItem,
  };
}

export type { LocalExtensionStatus };
export { useLocalExtensionStatusItems };
