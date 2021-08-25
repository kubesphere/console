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
import { Form, Input } from '@kube-design/components'
import Brokers from 'components/Forms/KafkaForm/Settings/BrokersInput'

export default class BaseInfo extends React.Component {
  addressValidator = (rule, value, callback) => {
    const brokers = value.split(',')
    const isValid = brokers.every(broker => {
      const [, host = '', port = ''] = broker.match(/(.*):(.*)$/) || []
      return host && port
    })
    return isValid
      ? callback()
      : callback({ message: t('INVALID_SERVICE_ADDRESS') })
  }

  render() {
    return (
      <div>
        <Form.Item label={t('TOPIC')}>
          <Input name="topics" autoComplete="nope" />
        </Form.Item>
        <Form.Item
          label={t('SERVICE_ADDRESS')}
          rules={[
            { required: true, message: t('ENTER_SERVICE_ADDRESS') },
            { validator: this.addressValidator },
          ]}
        >
          <Brokers name="brokers" />
        </Form.Item>
      </div>
    )
  }
}
