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
import CustomMonitorMetircQueryInput from 'components/Modals/CustomMonitoring/components/MetircQueryInput'

import styles from './index.scss'

export default function GrafanaTargetInput({
  prefix,
  onUpClick,
  onDownClick,
  onDelete,
  ...rest
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
              <FormItemContainer name={`${prefix}.legendFormat`} debounce={800}>
                {({ onChange, value }) => (
                  <div>
                    <Field label={t('METRIC_NAME')} tips={''}>
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
              <FormItemContainer name={`${prefix}.step`} debounce={500}>
                {({ onChange, value }) => (
                  <div>
                    <Field label={t('Interval')} tips={''}>
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
            <FormItemContainer name={`${prefix}.expr`} debounce={500}>
              {({ onChange, value }) => (
                <CustomMonitorMetircQueryInput
                  value={value}
                  onChange={onChange}
                  {...rest}
                />
              )}
            </FormItemContainer>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}
