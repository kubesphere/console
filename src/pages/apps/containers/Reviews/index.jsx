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
import { observer, inject } from 'mobx-react'

import { get, find, capitalize, values } from 'lodash'

import { Status, Notify } from 'components/Base'
import Base from 'core/containers/Base/List'
import Banner from 'components/Cards/Banner'
import Avatar from 'apps/components/Avatar'
import EmptyTable from 'components/Cards/EmptyTable'
import AppReviewModal from 'apps/components/Modals/AppReview'
import RejectModal from 'apps/components/Modals/ReviewReject'

import ReviewStore from 'stores/openpitrix/review'
import { REVIEW_QUERY_STATUS } from 'configs/openpitrix/app'
import { getLocalTime } from 'utils'
import { transferReviewStatus } from 'utils/app'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Reviews extends Base {
  state = {
    type: this.props.match.params.type,
  }

  init() {
    this.store = new ReviewStore()
  }

  get name() {
    return 'App Reviews'
  }

  get canHandle() {
    return this.state.type === 'unprocessed'
  }

  get authKey() {
    return 'apps'
  }

  get itemActions() {
    return [
      {
        key: 'handle',
        icon: 'eye',
        text: t(this.canHandle ? 'Review' : 'View'),
        onClick: this.showAppReview,
      },
    ]
  }

  get tabs() {
    return {
      value: this.state.type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'unprocessed',
          label: t('Unprocessed'),
        },
        {
          value: 'processed',
          label: t('Processed'),
        },
        {
          value: 'all',
          label: t('All'),
        },
      ],
    }
  }

  getData = async params => {
    const queryStatus = REVIEW_QUERY_STATUS[this.state.type]
    await this.store.fetchReviewList({
      status: queryStatus,
      queryApp: true,
      ...params,
    })
  }

  getAppIcon = appId =>
    (find(this.store.list.apps, { app_id: appId }) || {}).icon

  getAppISV = appId => (find(this.store.list.apps, { app_id: appId }) || {}).isv

  showReviewModal = detail => () => {
    this.setState(() => ({
      selectItem: detail,
    }))
    this.showModal('appReview')()
  }

  showAppReview = () => {
    this.showModal('appReview')()
  }

  handlePass = () => {
    const { app_id, version_id } = this.state.selectItem
    this.store.handle({ app_id, version_id, action: 'pass' }).then(() => {
      this.hideModal('appReview')()
      Notify.success(t('Pass Successfully'))
      this.getData()
    })
  }

  handleReject = params => {
    const { app_id, version_id } = this.state.selectItem
    this.store
      .handle({ app_id, version_id, action: 'reject', ...params })
      .then(() => {
        this.hideModal('appReview')()
        this.hideModal('reviewReject')()
        Notify.success(t('Reject Successfully'))
        this.getData()
      })
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      onCreate: null,
      selectActions: [],
      searchType: 'keyword',
    }
  }

  getOperator = phase => get(values(phase), '[0].operator', '-')

  getColumns = () => [
    {
      title: t('Review Object'),
      dataIndex: 'review_id',
      width: '30%',
      render: (review_id, item) => (
        <Avatar
          isApp
          avatarClass={styles.appIcon}
          avatar={this.getAppIcon(item.app_id)}
          iconLetter={item.app_name}
          iconSize={40}
          title={item.app_name}
          desc={item.version_name || '-'}
          onClick={this.showReviewModal(item)}
        />
      ),
    },
    {
      title: t('Type'),
      dataIndex: 'type',
      isHideable: true,
      width: '15%',
      render: () => t('Request for Approval'),
    },
    {
      title: t('Workspace'),
      dataIndex: 'app_id',
      isHideable: true,
      width: '10%',
      render: appId => this.getAppISV(appId),
    },
    {
      title: t('Operator'),
      dataIndex: 'phase',
      isHideable: true,
      width: '10%',
      render: phase => this.getOperator(phase),
    },
    {
      title: t('Review Status'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => (
        <Status
          className={styles.status}
          type={transferReviewStatus(status)}
          name={t(capitalize(transferReviewStatus(status)))}
        />
      ),
    },
    {
      title: t('Updated Time'),
      dataIndex: 'status_time',
      isHideable: true,
      width: '15%',
      render: time => getLocalTime(time).fromNow(),
    },
    {
      key: 'more',
      render: this.renderMore,
    },
  ]

  handleTabChange = value => {
    this.routing.push(`/apps-manage/reviews/${value}`)
    this.setState({ type: value }, () => {
      this.getData()
    })
  }

  renderEmpty() {
    return (
      <EmptyTable name={this.name} onCreate={null} {...this.getEmptyProps()} />
    )
  }

  renderHeader() {
    return (
      <Banner
        className="margin-b12"
        icon="safe-notice"
        title={t(this.name)}
        description={t('APP_REVIEW_DESC')}
        module={this.module}
        tips={this.tips}
        tabs={this.tabs}
      />
    )
  }

  renderExtraModals() {
    const { appReview, reviewReject, selectItem } = this.state

    return (
      <div>
        <AppReviewModal
          title={t('Review Content')}
          description={t('REVIEW_CONTENT_DESC')}
          icon={'safe-notice'}
          visible={appReview}
          canHandle={this.canHandle}
          detail={selectItem}
          onOk={this.handlePass}
          onCancel={this.hideModal('appReview')}
          onReject={this.showModal('reviewReject')}
        />
        <RejectModal
          title={t('Reject Reason')}
          description={t('REJECT_REASON_DESC')}
          icon={'safe-notice'}
          visible={reviewReject}
          canHandle={this.canHandle}
          versionId={get(selectItem, 'version_id', '')}
          onOk={this.handleReject}
          onCancel={this.hideModal('reviewReject')}
        />
      </div>
    )
  }
}
