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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import { toJS } from 'mobx'

import {
  RadioGroup,
  RadioButton,
  InputSearch,
  Tag,
} from '@kube-design/components'

import { ScrollLoad } from 'components/Base'
import { trigger } from 'utils/action'

import User from './User'

import styles from './index.scss'

@inject('rootStore')
@observer
@trigger
export default class GroupUser extends Component {
  static propTypes = {
    group: PropTypes.string,
    enabledActions: PropTypes.array,
    selectedKeys: PropTypes.array,
    refreshFlag: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.userStore = props.userStore
    this.groupStore = props.groupStore

    this.state = {
      type: 'ingroup',
      group: props.group,
      search: '',
    }
    this.configs = this.getConfigs()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.refreshFlag !== this.props.refreshFlag ||
      prevProps.group !== this.props.group
    ) {
      this.setState({ group: this.props.group }, () => {
        this.fetchIngroupData()
        this.fetchNotingroupData()
      })
    }
  }

  getConfigs = () => [
    {
      type: 'notingroup',
      title: t('Not Assigned'),
      onFetch: 'fetchNotingroupData',
    },
    {
      type: 'ingroup',
      title: t('Assigned'),
      onFetch: 'fetchIngroupData',
    },
  ]

  getCount = type => {
    return this.userStore[type].total || 0
  }

  getColor = value => {
    const { type } = this.state
    return value === type ? '#55bc8a' : '#c1c9d1'
  }

  fetchNotingroupData = (params = {}) => {
    const { group, search } = this.state
    this.userStore.fetchGroupUser({
      ...params,
      notingroup: group,
      name: search,
      type: 'notingroup',
      limit: 10,
    })
  }

  fetchIngroupData = (params = {}) => {
    const { group, search } = this.state
    this.userStore.fetchGroupUser({
      ...params,
      ingroup: group,
      name: search,
      type: 'ingroup',
      limit: 10,
    })
  }

  handleTypeChange = type => {
    this.setState({ type })
  }

  handleSearch = value => {
    this.setState({ search: value }, () => {
      this.fetchIngroupData()
      this.fetchNotingroupData()
    })
  }

  handleSelect = user => {
    this.props.onSelect(user)
  }

  handleDelete = item => {
    this.trigger('group.user.remove', {
      store: this.props.groupStore,
      detail: toJS({ ...item, group: this.state.group }),
      success: () => {
        this.fetchIngroupData({ page: 1 })
        this.fetchNotingroupData({ page: 1 })
      },
      ...this.props.match.params,
    })
  }

  renderToolBar() {
    return (
      <div className="level">
        <div className="level-left">
          <RadioGroup
            mode="button"
            value={this.state.type}
            onChange={this.handleTypeChange}
          >
            {this.configs.map(({ type, title }) => (
              <RadioButton key={type} value={type}>
                {title}
                <Tag color={this.getColor(type)}>{this.getCount(type)}</Tag>
              </RadioButton>
            ))}
          </RadioGroup>
          {this.state.group && (
            <InputSearch
              className={styles.search}
              onSearch={this.handleSearch}
              placeholder={t('Search by name')}
            />
          )}
        </div>
      </div>
    )
  }

  renderUserItem(tab) {
    const { type, onFetch } = tab
    const { data = [], total, page, isLoading } = toJS(this.userStore[type])
    const { selectedKeys, enabledActions } = this.props
    const { group } = this.state

    if (!group && type === 'ingroup') {
      return this.renderPlaceHolder()
    }

    return (
      <ScrollLoad
        data={data}
        total={total}
        page={page}
        loading={isLoading}
        onFetch={this[onFetch]}
      >
        {data.map(item => (
          <User
            key={`${type}-${item.name}`}
            type={type}
            user={item}
            group={group}
            groupStore={this.groupStore}
            enabledActions={enabledActions}
            selected={selectedKeys.includes(item.name)}
            onSelect={() => this.handleSelect(item)}
            onDelete={() => this.handleDelete(item)}
          />
        ))}
      </ScrollLoad>
    )
  }

  renderPlaceHolder = () => {
    return <div className={styles.item}>{t('WORKSPACE_GROUP_EMPTY_DESC')}</div>
  }

  render() {
    const { type } = this.state

    return (
      <div className={styles.userWrapper}>
        {this.renderToolBar()}
        <div className={styles.scrollWrapper}>
          {this.configs.map(tab => (
            <div
              className={classnames(
                styles.tabPanel,
                type === tab.type && styles.active
              )}
              key={tab.type}
            >
              {this.renderUserItem(tab)}
            </div>
          ))}
        </div>
      </div>
    )
  }
}
