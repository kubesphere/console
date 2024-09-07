/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { merge } from 'lodash';

import type { GlobalStyles } from '../../types/global.styles';
import { useGlobalStore } from '../../stores/global';

export function useGlobalStyles() {
  const { globalStore, setGlobalStore } = useGlobalStore();
  const globalStyles = Object.freeze(globalStore?.styles);

  const setGlobalStyles = (value: GlobalStyles) => {
    const store = { ...globalStore, styles: value };
    setGlobalStore(store);
  };

  const updateGlobalStyles = (value: Partial<GlobalStyles>) => {
    const store = merge({}, globalStore, { styles: value });
    setGlobalStore(store);
  };

  return { globalStyles, setGlobalStyles, updateGlobalStyles };
}
