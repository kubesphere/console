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
import { Icon } from '@pitrix/lego-ui'
import { set } from 'lodash'

import { Modal } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import S2iBuilderStore from 'stores/s2i/builder'

import FORM_STEPS from 'configs/steps/services'
import FORM_TEMPLATES from 'utils/form.templates'
import { getLanguageIcon } from 'utils/devops'
import { S2i_SUPPORTED_TYPES, B2I_SUPPORTED_TYPES } from 'utils/constants'

import styles from './index.scss'

const GROUPS = [
  {
    name: 'Service Type',
    description: 'SERVICE_TYPE',
    options: [
      {
        icon: 'backup',
        name: 'Stateless Service',
        value: 'statelessservice',
      },
      {
        icon: 'stateful-set',
        name: 'Stateful Service',
        value: 'statefulservice',
      },
      {
        icon: 'ip',
        name: 'External Service',
        value: 'externalservice',
      },
    ],
  },
  ...(globals.app.hasKSModule('devops')
    ? [
        {
          name: 'SERVICE_FROM_CODE',
          type: 's2i',
          description: 'SERVICE_FROM_CODE_DESC',
          options: S2i_SUPPORTED_TYPES,
        },
        {
          name: 'SERVICE_FROM_ARTIFACTS',
          type: 'b2i',
          description: 'SERVICE_FROM_ARTIFACTS_DESC',
          options: B2I_SUPPORTED_TYPES,
        },
      ]
    : []),
  {
    name: 'Custom Creation',
    description: 'SERVICE_CUSTOM_CREATE',
    options: [
      { icon: 'clock', name: 'Specify Workloads', value: 'simpleservice' },
      { icon: 'coding', name: 'Edit by YAML', value: 'yaml' },
    ],
  },
]

export default class ServiceCreateModal extends React.Component {
  constructor(props) {
    super(props)
    this.store = new S2iBuilderStore()
    this.state = {
      type: '',
      workloadModule: 'deployments',
      groups: GROUPS,
    }
  }

  componentDidMount() {
    globals.app.hasKSModule('devops') && this.fetchData()
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props
    if (!this.props.visible && visible !== prevProps.visible) {
      this.setState({ type: '', workloadModule: 'deployments' })
    }
  }

  fetchData = async () => {
    const supportS2iLanguage = await this.store.getS2iSupportLanguage()
    const groups = this.state.groups.map(group => {
      if (group.type === 'b2i') {
        group.options = supportS2iLanguage.b2i
      }
      if (group.type === 's2i') {
        group.options = supportS2iLanguage.s2i
      }
      return group
    })
    this.setState({ groups })
  }

  handleTypeSelect = e => {
    this.setState({
      type: e.currentTarget.dataset.value,
      s2iType: e.currentTarget.dataset.type,
    })
  }

  handleWorkloadModuleChange = workloadModule => {
    this.setState({ workloadModule })
  }

  renderHeader() {
    return (
      <div className={styles.header}>
        <div className="h4 margin-b12">{t('Create Service')}</div>
        <p>{t.html('SERVICE_CREATE_DESC')}</p>
        <img src="/assets/create-service.svg" alt="" />
      </div>
    )
  }

  renderGroups() {
    return (
      <div className={styles.groups}>
        {this.state.groups.map(group => (
          <div key={group.name} className={styles.group}>
            <div className={styles.title}>
              <div>{t(group.name)}</div>
              <p>{t(group.description)}</p>
            </div>
            <ul>
              {group.options.map(option => (
                <li
                  key={option.value || option}
                  data-value={option.value || option}
                  data-type={group.type}
                  onClick={this.handleTypeSelect}
                >
                  <div>
                    <Icon
                      name={option.icon || getLanguageIcon(option, 'radio')}
                      size={48}
                    />
                  </div>
                  <div>{t(option.name || option)}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  renderSubModal(type, s2iType) {
    const {
      store,
      workloadStore,
      visible,
      onOk,
      onCancel,
      namespace,
      isSubmitting,
    } = this.props

    if (s2iType) {
      const isS2i = s2iType === 's2i'
      const formTemplate = {
        S2i: FORM_TEMPLATES.s2ibuilders({
          namespace,
          isS2i,
          languageType: type,
        }),
        Deployment: FORM_TEMPLATES.deployments({ namespace }),
        Service: FORM_TEMPLATES.services({ namespace }),
      }
      const steps = isS2i ? FORM_STEPS.s2iservice : FORM_STEPS.b2iservice
      const description = `${
        isS2i ? t('Language Type') : t('Artifacts Type')
      } : ${t(type)}`
      return (
        <CreateModal
          icon={type}
          title={isS2i ? t('SERVICE_FROM_CODE') : t('SERVICE_FROM_ARTIFACTS')}
          description={description}
          width={960}
          module={this.state.workloadModule}
          store={workloadStore}
          name={t('Stateless Service')}
          visible={visible}
          steps={steps}
          formTemplate={formTemplate}
          isSubmitting={isSubmitting}
          updateModule={this.handleWorkloadModuleChange}
          onOk={onOk}
          onCancel={onCancel}
          noCodeEdit
        />
      )
    }

    let content

    switch (type) {
      case 'statelessservice': {
        const module = 'deployments'
        const formTemplate = {
          Deployment: FORM_TEMPLATES.deployments({ namespace }),
          Service: FORM_TEMPLATES.services({ namespace }),
        }

        set(
          formTemplate,
          'Service.metadata.annotations["kubesphere.io/serviceType"]',
          type
        )

        workloadStore.setModule(module)

        content = (
          <CreateModal
            width={960}
            module={module}
            store={workloadStore}
            name={t('Stateless Service')}
            description={t('STATELESS_SERVICE_DESC')}
            visible={visible}
            steps={FORM_STEPS[type]}
            formTemplate={formTemplate}
            isSubmitting={isSubmitting}
            onOk={onOk}
            onCancel={onCancel}
          />
        )
        break
      }
      case 'statefulservice': {
        const module = 'statefulsets'
        const formTemplate = {
          StatefulSet: FORM_TEMPLATES.statefulsets({ namespace }),
          Service: FORM_TEMPLATES.services({ namespace }),
        }

        set(
          formTemplate,
          'Service.metadata.annotations["kubesphere.io/serviceType"]',
          type
        )

        workloadStore.setModule(module)

        content = (
          <CreateModal
            width={960}
            module={module}
            store={workloadStore}
            name={t('Stateful Service')}
            description={t('STATEFUL_SERVICE_DESC')}
            visible={visible}
            steps={FORM_STEPS[type]}
            formTemplate={formTemplate}
            isSubmitting={isSubmitting}
            onOk={onOk}
            onCancel={onCancel}
          />
        )
        break
      }
      case 'simpleservice':
      case 'externalservice': {
        const module = 'services'
        const formTemplate = { Service: FORM_TEMPLATES.services({ namespace }) }

        const title =
          type === 'externalservice'
            ? `${t('Create ')}${t('External Service')}`
            : t('Create service by specify workloads')

        const description =
          type === 'externalservice'
            ? t('SERVICE_EXTERNAL_NAME_DESC')
            : t('SERVISE_SIMPLE_DESC')

        if (type === 'externalservice') {
          set(
            formTemplate,
            'Service.metadata.annotations["kubesphere.io/serviceType"]',
            type
          )
        }

        content = (
          <CreateModal
            width={960}
            module={module}
            store={store}
            title={title}
            description={description}
            visible={visible}
            steps={FORM_STEPS[type]}
            formTemplate={formTemplate}
            isSubmitting={isSubmitting}
            onOk={onOk}
            onCancel={onCancel}
          />
        )
        break
      }
      case 'yaml': {
        const module = 'services'
        const formTemplate = { Service: FORM_TEMPLATES.services({ namespace }) }

        const title = t('Create service by yaml')

        content = (
          <CreateModal
            width={960}
            module={module}
            store={store}
            title={title}
            visible={visible}
            formTemplate={formTemplate}
            isSubmitting={isSubmitting}
            onOk={onOk}
            onCancel={onCancel}
            onlyCode
          />
        )
        break
      }
      default:
    }

    return content
  }

  render() {
    const { visible, onCancel } = this.props
    const { type, s2iType } = this.state

    if (type) {
      return this.renderSubModal(type, s2iType)
    }

    return (
      <Modal
        bodyClassName={styles.body}
        width={960}
        visible={visible}
        onCancel={onCancel}
        hideHeader
        hideFooter
      >
        {this.renderHeader()}
        {this.renderGroups()}
      </Modal>
    )
  }
}
