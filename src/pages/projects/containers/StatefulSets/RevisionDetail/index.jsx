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

import { getStatefulSetStatus } from 'utils/status'

import { Component as Base } from 'projects/containers/Deployments/RevisionDetail'

@inject('rootStore')
@observer
class StatefulSetsRevisionDetail extends Base {
  get name() {
    return 'StatefulSets'
  }

  get revisionStatus() {
    return t(getStatefulSetStatus(this.store.detail))
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
      name: t('Status'),
      value: this.revisionStatus,
    },
    {
      name: t('Selector'),
      value: this.selectors,
    },
    {
      name: t('Updated Time'),
      value: this.updateTime,
    },
    {
      name: t('Creator'),
      value: this.creator,
    },
  ]
}

export default StatefulSetsRevisionDetail
