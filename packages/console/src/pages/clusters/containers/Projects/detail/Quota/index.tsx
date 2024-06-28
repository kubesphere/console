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
