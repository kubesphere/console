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

import { inject, observer } from 'mobx-react'
import { joinSelector } from 'utils'
import { Component as Base } from 'core/containers/Base/Detail/Events'

@inject('detailStore')
@observer
export default class Events extends Base {
  fetchData() {
    const { name } = this.store.detail

    const fields = {
      'involvedObject.name': name,
      'involvedObject.kind': this.kind,
    }

    this.eventStore.fetchList({
      cluster: this.cluster,
      fieldSelector: joinSelector(fields),
    })
  }
}
