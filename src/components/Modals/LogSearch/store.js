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

import { observable, action } from 'mobx'

const TAB_ID_COUNTER = Symbol('TAB_ID')

/**
 * use for store all the state of log search window
 */
export default class LogTabContainerStore {
  /**
   * use for create a uuid tab is
   * @private
   */
  [TAB_ID_COUNTER] = 0

  @observable
  activeTab = -1

  @observable
  tabs = []

  /**
   * init tabs
   */
  constructor() {
    this.pushStatisticTab()
  }

  @action
  pushStatisticTab({ fields = [] } = {}) {
    const id = ++this[TAB_ID_COUNTER]
    const statistic = new LogTabStore({
      pageType: 'statistic',
      icon: 'terminal',
      fields,
    })

    statistic.id = id

    this.tabs.push(statistic)
    this.activeTab = id
  }

  @action
  pushConsoleTab({ fields = [] } = {}) {
    const id = ++this[TAB_ID_COUNTER]
    const search = new LogTabStore({
      pageType: 'search',
      icon: 'terminal',
      fields,
    })

    search.id = id

    this.tabs.push(search)
    this.activeTab = id
  }

  /**
   * remove tab and calculate a new select tab id when need
   * @param {number} tabID
   */
  @action
  removeTab(tabID) {
    if (tabID === this.activeTab) {
      const isFirstTab = this.tabs[0].id === tabID
      isFirstTab ? this.selectNextTab() : this.selectPreTab()
    }
    this.tabs = this.tabs.filter(tab => tab.id !== tabID)
  }

  selectNextTab() {
    this.navTab(+1)
  }

  selectPreTab() {
    this.navTab(-1)
  }

  /**
   * nav to next active tab
   * @param {number} step
   */
  navTab(step) {
    const currentTabIndex = this.tabs.findIndex(
      tab => tab.id === this.activeTab
    )
    const length = this.tabs.length
    const nextIndex = (currentTabIndex + step + length) % length
    this.activeTab = this.tabs[nextIndex].id
  }

  select(tabID) {
    this.activeTab = tabID
  }
}

/**
 * an abstract class for handle common tag logic
 */
export class TabStore {
  @observable
  title = t('New Tab')

  @observable
  icon = 'terminal'

  constructor({ id, title = t('New Tab'), icon }) {
    this.id = id
    this.title = title
    this.icon = icon
  }

  @action
  changeTabMessage({ title = this.title, icon = this.icon }) {
    this.title = title
    this.icon = icon
  }
}

export class LogTabStore extends TabStore {
  @observable
  pageType = ''

  @observable
  fields = []

  constructor({ fields, pageType = 'statistic', ...props }) {
    super(props)
    this.pageType = pageType
    this.fields = fields
  }

  @action
  linkToSearchPage() {
    this.pageType = 'search'
  }

  @action
  updateFields(fields) {
    this.fields = fields
  }
}
