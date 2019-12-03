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
import { computed } from 'mobx'
import { windowClose } from 'utils/dom'
import { Icon } from '@pitrix/lego-ui'
import fullScreen from 'components/Modals/fullscreenModal'

import AddableTabs from './components/AddableTabs'
import Statistics from './Pages/Statistic'
import Console from './Pages/Console'

import Store from './store'

import styles from './index.scss'

/*
 * A Log Search Container, you can export it when you use for a normal page.
 */
@observer
class LogSearchContainer extends React.Component {
  tabsStore = new Store()

  /**
   * add render logic, which is depend store object format
   */
  @computed
  get tabs() {
    return this.tabsStore.tabs.map(tab => ({
      label: (
        <span>
          <Icon name={tab.icon} />
          {tab.title}
        </span>
      ),
      name: String(tab.id),
      content: <div className={styles.tabContent}>{this.renderPage(tab)}</div>,
    }))
  }

  handleTabRemove = tabName => {
    this.tabsStore.removeTab(Number(tabName))
  }

  handleTabSelect = tabName => {
    this.tabsStore.select(Number(tabName))
  }

  handleTabAdd = () => {
    this.tabsStore.pushStatisticTab()
  }

  handleNewTagOpen = filter => {
    this.tabsStore.pushConsoleTab({ fields: [filter] })
  }

  render() {
    const tabsStore = this.tabsStore
    const { activeTab } = tabsStore

    return (
      <AddableTabs
        disableEmpty
        tabs={this.tabs}
        activeName={String(activeTab)}
        className={styles.tabs}
        onAdd={this.handleTabAdd}
        onClose={this.handleTabRemove}
        onTabSelect={this.handleTabSelect}
      />
    )
  }

  /**
   * render page and connect page event to tabs store
   * @param {object} tab
   */
  renderPage(tab) {
    const { pageType } = tab

    switch (pageType) {
      case 'statistic':
        return <Statistics tab={tab} />
      case 'search':
        return <Console onNewTagOpen={this.handleNewTagOpen} tab={tab} />
      default:
        return null
    }
  }
}

/*
 * wrap page in fullscreen model
 */
const Modal = fullScreen(LogSearchContainer)

/*
 * set default props for Modal
 */
export default function FullScreenLogSearchModal(props) {
  return (
    <Modal
      icon={'log'}
      title={t('LOG_SEARCH_TOOL')}
      onCancel={windowClose}
      bodyClassName={styles.modalBody}
      {...props}
    />
  )
}
