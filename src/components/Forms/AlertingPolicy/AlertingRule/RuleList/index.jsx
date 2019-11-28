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

import { Button } from 'components/Base'

import Item from './item'

import styles from './index.scss'

export default class RuleList extends React.Component {
  static propTypes = {
    resourceType: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.array,
    onChange: PropTypes.func,
    onShow: PropTypes.func,
  }

  static defaultProps = {
    resourceType: '',
    name: '',
    value: [],
    onChange() {},
    onShow() {},
  }

  handleAdd = () => {
    this.props.onShow()
  }

  handleEdit = data => {
    this.props.onShow(data)
  }

  handleDelete = name => {
    const { value, onChange } = this.props
    onChange(value.filter(item => item.rule_name !== name))
  }

  renderEmpty() {
    return (
      <div className={styles.empty}>
        <p>{t('Please add at least one rule')}</p>
        <Button className={styles.add} onClick={this.handleAdd}>
          {t('Add Rule')}
        </Button>
      </div>
    )
  }

  renderContent() {
    const { resourceType, value } = this.props

    return (
      <div className={styles.content}>
        <ul className={styles.list}>
          {value.map(item => (
            <Item
              key={item.rule_name}
              resourceType={resourceType}
              data={item}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
            />
          ))}
        </ul>
        <div className="text-right">
          <Button className={styles.add} onClick={this.handleAdd}>
            {t('Add Rule')}
          </Button>
        </div>
      </div>
    )
  }

  render() {
    const { value } = this.props

    return (
      <div className={styles.wrapper}>
        {value.length <= 0 ? this.renderEmpty() : this.renderContent()}
      </div>
    )
  }
}
