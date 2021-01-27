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
import { observer } from 'mobx-react'
import { Input, Form, Columns, Column, TextArea } from '@kube-design/components'

import { NumberInput } from 'components/Inputs'

import { PATTERN_NAME, PATTERN_IP } from 'utils/constants'

@observer
export default class CreateModal extends React.Component {
  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { cluster, namespace } = this.props

    this.props.store
      .checkName({ name: value, cluster, namespace })
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('Name exists'), field: rule.field })
        }
        callback()
      })
  }

  render() {
    const { formTemplate, formRef } = this.props

    return (
      <Form data={formTemplate} ref={formRef}>
        <Columns>
          <Column>
            <Form.Item
              label={t('Name')}
              desc={t('NAME_DESC')}
              rules={[
                { required: true, message: t('Please input name') },
                {
                  pattern: PATTERN_NAME,
                  message: `${t('Invalid name')}, ${t('NAME_DESC')}`,
                },
                { validator: this.nameValidator },
              ]}
            >
              <Input name="metadata.name" autoFocus={true} maxLength={63} />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
              <Input
                name="metadata.annotations['kubesphere.io/alias-name']"
                maxLength={63}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
              <TextArea
                name="metaddata.annotations['kubesphere.io/description']"
                maxLength={256}
              />
            </Form.Item>
          </Column>
        </Columns>
        <Columns>
          <Column>
            <Form.Item
              label={t('Neighbor ASN')}
              desc={t('ASN_DESC')}
              rules={[
                { required: true, message: t('Please input Neighbor ASN') },
              ]}
            >
              <NumberInput
                name="spec.conf.peerAs"
                min={0}
                max={65535}
                integer
              />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item
              label={t('Neighbor IP Address')}
              rules={[
                {
                  required: true,
                  message: t('Please input neighbor ip address'),
                },
                {
                  pattern: PATTERN_IP,
                  message: t('Invalid ip address'),
                },
              ]}
            >
              <Input name="spec.conf.neighborAddress" />
            </Form.Item>
          </Column>
        </Columns>
      </Form>
    )
  }
}
