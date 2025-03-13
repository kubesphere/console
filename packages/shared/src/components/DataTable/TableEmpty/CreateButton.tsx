/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ReactNode, ReactElement, MouseEvent } from 'react';

import { StyledButton } from './CreateButton.styles';

export interface CreateButtonProps {
  createButton?: boolean | ReactElement;
  createButtonText?: ReactNode;
  clickCreateButtonFn?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function CreateButton({
  createButton,
  createButtonText,
  clickCreateButtonFn,
}: CreateButtonProps) {
  if (createButton === true) {
    return (
      <StyledButton onClick={clickCreateButtonFn}>{createButtonText ?? t('CREATE')}</StyledButton>
    );
  }

  if (!createButton) {
    return null;
  }

  return createButton;
}
