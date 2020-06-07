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

import { sortBy } from 'lodash'
import moment from 'moment-mini'
import { TRACING_COLORS_HEX } from 'utils/constants'

class TreeNode {
  static iterFunction(fn, depth = 0) {
    return node => fn(node.value, node, depth)
  }

  static searchFunction(search) {
    if (typeof search === 'function') {
      return search
    }

    return (value, node) =>
      search instanceof TreeNode ? node === search : value === search
  }

  constructor(value, children = []) {
    this.value = value
    this.children = children
  }

  get depth() {
    return this.children.reduce(
      (depth, child) => Math.max(child.depth + 1, depth),
      1
    )
  }

  get size() {
    let i = 0
    this.walk(() => i++)
    return i
  }

  addChild(child) {
    this.children.push(child instanceof TreeNode ? child : new TreeNode(child))
    return this
  }

  find(search) {
    const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search))
    if (searchFn(this)) {
      return this
    }
    for (let i = 0; i < this.children.length; i++) {
      const result = this.children[i].find(search)
      if (result) {
        return result
      }
    }
    return null
  }

  getPath(search) {
    const searchFn = TreeNode.iterFunction(TreeNode.searchFunction(search))

    const findPath = (currentNode, currentPath) => {
      const attempt = currentPath.concat([currentNode])
      if (searchFn(currentNode)) {
        return attempt
      }
      for (let i = 0; i < currentNode.children.length; i++) {
        const child = currentNode.children[i]
        const match = findPath(child, attempt)
        if (match) {
          return match
        }
      }
      return null
    }

    return findPath(this, [])
  }

  walk(fn, depth = 0) {
    const nodeStack = []
    let actualDepth = depth
    nodeStack.push({ node: this, depth: actualDepth })
    while (nodeStack.length) {
      const { node, depth: nodeDepth } = nodeStack.pop()
      fn(node.value, node, nodeDepth)
      actualDepth = nodeDepth + 1
      let i = node.children.length - 1
      while (i >= 0) {
        nodeStack.push({ node: node.children[i], depth: actualDepth })
        i--
      }
    }
  }
}

const TREE_ROOT_ID = '__root__'

const getTraceSpanIdsAsTree = trace => {
  const nodesById = new Map(
    trace.spans.map(span => [span.spanID, new TreeNode(span.spanID)])
  )
  const spansById = new Map(trace.spans.map(span => [span.spanID, span]))
  const root = new TreeNode(TREE_ROOT_ID)
  trace.spans.forEach(span => {
    const node = nodesById.get(span.spanID)
    if (Array.isArray(span.references) && span.references.length) {
      const { refType, spanID: parentID } = span.references[0]
      if (refType === 'CHILD_OF' || refType === 'FOLLOWS_FROM') {
        const parent = nodesById.get(parentID) || root
        parent.children.push(node)
      } else {
        throw new Error(`Unrecognized ref type: ${refType}`)
      }
    } else {
      root.children.push(node)
    }
  })
  const comparator = (nodeA, nodeB) => {
    const a = spansById.get(nodeA.value)
    const b = spansById.get(nodeB.value)
    return +(a.startTime > b.startTime) || +(a.startTime === b.startTime) - 1
  }
  trace.spans.forEach(span => {
    const node = nodesById.get(span.spanID)
    if (node.children.length > 1) {
      node.children.sort(comparator)
    }
  })
  root.children.sort(comparator)
  return root
}

export const transformTraceItem = data => {
  let { traceID } = data
  if (!traceID) {
    return null
  }
  traceID = traceID.toLowerCase()

  let traceEndTime = 0
  let traceStartTime = Number.MAX_SAFE_INTEGER
  const spanIdCounts = new Map()
  const spanMap = new Map()
  data.spans = data.spans.filter(span => Boolean(span.startTime))

  const max = data.spans.length
  for (let i = 0; i < max; i++) {
    const span = data.spans[i]
    const { startTime, duration, processID } = span
    let { spanID } = span
    if (startTime < traceStartTime) {
      traceStartTime = startTime
    }
    if (startTime + duration > traceEndTime) {
      traceEndTime = startTime + duration
    }

    const idCount = spanIdCounts.get(spanID)
    if (idCount != null) {
      spanIdCounts.set(spanID, idCount + 1)
      spanID = `${spanID}_${idCount}`
      span.spanID = spanID
    } else {
      spanIdCounts.set(spanID, 1)
    }
    span.process = data.processes[processID]
    spanMap.set(spanID, span)
  }

  const tree = getTraceSpanIdsAsTree(data)
  const spans = []
  const svcCounts = {}
  let traceName = ''

  tree.walk((spanID, node, depth = 0) => {
    if (spanID === TREE_ROOT_ID) {
      return
    }
    const span = spanMap.get(spanID)
    if (!span) {
      return
    }
    const { serviceName } = span.process
    svcCounts[serviceName] = (svcCounts[serviceName] || 0) + 1
    if (!span.references || !span.references.length) {
      traceName = `${serviceName}: ${span.operationName}`
    }
    span.relativeStartTime = span.startTime - traceStartTime
    span.depth = depth - 1
    span.hasChildren = node.children.length > 0
    span.references.forEach(ref => {
      const refSpan = spanMap.get(ref.spanID)
      if (refSpan) {
        ref.span = refSpan
      }
    })
    spans.push(span)
  })
  const services = Object.keys(svcCounts).map(name => ({
    name,
    numberOfSpans: svcCounts[name],
  }))
  return {
    services,
    spans,
    traceID,
    traceName,
    processes: data.processes,
    duration: traceEndTime - traceStartTime,
    startTime: traceStartTime,
    endTime: traceEndTime,
  }
}

export const transformTraces = traces => {
  const data = traces.map(transformTraceItem)
  let maxDuration = 0
  let colorIndex = 0
  const serviceColorMap = {}
  data.forEach(item => {
    if (item.duration) {
      maxDuration = Math.max(maxDuration, item.duration)
    }
    item.services.forEach(service => {
      if (!serviceColorMap[service.name]) {
        serviceColorMap[service.name] = TRACING_COLORS_HEX[colorIndex++]
      }
    })
  })

  data.forEach(item => {
    if (maxDuration) {
      item.durationPercent = (item.duration * 100) / maxDuration
    }
    item.serviceColorMap = serviceColorMap
  })

  return sortBy(data, 'startTime').reverse()
}

export const spanHasTag = (key, value, span) => {
  if (!Array.isArray(span.tags) || !span.tags.length) {
    return false
  }
  return span.tags.some(tag => tag.key === key && tag.value === value)
}

export const isClientSpan = spanHasTag.bind(null, 'span.kind', 'client')
export const isServerSpan = spanHasTag.bind(null, 'span.kind', 'server')

const isErrorBool = spanHasTag.bind(null, 'error', true)
const isErrorStr = spanHasTag.bind(null, 'error', 'true')

export const isErrorSpan = span => isErrorBool(span) || isErrorStr(span)

export const formatRelativeDate = (value, fullMonthName) => {
  const m = moment.isMoment(value) ? value : moment(value)
  const monthFormat = fullMonthName ? 'MMMM' : 'MMM'
  const dt = new Date()
  if (dt.getFullYear() !== m.year()) {
    return m.format(`${monthFormat} D, YYYY`)
  }
  const mMonth = m.month()
  const mDate = m.date()
  const date = dt.getDate()
  if (mMonth === dt.getMonth() && mDate === date) {
    return 'Today'
  }
  dt.setDate(date - 1)
  if (mMonth === dt.getMonth() && mDate === dt.getDate()) {
    return 'Yesterday'
  }
  return m.format(`${monthFormat} D`)
}

export const formatDuration = (duration, inputUnit = 'microseconds') => {
  let d = duration
  if (inputUnit === 'microseconds') {
    d = duration / 1000
  }
  let units = 'ms'
  if (d >= 1000) {
    units = 's'
    d /= 1000
  }
  return d.toFixed(2) + units
}

export const createViewedBoundsFunc = viewRange => {
  const { min, max, viewStart, viewEnd } = viewRange
  const duration = max - min
  const viewMin = min + viewStart * duration
  const viewMax = max - (1 - viewEnd) * duration
  const viewWindow = viewMax - viewMin

  return (start, end) => ({
    start: (start - viewMin) / viewWindow,
    end: (end - viewMin) / viewWindow,
  })
}

export const renderIntoCanvas = (
  canvas,
  items,
  totalValueWidth,
  getFillColor
) => {
  const BG_COLOR = '#fff'
  const ITEM_ALPHA = 'a0'
  const MIN_ITEM_HEIGHT = 2
  const MAX_ITEM_HEIGHT = 4
  const MAX_TOTAL_HEIGHT = 200
  const MIN_ITEM_WIDTH = 10
  const MIN_TOTAL_HEIGHT = 60
  const ITEM_MARGIN = 1

  const fillCache = new Map()
  const cHeight =
    (items.length < MIN_TOTAL_HEIGHT
      ? MIN_TOTAL_HEIGHT
      : Math.min(items.length, MAX_TOTAL_HEIGHT)) - 1
  const cWidth = window.innerWidth * 2

  canvas.width = cWidth
  canvas.height = cHeight
  const itemHeight = Math.min(
    Math.max(
      MIN_ITEM_HEIGHT,
      (cHeight - (ITEM_MARGIN * items.length - 1)) / items.length
    ),
    MAX_ITEM_HEIGHT
  )
  const itemYChange = cHeight / items.length

  const ctx = canvas.getContext('2d', { alpha: false })
  ctx.fillStyle = BG_COLOR
  ctx.fillRect(0, 0, cWidth, cHeight)
  for (let i = 0; i < items.length; i++) {
    const { valueWidth, valueOffset, serviceName } = items[i]
    const x = (valueOffset / totalValueWidth) * cWidth
    let width = (valueWidth / totalValueWidth) * cWidth
    if (width < MIN_ITEM_WIDTH) {
      width = MIN_ITEM_WIDTH
    }
    let fillStyle = fillCache.get(serviceName)
    if (!fillStyle) {
      fillStyle = `${getFillColor(serviceName)}${ITEM_ALPHA}`
      fillCache.set(serviceName, fillStyle)
    }
    ctx.fillStyle = fillStyle
    ctx.fillRect(x, i * itemYChange, width, itemHeight)
  }
}

export const COORD_COUNT = 4
