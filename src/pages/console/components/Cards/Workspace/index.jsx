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
import { Icon, Columns, Column } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { getLocalTime } from 'utils'

import styles from './index.scss'

export default class WorkspaceCard extends React.Component {
  handleClick = () => {
    const { data, onEnter } = this.props
    onEnter && onEnter(data.name)
  }

  render() {
    const { data } = this.props

    const memberCount = Number(
      get(data, 'annotations["kubesphere.io/member-count"]', 0)
    )

    return (
      <li className={styles.wrapper} key={data.path} data-test="workspace-item">
        <div className={styles.content}>
          <Columns>
            <Column className="is-narrow">
              <img src={data.logo || '/assets/default-workspace.svg'} alt="" />
            </Column>
            <Column className="is-4">
              <div className="width-full">
                <div className="h5">
                  <a onClick={this.handleClick}>{data.name}</a>
                </div>
                <p className="ellipsis">{data.description}</p>
              </div>
            </Column>
            <Column className="is-2">
              <div>
                <p>
                  <strong>
                    {get(
                      data,
                      'annotations["kubesphere.io/namespace-count"]',
                      0
                    )}
                  </strong>
                </p>
                <p>{t('Project Number')}</p>
              </div>
            </Column>
            {globals.app.hasKSModule('devops') && (
              <Column className="is-2">
                <div>
                  <p>
                    <strong>
                      {get(
                        data,
                        'annotations["kubesphere.io/devops-count"]',
                        0
                      )}
                    </strong>
                  </p>
                  <p>{t('DevOps Project Number')}</p>
                </div>
              </Column>
            )}
            <Column className="is-2">
              <div>
                <p>
                  <strong>
                    {data.createTime
                      ? getLocalTime(data.createTime).format(
                          `YYYY-MM-DD HH:mm:ss`
                        )
                      : '-'}
                  </strong>
                </p>
                <p>{t('Created Time')}</p>
              </div>
            </Column>
          </Columns>
        </div>
        <div className={styles.footer}>
          <div className={styles.members}>
            <span>{t('Members')}:</span>
            {Array(memberCount)
              .fill('')
              .map((member, index) => {
                if (index >= 6) {
                  return null
                }

                return (
                  <img
                    key={index}
                    src="/assets/default-user.svg"
                    alt={member}
                    title={member}
                  />
                )
              })}
            {memberCount >= 6 && (
              <span className={styles.more}>
                <Icon name="more" />
              </span>
            )}
          </div>
          <div className={styles.view}>
            <Button onClick={this.handleClick} type="control">
              {t('View Workspace')}
            </Button>
          </div>
        </div>
      </li>
    )
  }
}
