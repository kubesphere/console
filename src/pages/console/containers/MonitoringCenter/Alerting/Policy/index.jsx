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

import { Icon, Tooltip } from '@pitrix/lego-ui'

import { getDisplayName, getLocalTime } from 'utils'
import { getMonitoringRuleInfo } from 'utils/alerting'
import FORM_TEMPLATES from 'utils/form.templates'
import formPersist from 'utils/form.persist'
import PolicyStore from 'stores/alerting/policy'

import { Avatar, Button, Notify } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'
import Banner from 'components/Cards/Banner'
import Base from 'core/containers/Base/List'
import CreateModal from 'components/Modals/Create'

import FORM_STEPS from 'configs/steps/alerting.policy'

class AlertingPolicy extends Base {
  init() {
    this.store = new PolicyStore(this.level)
  }

  get level() {
    return this.namespace ? 'workload' : 'node'
  }

  get module() {
    return 'alerting-policy'
  }

  get params() {
    return this.props.match.params
  }

  get namespace() {
    return this.params.namespace
  }

  get steps() {
    return FORM_STEPS
  }

  get enabledActions() {
    return globals.app.getActions({ module: 'alerting' })
  }

  get name() {
    return 'alerting policy'
  }

  get title() {
    return 'policies'
  }

  get tips() {
    return [
      {
        title: t('REQUESTS_FOR_PUSH_AN_ALARM_Q'),
        description: t('REQUESTS_FOR_PUSH_AN_ALARM_A'),
      },
      {
        title: t('HOW_TO_SUPRESS_AN_ALARM_Q'),
        description: t('HOW_TO_SUPRESS_AN_ALARM_A'),
      },
    ]
  }

  get formTemplate() {
    const tplFn = FORM_TEMPLATES[this.module]

    if (!tplFn) {
      return {}
    }

    return {
      AlertingPolicy: tplFn(this.params),
    }
  }

  get itemActions() {
    return [
      {
        key: 'delete',
        icon: 'trash',
        text: t('Delete'),
        action: 'delete',
        onClick: this.showModal('deleteModal'),
      },
    ]
  }

  get enabledItemActions() {
    return this.itemActions.filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )
  }

  getTableProps() {
    return {
      ...Base.prototype.getTableProps.call(this),
      searchType: 'keyword',
    }
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      search: true,
      render: (name, record) => (
        <Avatar
          icon="wrench"
          title={getDisplayName(record)}
          desc={record.desc}
          to={`${this.props.match.url}/${name}`}
        />
      ),
    },
    {
      title: t('Monitoring Rules'),
      dataIndex: 'metrics',
      isHideable: true,
      width: '24%',
      render: metrics => {
        const monitorRule = getMonitoringRuleInfo(metrics)
        return (
          <div>
            {Object.entries(monitorRule).map(([key, value]) => (
              <Tooltip
                key={key}
                content={
                  <div>
                    {value.map(item => (
                      <p key={item}>{t(item)}</p>
                    ))}
                  </div>
                }
              >
                <Icon name={key} size={24} />
              </Tooltip>
            ))}
          </div>
        )
      },
    },
    {
      title: t('Recent alert time'),
      dataIndex: 'recentAlertTime',
      isHideable: true,
      width: '24%',
      render: time =>
        time ? getLocalTime(time).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      key: 'more',
      width: 100,
      render: this.renderMore,
    },
  ]

  handleCreate = newObject => {
    const data = {
      namespace: this.namespace,
      ...newObject,
    }

    this.store.create(data).then(() => {
      this.hideModal('createModal')()
      Notify.success({ content: `${t('Created Successfully')}!` })
      this.routing.query({}, true)
      formPersist.delete(`${this.module}_create_form`)
    })
  }

  handleDelete = () => {
    const { name } = this.state.selectItem
    const data = {
      name,
      namespace: this.namespace,
    }

    this.store.delete(data).then(() => {
      this.hideModal('deleteModal')()
      Notify.success({ content: `${t('Deleted Successfully')}!` })
      this.routing.query()
    })
  }

  renderHeader() {
    return (
      <Banner
        icon="wrench"
        className="margin-b12"
        title={t('Alerting Policy')}
        description={t('ALERT_POLICY_DESC')}
        module={this.module}
        tips={this.tips}
      />
    )
  }

  renderEmpty() {
    const actions = this.enabledActions.includes('create') ? (
      <Button type="control" onClick={this.showModal('createModal')}>
        {t('Add Policy')}
      </Button>
    ) : null

    return (
      <EmptyList
        icon="hammer"
        title={t('ALERT_POLICY_SETTING_TITLE')}
        desc={t('ALERT_POLICY_SETTING_DESC')}
        actions={actions}
      />
    )
  }

  renderExtraModals() {
    const { createModal } = this.state

    return (
      <div>
        <CreateModal
          name={this.name}
          module={this.module}
          title={`${t('Add ')}${t(this.name)}`}
          store={this.store}
          steps={this.steps}
          visible={createModal}
          formTemplate={this.formTemplate}
          onOk={this.handleCreate}
          onCancel={this.hideModal('createModal')}
          isSubmitting={this.store.isSubmitting}
          noCodeEdit={true}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(AlertingPolicy))
export const Component = AlertingPolicy
