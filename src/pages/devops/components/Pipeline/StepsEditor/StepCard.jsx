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
import classNames from 'classnames'

import { Icon } from '@kube-design/components'
import { PIPELINE_TASKS } from 'utils/constants'
import PropTypes from 'prop-types'

import { toJS } from 'mobx'
import { cloneDeep, isEqual } from 'lodash'
import { renderStepArgs } from '../Card/detail'

import styles from '../Sider/index.scss'
import cardStyles from '../Card/index.scss'
import StepContainer from './StepContainer'

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

export default class StepCard extends React.Component {
  step = toJS(this.props.step)

  static contextTypes = {
    toggleAddStep: PropTypes.func,
    handleEdit: PropTypes.func,
    handleDeleteStep: PropTypes.func,
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.listType === 'condition') {
      return true
    }

    const nextStep = toJS(nextProps.step)

    if (!isEqual(this.step, nextStep)) {
      this.step = cloneDeep(toJS(nextProps.step))
      return true
    }

    return false
  }

  toggleAddStep = (zIndex, type) => () => {
    this.context.toggleAddStep(zIndex, type)()
  }

  handleEdit = (zIndex, index, step, type) => () => {
    this.context.handleEdit(zIndex, index, step, type)()
  }

  handleDeleteStep = (index, zIndex, listType) => () => {
    this.context.handleDeleteStep(index, zIndex, listType)()
  }

  render() {
    const { step, index, zIndex, listType, isLast } = this.props

    return (
      <div
        key={JSON.stringify(step.name) + index}
        className={classNames(
          `pipelineCard__item-${index}`,
          cardStyles.pipelineCard__item
        )}
        data-id={JSON.stringify(step) + index}
        style={isLast ? { border: 'none' } : null}
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
        <div style={{ color: '#329dce' }} className={cardStyles.content__title}>
          {t(step.name)}
        </div>

        {renderStepArgs(toJS(step))}

        <StepContainer
          steps={step.children}
          zIndex={[...zIndex, index]}
          listType={listType}
        />

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
    )
  }
}
