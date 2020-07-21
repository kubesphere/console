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
import { PATTERN_SERVICE_NAME } from 'utils/constants'

import WorkspaceStore from 'stores/workspace'

import { computed } from 'mobx'
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

    this.formRef = React.createRef()
    this.clusterRef = React.createRef()
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

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => ({
      label: item.name,
      value: item.name,
      cluster: item,
      disabled: !item.isReady,
    }))
  }

  @computed
  get defaultClusters() {
    const clusters = this.workspaceStore.clusters.data
      .filter(item => item.isReady)
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
    this.store.checkName({ name: value, cluster }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  singleClusterValidator = (rule, value, callback) => {
    const name = get(this.props.formTemplate, 'metadata.name')

    if (!value || !name) {
      return callback()
    }

    this.store.checkName({ name, cluster: value }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  handleNameChange = () => {
    if (this.clusterRef && this.clusterRef.current) {
      if (
        this.formRef &&
        this.formRef.current &&
        !isEmpty(this.formRef.current.state.errors)
      ) {
        this.formRef.current.resetValidateResults('cluster')
      }
      if (this.clusterRef.current.state.error) {
        this.clusterRef.current.validate({
          cluster: get(this.props.formTemplate, 'cluster'),
        })
      }
    }
  }

  valueRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" noStatus />
  )

  optionRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" theme="light" noStatus />
  )

  renderClusters() {
    return (
      <Form.Group
        label={t('Cluster Settings')}
        desc={t('Select the cluster to create the project.')}
      >
        <Form.Item
          ref={this.clusterRef}
          rules={[
            { required: true, message: t('Please select a cluster') },
            { validator: this.singleClusterValidator },
          ]}
        >
          <Select
            name="cluster"
            className={styles.cluster}
            options={this.clusters}
            valueRenderer={this.valueRenderer}
            optionRenderer={this.optionRenderer}
          />
        </Form.Item>
      </Form.Group>
    )
  }

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
        formRef={this.formRef}
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
                  {
                    validator: hideCluster ? this.nameValidator : null,
                  },
                ]}
              >
                <Input
                  name="metadata.name"
                  onChange={this.handleNameChange}
                  autoFocus={true}
                  maxLength={63}
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
              <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
                <TextArea
                  name="metadata.annotations['kubesphere.io/description']"
                  maxLength={256}
                />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
          {!hideCluster && this.renderClusters()}
        </div>
      </Modal.Form>
    )
  }
}
