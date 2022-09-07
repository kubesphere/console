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
import Table from 'components/Tables/Base'

import { isEmpty, get } from 'lodash'
import { Tooltip, Icon } from '@kube-design/components'

import { METER_RESOURCE_TITLE } from '../../constats'
import styles from './index.scss'

export default class MeterTable extends React.Component {
  renderTooltipContent = () => {
    return (
      <div className={styles.tooltipContent}>
        <h3>{t('TOTAL_CONSUMPTION_Q')}</h3>
        <p>{t('TOTAL_CONSUMPTION_A')}</p>
      </div>
    )
  }

  getColumns = () => {
    return [
      {
        title: t('RESOURCE_TYPE'),
        dataIndex: 'type',
        render: (value, record) => {
          return (
            <>
              <span
                style={{
                  background: record.color,
                }}
              />
              {t(
                METER_RESOURCE_TITLE[value].toUpperCase().replace(/\s+/g, '_')
              )}
            </>
          )
        },
      },
      {
        title: t('MAXIMUM_USAGE'),
        dataIndex: 'max_value',
        render: (value, record) => {
          return (
            <>
              {value} {get(record, 'unit.label', '-')}
            </>
          )
        },
      },
      {
        title: t('MINIMUM_USAGE'),
        dataIndex: 'min_value',
        render: (value, record) => {
          return (
            <>
              {value} {get(record, 'unit.label', '-')}
            </>
          )
        },
      },
      {
        title: t('AVERAGE_USAGE'),
        dataIndex: 'avg_value',
        render: (value, record) => {
          return (
            <>
              {value} {get(record, 'unit.label', '-')}
            </>
          )
        },
      },
      {
        title: (
          <div className={styles.question}>
            {t('TOTAL_CONSUMPTION')}
            <Tooltip content={this.renderTooltipContent()} placement="top">
              <Icon name="question" size={16} />
            </Tooltip>
          </div>
        ),
        dataIndex: 'sum_value',
        render: (value, record) => {
          return (
            <>
              {value} {get(record, 'unit.label', '-')}
            </>
          )
        },
      },
      ...(!isEmpty(this.props.priceConfig)
        ? [
            {
              title: `${t('PRICE')}`,
              dataIndex: 'fee',
              render: value => {
                const priceUint = this.props.priceConfig.currency
                  ? this.props.priceConfig.currency
                  : ' '

                return `${priceUint} ${parseFloat(value).toFixed(2)}`
              },
            },
          ]
        : []),
    ]
  }

  render() {
    const { data } = this.props

    return (
      <div className={styles.tableContainer}>
        <Table
          hideHeader
          hideFooter
          rowKey="type"
          data={data}
          loading={isEmpty(data)}
          columns={this.getColumns()}
        />
      </div>
    )
  }
}
