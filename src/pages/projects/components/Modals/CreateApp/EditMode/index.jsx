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
import classnames from 'classnames'
import { saveAs } from 'file-saver'
import { isEmpty, isString, keyBy } from 'lodash'

import { getValue, getValueObj, getAllYAMLValue } from 'utils/yaml'

import { Icon } from '@pitrix/lego-ui'
import { Button, CodeEditor } from 'components/Base'
import styles from './index.scss'

export default class EditMode extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    readOnly: false,
  }

  get options() {
    const { readOnly } = this.props
    return {
      readOnly,
      width: '100%',
      height: '100%',
    }
  }

  constructor(props) {
    super(props)

    const keys = Object.keys(props.value)
    this.value = props.value

    this.state = { selectKey: keys[0] }
  }

  getData = () => {
    const { mode } = this.state
    const value = {}

    Object.keys(this.value).forEach(key => {
      if (isString(this.value[key]) && this.value[key].indexOf('---') !== -1) {
        const values = getAllYAMLValue(this.value[key])
        value[key] = {
          service: values.find(it => it.kind === 'Service'),
          workload: values.find(it =>
            ['Deployment', 'DaemonSet', 'StatefulSet'].includes(it.kind)
          ),
        }
      } else {
        value[key] = getValueObj(mode, this.value[key])
      }
    })

    return value
  }

  handleUpload = file => {
    const reader = new FileReader()
    reader.onload = e => {
      if (!isEmpty(e.target.result)) {
        const result = e.target.result.split('---')
        const values = result.map(text => getValueObj('yaml', text))

        this.value = values.length > 1 ? keyBy(values, 'kind') : values[0]

        this.setState({ selectKey: 0 })
      }
    }
    reader.readAsText(file[0])
  }

  handleDownload = () => {
    const fileName = `app.yaml`

    const text = Object.keys(this.value)
      .map(key => getValue(this.value[key]))
      .join('---\n')
    this.saveAsFile(text, fileName)
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  handleFileChange = e => {
    const { key } = e.target.dataset

    this.setState({ selectKey: key })
  }

  handleChange = value => {
    const { selectKey } = this.state

    this.value[selectKey] = value
  }

  renderFileItem(key) {
    const { selectKey } = this.state

    return (
      <li
        key={key}
        data-key={key}
        className={classnames({
          [styles.active]: key === selectKey,
        })}
        onClick={this.handleFileChange}
      >
        <Icon name="file" size={16} />
        {key}
      </li>
    )
  }

  renderFileList() {
    return (
      <div className={styles.fileList}>
        <div className={styles.header}>
          <div className={styles.title}>{t('File List')}</div>
          <div className={styles.operations}>
            <Button type="flat" icon="download" onClick={this.handleDownload} />
          </div>
        </div>
        <ul>{Object.keys(this.value).map(key => this.renderFileItem(key))}</ul>
      </div>
    )
  }

  renderEditor() {
    const { selectKey } = this.state
    const subValue = this.value[selectKey]

    return (
      <CodeEditor
        className={styles.editor}
        mode="yaml"
        value={subValue}
        options={this.options}
        onChange={this.handleChange}
      />
    )
  }

  render() {
    const { className } = this.props

    return (
      <div className={classnames(styles.mode, className)}>
        {this.renderFileList()}
        {this.renderEditor()}
      </div>
    )
  }
}
