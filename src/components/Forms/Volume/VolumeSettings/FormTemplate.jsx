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

import { get, isNaN, unset, pick } from 'lodash'
import React from 'react'
import { toJS } from 'mobx'

import { PropTypes } from 'prop-types'
import { safeParseJSON } from 'utils'
import { ACCESS_MODES } from 'utils/constants'
import { Form, Slider, Select } from '@kube-design/components'
import { AccessModes } from 'components/Inputs'

import StorageClassStore from 'stores/storageClass'

const STORAGE_CLASSES_KEY = 'spec.storageClassName'
const ACCESSMODE_KEY = 'spec.accessModes[0]'

export default class VolumeSettings extends React.Component {
  static contextTypes = {
    formData: PropTypes.object,
  }

  constructor(props) {
    super(props)

    this.store = new StorageClassStore()

    this.state = {
      storageClasses: [],
      storageClass: {},
      isLoading: false,
    }
  }

  componentDidMount() {
    this.updateStorageClass()
  }

  updateStorageClass = (params = {}) => {
    this.setState({ isLoading: true })

    const { formData } = this.context
    const storageClasses = get(formData, STORAGE_CLASSES_KEY)

    return this.store
      .fetchList({ ...params, cluster: this.props.cluster })
      .then(() => {
        const data = toJS(this.store.list.data)

        this.setState({
          storageClasses: toJS(this.store.list.data),
          storageClass:
            data.find(item => storageClasses === item.name) ||
            data.find(item => item.default) ||
            {},
          isLoading: false,
        })
      })
  }

  getSliderProps(storageClass) {
    const props = {
      min: 0,
      max: 2048,
      defaultValue: '10Gi',
      step: 1,
      unit: 'Gi',
    }

    const min = Number(get(storageClass, 'parameters.minSize'))
    const max = Number(get(storageClass, 'parameters.maxSize'))
    const step = Number(get(storageClass, 'parameters.stepSize'))

    if (!isNaN(min)) {
      props.min = min
    }

    if (!isNaN(max)) {
      props.max = max
    }

    if (!isNaN(step)) {
      props.step = step
    }

    const MARK_COUNT = 5

    const total = props.max / props.step - props.min / props.step
    const MARK_STEP = total / (MARK_COUNT - 1)
    const marks = {}
    for (let i = 0; i < MARK_COUNT - 1; i++) {
      const value = Math.floor(MARK_STEP * i) * props.step + props.min
      marks[value] = value === 0 ? '0' : `${value}Gi`
    }

    marks[props.max] = `${props.max}Gi`

    props.marks = marks

    return props
  }

  getStorageClasses = () => {
    const { storageClasses } = this.state

    return storageClasses.map(item => ({
      label: item.name,
      value: item.name,
    }))
  }

  getSupportedAccessModes = () => {
    const { storageClass } = this.state

    if (storageClass) {
      return safeParseJSON(
        get(
          storageClass,
          'annotations["storageclass.kubesphere.io/supported-access-modes"]',
          ''
        )
      )
    }

    return null
  }

  handleStorageClassChange = value => {
    const { storageClasses } = this.state

    const newStorageClass =
      storageClasses.find(item => item.name === value) || {}

    unset(this.context.formData, ACCESSMODE_KEY)

    this.setState({ storageClass: newStorageClass })
  }

  sizeValidator = (rule, value, callback) => {
    if (parseInt(value, 10) <= 0) {
      return callback({
        message: t('The volume size must be greater than zero'),
        field: rule.field,
      })
    }

    return callback()
  }

  render() {
    const { storageClass, isLoading } = this.state

    const storageClasses = this.getStorageClasses()
    const supportedAccessModes = this.getSupportedAccessModes()
    const storageClassesList = this.store.list || {}

    return (
      <>
        <Form.Item
          label={t('Storage Class')}
          desc={t('VOLUME_STORAGE_CLASS_DESC')}
          rules={[{ required: true, message: t('This param is required') }]}
        >
          <Select
            name={STORAGE_CLASSES_KEY}
            defaultValue={storageClass.name}
            pagination={pick(storageClassesList, ['page', 'limit', 'total'])}
            isLoading={storageClassesList.isLoading}
            onChange={this.handleStorageClassChange}
            options={storageClasses}
            onFetch={this.updateStorageClass}
            searchable
            clearable
          />
        </Form.Item>
        <Form.Item
          label={t('Access Mode')}
          rules={[{ required: true, message: t('This param is required') }]}
        >
          <AccessModes
            name={ACCESSMODE_KEY}
            defaultValue={
              get(supportedAccessModes, '[0]') || Object.keys(ACCESS_MODES)[0]
            }
            supportedAccessModes={supportedAccessModes}
            loading={isLoading}
          />
        </Form.Item>
        <Form.Item
          label={t('Volume Capacity')}
          rules={[{ validator: this.sizeValidator }]}
        >
          <Slider
            name="spec.resources.requests.storage"
            {...this.getSliderProps(storageClass)}
            withInput
          />
        </Form.Item>
      </>
    )
  }
}
