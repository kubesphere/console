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
import { observer } from 'mobx-react'
import { action } from 'mobx'
import style from '../index.scss'

@observer
export default class Tab extends Component {
  @action tabClick() {
    const { tabState, tabKey } = this.props
    tabState.activeTab(tabKey)
  }

  @action tabClose(e) {
    const { tabState, tabKey } = this.props
    tabState.closeTab(tabKey)
    e.stopPropagation()
  }

  render() {
    const { tabIndex, onlyOneTab, active } = this.props
    return (
      <div
        className={active ? style.tabActive : style.tabContent}
        onClick={() => this.tabClick()}
      >
        <img src="/assets/tabConsole.svg" alt=""></img>
        <div className={style.text}> {`${t('window')}${tabIndex + 1}`}</div>
        <img
          className={onlyOneTab ? style.cancelHide : style.cancel}
          src="/assets/tabCancel.svg"
          alt=""
          onClick={e => this.tabClose(e)}
        ></img>
      </div>
    )
  }
}
