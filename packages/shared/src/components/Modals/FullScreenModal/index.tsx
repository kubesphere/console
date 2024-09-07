/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { merge } from 'lodash';
import type { ModalProps } from '@kubed/components';

import { PADDING, StyledModal } from './styles';

type FullScreenModalProps = PropsWithChildren<ModalProps>;

const DEFAULT_PROPS: Partial<FullScreenModalProps> = {
  width: `calc(100vw - ${PADDING * 2}px)`,
  style: { minWidth: '1000px', paddingBottom: 0 },
};

function FullScreenModal(props: FullScreenModalProps) {
  const finalProps: FullScreenModalProps = merge({}, DEFAULT_PROPS, props);

  return <StyledModal {...finalProps} />;
}

export type { FullScreenModalProps };
export { FullScreenModal };
