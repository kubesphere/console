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
import { computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { get, capitalize } from 'lodash'

import { getAlertMessageDesc } from 'utils/alerting'

import AlertMessageStore from 'stores/alerting/message'
import AlertPolicyStore from 'stores/alerting/policy'

import { Notify } from 'components/Base'
import Base from 'core/containers/Base/Detail'
import CommentModal from 'components/Modals/Alerting/Comment'

class MessageDetail extends Base {
  state = {
    ...this.state,
    commentModal: false,
  }

  init() {
    this.store = new AlertMessageStore(this.level)
    this.policyStore = new AlertPolicyStore(this.level)
  }

  fetchData = params => {
    if (this.store.fetchDetail) {
      this.store.fetchDetail({ ...this.params, ...params }).then(data => {
        if (!data.id) {
          this.setState({ notFound: true })
        }
      })
    }
  }

  get enabledActions() {
    return ['record', 'delete']
  }

  get level() {
    return this.namespace ? 'workload' : 'node'
  }

  get params() {
    return this.props.match.params
  }

  get namespace() {
    return this.params.namespace
  }

  get name() {
    return 'alerting message'
  }

  get listUrl() {
    return this.namespace
      ? `/projects/${this.namespace}/alert-message`
      : '/monitoring/alert-message'
  }

  @computed
  get detailName() {
    const { ruleName } = this.store.detail
    return ruleName || this.name
  }

  @computed
  get detailDesc() {
    return getAlertMessageDesc(this.store.detail)
  }

  @computed
  get severity() {
    const { severity } = this.store.detail
    return t(severity)
  }

  @computed
  get isRecovery() {
    const { status } = this.store.detail
    return status === 'resumed'
  }

  @computed
  get status() {
    return this.isRecovery ? t('resumed') : t('triggered')
  }

  @computed
  get resourceType() {
    const { resourceType } = this.store.detail
    const str = capitalize(resourceType)
    return t('ALERT_TYPE', { type: t(str) })
  }

  getOperations = () => [
    {
      key: 'comment',
      type: 'default',
      text: t('ALERT_COMMENT'),
      action: 'record',
      onClick: this.showModal('commentModal'),
    },
  ]

  getAttrs = () => [
    {
      name: t('Alerting Level'),
      value: this.severity,
    },
    {
      name: t('Alerting Status'),
      value: this.status,
    },
    {
      name: t('Alerting Type'),
      value: this.resourceType,
    },
    {
      name: this.isRecovery ? t('Recovery Time') : t('Alerting Time'),
      value: this.createTime,
    },
  ]

  handleComment = newData => {
    const { id, comment = '' } = newData || {}
    const addresser = get(globals, 'user.email')
    const data = {
      history_id: id,
      addresser,
      content: comment,
    }

    this.store.createComment(data).then(() => {
      this.hideModal('commentModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.fetchData()
    })
  }

  renderExtraModals() {
    const { detail, isSubmitting } = this.store
    const { commentModal } = this.state

    return (
      <div>
        <CommentModal
          visible={commentModal}
          detail={detail}
          onOk={this.handleComment}
          onCancel={this.hideModal('commentModal')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(MessageDetail))
export const Component = MessageDetail
