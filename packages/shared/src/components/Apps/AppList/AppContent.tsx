/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { stringify } from 'qs';

import type { AppDetail } from '../../../types/app';
import { getQuery } from '../../../utils/getter';

import AppCard from './AppCard';

import { AppItem, AppsWrapper, StyledLink } from './styles';

type Props = {
  apps: AppDetail[];
  isLoading?: boolean;
  itemClassName?: string;
  onAppItemClick?: (app: AppDetail) => void;
};

function AppContent({ apps, onAppItemClick, itemClassName }: Props): JSX.Element {
  const { workspace, namespace, cluster } = getQuery<{
    workspace: string;
    namespace: string;
    cluster: string;
  }>();
  const query = stringify({ workspace, cluster, namespace });

  return (
    <AppsWrapper>
      {apps.map(app => {
        if (!onAppItemClick) {
          const link = `${app.metadata.name}?${query}`;

          return (
            <StyledLink key={app.metadata.name} className={itemClassName} to={link}>
              <AppCard app={app} />
            </StyledLink>
          );
        }

        return (
          <AppItem
            key={app.metadata.name}
            className={itemClassName}
            onClick={() => onAppItemClick?.(app)}
          >
            <AppCard app={app} />
          </AppItem>
        );
      })}
    </AppsWrapper>
  );
}

export default AppContent;
