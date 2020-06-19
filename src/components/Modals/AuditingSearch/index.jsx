import React from 'react'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'

import FullScreen from 'components/Modals/FullscreenModal'
import Clusters from 'stores/cluster'

import { Home, Detail } from './Auditing'

@FullScreen
@observer
export default class AuditingOperating extends React.Component {
  clusters = new Clusters()

  formStepState = this.initStepState()

  @computed
  get clustersOpts() {
    return this.clusters.list.data.map(({ name }) => ({
      value: name,
      label: `${t('Cluster')}: ${name}`,
    }))
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
    })

    this.searchInputState.setCluster(this.clusters.list.data[0].name)
  }

  render() {
    const { Component, props } = this.Content
    if (!Component) {
      return
    }

    if (!this.searchInputState.cluster) {
      return null
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
