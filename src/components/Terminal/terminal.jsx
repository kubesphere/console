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

import React from 'react'
import { debounce } from 'lodash'
import { Terminal } from 'xterm'
import PropTypes from 'prop-types'
import * as fit from 'xterm/lib/addons/fit/fit'
import SocketClient from 'utils/socket.client'

import './terminal.css'
import './xterm.css'

Terminal.applyAddon(fit)

const DEFAULT_TERMINAL_OPTS = {
  lineHeight: 1.2,
  cursorBlink: true,
  cursorStyle: 'underline',
  fontSize: 12,
  fontFamily: "Monaco, Menlo, Consolas, 'Courier New', monospace",
  theme: {
    background: '#181d28',
  },
}

export default class ContainerTerminal extends React.Component {
  static propsTypes = {
    terminalOpts: PropTypes.object,
    websocketUrl: PropTypes.string,
    initText: PropTypes.string,
  }

  static defaultProps = {
    terminalOpts: {},
    initText: 'Connecting...',
  }

  get isWsOpen() {
    return this.ws && this.ws.getSocketState() === 'open'
  }

  constructor(props) {
    super(props)

    this.first = true
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    this.term = this.initTerm()
    this.ws = this.createWS()

    this.onTerminalResize()
    this.onTerminalKeyPress()

    this.disableTermStdin()
  }

  componentWillUnmount() {
    this.term.destroy()
    this.disconnect()
    this.removeResizeListener()
  }

  initTerm() {
    const { initText } = this.props
    const terminalOpts = this.getTerminalOpts()
    const term = new Terminal(terminalOpts)
    term.open(this.containerRef.current)
    term.write(initText)
    term.fit()

    return term
  }

  disableTermStdin(disabled = true) {
    const { textarea = {} } = this.term
    textarea.disabled = disabled
  }

  getTerminalOpts() {
    const { terminalOpts } = this.props
    return { ...DEFAULT_TERMINAL_OPTS, ...terminalOpts }
  }

  onTerminalResize() {
    window.addEventListener('resize', this.onResize)
    this.term.on('resize', this.resizeRemoteTerminal)
  }

  onTerminalKeyPress() {
    this.term.on('data', this.sendTerminalInput)
  }

  sendTerminalInput = data => {
    if (this.isWsOpen) {
      this.ws.send(this.packStdin(data))
    }
  }

  resizeRemoteTerminal = () => {
    const { cols, rows } = this.term
    if (this.isWsOpen) {
      this.ws.send(this.packResize(cols, rows))
    }
  }

  removeResizeListener() {
    window.removeEventListener('resize', this.onResize)
  }

  fitTerm = () => this.term.fit()

  onResize = debounce(this.fitTerm, 800)

  packStdin = data =>
    JSON.stringify({
      Op: 'stdin',
      Data: data,
    })

  packResize = (col, row) =>
    JSON.stringify({
      Op: 'resize',
      Cols: col,
      Rows: row,
    })

  unpackStdout = data => data.Data

  createWS() {
    return new SocketClient(this.props.websocketUrl, {
      onmessage: this.onWSReceive,
      onerror: this.onWSError,
    })
  }

  onWSError = ex => {
    this.fatal(ex.message)
  }

  onWSReceive = data => {
    const term = this.term

    if (this.first) {
      this.first = false
      this.disableTermStdin(false)
      term.reset()
      term.element && term.focus()
      this.resizeRemoteTerminal()
    }

    const stdout = this.unpackStdout(data)
    term.write(stdout)
  }

  disconnect = () => {
    if (this.term) {
      this.disableTermStdin(true)
    }

    if (this.ws) {
      this.ws.close(true)
    }
  }

  fatal = message => {
    const first = this.first
    if (!message && first)
      message =
        'Could not connect to the container. Do you have sufficient privileges?'
    if (!message) message = 'disconnected'
    if (!first) message = `\r\n${message}`
    if (first) this.term.reset()
    this.term.write(`\x1b[31m${message}\x1b[m\r\n`)
  }

  render() {
    return (
      <kubernetes-container-terminal
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
        ref={this.containerRef}
      />
    )
  }
}
