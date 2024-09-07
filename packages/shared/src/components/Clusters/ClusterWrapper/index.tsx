/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React, { PropsWithChildren } from 'react';
import { keyBy } from 'lodash';
import { getClusterAliasName } from '../../../utils/caches';
import { Constants } from '../../../constants';
import Icon from '../../Icon';
import { TagWrappger } from './styles';

const { CLUSTER_GROUP_TAG_TYPE, CLUSTER_PROVIDER_ICON } = Constants;

interface ClusterWrapperProps {
  clusters: any[];
  clustersDetail: any;
}

function ClusterWrapper({
  clusters,
  clustersDetail,
  children,
}: PropsWithChildren<ClusterWrapperProps>): JSX.Element {
  const clusterMap = keyBy(clustersDetail, 'name');

  return (
    <>
      {clusters.map(item => {
        const cluster = clusterMap[item.name] || item;

        return (
          <TagWrappger
            key={cluster.name}
            radius="xs"
            color={CLUSTER_GROUP_TAG_TYPE[cluster.group]}
            title={
              <Icon
                name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
                size={16}
                variant="light"
              />
            }
            titleStyle={{ backgroundColor: 'transparent', margin: '0', padding: '0 3px' }}
          >
            <span title={getClusterAliasName(children ? children : cluster.name)}>
              {getClusterAliasName(children ? children : cluster.name)}
            </span>
          </TagWrappger>
        );
      })}
    </>
  );
}

export default ClusterWrapper;
