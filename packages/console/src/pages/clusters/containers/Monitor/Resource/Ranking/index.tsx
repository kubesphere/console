import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectRanking from './Project';

function UsageRanking() {
  const { cluster } = useParams();
  return <ProjectRanking cluster={cluster} />;
}

export default UsageRanking;
