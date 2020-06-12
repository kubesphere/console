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
import { get, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { Columns, Column, Select, Input, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { PATTERN_SERVICE_NAME, PATTERN_LENGTH_63 } from 'utils/constants'

import WorkspaceStore from 'stores/workspace'

import styles from './index.scss'

@observer
export default class ProjectCreateModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
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
    this.workspaceStore = new WorkspaceStore()
  }

  componentDidMount() {
    const { hideCluster } = this.props
    if (!hideCluster) {
      this.fetchClusters()
    }
  }

  get networkOptions() {
    return [
      { label: t('Off'), value: '' },
      { label: t('On'), value: 'enabled' },
    ]
  }

  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
      provider: item.provider,
      group: item.group,
      name: item.name,
    }))
  }

  get defaultClusters() {
    const clusters = this.workspaceStore.clusters.data
      .filter(item => item.isHost)
      .map(item => ({ name: item.name }))

    return isEmpty(clusters) ? undefined : clusters
  }

  fetchClusters(params) {
    this.workspaceStore.fetchClusters({
      ...params,
      workspace: this.props.workspace,
    })
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { cluster } = this.props
    this.props.store.checkName({ name: value, cluster }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  multiClusterNameValidator = async (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const clusters = get(this.props.formTemplate, 'spec.placement.clusters', [])

    const resps = await Promise.all(
      clusters.map(cluster =>
        this.store.checkName({ name: value, cluster: cluster.name })
      )
    )

    const index = resps.findIndex(item => item.exist)

    if (index > -1) {
      return callback({
        message: t('NAME_EXIST_IN_CLUSTER', { cluster: clusters[index].name }),
        field: rule.field,
      })
    }
    callback()
  }

  valueRenderer = item => <ClusterTitle cluster={item} size="small" noStatus />

  optionRenderer = item => (
    <ClusterTitle cluster={item} size="small" theme="light" noStatus />
  )

  render() {
    const {
      visible,
      formTemplate,
      hideCluster,
      onOk,
      onCancel,
      isSubmitting,
    } = this.props
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
            <div>{t('Create Project')}</div>
            <p>{t('PROJECT_CREATE_DESC')}</p>
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
                  {
                    validator: hideCluster
                      ? this.nameValidator
                      : this.multiClusterNameValidator,
                  },
                ]}
              >
                <Input name="metadata.name" autoFocus={true} />
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
                  defaultValue=""
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item label={t('Description')}>
                <TextArea name="metadata.annotations['kubesphere.io/description']" />
              </Form.Item>
            </Column>
          </Columns>
          {!hideCluster && (
            <Form.Group
              label={t('Cluster Settings')}
              desc={t('PROJECT_CLUSTER_SETTINGS_DESC')}
            >
              <Form.Item
                rules={[
                  { required: true, message: t('Please select a cluster') },
                ]}
              >
                <ArrayInput
                  name="spec.placement.clusters"
                  addText={t('Add Cluster')}
                  itemType="object"
                  defaultValue={this.defaultClusters}
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
          )}
        </div>
      </Modal.Form>
    )
  }
}
