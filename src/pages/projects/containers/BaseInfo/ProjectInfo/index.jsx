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
import { get, isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { Button, Icon, Menu, Dropdown } from '@kube-design/components'
import { getLocalTime, getDisplayName } from 'utils'
import { Panel } from 'components/Base'

import styles from './index.scss'

export default class ProjectInfo extends React.Component {
  renderMoreMenu() {
    const { actions, onMenuClick } = this.props

    return (
      <Menu onClick={onMenuClick}>
        {actions.map(action => (
          <Menu.MenuItem key={action.key}>
            <Icon name={action.icon} /> {action.text}
          </Menu.MenuItem>
        ))}
      </Menu>
    )
  }

  render() {
    const {
      detail,
      workspace,
      serviceCount,
      memberCount,
      roleCount,
      actions,
      showDetail,
    } = this.props
    return (
      <Panel
        className={classNames(styles.wrapper, { [styles.single]: !showDetail })}
        title={t('PROJECT_INFO')}
      >
        <div className={styles.header}>
          <Icon name="project" size={40} />
          <div className={styles.item}>
            <div>{getDisplayName(detail)}</div>
            <p>{t('NAME')}</p>
          </div>
          <div className={styles.item}>
            <div>
              <Link to={`/workspaces/${workspace}`}>{workspace}</Link>
            </div>
            <p>{t('WORKSPACE')}</p>
          </div>
          <div className={styles.item}>
            <div>{get(detail, 'creator') || '-'}</div>
            <p>{t('CREATOR')}</p>
          </div>
          <div className={styles.item}>
            <div>
              {getLocalTime(detail.createTime).format(`YYYY-MM-DD HH:mm:ss`)}
            </div>
            <p>{t('CREATION_TIME')}</p>
          </div>
          {!isEmpty(actions) && (
            <div className={classNames(styles.item, 'text-right')}>
              <Dropdown
                theme="dark"
                content={this.renderMoreMenu()}
                trigger="click"
                placement="bottomRight"
              >
                <Button>{t('MANAGE')}</Button>
              </Dropdown>
            </div>
          )}
        </div>
        {showDetail && (
          <div className={styles.content}>
            <div className={styles.contentItem}>
              <Icon name="appcenter" size={40} />
              <div className={styles.item}>
                <div>{serviceCount}</div>
                <p>{serviceCount === '1' ? t('SERVICE') : t('SERVICE_PL')}</p>
              </div>
            </div>
            <div className={styles.contentItem}>
              <Icon name="role" size={40} />
              <div className={styles.item}>
                <div>{roleCount}</div>
                <p>
                  {roleCount === '1'
                    ? t('PROJECT_ROLE_SCAP')
                    : t('PROJECT_ROLE_SCAP_PL')}
                </p>
              </div>
            </div>
            <div className={styles.contentItem}>
              <Icon name="group" size={40} />
              <div className={styles.item}>
                <div>{memberCount}</div>
                <p>
                  {memberCount === 1
                    ? t('PROJECT_MEMBER_SCAP')
                    : t('PROJECT_MEMBER_SCAP_PL')}
                </p>
              </div>
            </div>
          </div>
        )}
      </Panel>
    )
  }
}
