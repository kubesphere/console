/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Banner, Button } from '@kubed/components';
import { PlugCircle } from '@kubed/icons';

import { useMarketplaceConfigQuery, useBindMarketplaceMutation } from '../../../stores/marketplace';
import { handleBindMarketplaceSuccess } from '../../../utils/marketplace';
import { Wrapper, StyledEmpty, EmptyButtonsWrapper } from './styles';

export default function AuthException() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const referer = searchParams.get('referer');

  const { formattedMarketplaceConfig } = useMarketplaceConfigQuery();

  const mutation = useBindMarketplaceMutation({
    onSuccess: data =>
      handleBindMarketplaceSuccess({
        formattedMarketplaceConfig,
        params: data,
        referer,
      }),
  });

  return (
    <Wrapper>
      <Banner
        icon={<PlugCircle size={48} />}
        title={t('EXTENSIONS_CENTER')}
        description={t('EXTENSIONS_CENTER_DESCRIPTION')}
        className="mb12"
      />
      <StyledEmpty
        title={t('MARKETPLACE_ACCOUNT_BINDING_FAILED')}
        description={t('MARKETPLACE_ACCOUNT_BINDING_FAILED_DESCRIPTION')}
      >
        <EmptyButtonsWrapper>
          <Button onClick={() => navigate(referer || '/', { replace: true })}>{t('BACK')}</Button>
          <Button
            color="secondary"
            disabled={!formattedMarketplaceConfig}
            loading={mutation.isLoading}
            onClick={() => mutation.mutate()}
          >
            {t('REBIND')}
          </Button>
        </EmptyButtonsWrapper>
      </StyledEmpty>
    </Wrapper>
  );
}
