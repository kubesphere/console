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
import { isFunction } from 'lodash'
import { Icon } from '@kube-design/components'
import { toJS } from 'mobx'
import TableColumnStyleModal from '../../TableColumnStyleModal'

import styles from './index.scss'

export default class TableColumnInput extends React.Component {
  state = {
    shouldInputModalShow: false,
  }

  handleCustomClick = () => {
    this.setState({ shouldInputModalShow: true })
  }

  handleCustomColseClick = () => {
    this.setState({ shouldInputModalShow: false })
  }

  handleModalSubmit = value => {
    this.setState({ shouldInputModalShow: false })
    this.props.onChange(value)
  }

  render() {
    const { shouldInputModalShow } = this.state
    const { value } = this.props
    return (
      <div>
        <div className={styles.wrapper}>
          <div>{this.renderItems()}</div>
          <div onClick={this.handleCustomClick}>
            <span className={styles.button}>
              <Icon name={'pen'} />
              {t('DISPLAY_FORMAT')}
            </span>
          </div>
        </div>
        <TableColumnStyleModal
          data={toJS(value)}
          visible={shouldInputModalShow}
          onCancel={this.handleCustomColseClick}
          onOk={this.handleModalSubmit}
        />
      </div>
    )
  }

  renderItems() {
    const { value: formData } = this.props
    const items = [
      {
        key: 'type',
        label: t('TYPE'),
      },
      {
        key: 'unit',
        label: t('UNIT'),
        visible(value, fileds) {
          return fileds.type === 'number'
        },
      },
      {
        key: 'dateFormat',
        label: t('TIME_FORMAT'),
        visible(value, fileds) {
          return fileds.type === 'date'
        },
      },
      {
        key: 'decimals',
        label: t('DECIMALS'),
        visible(value, fileds) {
          return fileds.type === 'number'
        },
      },
      {
        key: 'colorMode',
        label: value => `t('THRESHOLD_FILL') (${value})`,
        visible(value, fields) {
          return fields.type === 'number' && value !== 'disabled'
        },
        value(value, fileds) {
          return (
            <>
              <span
                className={styles.colorCycle}
                style={{ backgroundColor: fileds.colors[0] }}
              />
              <span>{'<'}</span>
              <span>{fileds.thresholds[0]}</span>
              <span>{'<'}</span>
              <span
                className={styles.colorCycle}
                style={{ backgroundColor: fileds.colors[1] }}
              />
              <span>{'<'}</span>
              <span>{fileds.thresholds[1]}</span>
              <span>{'<'}</span>
              <span
                className={styles.colorCycle}
                style={{ backgroundColor: fileds.colors[2] }}
              />
            </>
          )
        },
      },
    ]

    return items.map(item => {
      if (
        isFunction(item.visible) &&
        !item.visible(formData[item.key], formData)
      ) {
        return false
      }

      const itemValue = isFunction(item.value)
        ? item.value(formData[item.key], formData)
        : formData[item.key]

      if (!itemValue) {
        return false
      }

      const itemLabel = isFunction(item.label)
        ? item.label(formData[item.key], formData)
        : item.label

      return (
        <span key={item.key} className={styles.item}>
          {itemLabel}: {itemValue}
        </span>
      )
    })
  }
}
