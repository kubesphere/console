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

import { Status } from 'components/Base'
import Table from 'components/Tables/List'
import withList, { ListPage } from 'components/HOCs/withList'
import Banner from 'components/Cards/Banner'
import Avatar from 'apps/components/Avatar'

import ReviewStore from 'stores/openpitrix/review'
import { REVIEW_QUERY_STATUS } from 'configs/openpitrix/app'
import { getLocalTime, showNameAndAlias } from 'utils'
import { transferReviewStatus } from 'utils/app'
import { find } from 'lodash'
import styles from './index.scss'

@withList({
  store: new ReviewStore(),
  module: 'apps',
  name: 'APP_REVIEW',
  rowKey: 'version_id',
})
export default class Reviews extends React.Component {
  get type() {
    return this.props.match.params.type
  }

  get tabs() {
    return {
      value: this.type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'unprocessed',
          label: t('NEW_SUBMIT'),
        },
        {
          value: 'processed',
          label: t('COMPLETED'),
        },
        {
          value: 'all',
          label: t('ALL'),
        },
      ],
    }
  }

  handleTabChange = value => {
    this.props.routing.push(`/apps-manage/reviews/${value}`)
  }

  getData = async params => {
    const queryStatus = REVIEW_QUERY_STATUS[this.type]
    await this.props.store.fetchReviewList({
      status: queryStatus,
      queryApp: true,
      ...params,
    })
  }

  get itemActions() {
    return [
      {
        key: 'handle',
        icon: 'eye',
        text: t('VIEW_DETAILS'),
        onClick: this.showReview,
      },
    ]
  }

  showReview = item =>
    this.props.trigger('openpitrix.template.review', {
      detail: item,
      type: this.type,
      success: this.getData,
      onReject: () =>
        this.props.trigger('openpitrix.template.reject', {
          detail: item,
          type: this.type,
          success: this.getData,
        }),
    })

  getAppIcon = appId =>
    (find(this.props.store.list.apps, { app_id: appId }) || {}).icon

  getAppISV = appId =>
    (find(this.props.store.list.apps, { app_id: appId }) || {}).isv

  get tableActions() {
    const { tableProps } = this.props
    return {
      ...tableProps.tableActions,
      onCreate: null,
      selectActions: [],
    }
  }

  getColumns = () => [
    {
      title: t('NAME'),
      dataIndex: 'review_id',
      width: '30%',
      render: (review_id, item) => (
        <Avatar
          avatarClass={styles.appIcon}
          avatar={this.getAppIcon(item.app_id)}
          iconLetter={item.app_name}
          iconSize={40}
          title={item.app_name}
          desc={item.version_name || '-'}
          onClick={() => this.showReview(item)}
        />
      ),
    },
    {
      title: t('WORKSPACE'),
      dataIndex: 'app_id',
      isHideable: true,
      width: '15%',
      render: appId => {
        return showNameAndAlias(this.getAppISV(appId), 'workspace')
      },
    },
    {
      title: t('OPERATOR'),
      dataIndex: 'reviewer',
      isHideable: true,
      width: '15%',
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      isHideable: true,
      width: '15%',
      render: status => {
        const transStatus = transferReviewStatus(status)
        return (
          <Status
            className={styles.status}
            type={transStatus}
            name={t(
              `APP_STATUS_${transStatus.toUpperCase().replace(/-/g, '_')}`
            )}
          />
        )
      },
    },
    {
      title: t('UPDATE_TIME_TCAP'),
      dataIndex: 'status_time',
      isHideable: true,
      width: '15%',
      render: time => getLocalTime(time).fromNow(),
    },
  ]

  get emptyProps() {
    return {
      icon: 'safe-notice',
      title: t(`APP_REVIEW_${this.type.toUpperCase()}_EMPTY_DESC`),
    }
  }

  render() {
    const { bannerProps, tableProps } = this.props
    return (
      <ListPage {...this.props} getData={this.getData} noWatch>
        <Banner
          {...bannerProps}
          tabs={this.tabs}
          icon="safe-notice"
          title={t('APP_REVIEW')}
          description={t('APP_REVIEW_DESC')}
        />
        <Table
          {...tableProps}
          tableActions={this.tableActions}
          itemActions={this.itemActions}
          emptyProps={this.emptyProps}
          columns={this.getColumns()}
          searchType="keyword"
        />
      </ListPage>
    )
  }
}
