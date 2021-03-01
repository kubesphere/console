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
import { toJS } from 'mobx'
import { get, keyBy } from 'lodash'
import {
  Alert,
  Columns,
  Column,
  Toggle,
  Tooltip,
  Icon,
  InputSearch,
} from '@kube-design/components'

import { Modal } from 'components/Base'
import DeleteModal from 'components/Modals/Delete'

import WorkspaceStore from 'stores/workspace'

import WorkspaceItem from './WorkspaceItem'

import styles from './index.scss'

export default class ClusterVisibility extends React.Component {
  state = {
    allWorkspaces: [],
    authedWorkspaces: [],
    addWorkspaces: [],
    deleteWorkspaces: [],
    isPublic: get(this.props, 'cluster.visibility') === 'public',
    showUnAuthTip: false,
    showConfirm: false,
  }

  workspaceStore = new WorkspaceStore()

  authedWorkspaceStore = new WorkspaceStore()

  componentDidMount() {
    this.fetchWorkspaces()
    this.fetchAuthedWorkspaces()
  }

  handleOk = () => {
    const { allWorkspaces, authedWorkspaces } = this.state
    const savedAuthWorkspaces = toJS(this.authedWorkspaceStore.list.data)

    const allWorkspacesMap = keyBy(allWorkspaces, 'name')
    const authedWorkspacesMap = keyBy(authedWorkspaces, 'name')
    const savedAuthWorkspacesMap = keyBy(savedAuthWorkspaces, 'name')

    const addWorkspaces = authedWorkspaces.filter(
      workspace => !savedAuthWorkspacesMap[workspace.name]
    )

    const deleteWorkspaces = savedAuthWorkspaces
      .filter(workspace => !authedWorkspacesMap[workspace.name])
      .map(workspace => allWorkspacesMap[workspace.name])

    this.setState({ addWorkspaces, deleteWorkspaces }, () => {
      if (this.state.deleteWorkspaces.length > 0) {
        this.setState({ showConfirm: true })
      } else {
        this.handleConfirm()
      }
    })
  }

  handleConfirm = () => {
    const { onOk } = this.props
    const { addWorkspaces, deleteWorkspaces, isPublic } = this.state
    onOk({ public: isPublic, addWorkspaces, deleteWorkspaces })
  }

  hideConfirm = () => {
    this.setState({ showConfirm: false })
  }

  handleSearch = name => {
    this.fetchWorkspaces({ name })
  }

  fetchWorkspaces = params => {
    this.workspaceStore.fetchList({ ...params, limit: -1 }).then(() => {
      this.setState({ allWorkspaces: toJS(this.workspaceStore.list.data) })
    })
  }

  fetchAuthedWorkspaces = params => {
    const { cluster = {} } = this.props
    this.authedWorkspaceStore
      .fetchList({
        ...params,
        limit: -1,
        cluster: cluster.name,
        labelSelector: 'kubefed.io/managed=true',
      })
      .then(() => {
        this.setState({
          authedWorkspaces: [...toJS(this.authedWorkspaceStore.list.data)],
        })
      })
  }

  handleWorkspaceAuth = workspace => {
    this.setState(({ authedWorkspaces }) => ({
      authedWorkspaces: [...authedWorkspaces, workspace],
    }))
  }

  handleWorkspaceUnAuth = workspace => {
    this.setState(({ authedWorkspaces }) => ({
      authedWorkspaces: authedWorkspaces.filter(
        item => item.name !== workspace.name
      ),
      showUnAuthTip: true,
    }))
  }

  handlePublicChange = isPublic => {
    this.setState({ isPublic })
  }

  render() {
    const { visible, onCancel } = this.props
    const {
      allWorkspaces,
      authedWorkspaces,
      showUnAuthTip,
      isPublic,
      showConfirm,
      deleteWorkspaces,
    } = this.state

    const resource = deleteWorkspaces.map(item => item.name).join(', ')

    return (
      <Modal
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleOk}
        width={960}
        icon="key"
        title={t('Authorize the cluster to workspace')}
        description={t('AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC')}
      >
        <Alert
          className="margin-b12"
          type="warning"
          message={t('HOST_CLUSTER_VISIBILITY_WARNING')}
        />
        {showUnAuthTip && (
          <Alert
            className="margin-b12"
            type="error"
            message={t('CLUSTER_VISIBILITY_REMOVE_WARNING')}
          />
        )}
        <div className={styles.wrapper}>
          <Columns>
            <Column className="is-half">
              <div className={styles.title}>{t('Unauthorized')}</div>
              <div className={styles.content}>
                <div className={styles.search}>
                  <InputSearch
                    name="name"
                    onSearch={this.handleSearch}
                    placeholder={t('SEARCH_TIPS')}
                  />
                </div>
                <div className={styles.list}>
                  {allWorkspaces.map(item => (
                    <WorkspaceItem
                      key={item.name}
                      data={item}
                      type="all"
                      onClick={this.handleWorkspaceAuth}
                      disabled={authedWorkspaces.find(
                        ws => ws.name === item.name
                      )}
                    />
                  ))}
                </div>
                <div className={styles.footer}>
                  <Toggle
                    checked={isPublic}
                    onChange={this.handlePublicChange}
                  />
                  <span>{t('Set as public cluster')}</span>
                  <Tooltip content={t('PUBLIC_CLUSTER_DESC')}>
                    <Icon name="information" />
                  </Tooltip>
                </div>
              </div>
            </Column>
            <Column>
              <div className={styles.title}>{t('Authorized')}</div>
              <div className={styles.content}>
                <div className={styles.authedList}>
                  {authedWorkspaces.map(item => (
                    <WorkspaceItem
                      key={item.name}
                      data={item}
                      type="authed"
                      onClick={this.handleWorkspaceUnAuth}
                    />
                  ))}
                </div>
                <div className={styles.footer} />
              </div>
            </Column>
          </Columns>
        </div>
        <DeleteModal
          visible={showConfirm}
          onOk={this.handleConfirm}
          onCancel={this.hideConfirm}
          resource={resource}
          title={t('REMOVE_WORKSPACE_CONFIRM_TITLE')}
          desc={t.html('REMOVE_WORKSPACE_CONFIRM_DESC', { resource })}
        />
      </Modal>
    )
  }
}
