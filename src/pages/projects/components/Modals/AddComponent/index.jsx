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

import { get, set, isEmpty, isFunction } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import ConfigMapStore from 'stores/configmap'
import SecretStore from 'stores/secret'
import ProjectStore from 'stores/project'
import { mergeLabels } from 'utils'

import { Modal, Notify } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import ComponentForm from './ComponentForm'

import styles from './index.scss'

export default class AddComponentModal extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      subRoute: {},
    }

    this.configMapStore = new ConfigMapStore()
    this.secretStore = new SecretStore()
    this.projectStore = new ProjectStore()

    this.formRef = React.createRef()
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    const { namespace } = this.props

    Promise.all([
      this.configMapStore.fetchByK8s({ namespace }),
      this.secretStore.fetchByK8s({ namespace }),
      this.secretStore.fetchByK8s({
        namespace,
        fieldSelector: `type=kubernetes.io/dockerconfigjson`,
      }),
      this.projectStore.fetchLimitRanges({ namespace }),
    ]).then(([configMaps, secrets, imageRegistries, limitRanges]) => {
      this.setState({
        configMaps,
        secrets,
        imageRegistries,
        limitRange: get(limitRanges, '[0].limit'),
      })
    })
  }

  handleSubFormSave = () => {
    const { subRoute } = this.state
    if (subRoute && isFunction(subRoute.onSave)) {
      subRoute.onSave()
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state
    if (subRoute && isFunction(subRoute.onCancel)) {
      subRoute.onCancel()
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({ subRoute: { onSave, onCancel } })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  hasSubRoute = () => !isEmpty(this.state.subRoute)

  updateAppLabels(formData, appLabels) {
    mergeLabels(formData.workload, appLabels)
    mergeLabels(formData.service, appLabels)
  }

  updateGovernance(formData, isGovernance) {
    set(
      formData.workload,
      'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
      String(isGovernance)
    )
    set(
      formData.service,
      'metadata.annotations["servicemesh.kubesphere.io/enabled"]',
      String(isGovernance)
    )

    set(
      formData.workload,
      'spec.template.metadata.annotations["sidecar.istio.io/inject"]',
      String(isGovernance)
    )
  }

  handleSubmit = () => {
    const { detail, onOk } = this.props

    if (this.hasSubRoute()) {
      return Notify.warning(t('Please save the current form first'))
    }

    const form = this.formRef.current

    form &&
      form.validate(() => {
        const data = form.getData()
        this.updateAppLabels(data, detail.labels)
        this.updateGovernance(data, detail.serviceMeshEnable)

        const containers = get(
          data,
          'workload.spec.template.spec.containers',
          []
        )

        // auto gen service ports by workload container ports
        const servicePorts = []
        containers.forEach(container => {
          if (container.ports) {
            container.ports.forEach(port => {
              if (port.servicePort) {
                servicePorts.push({
                  name: port.name,
                  protocol: port.protocol,
                  port: port.servicePort,
                  targetPort: port.containerPort,
                })
              }
            })
          }
        })
        set(data, 'service.spec.ports', servicePorts)

        onOk(data)
      })
  }

  renderFooter() {
    const { subRoute } = this.state

    if (isEmpty(subRoute)) {
      return null
    }

    return (
      <div className={styles.footer}>
        <Confirm
          onOk={this.handleSubFormSave}
          onCancel={this.handleSubFormCancel}
        />
      </div>
    )
  }

  render() {
    const { detail, namespace, visible, isSubmitting, onCancel } = this.props

    const { limitRange, configMaps, secrets, imageRegistries } = this.state

    return (
      <Modal
        title={t('Add Component')}
        bodyClassName={styles.body}
        width={873}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      >
        <ComponentForm
          formRef={this.formRef}
          appName={get(detail, "labels['app.kubernetes.io/name']")}
          namespace={namespace}
          limitRange={limitRange}
          configMaps={configMaps}
          secrets={secrets}
          imageRegistries={imageRegistries}
          isGovernance={detail.serviceMeshEnable}
        />
        {this.renderFooter()}
      </Modal>
    )
  }
}
