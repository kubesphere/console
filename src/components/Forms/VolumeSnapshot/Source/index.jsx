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
import { get, pick } from 'lodash'
import { Form, Select } from '@kube-design/components'
import { MODULE_KIND_MAP } from 'utils/constants'
import ProjectStore from 'stores/project'
import VolumeStore from 'stores/volume'

export default class Source extends React.Component {
  state = {
    namespaces: { data: [] },
    volumes: { data: [] },
  }

  namespaceStore = new ProjectStore()

  volumeStore = new VolumeStore()

  get namespaceOpts() {
    const { namespaces } = this.state
    return namespaces.data.map(namespace => ({
      label: namespace.name,
      value: namespace.name,
    }))
  }

  get volumesOpts() {
    const { volumes } = this.state
    return volumes.data.map(volume => ({
      label: volume.name,
      value: volume.name,
      rest: volume,
    }))
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  async componentDidMount() {
    await this.namespaceStore.fetchList()
    const { list: namespaces } = this.namespaceStore
    this.setState({
      namespaces,
    })
    const firstNS = get(namespaces, 'data[0].name')
    const selectNS = get(this.formTemplate, 'meta.namespace', firstNS)

    if (selectNS) {
      await this.volumeStore.fetchList({ namespace: selectNS })
      const { list: volumes } = this.volumeStore
      this.setState({
        volumes,
      })
    }
  }

  handleNamespaceChange = async namespace => {
    await this.volumeStore.fetchList({ namespace })
    const { list: volumes } = this.volumeStore
    this.setState({
      volumes,
    })
  }

  render() {
    const { formRef } = this.props
    const { namespaces, volumes } = this.state
    const defaultValue = get(namespaces, 'data[0].name')
    const defaultVolume = get(volumes, 'data[0].name')
    const defaultStorageClass = get(volumes, 'data[0].storageClassName')

    return (
      <div>
        <Form data={this.formTemplate} ref={formRef}>
          <Form.Item
            label={t('PROJECT')}
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
          >
            <Select
              name={'metadata.namespace'}
              defaultValue={defaultValue}
              pagination={pick(namespaces, ['page', 'limit', 'total'])}
              isLoading={namespaces.isLoading}
              options={this.namespaceOpts}
              onChange={this.handleNamespaceChange}
              onFetch={this.updateNamespace}
              searchable
              clearable
            />
          </Form.Item>

          <Form.Item
            label={t('PERSISTENT_VOLUME_CLAIM')}
            rules={[{ required: true, message: t('PARAM_REQUIRED') }]}
          >
            <Select
              name={'spec.source.name'}
              defaultValue={defaultVolume}
              pagination={pick(volumes, ['page', 'limit', 'total'])}
              isLoading={volumes.isLoading}
              options={this.volumesOpts}
              onChange={this.handleVolumeChange}
              onFetch={this.updateStorageClass}
              searchable
              clearable
            />
          </Form.Item>

          <Form.Item>
            <input
              type="input"
              defaultValue={defaultStorageClass}
              name={'spec.snapshotClassName'}
            />
          </Form.Item>
        </Form>
      </div>
    )
  }
}
