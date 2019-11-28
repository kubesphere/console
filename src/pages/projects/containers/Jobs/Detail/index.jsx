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
import { get, isEmpty } from 'lodash'

import { getLocalTime } from 'utils'
import { getJobStatus } from 'utils/status'
import WorkloadStore from 'stores/workload'
import RecordStore from 'stores/workload/record'
import ResourceStore from 'stores/workload/resource'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'

@inject('rootStore')
@observer
class JobsDetail extends Base {
  state = {
    editBaseInfo: false,
    viewYaml: false,
    deleteModule: false,
  }

  get name() {
    return 'Job'
  }

  get selectors() {
    const { spec = {} } = this.store.detail
    const selector = get(spec, 'selector.matchLabels', {})

    return isEmpty(selector) ? (
      '-'
    ) : (
      <span>
        {Object.keys(selector)
          .map(key => `${key} = ${selector[key]}`)
          .join(', ')}
      </span>
    )
  }

  get updateTime() {
    const conditions = get(this.store.detail, 'status.conditions', [])

    if (isEmpty(conditions)) return '-'

    let lastTime = new Date(
      get(conditions, '[0].lastTransitionTime', 0)
    ).valueOf()
    conditions.forEach(({ lastTransitionTime }) => {
      const value = new Date(lastTransitionTime).valueOf()
      value > lastTime && (lastTime = value)
    })

    return getLocalTime(lastTime).format('YYYY-MM-DD HH:mm:ss')
  }

  init() {
    this.store = new WorkloadStore(this.module)
    this.resourceStore = new ResourceStore(this.module)
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
      key: 'rerun',
      icon: 'refresh',
      text: t('Rerun'),
      action: 'edit',
      onClick: this.handleRerun,
    },
    {
      key: 'viewYaml',
      icon: 'pen',
      text: t('View YAML'),
      action: 'view',
      onClick: this.showModal('viewYaml'),
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
    const detail = toJS(this.store.detail)
    const { spec = {} } = detail
    const status = getJobStatus(detail)

    return [
      {
        name: t('Project'),
        value: this.namespace,
      },
      {
        name: t('Status'),
        value: t(status),
      },
      {
        name: t('backoffLimit'),
        value: spec.backoffLimit,
      },
      {
        name: t('completions'),
        value: spec.completions,
      },
      {
        name: t('parallelism'),
        value: spec.parallelism,
      },
      {
        name: t('activeDeadlineSeconds'),
        value: spec.activeDeadlineSeconds,
      },
      {
        name: t('Selector'),
        value: this.selectors,
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

  handleRerun = () => {
    const { detail } = this.store
    this.store.rerun(detail).then(() => {
      this.fetchData()
    })
  }

  renderExtraModals() {
    const { detail = {}, isSubmitting } = this.store
    const { editBaseInfo, viewYaml } = this.state

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
          visible={viewYaml}
          detail={originData}
          onCancel={this.hideModal('viewYaml')}
          readOnly
        />
      </div>
    )
  }
}

export default JobsDetail
