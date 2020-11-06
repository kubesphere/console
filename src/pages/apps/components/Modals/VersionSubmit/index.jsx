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
import { set, debounce, pick } from 'lodash'

import { Button } from '@kube-design/components'
import { Modal, Steps } from 'components/Base'
import steps from './steps'

import styles from './index.scss'

export default class CreateModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    detail: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    formTemplate: {},
    detail: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.formRef = React.createRef()
    this.state = {
      currentStep: 0,
      formTemplate: props.formTemplate,
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, formTemplate } = this.props
    if (visible && visible !== prevProps.visible) {
      this.setState({
        currentStep: 0,
        formTemplate,
      })
    }
  }

  versionChange = debounce((value, name) => {
    set(this.props.detail, name, value)
  }, 200)

  handleOk = async () => {
    const form = this.formRef.current
    const formData = pick(this.props.detail, [
      'name',
      'description',
      'app_id',
      'version_id',
    ])
    form && form.validate(() => this.props.onOk(formData))
  }

  handleNext = () => {
    const stepCount = steps.length
    this.setState(({ currentStep }) => ({
      currentStep: Math.min(currentStep + 1, stepCount - 1),
    }))
  }

  handlePrev = () => {
    this.setState(({ currentStep, subRoute }) => ({
      currentStep: Math.max(currentStep - 1, 0),
      subRoute,
    }))
  }

  renderTabs() {
    const { currentStep } = this.state
    if (steps.length < 2) {
      return null
    }

    return (
      <div className={styles.tabs}>
        <Steps steps={steps} current={currentStep} />
      </div>
    )
  }

  renderContent() {
    const { currentStep } = this.state

    const Component = steps[currentStep].component

    if (!Component) {
      return null
    }

    if (steps[currentStep].value === 'updateLog') {
      return (
        <div className={styles.content}>
          <Component
            versionChange={this.versionChange}
            formData={this.props.detail}
            formRef={this.formRef}
          />
        </div>
      )
    }

    return (
      <div className={styles.content}>
        <Component />
      </div>
    )
  }

  renderFooter() {
    const { isSubmitting } = this.props
    const { currentStep } = this.state
    const selectSteps = steps || []

    const showModify = selectSteps.every((step, index) =>
      step.required ? currentStep >= index : true
    )

    const showNext = currentStep < selectSteps.length - 1

    return (
      <div className={styles.footer}>
        {currentStep ? (
          <Button type="default" onClick={this.handlePrev}>
            {t('Previous')}
          </Button>
        ) : null}
        {showNext && (
          <Button type="control" onClick={this.handleNext}>
            {t('Next')}
          </Button>
        )}
        {showModify && (
          <Button
            type="control"
            loading={isSubmitting}
            disabled={isSubmitting}
            onClick={this.handleOk}
          >
            {t('OK')}
          </Button>
        )}
      </div>
    )
  }

  render() {
    const { visible, onCancel } = this.props

    return (
      <Modal
        width={960}
        title={t('Submit for Review')}
        description={t('SUBMIT_REVIEW_DESC')}
        icon={'templet'}
        bodyClassName={styles.body}
        onCancel={onCancel}
        visible={visible}
        hideFooter
      >
        <div>
          {this.renderTabs()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </Modal>
    )
  }
}
