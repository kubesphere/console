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
import { get, isEmpty } from 'lodash'

import { Checkbox, Tag, Notify } from '@kube-design/components'
import { Text } from 'components/Base'

import styles from './index.scss'

export default class CheckItem extends Component {
  handleCheck = () => {
    const { roleTemplates, roleTemplatesMap, data, onChange } = this.props

    let newTemplates = [...roleTemplates]
    if (newTemplates.includes(data.name)) {
      const relateTemplates = newTemplates.filter(
        template =>
          template !== data.name &&
          this.getDependencies([template]).includes(data.name)
      )
      if (relateTemplates.length === 0) {
        newTemplates = newTemplates.filter(item => item !== data.name)
      } else {
        Notify.warning(
          t('DESELECT_RESOURCE_FIRST', {
            resource: relateTemplates
              .map(rt =>
                t(
                  `PERMISSION_${get(roleTemplatesMap, `[${rt}].aliasName`)
                    .toUpperCase()
                    .replace(/[^A-Z]+/g, '_')}`
                )
              )
              .join('/'),
          })
        )
      }
    } else {
      newTemplates.push(data.name)
    }

    onChange([...newTemplates, ...this.getDependencies(newTemplates)])
  }

  getDependencies = names => {
    const { roleTemplatesMap } = this.props
    const dependencies = []

    if (isEmpty(names)) {
      return dependencies
    }

    names.forEach(name => {
      const template = roleTemplatesMap[name]
      if (template && template.dependencies) {
        template.dependencies.forEach(dep => {
          if (!names.includes(dep) && !dependencies.includes(dep)) {
            dependencies.push(dep)
          }
        })
      }
    })

    if (dependencies.length > 0) {
      dependencies.push(...this.getDependencies(dependencies))
    }

    return dependencies
  }

  render() {
    const { roleTemplates, roleTemplatesMap, data } = this.props
    const dependencies =
      data.dependencies.length > 0
        ? data.dependencies
            .map(item => {
              const aliasName = get(roleTemplatesMap, `[${item}].aliasName`)
              return aliasName
                ? aliasName.toUpperCase().replace(/[^A-Z]+/g, '_')
                : undefined
            })
            .filter(item => item !== undefined)
        : []

    return (
      <div className={styles.checkItem}>
        <Checkbox
          checked={roleTemplates.includes(data.name)}
          onClick={this.handleCheck}
        />
        <Text
          title={t(
            `PERMISSION_${data.aliasName
              .toUpperCase()
              .replace(/[^A-Z]+/g, '_')}`
          )}
          onClick={this.handleCheck}
          description={t(
            `PERMISSION_${data.aliasName
              .toUpperCase()
              .replace(/[^A-Z]+/g, '_')}_DESC`
          )}
        />
        {dependencies.length > 0 && (
          <div className={styles.extra}>
            {t('DEPENDS_ON')}
            {dependencies.map(aliasName => (
              <Tag className={styles.tag} type="info" key={aliasName}>
                {t(`PERMISSION_${aliasName}`)}
              </Tag>
            ))}
          </div>
        )}
      </div>
    )
  }
}
