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

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { get, isEmpty } from 'lodash'
import { Form } from '@kube-design/components'
import { TypeSelect } from 'components/Base'
import IPPoolStore from 'stores/network/ippool'

@observer
export default class PodIPRange extends Component {
  store = new IPPoolStore()

  componentDidMount() {
    const { cluster, namespace } = this.props
    this.store.fetchList({ cluster, namespace, limit: -1 })
  }

  get prefix() {
    return this.props.prefix || 'spec.template.'
  }

  get options() {
    return this.store.list.data
      .filter(item => get(item, 'status.unallocated', 0))
      .map(item => ({
        label: item.name,
        value: JSON.stringify([item.name]),
        icon: 'eip-group',
        description: item.description || '-',
        details: [
          {
            label: item.cidr,
            description: t('IP/Mask Bit'),
          },
          {
            label: get(item, 'status.unallocated'),
            description: t('Available Number'),
          },
        ],
      }))
  }

  render() {
    const options = this.options

    if (isEmpty(options)) {
      return null
    }

    return (
      <Form.Item label={t('Pod IP Range')}>
        <TypeSelect
          name={`${this.prefix}metadata.annotations["cni.projectcalico.org/ipv4pools"]`}
          options={options}
          defaultValue={options[0].value}
        />
      </Form.Item>
    )
  }
}
