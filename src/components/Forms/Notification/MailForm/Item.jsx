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
import { isEmpty } from 'lodash'
import { Notify } from '@kube-design/components'
import { List } from 'components/Base'
import { BoxInput } from 'components/Inputs'

import UserStore from 'stores/user'

import styles from './index.scss'

export default class Item extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    value: [],
    onChange() {},
  }

  userStore = new UserStore()

  handleAdd = async email => {
    const { value, onChange } = this.props
    if (value.length > 50) {
      Notify.error({ content: t('50 email addresses at most'), duration: 1000 })
      return
    }

    if (value.some(item => item.email === email)) {
      Notify.error({
        content: t('This email address has existed'),
        duration: 1000,
      })
      return
    }
    const results = await this.userStore.fetchList({ email })
    const newData = !isEmpty(results) ? results[0] : { email }
    onChange([...value, newData])
  }

  handleDelete = email => {
    const { value, onChange } = this.props
    const newData = value.filter(item => item.email !== email)
    onChange(newData)
  }

  render() {
    const { value } = this.props

    return (
      <div className={styles.wrapper}>
        <BoxInput
          placeholder={t('Please enter an email address')}
          onAdd={this.handleAdd}
        />
        {!isEmpty(value) && (
          <div className={styles.listWrapper}>
            <List>
              {value.map(item => (
                <List.Item
                  key={item.email}
                  icon="human"
                  title={`${item.email}${item.name ? `(${item.name})` : ''}`}
                  description={item.globalrole || '-'}
                  onDelete={() => this.handleDelete(item.email)}
                />
              ))}
            </List>
          </div>
        )}
      </div>
    )
  }
}
