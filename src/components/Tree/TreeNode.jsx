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
import { noop } from 'lodash'

import { Icon } from '@kube-design/components'
import contextTypes from './contextTypes'

import styles from './style.scss'

import { getNodeChildren, mapChildren, toArray } from './treeUtils'

export default class TreeNode extends Component {
  static isTreeNode = true

  static propTypes = {
    eventKey: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    root: PropTypes.object,
    isLeaf: PropTypes.bool,
    onSelect: PropTypes.func,
    expanded: PropTypes.bool,
    selected: PropTypes.bool,
    children: PropTypes.node,
    title: PropTypes.node,
    pos: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static contextTypes = contextTypes

  static childContextTypes = contextTypes

  static defaultProps = {
    title: '---',
  }

  getChildContext() {
    return {
      ...this.context,
    }
  }

  getNodeChildren = () => {
    const { children } = this.props
    const originList = toArray(children).filter(node => node)
    const targetList = getNodeChildren(originList)

    return targetList
  }

  isLeaf = () => {
    const { isLeaf } = this.props
    const hasChildren = this.getNodeChildren().length !== 0

    if (isLeaf === false) {
      return false
    }

    return isLeaf || !hasChildren
  }

  isDisabled = () => {
    const { disabled } = this.props
    const {
      tree: { disabled: treeDisabled },
    } = this.context

    if (disabled === false) {
      return false
    }

    return !!(treeDisabled || disabled)
  }

  onExpand = e => {
    const {
      tree: { onNodeExpand },
    } = this.context
    onNodeExpand(e, this)
  }

  onSelect = e => {
    if (this.isDisabled()) return
    const {
      tree: { onNodeSelect },
    } = this.context
    e.preventDefault()
    onNodeSelect(e, this)
  }

  onSelectorClick = e => {
    const {
      tree: { onNodeClick },
    } = this.context
    onNodeClick(e, this)
    this.onSelect(e)
  }

  renderSelector = () => {
    const { title, selected } = this.props
    return (
      <div
        className={classNames(styles.treeContent, selected && styles.selected)}
        onClick={this.onSelectorClick}
      >
        {title}
      </div>
    )
  }

  renderSwitcher = () => {
    const { expanded } = this.props
    const isLeaf = this.isLeaf()
    return (
      <span
        className={classNames(
          styles.treeSwitch,
          expanded ? styles.open : styles.close,
          isLeaf && styles.noop
        )}
      >
        <Icon
          onClick={isLeaf ? noop : this.onExpand}
          name="triangle-right"
          size={16}
          type="dark"
        />
      </span>
    )
  }

  renderChildren = () => {
    const { expanded, pos } = this.props
    const {
      tree: { renderTreeNode },
    } = this.context
    const nodeList = this.getNodeChildren()
    return (
      expanded && (
        <ul
          className={classNames(styles.treeChildren, expanded && styles.open)}
        >
          {mapChildren(nodeList, (node, index) =>
            renderTreeNode(node, index, pos)
          )}
        </ul>
      )
    )
  }

  render() {
    const { className, selected } = this.props
    const disabled = this.isDisabled()

    return (
      <li className={classNames(styles.treeNode, className)}>
        <div
          className={classNames(
            styles.treeNodeWrap,
            !disabled && selected && styles.selected,
            disabled && styles.disabled
          )}
        >
          {this.renderSwitcher()}
          {this.renderSelector()}
        </div>
        {this.renderChildren()}
      </li>
    )
  }
}
