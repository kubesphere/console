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
import isEqual from 'react-fast-compare'
import { Icon } from '@kube-design/components'

import { createPatch } from 'diff'
import { parse, html } from 'diff2html'

import 'diff2html/bundles/css/diff2html.min.css'
import styles from './index.scss'

export default class DiffYaml extends Component {
  static propTypes = {
    title: PropTypes.string,
    datas: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    datas: ['', ''],
  }

  state = {
    mode: 'line-by-line',
    diffHtml: this.getDiffHtml(this.props.datas),
  }

  getDiffHtml([oldData, newData], options = {}) {
    const diffStr = createPatch('yaml', oldData, newData, '', '', {
      context: -1,
    })
    const diffJson = parse(diffStr)
    return html(diffJson, {
      drawFileList: false,
      ...options,
    })
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.datas, this.props.datas)) {
      this.setState({
        diffHtml: this.getDiffHtml(this.props.datas, {
          outputFormat: this.state.mode,
        }),
      })
    }
  }

  handleModeChange = mode => () =>
    this.setState({
      mode,
      diffHtml: this.getDiffHtml(this.props.datas, {
        outputFormat: mode,
      }),
    })

  render() {
    const { title, description } = this.props
    return (
      <div>
        <div className={styles.header}>
          <Icon name="terminal" size={20} />
          <span>{title}</span>
          <Icon
            name="chevron-down"
            clickable
            size={20}
            onClick={this.handleModeChange('line-by-line')}
          />
          <Icon
            name="chevron-right"
            clickable
            size={20}
            onClick={this.handleModeChange('side-by-side')}
          />
          <span className="float-right">{description}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: this.state.diffHtml,
          }}
        />
      </div>
    )
  }
}
