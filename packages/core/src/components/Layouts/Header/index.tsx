/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import type { ButtonProps } from '@kubed/components';
import { Button } from '@kubed/components';
import { Dashboard, Cogwheel, PlugCircle } from '@kubed/icons';
import {
  checker,
  useGlobalStore,
  useEventEmitter,
  permissionStore,
  hasPermission,
  Icon,
} from '@ks-console/shared';

import { EXTENSIONS_PAGE_PATHS } from '../../../constants/extension';
import ProfileMenu from './ProfileMenu';
import ExtensionComp from './ExtensionComp';

import { Root, NavbarWrapper, NavbarBottom, NavbarLeft, LogoWrapper, NavbarRight } from './styles';

const {
  isAppsPage: getIsAppsPage,
  isDarkHeader: getIsDarkHeader,
  isExtensionsMarketplacePage: getIsExtensionPage,
  isTransparentHeader: getIsTransparentHeader,
} = checker;

const { getGlobalNavs } = permissionStore();
const platformNavKey = 'GLOBAL_NAV';

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const kseLogo = globals.config.logo || globals.defaultTheme.logo;
  const logo = globals.useDefaultTheme ? kseLogo : globals.theme.logo;
  const isLogin = !!globals.user;
  const isAppsPage = getIsAppsPage();
  const isDarkHeader = getIsDarkHeader();
  const isTransparentHeader = getIsTransparentHeader();
  const isExtensionPageIndex = getIsExtensionPage(location.pathname, true);

  const { $on, $off } = useEventEmitter();
  const [isSmallerZIndex, setIsSmallerZIndex] = useState(false);
  useEffect(() => {
    const callback: MutationCallback = mutations => {
      const [mutation] = mutations;
      // @ts-ignore
      const hasOpenEmbedModal = (mutation.target.className as string).includes(
        'ReactModal__Body--open',
      );
      setIsSmallerZIndex(hasOpenEmbedModal);
    };
    const observer = new MutationObserver(callback);

    $on('afterMountConsoleV3', (appWindow: Window) => {
      const body = appWindow.document.body;
      observer.observe(body, {
        attributes: true,
        attributeFilter: ['class'],
      });
    });

    $on('afterUnmountConsoleV3', () => {
      setIsSmallerZIndex(false);
      observer.disconnect();
    });

    return () => {
      setIsSmallerZIndex(false);
      $off('afterMountConsoleV3', () => observer.disconnect());
      $off('afterUnmountConsoleV3', () => observer.disconnect());
    };
  }, []);

  const { getNav, setNav } = useGlobalStore();
  let navs = getNav(platformNavKey);

  useEffect(() => {
    if (!navs) {
      navs = getGlobalNavs();
      setNav(platformNavKey, navs);
    }

    const scrollHandler = () => setIsScroll(document.documentElement.scrollTop > 10);
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  }, []);

  const topbarNavs = globals.config.topbarNavs.children;

  return (
    <Root
      className={cx({
        'is-smaller-z-index': isSmallerZIndex,
      })}
    >
      <NavbarWrapper
        className={cx({
          'is-dark': isDarkHeader,
          'is-transparent': isTransparentHeader,
          'is-scroll': isScroll,
        })}
      >
        <NavbarLeft>
          {isLogin && (
            <>
              {topbarNavs.map((nav: any) => {
                if (nav.name === 'extensions_marketplace') {
                  if (
                    !hasPermission({
                      module: 'platform-settings',
                      action: 'global-manage-platform-setting',
                    })
                  ) {
                    return null;
                  }
                  return (
                    <Button
                      key={nav.name}
                      variant="text"
                      as={Link}
                      className="global-nav"
                      to={EXTENSIONS_PAGE_PATHS.marketplace.index}
                      leftIcon={<PlugCircle />}
                    >
                      {t('KUBESPHERE_MARKETPLACE')}
                    </Button>
                  );
                }

                if (nav.name === 'workbench') {
                  return (
                    <Button
                      key={nav.name}
                      variant="text"
                      as={Link}
                      className="global-nav"
                      to="/"
                      leftIcon={<Dashboard />}
                    >
                      {t('Workbench')}
                    </Button>
                  );
                }

                const props: ButtonProps & { key: string } = {
                  key: nav.name,
                  variant: 'text',
                  className: 'global-nav',
                  leftIcon: <Icon name={nav.icon ?? 'dashboard'} /> ?? <Dashboard />,
                };

                return (
                  <Button {...props} as={Link} to={nav.link || nav.name}>
                    {t(nav.title)}
                  </Button>
                );
              })}
            </>
          )}
        </NavbarLeft>
        <LogoWrapper>
          <Link to={isAppsPage && !isLogin ? '/apps' : '/'} className="logo">
            <img src={logo} alt="" />
          </Link>
        </LogoWrapper>
        <NavbarRight>
          <ExtensionComp navs={navs} />
          <Button key="settings" as={Link} variant="text" className="global-nav" to="/settings">
            <Cogwheel />
          </Button>
          <ProfileMenu isLogin={isLogin} />
        </NavbarRight>
        {isDarkHeader || isExtensionPageIndex ? null : <NavbarBottom />}
      </NavbarWrapper>
    </Root>
  );
}
