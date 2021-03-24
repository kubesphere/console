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

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { get, set, cloneDeep, uniq, flatten, isEmpty } from 'lodash'

import { Notify } from '@kube-design/components'
import DeleteModal from 'components/Modals/Delete'

import { safeParseJSON } from 'utils'
import { getBreadCrumbData } from 'utils/group'

import Form from './Form'
import Card from './Card'

import styles from './index.scss'

@observer
export default class Detail extends Component {
  static propTypes = {
    rowTreeData: PropTypes.object,
    groupId: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.store = props.store

    this.initialFormTemplate = {
      apiVersion: 'iam.kubesphere.io/v1alpha2',
      kind: 'Group',
      metadata: {
        annotations: {
          'kubesphere.io/workspace-role': `${props.workspace}-regular`,
        },
        labels: {
          'kubesphere.io/workspace': 'wsp1',
        },
      },
    }

    this.state = {
      treeNode: this.getTreeNode(props),
      mode: 'create',
      formTemplate: cloneDeep(this.initialFormTemplate),
      showConfirm: false,
      resource: '',
      deleteKeys: [],
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.treeNodeId !== prevProps.treeNodeId ||
      this.props.rowTreeData !== prevProps.rowTreeData
    ) {
      this.setState({
        treeNode: this.getTreeNode(this.props),
      })
    }
  }

  getTreeNode(props) {
    const { treeNodeId, rowTreeData } = props
    return rowTreeData[treeNodeId] || {}
  }

  isEmptyTreeNode(treeNode) {
    return (
      !treeNode.group_id ||
      (treeNode.group_id === 'root' && !treeNode.children.length)
    )
  }

  getRoleJSON(roles, result) {
    return roles.map(item => {
      const data = flatten(result).find(
        v =>
          get(v, 'metadata.namespace') === item.namespace &&
          get(v, 'roleRef.name') === item.role
      )
      return {
        ...item,
        name: get(data, 'metadata.name'),
        disabled: true,
      }
    })
  }

  handleAdd = () => {
    this.setState({
      mode: 'create',
      formTemplate: cloneDeep(this.initialFormTemplate),
    })
    this.props.toggleForm()
  }

  handleDelete = item => {
    this.setState({
      showConfirm: true,
      resource: item,
    })
  }

  handleConfirm = () => {
    const { workspace } = this.props
    const {
      resource: { group_id },
    } = this.state

    this.store.deleteGroup(group_id, { workspace }).then(() => {
      this.setState({ showConfirm: false, deleteKeys: [group_id] })
      Notify.success({ content: `${t('Deleted Successfully')}` })
    })
  }

  hideConfirm = () => {
    this.setState({ showConfirm: false })
  }

  handleEdit = async node => {
    const formData = cloneDeep(node._originData)
    const projectRoles = safeParseJSON(
      get(formData, 'metadata.annotations["kubesphere.io/project-roles"]', [])
    )
    const devopsRoles = safeParseJSON(
      get(formData, 'metadata.annotations["kubesphere.io/devops-roles"]', [])
    )
    const { workspace } = this.props
    const clusters = uniq([...projectRoles, ...devopsRoles].map(v => v.cluster))
    const result = await this.store.fetchRoleBinding(node.group_id, {
      workspace,
      clusters,
    })
    set(
      formData,
      'metadata.annotations["kubesphere.io/project-roles"]',
      this.getRoleJSON(projectRoles, result)
    )
    set(
      formData,
      'metadata.annotations["kubesphere.io/devops-roles"]',
      this.getRoleJSON(devopsRoles, result)
    )
    this.setState({
      mode: 'edit',
      formTemplate: formData,
    })
    this.props.onChange(node.group_id)
    this.props.toggleForm()
  }

  handleSave = async (data, detail) => {
    const { workspace } = this.props
    if (detail) {
      await this.store.update(data, detail, { workspace })
      Notify.success({ content: `${t('Updated Successfully')}` })
    } else {
      await this.store.createGroup(data, { workspace })
      Notify.success({ content: `${t('Added Successfully')}` })
    }

    this.props.toggleForm()
  }

  handleCancel = () => {
    const { onChange, toggleForm, onCancel } = this.props
    const treeNode = this.getTreeNode(this.props)
    if (!this.isEmptyTreeNode(treeNode)) {
      onChange(this.props.groupId)
      toggleForm()
    } else {
      onCancel()
    }
  }

  renderBreadcrumbs() {
    const { showForm, treeNodeId } = this.props
    const { mode } = this.state
    let breadcrumbs = getBreadCrumbData(treeNodeId, this.props.rowTreeData).map(
      item => item.group_name
    )
    if (showForm && mode === 'create') {
      breadcrumbs = [...breadcrumbs, t('Add New Department')]
    }

    return (
      <ul className={styles.breadcrumbs}>
        {breadcrumbs.map((child, index) => {
          return (
            <li key={`${child}-${index}`}>
              <span>{child}</span>
              {index !== breadcrumbs.length - 1 && (
                <span className={styles.separator}>&gt;</span>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {
      formTemplate,
      mode,
      showConfirm,
      resource: { group_name, children },
      treeNode,
      deleteKeys,
    } = this.state
    const { groupId, showForm } = this.props
    const desc = !isEmpty(children)
      ? t.html('DELETE_PARENT_GROUP_TIP', { group_name })
      : t.html('DELETE_GROUP_TIP', { group_name })

    return (
      <div className={styles.detailWrapper}>
        {this.renderBreadcrumbs()}
        {showForm ? (
          <Form
            {...this.props}
            formTemplate={formTemplate}
            mode={mode}
            groupId={groupId}
            onCancel={this.handleCancel}
            onSave={this.handleSave}
          />
        ) : (
          <Card
            treeNode={treeNode}
            deleteKeys={deleteKeys}
            onAdd={this.handleAdd}
            onEdit={this.handleEdit}
            onDelete={this.handleDelete}
          />
        )}
        <DeleteModal
          visible={showConfirm}
          onOk={this.handleConfirm}
          onCancel={this.hideConfirm}
          resource={group_name}
          desc={desc}
        />
      </div>
    )
  }
}
