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

import Suggestions from './Suggestions'
import {
  highlightPromql,
  setCaretPosition,
  getCaretCharacterOffsetWithin,
  PUNCTUATION_MAP,
} from './promql'

import styles from './index.scss'

export default class PromQLInput extends Component {
  state = {
    value: this.props.value,
    visible: false,
  }

  editor = React.createRef()

  wrapper = React.createRef()

  componentDidMount() {
    if (this.editor.current) {
      const { value } = this.state
      this.editor.current.addEventListener('input', this.handleInput)
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
    }

    document.removeEventListener('click', this.handleDOMClick)
  }

  handleValueUpdateFromProps = value => {
    const editor = this.editor.current
    editor.innerHTML = highlightPromql(value)
    setCaretPosition(editor, editor.innerText.length)
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

    const { onChange } = this.props

    const sel = window.getSelection()
    const focusValue = sel.getRangeAt(0).startContainer.textContent
    this.setState({ value: text, focusValue, position, visible: true }, () =>
      onChange(text)
    )
  }

  handleSuggestionSelect = sug => {
    const { value, focusValue, position } = this.state
    const { onChange } = this.props
    const posOffset = PUNCTUATION_MAP[focusValue] ? 0 : focusValue.length
    const start = value.substring(0, position - posOffset)
    const end = value.substring(position)
    const newValue = start + sug + end
    this.setState({ visible: false, value: newValue }, () => {
      onChange(newValue)
      if (this.editor.current) {
        const editor = this.editor.current
        editor.innerHTML = highlightPromql(newValue)
        setCaretPosition(editor, position + sug.length - posOffset)
      }
    })
  }

  handleDOMClick = e => {
    if (
      this.wrapper &&
      this.wrapper.current &&
      !this.wrapper.current.contains(e.target)
    ) {
      this.setState({ visible: false })
    }
  }

  render() {
    const { visible, focusValue } = this.state
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
            onSelect={this.handleSuggestionSelect}
          />
        )}
      </div>
    )
  }
}
