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
import { Columns, Column, Form } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'

export default memo(function ProbeConfig({ probType }) {
  return (
    <>
      <Columns>
        <Column>
          <Form.Item
            label={t('INITIAL_DELAY_S')}
            desc={t('INITIAL_DELAY_DESC')}
          >
            <NumberInput
              name="initialDelaySeconds"
              defaultValue={0}
              min={0}
              integer
            />
          </Form.Item>
        </Column>
        <Column>
          <Form.Item
            label={t('TIMEOUT_PERIOD_S')}
            desc={t('TIMEOUT_PERIOD_DESC')}
          >
            <NumberInput
              name="timeoutSeconds"
              defaultValue={1}
              min={1}
              integer
            />
          </Form.Item>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Form.Item
            label={t('CHECK_INTERVAL_S')}
            desc={t('CHECK_INTERVAL_DESC')}
          >
            <NumberInput
              name="periodSeconds"
              defaultValue={10}
              min={1}
              integer
            />
          </Form.Item>
        </Column>
        <Column>
          <Form.Item
            label={t('SUCCESS_THRESHOLD')}
            desc={t('SUCCESS_THRESHOLD_DESC')}
          >
            <NumberInput
              name="successThreshold"
              defaultValue={1}
              min={1}
              readOnly={['livenessProbe', 'startupProbe'].includes(probType)}
              integer
            />
          </Form.Item>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Form.Item
            label={t('FAILURE_THRESHOLD')}
            desc={t('FAILURE_THRESHOLD_DESC')}
          >
            <NumberInput
              name="failureThreshold"
              defaultValue={3}
              min={1}
              integer
            />
          </Form.Item>
        </Column>
        <Column />
      </Columns>
    </>
  )
})
