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
import ConfimModal from 'components/Modals/Delete'
import PipelineContent from 'devops/components/Pipeline'

import styles from './pipelineEditModal.scss'

export default class PipelineModal extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    module: PropTypes.string,
    store: PropTypes.object,
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    jsonData: PropTypes.object,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    isSubmitting: false,
  }

  constructor(props) {
    super(props)

    this.CLIENT_WIDTH = document.body.clientWidth

    this.state = {
      isshowComfim: false,
    }
  }

  hideConfim = () => {
    this.setState({ isshowComfim: false })
  }

  showConfirm = () => {
    this.setState({ isshowComfim: true })
  }

  handleCancel = () => {
    this.hideConfim()
    const { devops, name } = this.props.params
    localStorage.removeItem(`${globals.user.username}-${devops}-${name}`)
    this.props.onCancel()
  }

  renderForms() {
    const { jsonData, projectName, params, isSubmitting } = this.props
    return (
      <PipelineContent
        className={styles.content}
        isEditMode
        params={params}
        jsonData={jsonData}
        projectName={projectName}
        onOk={this.props.onOk}
        onCancel={this.showConfirm}
        isSubmitting={isSubmitting}
      />
    )
  }

  render() {
    const { visible } = this.props

    return (
      <React.Fragment>
        <Modal
          width={Math.max(this.CLIENT_WIDTH - 40, 1200)}
          bodyClassName={styles.body}
          visible={visible}
          closable={false}
          maskClosable={false}
          onOk={this.props.onOk}
          onCancel={this.showConfirm}
          hideHeader
          hideFooter
        >
          <div className={styles.title}>{t('Pipeline Configuration')}</div>
          {this.renderForms()}
        </Modal>
        <ConfimModal
          visible={this.state.isshowComfim}
          onCancel={this.hideConfim}
          onOk={this.handleCancel}
          title={t('Close')}
          desc={t('Are you sure to close this pipeline Editor ?')}
        />
      </React.Fragment>
    )
  }
}
