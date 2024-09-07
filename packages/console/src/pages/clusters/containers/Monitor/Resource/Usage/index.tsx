/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import Physical from './Physical';
import ProjectTrend from './Trend';
import VirtualResource from './Virtual';

export default function Usage() {
  return (
    <>
      <Physical />
      <VirtualResource />
      <ProjectTrend />
    </>
  );
}
