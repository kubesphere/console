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
import { omit } from 'lodash'
import { List } from 'components/Base'
import { safeAtob } from 'utils/base64'

import styles from './index.scss'

export default class SecretDataList extends React.Component {
  static defaultProps = {
    value: {},
  }

  handleDelete = key => () => {
    const { value, onChange } = this.props
    onChange(omit(value, key))
  }

  handleEdit = key => () => {
    const { onEdit } = this.props
    onEdit(key)
  }

  renderContent() {
    const { value, onAdd } = this.props

    return (
      <List>
        {Object.entries(value).map(([key, _value]) => (
          <List.Item
            key={key}
            icon="key"
            title={key}
            description={safeAtob(_value) || '-'}
            onDelete={this.handleDelete(key)}
            onEdit={this.handleEdit(key)}
          />
        ))}
        <List.Add
          title={t('ADD_DATA_TCAP')}
          description={t('ADD_DATA_DESC')}
          onClick={onAdd}
        />
      </List>
    )
  }

  render() {
    return <div className={styles.wrapper}>{this.renderContent()}</div>
  }
}
