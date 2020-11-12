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

import dagre from 'dagre'
import { maxBy, minBy, sortBy } from 'lodash'

const layoutSingleNodes = layout => {
  const result = { ...layout }

  const margins = { left: 0, top: 0 }
  const ranksep = 50 // dagre splits it in half
  const nodesep = 50
  const nodeWidth = 150
  const nodeHeight = 100
  const graphHeight = layout.gHeight || layout.height
  const graphWidth = layout.gWidth || layout.width
  const aspectRatio = graphHeight ? graphWidth / graphHeight : 1

  let { nodes } = layout

  // 0-degree nodes
  const singleNodes = nodes.filter(node => node.degree === 0)

  if (singleNodes.length) {
    let offsetX
    let offsetY
    const nonSingleNodes = nodes.filter(node => node.degree !== 0)
    if (nonSingleNodes.length > 0) {
      if (aspectRatio < 1) {
        offsetX = maxBy(nonSingleNodes, node => node.x).x
        offsetY = minBy(nonSingleNodes, node => node.y).y
        if (offsetX) {
          offsetX += nodeWidth + nodesep
        }
      } else {
        offsetX = minBy(nonSingleNodes, node => node.x).x
        offsetY = maxBy(nonSingleNodes, node => node.y).y
        if (offsetY) {
          offsetY += nodeHeight + ranksep
        }
      }
    }

    // default margins
    offsetX = offsetX || (margins.left + nodeWidth) / 2
    offsetY = offsetY || (margins.top + nodeHeight) / 2

    const columns = Math.ceil(Math.sqrt(singleNodes.length))
    let row = 0
    let col = 0
    let singleX
    let singleY
    nodes = sortBy(nodes, node => node.rank)
    nodes = nodes.map(node => {
      if (singleNodes.find(item => item.id === node.id)) {
        if (col === columns) {
          col = 0
          row += 1
        }
        singleX = col * (nodesep + nodeWidth) + offsetX
        singleY = row * (ranksep + nodeHeight) + offsetY
        col += 1
        return Object.assign(node, {
          x: singleX,
          y: singleY,
        })
      }
      return node
    })

    // adjust layout dimensions if graph is now bigger
    result.width = Math.max(layout.width, singleX + nodeWidth / 2 + nodesep)
    result.height = Math.max(layout.height, singleY + nodeHeight / 2 + ranksep)
    result.nodes = nodes
  }

  return result
}

export const processTopology = nodes => {
  const nodeWidth = 150
  const nodeHeight = 100
  const g = new dagre.graphlib.Graph()

  g.setGraph({ ranksep: '100', marginx: 20, marginy: 20 })

  g.setDefaultEdgeLabel(() => ({}))

  Object.keys(nodes).forEach(key => {
    g.setNode(key, {
      label: nodes[key].label,
      width: nodeWidth,
      height: nodeHeight,
    })
    if (nodes[key].adjacency) {
      nodes[key].adjacency.forEach(adKey => {
        const virtualNodes = key === adKey ? 1 : 0
        g.setEdge(key, adKey, { id: `${key}-${adKey}`, minlen: virtualNodes })
      })
    }
  })

  dagre.layout(g)

  g.nodes().forEach(key => {
    const gNode = g.node(key)
    nodes[key].x = gNode.x
    nodes[key].y = gNode.y
    nodes[key].degree = 0
  })

  g.edges().forEach(e => {
    if (e.v === e.w) {
      nodes[e.v].degree += 1
    } else {
      nodes[e.v].degree += 1
      nodes[e.w].degree += 1
    }
  })

  const edges = g.edges().map(e => {
    const gEdge = g.edge(e)
    const points = gEdge.points
    return {
      ...e,
      points,
    }
  })

  const { width, height } = g.graph()

  let layout = {
    width,
    height,
    gWidth: width,
    gHeight: height,
    nodes: Object.values(nodes),
    edges,
  }

  layout = layoutSingleNodes(layout)

  return layout
}
