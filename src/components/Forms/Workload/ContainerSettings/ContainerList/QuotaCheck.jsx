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

import React, { Component } from 'react'
import isEqual from 'react-fast-compare'
import { get, isEmpty } from 'lodash'

import { Alert } from '@kube-design/components'

import {
  getContainersResources,
  compareQuotaAndResources,
} from 'utils/workload'

import styles from './index.scss'

export default class QuotaCheck extends Component {
  state = {
    checkResult: this.getCheckResult(),
  }

  componentDidUpdate(prevProps) {
    if (
      !isEqual(prevProps.containers, this.props.containers) ||
      !isEqual(prevProps.initContainers, this.props.initContainers) ||
      !isEqual(prevProps.leftQuota, this.props.leftQuota) ||
      !isEqual(prevProps.replicas, this.props.replicas)
    ) {
      this.setState({ checkResult: this.getCheckResult() })
    }
  }

  getCheckResult() {
    const { containers, initContainers, leftQuota, replicas } = this.props
    const resourcesCost = getContainersResources(
      containers,
      initContainers,
      replicas
    )
    return compareQuotaAndResources(leftQuota, resourcesCost)
  }

  renderOverCostMessage(result) {
    const requestCPUOver = get(result, '["requests.cpu"].overcost')
    const requestMemoryOver = get(result, '["requests.memory"].overcost')
    const limitCPUOver = get(result, '["limits.cpu"].overcost')
    const limitMemoryOver = get(result, '["limits.memory"].overcost')
    return (
      <>
        {(requestCPUOver || requestMemoryOver) && (
          <div className={styles.message}>
            <span>{t('RESOURCE_REQUESTS')}:</span>
            {requestCPUOver && (
              <span>
                CPU&nbsp;{t('Cost')}&nbsp;
                {get(result, '["requests.cpu"].cost', t('Not Limited'))}&nbsp;(
                {t('PROJECT_REMAINING_QUOTAS')}:&nbsp;
                {get(
                  result,
                  '["requests.cpu"].namespaceQuota',
                  t('NO_REQUEST')
                )}
                ,&nbsp;{t('WORKSPACE_REMAINING_QUOTAS')}:&nbsp;
                {get(
                  result,
                  '["requests.cpu"].workspaceQuota',
                  t('NO_REQUEST')
                )}
                )
              </span>
            )}
            {requestMemoryOver && (
              <span>
                {t('MEMORY')}&nbsp;
                {t('Cost')}&nbsp;
                {get(result, '["requests.memory"].cost', t('Not Limited'))}
                &nbsp;(
                {t('PROJECT_REMAINING_QUOTAS')}:&nbsp;
                {get(
                  result,
                  '["requests.memory"].namespaceQuota',
                  t('NO_REQUEST')
                )}
                ,&nbsp;{t('WORKSPACE_REMAINING_QUOTAS')}:&nbsp;
                {get(
                  result,
                  '["requests.memory"].workspaceQuota',
                  t('NO_REQUEST')
                )}
                )
              </span>
            )}
          </div>
        )}
        {(limitCPUOver || limitMemoryOver) && (
          <div className={styles.message}>
            <span>{t('RESOURCE_LIMITS')}:</span>
            {limitCPUOver && (
              <span>
                CPU&nbsp;{t('Cost')}&nbsp;
                {get(result, '["limits.cpu"].cost', t('Not Limited'))}&nbsp;(
                {t('PROJECT_REMAINING_QUOTAS')}:&nbsp;
                {get(result, '["limits.cpu"].namespaceQuota', t('NO_LIMIT'))}
                ,&nbsp;
                {t('WORKSPACE_REMAINING_QUOTAS')}:&nbsp;
                {get(result, '["limits.cpu"].workspaceQuota', t('NO_LIMIT'))})
              </span>
            )}
            {limitMemoryOver && (
              <span>
                {t('MEMORY')}&nbsp;
                {t('Cost')}&nbsp;
                {get(result, '["limits.memory"].cost', t('Not Limited'))}&nbsp;(
                {t('PROJECT_REMAINING_QUOTAS')}:&nbsp;
                {get(result, '["limits.memory"].namespaceQuota', t('NO_LIMIT'))}
                ,&nbsp;{t('WORKSPACE_REMAINING_QUOTAS')}:&nbsp;
                {get(result, '["limits.memory"].workspaceQuota', t('NO_LIMIT'))}
                )
              </span>
            )}
          </div>
        )}
      </>
    )
  }

  renderQuotaMessage(result) {
    return (
      <>
        <div className={styles.message}>
          <span>
            {t('RESOURCE_REQUESTS')}: CPU ({t('PROJECT_REMAINING_QUOTAS')}:
            {get(result, '["requests.cpu"].namespaceQuota', t('NO_REQUEST'))},
            {t('WORKSPACE_REMAINING_QUOTAS')}:
            {get(result, '["requests.cpu"].workspaceQuota', t('NO_REQUEST'))});
          </span>
          <span>
            {t('MEMORY')} ({t('PROJECT_REMAINING_QUOTAS')}:
            {get(result, '["requests.memory"].namespaceQuota', t('NO_REQUEST'))}
            ;{t('WORKSPACE_REMAINING_QUOTAS')}:
            {get(result, '["requests.memory"].workspaceQuota', t('NO_REQUEST'))}
            ).
          </span>
        </div>
        <div className={styles.message}>
          <span>
            {t('RESOURCE_LIMITS')}: CPU ({t('PROJECT_REMAINING_QUOTAS')}:
            {get(result, '["limits.cpu"].namespaceQuota', t('NO_LIMIT'))},
            {t('WORKSPACE_REMAINING_QUOTAS')}:
            {get(result, '["limits.cpu"].workspaceQuota', t('NO_LIMIT'))});
          </span>
          <span>
            {t('MEMORY')} ({t('PROJECT_REMAINING_QUOTAS')}:
            {get(result, '["limits.memory"].namespaceQuota', t('NO_LIMIT'))};
            {t('WORKSPACE_REMAINING_QUOTAS')}:
            {get(result, '["limits.memory"].workspaceQuota', t('NO_LIMIT'))}).
          </span>
        </div>
      </>
    )
  }

  render() {
    const { containers, initContainers } = this.props
    const { checkResult } = this.state

    if (isEmpty(containers) && isEmpty(initContainers)) {
      return null
    }

    const overcost = Object.values(checkResult).some(item => item.overcost)
    const type = overcost ? 'error' : 'info'
    const title = overcost ? t('QUOTA_OVERCOST_TIP') : t('Remaining Quota')

    const message = overcost
      ? this.renderOverCostMessage(checkResult)
      : this.renderQuotaMessage(checkResult)

    return (
      <Alert
        className="margin-b12"
        type={type}
        title={title}
        message={message}
      />
    )
  }
}
