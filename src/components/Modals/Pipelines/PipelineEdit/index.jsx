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
import classnames from 'classnames'
import { isEmpty } from 'lodash'
import PipelineTemplate from 'devops/components/Pipeline/PipelineTemplate'

import styles from './index.scss'

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
      createPipelineType: !isEmpty(this.props.jsonData) ? 'custom' : undefined,
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

  renderPipelineContent() {
    const { jsonData, params, isSubmitting } = this.props
    const { createPipelineType } = this.state

    if (!createPipelineType) {
      return <PipelineTemplate />
    }

    return (
      <PipelineContent
        className={styles.content}
        isEditMode
        params={params}
        jsonData={jsonData}
        onOk={this.props.onOk}
        onCancel={this.showConfirm}
        isSubmitting={isSubmitting}
      />
    )
  }

  render() {
    const { visible } = this.props
    const { createPipelineType } = this.state
    const isPipelineModal = !isEmpty(createPipelineType)

    const modalProps = {
      hideHeader: isPipelineModal,
      closable: !isPipelineModal,
      title: t('Create Pipeline'),
      imageIcon: '/assets/pipeline/pipeline-icon-dark.svg',
      description: 'Build, test and deploy with Pipelines',
    }

    return (
      <React.Fragment>
        <Modal
          width={
            !createPipelineType
              ? '1400px'
              : Math.max(this.CLIENT_WIDTH - 40, 1200)
          }
          bodyClassName={classnames(styles.body, {
            [styles.templeHeight]: !createPipelineType,
          })}
          visible={visible}
          closable={false}
          maskClosable={false}
          onOk={this.props.onOk}
          onCancel={this.showConfirm}
          hideFooter
          {...modalProps}
        >
          {this.renderPipelineContent()}
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
