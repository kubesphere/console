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

import { get } from 'lodash'
import Prism from 'prismjs'
import grammar from './grammar'
import 'prismjs/themes/prism.css'

Prism.languages.promql = grammar

export const getCaretCharacterOffsetWithin = function(element) {
  let caretOffset = 0
  const doc = element.ownerDocument || element.document
  const win = doc.defaultView || doc.parentWindow
  let sel
  if (typeof win.getSelection !== 'undefined') {
    sel = win.getSelection()
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0)
      const preCaretRange = range.cloneRange()
      preCaretRange.selectNodeContents(element)
      preCaretRange.setEnd(range.endContainer, range.endOffset)
      caretOffset = preCaretRange.toString().length
    }
  } else if (doc.selection.type !== 'Control') {
    const textRange = doc.selection.createRange()
    const preCaretTextRange = doc.body.createTextRange()
    preCaretTextRange.moveToElementText(element)
    preCaretTextRange.setEndPoint('EndToEnd', textRange)
    caretOffset = preCaretTextRange.text.length
  }
  return caretOffset
}

const getChildNodes = function(node, childs) {
  if (node && node.nodeType === 3) {
    childs.push(node)
  }

  const childNodes = node.childNodes
  for (let i = 0; i < childNodes.length; i++) {
    getChildNodes(childNodes[i], childs)
  }
}

export const setCaretPosition = function(element, position) {
  const range = document.createRange()
  const sel = window.getSelection()

  const childNodes = []
  getChildNodes(element, childNodes)

  let offset = position
  let index = 0
  while (offset > 0) {
    offset -= get(childNodes, `[${index}].length`, 0)
    index++
  }

  const node = childNodes[index - 1]
  if (node != null) {
    range.setStart(node, offset + node.length)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
  }
}

export const PUNCTUATION_MAP = {
  '(': ')',
  '[': ']',
  '{': '}',
  '"': '"',
  "'": "'",
}

export const OPERATORS = ['(', '[', '{', '"', "'", '""', "''", '=', ',']

export const highlightPromql = text =>
  Prism.highlight(text, Prism.languages.promql, 'promql')

export const getTokenContext = (parent, current) => {
  const nodes = []
  let node = current
  while (node.parentNode && parent !== node.parentNode) {
    nodes.push(node.parentNode)
    node = node.parentNode
  }

  const tokenType = nodes
    .reverse()
    .map(item => (item.className ? item.className.split(' ')[1] || '' : ''))
    .join('.')

  const context = {}
  const parentNodeType = current.parentNode.className
  if (parentNodeType.indexOf('label-key') > -1) {
    context.label = ''
  } else if (parentNodeType.indexOf('label-value') > -1) {
    context.label = get(
      current,
      'parentNode.previousSibling.previousSibling.textContent',
      ''
    )
    context.value = ''
  } else if (parentNodeType.indexOf('context-labels') > -1) {
    if (!current.previousSibling) {
      context.label = ''
    } else if (current.previousSibling.className.indexOf('label-key') > -1) {
      context.label = current.previousSibling.textContent.replace(/{,/g, '')
      context.value = ''
    } else if (current.previousSibling.className.indexOf('label-value') > -1) {
      context.label = current.textContent.replace(/{,/g, '')
    }
  }

  return { type: tokenType, ...context }
}
