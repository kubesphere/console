/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useDisclosure } from '@kubed/hooks';
import {
  useTheme,
  notify,
  Loading,
  Dropdown,
  Menu,
  MenuLabel,
  MenuItem,
  Divider,
  Field,
  Modal,
} from '@kubed/components';
import { HumanRefresh, Human, Apps, Deal, Stop } from '@kubed/icons';

import type { FormattedMarketplaceConfig } from '../../../../../types/marketplace';
import { getMarketplaceURL } from '../../../../../utils/marketplace';
import {
  useSyncMarketplaceMutation,
  useUnbindMarketplaceMutation,
} from '../../../../../stores/marketplace';
import { AvatarButton, AvatarLarge, ConfirmModalContent } from './MarketplaceAccount.styles';

interface MarketplaceAccountProps {
  formattedMarketplaceConfig: FormattedMarketplaceConfig;
  onSyncMarketplaceAccountSuccess: () => void;
  onUnbindSuccess: () => void;
}

function MarketplaceAccount({
  formattedMarketplaceConfig,
  onSyncMarketplaceAccountSuccess,
  onUnbindSuccess,
}: MarketplaceAccountProps) {
  const { palette } = useTheme();
  const modal = useDisclosure();

  const syncMarketplaceMutation = useSyncMarketplaceMutation({
    onSuccess: () => {
      notify.success(t('SYNC_MARKETPLACE_ACCOUNT_SUCCESSFULLY'));
      onSyncMarketplaceAccountSuccess();
    },
  });

  const unbindMarketplaceMutation = useUnbindMarketplaceMutation({
    onSuccess: () => {
      modal.close();
      notify.success(t('UNBIND_SUCCESSFULLY'));
      onUnbindSuccess();
    },
  });

  const { baseURL, account } = formattedMarketplaceConfig;
  const { userID, username, email, displayHeadImageURL } = account;
  const searchParams = { user_id: userID ?? '' };
  const getUrl = (path: string) =>
    getMarketplaceURL({
      baseURL,
      path,
      searchParams,
    });

  const items = [
    {
      action: 'button',
      icon: syncMarketplaceMutation.isLoading ? Loading : HumanRefresh,
      isDisabled: syncMarketplaceMutation.isLoading,
      text: t('SYNC_MARKETPLACE_ACCOUNT'),
      onClick: () => syncMarketplaceMutation.mutate(),
    },
    {
      action: 'link',
      icon: Human,
      text: t('MARKETPLACE_ACCOUNT_SETTINGS'),
      url: getUrl('/user/setting'),
    },
    {
      action: 'link',
      icon: Apps,
      text: t('SUBSCRIPTION_MANAGEMENT'),
      url: getUrl('/subscribe'),
    },
    {
      action: 'link',
      icon: Deal,
      text: t('ORDER_MANAGEMENT'),
      url: getUrl('/user/order'),
    },
    {
      action: 'button',
      icon: Stop,
      text: t('UNBIND_MARKETPLACE_ACCOUNT'),
      onClick: modal.open,
    },
  ];

  return (
    <>
      <Dropdown
        content={
          <Menu>
            <MenuLabel>
              <Field
                avatar={<AvatarLarge src={displayHeadImageURL} alt={username} />}
                value={username || '-'}
                label={email || '-'}
              />
            </MenuLabel>
            <Divider margins={0} style={{ borderTopColor: palette.accents_1 }} />
            {items.map(({ action, icon: Icon, isDisabled, text, url, onClick }, index) => {
              const handleClick = action === 'link' ? () => window.open(url) : onClick;

              return (
                <MenuItem
                  key={index}
                  icon={<Icon size={16} />}
                  disabled={isDisabled}
                  onClick={handleClick}
                >
                  {text}
                </MenuItem>
              );
            })}
          </Menu>
        }
      >
        <AvatarButton src={displayHeadImageURL} alt={username} />
      </Dropdown>
      <Modal
        visible={modal.isOpen}
        title={t('UNBIND_MARKETPLACE_ACCOUNT')}
        okText={t('UNBIND')}
        confirmLoading={unbindMarketplaceMutation.isLoading}
        onOk={() => unbindMarketplaceMutation.mutate()}
        onCancel={modal.close}
      >
        <ConfirmModalContent>{t('UNBIND_MARKETPLACE_ACCOUNT_DESCRIPTION')}</ConfirmModalContent>
      </Modal>
    </>
  );
}

export { MarketplaceAccount };
