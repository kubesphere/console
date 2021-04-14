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
import FullScreen from 'components/Modals/FullscreenModal2'
import { observable, action } from 'mobx'
import { generateId } from 'utils'
import Tab from './Event2/Tab'
import TabPanel from './Event2/Tab/TabPanel'
import MainPage from './Event2/MainPage'

@FullScreen
@observer
export default class LogSearchModal extends React.Component {
  tabState = (() => {
    const state = observable({
      activeKey: 0,
      tabList: [],
    })

    state.activeTab = action(key => {
      state.activeKey = key
    })

    state.addTab = action(() => {
      const id = generateId(4)
      state.activeKey = id
      state.tabList.push({
        id,
      })
    })

    state.closeTab = action(deleteKey => {
      const index = state.tabList.findIndex(item => item.id === deleteKey)
      if (state.activeKey === deleteKey) {
        if (index === 0) {
          state.activeKey = state.tabList[index + 1].id
        } else {
          state.activeKey = state.tabList[index - 1].id
        }
      }
      state.tabList = state.tabList.filter(tab => tab.id !== deleteKey)
    })

    state.addTab()
    return state
  })()

  render() {
    return (
      <Tab tabState={this.tabState}>
        {this.tabState.tabList.map(tab => {
          const showIf = tab.id === this.tabState.activeKey
          return (
            <TabPanel key={tab.id} showIf={showIf}>
              <MainPage></MainPage>
            </TabPanel>
          )
        })}
      </Tab>
    )
  }
}
