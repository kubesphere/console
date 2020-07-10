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
import { observer } from 'mobx-react'
import { get, set, uniqBy } from 'lodash'
import PropTypes from 'prop-types'
import { Columns, Column, Select, Input, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { PATTERN_SERVICE_NAME, PATTERN_LENGTH_63 } from 'utils/constants'

import { computed } from 'mobx'
import styles from './index.scss'

@observer
export default class FedProjectCreateModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    clusters: PropTypes.array,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    formTemplate: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = props.store

    this.clusterRef = React.createRef()
  }

  get networkOptions() {
    return [
      { label: t('Off'), value: '' },
      { label: t('On'), value: 'enabled' },
    ]
  }

  @computed
  get clusters() {
    return this.props.clusters.map(item => ({
      label: item.name,
      value: item.name,
      cluster: item,
      disabled: !item.isReady,
    }))
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { cluster } = this.props
    this.store.checkName({ name: value, cluster }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  multiClusterValidator = async (rule, value, callback) => {
    const name = get(this.props.formTemplate, 'metadata.name')

    if (!value || !name) {
      return callback()
    }

    if (value.length > 1) {
      const resp = await this.store.checkName({ name })
      if (resp.exist) {
        return callback({
          message: t('Project name exists on host cluster'),
          field: rule.field,
        })
      }
    }

    const resps = await Promise.all([
      ...value.map(cluster =>
        this.store.checkName({ name, cluster: cluster.name })
      ),
    ])

    const index = resps.findIndex(item => item.exist)

    if (index > -1 && value[index]) {
      return callback({
        message: t('NAME_EXIST_IN_CLUSTER', { cluster: value[index].name }),
        field: rule.field,
      })
    }

    callback()
  }

  valueRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" noStatus />
  )

  optionRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" theme="light" noStatus />
  )

  handleClusterChange = clusters => {
    set(
      this.props.formTemplate,
      'spec.placement.clusters',
      uniqBy(clusters, 'name')
    )
  }

  handleNameChange = () => {
    if (this.clusterRef.current && this.clusterRef.current.state.error) {
      const name = 'spec.placement.clusters'
      this.clusterRef.current.validate({
        [name]: get(this.props.formTemplate, name),
      })
    }
  }

  renderClusters() {
    return (
      <Form.Group
        label={t('Cluster Settings')}
        desc={t('PROJECT_CLUSTER_SETTINGS_DESC')}
      >
        <Form.Item
          ref={this.clusterRef}
          rules={[
            { required: true, message: t('Please select a cluster') },
            { validator: this.multiClusterValidator },
          ]}
        >
          <ArrayInput
            name="spec.placement.clusters"
            addText={t('Add Cluster')}
            itemType="object"
            onChange={this.handleClusterChange}
          >
            <ObjectInput>
              <Select
                name="name"
                className={styles.cluster}
                options={this.clusters}
                valueRenderer={this.valueRenderer}
                optionRenderer={this.optionRenderer}
              />
            </ObjectInput>
          </ArrayInput>
        </Form.Item>
      </Form.Group>
    )
  }

  render() {
    const { visible, formTemplate, onOk, onCancel, isSubmitting } = this.props
    return (
      <Modal.Form
        width={960}
        bodyClassName={styles.body}
        data={formTemplate}
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
        closable={false}
        isSubmitting={isSubmitting}
        hideHeader
      >
        <div className={styles.header}>
          <img src="/assets/project-create.svg" alt="" />
          <div className={styles.title}>
            <div>{t('Create Multi-cluster Project')}</div>
            <p>{t('MULTI_CLUSTER_PROJECT_CREATE_DESC')}</p>
          </div>
        </div>
        <div className={styles.content}>
          <Columns>
            <Column>
              <Form.Item
                label={t('Name')}
                desc={t('SERVICE_NAME_DESC')}
                rules={[
                  { required: true, message: t('Please input name') },
                  {
                    pattern: PATTERN_SERVICE_NAME,
                    message: `${t('Invalid name')}, ${t('SERVICE_NAME_DESC')}`,
                  },
                  { pattern: PATTERN_LENGTH_63, message: t('NAME_TOO_LONG') },
                ]}
              >
                <Input
                  name="metadata.name"
                  autoFocus={true}
                  onChange={this.handleNameChange}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Alias')} desc={t('ALIAS_DESC')}>
                <Input name="metadata.annotations['kubesphere.io/alias-name']" />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item
                label={t('Network Isolation')}
                desc={t('NETWORK_ISOLATED_DESC')}
              >
                <Select
                  name="metadata.annotations['kubesphere.io/network-isolate']"
                  options={this.networkOptions}
                  defaultValue={
                    globals.config.defaultNetworkIsolation ? 'enabled' : ''
                  }
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Description')}>
                <TextArea name="metadata.annotations['kubesphere.io/description']" />
              </Form.Item>
            </Column>
          </Columns>
          {this.renderClusters()}
        </div>
      </Modal.Form>
    )
  }
}
