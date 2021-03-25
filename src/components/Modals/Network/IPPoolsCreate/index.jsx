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
import { debounce, set } from 'lodash'
import { Form, Input } from '@kube-design/components'
import { Modal } from 'components/Base'
import { NumberInput, ObjectInput } from 'components/Inputs'
import { PATTERN_IP } from 'utils/constants'
import { generateId } from 'utils'
import { Netmask } from 'netmask'

import styles from './index.scss'

export default class CreateIPPoolModal extends Component {
  state = {
    count: 1,
    ip: '',
    mask: 24,
    cidrs: [],
    formData: {},
  }

  random = generateId(4)

  handleIPChange = ip => {
    this.setState({ ip }, this.handleCIDRsChange)
  }

  handleMaskChange = mask => {
    this.setState({ mask }, this.handleCIDRsChange)
  }

  handleCountChange = count => {
    this.setState({ count }, this.handleCIDRsChange)
  }

  handleCIDRsChange = debounce(() => {
    const { ip, mask, count, formData } = this.state
    const cidrs = []
    if (PATTERN_IP.test(ip) && mask && count > 0) {
      let index = 0
      let block = new Netmask(`${ip}/${mask}`)
      while (index < count) {
        const cidr = block.toString()
        if (cidrs.every(item => item.cidr !== cidr)) {
          cidrs.push({ cidr })
        }
        index += 1
        block = block.next()
      }
    }

    set(formData, 'cidrs', cidrs)
    this.setState({ cidrs, formData })
  }, 200)

  validator = (rule, value, callback) => {
    if (!value) {
      return callback({
        message: t('Please input the IP/mask bit'),
        field: rule.field,
      })
    }

    if (!value.cidr) {
      return callback({
        message: t('Please input the IP/mask bit'),
        field: rule.field,
      })
    }

    if (!value.name) {
      return callback({
        message: t('Please input name'),
        field: rule.field,
      })
    }

    callback()
  }

  render() {
    const { count, cidrs, formData } = this.state
    const { ...rest } = this.props
    return (
      <Modal.Form
        title={t('Create Pod IP Pool')}
        width={960}
        data={formData}
        {...rest}
      >
        <Form.Item
          label={t('IP Address')}
          rules={[
            { required: true, message: t('Please input the IP address') },
            {
              pattern: PATTERN_IP,
              message: t('Invalid IP address'),
            },
          ]}
        >
          <Input name="ip" onChange={this.handleIPChange} />
        </Form.Item>
        <Form.Item
          label={t('Mask Bit')}
          rules={[{ required: true, message: t('Please input the mask bit') }]}
        >
          <NumberInput
            name="mask"
            defaultValue={24}
            integer
            min={0}
            max={31}
            onChange={this.handleMaskChange}
          />
        </Form.Item>
        <Form.Item
          label={t('Number of Creation')}
          desc={t('IP_POOL_CREATE_COUNT_DESC')}
          rules={[
            {
              required: true,
              message: t(
                'Please input the number of Pod IP Pools to be created'
              ),
            },
          ]}
        >
          <NumberInput
            name="count"
            defaultValue={count}
            integer
            min={1}
            max={10}
            onChange={this.handleCountChange}
          />
        </Form.Item>
        {cidrs.map((value, index) => (
          <Form.Item
            label={index === 0 ? t('Pod IP Pools to be created') : ''}
            key={index}
            rules={[{ validator: this.validator }]}
          >
            <ObjectInput className={styles.item} name={`cidrs[${index}]`}>
              <Input name="cidr" placeholder={t('IP/Mask Bit')} />
              <Input
                name="name"
                defaultValue={`ippool-${this.random}-${index}`}
                placeholder={t('Name')}
              />
              <Input name="desc" placeholder={t('Description')} />
            </ObjectInput>
          </Form.Item>
        ))}
      </Modal.Form>
    )
  }
}
