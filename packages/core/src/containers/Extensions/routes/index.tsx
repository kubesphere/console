/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { EXTENSIONS_PAGE_PATHS } from '../../../constants/extension';
import ExtensionsMarketplace from '../Marketplace';
import ExtensionsMarketplaceDetail from '../Marketplace/Detail';
import { ExtensionsManagement } from '../Management';
import { ExtensionsManagementDetail } from '../Management/Detail';

const routes: RouteObject[] = [
  {
    path: EXTENSIONS_PAGE_PATHS.marketplace.index,
    element: <ExtensionsMarketplace />,
  },
  {
    path: EXTENSIONS_PAGE_PATHS.marketplace.getDetail(':name'),
    element: <ExtensionsMarketplaceDetail />,
  },
  {
    path: EXTENSIONS_PAGE_PATHS.marketplace.getDetail(':name', { version: ':version' }),
    element: <ExtensionsMarketplaceDetail />,
  },
  {
    path: EXTENSIONS_PAGE_PATHS.management.index,
    element: <ExtensionsManagement />,
  },
  {
    path: EXTENSIONS_PAGE_PATHS.management.getDetail(':name'),
    element: <ExtensionsManagementDetail />,
  },
  {
    path: EXTENSIONS_PAGE_PATHS.management.getDetail(':name', { version: ':version' }),
    element: <ExtensionsManagementDetail />,
  },
];

export default routes;
