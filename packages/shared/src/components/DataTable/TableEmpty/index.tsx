/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import type { EmptyProps } from '@kubed/components';

import type { CreateButtonProps } from './CreateButton';
import { CreateButton } from './CreateButton';
import { StyledEmpty, ButtonWrapper } from './styles';

export type TableEmptyProps = PropsWithChildren<EmptyProps & CreateButtonProps>;

export function TableEmpty({
  createButton,
  clickCreateButtonFn,
  children,
  ...emptyProps
}: TableEmptyProps) {
  return (
    <StyledEmpty {...emptyProps}>
      {createButton && (
        <ButtonWrapper>
          <CreateButton createButton={createButton} clickCreateButtonFn={clickCreateButtonFn} />
        </ButtonWrapper>
      )}
      {children}
    </StyledEmpty>
  );
}
