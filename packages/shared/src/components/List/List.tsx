/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

function List({ className, children }: PropsWithChildren<Props>) {
  return <div className={className}>{children}</div>;
}

export default List;
