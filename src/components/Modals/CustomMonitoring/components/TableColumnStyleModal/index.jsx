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
import { pick } from 'lodash'
import { Modal } from 'components/Base'
import { Column, Columns, Form, Select } from '@kube-design/components'
import NumberInput from 'components/Inputs/NumberInput'
import ColorSelector from '../FormInput/ColorSelector'

import styles from './index.scss'

export default class TableColumnStyleModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: props.data.type,
    }
  }

  form = React.createRef()

  handleTypeChange = type => {
    this.setState({
      type,
    })
  }

  onOk = () => {
    const { type } = this.props.data
    let exportData
    if (type === 'date') {
      exportData = pick(this.props.data, ['type', 'dateFormat'])
    } else if (type === 'number') {
      exportData = pick(this.props.data, [
        'type',
        'decimals',
        'unit',
        'colorMode',
        'thresholds',
        'colors',
      ])
    } else if (type === 'string') {
      exportData = pick(this.props.data, ['type'])
    }

    this.form.current.validator(() => this.props.onOk(exportData))
  }

  render() {
    const { data, visible, onCancel } = this.props

    const { type } = this.state

    return (
      <Modal
        width={960}
        title={t('CUSTOM_DISPLAY_STYLE')}
        description={t('CUSTOM_DISPLAY_MODAL_DESC')}
        icon={'table-chart'}
        visible={visible}
        okText={t('OK')}
        onCancel={onCancel}
        onOk={this.onOk}
      >
        <Form data={data} ref={this.form}>
          <Columns>
            <Column>
              <Form.Item label={t('DATA_TYPE')}>
                <Select
                  name={'type'}
                  onChange={this.handleTypeChange}
                  options={[
                    {
                      label: 'string',
                      value: 'string',
                    },
                    {
                      label: 'date',
                      value: 'date',
                    },
                    {
                      label: 'number',
                      value: 'number',
                    },
                  ]}
                />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
          {type === 'number' && (
            <div>
              <Columns>
                <Column>
                  <Form.Item label={t('UNIT')}>
                    <Select
                      defaultValue={'null'}
                      name={'unit'}
                      options={[
                        {
                          label: 'Bytes',
                          value: 'Bytes',
                        },
                        {
                          label: 'null',
                          value: 'null',
                        },
                      ]}
                    />
                  </Form.Item>
                </Column>
                <Column>
                  <Form.Item rules={[{ required: true }]} label={t('DECIMALS')}>
                    <NumberInput defaultValue={0} name={'decimals'} />
                  </Form.Item>
                </Column>
              </Columns>
              <Columns>
                <Column>
                  <Form.Item
                    label={t('THRESHOLD_FILL')}
                    desc={t('THRESHOLD_FILL_DESC')}
                  >
                    <Select
                      name={'colorMode'}
                      defaultValue={'disabled'}
                      options={[
                        {
                          label: 'cell',
                          value: 'cell',
                        },
                        {
                          label: 'disabled',
                          value: 'disabled',
                        },
                        {
                          label: 'value',
                          value: 'value',
                        },
                      ]}
                    />
                  </Form.Item>
                </Column>
                <Column>
                  <Form.Item label={t('HIGHT_RULES')}>
                    <div className={styles.tableColorStyle}>
                      <Form.Item className={styles.thresholds}>
                        <ColorSelector
                          name={'colors[0]'}
                          defaultValue={'#fff'}
                        />
                      </Form.Item>
                      <span>{' < '}</span>
                      <Form.Item
                        className={styles.thresholds}
                        rules={[{ required: true }]}
                      >
                        <NumberInput name={'thresholds[0]'} defaultValue={0} />
                      </Form.Item>
                      <span>{' < '}</span>
                      <Form.Item className={styles.thresholds}>
                        <ColorSelector
                          defaultValue={'#fff'}
                          name={'colors[1]'}
                        />
                      </Form.Item>
                      <span>{' < '}</span>
                      <Form.Item
                        className={styles.thresholds}
                        rules={[{ required: true }]}
                      >
                        <NumberInput name={'thresholds[1]'} defaultValue={0} />
                      </Form.Item>
                      <span>{' < '}</span>
                      <Form.Item className={styles.thresholds}>
                        <ColorSelector
                          name={'colors[2]'}
                          defaultValue={'#fff'}
                        />
                      </Form.Item>
                    </div>
                  </Form.Item>
                </Column>
              </Columns>
            </div>
          )}
          {type === 'date' && (
            <div>
              <Columns>
                <Column>
                  <Form.Item
                    label={t('TIME_FORMAT')}
                    rules={[{ required: true }]}
                  >
                    <Select
                      name={'dateFormat'}
                      defaultValue={'YYYY/MM/DD HH:mm:ss'}
                      options={[
                        {
                          label: 'YYYY/MM/DD HH:mm:ss',
                          value: 'YYYY/MM/DD HH:mm:ss',
                        },
                      ]}
                    />
                  </Form.Item>
                </Column>
              </Columns>
            </div>
          )}
        </Form>
      </Modal>
    )
  }
}
