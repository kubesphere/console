/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import type { GlobalStyles } from '../types/global.styles';
import { StylesConstants } from '../constants';
import type { NavMenuItem } from '../components/Layouts/NavMenu/NavItem';
import { useCacheStore as useStore } from '../hooks';

export interface GlobalStore {
  globalNavOpen: boolean;
  navs: Record<string, NavMenuItem[]>;
  styles: GlobalStyles;
}

const initialGlobalStore: GlobalStore = {
  globalNavOpen: false,
  navs: {},
  styles: {
    pageHeaderHeight: StylesConstants.DEFAULT_PAGE_HEADER_HEIGHT,
  },
};

export const useGlobalStore = () => {
  const [globalStore, setGlobalStore] = useStore<GlobalStore>('GlobalStore', initialGlobalStore);

  const getNav = (name: string): NavMenuItem[] => {
    return globalStore.navs[name];
  };

  const setNav = (key: string, data: NavMenuItem[]) => {
    globalStore.navs[key] = data;
    setGlobalStore(globalStore);
    // mutate('GlobalStore', (state: GlobalStore) => {
    //   state.navs[key] = data;
    // });
  };

  const setNavOpen = (isOpen: boolean) => {
    setGlobalStore(state => {
      state.globalNavOpen = isOpen;
      return state;
    });
  };

  return {
    globalStore,
    setGlobalStore,
    getNav,
    setNav,
    setNavOpen,
  };
};
