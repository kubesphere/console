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

import { observer, inject } from 'mobx-react'
import { isEmpty, get } from 'lodash'

import { Component as RevisionDetailBase } from 'projects/containers/Deployments/RevisionDetail'

@inject('rootStore')
@observer
class DaemonSetsRevisionDetail extends RevisionDetailBase {
  get name() {
    return 'DaemonSet'
  }

  get nodeSelector() {
    const { spec } = this.store.detail
    const nodeSelector = get(spec, 'template.spec.nodeSelector', {})
    return isEmpty(nodeSelector)
      ? '-'
      : Object.keys(nodeSelector)
          .map(key => `${key}=${nodeSelector[key]}`)
          .join(',')
  }

  get updateStrategy() {
    return get(this.store.workloadDetail, 'updateStrategy')
  }

  getAttrs = () => [
    {
      name: t('Project'),
      value: this.namespace,
    },
    {
      name: t('Application'),
      value: this.application,
    },
    {
      name: t('Node Selector'),
      value: this.nodeSelector,
    },
    {
      name: t('Update Strategy'),
      value: this.updateStrategy,
    },
  ]
}

export default DaemonSetsRevisionDetail
