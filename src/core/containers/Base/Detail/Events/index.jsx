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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { joinSelector } from 'utils'
import { MODULE_KIND_MAP } from 'utils/constants'
import EventStore from 'stores/event'

import EventsCard from 'components/Cards/Events'

class Events extends React.Component {
  constructor(props) {
    super(props)

    this.eventStore = new EventStore()
  }

  componentDidMount() {
    this.fetchData()
  }

  get store() {
    return this.props.detailStore
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get module() {
    return this.store.module
  }

  get kind() {
    return MODULE_KIND_MAP[this.module]
  }

  fetchData() {
    const { uid, name, namespace, _originData = {} } = this.store.detail

    const fields = {
      'involvedObject.name': name,
      'involvedObject.namespace': namespace,
      'involvedObject.kind': _originData.kind || this.kind,
      'involvedObject.uid': uid,
    }

    this.eventStore.fetchList({
      namespace,
      cluster: this.cluster,
      fieldSelector: joinSelector(fields),
    })
  }

  render() {
    const { data, isLoading } = toJS(this.eventStore.list)

    return <EventsCard data={data} loading={isLoading} />
  }
}

export default inject('detailStore')(observer(Events))
export const Component = Events
