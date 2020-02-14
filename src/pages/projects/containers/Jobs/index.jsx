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

import { getLocalTime, getDisplayName } from 'utils'
import { JOB_STATUS, ICON_TYPES } from 'utils/constants'
import { getWorkloadStatus } from 'utils/status'
import { getFormTemplate } from 'utils/form.templates'

import WorkloadStore from 'stores/workload'

import FORM_STEPS from 'configs/steps/jobs'

import { Avatar } from 'components/Base'
import Base from 'core/containers/Base/List'
import JobBanner from 'projects/components/JobBanner'
import StatusReason from 'projects/components/StatusReason'
import JobStatus from 'projects/components/JobStatus'
import CreateModal from 'components/Modals/Create'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'

@inject('rootStore')
@observer
class Jobs extends Base {
  init() {
    this.store = new WorkloadStore(this.module)
    this.store.fetchCounts(['jobs', 'cronjobs'])
    this.initWebsocket()
  }

  get module() {
    return 'jobs'
  }

  get name() {
    return 'Job'
  }

  get quotaKey() {
    return 'count/jobs.batch'
  }

  get steps() {
    return FORM_STEPS
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return getFormTemplate(namespace, this.module)
  }

  get itemActions() {
    return [
      {
        key: 'edit',
        icon: 'pen',
        text: t('EDIT'),
        action: 'edit',
        onClick: this.showModal('editModal'),
      },
      {
        key: 'rerun',
        icon: 'refresh',
        text: t('Rerun'),
        action: 'edit',
        onClick: this.handleRerun,
      },
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  getStatus() {
    return JOB_STATUS.map(status => ({
      text: t(status.text),
      value: status.value,
    }))
  }

  getItemDesc = record => {
    const { status, reason } = getWorkloadStatus(record, this.module)
    const desc = reason ? (
      <StatusReason status={status} reason={t(reason)} data={record} />
    ) : (
      record.description || '-'
    )

    return desc
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: true,
      sortOrder: this.getSortOrder('name'),
      search: true,
      render: (name, record) => (
        <Avatar
          icon={ICON_TYPES[this.module]}
          iconSize={40}
          title={getDisplayName(record)}
          desc={this.getItemDesc(record)}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      filters: this.getStatus(),
      filteredValue: this.getFilteredValue('status'),
      isHideable: true,
      search: true,
      width: '25%',
      render: this.renderStatus,
    },
    {
      title: t('Last schedule time'),
      dataIndex: 'status.startTime',
      sorter: true,
      sortOrder: this.getSortOrder('status.startTime'),
      isHideable: true,
      search: true,
      width: '20%',
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  handleRerun = item => {
    this.store.rerun(item).then(() => {
      this.getData()
    })
  }

  renderStatus = (status, record) => (
    <JobStatus data={record} module={this.module} />
  )

  renderHeader() {
    return (
      <JobBanner
        module={this.module}
        {...this.props.match.params}
        jobsCount={this.store.counts.jobs}
        cronjobsCount={this.store.counts.cronjobs}
      />
    )
  }

  renderExtraModals() {
    const { createModal, editModal, selectItem = {} } = this.state
    const { isSubmitting } = this.store

    return (
      <div>
        <CreateModal
          name={this.name}
          module={this.module}
          store={this.store}
          visible={createModal}
          steps={this.steps}
          formTemplate={this.formTemplate}
          isSubmitting={isSubmitting}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
        />
        <EditBasicInfoModal
          visible={editModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEdit}
          onCancel={this.hideModal('editModal')}
        />
      </div>
    )
  }
}

export default Jobs
