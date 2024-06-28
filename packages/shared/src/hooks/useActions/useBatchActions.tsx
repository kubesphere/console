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
