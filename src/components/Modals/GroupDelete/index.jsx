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

import { Modal } from 'components/Base'

import UserStore from 'stores/user'

import styles from './index.scss'

@observer
export default class GroupDeleteModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    module: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = new UserStore()
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) {
      this.fetchData()
    }
  }

  fetchData() {
    const { visible, detail, cluster, workspace, namespace } = this.props

    if (visible && detail.group_id) {
      this.store.fetchGroupUser({
        type: 'ingroup',
        ingroup: detail.group_id,
        cluster,
        workspace,
        namespace,
      })
    }
  }

  render() {
    const { detail, visible, onOk, onCancel } = this.props
    const { data, isLoading } = toJS(this.store.ingroup)

    return (
      <Modal
        width={504}
        onOk={isLoading || data.length ? null : onOk}
        onCancel={onCancel}
        visible={visible}
        okButtonType="danger"
        hideHeader
      >
        <div className={styles.body}>
          <div className="h5">{t('Sure to delete')}?</div>
          <p>
            {t.html('DELETE_GROUP_TIP', { resource: detail.group_name })}{' '}
            {!isLoading && data.length
              ? t.html('GROUP_USERS_TIP', { count: data.length })
              : null}
          </p>
        </div>
      </Modal>
    )
  }
}
