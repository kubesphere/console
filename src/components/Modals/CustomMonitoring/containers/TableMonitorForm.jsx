/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 * * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
* KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
  You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'

import { Form, Button } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'

import CustomArrayInput from 'components/Inputs/CustomArrayInput'
import EditMonitorFormLayou from '../components/EditMonitorFormLayout'
import { GraphTextInput } from '../components/FormInput'
// import { SingleStatGraph } from '../components/Graph'
import FormGroupCard from '../components/FormGroupCard'
import GrafanaTargetInput from '../components/FormInput/Template/GrafanaTargetInput'
import TableColumnInput from '../components/FormInput/Template/TableColumnInput'
import ColumeInput from '../components/FormInput/Template/ColumeInput'
import FormItemContainer from '../components/Form/ItemContianer'
import Field from '../components/Form/Field'

@inject('monitoringStore')
@observer
export default class TableMonitorForm extends Component {
  @computed
  get monitor() {
    return this.props.monitor
  }

  render() {
    return (
      <EditMonitorFormLayou
        preview={<div />}
        sidebar={<GraphTextInput type={'table'} />}
        main={
          <>
            <FormGroupCard label={t('DATA')}>
              <Form.Item>
                <CustomArrayInput
                  name="targets"
                  header={({ onAdd }) => (
                    <ColumeInput
                      right={
                        <Button type={'control'} onClick={onAdd}>
                          {t('ADD')}
                        </Button>
                      }
                    />
                  )}
                >
                  {({ formItemName, onDelete, onUpClick, onDownClick }) => (
                    <GrafanaTargetInput
                      onDelete={onDelete}
                      onUpClick={onUpClick}
                      onDownClick={onDownClick}
                      prefix={formItemName}
                    />
                  )}
                </CustomArrayInput>
              </Form.Item>
            </FormGroupCard>
            <FormGroupCard label={t('TABLE_SETTINGS')}>
              <Form.Item>
                <CustomArrayInput
                  name="styles"
                  header={({ onAdd }) => (
                    <ColumeInput
                      left={
                        <Form.Item>
                          <FormItemContainer name={`expr`}>
                            {({ onChange, value }) => (
                              <div>
                                <Field label={t('PER_PAGE_LINES')} tips={''}>
                                  <NumberInput
                                    value={value}
                                    onChange={onChange}
                                    defaultValue={100}
                                  />
                                </Field>
                              </div>
                            )}
                          </FormItemContainer>
                        </Form.Item>
                      }
                      right={
                        <Button type={'control'} onClick={onAdd}>
                          {t('ADD')}
                        </Button>
                      }
                    />
                  )}
                >
                  {({ formItemName, onDelete, onUpClick, onDownClick }) => (
                    <TableColumnInput
                      onDelete={onDelete}
                      onUpClick={onUpClick}
                      onDownClick={onDownClick}
                      prefix={formItemName}
                    />
                  )}
                </CustomArrayInput>
              </Form.Item>
            </FormGroupCard>
          </>
        }
      />
    )
  }
}
