/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, DropdownProps, Menu, MenuItem } from '@kubed/components';
import { isEmpty, isFunction, compact } from 'lodash';
import { More, CaretDown } from '@kubed/icons';

import { getActions } from '../../utils';

const DropdownButton = styled(Button)`
  padding: 0 12px 0 16px;

  span {
    &:nth-child(2) {
      margin-left: 3px;
    }
  }

  &[aria-expanded='true'] {
    .kubed-icon {
      transform: rotate(180deg);
    }
  }
`;

export interface Action<T = Record<string, any>, P = Record<string, any>> {
  key: string;
  action?: string;
  props?: P;
  render?: (record: T) => ReactNode;
  disabled?: boolean | ((record: T) => boolean);
  icon?: ReactNode | ((record: T) => ReactNode);
  text?: ReactNode | ((record: T) => ReactNode);
  show?: boolean | ((record: T) => boolean);
  onClick?: (record: T) => void;
}

export interface ActionMenuProps<T, P> {
  mode?: 'dropdown' | 'button';
  authKey?: string;
  params?: Record<string, any>;
  actions: Action<T, P>[];
  autoSingleButton?: boolean;
  dropdownTheme?: 'dark' | 'light';
  dropdownType?: 'icon' | 'text';
  dropdownText?: string | ReactNode;
  dropdownProps?: Partial<DropdownProps>;
  // dropdownButton?: ReactNode;
}

const useActionMenu = <T extends Record<string, any>, P = void>({
  authKey,
  params = {},
  actions = [],
  mode = 'dropdown',
  autoSingleButton = false,
  dropdownTheme = 'light',
  dropdownText = t('MORE'),
  dropdownType = 'icon',
  dropdownProps,
}: ActionMenuProps<T, P>) => {
  const enabledActions = useMemo(() => {
    const allEnabledActions = getActions({
      module: authKey,
      ...params,
      project: params.namespace,
      devops: params.devops,
    });

    return actions.filter(({ action }) => !action || allEnabledActions.includes(action));
  }, [actions, authKey, params]);

  const getActionProps = (record: T) => {
    const actionProps = enabledActions.map(item => {
      const { show, onClick, ...rest } = item;

      const disabled = isFunction(rest.disabled) ? rest.disabled(record) : rest.disabled;
      const text = isFunction(rest.text) ? rest.text(record) : rest.text;
      const icon = isFunction(rest.icon) ? rest.icon(record) : rest.icon;
      const shouldRender = isFunction(show) ? show(record) : (show ?? true);
      if (!shouldRender) return null;

      return {
        ...item,
        disabled,
        text,
        icon,
      };
    });

    return compact(actionProps);
  };

  const renderButtons = (items: Partial<Action<T, P>>[], record: T) => {
    return items.map(item => {
      const { text, key, disabled, icon, onClick, props } = item;
      return (
        <Button
          key={key}
          disabled={!!disabled}
          leftIcon={icon}
          onClick={onClick && !disabled ? () => onClick?.(record) : undefined}
          {...props}
        >
          {text}
        </Button>
      );
    });
  };

  const renderMenuItems = (items: Partial<Action<T, P>>[], record: T) => {
    return items.map(item => {
      const { text, key, disabled, icon, onClick, props } = item;
      return (
        <MenuItem
          key={key}
          icon={icon}
          disabled={!!disabled}
          onClick={onClick && !disabled ? () => onClick?.(record) : undefined}
          {...(props || {})}
        >
          {text}
        </MenuItem>
      );
    });
  };

  const render = (record: T) => {
    const enabledActionsProps = getActionProps(record);
    if (isEmpty(enabledActionsProps)) {
      return null;
    }

    if (mode === 'button' || (autoSingleButton && enabledActionsProps.length === 1)) {
      return renderButtons(enabledActionsProps, record);
    }

    const content = (
      <Menu themeType={dropdownTheme}>{renderMenuItems(enabledActionsProps, record)}</Menu>
    );

    const dropdownButton =
      dropdownType === 'icon' ? (
        <Button variant="text" radius="lg">
          <More size={16} />
        </Button>
      ) : (
        <DropdownButton radius="lg" rightIcon={<CaretDown />}>
          {dropdownText}
        </DropdownButton>
      );

    return (
      <Dropdown placement="bottom-end" content={content} {...dropdownProps}>
        {dropdownButton}
      </Dropdown>
    );
  };

  return render;
};

export default useActionMenu;
