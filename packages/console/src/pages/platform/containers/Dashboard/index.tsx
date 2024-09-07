/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';

import DashboardCard from './DashboardCard';
import { DashboardWrapper } from './styles';
import QuickAccess from './QuickAccess';

const Dashboard = () => {
  return (
    <DashboardWrapper>
      <DashboardCard />
      <QuickAccess />
    </DashboardWrapper>
  );
};

export default Dashboard;
