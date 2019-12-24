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

import RouterStore from 'stores/router'

import Base from 'core/containers/Base/Detail'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditYamlModal from 'components/Modals/EditYaml'
import EditRouteAnnotationsModal from 'projects/components/Modals/RouteAnnotationsEdit'
import EditRouteRulesModal from 'projects/components/Modals/RouteRulesEdit'

class RouteDetail extends Base {
  get name() {
    return 'Route'
  }

  get authKey() {
    return 'routes'
  }

  get listUrl() {
    return `/projects/${this.namespace}/routes`
  }

  init() {
    this.store = new RouterStore()
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
      key: 'editYaml',
      icon: 'pen',
      text: t('Edit YAML'),
      action: 'edit',
      onClick: this.showModal('editYaml'),
    },
    {
      key: 'editRules',
      icon: 'firewall',
      text: t('Edit Rules'),
      action: 'edit',
      onClick: this.showModal('editRules'),
    },
    {
      key: 'editAnnotations',
      icon: 'firewall',
      text: t('Edit Annotations'),
      action: 'edit',
      onClick: this.showModal('editAnnotations'),
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

    const { loadBalancerIngress = [] } = detail

    let ips = []
    loadBalancerIngress.forEach(item => {
      item.ip && ips.push(item.ip)
    })
    ips = ips.map((ip, index) => <p key={index}>{ip}</p>)

    return [
      {
        name: t('Project'),
        value: detail.namespace,
      },
      {
        name: t('Application'),
        value: this.application,
      },
      {
        name: t('Gateway Address'),
        value: ips,
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

  renderExtraModals() {
    const detail = toJS(this.store.detail)
    const isSubmitting = this.store.isSubmitting
    const { editBaseInfo, editYaml, editRules, editAnnotations } = this.state

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
        <EditRouteAnnotationsModal
          visible={editAnnotations}
          detail={originData}
          onOk={this.handleEdit('editAnnotations', 'update')}
          onCancel={this.hideModal('editAnnotations')}
          isSubmitting={isSubmitting}
        />
        <EditRouteRulesModal
          visible={editRules}
          detail={originData}
          onOk={this.handleEdit('editRules', 'update')}
          onCancel={this.hideModal('editRules')}
          isSubmitting={isSubmitting}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(RouteDetail))
export const Component = RouteDetail
