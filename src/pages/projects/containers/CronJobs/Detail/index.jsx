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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import WorkloadStore from 'stores/workload'
import RecordStore from 'stores/workload/record'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'

@inject('rootStore')
@observer
class CronJobsDetail extends Base {
  state = {
    editBaseInfo: false,
    editYaml: false,
    deleteModule: false,
  }

  get name() {
    return 'CronJob'
  }

  get suspend() {
    return this.store.detail.suspend
  }

  init() {
    this.store = new WorkloadStore(this.module)
    this.recordStore = new RecordStore()
  }

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      key: 'start',
      icon: 'start',
      text: t('Start'),
      action: 'edit',
      onClick: this.handleSwitch(true),
      show: this.suspend,
    },
    {
      key: 'pause',
      icon: 'stop',
      text: t('Pause'),
      action: 'edit',
      onClick: this.handleSwitch(false),
      show: !this.suspend,
    },
    {
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: this.showModal('editYaml'),
    },
    {
      key: 'delete',
      icon: 'trash',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getAttrs = () => {
    const { detail } = this.store
    const { spec = {} } = detail
    const status = this.suspend ? t('Suspend') : t('Running')

    return [
      {
        name: t('Project'),
        value: this.namespace,
      },
      {
        name: t('Status'),
        value: status,
      },
      {
        name: t('Schedule'),
        value: spec.schedule,
      },
      {
        name: t('startingDeadlineSeconds'),
        value: spec.startingDeadlineSeconds,
      },
      {
        name: t('successfulJobsHistoryLimit'),
        value: spec.successfulJobsHistoryLimit,
      },
      {
        name: t('failedJobsHistoryLimit'),
        value: spec.failedJobsHistoryLimit,
      },
      {
        name: t('concurrencyPolicy'),
        value: spec.concurrencyPolicy,
      },
      {
        name: t('Created Time'),
        value: this.createTime,
      },
      {
        name: t('Creator'),
        value: this.creator,
      },
    ]
  }

  handleSwitch = params => () => {
    this.store.switch(this.store.detail, params).then(() => {
      this.fetchData()
    })
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const { editBaseInfo, editYaml } = this.state

    const originData = toJS(detail._originData)

    return (
      <div>
        <EditBasicInfoModal
          visible={editBaseInfo}
          detail={originData}
          onOk={this.handleEdit('editBaseInfo')}
          onCancel={this.hideModal('editBaseInfo')}
          isSubmitting={isSubmitting}
        />
        <EditYamlModal
          visible={editYaml}
          detail={originData}
          onOk={this.handleEdit('editYaml', 'update')}
          onCancel={this.hideModal('editYaml')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default CronJobsDetail
