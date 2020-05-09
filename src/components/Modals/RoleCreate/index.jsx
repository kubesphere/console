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

import { set, flatten } from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import { Modal, Steps, Button } from 'components/Base'

import STEPS from './steps'

import styles from './index.scss'

@observer
export default class CreateModal extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    module: PropTypes.string,
    roleTemplates: PropTypes.array,
    formTemplate: PropTypes.object,
    title: PropTypes.string,
    visible: PropTypes.bool,
    edit: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    module: 'roles',
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      currentStep: 0,
      formTemplate: props.formTemplate,
    }

    this.formRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    const { visible, formTemplate } = this.props
    if (visible && visible !== prevProps.visible) {
      this.setState({ currentStep: 0, formTemplate })
    }
  }

  get steps() {
    return STEPS
  }

  handleCreate = () => {
    const form = this.formRef.current
    const { onOk } = this.props

    form &&
      form.validate(() => {
        const data = form.getData()

        if (data.roleTemplates) {
          set(
            data,
            'metadata.annotations["iam.kubesphere.io/aggregation-roles"]',
            JSON.stringify(flatten(Object.values(data.roleTemplates)))
          )
        }

        onOk(data)
      })
  }

  handleNext = () => {
    const form = this.formRef.current
    const stepCount = this.steps.length

    form &&
      form.validate(() => {
        this.setState(({ currentStep }) => ({
          currentStep: Math.min(currentStep + 1, stepCount - 1),
        }))
      })
  }

  handlePrev = () => {
    this.setState(({ currentStep, subRoute }) => ({
      currentStep: Math.max(currentStep - 1, 0),
      subRoute,
    }))
  }

  renderTabs() {
    const { currentStep } = this.state

    return (
      <div className={styles.tabs}>
        <Steps steps={this.steps} current={currentStep} />
      </div>
    )
  }

  renderContent() {
    const {
      module,
      cluster,
      namespace,
      workspace,
      roleTemplates,
      store,
      edit,
    } = this.props
    const { currentStep, formTemplate } = this.state

    const Component = this.steps[currentStep].component

    if (!Component) {
      return null
    }

    return (
      <div className={styles.content}>
        <Component
          store={store}
          formRef={this.formRef}
          formTemplate={formTemplate}
          roleTemplates={roleTemplates}
          module={module}
          cluster={cluster}
          namespace={namespace}
          workspace={workspace}
          edit={edit}
        />
      </div>
    )
  }

  renderFooter() {
    const { currentStep } = this.state
    const { edit, isSubmitting, onCancel } = this.props

    const showCreate = this.steps.every((step, index) =>
      step.required ? currentStep >= index : true
    )

    const showNext = currentStep < this.steps.length - 1

    return (
      <div className={styles.footer} data-test="modal-footer">
        <Button onClick={onCancel}>{t('Cancel')}</Button>
        <Button
          type="default"
          onClick={this.handlePrev}
          data-test="modal-previous"
        >
          {t('Previous')}
        </Button>
        {showNext && (
          <Button
            type="control"
            onClick={this.handleNext}
            data-test="modal-next"
          >
            {t('Next')}
          </Button>
        )}
        {showCreate && (
          <Button
            type="control"
            loading={isSubmitting}
            disabled={isSubmitting}
            onClick={this.handleCreate}
            data-test="modal-create"
          >
            {edit ? t('Update') : t('Create')}
          </Button>
        )}
      </div>
    )
  }

  render() {
    const { title, visible, onCancel, isSubmitting } = this.props

    return (
      <Modal
        width={960}
        title={title || t('Create Role')}
        bodyClassName={styles.body}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        maskClosable={false}
        hideFooter
      >
        {this.renderTabs()}
        {this.renderContent()}
        {this.renderFooter()}
      </Modal>
    )
  }
}
