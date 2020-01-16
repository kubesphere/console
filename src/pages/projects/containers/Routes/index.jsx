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
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { Icon } from '@pitrix/lego-ui'
import { getLocalTime, getDisplayName, getDocsUrl } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { getFormTemplate } from 'utils/form.templates'
import { Text, Panel, Button, Avatar, Notify } from 'components/Base'
import Base from 'core/containers/Base/List'
import CreateModal from 'components/Modals/Create'
import EditYamlModal from 'components/Modals/EditYaml'
import EditBasicInfoModal from 'components/Modals/EditBasicInfo'
import EditRouteAnnotationsModal from 'projects/components/Modals/RouteAnnotationsEdit'
import EditRouteRulesModal from 'projects/components/Modals/RouteRulesEdit'
import GatewaySettingModal from 'projects/components/Modals/GatewaySetting'

import RouterStore from 'stores/router'

import FORM_STEPS from 'configs/steps/ingresses'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class Routes extends Base {
  init() {
    this.store = new RouterStore(this.module)

    this.store.getGateway(this.props.match.params)

    this.initWebsocket()
  }

  get module() {
    return 'ingresses'
  }

  get authKey() {
    return 'routes'
  }

  get name() {
    return 'Route'
  }

  get steps() {
    return FORM_STEPS
  }

  get formTemplate() {
    const { namespace } = this.props.match.params
    return getFormTemplate(namespace, this.module)
  }

  get canSetGateway() {
    return globals.app.hasPermission({
      module: 'advanced',
      action: 'manage',
      project: this.props.match.params.namespace,
    })
  }

  get tips() {
    return [
      {
        title: t('PREREQUESTS_FOR_USE_ROUTE_Q'),
        description: t('PREREQUESTS_FOR_USE_ROUTE_A'),
        more: getDocsUrl('internet'),
      },
      {
        title: t('ACCESS_TYPES_OF_ROUTE_Q'),
        description: t('ACCESS_TYPES_OF_ROUTE_A'),
      },
    ]
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
        key: 'editYaml',
        icon: 'pen',
        text: t('Edit YAML'),
        action: 'edit',
        onClick: this.showModal('editYamlModal'),
      },
      {
        key: 'editRules',
        icon: 'firewall',
        text: t('Edit Rules'),
        action: 'edit',
        onClick: this.showModal('editRulesModal'),
      },
      {
        key: 'editAnnotations',
        icon: 'firewall',
        text: t('Edit Annotations'),
        action: 'edit',
        onClick: this.showModal('editAnnotationsModal'),
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
          desc={record.description || '-'}
          to={`${this.prefix}/${name}`}
        />
      ),
    },
    {
      title: t('Gateway Address'),
      dataIndex: 'loadBalancerIngress[0].ip',
      isHideable: true,
      width: '22%',
    },
    {
      title: t('Application'),
      dataIndex: 'app',
      isHideable: true,
      search: true,
      width: '22%',
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      sorter: true,
      sortOrder: this.getSortOrder('createTime'),
      isHideable: true,
      width: 150,
      render: time => getLocalTime(time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: 'more',
      width: 20,
      render: this.renderMore,
    },
  ]

  getEmptyProps() {
    const { data, isLoading } = this.store.gateway

    if (isEmpty(data) && !isLoading) {
      return { onCreate: null }
    }

    return {}
  }

  handleEditAnnotations = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editAnnotationsModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  handleYamlEdit = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editYamlModal')()
    })
  }

  handleEditRules = newObject => {
    const { selectItem } = this.state

    this.store.update(selectItem, newObject).then(() => {
      this.hideModal('editRulesModal')()
      Notify.success({ content: `${t('Updated Successfully')}!` })
      this.routing.query()
    })
  }

  handleGatewaySetting = data => {
    const { namespace } = this.props.match.params

    this.store.addGateway({ namespace }, data).then(() => {
      this.hideModal('addGateway')()
      this.store.getGateway({ namespace })
    })
  }

  renderExtraModals() {
    const {
      createModal,
      editModal,
      editYamlModal,
      editAnnotationsModal,
      editRulesModal,
      addGateway,
      selectItem = {},
    } = this.state

    const { isSubmitting } = this.store

    return (
      <div>
        <EditRouteAnnotationsModal
          visible={editAnnotationsModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEditAnnotations}
          onCancel={this.hideModal('editAnnotationsModal')}
        />
        <EditRouteRulesModal
          visible={editRulesModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleEditRules}
          onCancel={this.hideModal('editRulesModal')}
        />
        <GatewaySettingModal
          detail={toJS(this.store.gateway.data)}
          visible={addGateway}
          onOk={this.handleGatewaySetting}
          onCancel={this.hideModal('addGateway')}
          isSubmitting={isSubmitting}
        />
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
        <EditYamlModal
          store={this.store}
          visible={editYamlModal}
          detail={selectItem._originData}
          isSubmitting={isSubmitting}
          onOk={this.handleYamlEdit}
          onCancel={this.hideModal('editYamlModal')}
        />
      </div>
    )
  }

  renderHeader() {
    const { data, isLoading } = this.store.gateway

    return (
      <>
        {Base.prototype.renderHeader.call(this)}
        {isEmpty(data) && !isLoading && this.renderCreateGateway()}
      </>
    )
  }

  renderCreateGateway() {
    return (
      <Panel className="margin-t12 margin-b12">
        <div className="flexbox">
          <Icon className="margin-r12" name="loadbalancer" size={40} />
          <Text
            className={styles.text}
            title={t('Gateway not set')}
            description={t('PROJECT_INTERNET_ACCESS_DESC')}
          />
          {this.canSetGateway && (
            <Button
              className={styles.button}
              type="control"
              onClick={this.showModal('addGateway')}
            >
              {t('Set Gateway')}
            </Button>
          )}
        </div>
      </Panel>
    )
  }
}
