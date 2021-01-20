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
import { isObservableArray, toJS } from 'mobx'

import { Icon } from '@kube-design/components'
import classNames from 'classnames'

import { get, without, isEmpty, isEqual, cloneDeep } from 'lodash'
import { renderStepArgs } from './detail'

import style from './index.scss'

const taskIcon = {
  echo: 'loudspeaker',
  mail: 'mail',
  shell: 'terminal',
  sh: 'terminal',
  container: 'terminal',
  checkout: 'network-router',
  git: 'network-router',
  withCredentials: 'key',
  kubernetesDeploy: 'kubernetes',
  branch: 'network-router',
  timeout: 'clock',
  withSonarQubeEnv: 'network',
}

export default class PipelineCard extends React.Component {
  constructor(props) {
    super(props)
    this.domTree = []
    this.heights = []
    this.nodes = toJS(this.props.nodes)
  }

  shouldComponentUpdate(nextProps) {
    const nextNodes = toJS(nextProps.nodes)
    if (!isEqual(nextNodes, this.nodes)) {
      this.nodes = cloneDeep(nextNodes)
      return true
    }

    return false
  }

  componentDidMount() {
    this.calculateHeight()
  }

  componentDidUpdate() {
    this.calculateHeight()
  }

  calculateHeight() {
    const heights = without(
      this.domTree.map(column => column && column.clientHeight),
      null
    )
    if (JSON.stringify(heights) !== JSON.stringify(this.heights)) {
      this.heights = heights
      this.props.setHeight(this.heights)
    }
  }

  handleAddStep = () => {
    this.props.onAddStep()
  }

  handleFocus = index => e => {
    const { isEditMode } = this.props
    if (!isEditMode) {
      return
    }
    e.stopPropagation()
    this.props.onFocus(index)
  }

  renderAddBranchCard() {
    return (
      <div className={style.addBranchCard} onClick={this.props.onAddBranch}>
        <Icon size={16} name="add" />
        <span>{t('Add Parallel Stage')}</span>
      </div>
    )
  }

  renderNestStages = stages => {
    const { isEditMode } = this.props

    if (isEditMode) {
      return (
        <div className={style.errorTip}>
          {t('not support edit nested stage')}
        </div>
      )
    }
    if (!isEmpty(stages) && isObservableArray(stages)) {
      return (
        <div className={style.nestStage_content}>
          <div className={style.indentBorder} />
          <div className={style.nestsStage_detail}>
            {stages.map(stage => this.renderCardContent(stage))}
          </div>
        </div>
      )
    }
  }

  renderSteps = (children, error) => {
    if (children && children.length) {
      return children.map((step, index) => {
        return (
          <div
            key={JSON.stringify(step) + index}
            className={style.pipelineCard__item}
          >
            <div
              className={classNames(
                style.content__title,
                style.content__title__noDetail,
                {
                  [style.content__title__error]: error && error.index === index,
                }
              )}
            >
              <Icon size={20} name={taskIcon[step.name] || 'cdn'} />
              <span className={style.content__title__text}>{t(step.name)}</span>
            </div>
            {step.name === 'sh' || step.name === 'script' ? (
              <div className={style.content__text}>
                {renderStepArgs(toJS(step))}
              </div>
            ) : null}

            {this.renderSteps(step.children)}
          </div>
        )
      })
    }
  }

  renderConditions(node) {
    if (!node.when) {
      return null
    }

    return (
      <div className={style.conditions}>
        <p className={style.conditions__title}>{t('pipeline_conditions')}</p>
        {this.renderSteps(node.when.conditions, node.conditionError)}
      </div>
    )
  }

  renderCard(node, columnIndex) {
    const { isEditMode } = this.props

    return (
      <div
        className={classNames(style.pipelineCard, {
          'pipelineCard-edit': isEditMode,
        })}
        onClick={this.handleFocus(columnIndex)}
      >
        <div
          className={classNames(style.pipelineCard__title, {
            [style['pipelineCard__title-error']]: node.error,
          })}
        >
          {node.name || t('Unnamed')}
        </div>
        <div
          className={classNames(style.pipelineCard__content, {
            [style['pipelineCard-active']]: node.isActive,
            [style['pipelineCard-error']]: node.error,
          })}
        >
          {this.renderCardContent(node)}
        </div>
      </div>
    )
  }

  renderCardContent(node) {
    const { isEditMode } = this.props
    const hasNestStage = !!node.stages

    return (
      <>
        {node.error || node.conditionError ? (
          <div className={style.errorTip}>
            {t(get(node, 'error.error') || get(node, 'conditionError.error')) ||
              t('Configuration error')}
          </div>
        ) : null}

        {this.renderConditions(node, node.conditionError)}

        {node.stages
          ? this.renderNestStages(node.stages)
          : this.renderSteps(get(node, 'branches[0].steps'), node.error)}

        {isEditMode && !hasNestStage ? (
          <div className={style.addSteps} onClick={this.handleAddStep}>
            <Icon size={16} name="add" />
            <span>{t('Add Step')}</span>
          </div>
        ) : null}
      </>
    )
  }

  render() {
    const { nodes, isEditMode } = this.props

    if (nodes.parallel) {
      return (
        <div className={style.pipeline_column} data-card="card">
          {nodes.parallel.map((node, columnIndex) => (
            <div
              key={JSON.stringify(node)}
              ref={dom => {
                this.domTree[columnIndex] = dom
              }}
            >
              {this.renderCard(node, columnIndex)}
            </div>
          ))}
          {isEditMode ? this.renderAddBranchCard() : null}
        </div>
      )
    }

    return (
      <div className={style.pipeline_column} data-card="card">
        <div
          ref={dom => {
            this.domTree = [dom]
          }}
        >
          {this.renderCard(nodes, 0)}
        </div>
        {isEditMode ? this.renderAddBranchCard() : null}
      </div>
    )
  }
}
