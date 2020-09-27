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

import { Loading } from '@kube-design/components'

import Card from '../Card'

import styles from './index.scss'

export default class SelectComponent extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    value: '',
    onChange() {},
    onSelect() {},
  }

  state = {
    loadingName: '',
  }

  handleCardSelect = (node, selected) => {
    const { onChange, onSelect } = this.props

    this.setState({ loadingName: node.name })
    onSelect(selected ? node.name : '', value => {
      onChange(value)
      this.setState({ loadingName: '' })
    })
  }

  render() {
    const { data, value, loading } = this.props
    const { loadingName } = this.state

    if (loading) {
      return (
        <div className="text-center margin-t12">
          <Loading spinning={true} />
        </div>
      )
    }

    return (
      <div className={styles.wrapper}>
        {data.map(item => (
          <Card
            key={item.name}
            component={item}
            value={item.name === value}
            loading={item.name === loadingName}
            onSelect={this.handleCardSelect}
          />
        ))}
      </div>
    )
  }
}
