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

export const formatTreeData = (treeData, rootName) => {
  return treeData
    .map(item => {
      const parent = item
      parent.children = []
      parent.path = [rootName, parent.group_name]
      parent.parent_id = item.parent_id || 'root'
      treeData.forEach(children => {
        if (parent.group_id === children.parent_id) {
          children.parent_name = parent.group_name
          children.path = [...parent.path, children.group_name]
          parent.children = [...parent.children, children]
        }
      })
      if (parent.parent_id === 'root') {
        parent.parent_name = rootName
        return parent
      }

      return null
    })
    .filter(item => item)
}

export const flattenTreeData = treeData => {
  const treeMap = {}

  const walk = data => {
    if (data.group_id) {
      treeMap[data.group_id] = data
    }

    if (data.children.length > 0) {
      return data.children.map(item => walk(item))
    }
  }

  treeData.map(walk)

  return treeMap
}

export const getBreadCrumbData = (id, rowtreeData) => {
  const data = []
  let currentNode = rowtreeData[id]
  while (currentNode) {
    data.unshift(currentNode)
    currentNode = rowtreeData[currentNode.parent_id]
  }
  return data
}
