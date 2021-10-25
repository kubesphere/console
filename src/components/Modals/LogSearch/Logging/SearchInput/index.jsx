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
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { action, observable, computed } from 'mobx'
import { observer } from 'mobx-react'
import { get } from 'lodash'

import { Icon } from '@kube-design/components'
import DefaultRange from 'components/Cards/Monitoring/Controller/TimeSelector/Range/Default'
import CustomRange from 'components/Cards/Monitoring/Controller/TimeSelector/Range/Custom'
import {
  getDateStr,
  getTimeLabel,
} from 'components/Cards/Monitoring/Controller/TimeSelector/utils'

import styles from './index.scss'

const getSecond = step => {
  const [, count = 0, unit = 's'] = step.match(/(\d+)(\w+)/)
  const unitMap = {
    s: 1,
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
  }
  return count * unitMap[unit]
}

@observer
export default class SearchBar extends React.Component {
  static propType = {
    params: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    dropDownItems: PropTypes.object.isRequired,
    enableClear: PropTypes.bool,
    enableTimeDuration: PropTypes.bool,
  }

  static defaultProps = {
    enableTimeDuration: true,
    enableClear: false,
    onChange() {},
  }

  @observable
  searchWord = ''

  @observable
  showDropDown = false

  duration = observable({
    end: Math.ceil(Date.now() / 1000),
    start: Math.ceil(Date.now() / 1000) - 60 * 30,
    step: '1m',
  })

  @computed
  get durationTimes() {
    return (
      (this.duration.end - this.duration.start) / getSecond(this.duration.step)
    )
  }

  @computed
  get showDurationDropDown() {
    return (
      this.props.enableTimeDuration &&
      this.props.params.nextParamsKey === '_time'
    )
  }

  @computed
  get currentParamText() {
    const { dropDownItems, params } = this.props
    return params.nextParamsKey === '_time'
      ? t('TIME_RANGE_SCAP')
      : get(dropDownItems, `${params.nextParamsKey}.text`)
  }

  inputRef = React.createRef()

  @action
  removeParam = event => {
    const { onChange, params } = this.props
    const index = get(event, 'currentTarget.dataset.index')
    params.query[index] = {}
    onChange()
  }

  @action
  changeSearchWord = event => {
    const searchWord = event.target.value
    const { params } = this.props
    this.showDropDown = !params.nextParamsKey || !searchWord
    this.searchWord = searchWord
  }

  changeInputKey = event => {
    if (event.keyCode === 13) {
      this.handlerInputEnter()
    }
  }

  @action
  handlerInputEnter() {
    const { params, dropDownItems, onChange } = this.props

    if (!this.searchWord.trim()) {
      return
    }

    const { nextParamsKey } = params
    const [, filter, filterValue] = this.searchWord.match(/([^:]+):(.+)/) || []
    const paramKey = this.findParamKeyInDropDown(filter)

    if (nextParamsKey) {
      this.props.params.query.push({
        key: nextParamsKey,
        value: this.searchWord,
      })
    } else if (paramKey) {
      this.props.params.query.push({
        key: paramKey,
        value: filterValue,
      })
    } else {
      this.props.params.query.push({
        key: Object.keys(dropDownItems)[0],
        value: this.searchWord,
      })
    }

    this.searchWord = ''
    this.showDropDown = true
    params.nextParamsKey = ''

    this.focus()
    onChange()
  }

  findParamKeyInDropDown(filter) {
    const dropdownItem =
      Object.entries(this.props.dropDownItems).find(([, config]) => {
        const { text } = config
        return text === filter
      }) || []
    return dropdownItem[0]
  }

  @action
  hiddenDropDown = () => {
    this.showDropDown = false
  }

  @action
  changeNextQueryKey = event => {
    event.preventDefault()
    const query = get(event, 'currentTarget.dataset.query')
    this.props.params.nextParamsKey = query
    this.focus()
  }

  @action
  showDurationMenu = () => {
    this.props.params.nextParamsKey = '_time'
    this.searchWord = ''
    this.showDropDown = false
  }

  @action
  removeParamsDuration = () => {
    const { params, onChange } = this.props
    params.start = ''
    params.end = ''
    params.step = ''
    onChange()
  }

  @action
  cancelChangeTime = () => {
    this.props.params.nextParamsKey = ''
  }

  focus = () => {
    this.inputRef.current.focus()
  }

  @action
  handleTimeChange = ({ step, start, end, lastTime }) => {
    const { params, onChange } = this.props
    params.step = step
    params.durationAlias = lastTime
    if (lastTime) {
      params.end = Math.ceil(Date.now() / 1000)
      params.start = Math.ceil(Date.now() / 1000) - getSecond(lastTime)
    } else {
      params.end = end
      params.start = start
    }
    params.nextParamsKey = ''
    onChange()
  }

  render() {
    const { enableClear, className } = this.props

    return (
      <div
        className={classnames(styles.container, className)}
        onClick={this.focus}
      >
        {this.renderParamsItems()}
        {this.renderParamsDuration()}
        {this.renderInput()}
        {enableClear && this.renderClear()}
        {this.showDurationDropDown && this.renderTimeDuration()}
      </div>
    )
  }

  renderTimeDuration() {
    return (
      <div className={styles.durationDropdown}>
        <DefaultRange
          step={this.duration.step}
          times={this.durationTimes}
          onChange={this.handleTimeChange}
        />
        <CustomRange
          className={styles.customRange}
          step={this.duration.step}
          times={this.durationTimes}
          onSubmit={this.handleTimeChange}
          onCancel={this.cancelChangeTime}
          showStep={this.props.showStep}
        />
      </div>
    )
  }

  renderParamsDuration() {
    const { start, end, durationAlias } = this.props.params
    return start ? (
      <span className={styles.param} key={'_duration'}>
        <span>
          {durationAlias
            ? t('TIME_RANGE_LAST', { value: getTimeLabel(durationAlias) })
            : t('TIME_RANGE_RANGE', {
                startTime: getDateStr(start),
                endTime: getDateStr(end),
              })}
        </span>
        <span onClick={this.removeParamsDuration}>
          <Icon name="close" className={styles.removeParam} type="light" />
        </span>
      </span>
    ) : null
  }

  renderParamsItems() {
    const { dropDownItems, params } = this.props
    return params.query.map(({ key, value }, index) =>
      key ? (
        <span className={styles.param} key={index}>
          <span>
            {get(dropDownItems, `${key}.text`)}: {value}
          </span>
          <span data-index={index} onClick={this.removeParam}>
            <Icon name="close" className={styles.removeParam} type="light" />
          </span>
        </span>
      ) : null
    )
  }

  renderFilterKey() {
    return this.currentParamText ? (
      <span className={styles.currentParam}>{this.currentParamText}:</span>
    ) : null
  }

  renderInput() {
    return (
      <div className={styles.input}>
        {this.renderFilterKey()}
        <input
          type="text"
          placeholder={t('SEARCH')}
          value={this.searchWord}
          ref={this.inputRef}
          disabled={this.showDurationDropDown}
          onChange={this.changeSearchWord}
          onFocus={this.changeSearchWord}
          onBlur={this.hiddenDropDown}
          onKeyUp={this.changeInputKey}
        />
        {this.showDropDown && this.renderDropdownContent()}
      </div>
    )
  }

  renderDropdownContent() {
    const {
      dropDownItems,
      enableTimeDuration,
      dropdownClass,
      iconThem,
    } = this.props

    return (
      <div className={classnames(styles.dropdown, dropdownClass)}>
        {Object.entries(dropDownItems).map(([query, options]) => (
          <div
            className={styles.dropdownItem}
            key={query}
            onMouseDown={this.changeNextQueryKey}
            data-query={query}
          >
            <span className={styles.icon}>
              {options.imgUrl ? (
                <img height="100%" src={options.imgUrl} />
              ) : (
                <Icon name={options.icon} type={iconThem || 'dark'} />
              )}
            </span>
            <span>{options.text}</span>
          </div>
        ))}
        {enableTimeDuration && (
          <div
            className={styles.dropdownItem}
            onMouseDown={this.showDurationMenu}
            key={'_time'}
          >
            <span className={styles.icon}>
              <Icon name="clock" />
            </span>
            <span>{t('TIME_RANGE_SCAP')}</span>
          </div>
        )}
      </div>
    )
  }

  renderClear() {}
}
