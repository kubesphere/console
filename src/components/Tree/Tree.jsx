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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TreeNode from './TreeNode'
import contextTypes from './contextTypes'
import {
  convertTreeToEntities,
  conductExpandParent,
  calcSelectedKeys,
  mapChildren,
  arrAdd,
  arrDel,
  toArray,
  getPosition,
  getDataAndAria,
} from './treeUtils'

import styles from './style.scss'

const convertDataToTree = (treeData, processor) => {
  if (!treeData) return []
  const internalProcessProps = props => props
  const { processProps = internalProcessProps } = processor || {}
  const list = Array.isArray(treeData) ? treeData : [treeData]
  return list.map(({ children, ...props }) => {
    const childrenNodes = convertDataToTree(children, processor)
    return <TreeNode {...processProps(props)}>{childrenNodes}</TreeNode>
  })
}

export default class Tree extends Component {
  static popTypes = {
    className: PropTypes.className,
    treeData: PropTypes.array,
    showLine: PropTypes.bool,
    children: PropTypes.any,
    defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
    toggleNodeSelect: PropTypes.bool,
    onSelect: PropTypes.func,
    onClick: PropTypes.func,
    onExpand: PropTypes.func,
    disabled: PropTypes.bool,
  }

  static DefaultProps = {
    showLine: false,
    disabled: false,
    toggleNodeSelect: false,
    defaultExpandedKeys: [],
    defaultSelectedKeys: [],
  }

  static contextTypes = contextTypes

  static childContextTypes = contextTypes

  state = {
    keyEntities: {},
    treeNode: [],
    selectedKeys: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps } = prevState
    const { expandedKeys, defaultExpandedKeys } = nextProps

    const newState = {
      prevProps: nextProps,
    }

    const needSync = name => {
      if (!prevProps && name in nextProps) {
        return true
      }
      if (prevProps && prevProps[name] !== nextProps[name]) {
        return true
      }
      return false
    }

    let treeNode = null

    if (needSync('treeData')) {
      treeNode = convertDataToTree(nextProps.treeData)
    } else if (needSync('children')) {
      treeNode = toArray(nextProps.children)
    }

    if (treeNode) {
      newState.treeNode = treeNode

      const entitiesMap = convertTreeToEntities(treeNode)
      newState.posEntities = entitiesMap.posEntities
      newState.keyEntities = entitiesMap.keyEntities
    }

    const keyEntities = newState.keyEntities || prevState.keyEntities

    if (needSync('expandedKeys')) {
      newState.expandedKeys = !prevProps
        ? conductExpandParent(expandedKeys, keyEntities)
        : expandedKeys
    } else if (!prevProps) {
      newState.expandedKeys = conductExpandParent(
        defaultExpandedKeys,
        keyEntities
      )
    }

    if (needSync('selectedKeys')) {
      newState.selectedKeys = calcSelectedKeys(
        nextProps.selectedKeys,
        nextProps
      )
    } else if (!prevProps && nextProps.defaultSelectedKeys) {
      newState.selectedKeys = calcSelectedKeys(
        nextProps.defaultSelectedKeys,
        nextProps
      )
    }

    return newState
  }

  getChildContext() {
    return {
      tree: {
        disabled: this.props.disabled,
        renderTreeNode: this.renderTreeNode,
        onNodeClick: this.onNodeClick,
        onNodeExpand: this.onNodeExpand,
        onNodeSelect: this.onNodeSelect,
      },
    }
  }

  setUncontrolledState = (state, callBack) => {
    let needSync = false
    const newState = {}

    Object.keys(state).forEach(name => {
      if (name in this.props) return

      needSync = true
      newState[name] = state[name]
    })

    if (needSync) {
      this.setState(newState, callBack)
    }
  }

  onNodeClick = (e, treeNode) => {
    const { onClick } = this.props
    if (onClick) {
      onClick(e, treeNode)
    }
  }

  onNodeSelect = (e, treeNode) => {
    let { selectedKeys } = this.state
    const { keyEntities } = this.state
    const { toggleNodeSelect, onSelect } = this.props
    const { selected, eventKey } = treeNode.props
    const targetSelected = !selected

    if (!targetSelected && toggleNodeSelect) {
      selectedKeys = arrDel(selectedKeys, eventKey)
    } else {
      selectedKeys = [eventKey]
    }

    const selectedNodes = selectedKeys
      .map(key => {
        const entity = keyEntities[key]
        if (!entity) return null

        return entity.node
      })
      .filter(node => node)

    this.setUncontrolledState({ selectedKeys })

    if (onSelect) {
      const eventObj = {
        event: 'select',
        selected: targetSelected,
        node: treeNode,
        selectedNodes,
        nativeEvent: e.nativeEvent,
      }
      onSelect(selectedKeys, eventObj)
    }
  }

  getTreeNodes = key => {
    return this.state.keyEntities[key].node
  }

  onNodeExpand = (e, treeNode) => {
    let { expandedKeys } = this.state
    const { onExpand } = this.props
    const { eventKey, expanded } = treeNode.props

    const targetExpanded = !expanded

    if (targetExpanded) {
      expandedKeys = arrAdd(expandedKeys, eventKey)
    } else {
      expandedKeys = arrDel(expandedKeys, eventKey)
    }
    this.setUncontrolledState({ expandedKeys })

    if (onExpand) {
      onExpand(expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e.nativeEvent,
      })
    }

    return null
  }

  renderTreeNode = (child, index, level = 0) => {
    const { keyEntities, expandedKeys = [], selectedKeys = [] } = this.state
    const pos = getPosition(level, index)
    const key = child.key || pos

    if (!keyEntities[key]) {
      return null
    }

    return React.cloneElement(child, {
      key,
      eventKey: key,
      pos,
      expanded: expandedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1,
    })
  }

  render() {
    const { className, showLine } = this.props
    const { treeNode } = this.state
    const domProps = getDataAndAria(this.props)

    return (
      <ul
        {...domProps}
        className={classNames(styles.tree, className, {
          [styles.showLine]: showLine,
        })}
        role="tree"
        unselectable="on"
      >
        {mapChildren(treeNode, (node, index) =>
          this.renderTreeNode(node, index)
        )}
      </ul>
    )
  }
}
