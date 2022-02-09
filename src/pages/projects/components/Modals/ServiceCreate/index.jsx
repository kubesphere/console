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
import { Icon } from '@kube-design/components'
import { set } from 'lodash'

import { Modal } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import ClusterDiffSettings from 'components/Forms/Workload/ClusterDiffSettings'

import S2iBuilderStore from 'stores/s2i/builder'
import WorkloadStore from 'stores/workload'
import FederatedStore from 'stores/federated'

import FORM_STEPS from 'configs/steps/services'
import { withProps } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'
import { getLanguageIcon } from 'utils/devops'
import { S2I_SUPPORTED_TYPES, B2I_SUPPORTED_TYPES } from 'utils/constants'

import styles from './index.scss'

export default class ServiceCreateModal extends React.Component {
  constructor(props) {
    super(props)
    this.s2iStore = new S2iBuilderStore()
    this.workloadStore = new WorkloadStore()

    this.showDevOps =
      globals.app.hasClusterModule(props.cluster, 'devops') &&
      !this.props.isFederated

    this.state = {
      type: '',
      workloadModule: 'deployments',
      groups: [
        {
          name: 'SELECT_SERVICE_TYPE',
          description: 'SELECT_SERVICE_TYPE_DESC',
          options: [
            {
              icon: 'backup',
              name: 'STATELESS_SERVICE',
              value: 'statelessservice',
            },
            {
              icon: 'stateful-set',
              name: 'STATEFUL_SERVICE',
              value: 'statefulservice',
            },
            ...(this.props.isFederated
              ? []
              : [
                  {
                    icon: 'ip',
                    name: 'EXTERNAL_SERVICE',
                    value: 'externalservice',
                  },
                ]),
          ],
        },
        ...(this.showDevOps
          ? [
              {
                name: 'SERVICE_FROM_CODE',
                type: 's2i',
                description: 'SERVICE_FROM_CODE_DESC',
                options: S2I_SUPPORTED_TYPES,
              },
              {
                name: 'SERVICE_FROM_ARTIFACT',
                type: 'b2i',
                description: 'SERVICE_FROM_ARTIFACT_DESC',
                options: B2I_SUPPORTED_TYPES,
              },
            ]
          : []),
        ...(this.props.isFederated
          ? []
          : [
              {
                name: 'CUSTOMIZE_SERVICE',
                description: 'CUSTOMIZE_SERVICE_DESC',
                options: [
                  {
                    icon: 'clock',
                    name: 'SPECIFY_WORKLOAD',
                    value: 'simpleservice',
                  },
                  { icon: 'coding', name: 'EDIT_YAML', value: 'yaml' },
                ],
              },
            ]),
      ],
    }
  }

  componentDidMount() {
    this.showDevOps && this.fetchData()
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props
    if (!this.props.visible && visible !== prevProps.visible) {
      this.setState({ type: '', workloadModule: 'deployments' })
    }
  }

  fetchData = async () => {
    const { cluster } = this.props
    const supportS2iLanguage = await this.s2iStore.getS2iSupportLanguage({
      cluster,
    })
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
        <div className="h4 margin-b12">{t('CREATE_SERVICE')}</div>
        <p>{t('CREATE_SERVICE_DESC')}</p>
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
              {group.options &&
                group.options.map(option => (
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
                    <div>{t(option.name || option.toUpperCase())}</div>
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
      visible,
      onOk,
      onCancel,
      cluster,
      namespace,
      isFederated,
      projectDetail,
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
      const description = isS2i
        ? t('LANGUAGE_TYPE_VALUE', { value: t(type.toUpperCase()) })
        : t('ARTIFACT_TYPE_VALUE', { value: t(type.toUpperCase()) })

      this.workloadStore.setModule('deployments')

      return (
        <CreateModal
          icon={type}
          title={isS2i ? t('SERVICE_FROM_CODE') : t('SERVICE_FROM_ARTIFACT')}
          description={description}
          width={960}
          module={this.state.workloadModule}
          store={this.workloadStore}
          name={t('STATELESS_SERVICE')}
          visible={visible}
          steps={steps}
          cluster={cluster}
          namespace={namespace}
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

        if (isFederated) {
          Object.keys(formTemplate).forEach(key => {
            formTemplate[key] = FORM_TEMPLATES.federated({
              data: formTemplate[key],
              clusters: projectDetail.clusters.map(item => item.name),
              kind: key,
            })
          })
        }

        set(
          formTemplate,
          'Service.metadata.annotations["kubesphere.io/serviceType"]',
          type
        )

        this.workloadStore.setModule(module)

        let workloadStore = this.workloadStore

        const steps = [...FORM_STEPS[type]]
        if (isFederated) {
          steps.push({
            title: 'CLUSTER_DIFF',
            icon: 'blue-green-deployment',
            component: withProps(ClusterDiffSettings, { withService: true }),
          })
          workloadStore = new FederatedStore(this.workloadStore)
        }

        content = (
          <CreateModal
            width={960}
            module={module}
            store={workloadStore}
            name={t('STATELESS_SERVICE')}
            visible={visible}
            cluster={cluster}
            namespace={namespace}
            isFederated={isFederated}
            projectDetail={projectDetail}
            steps={steps}
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

        if (isFederated) {
          Object.keys(formTemplate).forEach(key => {
            formTemplate[key] = FORM_TEMPLATES.federated({
              data: formTemplate[key],
              clusters: projectDetail.clusters.map(item => item.name),
              kind: key,
            })
          })
        }

        set(
          formTemplate,
          'Service.metadata.annotations["kubesphere.io/serviceType"]',
          type
        )

        this.workloadStore.setModule(module)

        let workloadStore = this.workloadStore

        const steps = [...FORM_STEPS[type]]
        if (isFederated) {
          steps.push({
            title: 'CLUSTER_DIFF',
            icon: 'blue-green-deployment',
            component: withProps(ClusterDiffSettings, { withService: true }),
          })
          workloadStore = new FederatedStore(this.workloadStore)
        }

        content = (
          <CreateModal
            width={960}
            module={module}
            store={workloadStore}
            name={t('STATEFUL_SERVICE')}
            visible={visible}
            cluster={cluster}
            namespace={namespace}
            isFederated={isFederated}
            projectDetail={projectDetail}
            steps={steps}
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

        if (isFederated) {
          Object.keys(formTemplate).forEach(key => {
            formTemplate[key] = FORM_TEMPLATES.federated({
              data: formTemplate[key],
              clusters: projectDetail.clusters.map(item => item.name),
              kind: key,
            })
          })
        }

        const title =
          type === 'externalservice'
            ? t('CREATE_EXTERNAL_SERVICE')
            : t('SPECIFY_WORKLOAD_TO_CREATE_SERVICE')

        const description =
          type === 'externalservice'
            ? t('CREATE_EXTERNAL_SERVICE_DESC')
            : t('SPECIFY_WORKLOAD_DESC')

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
            cluster={cluster}
            namespace={namespace}
            isFederated={isFederated}
            projectDetail={projectDetail}
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

        if (isFederated) {
          Object.keys(formTemplate).forEach(key => {
            formTemplate[key] = FORM_TEMPLATES.federated({
              data: formTemplate[key],
              clusters: projectDetail.clusters.map(item => item.name),
              kind: key,
            })
          })
        }

        const title = t('EDIT_YAML_TO_CREATE_SERVICE')

        content = (
          <CreateModal
            width={960}
            module={module}
            store={store}
            title={title}
            visible={visible}
            cluster={cluster}
            namespace={namespace}
            isFederated={isFederated}
            projectDetail={projectDetail}
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
      >
        {this.renderHeader()}
        {this.renderGroups()}
      </Modal>
    )
  }
}
