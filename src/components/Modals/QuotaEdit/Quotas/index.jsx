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
import {
  forOwn,
  get,
  isEmpty,
  set,
  omit,
  isUndefined,
  merge,
  pick,
} from 'lodash'
import { Form } from '@kube-design/components'

import { ArrayInput } from 'components/Inputs'

import { QUOTAS_MAP } from 'utils/constants'
import { resourceLimitKey } from 'utils'
import QuotaItem from './Item'

import { QUOTAS_KEY_MODULE_MAP } from './constants'

import styles from './index.scss'

export default class Quotas extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [...this.getItems(props)],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        items: [...this.getItems(this.props)],
      })
    }
  }

  get omitKeys() {
    const supportGpu = globals.config.supportGpuType
    const omitArr = [...resourceLimitKey]
    supportGpu.forEach(type =>
      omitArr.push(`limits.${type}`, `requests.${type}`)
    )
    return omitArr
  }

  getItems(props) {
    const hardValues = omit(get(props.data, 'spec.hard', {}), this.omitKeys)
    const items = []

    forOwn(hardValues, (value, key) => {
      const item = {
        module: QUOTAS_KEY_MODULE_MAP[key] || key,
        value,
      }
      items.push(item)
    })

    const isPorts = items.findIndex(({ module }) => module === 'pods')

    if (isPorts > 0) {
      const temp = items[0]
      items[0] = items[isPorts]
      items[isPorts] = temp
    }

    if (isPorts < 0) {
      items.unshift({ module: 'pods', value: '' })
    }

    return items
  }

  handleAddQuotaItem = items => {
    this.setState({ items }, () => {
      const specHard = get(this.props.data, 'spec.hard')
      const limits = pick(specHard, this.omitKeys)
      const template = {}
      items.forEach(({ module, value }) => {
        if (!isUndefined(module)) {
          const keyModule = get(QUOTAS_MAP, `${module}.name`, module)
          template[`${keyModule}`] = value
        }
      })
      set(this.props.data, 'spec.hard', merge(template, limits))
    })
  }

  checkItemValid = value => {
    return !isEmpty(value) && value.module
  }

  render() {
    const { items } = this.state
    return (
      <div className={styles.wrapper}>
        <Form.Item>
          <ArrayInput
            value={items}
            itemType="object"
            addText={t('ADD')}
            onChange={this.handleAddQuotaItem}
            checkItemValid={this.checkItemValid}
          >
            <QuotaItem isFederated={this.props.isFederated} />
          </ArrayInput>
        </Form.Item>
      </div>
    )
  }
}
