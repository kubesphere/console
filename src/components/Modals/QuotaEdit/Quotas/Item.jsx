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

import { Button, Select } from '@kube-design/components'
import { NumberInput } from 'components/Inputs'
import { QUOTAS_MAP } from 'utils/constants'
import { debounce } from 'lodash'

import {
  RESERVED_MODULES,
  FEDERATED_PROJECT_UNSOPPORT_QUOTA,
} from './constants'

import styles from './index.scss'

export default class QuotaItem extends React.Component {
  state = {
    module: this.props.module,
  }

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
        label: key === 'volumes' ? t('Number of volumes') : t(key),
        value: key,
      }))
  }

  handleDebounceModuleChange = debounce((newModule, index) => {
    const { onModuleChange } = this.props
    onModuleChange(newModule, index)
  }, 400)

  handleModuleChange = (newModule, index) => {
    this.setState(
      {
        module: newModule,
      },
      () => {
        this.handleDebounceModuleChange(newModule, index)
      }
    )
  }

  handleModuleDelete = index => {
    const { onModuleDelete } = this.props
    onModuleDelete(index)
  }

  render() {
    const { value, onChange, disableSelect, index } = this.props

    return (
      <div className={styles.item}>
        <Select
          disabled={disableSelect}
          options={this.options}
          onChange={moduleValue => this.handleModuleChange(moduleValue, index)}
          value={this.state.module}
          searchable
        />
        <NumberInput
          className="margin-l12"
          value={value}
          placeholder={t(
            'You can limit the number of resources. Blank means no limit.'
          )}
          integer
          onChange={onChange}
        />
        <Button
          type="flat"
          icon="trash"
          className="margin-l12"
          onClick={() => this.handleModuleDelete(index)}
          disabled={disableSelect}
        />
      </div>
    )
  }
}
