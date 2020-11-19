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
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import LabelStore from 'stores/monitoring/custom/labelsets'

import Suggestions from './Suggestions'
import {
  highlightPromql,
  setCaretPosition,
  getCaretCharacterOffsetWithin,
  getTokenContext,
  PUNCTUATION_MAP,
  OPERATORS,
} from './promql'
import History from './history'

import styles from './index.scss'

@observer
export default class PromQLInput extends Component {
  state = {
    value: this.props.value,
    visible: false,
  }

  editor = React.createRef()

  wrapper = React.createRef()

  labelStore = new LabelStore()

  valueHistory = new History()

  cursorHistory = new History()

  get keydownHandler() {
    return {
      219: this.handleLabelSearch,
    }
  }

  get keyupHandler() {
    return {
      37: this.handleCursorChange,
      39: this.handleCursorChange,
    }
  }

  componentDidMount() {
    if (this.editor.current) {
      const { value } = this.state
      this.editor.current.addEventListener('input', this.handleInput)
      this.editor.current.addEventListener('keydown', this.handleKeyDown)
      this.editor.current.addEventListener('keyup', this.handleKeyUp)
      this.handleValueUpdateFromProps(value)
    }
    document.addEventListener('click', this.handleDOMClick)
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props
    if (prevState.value !== value) {
      this.setState({ value }, () => {
        this.handleValueUpdateFromProps(value)
      })
    }
  }

  componentWillUnmount() {
    if (this.editor.current) {
      this.editor.current.removeEventListener('input', this.handleInput)
      this.editor.current.removeEventListener('keydown', this.handleKeyDown)
      this.editor.current.removeEventListener('keyup', this.handleKeyUp)
    }

    document.removeEventListener('click', this.handleDOMClick)
  }

  triggerChange = value => {
    const { onChange } = this.props
    this.valueHistory.push(value)
    this.cursorHistory.push(this.state.position)
    onChange(value)
  }

  handleValueUpdateFromProps = value => {
    const editor = this.editor.current
    editor.innerHTML = highlightPromql(value)
    setCaretPosition(editor, this.state.position)
  }

  handleInput = e => {
    const editor = e.target
    const position = getCaretCharacterOffsetWithin(editor)
    let text = editor.innerText

    if (e.data && PUNCTUATION_MAP[e.data]) {
      const preText = text.substring(0, position)
      const sufText = text.substring(position)
      text = preText + PUNCTUATION_MAP[e.data] + sufText
    }

    editor.innerHTML = highlightPromql(text)
    setCaretPosition(editor, position)

    const { startContainer } = window.getSelection().getRangeAt(0)
    const focusValue = startContainer.textContent
    const tokenContext = getTokenContext(this.editor.current, startContainer)

    this.setState(
      { value: text, focusValue, position, tokenContext, visible: true },
      () => this.triggerChange(text)
    )
  }

  handleKeyDown = e => {
    if (this.keydownHandler[e.keyCode]) {
      this.keydownHandler[e.keyCode](e)
    }

    if (e.metaKey && e.keyCode === 90) {
      e.stopPropagation()
      e.preventDefault()
      e.shiftKey ? this.handleRedo() : this.handleUndo()
    }
  }

  handleKeyUp = e => {
    if (this.keyupHandler[e.keyCode]) {
      this.keyupHandler[e.keyCode](e)
    }
  }

  handleRedo = () => {
    const value = this.valueHistory.redo()
    const position = this.cursorHistory.redo()
    this.setState({ position }, () => {
      this.props.onChange(value)
    })
  }

  handleUndo = () => {
    const value = this.valueHistory.undo()
    const position = this.cursorHistory.undo()
    this.setState({ position }, () => {
      this.props.onChange(value)
    })
  }

  handleCursorChange = e => {
    const editor = e.target
    const position = getCaretCharacterOffsetWithin(editor)
    const { startContainer } = window.getSelection().getRangeAt(0)
    const focusValue = startContainer.textContent
    const tokenContext = getTokenContext(this.editor.current, startContainer)
    this.setState({ focusValue, position, tokenContext, visible: true })
  }

  handleLabelSearch = () => {
    const { focusValue } = this.state
    if (focusValue) {
      const { cluster, namespace, timeRange } = this.props
      this.labelStore.fetchLabelSets({
        cluster,
        namespace,
        metric: focusValue,
        ...timeRange,
      })
    }
  }

  handleSuggestionSelect = sug => {
    const { value, focusValue, position } = this.state
    const posOffset = OPERATORS.includes(focusValue) ? 0 : focusValue.length
    const start = value.substring(0, position - posOffset)
    const end = value.substring(position)
    const newValue = start + sug + end
    this.setState(
      { visible: false, value: newValue, focusValue: newValue },
      () => {
        this.triggerChange(newValue)
        if (this.editor.current) {
          const editor = this.editor.current
          editor.innerHTML = highlightPromql(newValue)
          setCaretPosition(editor, position + sug.length - posOffset)
        }
      }
    )
  }

  handleDOMClick = e => {
    if (
      this.wrapper &&
      this.wrapper.current &&
      !this.wrapper.current.contains(e.target)
    ) {
      this.setState({ visible: false })
    }

    if (
      this.editor &&
      this.editor.current &&
      this.editor.current.contains(e.target)
    ) {
      this.handleCursorChange(e)
    }
  }

  render() {
    const { visible, focusValue, tokenContext } = this.state
    const { metrics } = this.props
    return (
      <div className={styles.wrapper} ref={this.wrapper}>
        <pre>
          <code
            className={styles.input}
            ref={this.editor}
            spellCheck="false"
            contentEditable
          ></code>
        </pre>
        {visible && focusValue && (
          <Suggestions
            className={styles.suggestions}
            value={focusValue}
            metrics={metrics}
            tokenContext={tokenContext}
            labelsets={toJS(this.labelStore.labelsets)}
            onSelect={this.handleSuggestionSelect}
          />
        )}
      </div>
    )
  }
}
