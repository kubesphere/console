/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DownCircle } from '@kubed/icons';
import { useDisclosure } from '@kubed/hooks';
import { Modal } from '@kubed/components';

import type { FormattedMarketplaceConfig } from '../../../../../types/marketplace';
import { EXTENSIONS_PAGE_PATHS } from '../../../../../constants/extension';
import { getMarketplaceSubscribeURL } from '../../../../../utils/marketplace';
import { getActionButtonProps } from '../../../utils/extension.marketplace';
import type { FormattedExtension } from '../../../../../stores/extension';
import {
  DetailActionButton,
  ListManageButton,
  ListSubscribeButton,
  ConfirmModalContent,
} from './ActionButtons.styles';

interface ExtensionProps {
  page: 'list' | 'detail';
  formattedExtension: FormattedExtension;
  formattedMarketplaceConfig: FormattedMarketplaceConfig | undefined;
}

function ActionButtons({ page, formattedExtension, formattedMarketplaceConfig }: ExtensionProps) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const modal = useDisclosure();

  const isListPage = page === 'list';
  const { name, marketplace } = formattedExtension;

  const { actionType } = getActionButtonProps({
    extensionMarketplace: marketplace,
    marketplaceRepoName: formattedMarketplaceConfig?.repository?.repoName,
  });

  const handleSubscribeButtonClick = () => {
    if (formattedMarketplaceConfig?.isBound) {
      const subscribeUrl = getMarketplaceSubscribeURL({
        baseURL: formattedMarketplaceConfig?.baseURL,
        pathParams: {
          extensionId: marketplace.extensionId ?? '',
        },
        searchParams: {
          user_id: formattedMarketplaceConfig?.account?.userID ?? '',
        },
        referer: `${pathname}${search}`,
      });
      window.location.href = subscribeUrl;
    } else {
      modal.open();
    }
  };

  const handleManageButtonClick = () => navigate(EXTENSIONS_PAGE_PATHS.manager.getDetail(name));

  if (actionType === 'subscribe') {
    return (
      <>
        {isListPage ? (
          <ListSubscribeButton
            disabled={!formattedMarketplaceConfig}
            onClick={handleSubscribeButtonClick}
          >
            {t('SUBSCRIBE')}
          </ListSubscribeButton>
        ) : (
          <DetailActionButton
            disabled={!formattedMarketplaceConfig}
            onClick={handleSubscribeButtonClick}
          >
            {t('SUBSCRIBE')}
          </DetailActionButton>
        )}
        <Modal
          visible={modal.isOpen}
          title={t('BIND_MARKETPLACE_ACCOUNT')}
          okText={t('GO')}
          onOk={() => navigate(EXTENSIONS_PAGE_PATHS.manager.index)}
          onCancel={modal.close}
        >
          <ConfirmModalContent>{t('BIND_MARKETPLACE_ACCOUNT_DESCRIPTION')}</ConfirmModalContent>
        </Modal>
      </>
    );
  }

  return isListPage ? (
    <ListManageButton leftIcon={<DownCircle size={16} />} onClick={handleManageButtonClick}>
      {t('MANAGE')}
    </ListManageButton>
  ) : (
    <DetailActionButton onClick={handleManageButtonClick}>{t('MANAGE')}</DetailActionButton>
  );
}

export { ActionButtons };
