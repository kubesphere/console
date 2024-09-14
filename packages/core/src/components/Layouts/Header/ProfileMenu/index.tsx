/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Human,
  CaretDown,
  Wrench,
  Logout,
  Information,
  Loudspeaker,
  MessageCircleDuotone,
} from '@kubed/icons';
import { Dropdown, Field, Menu, MenuItem, useModal } from '@kubed/components';
import { LoginWrapper, NotLogin, Avatar, NotifiContext } from './styles';
import About from '../About';
import UserSetting from '../UserSetting';
import { hasKSModule, useV3action } from '@ks-console/shared';
import WujieReact from 'wujie-react';

import {
  getGlobalConsoleV3LoadCompleted,
  removeGlobalConsoleV3LoadCompleted,
} from '../../../../utils/globals.consoleV3LoadCompleted';

interface ProfileMenuProps {
  isLogin: boolean;
}

const { bus } = WujieReact;

const ProfileMenu = ({ isLogin }: ProfileMenuProps) => {
  const navigate = useNavigate();

  const modal = useModal();
  const { open, render: renderV3Modal } = useV3action();
  const [v3Completed, setV3Completed] = useState<boolean>(getGlobalConsoleV3LoadCompleted());

  useEffect(() => {
    let isMounted = true;
    removeGlobalConsoleV3LoadCompleted();

    if (!getGlobalConsoleV3LoadCompleted()) {
      bus.$on('loadCompleted', (name: string) => {
        if (name === 'consolev3' && isMounted) {
          setV3Completed(true);
          modal.close('notification');
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLogin) {
    return (
      <NotLogin>
        <Human className="icon-human" />
        <a href={`/login?referer=${location.pathname}`}>{t('Log in KubeSphere')}</a>
      </NotLogin>
    );
  }

  const openAboutModal = () => {
    modal.open({
      header: null,
      footer: null,
      content: <About />,
      width: 600,
      closable: false,
    });
  };

  const openUserSettingModal = () => {
    modal.open({
      title: t('USER_SETTINGS'),
      titleIcon: <Wrench />,
      width: 1162,
      content: <UserSetting />,
      okButtonProps: { style: { display: 'none' } },
    });
  };

  const openNotificationV3Modal = () => {
    open({
      action: 'notification.user.setting',
      v3Module: 'userStore',
      v3StoreParams: {},
    });
  };

  const userMenu = (
    <Menu>
      <MenuItem icon={<Wrench />} onClick={openUserSettingModal}>
        {t('USER_SETTINGS')}
      </MenuItem>
      {hasKSModule('whizard-notification') && v3Completed && (
        <MenuItem icon={<Loudspeaker />} onClick={openNotificationV3Modal}>
          <NotifiContext>{t('NOTIFICATION_SETTINGS')}</NotifiContext>
        </MenuItem>
      )}
      <MenuItem icon={<Logout />} as="a" href="/logout">
        {t('LOG_OUT')}
      </MenuItem>
      <MenuItem icon={<Information />} onClick={openAboutModal}>
        {t('ABOUT')}
      </MenuItem>
      <MenuItem icon={<MessageCircleDuotone />} onClick={() => navigate('/support')}>
        {t('TECHNICAL_SUPPORT')}
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      {renderV3Modal()}
      <Dropdown content={userMenu} placement="bottom-start">
        <LoginWrapper>
          <Field
            value={globals.user.username}
            avatar={<Avatar src="/assets/default-user.svg" />}
            label={globals.user.globalrole}
          />
          <CaretDown className="caret-down" />
        </LoginWrapper>
      </Dropdown>
    </div>
  );
};

export default ProfileMenu;
