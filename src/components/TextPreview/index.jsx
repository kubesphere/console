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
import { Select, Icon } from '@kube-design/components'
import { saveAs } from 'file-saver'
import yaml from 'js-yaml/dist/js-yaml'

import { CodeEditor } from 'components/Base'

import styles from './index.scss'

export default class TextPreview extends React.Component {
  static propTypes = {
    files: PropTypes.object,
    type: PropTypes.oneOf(['selectFiles', 'values.yaml']),
    editorOptions: PropTypes.object,
    hideToolbar: PropTypes.bool,
    hideOverlayBtns: PropTypes.bool,
  }

  static defaultProps = {
    files: {},
    type: 'selectFiles',
    editorOptions: {},
    hideToolbar: false,
    hideOverlayBtns: false,
  }

  DEFAULT_PREVIEW_FILE = 'values.yaml'

  state = {
    selectFile: this.defaultSelectFile,
    mode: 'yaml',
  }

  get fileOptions() {
    const { files = {} } = this.props
    return Object.keys(files).map(fileName => ({
      label: fileName,
      value: fileName,
    }))
  }

  get defaultSelectFile() {
    const { files = {} } = this.props
    const hasDefaultPreview = files[this.DEFAULT_PREVIEW_FILE]
    const firstFile = this.fileOptions.length ? this.fileOptions[0].value : ''
    return hasDefaultPreview ? this.DEFAULT_PREVIEW_FILE : firstFile
  }

  changeMode = mode => {
    this.setState({ mode })
  }

  changeSelectFile = selectFile => {
    this.setState({ selectFile })
  }

  handleDownload = () => {
    const { mode, selectFile } = this.state
    const sourceInYaml = this.props.files[selectFile]
    if (mode === 'yaml') {
      this.downloadAsYaml(sourceInYaml)
    } else if (mode === 'json') {
      this.downloadAsJSON(sourceInYaml)
    }
  }

  downloadAsJSON(text) {
    const fileName = this.state.selectFile.replace(/yaml$/, 'json')
    let valuesData = ''
    try {
      valuesData = JSON.stringify(yaml.safeLoad(text), null, 2)
    } catch (e) {
      valuesData = e
    }
    this.saveAs(valuesData, fileName)
  }

  downloadAsYaml(text) {
    const selectFileName = this.state.selectFile
    this.saveAs(text, selectFileName)
  }

  saveAs(text, fileName) {
    const blob = new Blob([text], {
      type: 'text/plain;charset=utf-8',
    })
    saveAs(blob, fileName)
  }

  renderFileSelect() {
    return (
      <Select
        defaultValue={this.state.selectFile}
        onChange={this.changeSelectFile}
        options={this.fileOptions}
      />
    )
  }

  renderOverlayBtns() {
    const { hideOverlayBtns } = this.props
    if (hideOverlayBtns) {
      return null
    }
    return (
      <div className={styles.overlayTools}>
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

  renderToolbar() {
    const { type, hideToolbar } = this.props
    if (hideToolbar) {
      return null
    }

    return (
      <div className={styles.toolbar}>
        {type === 'selectFiles' && (
          <>
            <div className={styles.icon}>
              <Icon name="coding" size={20} />
              <span>{t('CHART_FILES')}</span>
            </div>
            {this.renderFileSelect()}
          </>
        )}
        {type === 'values.yaml' && (
          <div className={styles.icon}>
            <img src="/assets/helm.svg" alt="" />
            <span>Values.yaml</span>
          </div>
        )}
      </div>
    )
  }

  renderPreviewContent() {
    const { editorOptions } = this.props
    const { mode, selectFile } = this.state
    return (
      <CodeEditor
        mode={mode}
        value={this.props.files[selectFile]}
        {...editorOptions}
      />
    )
  }

  render() {
    const { selectFile } = this.state
    if (!selectFile) {
      return <p>{t('NO_APP_CHART_FILE_FOUND')}</p>
    }

    return (
      <div className={styles.wrapper}>
        {this.renderToolbar()}
        <div className={styles.edit}>
          {this.renderOverlayBtns()}
          {this.renderPreviewContent()}
        </div>
      </div>
    )
  }
}
