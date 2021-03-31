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
import { set, pick, isEmpty } from 'lodash'

import { Modal } from 'components/Base'
import CreateModal from 'components/Modals/Create'
import ClusterDiffSettings from 'components/Forms/Workload/ClusterDiffSettings'

import WorkloadStore from 'stores/workload'

import FORM_STEPS from 'configs/steps/services'
import { withProps } from 'utils'
import FORM_TEMPLATES from 'utils/form.templates'

import styles from './index.scss'

export default class ServiceCreateModal extends React.Component {
  constructor(props) {
    super(props)
    this.workloadStore = new WorkloadStore()
    this.state = {
      type: '',
      workloadModule: 'deployments',
      groups: [
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
          ],
        },
      ],
    }
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props
    if (visible !== prevProps.visible) {
      if (!this.props.visible) {
        this.setState({ type: '', workloadModule: 'deployments' })
      } else {
        const detail = this.props.detail || {}
        let type = ''
        let workloadModule = 'deployments'
        if (detail.StatefulSet) {
          type = 'statefulservice'
          workloadModule = 'statefulsets'
        } else if (detail.Deployment) {
          type = 'statelessservice'
        }
        this.setState({ type, workloadModule })
      }
    }
  }

  handleTypeSelect = e => {
    this.setState({ type: e.currentTarget.dataset.value })
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
              {group.options &&
                group.options.map(option => (
                  <li
                    key={option.value || option}
                    data-value={option.value || option}
                    data-type={group.type}
                    onClick={this.handleTypeSelect}
                  >
                    <div>
                      <Icon name={option.icon} size={48} />
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

  renderSubModal(type) {
    const {
      visible,
      onOk,
      onCancel,
      cluster,
      namespace,
      detail,
      isFederated,
      projectDetail,
      isSubmitting,
    } = this.props

    let content

    switch (type) {
      case 'statelessservice': {
        const module = 'deployments'
        const formTemplate = !isEmpty(detail)
          ? pick(detail, ['Deployment', 'Service'])
          : {
              Deployment: FORM_TEMPLATES.deployments({ namespace }),
              Service: FORM_TEMPLATES.services({ namespace }),
            }

        const steps = [...FORM_STEPS[type]]

        steps[0] = {
          ...steps[0],
          component: withProps(steps[0].component, { noApp: true }),
        }

        if (isEmpty(detail) && isFederated) {
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

        if (isFederated) {
          steps.push({
            title: 'Diff Settings',
            icon: 'blue-green-deployment',
            component: withProps(ClusterDiffSettings, { withService: true }),
          })
        }

        content = (
          <CreateModal
            width={960}
            module={module}
            store={this.workloadStore}
            name={t('Stateless Service')}
            description={t('STATELESS_SERVICE_DESC')}
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
            maskClosable={false}
            okBtnText={!isEmpty(detail) ? t('Update') : t('Add')}
          />
        )
        break
      }
      case 'statefulservice': {
        const module = 'statefulsets'
        const formTemplate = !isEmpty(detail)
          ? pick(detail, ['StatefulSet', 'Service'])
          : {
              StatefulSet: FORM_TEMPLATES.statefulsets({ namespace }),
              Service: FORM_TEMPLATES.services({ namespace }),
            }
        const steps = [...FORM_STEPS[type]]

        steps[0] = {
          ...steps[0],
          component: withProps(steps[0].component, { noApp: true }),
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

        if (isFederated) {
          steps.push({
            title: 'Diff Settings',
            icon: 'blue-green-deployment',
            component: withProps(ClusterDiffSettings, { withService: true }),
          })
        }

        content = (
          <CreateModal
            width={960}
            module={module}
            store={this.workloadStore}
            name={t('Stateful Service')}
            description={t('STATEFUL_SERVICE_DESC')}
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
            okBtnText={!isEmpty(detail) ? t('Update') : t('Add')}
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
    const { type } = this.state

    if (type) {
      return this.renderSubModal(type)
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
