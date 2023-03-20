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

import { Button, Form, Input, Select } from '@kube-design/components'
import { ArrayInput } from 'components/Inputs'
import { cloneDeep, get, set } from 'lodash'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import RoleStore from 'stores/role'

import { compareVersion } from 'utils'
import { PATTERN_ALIAS_NAME, PATTERN_NAME } from 'utils/constants'
import DevopsSelect from './DevopsSelect'

import styles from './index.scss'

import ProjectSelect from './ProjectSelect'

@observer
export default class GroupForm extends React.Component {
  static propTypes = {
    workspace: PropTypes.string,
    groupId: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.formRef = React.createRef()

    this.workspaceStore = props.workspaceStore
    this.workspaceRoleStore = new RoleStore('workspaceroles')

    this.state = {
      formTemplate: cloneDeep(props.formTemplate),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.formTemplate !== prevProps.formTemplate) {
      this.setState({ formTemplate: cloneDeep(this.props.formTemplate) })
    }
  }

  get needUpgrade() {
    return this.workspaceStore.clusters.data.some(
      item =>
        compareVersion(
          globals.app.isMultiCluster
            ? get(item, 'configz.ksVersion', '')
            : get(globals, 'ksConfig.ksVersion'),
          'v3.1.0'
        ) < 0
    )
  }

  @computed
  get workspaceRoles() {
    return this.workspaceRoleStore.list.data.map(role => ({
      label: role.name,
      value: role.name,
      item: role,
    }))
  }

  @computed
  get clusters() {
    return this.workspaceStore.clusters.data.map(item => {
      const needUpgrade =
        compareVersion(
          globals.app.isMultiCluster
            ? get(item, 'configz.ksVersion', '')
            : get(globals, 'ksConfig.ksVersion'),
          'v3.1.0'
        ) < 0

      return {
        label: item.name,
        value: item.name,
        disabled: !item.isReady || needUpgrade,
        needUpgrade,
        item,
      }
    })
  }

  componentDidMount() {
    this.fetchWorkspaceRoles()
  }

  fetchWorkspaceRoles() {
    this.workspaceRoleStore.fetchList({
      workspace: this.props.workspace,
      limit: -1,
      sortBy: 'createTime',
    })
  }

  nameValidator = (rule, value, callback) => {
    const { workspace, mode } = this.props
    if (!value || mode === 'edit') {
      return callback()
    }

    this.props.store.checkName({ name: value, workspace }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('NAME_EXIST_DESC'), field: rule.field })
      }
      callback()
    })
  }

  checkItemValid = value => value.role

  handleSave = () => {
    const { onSave, groupId, mode } = this.props
    const formData = cloneDeep(this.state.formTemplate)
    const form = this.formRef.current
    form &&
      form.validate(() => {
        if (groupId) {
          set(
            formData,
            'metadata.labels["iam.kubesphere.io/group-parent"]',
            groupId
          )
        }
        if (mode === 'edit') {
          onSave(formData, this.props.formTemplate)
        } else {
          onSave(formData)
        }
      })
  }

  render() {
    const { onCancel, mode } = this.props
    const { formTemplate } = this.state

    return (
      <div className={styles.formWrapper}>
        <Form data={formTemplate} className={styles.form} ref={this.formRef}>
          <Form.Item
            label={t('NAME')}
            desc={t('NAME_DESC')}
            rules={[
              { required: true, message: t('NAME_EMPTY_DESC') },
              {
                pattern: PATTERN_NAME,
                message: t('INVALID_NAME_DESC'),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input
              name="metadata.generateName"
              autoFocus={true}
              maxLength={63}
              autoComplete="off"
              disabled={mode === 'edit'}
            />
          </Form.Item>
          <Form.Item
            label={t(`ALIAS`)}
            desc={t('ALIAS_DESC')}
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
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item
            label={t('WORKSPACE_ROLE')}
            desc={
              t('GROUP_WORKSPACE_ROLE_DESC') +
              (this.needUpgrade
                ? t('MEMBER_CLUSTER_UPGRADE_TIP', { version: 'v3.1.0' })
                : '')
            }
          >
            <Select
              name="metadata.annotations['kubesphere.io/workspace-role']"
              options={this.workspaceRoles}
              onChange={this.handleRolesChange}
            />
          </Form.Item>
          <Form.Group label={t('PROJECT_ROLE')}>
            <Form.Item>
              <ArrayInput
                name="metadata.annotations['kubesphere.io/project-roles']"
                itemType="object"
                addText={t('ADD_PROJECT')}
                checkItemValid={this.checkItemValid}
              >
                <ProjectSelect
                  clusters={this.clusters}
                  showClusterSelect={globals.app.isMultiCluster}
                  {...this.props}
                />
              </ArrayInput>
            </Form.Item>
          </Form.Group>
          {globals.app.hasKSModule('devops') && (
            <Form.Group label={t('DEVOPS_PROJECT_ROLE')}>
              <Form.Item>
                <ArrayInput
                  name="metadata.annotations['kubesphere.io/devops-roles']"
                  itemType="object"
                  addText={t('ADD_DEVOPS_PROJECT')}
                  checkItemValid={this.checkItemValid}
                >
                  <DevopsSelect
                    clusters={this.clusters}
                    showClusterSelect={globals.app.isMultiCluster}
                    {...this.props}
                  />
                </ArrayInput>
              </Form.Item>
            </Form.Group>
          )}
        </Form>
        <div className={styles.footer}>
          <Button onClick={onCancel}>{t('CANCEL')}</Button>
          <Button type="primary" onClick={this.handleSave}>
            {t('OK')}
          </Button>
        </div>
      </div>
    )
  }
}
