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

import { get, set, cloneDeep, isEmpty, uniqBy } from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './index.scss'

export default class VolumesMapper extends Component {
  state = {
    editVolumeTemplate: '',
  }

  showEdit = volumeTemplate => {
    const { onSelect, cluster } = this.props
    this.setState(
      {
        editVolumeTemplate: get(volumeTemplate, 'metadata.name'),
      },
      () => {
        onSelect(cluster)
      }
    )
  }

  handleEdit = ({ index, data }) => {
    const { cluster, formTemplate } = this.props
    const prefix = `spec.volumeClaimTemplates.${index}`
    const clusterOverrides = []
    Object.keys(data).forEach(key => {
      const path = `${prefix}.${key}`
      if (get(formTemplate, `spec.template.${path}`) !== data[key]) {
        clusterOverrides.push({
          path: `/${path.replace(/\./g, '/')}`,
          value: data[key],
        })
      }
    })

    const overrides = get(formTemplate, 'spec.overrides', [])
    const override = overrides.find(item => item.clusterName === cluster)
    if (override) {
      override.clusterOverrides = uniqBy(
        [...clusterOverrides, ...(override.clusterOverrides || [])],
        'path'
      )
    } else {
      overrides.push({ clusterName: cluster, clusterOverrides })
    }

    set(formTemplate, 'spec.overrides', overrides)

    this.setState({ editVolumeTemplate: '' })
  }

  getVolumeTemplate({ index, vt }) {
    const { cluster, formTemplate } = this.props
    const override =
      get(formTemplate, 'spec.overrides', []).find(
        item => item.clusterName === cluster
      ) || {}

    const volumeTemplate = cloneDeep(vt)

    const prefix = `/spec/volumeClaimTemplates/${index}/`

    if (override && !isEmpty(override.clusterOverrides)) {
      override.clusterOverrides.forEach(item => {
        if (item.path.startsWith(prefix)) {
          const subPath = item.path.replace(prefix, '').replace(/\//g, '.')
          set(volumeTemplate, subPath, item.value)
        }
      })
    }

    return volumeTemplate
  }

  renderVolumeTemplates = (vt, index) => {
    const { children, selected } = this.props
    const { editVolumeTemplate } = this.state

    const volumeTemplate = this.getVolumeTemplate({
      vt,
      index,
    })

    const name = get(vt, 'metadata.name')

    return (
      <div
        key={name}
        className={classNames(styles.wrapper, { [styles.selected]: selected })}
      >
        {children({
          ...this.props,
          index,
          key: index,
          formData: volumeTemplate,
          isEdit: editVolumeTemplate === name,
          showEdit: this.showEdit,
          onEdit: this.handleEdit,
        })}
      </div>
    )
  }

  render() {
    const { formTemplate } = this.props

    const vts = get(formTemplate, 'spec.template.spec.volumeClaimTemplates', [])

    return vts.map((vt, index) => this.renderVolumeTemplates(vt, index))
  }
}
