import React from 'react'
import { observer, inject } from 'mobx-react'
import { Panel } from 'components/Base'

@inject('detailStore')
@observer
export default class Egress extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.detailStore
  }
  render() {
    const { detail } = this.store

    return <Panel title={detail.name}>egress</Panel>
  }
}
