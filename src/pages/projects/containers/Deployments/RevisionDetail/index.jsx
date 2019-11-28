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
import moment from 'moment-mini'
import { isEmpty, get } from 'lodash'

import { getDeployStatus } from 'utils/status'
import RevisionStore from 'stores/workload/revision'

import Base from 'core/containers/Base/Detail'
import EditYamlModal from 'components/Modals/EditYaml'
import RollBackModal from 'projects/components/Modals/RollBack'

class RevisionDetail extends Base {
  state = {
    viewYaml: false,
    rollBack: false,
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get params() {
    return get(this.props, 'match.params', {})
  }

  get revision() {
    return Number(get(this.props, 'match.params.revision'))
  }

  get detailName() {
    const { name } = this.store.workloadDetail
    return `${name || ''} #${this.revision}`
  }

  get replicaStatus() {
    const {
      detail: { spec = {}, status = {} },
    } = this.store

    return `${spec.replicas || 0} desired |
      ${status.replicas || 0} total |
      ${status.updatedReplicas || 0} updated |
      ${status.availableReplicas || 0} available |
      ${status.unavailableReplicas || 0} unavailable`
  }

  get revisionStatus() {
    return t(getDeployStatus(this.store.detail))
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

  get strategyType() {
    return t(get(this.store.workloadDetail, 'strategy.type'))
  }

  get rollingUpdate() {
    const {
      detail: { strategy = {} },
    } = this.store

    return strategy.type === 'RollingUpdate'
      ? Object.entries(strategy.rollingUpdate)
          .map(([key, value]) => `${t(key)}=${value}`)
          .join(', ')
      : ''
  }

  get createTime() {
    return moment(this.store.workloadDetail.createTime).format(
      `${t('MMMM Do YYYY')} HH:mm`
    )
  }

  init() {
    this.store = new RevisionStore(this.module)
  }

  fetchData = async () => {
    const { params } = this.props.match

    await this.store.fetchWorkloadDetail(params)
    await this.store.fetchCurrentRevision(this.store.workloadDetail)
    this.store.fetchDetail(params)
  }

  getOperations = () => [
    {
      key: 'editYaml',
      type: 'control',
      text: t('View YAML'),
      action: 'view',
      onClick: this.showModal('viewYaml'),
    },
    {
      key: 'rollBack',
      icon: 'timed-task',
      text: t('Revision Rollback'),
      action: 'edit',
      onClick: this.showModal('rollBack'),
    },
  ]

  getAttrs = () => [
    {
      name: t('Project'),
      value: this.namespace,
    },
    {
      name: t('Application'),
      value: this.application,
    },
    {
      name: t('Replica Status'),
      value: this.replicaStatus,
    },
    {
      name: t('Status'),
      value: this.revisionStatus,
    },
    {
      name: t('Selector'),
      value: this.selectors,
    },
    {
      name: t('Strategy Type'),
      value: this.strategyType,
    },
    {
      show: this.rollingUpdate,
      name: t('RollingUpdate'),
      value: this.rollingUpdate,
    },
    {
      name: t('Created Time'),
      value: this.createTime,
    },
    {
      name: t('Updated Time'),
      value: this.updateTime,
    },
    {
      name: t('Creator'),
      value: this.creator,
    },
  ]

  handleRollBack = params => {
    this.store.rollBack(params).then(() => {
      this.hideModal('rollBack')()

      const { namespace, name } = this.params
      const { module } = this.props
      this.routing.push(
        `/projects/${namespace}/${module}/${name}/revision-control`
      )
    })
  }

  renderExtraModals() {
    const { workloadDetail, detail, isSubmitting } = toJS(this.store)
    const { viewYaml, rollBack } = this.state

    return (
      <div>
        <EditYamlModal
          visible={viewYaml}
          detail={toJS(detail._originData)}
          onCancel={this.hideModal('viewYaml')}
          readOnly
        />
        <RollBackModal
          visible={rollBack}
          module={this.module}
          detail={workloadDetail}
          onOk={this.handleRollBack}
          onCancel={this.hideModal('rollBack')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(RevisionDetail))
export const Component = RevisionDetail
