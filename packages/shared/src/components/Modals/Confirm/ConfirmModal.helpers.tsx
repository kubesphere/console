import React from 'react';
import { merge } from 'lodash';
import { useTheme } from '@kubed/components';

import type { TitleIconProps, ConfirmModalProps } from './ConfirmModal.types';
import { DEFAULT_TITLE_ICON_PROPS, TITLE_ICON_TYPE_MAP } from './ConfirmModal.constants';

interface TitleIconOptions {
  titleIconProps?: TitleIconProps;
  titleIcon?: ConfirmModalProps['titleIcon'];
}

export function renderTitleIcon({ titleIconProps, titleIcon }: TitleIconOptions) {
  const { palette } = useTheme();

  if (titleIcon) {
    return titleIcon;
  }

  if (!titleIconProps) {
    return null;
  }

  const { icon: Icon, fillColorName } = TITLE_ICON_TYPE_MAP[titleIconProps.type];
  const defaultProps: Omit<TitleIconProps, 'type'> = {
    ...DEFAULT_TITLE_ICON_PROPS,
    fill: palette.colors[fillColorName]?.[2],
  };
  const finalProps = merge({}, defaultProps, titleIconProps);

  return <Icon {...finalProps} />;
}
