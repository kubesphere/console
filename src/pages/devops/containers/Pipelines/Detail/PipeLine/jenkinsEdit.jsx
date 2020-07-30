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

import { Modal } from 'components/Base'
import CodeEditor from 'components/Base/CodeEditor'
import PipelineStore from 'stores/devops/pipelines'

import styles from './index.scss'

export default class JenkinsEdit extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    params: PropTypes.object,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)
    this.store = new PipelineStore()
    this.state = { value: props.defaultValue, isLoading: false }
  }

  componentDidUpdate(prevProps) {
    const { visible, defaultValue } = this.props
    if (visible && !prevProps.visible && defaultValue) {
      this.setState({ value: defaultValue })
    }
  }

  handleChange = value => {
    this.setState({ value })
  }

  getEditorInstance = editor => {
    this.editor = editor
  }

  checkScriptCompile = async () => {
    const { devops, name: pipeline, cluster } = this.props.params
    this.setState({ isLoading: true })
    const res = await this.store
      .checkScriptCompile({
        value: this.newValue,
        pipeline,
        devops,
        cluster,
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
    if (res.status === 'fail') {
      this.setState({
        error: {
          row: res.line - 1,
          column: res.column,
          type: 'error',
          text: res.message,
        },
      })
      this.forceUpdate()
      return res
    }
    this.setState({ error: null })
    return false
  }

  handleOk = async () => {
    this.newValue = this.state.value.replace(/\t/g, '    ')
    const hasError = await this.checkScriptCompile()
    if (hasError) {
      return
    }
    this.props.onOk(this.newValue)
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        icon="cogwheel"
        width={900}
        bodyClassName={styles.body}
        isSubmitting={this.props.isSubmitting || this.state.isLoading}
        onCancel={onCancel}
        onOk={this.handleOk}
        renderFooter={this.renderFooter}
        visible={visible}
        closable={false}
        maskClosable={false}
        title={t('Jenkinsfile')}
      >
        <>
          <CodeEditor
            className={styles.codeEditor}
            name="script"
            mode="groovy"
            value={this.state.value}
            onChange={this.handleChange}
            options={
              this.state.error && {
                annotations: [this.state.error],
              }
            }
          />
          {this.state.error && (
            <div className={styles.checkResult}>
              <img src="/assets/error.svg" />
              <span>
                {t('JENKINS_LINS_ERROR', { line: this.state.error.row + 1 })}
              </span>
            </div>
          )}
        </>
      </Modal>
    )
  }
}
