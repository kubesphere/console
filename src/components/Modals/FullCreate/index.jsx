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

import { get, cloneDeep, isFunction } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Button } from '@kube-design/components'
import { Modal, Switch } from 'components/Base'
import { ICON_TYPES } from 'utils/constants'

import Steps from './Steps'
import Code from './Code'

import styles from './index.scss'

export default class FullCreateModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    steps: PropTypes.array,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  static childContextTypes = {
    setSteps: PropTypes.func,
    setCurrentStep: PropTypes.func,
    setFormData: PropTypes.func,
  }

  getChildContext() {
    return {
      setSteps: this.setSteps,
      setCurrentStep: this.setCurrentStep,
      setFormData: this.setFormData,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: 0,
      steps: props.steps,
      formTemplate: cloneDeep(props.formTemplate),
    }

    this.formRef = React.createRef()
    this.codeRef = React.createRef()
  }

  setSteps = steps => {
    this.setState({ steps })
  }

  setCurrentStep = currentStep => {
    this.setState({ currentStep })
  }

  setFormData = formTemplate => {
    this.setState({ formTemplate })
  }

  handleOk = () => {
    const { isCodeMode } = this.state
    let data
    if (isCodeMode && isFunction(get(this, 'codeRef.current.getData'))) {
      data = this.codeRef.current.getData()
    } else {
      data = this.state.formTemplate
    }

    this.props.onOk(data)
  }

  handlePrev = () => {
    this.setState(({ currentStep }) => ({
      currentStep: Math.max(0, currentStep - 1),
    }))
  }

  handleNext = () => {
    const form = this.formRef.current
    const { steps } = this.state
    form &&
      form.validate(() => {
        this.setState(({ currentStep }) => ({
          currentStep: Math.min(steps.length - 1, currentStep + 1),
        }))
      })
  }

  handleModeChange = () => {
    this.setState(({ isCodeMode, formTemplate }) => {
      let newFormData = formTemplate

      if (isCodeMode && isFunction(get(this, 'codeRef.current.getData'))) {
        newFormData = this.codeRef.current.getData()
      }

      return { isCodeMode: !isCodeMode, formTemplate: newFormData }
    })
  }

  renderForm() {
    const { store } = this.props
    const { formTemplate, steps, currentStep } = this.state

    const step = steps[currentStep]
    const Component = step.component

    const props = {
      store,
      formTemplate,
      formRef: this.formRef,
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.form}>
          <Component {...props} />
        </div>
      </div>
    )
  }

  renderCode() {
    const { formTemplate } = this.state

    return <Code ref={this.codeRef} formTemplate={formTemplate} />
  }

  renderHeader() {
    const { module, title, onCancel } = this.props
    const { steps, currentStep, isCodeMode } = this.state
    return (
      <div className={styles.header}>
        <div className={styles.title}>
          <Icon name="close" size={20} clickable onClick={onCancel} />
          <span />
          <Icon name={ICON_TYPES[module]} size={20} />
          <span>{title}</span>
        </div>
        {!isCodeMode && (
          <div className={styles.steps}>
            <div />
            <Steps steps={steps} current={currentStep} />
          </div>
        )}
        <Switch
          className={styles.switch}
          text={t('EDIT_YAML')}
          onChange={this.handleModeChange}
          checked={isCodeMode}
        />
        <div className={styles.headerBottom} />
      </div>
    )
  }

  renderFooter() {
    const { onCancel, isSubmitting } = this.props
    const { steps, currentStep, isCodeMode } = this.state

    if (isCodeMode) {
      return (
        <div className={styles.footer}>
          <div className={styles.wrapper}>
            <div className="text-right">
              <Button onClick={onCancel}>{t('CANCEL')}</Button>
              <Button
                type="control"
                onClick={this.handleOk}
                loading={isSubmitting}
              >
                {t('CREATE')}
              </Button>
            </div>
          </div>
        </div>
      )
    }

    const total = steps.length - 1
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
    const { isCodeMode } = this.state

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
        <div className={styles.content}>
          {isCodeMode ? this.renderCode() : this.renderForm()}
        </div>
        {this.renderFooter()}
      </Modal>
    )
  }
}
