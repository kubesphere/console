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
import React, { memo } from 'react'
import { NumberInput, StringInput, ObjectInput } from 'components/Inputs'
import { Select, Input, Form } from '@kube-design/components'
import styles from './index.scss'

export default memo(function ProbeSection({ checkerType }) {
  const defaultData = {
    scheme: 'HTTP',
    path: '/',
    port: 80,
  }

  const httpRequestTypes = [
    {
      label: 'HTTP',
      value: 'HTTP',
    },
    {
      label: 'HTTPS',
      value: 'HTTPS',
    },
  ]

  switch (checkerType) {
    case 'command':
      return (
        <Form.Item
          key={checkerType}
          label={t('COMMANDS')}
          desc={t('PROBE_COMMAND_DESC')}
          rules={[{ required: true, message: t('PROBE_COMMAND_EMPTY') }]}
        >
          <StringInput className="max-width-full" name="exec.command" />
        </Form.Item>
      )
    case 'tcp':
      return (
        <Form.Item
          label={t('PORT')}
          rules={[{ required: true, message: t('PORT_NUMBER_EMPTY') }]}
        >
          <NumberInput
            name="tcpSocket.port"
            defaultValue={80}
            min={0}
            max={65535}
            integer
          />
        </Form.Item>
      )

    default:
      return (
        <Form.Item
          key={checkerType}
          label={t('PATH')}
          rules={[{ required: true, message: t('HTTP_PATH_EMPTY') }]}
        >
          <ObjectInput
            name="httpGet"
            className={styles.object}
            defaultValue={defaultData}
          >
            <Select name="scheme" options={httpRequestTypes} />
            <Input name="path" />
            <NumberInput name="port" min={0} max={65535} integer />
          </ObjectInput>
        </Form.Item>
      )
  }
})
