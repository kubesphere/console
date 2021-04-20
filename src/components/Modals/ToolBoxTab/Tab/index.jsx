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

import React, { Component } from 'react'
import { Icon } from '@kube-design/components'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import Tab from './TabHead'
import style from '../index.scss'

@observer
export default class TabHead extends Component {
  @action handleAddClick() {
    const { tabState } = this.props
    tabState.addTab()
  }

  renderHeader = () => {
    const { tabState } = this.props
    return React.Children.map(this.props.children, (element, index) => {
      const active = element.key === tabState.activeKey
      return (
        <Tab
          tabState={tabState}
          active={active}
          tabIndex={index}
          tabKey={element.key}
          onlyOneTab={tabState.tabList.length === 1}
        ></Tab>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className={style.tabHeader}>
          <div className={style.tabContainer}>{this.renderHeader()}</div>
          <div
            className={style.addButton}
            onClick={() => this.handleAddClick()}
          >
            <img src="/assets/addButton.svg" alt=""></img>
          </div>
        </div>
        {this.props.children}
        <div className={style.bottomTool}>
          <div className={style.tipsItem}>
            <img src="/assets/log-bottom-help.svg" alt="help"></img>
            {t('Preferences')}
          </div>
          <div className={style.tipsItem}>
            <span>
              <Icon name="cogwheel"></Icon>
            </span>
            {t('Search Tips')}
          </div>
        </div>
      </React.Fragment>
    )
  }
}
