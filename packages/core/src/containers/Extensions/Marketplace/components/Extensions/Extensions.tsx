/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Loading } from '@kubed/components';

import type { FormattedMarketplaceConfig } from '../../../../../types/marketplace';
import type { FormattedExtension } from '../../../../../stores/extension';
import { ExtensionsEmpty } from '../../../components/ExtensionsEmpty';
import { Extension } from './Extension';
import { LoadingWrapper, Wrapper } from './Extensions.styles';

interface ExtensionsProps {
  isLoading: boolean;
  formattedExtensions: FormattedExtension[];
  formattedMarketplaceConfig: FormattedMarketplaceConfig | undefined;
  hasFilters: boolean;
  onFiltersClear: () => void;
}

function Extensions({
  isLoading,
  formattedExtensions,
  formattedMarketplaceConfig,
  hasFilters,
  onFiltersClear,
}: ExtensionsProps) {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  if (formattedExtensions.length === 0) {
    return (
      <ExtensionsEmpty
        hasFilters={hasFilters}
        onRefresh={() => window.location.reload()}
        onFiltersClear={onFiltersClear}
      />
    );
  }

  return (
    <Wrapper>
      {formattedExtensions.map(formattedExtension => (
        <Extension
          key={formattedExtension.uid}
          formattedExtension={formattedExtension}
          formattedMarketplaceConfig={formattedMarketplaceConfig}
        />
      ))}
    </Wrapper>
  );
}

export { Extensions };
