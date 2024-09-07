/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { isString } from 'lodash';
import React, { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';

import { hasKSModule, hasClusterModule } from '../../../../utils';
import { NavItem, NavWrapper } from './styles';

export interface Tab {
  title: string;
  path: string;
  ksModule?: string | string[];
  clusterModule?: string | string[];
}

interface Props {
  tabs?: Tab[];
  nav?: ReactNode;
}

function DetailNav({ tabs = [], nav }: Props): JSX.Element {
  const routeParams = useParams();
  const { cluster } = routeParams;
  const navs = tabs.filter(item => {
    if (item.ksModule) {
      const modules = isString(item.ksModule) ? [item.ksModule] : item.ksModule;
      return modules.every(module => hasKSModule(module));
    }
    if (item.clusterModule) {
      const modules = isString(item.clusterModule) ? [item.clusterModule] : item.clusterModule;

      return modules.every(module => cluster && hasClusterModule(cluster, module));
    }
    return true;
  });

  return (
    <NavWrapper>
      {nav ||
        navs.map(route => (
          <NavItem
            key={route.path}
            className={isActive => isActive && 'active'}
            to={pathToRegexp.compile(route.path)(routeParams)}
          >
            {route.title}
          </NavItem>
        ))}
    </NavWrapper>
  );
}

export default DetailNav;
