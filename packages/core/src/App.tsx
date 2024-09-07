/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { useState, useEffect, useCallback } from 'react';
import get from 'lodash/get';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { KubedConfigProvider, CssBaseline, Notify } from '@kubed/components';
import { useLocalStorage } from '@kubed/hooks';
import { getBrowserLang, useGlobalStore, aliasNameStore } from '@ks-console/shared';
// import { useWatchExtensions } from './stores/extension';
import GlobalStyles from './components/GlobalStyles';
import { PrefersContext, themes } from './contexts/PrefersContext';
import Pages from './Pages';

const { getWorkspaces } = aliasNameStore;
const App = () => {
  // 获取别名数据
  getWorkspaces();
  useGlobalStore(); // init global store.
  const [themeLocalValue, setThemeLocalValue] = useLocalStorage({
    key: 'themeType',
    defaultValue: 'light',
  });
  const [themeType, setThemeType] = useState('light');
  const userLang = get(globals.user, 'lang') || getBrowserLang();

  // useWatchExtensions({
  //   enabled: true,
  //   onMessage: data => {
  //     const { formattedItem } = data.message;

  //     const ksModule = globals?.ksConfig;
  //     if (formattedItem && formattedItem.name) {
  //       const hasModule = formattedItem.name in ksModule;

  //       if (hasModule && !formattedItem?.isEnabled) {
  //         delete globals?.ksConfig[formattedItem.name];
  //       }

  //       if (!hasModule && formattedItem?.isEnabled === true) {
  //         globals.ksConfig[formattedItem.name] = true;
  //       }
  //     }
  //   },
  // });

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
        staleTime: 100 * 5,
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <Router>
        <KubedConfigProvider themeType={themeType} locale={userLang}>
          <CssBaseline />
          <GlobalStyles />
          <PrefersContext.Provider value={{ themeType, switchTheme }}>
            <Pages />
            <Notify position="top-right" />
          </PrefersContext.Provider>
        </KubedConfigProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
