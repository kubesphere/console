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

import { get, set } from 'lodash'
import React from 'react'
import classNames from 'classnames'
import { observable, action, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { Input, Icon, Sortable } from '@pitrix/lego-ui'
import { Form, Button } from 'components/Base'
import { PIPELINE_TASKS } from 'src/utils/constants'

import { renderStepArgs } from '../Card/detail'
import StepsSelector from '../StepsSelector'
import styles from '../Sider/index.scss'
import cardStyles from '../Card/index.scss'

const nestingSteps = {
  withCredentials: true,
  dir: true,
  container: true,
  timeout: true,
  withSonarQubeEnv: true,
  not: true,
  allOf: true,
  anyOf: true,
}

const isEditable = function(name) {
  return PIPELINE_TASKS.All.includes(name) || name === 'sh'
}

@observer
export default class StepsEditor extends React.Component {
  static defaultProps = {
    activeStage: {},
  }

  state = {
    stage: null,
  }

  @observable
  zIndex = ''

  @observable
  isEditMode = false

  get steps() {
    return get(this.props.activeStage, 'branches[0].steps', [])
  }

  get hasNestStage() {
    return !!this.props.activeStage.stages
  }

  static getDerivedStateFromProps(nextProps) {
    return { stage: toJS(nextProps.activeStage) }
  }

  @action
  handleChangeName = value => {
    this.props.activeStage.name = value
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
      type: step.name,
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
        this.props.activeStage.when = { conditions: [] }
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
      activeStage.when = { conditions: [] }
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
    this.props.store.clearFocus()
  }

  renderLists = (steps, zIndex, listType) =>
    steps.map((step, index) => (
      <div
        key={JSON.stringify(step) + index}
        className={classNames(
          `pipelineCard__item-${zIndex}`,
          cardStyles.pipelineCard__item
        )}
        data-id={JSON.stringify(step) + index}
      >
        <span
          className={styles.delete}
          onClick={this.handleDeleteStep(index, zIndex, listType)}
        >
          <Icon name="trash" clickable />
        </span>
        {listType || !isEditable(step.name) ? null : (
          <span
            className={styles.edit}
            onClick={this.handleEdit(zIndex, index, step, listType)}
          >
            <Icon name="wrench" clickable />
          </span>
        )}
        <div className={cardStyles.content__title}>
          <span
            className={classNames(
              `pipelineCard__item__drag-${zIndex}`,
              styles.pipelineCard__item__drag
            )}
            style={{ cursor: '-webkit-grab' }}
          >
            <Icon name="drag-handle" color={{ primary: '#41b1ea' }} />
          </span>
          {t(step.name)}
        </div>
        {renderStepArgs(step)}
        {this.renderSteps(step.children, [...zIndex, index], listType)}
        {step.name in nestingSteps ? (
          <div
            className={cardStyles.addSteps}
            onClick={this.toggleAddStep([...zIndex, index], listType)}
          >
            <Icon name="add" /> &nbsp;
            {listType ? t(`Add nesting ${listType}s`) : t('Add nesting steps')}
          </div>
        ) : null}
      </div>
    ))

  renderSteps = (steps, zIndex, listType) => {
    if (steps && steps.length) {
      return (
        <Sortable
          tag="div"
          options={{
            handle: `.pipelineCard__item__drag-${zIndex}`,
            draggable: `.pipelineCard__item-${zIndex}`,
            animation: 150,
          }}
          onChange={this.handleSortSteps(zIndex)}
        >
          {this.renderLists(steps, zIndex, listType)}
        </Sortable>
      )
    }
  }

  renderConditions() {
    if (
      !this.props.activeStage.when ||
      !this.props.activeStage.when.conditions
    ) {
      return null
    }

    return this.renderLists(
      this.props.activeStage.when.conditions,
      [],
      'condition'
    )
  }

  render() {
    const { isAddingStep } = this.props.store

    return (
      <div className={styles.sheet}>
        <div className={styles.title}>
          {t('Stage')}
          <span className={styles.delete} onClick={this.handleDelete}>
            <Icon name="trash" clickable />
          </span>
        </div>
        <div className={styles.form}>
          <Form.Item label={t('Name')}>
            <Input
              value={this.props.activeStage.name || ''}
              onChange={this.handleChangeName}
            />
          </Form.Item>
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
          <div className={styles.title}>
            {t('Task')}
            <span>{t('Drag and drop tasks to sort')}</span>
          </div>
          {this.renderSteps(this.steps, [])}
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
          <Button onClick={this.cancelFocus}>{t('Confirm')}</Button>
        </div>
        {isAddingStep ? (
          <StepsSelector
            onAddStep={this.handleAddStep}
            store={this.props.store}
            isEditMode={this.isEditMode}
            onCancel={this.handleEditCancel}
            onAddNoInputTask={this.addNoInputTask}
          />
        ) : null}
      </div>
    )
  }
}
