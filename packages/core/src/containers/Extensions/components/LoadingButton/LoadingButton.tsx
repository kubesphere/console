/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { ButtonProps } from '@kubed/components';
import { Button, Loading } from '@kubed/components';

interface LoadingButtonProps {
  buttonProps?: Omit<ButtonProps, 'children'>;
  loadingProps?: Parameters<typeof Loading>[0];
}

export function LoadingButton({ buttonProps, loadingProps }: LoadingButtonProps) {
  return (
    <Button {...buttonProps}>
      <Loading {...loadingProps} />
    </Button>
  );
}
