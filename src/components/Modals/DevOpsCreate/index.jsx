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

import {
  Column,
  Columns,
  Form,
  Input,
  Select,
  TextArea,
} from '@kube-design/components'
import { Modal } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { get, isEmpty } from 'lodash'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import WorkspaceStore from 'stores/workspace'
import { PATTERN_ALIAS_NAME, PATTERN_SERVICE_NAME } from 'utils/constants'

import { compareVersion } from 'utils/app'
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
    this.nameRef = React.createRef()
    this.formRef = React.createRef()
  }

  componentDidMount() {
    const { hideCluster } = this.props
    if (!hideCluster) {
      this.fetchClusters()
    }
  }

  get networkOptions() {
    return [
      { label: t('OFF'), value: '' },
      { label: t('ON'), value: 'enabled' },
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
    const { cluster } = this.props
    const clusters = this.clusters
      .filter(item => !item.disabled)
      .map(item => item.value)
    const defaultCluster = clusters.find(value => value === cluster)

    return defaultCluster || clusters[0]
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
            {!item.cluster.isReady ? t('UNREADY') : t('NO_DEVOPS_INSTALL')}
          </span>
        </div>
      )}
    </>
  )

  get ksVersion() {
    const { formTemplate } = this.props
    const cluster = get(formTemplate, 'spec.placement.cluster')
    return globals.app.isMultiCluster
      ? get(globals, `clusterConfig.${cluster}.ksVersion`)
      : get(globals, 'ksConfig.ksVersion')
  }

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const { formTemplate, workspace } = this.props
    const cluster = get(formTemplate, 'spec.placement.cluster')
    this.store
      .checkDevopsName(
        { cluster, workspace, name: value },
        compareVersion(this.ksVersion, '3.4.0') < 0
      )
      .then(resp => {
        if (resp.exist) {
          return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
        }
        callback()
      })
  }

  handleClusterChange = () => {
    if (this.nameRef && this.nameRef.current) {
      const name = 'metadata.generateName'
      if (
        this.formRef &&
        this.formRef.current &&
        !isEmpty(this.formRef.current.state.errors)
      ) {
        this.formRef.current.resetValidateResults(name)
      }

      this.nameRef.current.validate({
        [name]: get(this.props.formTemplate, name),
      })
    }
  }

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
        formRef={this.formRef}
      >
        <div className={styles.header}>
          <img src="/assets/project-create.svg" alt="" />
          <div className={styles.title}>
            <div>{t('CREATE_DEVOPS_PROJECT')}</div>
            <p>{t('DEVOPS_PROJECT_CREATE_DESC')}</p>
          </div>
        </div>
        <div className={styles.content}>
          <Columns>
            <Column>
              <Form.Item
                label={t('NAME')}
                desc={t('SERVICE_NAME_DESC')}
                ref={this.nameRef}
                rules={[
                  { required: true, message: t('NAME_EMPTY_DESC') },
                  {
                    pattern: PATTERN_SERVICE_NAME,
                    message: t('INVALID_NAME_DESC', {
                      message: t('SERVICE_NAME_DESC'),
                    }),
                  },
                  { validator: this.nameValidator },
                ]}
              >
                <Input
                  name="metadata.generateName"
                  autoFocus={true}
                  maxLength={63}
                />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('ALIAS')}
                desc={t('ALIAS_NAME_DESC')}
                rules={[
                  {
                    pattern: PATTERN_ALIAS_NAME,
                    message: t('INVALID_ALIAS_NAME_DESC'),
                  },
                ]}
              >
                <Input
                  name="metadata.annotations['kubesphere.io/alias-name']"
                  maxLength={63}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            {!hideCluster && (
              <Column>
                <Form.Item
                  label={t('CLUSTER_SETTINGS')}
                  rules={[{ required: true, message: t('CLUSTER_EMPTY_DESC') }]}
                >
                  <Select
                    name="spec.placement.cluster"
                    className={styles.cluster}
                    options={this.clusters}
                    valueRenderer={this.valueRenderer}
                    optionRenderer={this.optionRenderer}
                    defaultValue={this.defaultCluster}
                    onChange={this.handleClusterChange}
                  />
                </Form.Item>
              </Column>
            )}
            <Column>
              <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
                <TextArea
                  name="metadata.annotations['kubesphere.io/description']"
                  maxLength={256}
                />
              </Form.Item>
            </Column>
          </Columns>
        </div>
      </Modal.Form>
    )
  }
}
