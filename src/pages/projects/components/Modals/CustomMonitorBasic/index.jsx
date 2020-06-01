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
import { CardSelect } from 'components/Inputs'
import { Columns, Column, TextArea, Input } from '@pitrix/lego-ui'
import { PATTERN_NAME } from 'utils/constants'

import styles from './index.scss'

export default class CustomMonitorBasicModal extends React.Component {
  render() {
    return (
      <Modal.Form
        visible
        icon={'dashboard'}
        title={t('CREATE_CUSTOM_MONITORING_DASHBOARD')}
        width={960}
        onOk={this.props.onOk}
        data={this.props.data}
        onCancel={this.props.onCancel}
      >
        <>
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
                  { validator: this.props.nameValidator },
                ]}
              >
                <Input name="name" autoFocus={true} />
              </Form.Item>
            </Column>

            <Column>
              <Form.Item label={t('Description')}>
                <TextArea name="description" />
              </Form.Item>
            </Column>
          </Columns>

          {this.props.templateOpts.length > 0 && (
            <Form.Item
              label={
                <div className={styles.templateLabel}>
                  <h3>{t('SELECT_SUITABLE_MONITORING_TEMPLATE')}</h3>
                  <p>{t('CUSTON_MONITORING_TEMPLATE_DESC')}</p>
                </div>
              }
            >
              <CardSelect
                name="panels"
                className={styles.templateList}
                options={this.props.templateOpts}
              />
            </Form.Item>
          )}
        </>
      </Modal.Form>
    )
  }
}
