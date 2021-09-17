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

import React, { Component } from 'react'
import { Button } from '@kube-design/components'
import Banner from 'components/Cards/Banner'
import { trigger } from 'utils/action'
import { inject, observer } from 'mobx-react'
import CRDAppStore from 'stores/application/crd'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class AppBanner extends Component {
  store = new CRDAppStore()

  handleTabChange = value => {
    const { workspace, cluster, namespace } = this.props.match.params
    this.props.rootStore.routing.push(
      `/${workspace}/clusters/${cluster}/projects/${namespace}/applications/${value}`
    )
  }

  get canDeployComposingApp() {
    const { workspace, cluster, namespace: project } = this.props.match.params
    const canCreateDeployment = globals.app
      .getActions({
        workspace,
        cluster,
        project,
        module: 'deployments',
      })
      .includes('create')

    const canCreateService = globals.app
      .getActions({
        workspace,
        cluster,
        project,
        module: 'services',
      })
      .includes('create')

    return canCreateDeployment && canCreateService
  }

  get tabs() {
    const { type } = this.props
    return {
      value: type,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'template',
          label: t('TEMPLATE_BASED_APP_PL'),
        },
        {
          value: 'composing',
          label: t('COMPOSED_APP_PL'),
        },
      ],
    }
  }

  showDeploySampleApp = () => {
    const { rootStore, projectStore, match } = this.props

    this.trigger('crd.app.create', {
      sampleApp: 'bookinfo',
      module: 'applications',
      ...match.params,
      store: this.store,
      projectDetail: projectStore.detail,
      success: url => rootStore.routing.push(url),
    })
  }

  get tips() {
    return [
      {
        title: t('APP_TYPES_Q'),
        description: t('APP_TYPES_A'),
      },
      {
        title: t('HOW_TO_USE_APP_GOVERN_Q'),
        description: t('HOW_TO_USE_APP_GOVERN_A'),
        operation: this.canDeployComposingApp ? (
          <Button onClick={this.showDeploySampleApp}>
            {t('DEPLOY_SAMPLE_APP')}
          </Button>
        ) : null,
        closable: false,
      },
    ]
  }

  render() {
    return (
      <Banner
        {...this.props}
        description={t('APPLICATIONS_DESC')}
        tabs={!globals.app.hasKSModule('openpitrix') ? undefined : this.tabs}
        tips={this.tips}
      />
    )
  }
}
