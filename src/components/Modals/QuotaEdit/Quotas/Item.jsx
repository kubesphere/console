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

import { Input, Select } from '@pitrix/lego-ui'
import { Button } from 'components/Base'
import { QUOTAS_MAP } from 'utils/constants'

import {
  RESERVED_MODULES,
  FEDERATED_PROJECT_UNSOPPORT_QUOTA,
} from './constants'

import styles from './index.scss'

export default class QuotaItem extends React.Component {
  get options() {
    const { filterModules = [], module } = this.props
    const filteredModules = [
      ...filterModules.filter(m => m !== module),
      ...RESERVED_MODULES,
    ]
    return Object.keys(QUOTAS_MAP)
      .filter(
        key =>
          !filteredModules.includes(key) &&
          (this.props.isFederated
            ? !FEDERATED_PROJECT_UNSOPPORT_QUOTA.includes(key)
            : true)
      )
      .map(key => ({
        label: t(key),
        value: key,
      }))
  }

  handleModuleChange = newModule => {
    const { module, onModuleChange } = this.props
    onModuleChange(newModule, module)
  }

  handleModuleDelete = () => {
    const { module, onModuleDelete } = this.props
    onModuleDelete(module)
  }

  render() {
    const { value, module, onChange, disableSelect } = this.props

    return (
      <div className={styles.item}>
        <Select
          value={module}
          disabled={disableSelect}
          options={this.options}
          onChange={this.handleModuleChange}
        />
        <Input
          className="margin-l12"
          value={value}
          placeholder={t(
            'You can limit the number of resources. Blank means no limit.'
          )}
          onChange={onChange}
        />
        <Button
          type="flat"
          icon="trash"
          className="margin-l12"
          onClick={this.handleModuleDelete}
          disabled={disableSelect}
        />
      </div>
    )
  }
}
