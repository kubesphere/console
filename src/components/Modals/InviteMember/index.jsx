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

import { Modal, Search, ScrollLoad } from 'components/Base'

import UserStore from 'stores/user'

import User from './User'

import styles from './index.scss'

@observer
export default class InviteMemberModal extends React.Component {
  static propTypes = {
    roles: PropTypes.array,
    visible: PropTypes.bool,
    workspace: PropTypes.string,
    namespace: PropTypes.string,
    cluster: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    roles: [],
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.userStore = new UserStore()
    this.memberStore = new UserStore()

    this.state = {
      members: [],
      newMembers: [],
    }
  }

  componentDidMount() {
    const { cluster, workspace, namespace, devops } = this.props
    this.memberStore
      .fetchList({ limit: -1, cluster, workspace, namespace, devops })
      .then(() => {
        this.setState({
          members: this.memberStore.list.data.map(user => user.name),
        })
      })
  }

  fetchData = (params = {}) => {
    const { workspace, namespace, devops } = this.props
    this.userStore.fetchList({
      name: this.state.name,
      workspace: namespace || devops ? workspace : undefined,
      ...params,
    })
  }

  handleSearch = value => {
    this.setState({ name: value }, this.fetchData)
  }

  handleSelect = (username, roleRef) => {
    this.setState(({ members, newMembers }) => ({
      members: [...members, username],
      newMembers: [
        ...newMembers,
        {
          username,
          roleRef,
        },
      ],
    }))
  }

  handleSubmit = () => {
    this.props.onOk(this.state.newMembers)
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
    const { members } = this.state
    const { data = [], total, page, isLoading } = toJS(this.userStore.list)

    return (
      <Modal
        width={691}
        icon="pen"
        onCancel={onCancel}
        onOk={this.handleSubmit}
        visible={visible}
        bodyClassName={styles.modalBody}
        hideHeader
      >
        <div className={styles.body}>
          <div className={styles.title}>
            <div className="h4">
              {title || t('Invite Members to the Project')}
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
                    key={item.name}
                    user={item}
                    roles={roles}
                    selected={members.includes(item.name)}
                    onSelect={this.handleSelect}
                  />
                ))}
              </ScrollLoad>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}
