/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Human } from '@kubed/icons';

import type { FormattedMarketplaceConfig } from '../../../../../types/marketplace';
import { handleBindMarketplaceSuccess } from '../../../../../utils/marketplace';
import { useBindMarketplaceMutation } from '../../../../../stores/marketplace';
import { StyledEmpty, Description, EmptyButton } from './MarketplaceUserEmpty.styles';

interface MarketplaceUserEmptyProps {
  formattedMarketplaceConfig: FormattedMarketplaceConfig | undefined;
}

function MarketplaceUserEmpty({ formattedMarketplaceConfig }: MarketplaceUserEmptyProps) {
  const { pathname, search } = useLocation();

  const mutation = useBindMarketplaceMutation({
    onSuccess: data =>
      handleBindMarketplaceSuccess({
        formattedMarketplaceConfig,
        params: data,
        referer: `${pathname}${search}`,
      }),
  });

  if (!formattedMarketplaceConfig) {
    return null;
  }

  return (
    <StyledEmpty
      image={<Human size={48} />}
      title={t('UNBOUND_MARKETPLACE_ACCOUNT')}
      description={
        <Description
          dangerouslySetInnerHTML={{ __html: t('UNBOUND_MARKETPLACE_ACCOUNT_DESCRIPTION') }}
        />
      }
    >
      <EmptyButton loading={mutation.isLoading} onClick={() => mutation.mutate()}>
        {t('BIND_MARKETPLACE_ACCOUNT')}
      </EmptyButton>
    </StyledEmpty>
  );
}

export { MarketplaceUserEmpty };
