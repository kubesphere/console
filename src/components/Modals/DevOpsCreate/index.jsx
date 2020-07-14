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
import { Columns, Column, Select, Input } from '@pitrix/lego-ui'
import { Modal, Form, TextArea } from 'components/Base'
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
      cluster: item,
      disabled: !item.isReady || !get(item, 'configz.devops', false),
    }))
  }

  get defaultCluster() {
    const clusters = this.workspaceStore.clusters.data
      .filter(item => item.isReady)
      .map(item => item.name)

    return isEmpty(clusters) ? undefined : clusters[0]
  }

  fetchClusters(params) {
    this.workspaceStore.fetchClusters({
      ...params,
      workspace: this.props.workspace,
    })
  }

  valueRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" noStatus />
  )

  optionRenderer = item => (
    <>
      <ClusterTitle
        cluster={item.cluster}
        size="small"
        theme="light"
        noStatus
      />
      {item.disabled && (
        <div className={styles.toolmessage}>
          <span>
            {!item.cluster.isReady ? t('Not Ready') : t('NO_DEVOPS_INSTALL')}
          </span>
        </div>
      )}
    </>
  )

  render() {
    const { visible, formTemplate, hideCluster, onOk, onCancel } = this.props
    return (
      <Modal.Form
        width={960}
        bodyClassName={styles.body}
        data={formTemplate}
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
        closable={false}
        hideHeader
      >
        <div className={styles.header}>
          <img src="/assets/project-create.svg" alt="" />
          <div className={styles.title}>
            <div>{t('Create DevOps Project')}</div>
            <p>{t('DEVOPS_PROJECT_CREATE_DESC')}</p>
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
            {!hideCluster && (
              <Column>
                <Form.Item
                  label={t('Cluster Settings')}
                  rules={[
                    { required: true, message: t('Please select a cluster') },
                  ]}
                >
                  <Select
                    name="spec.placement.cluster"
                    className={styles.cluster}
                    options={this.clusters}
                    valueRenderer={this.valueRenderer}
                    optionRenderer={this.optionRenderer}
                    defaultValue={this.defaultCluster}
                  />
                </Form.Item>
              </Column>
            )}
            <Column>
              <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
                <TextArea
                  maxLength={1000}
                  name="metadata.annotations['kubesphere.io/description']"
                />
              </Form.Item>
            </Column>
          </Columns>
        </div>
      </Modal.Form>
    )
  }
}
