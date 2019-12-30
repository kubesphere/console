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

import { get } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'

import { formatRules } from 'utils'
import { Modal, Steps, Button } from 'components/Base'

import STEPS from './steps'

import styles from './index.scss'

@observer
export default class CreateModal extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    module: PropTypes.string,
    rulesInfo: PropTypes.array,
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

    if (props.edit) {
      const { name, namespace } = get(props.formTemplate, 'metadata', {})
      this.fetchRules({ name, namespace })
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, edit, formTemplate } = this.props
    if (visible && visible !== prevProps.visible) {
      this.setState({ currentStep: 0, formTemplate })

      if (edit) {
        const { name, namespace } = get(formTemplate, 'metadata', {})
        this.fetchRules({ name, namespace })
      }
    }
  }

  get steps() {
    return STEPS[this.props.module]
  }

  fetchRules(params = {}) {
    if (params.name)
      this.props.store.fetchRules(params).then(() => {
        const rules = toJS(this.props.store.rules.data)
        this.setState({
          formTemplate: {
            ...this.state.formTemplate,
            rules: formatRules(rules),
          },
        })
      })
  }

  handleCreate = () => {
    const form = this.formRef.current
    const { onOk, rulesInfo } = this.props

    form &&
      form.validate(() => {
        const data = form.getData()

        let rules = []
        Object.keys(data.rules).forEach(key => {
          const actionNames = data.rules[key]
          const ruleInfo = rulesInfo.find(_ruleInfo => _ruleInfo.name === key)

          if (ruleInfo && ruleInfo.actions && actionNames) {
            actionNames.forEach(name => {
              const action = ruleInfo.actions.find(
                _action => _action.name === name
              )
              rules = [...rules, ...action.rules]
            })
          }
        })

        data.rules = rules

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
    const { rulesInfo, store, edit } = this.props
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
          rulesInfo={rulesInfo}
          edit={edit}
        />
      </div>
    )
  }

  renderFooter() {
    const { currentStep } = this.state
    const { edit, isSubmitting } = this.props

    const showCreate = this.steps.every((step, index) =>
      step.required ? currentStep >= index : true
    )

    const showNext = currentStep < this.steps.length - 1

    return (
      <div className={styles.footer} data-test="modal-footer">
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
        closable={false}
        isSubmitting={isSubmitting}
        hideFooter
      >
        {this.renderTabs()}
        {this.renderContent()}
        {this.renderFooter()}
      </Modal>
    )
  }
}
