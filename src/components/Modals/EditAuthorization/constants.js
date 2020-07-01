/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

export const ROLE_MODULES = {
  globalroles: [
    {
      name: 'Clusters Management',
      icon: 'cluster',
    },
    {
      name: 'Access Control',
      icon: 'key',
    },
    {
      name: 'Apps Management',
      icon: 'openpitrix',
      hide: !globals.app.hasKSModule('openpitrix'),
    },
    {
      name: 'Platform Settings',
      icon: 'cogwheel',
    },
  ],
  workspaceroles: [
    {
      name: 'Projects Management',
      icon: 'project',
    },
    {
      name: 'Devops Management',
      icon: 'strategy-group',
      hide: !globals.app.hasKSModule('devops'),
    },
    {
      name: 'Apps Management',
      icon: 'appcenter',
      hide: !globals.app.hasKSModule('openpitrix'),
    },
    {
      name: 'Access Control',
      icon: 'key',
    },
  ],
  roles: [
    {
      name: 'Application Workloads',
      icon: 'appcenter',
    },
    {
      name: 'Volumes Management',
      icon: 'storage',
    },
    {
      name: 'Secrets Management',
      icon: 'key',
    },
    {
      name: 'Monitoring & Alerting',
      icon: 'monitor',
    },
    {
      name: 'Access Control',
      icon: 'human',
    },
    {
      name: 'Project Settings',
      icon: 'project',
    },
  ],
  devopsroles: [
    {
      name: 'Pipelines Management',
      icon: 'application',
    },
    {
      name: 'Access Control',
      icon: 'human',
    },
    {
      name: 'DevOps Settings',
      icon: 'strategy-group',
    },
  ],
  clusterroles: [
    {
      name: 'Cluster Resources Management',
      icon: 'nodes',
    },
    {
      name: 'Project Resources Management',
      icon: 'project',
    },
    {
      name: 'Network Management',
      icon: 'earth',
    },
    {
      name: 'Storage Management',
      icon: 'database',
    },
    {
      name: 'Monitoring & Alerting',
      icon: 'monitor',
    },
    {
      name: 'Access Control',
      icon: 'human',
    },
    {
      name: 'Cluster Settings',
      icon: 'cluster',
    },
  ],
}
