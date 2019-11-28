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
import { observer } from 'mobx-react'

import { Modal, Button, Search, ScrollLoad } from 'components/Base'

import UserStore from 'stores/user'
import WorkspaceMemberStore from 'stores/workspace/member'

import User from './User'

import styles from './index.scss'

@observer
export default class InviteMemberModal extends React.Component {
  static propTypes = {
    roles: PropTypes.array,
    users: PropTypes.array,
    visible: PropTypes.bool,
    workspace: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    roles: [],
    users: [],
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.userStore = new UserStore()

    this.workspaceMemberStore = new WorkspaceMemberStore()

    this.state = {
      users: props.users.map(user => user.username),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && nextProps.users.length !== this.state.users.length) {
      this.setState({
        users: nextProps.users.map(user => user.username),
      })
    }
  }

  fetchData = (params = {}) => {
    if (this.props.workspace) {
      this.workspaceMemberStore.fetchList({
        workspace: this.props.workspace,
        keyword: this.state.keyword,
        ...params,
        paging: false,
      })
    } else {
      this.userStore.fetchList({ keyword: this.state.keyword, ...params })
    }
  }

  handleSearch = value => {
    this.setState({ keyword: value }, this.fetchData)
  }

  handleSelect = (userName, role) => {
    const { onOk } = this.props

    onOk(userName, role)
  }

  render() {
    const {
      visible,
      onCancel,
      roles,
      title,
      desc,
      searchPlaceholder,
    } = this.props
    const { data = [], total, page, isLoading } = this.props.workspace
      ? toJS(this.workspaceMemberStore.list)
      : toJS(this.userStore.list)

    return (
      <Modal
        width={691}
        icon="pen"
        onCancel={onCancel}
        visible={visible}
        bodyClassName={styles.modalBody}
        hideHeader
        hideFooter
      >
        <div className={styles.body}>
          <div className={styles.title}>
            <div className="h4">
              {title || t('Invite members to the project')}
            </div>
            <p>{desc || t('INVITE_MEMBER_DESC')}</p>
          </div>
          <div className={styles.content}>
            <Search
              placeholder={
                searchPlaceholder || t('INVITE_MEMBER_SEARCH_PLACEHODLER')
              }
              onSearch={this.handleSearch}
            />
            <div className={styles.results}>
              <ScrollLoad
                data={data}
                total={total}
                page={page}
                loading={isLoading}
                onFetch={this.fetchData}
              >
                {data.map(item => (
                  <User
                    key={item.username}
                    user={item}
                    roles={roles}
                    selected={this.state.users.includes(item.username)}
                    onSelect={this.handleSelect}
                  />
                ))}
              </ScrollLoad>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button onClick={onCancel} data-test="modal-close">
            {t('Close')}
          </Button>
        </div>
      </Modal>
    )
  }
}
