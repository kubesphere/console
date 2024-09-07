/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import { MetaData, useDetailPage } from '@ks-console/shared';
import * as React from 'react';

const ProjectMetadata = () => {
  // const { data: detail, isFetching: isLoading } = useQueryProjectDetail(params);
  const { detail } = useDetailPage();
  return <MetaData detail={detail as Record<string, any>} />;
};

export default ProjectMetadata;
