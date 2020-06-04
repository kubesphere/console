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

import { Icon, Menu, Dropdown } from '@pitrix/lego-ui'
import { getLocalTime, getDisplayName } from 'utils'
import { Button, Panel } from 'components/Base'

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
    const { detail, workspace, actions } = this.props
    return (
      <Panel className={styles.wrapper} title={t('Project Info')}>
        <div className={styles.header}>
          <Icon name="project" size={40} />
          <div className={styles.item}>
            <div>{getDisplayName(detail)}</div>
            <p>{t('Project Name')}</p>
          </div>
          <div className={styles.item}>
            <div>
              <Link to="/">
                {get(
                  detail,
                  'annotations["kubesphere.io/workspace"]',
                  workspace || '-'
                )}
              </Link>
            </div>
            <p>{t('Workspace')}</p>
          </div>
          <div className={styles.item}>
            <div>{get(detail, 'creator') || '-'}</div>
            <p>{t('Creator')}</p>
          </div>
          <div className={styles.item}>
            <div>
              {getLocalTime(detail.createTime).format(`YYYY-MM-DD HH:mm:ss`)}
            </div>
            <p>{t('Created Time')}</p>
          </div>
          {!isEmpty(actions) && (
            <div className={classNames(styles.item, 'text-right')}>
              <Dropdown
                className="dropdown-default"
                content={this.renderMoreMenu()}
                trigger="click"
                placement="bottomRight"
              >
                <Button>{t('Manage Project')}</Button>
              </Dropdown>
            </div>
          )}
        </div>
      </Panel>
    )
  }
}
