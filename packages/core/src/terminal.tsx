/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import ReactDOM from 'react-dom';
import get from 'lodash/get';
import { QueryClient, QueryClientProvider } from 'react-query';
import { KubedConfigProvider, CssBaseline, Loading, Notify } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';
import { CacheStoreProvider, getBrowserLang, useGlobalStore } from '@ks-console/shared';
import i18n from './utils/i18n';
import emitter from './utils/emitter';

import GlobalStyles from './components/GlobalStyles';
import { PrefersContext, themes } from './contexts/PrefersContext';
import TerminalApp from './containers/Terminal';

const App = () => {
  useGlobalStore(); // init global store.
  const [themeLocalValue, setThemeLocalValue] = useLocalStorage({
    key: 'themeType',
    defaultValue: 'light',
  });
  const [themeType, setThemeType] = useState('light');
  const userLang = get(globals.user, 'lang') || getBrowserLang();

  useEffect(() => {
    document.documentElement.removeAttribute('style');
    document.body.removeAttribute('style');
    if (themes.includes(themeLocalValue)) setThemeType(themeLocalValue);
  }, []);

  const switchTheme = useCallback(theme => {
    setThemeType(theme);
    setThemeLocalValue(theme);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <KubedConfigProvider themeType={themeType} locale={userLang}>
        <CssBaseline />
        <GlobalStyles />
        <PrefersContext.Provider value={{ themeType, switchTheme }}>
          <TerminalApp />
          <Notify position="top-right" />
        </PrefersContext.Provider>
      </KubedConfigProvider>
    </QueryClientProvider>
  );
};

export const runTerminal = async () => {
  await i18n.init();
  emitter.init();

  ReactDOM.render(
    <Suspense fallback={<Loading className="page-loading" />}>
      <CacheStoreProvider>
        <App />
      </CacheStoreProvider>
    </Suspense>,
    document.getElementById('root'),
  );
};
