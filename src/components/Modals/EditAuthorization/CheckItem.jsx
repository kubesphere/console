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

import { Checkbox } from '@pitrix/lego-ui'
import { Text, Tag } from 'components/Base'

import styles from './index.scss'

export default class CheckItem extends Component {
  handleCheck = () => {
    const { roleTemplates, data, onChange } = this.props

    let newTemplates = [...roleTemplates]

    if (newTemplates.includes(data.name)) {
      newTemplates = newTemplates.filter(item => item !== data.name)
    } else {
      newTemplates.push(data.name, ...data.dependencies)
    }

    onChange(newTemplates)
  }

  handleCheckboxClick = e => e.stopPropagation()

  render() {
    const { roleTemplates, roleTemplatesMap, data } = this.props
    return (
      <div className={styles.checkItem} onClick={this.handleCheck}>
        <Checkbox
          checked={roleTemplates.includes(data.name)}
          onClick={this.handleCheckboxClick}
        />
        <Text
          title={t(data.aliasName)}
          description={t(
            `${data.aliasName.toUpperCase().replace(/\s+/g, '_')}_DESC`
          )}
        />
        {data.dependencies.length > 0 && (
          <div className={styles.extra}>
            {t('Depend on')}:{' '}
            {data.dependencies.map(item => (
              <Tag type="info" key={item}>
                {t(roleTemplatesMap[item].aliasName)}
              </Tag>
            ))}
          </div>
        )}
      </div>
    )
  }
}
