/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { createPortal } from 'react-dom';

export const PortalWrapper = ({ children, className }: any) => {
  const ref = React.useRef(null);
  const [, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    const refCurrent = ref.current;

    return () => {
      if (refCurrent) {
        (refCurrent as any)?.parentNode?.removeChild(refCurrent);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
  }, [ref.current]);

  const renderChildren = () => {
    if (!ref.current) {
      return null;
    }
    return createPortal(children, ref.current!);
  };
  return (
    <div ref={ref} className={className}>
      {renderChildren()}
    </div>
  );
};
