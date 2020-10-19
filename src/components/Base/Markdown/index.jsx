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
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MarkdownIt from 'markdown-it'
import { Loading } from '@kube-design/components'

import style from './index.scss'

class Markdown extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    options: PropTypes.object,
  }

  static defaultProps = {
    source: '',
    options: {},
  }

  constructor(props) {
    super(props)

    this.iframeLoaded = false
    this.md = new MarkdownIt({ html: true, linkify: true, ...props.options })
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.iframe.addEventListener('load', this.handleIFrameLoad)
  }

  componentWillUnmount() {
    this.iframe.removeEventListener('load', this.handleIFrameLoad)
    this.removeMediaListeners()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.md = new MarkdownIt(this.props.options)
    }
    this.updateMarkdown()
  }

  handleIFrameLoad = () => {
    this.iframeLoaded = true
    this.setState({
      loading: false,
    })
    this.updateMarkdown()
  }

  addMediaListeners() {
    const $document = this.iframe.contentDocument
    this.iframeMedias = $document.querySelectorAll('img, video, audio')

    if (this.iframeMedias && this.iframeMedias.length > 0) {
      Array.prototype.forEach.call(this.iframeMedias, img => {
        img.removeEventListener('load', this.updateIFrame)
        img.addEventListener('load', this.updateIFrame)
      })
    }
  }

  removeMediaListeners() {
    if (this.iframeMedias && this.iframeMedias.length > 0) {
      Array.prototype.forEach.call(this.iframeMedias, img => {
        img.removeEventListener('load', this.updateIFrame)
      })
    }
  }

  updateIFrame = () => {
    if (this.iframe) {
      this.iframe.style.height = `${this.iframe.contentWindow.document.body
        .scrollHeight + 16}px`
    }
  }

  updateMarkdown() {
    const $document = this.iframe.contentDocument
    if (this.iframeLoaded) {
      $document.body.innerHTML = this.md.render(this.props.source)
      this.iframe.style.height = `${$document.body.scrollHeight + 16}px`
    }

    this.removeMediaListeners()
    this.addMediaListeners()
  }

  handleIFrameRef = ref => {
    this.iframe = ref
  }

  render() {
    const { className } = this.props

    return (
      <div>
        {this.state.loading && <Loading className="loading" />}
        <iframe
          className={classNames(style.markdown, className)}
          ref={this.handleIFrameRef}
          src="/blank_md"
          name="frame_markdown"
          width="100%"
          frameBorder="0"
          scrolling="no"
        />
      </div>
    )
  }
}

export default Markdown
