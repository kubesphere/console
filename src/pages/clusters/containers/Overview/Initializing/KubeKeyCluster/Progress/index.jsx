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
import { get } from 'lodash'
import classNames from 'classnames'
import { Tooltip, Icon } from '@kube-design/components'
import { CLUSTER_CREATING_STEPS } from '../constants'

import styles from './index.scss'

export default class Progress extends Component {
  getBarLength(conditions) {
    if (conditions.length === 0) {
      return '20px'
    }

    const len = conditions.length - 1
    const lastStepComplete = conditions[len].status
    return `calc(${len * 20}% - ${len * 24 - (lastStepComplete ? 80 : 60)}px)`
  }

  render() {
    const conditions = get(this.props.detail, 'status.Conditions', [])
    return (
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.title}>
            {t('CLUSTER_CREATION_PROGRESS')}&nbsp;
            <Tooltip content={t('CLUSTER_CREATION_PROGRESS_TIP')}>
              <Icon name="question" />
            </Tooltip>
          </div>
          <div className={styles.progress}>
            <div className={styles.bar}>
              <div
                className={styles.colorBar}
                style={{ width: this.getBarLength(conditions) }}
              />
            </div>
            <div className={styles.dots}>
              {CLUSTER_CREATING_STEPS.map((step, index) => (
                <div key={step} style={{ left: `${index * 20}%` }}>
                  <div
                    className={classNames(styles.circle, {
                      [styles.checked]: index <= conditions.length - 1,
                    })}
                  >
                    {index <= conditions.length - 1 &&
                      (get(conditions, `[${index}].status`) ? (
                        <Icon name="check" size={14} type="light" />
                      ) : (
                        <Icon name="dot" size={14} type="light" />
                      ))}
                    {}
                  </div>
                  <div>{t(step.toUpperCase().replace(/\s+/g, '_'))}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
