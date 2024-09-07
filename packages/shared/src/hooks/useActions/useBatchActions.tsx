/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { useMemo } from 'react';
import { BatchActionButton } from './styles';
import { GetActionsProps, renderByActions, TableAction, useEnabledActions } from './utils';

type Props = {
  actions?: TableAction[];
} & GetActionsProps;

export default function useBatchActions({ authKey, params, actions = [] }: Props) {
  const enabledActions = useEnabledActions({ authKey, params });
  const enabledBatchActions = useMemo(
    () => actions.filter(({ action }) => !action || enabledActions.includes(action)),
    [enabledActions, actions],
  );
  return renderByActions(enabledBatchActions, BatchActionButton);
}
