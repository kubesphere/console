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
import { Icon } from '@pitrix/lego-ui'
import { Modal, Steps, Button } from 'components/Base'

import steps from './steps'

import styles from './index.scss'

const PROJECT_TYPES = [
  {
    key: 'projects',
    icon: 'project',
    title: 'PROJECT_TYPES_PROJECT_TITLE',
    desc: 'PROJECT_TYPES_PROJECT_DESC',
  },
  {
    key: 'devops',
    icon: 'strategy-group',
    title: 'PROJECT_TYPES_DEVOPS_TITLE',
    desc: 'PROJECT_TYPES_DEVOPS_DESC',
  },
]

export default class ProjectCreateModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    type: PropTypes.string,
  }

  static defaultProps = {
    formTemplate: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
    type: '',
  }

  constructor(props) {
    super(props)

    this.state = {
      selectType: props.type,
      currentStep: 0,
      formTemplate: props.formTemplate,
    }

    this.formRef = React.createRef()
  }

  componentDidUpdate(prevProps) {
    const { visible, type, formTemplate } = this.props
    if (visible && visible !== prevProps.visible) {
      this.setState({
        currentStep: 0,
        selectType: type,
        formTemplate,
      })
    }
  }

  handleTypeChange = e => {
    const { type } = e.currentTarget.dataset
    this.setState({ selectType: type })
  }

  handleCreate = () => {
    const form = this.formRef.current
    const { onOk } = this.props
    const { selectType, formTemplate } = this.state

    form &&
      form.validate(() => {
        onOk({ ...formTemplate[selectType], type: selectType })
      })
  }

  handleNext = () => {
    const form = this.formRef.current
    const selectSteps = steps[this.state.selectType] || []
    const stepCount = selectSteps.length

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
    const { currentStep, selectType } = this.state
    const selectSteps = steps[selectType] || []

    if (selectSteps.length < 2) {
      return null
    }

    return (
      <div className={styles.tabs}>
        <Steps steps={selectSteps} current={currentStep} />
      </div>
    )
  }

  renderContent() {
    const { currentStep, selectType, formTemplate } = this.state
    const selectSteps = steps[selectType] || []

    const Component = selectSteps[currentStep].component

    if (!Component) {
      return null
    }

    return (
      <div className={styles.content}>
        <Component
          formRef={this.formRef}
          formTemplate={formTemplate[selectType]}
        />
      </div>
    )
  }

  renderFooter() {
    const { isSubmitting } = this.props
    const { currentStep, selectType } = this.state
    const selectSteps = steps[selectType] || []

    const showCreate = selectSteps.every((step, index) =>
      step.required ? currentStep >= index : true
    )

    const showNext = currentStep < selectSteps.length - 1

    return (
      <div className={styles.footer}>
        {currentStep ? (
          <Button
            type="default"
            onClick={this.handlePrev}
            data-test="modal-previous"
          >
            {t('Previous')}
          </Button>
        ) : null}
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
            {t('Create')}
          </Button>
        )}
      </div>
    )
  }

  renderSelect() {
    return (
      <div className={styles.typeWrapper}>
        <div className="h3">{t('Select Project Type')}</div>
        <p>-</p>
        {PROJECT_TYPES.map(type => (
          <div
            key={type.key}
            className={styles.type}
            data-type={type.key}
            onClick={this.handleTypeChange}
          >
            {type.icon.startsWith('/') ? (
              <img src={type.icon} alt="" />
            ) : (
              <Icon name={type.icon} size={32} />
            )}
            <div className={styles.text}>
              <div className="h6">{t(type.title)}</div>
              <p>{t(type.desc)}</p>
            </div>
          </div>
        ))}
        <img
          className={styles.bottomImage}
          src="/assets/undraw-target-kriv.svg"
          alt=""
        />
      </div>
    )
  }

  render() {
    const { visible, onCancel } = this.props

    const showSelect = this.state.selectType === ''

    return (
      <Modal
        width={this.state.selectType === 'devops' ? 700 : 960}
        title={
          this.state.selectType === 'devops'
            ? t('Create DevOps Project')
            : t('Create Project')
        }
        bodyClassName={styles.body}
        onCancel={onCancel}
        visible={visible}
        closable={false}
        hideFooter
        hideHeader={showSelect}
      >
        {showSelect ? (
          this.renderSelect()
        ) : (
          <div>
            {this.renderTabs()}
            {this.renderContent()}
            {this.renderFooter()}
          </div>
        )}
      </Modal>
    )
  }
}
