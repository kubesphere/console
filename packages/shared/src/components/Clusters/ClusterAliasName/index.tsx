/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useGetClusterAliasName } from '../../../utils';
export interface ClusterAliasNameProps {
  cluster: string | undefined;
  withTitle?: boolean;
}

export default function ClusterAliasName({ cluster, withTitle = true }: ClusterAliasNameProps) {
  if (!cluster) {
    return null;
  }
  const fullName = useGetClusterAliasName(cluster);

  return withTitle ? (
    <span style={{ cursor: 'pointer' }} title={fullName || cluster}>
      {fullName || cluster}
    </span>
  ) : (
    <span>{fullName || cluster}</span>
  );
}
