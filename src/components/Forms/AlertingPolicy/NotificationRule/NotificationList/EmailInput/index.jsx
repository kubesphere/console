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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { isEmpty, debounce } from 'lodash'

import UserStore from 'stores/user'

import { Control, Icon, Input, Tooltip } from '@pitrix/lego-ui'

import styles from './index.scss'

const MAIL_REGEXP = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

@observer
export default class EmailInput extends React.Component {
  static propTypes = {
    workspace: PropTypes.string,
    onEnter: PropTypes.func,
  }

  static defaultProps = {
    workspace: '',
    onEnter() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      valid: false,
      value: '',
      users: [],
    }

    this.userStore = new UserStore()
  }

  fetchPrompt = async (params = {}) => {
    const data = await this.userStore.fetchList({
      workspace: this.props.workspace,
      ...params,
    })
    return data
  }

  inputPrompt = debounce(value => {
    if (value === '') {
      this.setState({ users: [] })
    } else {
      this.fetchPrompt({ name: value }).then(data => {
        this.setState({ users: data })
      })
    }
  }, 500)

  checkValid = debounce(value => {
    this.setState({ valid: MAIL_REGEXP.test(value) })
  }, 200)

  handleChange = (e, value) => {
    this.setState({ value }, () => {
      this.checkValid(value)
      this.inputPrompt(value)
    })
  }

  handleEnter = debounce(() => {
    const { valid, value } = this.state

    if (!valid) return false

    if (isEmpty(value)) return false

    this.setState({ valid: true, value: '', users: [] }, () => {
      this.fetchPrompt({ emails: [value] }).then(result => {
        let data = {
          name: t('Unknown User'),
          avatar: '',
          address: value,
        }

        if (result.length > 0) {
          const { username, avatar_url, email } = result[0] || {}
          data = {
            name: username,
            avatar: avatar_url,
            address: email,
          }
        }

        this.props.onEnter(data)
      })
    })
  }, 100)

  handleCheckItem = user => () => {
    this.setState({ value: '', users: [] }, () => {
      this.props.onEnter({
        name: user.name,
        avatar: user.avatar_url,
        address: user.email,
      })
    })
  }

  renderRightIcon() {
    const { valid } = this.state
    const icon = valid ? (
      <div className={styles.button} onClick={this.handleEnter}>
        <Icon name="add" color={{ primary: '#fff', secondary: '#fff' }} />
      </div>
    ) : (
      <img src="/assets/error.svg" alt="error" />
    )
    const content = valid ? (
      <div className={styles.tooltip}>{t('NOTIFY_LIST_ADD_TIP')}</div>
    ) : (
      <div className={styles.tooltip}>
        <img src="/assets/error.svg" alt="error" />
        {t('NOTIFY_LIST_INPUT_ERRPR_TIP')}
      </div>
    )

    return (
      <Tooltip content={content}>
        <div className={styles.rightIcon}>{icon}</div>
      </Tooltip>
    )
  }

  renderInputPrompt() {
    const { users } = this.state

    return (
      <div
        className={classnames(styles.prompt, {
          [styles.active]: !isEmpty(users),
        })}
      >
        {users.map(user => {
          const regExp = new RegExp(`(${this.state.value})`, 'g')
          const username = String(user.name).replace(regExp, `<em>$1</em>`)

          return (
            <div
              key={username}
              className={styles.item}
              onClick={this.handleCheckItem(user)}
            >
              <div className={styles.info}>
                <img
                  className={styles.avatar}
                  src={user.avatar_url || '/assets/default-user.svg'}
                  alt="avatar"
                />
                <div className={styles.desc}>
                  <strong dangerouslySetInnerHTML={{ __html: username }} />
                  <p>{user.email || '-'}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { valid, value } = this.state
    const isExistValue = !isEmpty(value)

    return (
      <div className={styles.emailInput}>
        <Control
          className={classnames(
            styles.input,
            'has-icons-left',
            'has-icons-right',
            {
              [styles.error]: isExistValue && !valid,
            }
          )}
        >
          <Icon className="is-left" name="mail" size={16} />
          <Input
            type="text"
            name="email"
            placeholder={t('NOTIFY_LIST_INPUT_PLACEHOLDER')}
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.handleEnter}
          />
          {isExistValue && this.renderRightIcon()}
        </Control>
        {isExistValue && this.renderInputPrompt()}
      </div>
    )
  }
}
