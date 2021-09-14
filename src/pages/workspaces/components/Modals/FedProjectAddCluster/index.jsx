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
import { Form, Select } from '@kube-design/components'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import { computed } from 'mobx'
import { Modal } from 'components/Base'
import { set, uniqBy, get } from 'lodash'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import styles from './index.scss'

export default class EditBasicInfoModal extends React.Component {
  clustersList = get(this.props.formTemplate, 'spec.placement.clusters', [])

  formTemplate = {}

  @computed
  get clusters() {
    const { clusters } = this.props

    return clusters.map(item => {
      const hasCluster = this.clustersList.some(
        _item => _item.name === item.name
      )

      return {
        label: item.name,
        value: item.name,
        cluster: item,
        disabled: !item.isReady || hasCluster,
      }
    })
  }

  @computed
  get enableAddCluster() {
    return this.clusters.every(item => item.disabled)
  }

  handleClusterChange = clusters => {
    set(this.formTemplate, 'clusters', uniqBy(clusters, 'name'))
  }

  valueRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" noStatus />
  )

  optionRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" theme="light" noStatus />
  )

  handleOk = data => {
    const { onOk, formTemplate } = this.props
    const newClusters = uniqBy([...this.clustersList, ...data.clusters], 'name')
    const annotations = get(formTemplate, 'metadata.annotations')

    const overrides = newClusters.map(cluster => ({
      clusterName: cluster.name,
      clusterOverrides: [{ path: '/metadata/annotations', value: annotations }],
    }))

    set(formTemplate, 'spec.placement.clusters', newClusters)
    set(formTemplate, 'spec.overrides', overrides)

    onOk(formTemplate)
  }

  render() {
    const { visible, isSubmitting, onCancel } = this.props

    return (
      <Modal.Form
        data={this.formTemplate}
        width={691}
        title={t('ADD_CLUSTER')}
        icon="enterprise"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <div className={styles.fedProClusterContainer}>
          <Form.Group>
            <Form.Item
              rules={[{ required: true, message: t('CLUSTER_EMPTY_DESC') }]}
              desc={
                this.enableAddCluster
                  ? t('FEDPROJECT_CANNOT_ADD_CLUSTER')
                  : null
              }
            >
              <ArrayInput
                name="clusters"
                addText={t('ADD_CLUSTER')}
                itemType="object"
                onChange={this.handleClusterChange}
              >
                <ObjectInput>
                  <Select
                    name="name"
                    placeholder=" "
                    options={this.clusters}
                    valueRenderer={this.valueRenderer}
                    optionRenderer={this.optionRenderer}
                  />
                </ObjectInput>
              </ArrayInput>
            </Form.Item>
          </Form.Group>
        </div>
      </Modal.Form>
    )
  }
}
