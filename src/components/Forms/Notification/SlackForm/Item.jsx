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
import classnames from 'classnames'
import { isEmpty } from 'lodash'

import { Notify, Tag, Icon } from '@kube-design/components'
import { BoxInput } from 'components/Inputs'

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

  validateChannel = channel => {
    const { value } = this.props
    const count = globals.config.notification.dingtalk['max_number_of_keyword']
    if (!channel) {
      Notify.error({ content: t('ADD_CHANNEL_TIP'), duration: 1000 })
      return
    }
    if (value.length > count - 1) {
      Notify.error({
        content: t.html('MAX_CHANNEL_COUNT', { count }),
        durantion: 1000,
      })
      return
    }
    if (value.some(item => item === channel)) {
      Notify.error({ content: t('CHANNEL_EXISTS'), duration: 1000 })
      return
    }
    return true
  }

  handleAdd = channel => {
    const { value, onChange } = this.props
    onChange([...value, channel])
  }

  handleDelete = channel => {
    const { value, onChange } = this.props
    const newData = value.filter(item => item !== channel)
    onChange(newData)
  }

  render() {
    const { value, className } = this.props

    return (
      <div>
        <BoxInput
          className={styles.wrapper}
          title={t('SLACK_CHANNEL')}
          placeholder=" "
          onAdd={this.handleAdd}
          validate={this.validateChannel}
        />
        <p className="margin-t8">{t('ADDED_CHANNELS')}</p>
        <div className={classnames(styles.boxWrapper, className)}>
          {isEmpty(value) ? (
            <div className={styles.empty}>{t('EMPTY_CHANNEL_DESC')}</div>
          ) : (
            value.map(item => {
              return (
                <Tag className={styles.tag} key={item}>
                  {item}
                  <Icon
                    name="close"
                    size={12}
                    clickable
                    onClick={() => this.handleDelete(item)}
                  ></Icon>
                </Tag>
              )
            })
          )}
        </div>
      </div>
    )
  }
}
