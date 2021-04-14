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
        <div className={style.text}> {`${t('窗口')}${tabIndex + 1}`}</div>
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
