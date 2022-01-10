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
import { observer } from 'mobx-react'
import { isEmpty } from 'lodash'

import { Modal } from 'components/Base'

import UserStore from 'stores/user'
import GroupStore from 'stores/group'

import { ROLE_QUERY_KEY } from 'utils/constants'

import styles from './index.scss'

@observer
export default class RoleDeleteModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    module: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      users: [],
      groups: {},
      isLoading: false,
    }

    this.store = new UserStore()
    this.groupStore = new GroupStore()
  }

  componentDidMount() {
    const { visible, detail } = this.props

    if (visible && detail.name) {
      this.fetchData()
    }
  }

  async fetchData() {
    const {
      module,
      detail: { name },
      cluster,
      workspace,
      namespace,
    } = this.props
    this.setState({ isLoading: true })
    const users = await this.store.fetchList({
      [ROLE_QUERY_KEY[module]]: name,
      cluster,
      workspace,
      namespace,
    })
    if (isEmpty(users) && workspace) {
      const groups = await this.groupStore.getWorksapceRoleBinding('', {
        cluster,
        workspace,
        namespace,
        rolename: name,
      })
      this.setState({ groups })
    }
    this.setState({ users, isLoading: false })
  }

  render() {
    const { detail, visible, onOk, onCancel, isSubmitting } = this.props
    const { users, groups, isLoading } = this.state

    return (
      <Modal
        width={504}
        onOk={isLoading || users.length || groups.totalItems ? null : onOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
        okButtonType="danger"
        hideHeader
      >
        <div className={styles.body}>
          <div className="h5">{t('DELETE_ROLE')}</div>
          <p>
            {!isLoading && users.length
              ? t.html(
                  `DELETE_ROLE_USER_TIP${users.length === 1 ? '' : '_PL'}`,
                  {
                    count: users.length,
                  }
                )
              : groups.totalItems
              ? t.html(
                  `DELETE_ROLE_DEPARTMENT_TIP${
                    groups.totalItems === 1 ? '' : '_PL'
                  }`,
                  { count: groups.totalItems }
                )
              : t.html('DELETE_ROLE_TIP', { resource: detail.name })}
          </p>
        </div>
      </Modal>
    )
  }
}
