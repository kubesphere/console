import React from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import FullScreen from 'components/Modals/FullscreenModal'

import { Home, Detail } from './Event'

@FullScreen
@observer
export default class EventSearch extends React.Component {
  formStepState = this.initStepState()

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

  render() {
    const { Component, props } = this.Content
    if (!Component) {
      return
    }

    return <Component formStepState={this.formStepState} {...props} />
  }
}
