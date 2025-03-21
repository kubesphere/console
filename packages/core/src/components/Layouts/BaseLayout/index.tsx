/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import WujieReact from 'wujie-react';
import { createGlobalStyle } from 'styled-components';

import type { GlobalMessage } from '@ks-console/shared';
import {
  PageConstants,
  StylesConstants,
  useGlobalStyles,
  useEventEmitter,
  requestHelper,
} from '@ks-console/shared';

import Toolbox from '../../../containers/Toolbox';
import Header from '../Header';
import { Main } from './styles';
import v3Notify from './v3Notify';

const GlobalStyle = createGlobalStyle<{ $navbarHeight?: number; $licenseTipHeight?: number }>`
  :root {
    --page-header-navbar-height: ${({ $navbarHeight }) => $navbarHeight}px;
    --page-header-license-tip-height: ${({ $licenseTipHeight }) => $licenseTipHeight}px;
    --page-header-height: calc(var(--page-header-navbar-height) + var(--page-header-license-tip-height));
  }
`;

const { bus } = WujieReact;

const eventer = () => {
  bus.$emit('documentClick', {});
};

export default function BaseLayout() {
  const navigate = useNavigate();
  const { cluster } = useParams();

  const headerHight = StylesConstants.DEFAULT_PAGE_HEADER_HEIGHT;

  const { updateGlobalStyles } = useGlobalStyles();

  const { $on, $off } = useEventEmitter();

  useEffect(() => {
    updateGlobalStyles({ pageHeaderHeight: headerHight });
  }, [headerHight]);

  useEffect(() => {
    const key = 'globalMsg';

    $on(key, (msg: GlobalMessage) => {
      const { response } = msg;
      const isApiForbiddenError = requestHelper.getIsApiForbiddenError({
        method: response?.config.method ?? '',
        code: response?.data?.code,
        reason: response?.data?.reason,
      });

      if (isApiForbiddenError) {
        navigate(PageConstants.PAGE_PATHS.errors.forbidden, { replace: true });
      }
    });

    return () => {
      $off(key);
    };
  }, [$off, $on, navigate]);

  useEffect(() => {
    const key = 'consoleV3.apiForbiddenError';

    bus.$on(key, () => {
      navigate(PageConstants.PAGE_PATHS.errors.forbidden, { replace: true });
    });
    bus.$on('notify', v3Notify);

    return () => {
      bus.$off(key, () => {});
      bus.$off('notify', v3Notify);
    };
  }, [navigate]);

  globals.currentCluster = cluster;

  useEffect(() => {
    document.addEventListener('click', eventer);
    bus.$on('subRouteChange', (name: any, path: any) => {
      const { location } = window;

      if (path.pathname !== location.pathname) {
        navigate(`${path.pathname}${path.search}`);
      } else if (path.pathname === location.pathname && path.search !== location.search) {
        // @ts-ignore
        const url = new URL(`${location.origin}${path.pathname}${path.search}`);
        window.history.pushState('', '', url);
      }
    });
    bus.$on('notify', v3Notify);
    return () => {
      bus.$off('notify', v3Notify);
      document.removeEventListener('click', eventer);
    };
  }, []);

  return (
    <>
      <GlobalStyle
        $licenseTipHeight={0}
        $navbarHeight={StylesConstants.PAGE_HEADER_NAVBAR_HEIGHT}
      />
      <Header />
      <Main $headerHight={headerHight}>
        <Outlet />
      </Main>
      <Toolbox />
    </>
  );
}
