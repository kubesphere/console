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
import { isEmpty } from 'lodash'
import {
  Dropdown,
  Buttons,
  Level,
  LevelItem,
  LevelRight,
} from '@pitrix/lego-ui'
import { Button, Select } from 'components/Base'
import BaseTable from 'components/Tables/Base'

export default class S2iTable extends BaseTable {
  renderNormalTitle() {
    const { hideCustom } = this.props

    return (
      <Level>
        <LevelItem>{this.renderSearch()}</LevelItem>
        <LevelRight>
          <Buttons>
            <Button type="flat" icon="refresh" onClick={this.handleRefresh} />
            {!hideCustom && (
              <Dropdown
                content={this.renderColumnsMenu()}
                placement="bottomRight"
              >
                <Button type="flat" icon="cogwheel" />
              </Dropdown>
            )}
            {this.renderSort()}
          </Buttons>
        </LevelRight>
      </Level>
    )
  }

  handleSort = sortType => {
    const { params, filters } = this.props

    this.props.onFetch({ ...filters, ...params, ...{ order: sortType } })
  }

  renderSort() {
    const { sortTypes, order } = this.props
    if (isEmpty(sortTypes)) {
      return
    }
    const options = sortTypes.map(sortType => ({
      label: t('SORT_BY', { name: t(sortType) }),
      value: sortType,
    }))

    return (
      <Select onChange={this.handleSort} value={order || 'name'}>
        {options.map(item => (
          <Select.Option
            key={item.value}
            value={item.value}
            text={item.label}
          />
        ))}
      </Select>
    )
  }
}
