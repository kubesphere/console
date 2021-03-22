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
import { Notify, Tag, Icon } from '@kube-design/components'
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

  handleAdd = async channel => {
    const { value, onChange } = this.props
    if (value.some(item => item === channel)) {
      Notify.error({ content: t('This channel has existed'), duration: 1000 })
      return
    }
    onChange([...value, channel])
  }

  handleDelete = channel => {
    const { value, onChange } = this.props
    const newData = value.filter(item => item !== channel)
    onChange(newData)
  }

  render() {
    const { value } = this.props

    return (
      <div className={styles.wrapper}>
        <BoxInput
          placeholder={t('Please enter a channel')}
          onAdd={this.handleAdd}
        />
        {value.length > 0 && (
          <div className="margin-t12">
            <p>{t('Channel Set')}</p>
            <div className={styles.listWrapper}>
              {value.map(item => {
                return (
                  <Tag className={styles.tag} type="primary" key={item}>
                    {item}
                    <Icon
                      name="close"
                      size={12}
                      clickable
                      onClick={() => this.handleDelete(item)}
                    ></Icon>
                  </Tag>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
}
