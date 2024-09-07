/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@kubed/components';

import type { FormattedMarketplaceConfig } from '../../../../../types/marketplace';
import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import type { FormattedExtension } from '../../../../../stores/extension';
import { ActionButtons } from '../ActionButtons';
import {
  Wrapper,
  IconWrapper,
  Icon,
  NameWrapper,
  ProviderWrapper,
  Provider,
  DescriptionWrapper,
  Description,
} from './Extension.styles';

interface ExtensionProps {
  formattedExtension: FormattedExtension;
  formattedMarketplaceConfig: FormattedMarketplaceConfig | undefined;
}

function Extension({ formattedExtension, formattedMarketplaceConfig }: ExtensionProps) {
  const {
    name,
    displayIcon,
    localeDisplayName,
    localeProvider,
    localeDescription,
    // marketplace,
  } = formattedExtension;
  const localeProviderName = localeProvider?.name;
  // const isSubscribed = marketplace?.isSubscribed;
  // const detailPath =
  // EXTENSIONS_PAGE_PATHS[isSubscribed ? 'manager' : 'marketplace'].getDetail(name);
  const detailPath = EXTENSIONS_PAGE_PATHS.marketplace.getDetail(name);

  const ref = useRef<HTMLParagraphElement>(null);
  const descriptionHeight = ref?.current?.clientHeight ?? 0;

  return (
    <Wrapper>
      <IconWrapper>
        <Icon src={displayIcon} alt={localeDisplayName} />
      </IconWrapper>
      <NameWrapper>
        <Link to={detailPath}>{localeDisplayName}</Link>
      </NameWrapper>
      <ProviderWrapper>
        {localeProviderName && (
          <Tooltip content={localeProviderName}>
            <Provider>{t('BY_PROVIDER', { providerName: localeProviderName })}</Provider>
          </Tooltip>
        )}
      </ProviderWrapper>
      <DescriptionWrapper>
        {localeDescription && (
          <Description ref={ref} $height={descriptionHeight}>
            {localeDescription}
          </Description>
        )}
      </DescriptionWrapper>
      <div>
        <ActionButtons
          page="list"
          formattedExtension={formattedExtension}
          formattedMarketplaceConfig={formattedMarketplaceConfig}
        />
      </div>
    </Wrapper>
  );
}

export { Extension };
