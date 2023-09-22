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

import { Button, Form, Icon, Input, Select } from '@kube-design/components'

import { get, isEmpty, isEqual, set } from 'lodash'

import { action, observable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import cardStyles from '../Card/index.scss'

import styles from '../Sider/index.scss'
import YamlEditor from '../StepModals/kubernetesYaml'
import StepsSelector from '../StepsSelector'
import StepContainer from './StepContainer'

const AgentType = [
  { label: 'Any', value: 'any' },
  { label: 'node', value: 'node' },
  { label: 'kubernetes', value: 'kubernetes' },
  { label: 'none', value: 'none' },
]

const stepNameMapper = {
  sh: 'shell',
}

@observer
export default class StepsEditor extends React.Component {
  static defaultProps = {
    activeStage: {},
  }

  @observable
  zIndex = ''

  @observable
  isEditMode = false

  @observable
  formData = {}

  @observable
  showYaml = false

  get steps() {
    return get(this.props.activeStage, 'branches[0].steps', [])
  }

  get labelDataList() {
    return get(this.props.store, 'labelDataList', [])
  }

  get hasNestStage() {
    return !!this.props.activeStage.stages
  }

  get agentType() {
    return get(this.props.activeStage, 'agent.type', 'none')
  }

  static childContextTypes = {
    toggleAddStep: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDeleteStep: PropTypes.func,
  }

  getChildContext() {
    return {
      toggleAddStep: this.toggleAddStep,
      handleEdit: this.handleEdit,
      handleDeleteStep: this.handleDeleteStep,
    }
  }

  @action
  handleChangeName = value => {
    this.props.activeStage.name = value
    this.handleSetValue()
  }

  @action
  handleSetYaml = value => {
    this.formData.yaml = value
    this.handleAgentTypeArg()
    this.showYaml = false
  }

  @action
  hideYamlEditor = () => {
    this.showYaml = false
  }

  @action
  showEditor = () => {
    this.showYaml = true
  }

  componentDidMount() {
    this.initFormData()
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.activeStage, prevProps.activeStage)) {
      this.initFormData()
    }
  }

  initFormData = () => {
    const args = toJS(get(this.props.activeStage, 'agent.arguments', []))

    this.formData = args.reduce((data, arg) => {
      if (Array.isArray(arg.value)) {
        const result = arg.value.reduce((_data, _arg) => {
          const _argObj = {}
          _argObj[_arg.key] = _arg.value.value
          _data.push(_argObj)
          return _data
        }, [])
        data[arg.key] = result
      } else {
        data[arg.key] = arg.value.value
      }
      return data
    }, {})
  }

  getAgentArguments() {
    const agentType = get(this.props.activeStage, 'agent.type')
    const argument = get(this.props.activeStage, 'agent.arguments')
    const formDataJson = toJS(this.formData)

    if (!agentType) {
      set(this.props.activeStage, 'agent.type', 'none')
    }

    if (!isEmpty(formDataJson)) {
      const _arguments = Object.keys(this.formData).map(key => {
        const value = toJS(this.formData[key])

        if (Array.isArray(value)) {
          const _value = value.map(item => {
            const a = Object.keys(item).map(_key => ({
              key: _key,
              value: { isLiteral: true, value: item[_key] },
            }))
            return a[0]
          })

          return {
            key,
            value: _value,
          }
        }
        return {
          key,
          value: { isLiteral: true, value },
        }
      })

      set(
        this.props.activeStage,
        'agent.arguments',
        isEmpty(_arguments) ? undefined : _arguments
      )
    }

    if (isEmpty(formDataJson) && !isEmpty(toJS(argument))) {
      delete this.props.activeStage.agent.arguments
    }
  }

  handleAgentTypeArg = () => {
    this.getAgentArguments()
  }

  renderAgentForms = () => {
    const labelDataList = toJS(this.labelDataList)
    const labelDefaultValue = get(labelDataList, '0.value', '')

    switch (this.agentType) {
      case 'node':
        return (
          <Form data={this.formData} ref={this.formRef}>
            <Form.Item
              label={t('label')}
              desc={t(
                'The label on which to run the Pipeline or individual stage'
              )}
            >
              <Select
                name="label"
                options={labelDataList}
                defaultValue={labelDefaultValue}
                onChange={this.handleAgentTypeArg}
              />
            </Form.Item>
          </Form>
        )
      case 'kubernetes':
        return (
          <Form data={this.formData} ref={this.formRef}>
            <Form.Item label={t('label')} desc={t('')}>
              <Input
                name="label"
                defaultValue="default"
                onChange={this.handleAgentTypeArg}
              />
            </Form.Item>
            <Form.Item
              label={t('yaml')}
              desc={
                <span className={styles.clickable} onClick={this.showEditor}>
                  {t('show yaml editor')}
                </span>
              }
            >
              <Input name="yaml" onChange={this.handleAgentTypeArg} />
            </Form.Item>
            <Form.Item label={t('defaultContainer')} desc={t('')}>
              <Input
                name="defaultContainer"
                onChange={this.handleAgentTypeArg}
              />
            </Form.Item>
          </Form>
        )
      default:
        return null
    }
  }

  @action
  handleAgentTypeChange = type => {
    let labelValue = ''
    switch (type) {
      case 'node':
        labelValue = get(toJS(this.labelDataList), '0.value', '')
        this.formData = { label: labelValue }
        break
      case 'kubernetes':
        labelValue = 'default'
        this.formData = { label: labelValue }
        break
      default:
        this.formData = {}
    }

    set(this.props.activeStage, 'agent.type', type)
    this.handleAgentTypeArg()
    this.handleSetValue()
  }

  handleDelete = () => {
    this.props.store.deleteStage()
  }

  @action
  toggleAddStep = (zIndex, type) => () => {
    this.isEditMode = false
    this.zIndex = zIndex
    this.props.store.isAddingStep = type || true
  }

  @action
  handleEdit = (zIndex, index, step, type) => () => {
    this.props.store.setEdittingData({
      type: stepNameMapper[step.name] || step.name.toLowerCase(),
      data: step.arguments,
    })

    this.index = index
    this.zIndex = zIndex
    this.isEditMode = true
    this.props.store.isAddingStep = type || true
  }

  @action
  handleEditCancel = () => {
    if (this.isEditMode) {
      this.isEditMode = false
      this.props.store.isAddingStep = false
      this.props.store.setEdittingData({})
    }
  }

  @action
  handleEditStep = step => {
    if (this.zIndex.length) {
      const path = this.zIndex.reduce((_path, value, _index) => {
        if (_index === 0) {
          return `[${value}]`
        }

        return `${_path}.children[${value}]`
      }, '')

      const prevDataChildren = get(
        this.steps,
        `${path}.children[${this.index}].children`
      )

      if (prevDataChildren) {
        step.children = prevDataChildren
      }

      get(this.steps, `${path}.children`).splice(this.index, 1, step)
    } else {
      const prevDataChildren = get(this.steps, `[${this.index}].children`)

      if (prevDataChildren) {
        step.children = prevDataChildren
      }

      this.steps.splice(this.index, 1, step)
    }

    this.props.store.isAddingStep = false
    this.isEditMode = false
    this.props.store.setEdittingData({})
    this.handleSetValue()
  }

  @action
  handleAddStep = step => {
    if (this.isEditMode) {
      this.handleEditStep(step)
      return
    }

    let prevData = this.steps

    if (typeof this.props.store.isAddingStep === 'string') {
      if (!this.props.activeStage.when) {
        set(this.props.activeStage, 'when.conditions', [])
      }
      prevData = this.props.activeStage.when.conditions
    }

    if (this.zIndex.length) {
      const path = this.zIndex.reduce((_path, value, _index) => {
        if (_index === 0) {
          return `[${value}]`
        }
        return `${_path}.children[${value}]`
      }, '')

      get(prevData, `${path}.children`).push(step)
    } else {
      prevData.push(step)
    }

    this.props.store.isAddingStep = false
    this.handleSetValue()
  }

  addNoInputTask = task => {
    const { activeStage } = this.props

    if (!activeStage.when) {
      set(activeStage, 'when.conditions', [])
    }

    if (this.zIndex.length) {
      const path = this.zIndex.reduce((_path, value, _index) => {
        if (_index === 0) {
          return `[${value}]`
        }

        return `${_path}.children[${value}]`
      }, '')

      get(activeStage.when.conditions, `${path}.children`).push({
        name: task,
        children: [],
      })
    } else {
      activeStage.when.conditions.push({ name: task, children: [] })
    }

    this.props.store.isAddingStep = false
    this.handleSetValue()
  }

  @action
  handleDeleteStep = (index, zIndex, listType) => () => {
    const prevData = listType
      ? this.props.activeStage.when.conditions
      : this.steps

    if (zIndex.length) {
      const path = zIndex.reduce((_path, value, _index) => {
        if (_index === 0) {
          return `[${value}]`
        }
        return `${_path}.children[${value}]`
      }, '')

      get(prevData, `${path}.children`).splice(index, 1)
    } else {
      prevData.splice(index, 1)
    }
    this.setState({ index: 1 })
    this.handleSetValue()
  }

  @action
  handleSortSteps = zIndex => steps => {
    if (zIndex.length) {
      const path = zIndex.reduce((_path, value, _index) => {
        if (_index === 0) {
          return `[${value}]`
        }

        return `${_path}.children[${value}]`
      }, '')

      const preData = get(this.steps, `${path}.children`)

      const sortedData = steps.map(step =>
        preData.find(
          (preSteps, index) => JSON.stringify(preSteps) + index === step
        )
      )

      set(this.steps, `${path}.children`, sortedData)
    } else {
      const preData = this.steps

      const sortedData = steps.map(step =>
        preData.find(
          (preSteps, index) => JSON.stringify(preSteps) + index === step
        )
      )

      set(this.props.activeStage, 'branches[0].steps', sortedData)
    }

    this.handleSetValue()
  }

  handleSetValue = () => {
    if (
      this.props.activeStage.when &&
      !this.props.activeStage.when.conditions.length
    ) {
      delete this.props.activeStage.when
    }

    if (this.props.activeStage.error) {
      this.props.activeStage.error = undefined
    }

    this.props.store.setValue(this.props.activeStage)
  }

  cancelFocus = () => {
    this.getAgentArguments()
    this.props.store.clearFocus()
  }

  renderConditions() {
    const conditions = get(this.props, 'activeStage.when.conditions')

    if (!conditions) {
      return null
    }

    return <StepContainer steps={conditions} zIndex={[]} listType="condition" />
  }

  render() {
    const { isAddingStep } = this.props.store

    return (
      <div className={styles.sheet}>
        <div className={styles.title}>
          {t('STAGE')}
          <span className={styles.delete} onClick={this.handleDelete}>
            <Icon name="trash" clickable />
          </span>
        </div>
        <div className={styles.form}>
          <Form.Item label={t('NAME')}>
            <Input
              className={styles.name_input}
              value={this.props.activeStage.name || ''}
              onChange={this.handleChangeName}
            />
          </Form.Item>
          <div className={styles.title}>{t('AGENT')}</div>
          <Form.Item desc={t('AGENT_TYPE_DESC')} label={t('TYPE')}>
            <Select
              options={AgentType}
              defaultValue="none"
              value={this.agentType}
              onChange={this.handleAgentTypeChange}
            />
          </Form.Item>
          {this.renderAgentForms()}
          <div className={styles.title}>
            {t('pipeline_conditions')}
            <span>
              {t(
                'The conditions required to implement the current phase (optional).'
              )}
            </span>
          </div>
          <div className={styles.conditionList}>{this.renderConditions()}</div>
          {this.hasNestStage ? null : (
            <div
              className={cardStyles.addSteps}
              onClick={this.toggleAddStep('', 'condition')}
            >
              <Icon name="add" /> &nbsp;
              {t('Add conditions')}
            </div>
          )}
          <div className={styles.title}>{t('TASK')}</div>
          <StepContainer steps={this.steps} zIndex={[]} />
          {this.hasNestStage ? null : (
            <div
              className={cardStyles.addSteps}
              onClick={this.toggleAddStep('')}
            >
              <Icon name="add" /> &nbsp;
              {t('Add Step')}
            </div>
          )}
        </div>
        <div className={styles.footer}>
          <Button onClick={this.cancelFocus}>{t('OK')}</Button>
        </div>
        {isAddingStep ? (
          <StepsSelector
            onAddStep={this.handleAddStep}
            store={this.props.store}
            isEditMode={this.isEditMode}
            onCancel={this.handleEditCancel}
            onAddNoInputTask={this.addNoInputTask}
            trigger={this.props.trigger}
          />
        ) : null}
        <YamlEditor
          value={this.formData.yaml || ''}
          visible={this.showYaml}
          onCancel={this.hideYamlEditor}
          onOk={this.handleSetYaml}
        />
      </div>
    )
  }
}
