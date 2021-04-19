import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import classNames from 'classnames'
import styles from './index.scss'

@observer
export default class Item extends React.Component {
  rootRef = React.createRef()

  menuRef = React.createRef()

  @observable showMenuIcon = false

  @observable showMenuList = false

  @action
  mouserOver = () => {
    this.showMenuIcon = !this.showMenuIcon
    this.showMenuList = false
  }

  menuItem = [
    {
      url: '/assets/drawer_panel_menu1.svg',
      label: '替换为当前搜索',
    },
    {
      url: '/assets/drawer_panel_menu2.svg',
      label: '添加至当前搜索',
    },
    {
      url: '/assets/drawer_panel_menu3.svg',
      label: '复制',
    },
    {
      url: '/assets/drawer_panel_menu4.svg',
      label: '在新标签中打开',
    },
  ]

  @action
  menuImgClick() {
    this.showMenuList = !this.showMenuList
    this.menuRef.current.style.left = `${this.rootRef.current.offsetWidth /
      2}px`
  }

  renderMenu = () => {
    return (
      <>
        <img
          className={classNames(styles.menuIcon, {
            [styles.visible]: !this.showMenuIcon,
          })}
          src="/assets/drawer_panel_itemMenu.svg"
          alt=""
          onClick={() => this.menuImgClick()}
        ></img>
        <div
          ref={this.menuRef}
          className={classNames(styles.menuListBox, {
            [styles.visible]: !this.showMenuList,
          })}
        >
          {this.menuItem.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                <img src={item.url} alt=""></img>
                {item.label}
              </div>
            )
          })}
        </div>
      </>
    )
  }

  render() {
    const { data, Key } = this.props
    return (
      <div
        style={{
          marginLeft: data.level ? 30 : 0,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
        key={Key}
        onMouseEnter={this.mouserOver}
        onMouseLeave={this.mouserOver}
      >
        <div className={styles.text}>{`"${Key}":`}</div>
        &nbsp;
        <div className={styles.value} ref={this.rootRef}>
          {`${data[Key]}`}
          {this.renderMenu()}
        </div>
      </div>
    )
  }
}
