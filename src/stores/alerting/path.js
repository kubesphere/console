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

export const getLevelPath = (params = {}, level = 'cluster') => {
  const { cluster, node, workspace, namespace } = params
  const clusterPrefix = cluster ? `/klusters/${cluster}` : ''
  const nodePath = node ? `/nodes/${node}` : ''
  const workspacePath = workspace ? `/workspaces/${workspace}` : ''
  const namespacePath = namespace ? `/namespaces/${namespace}` : ''
  const prefix = nodePath || namespacePath

  let path = ''
  switch (level) {
    default:
    case 'cluster':
      path = '/clusters'
      break
    case 'node':
      path = `${clusterPrefix}/nodes`
      break
    case 'workspace':
      path = workspacePath
      break
    case 'namespace':
      path = `${clusterPrefix}${namespacePath}`
      break
    case 'workload':
      path = `${clusterPrefix}${namespacePath}/workloads`
      break
    case 'pod':
      path = `${clusterPrefix}${prefix}/pods`
      break
    case 'container': {
      const { pod } = params
      const podPath = pod ? `/pods/${pod}` : ''
      path = `${clusterPrefix}${prefix}${podPath}/containers`
      break
    }
  }

  return path
}
