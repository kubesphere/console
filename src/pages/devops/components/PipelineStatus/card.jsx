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
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { Button } from '@kube-design/components'
import { getPipelineStatus } from 'utils/status'
import Status from 'devops/components/Status'

import style from './card.scss'

export default class PipelineCard extends React.Component {
  constructor(props) {
    super(props)
    this.domTree = []
    this.state = { runLoading: false }
  }

  static contextTypes = {
    result: PropTypes.string,
  }

  componentDidMount() {
    this.calculateHeight()
  }

  calculateHeight() {
    this.heights = this.domTree.map(column => column.clientHeight)
    this.props.setHeight(this.heights)
  }

  handleProceed = (step, nodeId) => () => {
    this.setState({ runLoading: true })
    this.props.onProceed(
      {
        parameters: step.input.parameters,
        nodeId,
        stepId: step.id,
        inputId: step.input.id,
      },
      () => {
        this.setState({ runLoading: false })
      }
    )
  }

  handleBreak = (step, nodeId) => () => {
    this.setState({ runLoading: true })
    this.props.onBreak(
      {
        nodeId,
        stepId: step.id,
        inputId: step.input.id,
      },
      () => {
        this.setState({ runLoading: false })
      }
    )
  }

  renderCard(node) {
    const { steps = [] } = node
    let successIndex = ''
    const hasError = steps.find((step, index) => {
      const isFailed = step.state === 'FINISHED' && step.result !== 'SUCCESS'
      if (!isFailed) {
        successIndex = index
      }
      return isFailed ? step : null
    })
    // has no difference between aborted status and queue status
    // need run detail status to judge
    const isAbort =
      (this.context.result === 'ABORTED' ||
        this.context.result === 'FAILURE') &&
      !node.result
    const isQueue = !isAbort && (!node.state || node.state === 'QUEUED')
    const isPaused = node.state && node.state === 'PAUSED'

    if (isAbort) {
      return (
        <div className={classNames(style.pipelineCard)}>
          <div className={style.pipelineCard__title}>{node.displayName}</div>
          <div className={style.pipelineCard__content}>
            <div className={style.pipelineCard__item}>
              <div
                className={classNames(
                  style.content__status,
                  style.content__status__quene
                )}
              >
                {t('ABORTED')}
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (isPaused) {
      const hasInputStep = node.steps.find(step => step.input)
      // if pipeline failed, can't operate
      if (this.context.result === 'FAILURE') {
        return (
          <div
            className={classNames(
              style.pipelineCard,
              style['pipelineCard--paused']
            )}
          >
            <div className={style.pipelineCard__title}>{node.displayName}</div>
            <div className={style.pipelineCard__content}>
              <div className={style.pipelineCard__item}>
                <p className={style.content__title__paused}>
                  {t('WAITING_FOR_INPUT')}
                </p>
                <div
                  className={classNames(
                    style.content__status,
                    style.content__status__quene
                  )}
                >
                  {t('TASK_FAILED_NOT_OPERATIONAL')}
                </div>
              </div>
            </div>
          </div>
        )
      }

      const hasAuthority = get(hasInputStep, 'approvable')

      return (
        <div
          className={classNames(
            style.pipelineCard,
            style['pipelineCard--paused']
          )}
        >
          <div className={style.pipelineCard__title}>{node.displayName}</div>
          <div className={style.pipelineCard__content}>
            <div className={style.pipelineCard__item}>
              <p className={style.content__title__paused}>
                {t('WAITING_FOR_INPUT')}
              </p>
              <p className={style.content__title__paused}>
                {get(hasInputStep, 'input.message')}
              </p>
              <div
                className={classNames(
                  style.content__status,
                  style.content__status__quene
                )}
              >
                <React.Fragment>
                  <Button
                    size="small"
                    type="primary"
                    loading={this.state.runLoading}
                    onClick={this.handleProceed(hasInputStep, node.id)}
                    disabled={!hasAuthority}
                  >
                    {t(get(hasInputStep, 'input.ok') || 'PROCEED')}
                  </Button>
                  <Button
                    size="small"
                    type="danger"
                    loading={this.state.runLoading}
                    onClick={this.handleBreak(hasInputStep, node.id)}
                    disabled={!hasAuthority}
                  >
                    {t('BREAK')}
                  </Button>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        className={classNames(style.pipelineCard, {
          [style['pipelineCard--error']]: hasError,
          [style['pipelineCard--queue']]: isQueue,
        })}
      >
        <div className={style.pipelineCard__title}>{node.displayName}</div>
        <div className={style.pipelineCard__content}>
          <div className={style.pipelineCard__item}>
            {!isQueue ? (
              <div className={style.content__title}>
                {t('STEPS_COMPLETE_TOTAL', {
                  complete: successIndex === '' ? 0 : successIndex + 1,
                  total: steps.length,
                })}
              </div>
            ) : null}
            {isQueue && node.causeOfBlockage ? (
              <p className={style.errorMessage}>{node.causeOfBlockage}</p>
            ) : null}
            <div
              className={classNames(style.content__status, {
                [style.content__status__error]: hasError,
                [style.content__status__quene]: isQueue,
              })}
            >
              {!isQueue ? (
                <Status {...getPipelineStatus(node)} hasLabel={false} />
              ) : null}
              {this.renderStatus(node, hasError)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStatus(node, hasError) {
    if (!node.state || node.state === 'QUEUED') {
      return t('QUEUED')
    }
    if (node.state === 'NOT_BUILT') {
      return t('NOT_BUILT')
    }
    if (node.state === 'SKIPPED') {
      return t('SKIPPED')
    }
    if (node.state === 'PAUSED') {
      return t('PAUSED')
    }
    if (node.result === 'ABORTED') {
      return t('ABORTED')
    }
    if (hasError || node.result === 'FAILURE') {
      const errorMessage = get(hasError, 'displayName', '')
      if (errorMessage === 'Wait for interactive input') {
        return (
          <span className={style.errorMessage}>{t('CANCELLED_IN_REVIEW')}</span>
        )
      }
      return (
        errorMessage || (
          <span className={style.errorMessage}>{t('FAILED')}</span>
        )
      )
    }
    if (node.state !== 'FINISHED') {
      return t('RUNNING')
    }
    return t('SUCCESSFUL')
  }

  render() {
    const { nodes } = this.props

    if (Array.isArray(nodes)) {
      return (
        <div className={style.pipeline_column}>
          {nodes.map((node, columnIndex) => (
            <div
              key={JSON.stringify(node)}
              ref={dom => {
                columnIndex
                  ? (this.domTree[columnIndex] = dom)
                  : (this.domTree = [dom])
              }}
            >
              {this.renderCard(node, columnIndex)}
            </div>
          ))}
        </div>
      )
    }
    return (
      <div className={style.pipeline_column}>
        <div
          ref={dom => {
            this.domTree = [dom]
          }}
        >
          {this.renderCard(nodes)}
        </div>
      </div>
    )
  }
}
