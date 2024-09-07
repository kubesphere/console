/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { Outlet } from 'react-router-dom';

export default function DevopsLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
