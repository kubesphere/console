/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import WujieReact from 'wujie-react';

const { bus } = WujieReact;

interface OpenParams {
  action?: string;
  v3Module: string;
  v3StoreParams: Record<string, any> | string;

  [key: string]: any;
}

/**
 * Use Modals in consoleV3. Note that you need to specify action , v3Module , v3StoreParams etc.
 * v3Module needs to be registered in V3 code => src/stores/getStore.js.
 */
export const useV3action = () => {
  const [visible, setVisible] = React.useState(false);

  const open = (params: OpenParams) => {
    let time = visible ? 0 : 1000;
    const { action = 'workload.template.edit', ...restParams } = params;
    if (!visible) {
      setVisible(true);
    }
    setTimeout(() => {
      bus.$emit('triggerAction', action, restParams);
    }, time);
  };

  const render = () => {
    if (!visible) {
      return null;
    }
    return (
      <WujieReact
        width="0"
        height="0"
        name="consoleV3Actions"
        url={`//${window.location.host}/consolev3/dashboard`}
        sync={false}
      />
    );
  };
  return { open, render };
};
