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
import PropTypes from 'prop-types'
import { Columns, Column, Select, Input, TextArea } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'
import { ArrayInput, ObjectInput } from 'components/Inputs'

import WorkspaceStore from 'stores/workspace'
import MemberStore from 'stores/user'
import RoleStore from 'stores/role'

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
    this.memberStore = new MemberStore()
    this.roleStore = new RoleStore('workspaceroles')
  }

  componentDidMount() {
    this.fetchClusters()
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
    }))
  }

  fetchClusters(params) {
    this.workspaceStore.fetchClusters(params)
  }

  fetchMembers(params) {
    this.memberStore.fetchList(params)
  }

  fetchRoles(params) {
    this.roleStore.fetchList(params)
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
                rules={[{ required: true, message: t('Please input name') }]}
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
                label={t('Network Isolated')}
                desc={t('NETWORK_ISOLATED_DESC')}
              >
                <Select
                  name="metadata.annotations['kubesphere.io/network-isolate']"
                  options={this.networkOptions}
                  defaultValue={'enabled'}
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
              <Form.Item>
                <ArrayInput
                  name="spec.placement.clusters"
                  addText={t('Add Cluster')}
                  itemType="object"
                >
                  <ObjectInput>
                    <Select
                      name="name"
                      options={this.clusters}
                      style={{ width: 700 }}
                    />
                  </ObjectInput>
                </ArrayInput>
              </Form.Item>
            </Form.Group>
          )}
          {/* <Form.Group
            label={t('Member Settings')}
            desc={t('MEMBER_SETTINGS_DESC')}
          >
            <Form.Item>
              <ArrayInput
                name="metadata.annotations['kubesphere.io/members']"
                itemType="object"
                addText={t('Add Cluster')}
              >
                <ObjectInput>
                  <Select name="username" options={this.users} />
                  <Select name="role" options={this.roles} />
                </ObjectInput>
              </ArrayInput>
            </Form.Item>
          </Form.Group> */}
        </div>
      </Modal.Form>
    )
  }
}
