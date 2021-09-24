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
import { observer } from 'mobx-react'
import { Select, Icon } from '@kube-design/components'
import { extendObservable, action, computed } from 'mobx'
import { saveAs } from 'file-saver'
import classnames from 'classnames'
import yaml from 'js-yaml/dist/js-yaml'

import { CodeEditor } from 'components/Base'

import styles from './index.scss'

@observer
export default class TextPreview extends React.Component {
  DEFAULT_PREVIEW_FILE = 'values.yaml'

  constructor(props) {
    super(props)

    extendObservable(this, {
      selectFile: this.defaultSelectFile,
      mode: 'yaml',
    })
  }

  @computed
  get fileOptions() {
    const { files = {} } = this.props
    return Object.keys(files).map(fileName => ({
      label: fileName,
      value: fileName,
    }))
  }

  @computed
  get defaultSelectFile() {
    const { files = {} } = this.props
    const hasDefaultPreview = files[this.DEFAULT_PREVIEW_FILE]
    const firstFile = this.fileOptions.length ? this.fileOptions[0].value : ''
    return hasDefaultPreview ? this.DEFAULT_PREVIEW_FILE : firstFile
  }

  @action
  changeMode = mode => {
    this.mode = mode
  }

  @action
  changeSelectFile = value => {
    this.selectFile = value
  }

  @action
  changePreviewType = type => {
    this.mode = type
  }

  handleDownload = () => {
    const sourceInYaml = this.props.files[this.selectFile]
    if (this.mode === 'yaml') {
      this.downloadAsYaml(sourceInYaml)
    } else if (this.mode === 'json') {
      this.downloadAsJSON(sourceInYaml)
    }
  }

  downloadAsJSON(text) {
    const fileName = this.selectFile.replace(/yaml$/, 'json')
    let valuesData = ''
    try {
      valuesData = JSON.stringify(yaml.safeLoad(text), null, 2)
    } catch (e) {
      valuesData = e
    }
    this.saveAs(valuesData, fileName)
  }

  downloadAsYaml(text) {
    const selectFileName = this.selectFile
    this.saveAs(text, selectFileName)
  }

  saveAs(text, fileName) {
    const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, fileName)
  }

  render() {
    if (!this.selectFile) {
      return <p>{t('NO_APP_CHART_FILE_FOUND')}</p>
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.topbar}>
          <div className={styles.icon}>
            <Icon name="coding" size={20} />
            <span>{t('CHART_FILES')}</span>
          </div>
          {this.renderFileSelect()}
        </div>
        <div className={styles.edit}>
          {this.renderPreviewToolbar()}
          {this.renderPreviewContent()}
        </div>
      </div>
    )
  }

  renderFileSelect() {
    return (
      <Select
        defaultValue={this.selectFile}
        onChange={this.changeSelectFile}
        options={this.fileOptions}
      />
    )
  }

  renderPreviewToolbar() {
    return (
      <div className={styles.toolbar}>
        <Icon
          className={styles.download}
          name="download"
          size={20}
          color={{ primary: '#fff' }}
          onClick={this.handleDownload}
          clickable
          changeable
        />
      </div>
    )
  }

  renderPreviewTypeBtn(type, text) {
    return (
      <span
        className={classnames(styles.preview_btn, {
          [styles.active]: this.mode === type,
        })}
        onClick={() => this.changePreviewType(type)}
      >
        {text}
      </span>
    )
  }

  renderPreviewContent() {
    const options = { readOnly: true }
    return (
      <CodeEditor
        mode={this.mode}
        value={this.props.files[this.selectFile]}
        options={options}
      />
    )
  }
}
