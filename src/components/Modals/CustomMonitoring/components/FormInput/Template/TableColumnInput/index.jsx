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
import { Form, Icon, Input } from '@kube-design/components'
import FormItemContainer from 'components/Modals/CustomMonitoring/components/Form/ItemContianer'
import Field from 'components/Modals/CustomMonitoring/components/Form/Field'
import TableColumnStyle from '../../TableColumnStyle'

import styles from './index.scss'

export default function TableColumnInput({
  prefix,
  onUpClick,
  onDownClick,
  onDelete,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sort}>
        <Icon name={'sort-ascending'} onClick={onUpClick} />
        <Icon name={'sort-descending'} onClick={onDownClick} />
      </div>
      <div className={styles.form}>
        <div className={styles.firstLine}>
          <div>
            <Form.Item className={styles.name}>
              <FormItemContainer name={`${prefix}.alias`}>
                {({ onChange, value }) => (
                  <div>
                    <Field label={t('COLUMN_NAME')} tips={''}>
                      <Input
                        className={styles.input}
                        value={value}
                        onChange={onChange}
                      />
                    </Field>
                  </div>
                )}
              </FormItemContainer>
            </Form.Item>
            <Form.Item className={styles.interval}>
              <FormItemContainer name={`${prefix}.pattern`}>
                {({ onChange, value }) => (
                  <div>
                    <Field label={t('FIELD_NAME')} tips={''}>
                      <Input
                        className={styles.input}
                        value={value}
                        onChange={onChange}
                      />
                    </Field>
                  </div>
                )}
              </FormItemContainer>
            </Form.Item>
          </div>
          <Icon name={'trash'} onClick={onDelete} />
        </div>

        <div className={styles.exprInput}>
          <Form.Item>
            <FormItemContainer name={`${prefix}`}>
              {({ onChange, value }) => (
                <Field label={t('DISPLAY_FORMAT')} tips={''}>
                  <TableColumnStyle
                    value={value}
                    onChange={newValue => onChange({ ...value, ...newValue })}
                  />
                </Field>
              )}
            </FormItemContainer>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
