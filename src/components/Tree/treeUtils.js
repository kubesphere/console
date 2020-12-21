import React, { Children } from 'react'

export const toArray = children => {
  const ret = []
  React.Children.forEach(children, c => {
    ret.push(c)
  })
  return ret
}

export const arrDel = (list, value) => {
  const clone = list.slice()
  const index = clone.indexOf(value)
  if (index >= 0) {
    clone.splice(index, 1)
  }
  return clone
}

export const arrAdd = (list, value) => {
  const clone = list.slice()
  if (clone.indexOf(value) === -1) {
    clone.push(value)
  }
  return clone
}

export const posToArr = pos => pos.split('-')

export const getPosition = (level, index) => `${level}-${index}`

export const isTreeNode = node => node && node.type && node.type.isTreeNode

export const getNodeChildren = children => toArray(children).filter(isTreeNode)

export const traverseTreeNodes = (treeNodes, callback) => {
  function processNode(node, index, parent) {
    const children = node ? node.props.children : treeNodes
    const pos = node ? getPosition(parent.pos, index) : 0

    const childList = getNodeChildren(children)

    if (node) {
      const data = {
        node,
        index,
        pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null,
      }

      callback(data)
    }

    Children.forEach(childList, (subNode, subIndex) => {
      processNode(subNode, subIndex, { node, pos })
    })
  }

  processNode(null)
}

export const mapChildren = (children, func) => {
  const list = toArray(children).map(func)
  if (list.length === 1) {
    return list[0]
  }
  return list
}

export const calcSelectedKeys = (selectedKeys, props) => {
  if (!selectedKeys) return undefined

  const { multiple } = props
  if (multiple) {
    return selectedKeys.slice()
  }

  if (selectedKeys.length) {
    return [selectedKeys[0]]
  }
  return selectedKeys
}

export const convertTreeToEntities = (
  treeNodes,
  { initWrapper, processEntity, onProcessFinished } = {}
) => {
  const posEntities = {}
  const keyEntities = {}
  let wrapper = {
    posEntities,
    keyEntities,
  }

  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper
  }

  traverseTreeNodes(treeNodes, item => {
    const { node, index, pos, key, parentPos } = item
    const entity = { node, index, key, pos }

    posEntities[pos] = entity
    keyEntities[key] = entity

    entity.parent = posEntities[parentPos]
    if (entity.parent) {
      entity.parent.children = entity.parent.children || []
      entity.parent.children.push(entity)
    }

    if (processEntity) {
      processEntity(entity, wrapper)
    }
  })

  if (onProcessFinished) {
    onProcessFinished(wrapper)
  }

  return wrapper
}

export const conductExpandParent = (keyList, keyEntities) => {
  const expandedKeys = {}

  function conductUp(key) {
    if (expandedKeys[key]) return

    const entity = keyEntities[key]
    if (!entity) return

    expandedKeys[key] = true

    const { parent } = entity

    if (parent) {
      conductUp(parent.key)
    }
  }

  ;(keyList || []).forEach(key => {
    conductUp(key)
  })

  return Object.keys(expandedKeys)
}

export const getDataAndAria = props =>
  Object.keys(props).reduce((prev, key) => {
    const newProps = prev
    if (key.substr(0, 5) === 'data-' || key.substr(0, 5) === 'aria-') {
      newProps[key] = props[key]
    }
    return newProps
  }, {})
