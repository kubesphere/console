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
import { cloneDeep, get, unset } from 'lodash'

import { Button, Form } from '@kube-design/components'
import { QUOTAS_MAP } from 'utils/constants'

import QuotaItem from './Item'

import { RESERVED_MODULES, QUOTAS_KEY_MODULE_MAP } from './constants'

import styles from './index.scss'

export default class Quotas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [{ module: 'pods' }, ...this.getItems(props)],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        items: [{ module: 'pods' }, ...this.getItems(this.props)],
      })
    }
  }

  getItems(props) {
    return Object.keys(get(props.data, 'spec.hard', {}))
      .map(key => ({ module: QUOTAS_KEY_MODULE_MAP[key] }))
      .filter(
        ({ module }) => !RESERVED_MODULES.includes(module) && module !== 'pods'
      )
  }

  handleAddQuotaItem = () => {
    this.setState(({ items }) => ({
      items: [...items, { module: '' }],
    }))
  }

  handleItemModuleChange = (newModule, index) => {
    const _item = cloneDeep(this.state.items)
    const oldModule = _item[index]
    const oldModuleLabel = get(QUOTAS_MAP, `[${oldModule}].name`, oldModule)
    _item[index].module = newModule

    this.setState({ items: _item }, () => {
      unset(this.props.data, `spec.hard[${oldModuleLabel}]`)
    })
  }

  handleItemModuleDelete = index => {
    const { items } = this.state
    let _items = cloneDeep(items)
    const module = _items[index].module
    _items = _items.filter(item => item.module !== module)
    const oldModuleLabel = get(QUOTAS_MAP, `[${module}].name`, module)

    this.setState({ items: _items }, () => {
      unset(this.props.data, `spec.hard[${oldModuleLabel}]`)
    })
  }

  render() {
    const { items } = this.state
    const filterModules = items.map(_item => _item.module)
    const disableAdd = items.some(item => item.module === '')

    return (
      <div className={styles.wrapper}>
        {items.map((item, index) => {
          const name = get(QUOTAS_MAP, `[${item.module}].name`, item.module)

          return (
            <Form.Item key={`${index}-${name}`}>
              <QuotaItem
                name={`spec.hard[${name}]`}
                module={item.module}
                index={index}
                onModuleChange={this.handleItemModuleChange}
                onModuleDelete={this.handleItemModuleDelete}
                filterModules={filterModules}
                disableSelect={item.module === 'pods'}
                isFederated={this.props.isFederated}
              />
            </Form.Item>
          )
        })}
        <div className={styles.add}>
          <Button onClick={this.handleAddQuotaItem} disabled={disableAdd}>
            {t('Add Quota Item')}
          </Button>
        </div>
      </div>
    )
  }
}
