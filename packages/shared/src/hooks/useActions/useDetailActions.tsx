/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { MouseEvent, ReactNode, useMemo } from 'react';
import { CaretDown } from '@kubed/icons';
import { isEmpty, isFunction, isNull } from 'lodash';
import { Dropdown, Menu, MenuItem } from '@kubed/components';

import { DetailAction, GetActionsProps, useEnabledActions } from './utils';
import { DarkMenu, DetailBaseButton, DetailMoreButton } from './styles';

type ActionOptions = {
  limit?: number;
  theme?: string;
};

type Props<T> = {
  actions?: DetailAction<T>[];
  actionOptions?: ActionOptions;
} & GetActionsProps;

const renderBtn = (action: DetailAction) => {
  if (action.render) {
    return action.render();
  }
  const text = isFunction(action.text) ? action.text() : action.text;
  const disabled = isFunction(action.disabled) ? action.disabled() : action.disabled;

  return (
    <DetailBaseButton
      key={action.key}
      disabled={disabled}
      onClick={
        action.onClick ? (e: MouseEvent<HTMLButtonElement>) => action.onClick?.(e) : undefined
      }
      {...(action.props || {})}
    >
      {text}
    </DetailBaseButton>
  );
};

export type { ActionOptions };

export default function useDetailActions<T extends Record<string, any>>({
  authKey,
  params = {},
  actions = [],
  actionOptions = {},
}: Props<T>) {
  const { limit = 2 } = actionOptions;
  const enabledActions = useEnabledActions({ authKey, params });
  const enabledDetailActions = useMemo(
    () =>
      actions.filter(({ action, show }) => {
        const shouldRender = isFunction(show) ? show() : (show ?? true);
        if (!shouldRender) return false;
        return !action || enabledActions.includes(action);
      }),
    [enabledActions, actions],
  );

  const renderMoreMenu = (): ReactNode => {
    const menuItems = enabledDetailActions.slice(limit - 1).map(action => {
      if (action.render) {
        return action.render();
      }
      const icon = isFunction(action.icon) ? action.icon() : action.icon;
      const text = isFunction(action.text) ? action.text() : action.text;
      const disabled = isFunction(action.disabled) ? action.disabled() : action.disabled;

      return (
        <MenuItem
          key={action.key}
          icon={icon}
          disabled={disabled}
          onClick={action.onClick ? e => action.onClick?.(e) : undefined}
          {...(action.props || {})}
        >
          {text}
        </MenuItem>
      );
    });

    return menuItems.every(menuItem => isNull(menuItem)) ? null : <DarkMenu>{menuItems}</DarkMenu>;
  };

  const renderDetailActions = () => {
    if (isEmpty(enabledDetailActions)) {
      return null;
    }

    if (enabledDetailActions.length <= limit) {
      return enabledDetailActions.map(renderBtn);
    }

    const content = renderMoreMenu();

    return (
      <div>
        {renderBtn(enabledDetailActions[0])}
        {isNull(content) ? null : (
          <Dropdown content={content} placement="bottom-start">
            <DetailMoreButton radius="lg">
              {t('MORE')} <CaretDown size={16} />
            </DetailMoreButton>
          </Dropdown>
        )}
      </div>
    );
  };

  return renderDetailActions;
}
