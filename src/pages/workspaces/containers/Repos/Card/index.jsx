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
import { Icon, Dropdown, Menu, Columns, Column } from '@pitrix/lego-ui'
import { Button } from 'components/Base'

import styles from './index.scss'

const MoreMenu = ({ onClick, menus }) => (
  <Menu onClick={onClick}>
    {menus.map(menu => (
      <Menu.MenuItem key={menu.key}>
        <Icon name={menu.icon} /> {menu.text}
      </Menu.MenuItem>
    ))}
  </Menu>
)

const Card = ({ repo, onMenuClick, enabledActions = [] }) => {
  const menus = [
    {
      key: 'edit',
      icon: 'pen',
      text: t('Edit'),
      enable: enabledActions.includes('edit'),
    },
    {
      key: 'index',
      icon: 'restart',
      text: t('Synchronize'),
      enable: enabledActions.includes('edit'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      enable: enabledActions.includes('delete'),
    },
  ].filter(item => item.enable)

  return (
    <div className={styles.wrapper}>
      <Columns>
        <Column className="is-narrow">
          <Icon name="application" size={32} />
        </Column>
        <Column className="is-4">
          <div>
            <div className="h6">{repo.name}</div>
            <p>{repo.description}</p>
          </div>
        </Column>
        <Column className="is-1">
          <div>
            <p>
              <strong>{t(repo.status)}</strong>
            </p>
            <p>{t('Status')}</p>
          </div>
        </Column>
        <Column className="is-1">
          <div>
            <p>
              <strong>{repo.type}</strong>
            </p>
            <p>{t('Type')}</p>
          </div>
        </Column>
        <Column>
          <div>
            <p>
              <strong>{repo.url}</strong>
            </p>
            <p>{t('Url')}</p>
          </div>
        </Column>
      </Columns>
      {menus.length > 0 && (
        <Dropdown
          className="dropdown-default"
          content={<MoreMenu onClick={onMenuClick} menus={menus} />}
          trigger="click"
          placement="bottomRight"
        >
          <Button icon="more" type="flat" className={styles.more} />
        </Dropdown>
      )}
    </div>
  )
}

export default Card
