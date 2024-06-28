import React from 'react';

export interface DashBoardHistory {
  [user: string]: DashBoardHistoryItem[];
}

export interface DashBoardHistoryItem {
  url: string;
  type: 'Cluster' | 'Workspace' | 'Project' | 'Devops';
  name: string;
  aliasName?: string;
  group?: string;
  id: string;
  icon?: string;
  isMulti?: boolean;
  desc?: React.ReactNode;
  iconPath?: string;
  isHost?: boolean;
  [propName: string]: any;
}
