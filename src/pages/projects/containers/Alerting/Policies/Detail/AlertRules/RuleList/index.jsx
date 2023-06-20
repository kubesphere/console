import React from 'react'
import { Panel } from 'components/Base'
import { observer } from 'mobx-react'
import {
  InputSearch,
  Button,
  Pagination,
  Level,
  LevelLeft,
  LevelRight,
  Dropdown,
  Menu,
  Icon,
} from '@kube-design/components'
import { toJS } from 'mobx'
import { cloneDeep, get, includes } from 'lodash'
import { PAGESIZE_OPTION } from 'utils/constants'
import classNames from 'classnames'
import AlertRuleItem from './Item'
import styles from './index.scss'

@observer
class AlertingRuleList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      limit: 10,
      expandIndex: '',
      searchValue: '',
    }
  }

  get store() {
    return this.props.store
  }

  get _rules() {
    const rules = this.props.rules.map((item, index) => ({
      ...item,
      state: this.status[index],
    }))
    return rules
  }

  getRules = () => {
    const { searchValue, page, limit } = this.state
    let listData = this._rules

    if (searchValue !== '') {
      listData = this._rules.filter(item => includes(item.alert, searchValue))
    }

    listData = cloneDeep(listData).slice((page - 1) * limit, page * limit)

    return listData
  }

  get status() {
    const status = get(
      this.store,
      'detail._originDataWithStatus.status.rulesStatus',
      []
    )
    return toJS(status)
  }

  get pagination() {
    const { page, limit, searchValue } = this.state
    const pagination = {
      page,
      limit,
      total: searchValue !== '' ? this.getRules().length : this._rules.length,
    }
    return pagination
  }

  handleExpandClick = index => {
    this.setState(({ expandIndex }) => ({
      expandIndex: expandIndex === index ? '' : index,
    }))
  }

  handleSearch = (e, value) => {
    this.setState({ searchValue: value, page: 1 })
  }

  handleRefresh = () => {
    this.setState({ searchValue: '' }, () => {
      this.props.handleRefresh()
    })
  }

  handlePage = page => {
    this.setState({
      page,
    })
  }

  handlePageSizeClick = (e, limit) => {
    this.setState({ limit })
  }

  renderHeader = () => {
    const { searchValue } = this.state

    return (
      <div className={styles.header}>
        <InputSearch
          className={styles.search}
          name="search"
          value={searchValue}
          placeholder={t('SEARCH_BY_NAME')}
          onChange={this.handleSearch}
          autoComplete="off"
        />
        <div className={styles.actions}>
          <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
        </div>
      </div>
    )
  }

  renderFooter = () => {
    const pagination = this.pagination
    const { total, limit } = pagination

    return (
      <Level className={styles.footer}>
        <LevelLeft>
          <div className={styles.pageSizeBox}>
            <Dropdown
              placement={'top'}
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
                  {t('SHOW_NUM', { num: limit })}
                </span>
                <Icon name="caret-down" size={16} />
              </div>
            </Dropdown>
            <div className={styles.gap}></div>
            <span>{t('TOTAL_ITEMS', { num: total })}</span>
          </div>
        </LevelLeft>
        <LevelRight>
          <Pagination {...pagination} onChange={this.handlePage} />
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { expandIndex } = this.state
    const { store, cluster, namespace } = this.props
    const rules = this.getRules()

    return (
      <Panel title={t('ALERTING_RULE')}>
        {this.renderHeader()}
        {rules.map((rule, index) => (
          <AlertRuleItem
            key={index}
            rule={rule}
            index={index}
            store={store}
            isExpand={expandIndex === index}
            status={rule.state}
            onExpandClick={this.handleExpandClick}
            cluster={cluster}
            namespace={namespace}
          ></AlertRuleItem>
        ))}
        {this.renderFooter()}
      </Panel>
    )
  }
}

export default AlertingRuleList
