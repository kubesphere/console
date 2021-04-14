import React, { Component } from 'react'
import { Icon } from '@kube-design/components'
import { action } from 'mobx'
import { observer } from 'mobx-react'
import Tab from './TabHead'
import style from './index.scss'

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
      <>
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
            偏好设置
          </div>
          <div className={style.tipsItem}>
            <span>
              <Icon name="cogwheel"></Icon>
            </span>
            搜索提示
          </div>
        </div>
      </>
    )
  }
}
