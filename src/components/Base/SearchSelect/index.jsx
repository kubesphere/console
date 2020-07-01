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

import { debounce } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'

import { Select } from '@pitrix/lego-ui'

export default class SearchSelect extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    page: PropTypes.number,
    total: PropTypes.number,
    currentLength: PropTypes.number,
    isLoading: PropTypes.bool,
    onFetch: PropTypes.func,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    name: '',
    options: [],
    page: 1,
    total: 0,
    currentLength: 0,
    isLoading: false,
    onFetch() {},
    onChange() {},
  }

  handleScrollToBottom = () => {
    const { page, total, currentLength, onFetch } = this.props

    if (!this.scrolling && total > currentLength) {
      this.scrolling = true
      onFetch({
        more: true,
        page: page + 1,
      }).then(() => {
        this.scrolling = false
      })
    }
  }

  handleInputChange = debounce(value => {
    const { onFetch } = this.props
    onFetch({ name: value })
  }, 300)

  render() {
    const {
      value,
      name,
      options,
      total,
      currentLength,
      isLoading,
      ...rest
    } = this.props
    return (
      <Select
        name={name}
        value={value}
        options={options}
        onInputChange={this.handleInputChange}
        onBlurResetsInput={false}
        onCloseResetsInput={false}
        onSelectResetsInput={false}
        openOnClick={true}
        isLoadingAtBottom
        isLoading={isLoading}
        bottomTextVisible={total === currentLength}
        onMenuScrollToBottom={this.handleScrollToBottom}
        valueRenderer={this.valueRenderer}
        searchable
        clearable
        {...rest}
      />
    )
  }
}
