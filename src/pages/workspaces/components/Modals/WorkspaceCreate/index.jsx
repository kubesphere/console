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

import { cloneDeep } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from '@kube-design/components'
import { Modal } from 'components/Base'
import FORM_TEMPLATES from 'utils/form.templates'

import Steps from './Steps'
import BaseInfo from './BaseInfo'
import ClusterSettings from './ClusterSettings'

import styles from './index.scss'

export default class WorkspaceCreateModal extends React.Component {
  static propTypes = {
    namespace: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    sampleApp: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: 0,
      formTemplate: cloneDeep(FORM_TEMPLATES['workspaces']()),
    }

    this.formRef = React.createRef()
  }

  get steps() {
    if (!globals.app.isMultiCluster) {
      return [
        {
          title: 'BASIC_INFORMATION',
          component: BaseInfo,
          required: true,
          isForm: true,
        },
      ]
    }

    return [
      {
        title: 'BASIC_INFORMATION',
        component: BaseInfo,
        required: true,
        isForm: true,
      },
      {
        title: 'CLUSTER_SETTINGS',
        component: ClusterSettings,
        required: true,
      },
    ]
  }

  handleOk = () => {
    this.props.onOk(this.state.formTemplate)
  }

  handlePrev = () => {
    this.setState(({ currentStep }) => ({
      currentStep: Math.max(0, currentStep - 1),
    }))
  }

  handleNext = () => {
    const form = this.formRef.current
    form &&
      form.validate(() => {
        this.setState(({ currentStep }) => ({
          currentStep: Math.min(this.steps.length - 1, currentStep + 1),
        }))
      })
  }

  renderForm() {
    const { store } = this.props
    const { formTemplate, currentStep } = this.state

    const step = this.steps[currentStep]
    const Component = step.component

    const props = {
      store,
      formTemplate,
    }

    if (step.isForm) {
      props.formRef = this.formRef
    } else {
      props.ref = this.formRef
    }

    return (
      <div className={styles.formWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <Component {...props} />
          </div>
        </div>
      </div>
    )
  }

  renderHeader() {
    const { onCancel } = this.props
    const { currentStep } = this.state
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon name="close" size={20} clickable onClick={onCancel} />
          <span />
          <Icon name="enterprise" size={20} />
          <span>{t('CREATE_WORKSPACE')}</span>
        </div>
        <div className={styles.wrapper}>
          {this.steps.length > 1 && (
            <Steps steps={this.steps} current={currentStep} />
          )}
        </div>
        <div className={styles.headerBottom} />
      </div>
    )
  }

  renderFooter() {
    const { onCancel, isSubmitting } = this.props
    const { currentStep } = this.state

    const total = this.steps.length - 1
    return (
      <div className={styles.footer}>
        <div className={styles.wrapper}>
          <div className="text-right">
            <Button onClick={onCancel}>{t('CANCEL')}</Button>
            {currentStep > 0 && (
              <Button type="control" onClick={this.handlePrev}>
                {t('PREVIOUS')}
              </Button>
            )}
            {currentStep < total ? (
              <Button type="control" onClick={this.handleNext}>
                {t('NEXT')}
              </Button>
            ) : (
              <Button
                type="control"
                onClick={this.handleOk}
                loading={isSubmitting}
              >
                {t('CREATE')}
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { visible } = this.props

    return (
      <Modal
        className={styles.modal}
        bodyClassName={styles.body}
        visible={visible}
        hideHeader
        hideFooter
        fullScreen
      >
        {this.renderHeader()}
        {this.renderForm()}
        {this.renderFooter()}
      </Modal>
    )
  }
}
