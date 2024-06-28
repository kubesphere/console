import { MetaData, useDetailPage } from '@ks-console/shared';
import * as React from 'react';

const ProjectMetadata = () => {
  // const { data: detail, isFetching: isLoading } = useQueryProjectDetail(params);
  const { detail } = useDetailPage();
  return <MetaData detail={detail as Record<string, any>} />;
};

export default ProjectMetadata;
