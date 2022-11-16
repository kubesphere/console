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
import ConfirmModal from 'components/Modals/Delete'

import { isEqual } from 'lodash'
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
    this.state = {
      value: props.defaultValue ?? '',
      isLoading: false,
      isShowConfirm: false,
      shouldCheckScriptCompile: true,
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, defaultValue } = this.props
    if (visible && !prevProps.visible && defaultValue) {
      this.setState({ value: defaultValue })
    }
  }

  showConfirm = () => {
    const { defaultValue } = this.props
    const { value } = this.state
    if (!isEqual(defaultValue, value)) {
      this.setState({ isShowConfirm: true })
    } else {
      this.props.onCancel()
    }
  }

  hideConfirm = () => {
    this.setState({ isShowConfirm: false })
  }

  handleCancel = () => {
    this.hideConfirm()
    this.props.onCancel()
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
      .checkScriptCompile(
        {
          value: this.newValue,
          pipeline,
          devops,
          cluster,
        },
        () => {
          this.setState({
            shouldCheckScriptCompile: false,
          })
        }
      )
      .finally(() => this.setState({ isLoading: false }))

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

  saveJenkins = jenkinsFile => {
    const { devops, name: pipeline } = this.props.params
    this.setState({ isLoading: true })
    return request
      .put(
        `/kapis/devops.kubesphere.io/v1alpha3/devops/${devops}/pipelines/${pipeline}/jenkinsfile?mode=raw`,
        { data: jenkinsFile },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .finally(() => this.setState({ isLoading: false }))
  }

  handleOk = async () => {
    this.newValue = this.state.value.replace(/\t/g, '    ')

    if (this.state.shouldCheckScriptCompile) {
      const hasError = await this.checkScriptCompile()
      if (hasError) {
        return
      }
    }

    await this.saveJenkins(this.newValue)
    this.props.onOk(this.newValue)
  }

  render() {
    const { visible, isSubmitting } = this.props
    const {
      isShowConfirm,
      error,
      shouldCheckScriptCompile,
      value,
      isLoading,
    } = this.state

    return (
      <>
        <Modal
          icon="cogwheel"
          width={900}
          bodyClassName={styles.body}
          isSubmitting={isSubmitting || isLoading}
          onCancel={this.showConfirm}
          onOk={this.handleOk}
          okButtonType={!shouldCheckScriptCompile ? 'danger' : undefined}
          okText={!shouldCheckScriptCompile ? 'continue' : undefined}
          visible={visible}
          closable={false}
          maskClosable={false}
          title={'Jenkinsfile'}
        >
          <>
            <CodeEditor
              className={styles.codeEditor}
              name="script"
              mode="groovy"
              value={value}
              onChange={this.handleChange}
              options={
                error && {
                  annotations: [error],
                }
              }
            />
            {error && (
              <div className={styles.checkResult}>
                <img src="/assets/error.svg" />
                <span>{t('JENKINS_LINS_ERROR', { line: error.row + 1 })}</span>
              </div>
            )}
            {!shouldCheckScriptCompile && (
              <div className={styles.checkResult}>
                <img src="/assets/error.svg" />
                <span>{t('FAILED_CHECK_SCRIPT_COMPILE')}</span>
              </div>
            )}
          </>
        </Modal>
        <ConfirmModal
          visible={isShowConfirm}
          onCancel={this.hideConfirm}
          onOk={this.handleCancel}
          title={t('CLOSE')}
          desc={t('CLOSE_JENKINSFILE_EDITOR_TIP')}
        />
      </>
    )
  }
}
