import React, { Component } from 'react'
import {
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Button,
  Dropdown,
  Menu,
  Icon,
} from '@kube-design/components'
import classNames from 'classnames'
import { PAGESIZE_OPTION } from 'utils/constants'
import styles from './index.scss'

export default class Pagination extends Component {
  state = {
    pagesize: 10,
  }

  get totalPage() {
    const { total, limit } = this.props
    const left = total % limit
    return left === 0 ? Math.max(total / limit, 1) : (total - left) / limit + 1
  }

  static getDerivedStateFromProps(props, state) {
    if (props.limit !== state.pagesize) {
      return {
        pagesize: props.limit,
      }
    }
    return null
  }

  handlePrev = () => {
    const { page, onChange, limit } = this.props

    onChange &&
      onChange({
        page: Math.max(page - 1, 1),
        limit,
      })
  }

  handleNext = () => {
    const { page, onChange, limit } = this.props
    onChange &&
      onChange({
        page: Math.min(page + 1, this.totalPage),
        limit,
      })
  }

  renderPagesize = () => {
    const { pagesize } = this.state
    const { total } = this.props
    return (
      <div className={styles.pageSizeBox}>
        <Dropdown
          placement={'bottomLeft'}
          trigger={'hover'}
          content={
            <Menu
              className={styles.pageSizeMenu}
              onClick={this.handlePageSizeClick}
            >
              {PAGESIZE_OPTION.map(item => (
                <Menu.MenuItem
                  className={classNames(styles.pageSizeMenuitem)}
                  key={item}
                >
                  <span>{item}</span>
                </Menu.MenuItem>
              ))}
            </Menu>
          }
        >
          <div className={styles.pagesize}>
            <span className={styles.text}>
              {t('SHOW_NUM', { num: pagesize })}
            </span>
            <Icon name="caret-down" size={16} />
          </div>
        </Dropdown>
        <div className={styles.gap}></div>
        <span>{t('TOTAL_ITEMS', { num: total })}</span>
      </div>
    )
  }

  handlePageSizeClick = (e, pagesize) => {
    const { onChange } = this.props
    this.setState(
      {
        pagesize,
      },
      () => {
        onChange({
          page: 1,
          limit: pagesize,
        })
      }
    )
  }

  renderPageDropDown = () => {
    const { page } = this.props
    if (this.totalPage > 0) {
      const items = []
      for (let i = 0; i < this.totalPage; i++) {
        items.push(
          <Menu.MenuItem
            className={classNames(styles.menuitem, {
              [styles.menuActive]: page === i + 1,
            })}
            key={i + 1}
          >
            {i + 1}
          </Menu.MenuItem>
        )
      }
      return (
        <Menu
          className={classNames(styles.menu)}
          onClick={this.handlePageMenuClick}
        >
          {items}
        </Menu>
      )
    }
    return null
  }

  handlePageMenuClick = (e, pageNum) => {
    const { onChange, limit } = this.props
    onChange &&
      onChange({
        page: Math.min(pageNum, this.totalPage),
        limit,
      })
  }

  render() {
    const { page } = this.props
    return (
      <Level>
        <LevelLeft>{this.renderPagesize()}</LevelLeft>
        <LevelRight>
          <LevelItem className={styles.pagination}>
            <Button
              className={styles.button}
              type="flat"
              icon="previous"
              iconSize={16}
              disabled={page <= 1}
              onClick={this.handlePrev}
            />
            <Dropdown
              placement={'bottom'}
              trigger={'hover'}
              content={this.renderPageDropDown()}
            >
              <div className={styles.pages}>
                <span>
                  {page} / {this.totalPage}
                </span>
              </div>
            </Dropdown>
            <Button
              className={styles.button}
              type="flat"
              icon="next"
              iconSize={16}
              disabled={page >= this.totalPage}
              onClick={this.handleNext}
            />
          </LevelItem>
        </LevelRight>
      </Level>
    )
  }
}
