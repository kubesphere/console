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
import { Modal, Form } from 'components/Base'
import { Input, TextArea } from '@pitrix/lego-ui'

export default class AddNodeTypeModal extends React.Component {
  render() {
    return (
      <Modal.Form
        width={600}
        icon="nodes"
        title={t('Add Node Type')}
        {...this.props}
      >
        <Form.Item label={t('Type Name')} desc={t('NAME_DESC')}>
          <Input name="name" maxLength={63} />
        </Form.Item>
        <Form.Item
          label={t('Description')}
          desc={t('NODE_TYPE_DESCRIPTION_DEC')}
        >
          <TextArea name="description" />
        </Form.Item>
      </Modal.Form>
    )
  }
}
