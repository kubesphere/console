/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';
import { isEmpty, isFunction, isNull } from 'lodash';
import { More } from '@kubed/icons';
import { Dropdown, Menu, MenuItem, Button } from '@kubed/components';
import { GetActionsProps, ItemAction, useEnabledActions } from './utils';

type Props<T> = {
  actions?: ItemAction<T>[];
  appendTo?: 'parent' | Element | ((ref: Element) => Element);
} & GetActionsProps;

export default function useItemActions<T extends Record<string, any>>({
  authKey,
  params = {},
  appendTo = 'parent',
  actions = [],
}: Props<T>) {
  const enabledActions = useEnabledActions({ authKey, params });
  const enabledItemActions = useMemo(
    () => actions.filter(({ action }) => !action || enabledActions.includes(action)),
    [enabledActions, actions],
  );

  const renderMoreMenu = (record: T): ReactNode => {
    const menuItems = enabledItemActions.map(action => {
      if (action.render) {
        return action.render(record);
      }
      const shouldRender = isFunction(action.show) ? action.show(record) : (action.show ?? true);
      const icon = isFunction(action.icon) ? action.icon(record) : action.icon;
      const text = isFunction(action.text) ? action.text(record) : action.text;
      const disabled = isFunction(action.disabled) ? action.disabled(record) : action.disabled;
      if (!shouldRender) return null;

      return (
        <MenuItem
          key={action.key}
          icon={icon}
          disabled={disabled}
          onClick={action.onClick && !disabled ? e => action.onClick?.(e, record) : undefined}
          {...(action.props || {})}
        >
          {text}
        </MenuItem>
      );
    });

    return menuItems.every(menuItem => isNull(menuItem)) ? null : <Menu>{menuItems}</Menu>;
  };

  const renderItemActions = (field: string, record: T) => {
    if (isEmpty(enabledItemActions)) {
      return null;
    }

    const content = renderMoreMenu(record);

    return isNull(content) ? null : (
      <Dropdown placement="bottom-end" content={content} appendTo={appendTo}>
        <Button variant="text" radius="lg">
          <More size={16} />
        </Button>
      </Dropdown>
    );
  };

  return renderItemActions;
}
