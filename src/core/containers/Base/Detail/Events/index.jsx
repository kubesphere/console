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
import { observer } from 'mobx-react'
import { has } from 'lodash'

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

  get kind() {
    if (has(this.props.match.params, 'revision')) {
      if (this.props.module === 'deployments') {
        return 'ReplicaSet'
      }
      return 'ControllerRevision'
    }

    return MODULE_KIND_MAP[this.props.module]
  }

  get store() {
    return this.props.detailStore
  }

  fetchData() {
    const { uid, name, namespace } = this.store.detail

    const fields = {
      'involvedObject.name': name,
      'involvedObject.namespace': namespace,
      'involvedObject.kind': this.kind,
      'involvedObject.uid': uid,
    }

    this.eventStore.fetchList({
      namespace,
      fieldSelector: joinSelector(fields),
    })
  }

  render() {
    const { data, isLoading } = toJS(this.eventStore.list)

    return <EventsCard data={data} loading={isLoading} />
  }
}

export default observer(Events)
export const Component = Events
