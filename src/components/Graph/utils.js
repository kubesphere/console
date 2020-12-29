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

import { get, set, isEmpty, groupBy, keyBy } from 'lodash'
import dagre from 'dagre'

const GRAPH_OPTIONS = {
  rankdir: 'LR',
  nodesep: '60',
  ranksep: '240',
}

const generateGraph = apps => {
  const g = new dagre.graphlib.Graph({ multigraph: true, compound: true })

  g.setGraph(GRAPH_OPTIONS)
  g.setDefaultEdgeLabel(() => ({}))
  g.setDefaultNodeLabel(() => ({}))

  const groupedApps = keyBy(apps, 'name')
  const edgeIdMap = {}

  apps.forEach(app => {
    const workloads = app.nodes.filter(node => node.data.workload)
    const width = 226

    let height = 203 * workloads.length + (workloads.length - 1) * 12 + 56

    const isGateway =
      app.name.indexOf('kubesphere') !== -1 || app.name === 'unknown'

    if (isGateway) {
      height = 52
    }

    if (workloads.length > 0) {
      g.setNode(app.name, {
        name: app.name,
        width,
        height,
        workloadNum: workloads.length,
        isGateway,
      })
    }

    app.workloads = workloads

    app.edges.out.forEach(edge => {
      const targetApp = apps.find(_app => _app.ids.includes(edge.data.target))
      if (targetApp && targetApp.name) {
        g.setEdge(app.name, targetApp.name, {
          id: edge.data.id,
          out: app.edges.out,
          name: app.name,
          targetName: targetApp.name,
        })
        edgeIdMap[edge.data.id] = edge
      }
    })
  })

  dagre.layout(g)

  const _nodes = []
  const _edges = []

  g.nodes().forEach(v => {
    const position = g.node(v)
    if (position.workloadNum > 1) {
      position.y -= 110 * (position.workloadNum - 1)
    }
    _nodes.push({ ...groupedApps[v], position })
  })

  g.edges().forEach(e => {
    const position = g.edge(e)
    const nodePos = g.node(position.name)
    const targetNodePos = g.node(position.targetName)
    const edge = edgeIdMap[position.id]
    const out = position.out.filter(
      item => item.data.target === edge.data.target
    )

    const workloadHeight = 220
    const xOffset = -20
    const yOffset = 36

    let pointLength = position.points.length
    if (pointLength > 0) {
      if (pointLength === 3) {
        position.points = [position.points[0], position.points[pointLength - 1]]
        pointLength = position.points.length
      }

      if (nodePos.isGateway) {
        _edges.push({
          ...edge,
          position: {
            points: [
              {
                x: nodePos.x + nodePos.width + xOffset,
                y: nodePos.y + nodePos.height / 2 + yOffset,
              },
              {
                x: targetNodePos.x,
                y: targetNodePos.y + targetNodePos.height / 2 + yOffset,
              },
            ],
          },
        })
      } else {
        const workloadIds = groupedApps[position.name].workloads.map(
          item => item.data.id
        )

        out.forEach(item => {
          const index = workloadIds.indexOf(item.data.source)
          const pos = {
            points: [
              {
                x: nodePos.x + nodePos.width,
                y: nodePos.y + (index + 0.5) * workloadHeight + yOffset,
              },
              {
                x: targetNodePos.x,
                y:
                  targetNodePos.y + targetNodePos.height / 2 + (index + 1) * 30,
              },
            ],
          }
          _edges.push({ ...item, position: pos })
        })
      }
    }
  })

  return { nodes: _nodes, edges: _edges }
}

const groupNodes = ({ nodes = [], edges = [] } = {}, health = {}) => {
  if (isEmpty(nodes)) {
    return []
  }

  const rootNodes = []
  const nodeIdMap = {}

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].data.isRoot) {
      rootNodes.push(nodes[i])
    }
    nodeIdMap[nodes[i].data.id] = nodes[i]
  }

  const apps = []
  const groupedApps = groupBy(nodes, 'data.app')
  Object.keys(groupedApps).forEach(name => {
    const _nodes = groupedApps[name]
    const ids = _nodes.map(item => item.data.id)

    const inEdges = []
    const outEdges = []
    const innerEdges = []

    for (let index = 0; index < edges.length; index++) {
      const edge = edges[index]
      const { source, target } = edge.data
      if (ids.includes(source) && ids.includes(target)) {
        innerEdges.push(edge)
      } else if (!ids.includes(source) && ids.includes(target)) {
        inEdges.push(edge)
      } else if (ids.includes(source) && !ids.includes(target)) {
        outEdges.push(edge)
      }
    }

    apps.push({
      name,
      ids,
      nodes: _nodes,
      health: health[name] || {},
      edges: { in: inEdges, out: outEdges, inner: innerEdges },
    })
  })

  return apps
}

export const processData = (data, health) => {
  if (data && data.edges) {
    data.edges = processEdges(data.edges)
  }

  const apps = groupNodes(data, health)
  const graph = generateGraph(apps)

  return graph
}

export const processEdges = edges => {
  if (isEmpty(edges)) {
    return []
  }

  const edgeIdMap = {}

  edges.forEach(edge => {
    if (edgeIdMap[edge.data.id]) {
      const traffic = get(edgeIdMap[edge.data.id], 'data.traffic', {})
      const newTraffic = get(edge, 'data.traffic', {})

      if (traffic.protocol === 'tcp' || newTraffic.protocol === 'tcp') {
        const oldRates = Number(get(traffic, 'rates.tcp', 0))
        const newRates = Number(get(newTraffic, 'rates.tcp', 0))
        set(traffic, 'rates.tcp', (oldRates + newRates).toFixed(2))
      }
    } else {
      edgeIdMap[edge.data.id] = edge
    }
  })

  return Object.values(edgeIdMap)
}
