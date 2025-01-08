/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EmptyProps } from '@kubed/components';
import { PlugCircle } from '@kubed/icons';

import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import { EmptyButton } from './ExtensionsEmpty.styles';

function Button() {
  const navigate = useNavigate();

  return (
    <EmptyButton onClick={() => navigate(EXTENSIONS_PAGE_PATHS.marketplace.index)}>
      {t('DISCOVER_EXTENSIONS')}
    </EmptyButton>
  );
}

export function getExtensionsEmptyProps(): PropsWithChildren<EmptyProps> {
  return {
    style: { paddingBottom: 80 },
    image: <PlugCircle size={48} />,
    title: t('SUBSCRIPTION_EXTENSION_NOT_FOUND'),
    description: t('SUBSCRIPTION_EXTENSION_NOT_FOUND_DESCRIPTION'),
    children: <Button />,
  };
}
