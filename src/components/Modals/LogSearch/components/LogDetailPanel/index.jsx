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
import DetailStore from 'stores/logging/v3/detail'
import { observer } from 'mobx-react'

import LogDetailPanel from './LogDetailPanel'

@observer
export default class LogDetailPanelContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectMenu: 'context',
    }

    this.logListStore = new DetailStore()
  }

  componentDidMount() {
    this.updateContext()
  }

  componentDidUpdate({ log }) {
    if (log !== this.props.log) {
      this.updateContext()
    }
  }

  updateContext() {
    this.logListStore.fetchContext({
      targetLog: this.props.log,
      size: 100,
    })
  }

  handleMenuClick = selectMenu => {
    this.setState({
      selectMenu,
    })
  }

  render() {
    const { selectMenu } = this.state

    const {
      log,
      onLogDetailHideButtonClick,
      onReplaceClick,
      onAddClick,
      onNewTagClick,
    } = this.props

    return (
      <LogDetailPanel
        log={log}
        context={this.logListStore.context}
        selectMenu={selectMenu}
        onMenuSelect={this.handleMenuClick}
        onLogDetailHideButtonClick={onLogDetailHideButtonClick}
        onReplaceClick={onReplaceClick}
        onAddClick={onAddClick}
        onNewTagClick={onNewTagClick}
      />
    )
  }
}
