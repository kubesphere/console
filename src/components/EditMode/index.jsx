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
import { isEmpty } from 'lodash'

import ReactFileReader from 'react-file-reader'
import { Icon } from '@pitrix/lego-ui'
import { CodeEditor } from 'components/Base'

import { getValue, getAllYAMLValue } from 'utils/yaml'

import styles from './index.scss'

const objectToYaml = formTemplate => {
  if (formTemplate.metadata) {
    return getValue(formTemplate)
  }

  return Object.values(formTemplate)
    .map(value => getValue(value || {}))
    .join('---\n')
}

const yamlToObject = (data, hasMeta) => {
  const values = getAllYAMLValue(data)

  if (hasMeta && values.length === 1) {
    return values[0]
  }

  return values.reduce(
    (prev, cur) => ({
      ...prev,
      [cur.kind || 'Unkown']: cur,
    }),
    {}
  )
}

export default class EditMode extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    mode: PropTypes.string,
    value: PropTypes.object,
    readOnly: PropTypes.bool,
  }

  static defaultProps = {
    mode: 'yaml',
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

    this.value = objectToYaml(props.value)
  }

  handleUpload = file => {
    const reader = new FileReader()
    reader.onload = e => {
      if (!isEmpty(e.target.result)) {
        this.value = e.target.result
        this.forceUpdate()
      }
    }
    reader.readAsText(file[0])
  }

  handleDownload = () => {
    const { mode } = this.props

    const fileName = `default.${mode}`

    this.saveAsFile(this.value, fileName)
  }

  saveAsFile = (text = '', fileName = 'default.txt') => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  handleChange = value => {
    this.value = value
  }

  getData = () => yamlToObject(this.value, !!this.props.value.metadata)

  render() {
    const { mode, className, editorClassName, readOnly } = this.props

    return (
      <div className={classnames(styles.mode, className)}>
        <div className={classnames(styles.edit, editorClassName)}>
          <CodeEditor
            className={styles.editor}
            mode={mode}
            value={this.value}
            options={this.options}
            onChange={this.handleChange}
          />
          <div className={styles.ops} onClick={this.handleModeChange}>
            {!readOnly && (
              <>
                <ReactFileReader
                  fileTypes={['.yaml']}
                  handleFiles={this.handleUpload}
                >
                  <Icon
                    name="upload"
                    size={20}
                    color={{ primary: '#fff', secondary: '#fff' }}
                    clickable
                    changeable
                  />
                </ReactFileReader>
                <span className={styles.split}>|</span>
              </>
            )}
            <Icon
              name="download"
              size={20}
              color={{ primary: '#fff', secondary: '#fff' }}
              onClick={this.handleDownload}
              clickable
              changeable
            />
          </div>
        </div>
      </div>
    )
  }
}
