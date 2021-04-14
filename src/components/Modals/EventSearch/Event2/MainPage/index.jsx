import React from 'react'
import { observer } from 'mobx-react'
import { action, observable, computed } from 'mobx'
import { get, assign } from 'lodash'
import PropTypes from 'prop-types'
import Clusters from 'stores/cluster'
import EmptyList from 'components/Cards/EmptyList'
import { Home, Detail } from './page'

@observer
export default class TabPanel extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
  }

  clusters = new Clusters()

  formStepState = this.initStepState()

  clusterInfoList = this.initClusterInfoList()

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

  initClusterInfoList() {
    const state = observable([])
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

  detailState = (() => {
    const state = observable({
      container: '',
      host: '',
      log: '',
      namespace: '',
      pod: '',
    })

    state.setState = action(newState => {
      assign(state, newState)
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
        detailState: this.detailState,
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

    this.searchInputState.setCluster(get(this, `clustersOpts[0].value`))
  }

  render() {
    const { Component, props } = this.Content
    if (!Component) {
      return null
    }

    if (globals.app.isMultiCluster && !this.searchInputState.cluster) {
      return (
        <EmptyList
          className="no-shadow"
          icon="cluster"
          title={t('No Available Cluster')}
          desc={t('No cluster with logging module enabled')}
        />
      )
    }
    return (
      <Component
        clustersOpts={this.clustersOpts}
        formStepState={this.formStepState}
        clusterInfoList={this.clusterInfoList}
        {...props}
      ></Component>
    )
  }
}
