/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import * as React from 'react';
import { useParams } from 'react-router-dom';
import DefaultContainerQuota from './DefaultContainerQuota';
import ProjectItemQuota from './ProjectItemQuota';
const ProjectQuota = () => {
  const params = useParams();
  const renderDefaultContainerQuota = () => {
    return <DefaultContainerQuota params={params} />;
  };
  const renderProjectItemQuota = () => {
    return <ProjectItemQuota params={params} />;
  };
  return (
    <>
      {renderDefaultContainerQuota()}
      {renderProjectItemQuota()}
    </>
  );
};

export default ProjectQuota;
