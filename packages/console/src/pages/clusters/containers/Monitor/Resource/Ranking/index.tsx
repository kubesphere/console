/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectRanking from './Project';

function UsageRanking() {
  const { cluster } = useParams();
  return <ProjectRanking cluster={cluster} />;
}

export default UsageRanking;
