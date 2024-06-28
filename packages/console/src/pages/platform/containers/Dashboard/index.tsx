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
