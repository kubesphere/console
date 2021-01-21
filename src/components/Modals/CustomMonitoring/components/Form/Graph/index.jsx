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

import { get } from 'lodash'
import {
  Form,
  Button,
  Select,
  Columns,
  Input,
  Column,
} from '@kube-design/components'
import { NumberInput } from 'components/Inputs'
import { unitTransformMap } from 'utils/monitoring'
import CustomArrayInput from 'components/Inputs/CustomArrayInput'

import GrafanaTargetInput from '../../FormInput/Template/GrafanaTargetInput'
import FormGroupCard from '../../FormGroupCard'
import ColumeInput from '../../FormInput/Template/ColumeInput'

import FormItemContainer from '../ItemContianer'
import Field from '../Field'

import styles from './index.scss'

const formatOpts = Object.keys(unitTransformMap).map(format => ({
  label: format,
  value: format,
}))

export default class Graph extends Component {
  render() {
    const { supportMetrics, labelsets, onLabelSearch } = this.props
    return (
      <div className={styles.wrapper}>
        <FormGroupCard label={t('Basic Info')}>
          <Form.Item>
            <Columns>
              <Column>
                <Form.Item>
                  <FormItemContainer name={'title'}>
                    {({ onChange, value }) => (
                      <Field label={t('GRAPH_NAME')}>
                        <Input value={value} onChange={onChange} />
                      </Field>
                    )}
                  </FormItemContainer>
                </Form.Item>
              </Column>
              <Column>
                <Form.Item>
                  <FormItemContainer name={'description'}>
                    {({ onChange, value }) => (
                      <Field label={t('Description')}>
                        <Input value={value} onChange={onChange} />
                      </Field>
                    )}
                  </FormItemContainer>
                </Form.Item>
              </Column>
            </Columns>
          </Form.Item>
        </FormGroupCard>

        <FormGroupCard label={t('Data')}>
          <Form.Item>
            <CustomArrayInput
              name="targets"
              header={({ add, value }) => (
                <ColumeInput
                  right={
                    <Button
                      type={'control'}
                      onClick={() =>
                        add({
                          step: get(value, '[0].step', ''),
                          legendFormat: '',
                          expr: '',
                          refId:
                            Math.max.apply(
                              null,
                              value.map(({ refId }) => refId)
                            ) + 1,
                        })
                      }
                    >
                      {t('Add')}
                    </Button>
                  }
                />
              )}
            >
              {({ formItemName, onDelete, onUpClick, onDownClick, index }) => (
                <GrafanaTargetInput
                  key={index}
                  onDelete={onDelete}
                  onUpClick={onUpClick}
                  onDownClick={onDownClick}
                  prefix={formItemName}
                  labelsets={labelsets}
                  onLabelSearch={onLabelSearch}
                  supportMetrics={supportMetrics}
                />
              )}
            </CustomArrayInput>
          </Form.Item>
        </FormGroupCard>

        <FormGroupCard label={t('Y_AXIS')}>
          <Columns>
            <Column>
              <Form.Item>
                <FormItemContainer name={'yaxes[0].format'} debounce={100}>
                  {({ onChange, value }) => (
                    <Field label={t('Unit')} tips={''}>
                      <Select
                        defaultValue={'none'}
                        options={formatOpts}
                        value={value}
                        onChange={onChange}
                      />
                    </Field>
                  )}
                </FormItemContainer>
              </Form.Item>
            </Column>
            <Column>
              <Form.Item>
                <FormItemContainer name={'yaxes[0].decimals'} debounce={100}>
                  {({ onChange, value }) => (
                    <Field label={t('DECIMALS')} tips={''}>
                      <NumberInput
                        defaultValue={0}
                        value={value}
                        max={5}
                        min={0}
                        onChange={onChange}
                      />
                    </Field>
                  )}
                </FormItemContainer>
              </Form.Item>
            </Column>
          </Columns>
        </FormGroupCard>
      </div>
    )
  }
}
