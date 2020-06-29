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
import { observable, action, computed } from 'mobx'
import { get } from 'lodash'

import EmptyList from 'components/Cards/EmptyList'
import FullScreen from 'components/Modals/FullscreenModal'
import Clusters from 'stores/cluster'

import { Home, Detail } from './Event'

@FullScreen
@observer
export default class EventSearch extends React.Component {
  clusters = new Clusters()

  formStepState = this.initStepState()

  @computed
  get clustersOpts() {
    return this.clusters.list.data
      .filter(item => get(item, 'configz.events'))
      .map(({ name }) => ({ value: name, label: name }))
  }

  initStepState() {
    const state = observable({
      step: 0,
    })
    state.next = action(() => {
      state.step += 1
    })
    state.pre = action(() => {
      state.step -= 1
    })
    return state
  }

  searchInputState = (() => {
    const state = observable({
      query: [],
      start: '',
      end: '',
      step: '',
      durationAlias: '',
      nextParamsKey: '',
      queryMode: 1,
      cluster: '',
    })

    state.setCluster = action(cluster => {
      state.cluster = cluster
    })

    return state
  })()

  formStepConfig = [
    {
      Component: Home,
      props: {
        searchInputState: this.searchInputState,
      },
    },
    {
      Component: Detail,
      props: {
        searchInputState: this.searchInputState,
      },
    },
  ]

  get Content() {
    return this.formStepConfig[this.formStepState.step] || {}
  }

  async componentDidMount() {
    await this.clusters.fetchList({
      limit: -1,
      ascending: true,
    })

    this.searchInputState.setCluster(get(this, 'clustersOpts[0].value', ''))
  }

  render() {
    const { Component, props } = this.Content
    if (!Component) {
      return
    }

    if (globals.app.isMultiCluster && !this.searchInputState.cluster) {
      return (
        <EmptyList
          className="no-shadow"
          icon="cluster"
          title={t('No Available Cluster')}
          desc={t('No cluster with event query enabled')}
        />
      )
    }

    return (
      <Component
        clustersOpts={this.clustersOpts}
        formStepState={this.formStepState}
        {...props}
      />
    )
  }
}
