import type { ReactNode } from 'react';
import type { ModalProps } from '@kubed/components';
import type { Props } from '@kubed/icons';

export interface TitleIconProps extends Props {
  type: 'warning' | 'info' | 'error';
}

export interface ConfirmModalProps extends Omit<ModalProps, 'title' | 'titleIcon'> {
  titleIconProps?: TitleIconProps;
  titleIcon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
}
