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
import { get, throttle, isEmpty } from 'lodash'
import { Button } from '@kube-design/components'

import { Steps } from 'components/Base'
import { checkRepoSource } from 'utils/devops'
import Confirm from 'components/Forms/Base/Confirm'

import styles from './index.scss'

export default class FormMode extends React.Component {
  static propTypes = {
    module: PropTypes.string,
    type: PropTypes.string,
    store: PropTypes.object,
    steps: PropTypes.array,
    formTemplate: PropTypes.object,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
  }

  static defaultProps = {
    isSubmitting: false,
    onOk() {},
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
    setSteps: PropTypes.func,
    setCurrentStep: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
      setSteps: this.setSteps,
      setCurrentStep: this.setCurrentStep,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: props.currentStep || 0,
      subRoute: {},
      steps: props.steps,
    }

    this.formRef = React.createRef()
  }

  hasSubRoute = () => !isEmpty(this.state.subRoute)

  getCurrentStep = () => this.state.currentStep

  handleCreate = () => {
    const form = this.formRef.current
    const { onOk, formTemplate } = this.props
    form &&
      form.validate(() => {
        this.setState({
          subRoute: {},
        })
        onOk(formTemplate)
      })
  }

  setSteps = steps => {
    this.setState({ steps })
  }

  setCurrentStep = currentStep => {
    this.setState({ currentStep })
  }

  handleNext = throttle(() => {
    const form = this.formRef.current

    if (!form) {
      return
    }

    const stepCount = this.state.steps.length

    form.validate(() => {
      const multiPipeline = get(form.props, 'data.multi_branch_pipeline')
      multiPipeline && checkRepoSource(multiPipeline)
      this.setState({
        currentStep: Math.min(this.state.currentStep + 1, stepCount - 1),
        subRoute: {},
      })
    })
  }, 300)

  handlePrev = () => {
    this.setState(({ currentStep, subRoute }) => {
      let step = currentStep

      if (subRoute && subRoute.onCancel) {
        subRoute.onCancel()
        subRoute = {}
      } else {
        step = Math.max(currentStep - 1, 0)
      }

      return {
        currentStep: step,
        subRoute,
      }
    })
  }

  handleSubFormSave = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onSave) {
      subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onCancel) {
      subRoute.onCancel()
      this.setState({ subRoute: {} })
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({
      subRoute: {
        onSave,
        onCancel,
      },
    })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  renderTabs() {
    const { steps, currentStep } = this.state

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
    const { steps, currentStep } = this.state
    const { contentWidth } = this.props

    const Component = get(steps, `[${currentStep}].component`)

    if (!Component) {
      return null
    }

    return (
      <div className={styles.contentWrapper}>
        <div className={styles.content} style={{ width: contentWidth || 920 }}>
          <Component formRef={this.formRef} {...this.props} />
        </div>
      </div>
    )
  }

  renderFooter() {
    const { subRoute, steps, currentStep } = this.state
    const { onCancel, okBtnText, isSubmitting } = this.props

    const showCreate = steps.every((step, index) =>
      step.required ? currentStep >= index : true
    )

    const showNext = currentStep < steps.length - 1

    return (
      <div className={styles.footer}>
        <Button onClick={onCancel}>{t('CANCEL')}</Button>
        {currentStep ? (
          <Button
            type="default"
            onClick={this.handlePrev}
            data-test="modal-previous"
          >
            {t('PREVIOUS')}
          </Button>
        ) : null}
        {showNext && (
          <Button
            type="control"
            onClick={this.handleNext}
            disabled={!isEmpty(subRoute)}
            data-test="modal-next"
          >
            {t('NEXT')}
          </Button>
        )}
        {showCreate && (
          <Button
            type="control"
            onClick={this.handleCreate}
            loading={isSubmitting}
            disabled={isSubmitting || !isEmpty(subRoute)}
            data-test="modal-create"
          >
            {okBtnText || t('CREATE')}
          </Button>
        )}
      </div>
    )
  }

  renderSaveBar() {
    const { subRoute } = this.state

    if (isEmpty(subRoute)) {
      return null
    }

    return (
      <Confirm
        className={styles.confirm}
        onOk={this.handleSubFormSave}
        onCancel={this.handleSubFormCancel}
      />
    )
  }

  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.renderContent()}
        {this.renderSaveBar()}
        {this.renderFooter()}
      </div>
    )
  }
}
