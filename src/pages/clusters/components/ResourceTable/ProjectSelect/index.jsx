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
import { observer } from 'mobx-react'
import { Icon } from '@pitrix/lego-ui'
import { SearchSelect } from 'components/Base'

import styles from './index.scss'

@observer
export default class ProjectSelect extends Component {
  getProjects() {
    return [
      ...this.props.list.data.map(item => ({
        label: item.name,
        value: item.name,
        isFedManaged: item.isFedManaged,
      })),
    ]
  }

  optionRenderer = option => (
    <span className={styles.option}>
      {option.isFedManaged ? (
        <img className={styles.indicator} src="/assets/cluster.svg" />
      ) : (
        <Icon name="project" />
      )}
      {option.label}
    </span>
  )

  render() {
    const { namespace = '', list, onChange, onFetch } = this.props

    return (
      <SearchSelect
        className={styles.select}
        value={namespace}
        onChange={onChange}
        options={this.getProjects()}
        page={list.page}
        total={list.total}
        currentLength={list.data.length}
        isLoading={list.isLoading}
        valueRenderer={this.optionRenderer}
        optionRenderer={this.optionRenderer}
        onFetch={onFetch}
        placeholder={t('All Projects')}
      />
    )
  }
}
