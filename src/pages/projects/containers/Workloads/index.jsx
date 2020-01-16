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
import { observer } from 'mobx-react'
import WorkloadBanner from 'projects/components/WorkloadBanner'
import WorkloadStore from 'stores/workload'

import { MODULE_KIND_MAP } from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'
import { FORM_STEPS } from './constants'

import WorkloadBaseList from './Base'

@observer
export default class Workloads extends React.Component {
  constructor(props) {
    super(props)
    this.store = new WorkloadStore(this.module)
  }

  componentDidMount() {
    this.store.fetchCounts(this.params, [
      'deployments',
      'statefulsets',
      'daemonsets',
    ])
  }

  get params() {
    const { module, ...rest } = this.props.match.params
    return rest
  }

  get module() {
    return this.props.match.params.module
  }

  get formTemplate() {
    const { namespace } = this.params

    const kind = MODULE_KIND_MAP[this.module]

    if (!kind || !FORM_TEMPLATES[this.module]) {
      return {}
    }

    const template = FORM_TEMPLATES[this.module]({
      namespace,
    })

    if (this.module === 'statefulsets') {
      return {
        [kind]: template,
        Service: FORM_TEMPLATES.services({
          namespace,
          selector: template.metadata.labels,
        }),
      }
    }

    return {
      [kind]: template,
    }
  }

  renderHeader() {
    return (
      <WorkloadBanner
        module={this.module}
        {...this.params}
        deploymentsCount={this.store.counts.deployments}
        statefulsetsCount={this.store.counts.statefulsets}
        daemonsetsCount={this.store.counts.daemonsets}
      />
    )
  }

  renderWorkloads() {
    return (
      <WorkloadBaseList
        module={this.module}
        name={MODULE_KIND_MAP[this.module]}
        store={this.store}
        formSteps={FORM_STEPS[this.module]}
        formTemplate={this.formTemplate}
        {...this.props}
      />
    )
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        {this.renderWorkloads()}
      </>
    )
  }
}
