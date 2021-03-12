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
import PropTypes from 'prop-types'
import { toJS } from 'mobx'
import { get } from 'lodash'
import { Button, Icon } from '@kube-design/components'
import { Avatar, Text } from 'components/Base'
import styles from './index.scss'

export default class UserItem extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    enabledActions: PropTypes.array,
    selected: PropTypes.bool,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
  }

  getGroupName = groups => {
    const { data = [] } = toJS(this.props.groupStore.list)
    return groups
      .map(item => {
        return get(
          data.find(v => v.group_id === item),
          'group_name',
          ''
        )
      })
      .filter(item => item)
      .join(', ')
  }

  renderButton() {
    const { enabledActions, group, type, onDelete } = this.props
    if (!enabledActions.includes('manage') || !group) {
      return null
    }
    if (type === 'notingroup') {
      return this.renderSelectedButton()
    }
    return (
      <Button type="flat" onClick={onDelete}>
        <Icon name="trash" size={16} />
      </Button>
    )
  }

  renderSelectedButton() {
    const { selected, onSelect } = this.props
    return selected ? (
      <Button type="flat" icon="check" disabled />
    ) : (
      <Button type="control" icon="add" iconType="light" onClick={onSelect} />
    )
  }

  render() {
    const { user, type } = this.props

    return (
      <div className={styles.item} data-user={user.username}>
        <Avatar
          className={styles.avatar}
          avatar={user.avatar_url || '/assets/default-user.svg'}
          iconSize={32}
          title={user.name}
          desc={user.email}
        />
        {type === 'ingroup' && (
          <Text
            className={styles.text}
            title={this.getGroupName(user.groups)}
            description={t('User Group Assigned')}
          />
        )}
        {this.renderButton()}
      </div>
    )
  }
}
