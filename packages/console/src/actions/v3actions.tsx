/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import WujieReact from 'wujie-react';

const { bus } = WujieReact;

export const useV3action = (action?: string, props?: any) => {
  const [visible, setVisible] = React.useState(false);
  const actions = action || 'workload.template.edit';
  const open = (params: Record<string, any>) => {
    let time = visible ? 0 : 1000;
    if (!visible) {
      setVisible(true);
    }
    setTimeout(() => {
      bus.$emit('triggerAction', actions, params);
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
        name="consolev3"
        props={props}
        url={`//${window.location.host}/consolev3/`}
        sync={false}
      />
    );
  };
  return { open, render };
};
