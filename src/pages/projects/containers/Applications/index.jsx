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
import { when } from 'mobx'

import { get } from 'lodash'

import OpAppStore from 'stores/openpitrix/application'
import CRDAppStore from 'stores/application/crd'

import { Button } from 'components/Base'
import Banner from 'components/Cards/Banner'
import DeployAppModal from 'projects/components/Modals/DeployApp'
import ServiceDeployAppModal from 'projects/components/Modals/CreateApp'
import RepoAppModal from 'projects/components/Modals/RepoApp'

import OPApps from './OPApps'
import CRDApps from './CRDApps'

@inject('rootStore', 'projectStore')
@observer
export default class Applications extends React.Component {
  constructor(props) {
    super(props)

    this.opAppStore = new OpAppStore()
    this.crdAppStore = new CRDAppStore()

    this.projectStore = this.props.projectStore

    this.state = {
      showDeployApp: false,
      appType: this.props.match.params.type || this.defaultAppType,
    }

    this.disposer = when(
      () => this.projectStore.detail.name === this.namespace,
      this.initialFetch.bind(this)
    )
  }

  componentDidUpdate(prevProps) {
    const { type } = this.props.match.params
    if (type && type !== prevProps.match.params.type) {
      this.setState({ appType: type || this.defaultAppType })
    }
  }

  componentDidMount() {
    const savedType = localStorage.getItem('defaultAppType')
    if (savedType !== this.state.appType) {
      localStorage.setItem('defaultAppType', this.state.appType)
    }
  }

  componentWillUnmount() {
    this.disposer && this.disposer()
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get namespace() {
    return this.props.match.params.namespace
  }

  get workspace() {
    return get(this.projectStore, 'detail.workspace')
  }

  get routing() {
    return this.props.rootStore.routing
  }

  initialFetch() {
    const project = this.projectStore.detail

    const runtime_id = get(project, 'annotations.openpitrix_runtime')
    globals.app.enableAppStore &&
      this.opAppStore.fetchList({ namespace: project.name, runtime_id })
    this.crdAppStore.fetchList({ namespace: project.name })

    this.disposer && this.disposer()
  }

  get defaultAppType() {
    const savedType = localStorage.getItem('defaultAppType')

    let type

    if (['template', 'composing'].indexOf(savedType) !== -1) {
      type = savedType
    } else {
      type = globals.app.enableAppStore ? 'template' : 'composing'
      localStorage.setItem('defaultAppType', type)
    }

    return type
  }

  get canDeployTemplateApp() {
    return (
      globals.app.enableAppStore &&
      globals.app.hasPermission({
        module: 'applications',
        project: this.namespace,
        action: 'create',
      })
    )
  }

  get canDeployComposingApp() {
    const { namespace: project } = this.props.match.params

    const canCreateDeployment = globals.app
      .getActions({
        module: 'deployments',
        project,
      })
      .includes('create')

    const canCreateService = globals.app
      .getActions({
        module: 'services',
        project,
      })
      .includes('create')

    return canCreateDeployment && canCreateService
  }

  get tabs() {
    return {
      value: this.state.appType,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'template',
          label: t('App Templates'),
          count: this.opAppStore.list.total || 0,
        },
        {
          value: 'composing',
          label: t('Composing App'),
          count: this.crdAppStore.list.total || 0,
        },
      ],
    }
  }

  get tips() {
    return [
      {
        title: t('Application Type'),
        description: t('APPLICATION_TYPE_DESC'),
      },
      {
        title: t('HOW_TO_USE_APPLICATION_GOVE_Q'),
        description: t('HOW_TO_USE_APPLICATION_GOVE_A'),
        operation: this.canDeployComposingApp ? (
          <Button onClick={this.showDeploySampleApp}>
            {t('Deploy Sample Application')}
          </Button>
        ) : null,
        closable: false,
      },
    ]
  }

  handleTabChange = value => {
    const { cluster, namespace } = this.props.match.params
    this.routing.push(
      `/cl/${cluster}/projects/${namespace}/applications/${value}`
    )
  }

  showDeploySampleApp = () => {
    this.setState({
      showServiceDeployApp: true,
      showDeployApp: false,
      sampleApp: 'bookinfo',
    })
  }

  showDeployAppModal = () => {
    if (!this.canDeployTemplateApp) {
      this.setState({ showServiceDeployApp: true })
    } else {
      this.setState({ showDeployApp: true })
    }
  }

  hideDeployAppModal = () => {
    this.setState({ showDeployApp: false })
  }

  handleDeployApp = type => {
    const { namespace } = this.props.match.params

    switch (type) {
      case 'service-form':
        return this.setState({
          showServiceDeployApp: true,
          showDeployApp: false,
        })
      case 'sample-service-form':
        return this.setState({
          showServiceDeployApp: true,
          showDeployApp: false,
          sampleApp: 'bookinfo',
        })
      case 'app-repo':
        return this.setState({
          showAppRepo: true,
          showDeployApp: false,
        })
      case 'app-template':
        return this.routing.push(
          `/apps?workspace=${this.workspace}&namespace=${namespace}`
        )
      default:
    }
  }

  hideServiceDeployAppModal = () => {
    this.setState({ showServiceDeployApp: false, sampleApp: '' })
  }

  handleServiceDeployApp = data => {
    const { namespace } = this.props.match.params
    this.crdAppStore.create(data).then(() => {
      this.hideServiceDeployAppModal()
      this.routing.push(
        `/projects/${namespace}/applications/composing/${get(
          data,
          'application.metadata.name'
        )}`
      )
    })
  }

  hideRepoAppModal = () => {
    this.setState({ showAppRepo: false })
  }

  handleDeployRepoApp = () => {
    const { namespace } = this.props.match.params
    this.hideRepoAppModal()
    this.routing.push(`/projects/${namespace}/applications/template`)
  }

  renderHeader() {
    return (
      <Banner
        className="margin-b12"
        title={t('Applications')}
        description={t('APPLICATIONS_DESC')}
        module={'applications'}
        tips={this.tips}
        tabs={!globals.app.enableAppStore ? undefined : this.tabs}
      />
    )
  }

  renderModals() {
    const { showServiceDeployApp, showAppRepo, sampleApp } = this.state

    return (
      <>
        {this.canDeployTemplateApp && this.canDeployComposingApp && (
          <DeployAppModal
            visible={this.state.showDeployApp}
            onOk={this.handleDeployApp}
            onCancel={this.hideDeployAppModal}
            canDeployTemplateApp={this.canDeployTemplateApp}
            canDeployComposingApp={this.canDeployComposingApp}
          />
        )}
        <ServiceDeployAppModal
          store={this.crdAppStore}
          visible={showServiceDeployApp}
          cluster={this.cluster}
          namespace={this.namespace}
          onOk={this.handleServiceDeployApp}
          onCancel={this.hideServiceDeployAppModal}
          isSubmitting={this.crdAppStore.isSubmitting}
          sampleApp={sampleApp}
        />
        <RepoAppModal
          workspace={this.workspace}
          visible={showAppRepo}
          onCancel={this.hideRepoAppModal}
          onDeploySuccess={this.handleDeployRepoApp}
        />
      </>
    )
  }

  renderApps() {
    const { appType } = this.state
    return appType === 'template' ? (
      <OPApps
        store={this.opAppStore}
        canCreate={this.canDeployTemplateApp}
        showDeployAppModal={this.showDeployAppModal}
        project={this.projectStore.detail}
        match={this.props.match}
      />
    ) : (
      <CRDApps
        store={this.crdAppStore}
        canCreate={this.canDeployComposingApp}
        showDeployAppModal={this.showDeployAppModal}
        project={this.projectStore.detail}
        match={this.props.match}
      />
    )
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderApps()}
        {this.renderModals()}
      </div>
    )
  }
}
