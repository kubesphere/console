import WujieReact from 'wujie-react';

import { useEventEmitter } from '@ks-console/shared';
import { setGlobalConsoleV3LoadCompleted } from '../utils/globals.consoleV3LoadCompleted';

const { setupApp, preloadApp, bus } = WujieReact;

export function initWujie() {
  setupApp({
    name: 'consolev3',
    url: `//${window.location.host}/consolev3/`,
    exec: true,
    afterMount: appWindow => {
      const { $emit } = useEventEmitter();
      $emit('afterMountConsoleV3', appWindow);
    },
    afterUnmount: appWindow => {
      const { $emit } = useEventEmitter();
      $emit('afterUnmountConsoleV3', appWindow);
    },
  });

  setupApp({
    name: 'consoleV3Actions',
    url: `//${window.location.host}/consolev3/`,
    exec: true,
    props: { actions: true },
    afterMount: () => {
      bus.$on('loadCompleted', (name: string) => {
        if (name === 'consolev3') {
          setGlobalConsoleV3LoadCompleted({ value: true });
        }
      });
    },
  });

  preloadApp({
    name: 'consoleV3Actions',
    props: { actions: true },
    url: `//${window.location.host}/consolev3/dashboard`,
  });

  preloadApp({
    name: 'consolev3',
    url: `//${window.location.host}/consolev3/dashboard`,
  });
}
