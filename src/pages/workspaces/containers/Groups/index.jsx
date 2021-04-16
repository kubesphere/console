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
import { inject, observer } from 'mobx-react'
import { toJS, reaction } from 'mobx'
import classnames from 'classnames'
import { get, debounce, throttle } from 'lodash'

import {
  Icon,
  Button,
  Level,
  LevelLeft,
  LevelRight,
  Notify,
} from '@kube-design/components'
import Banner from 'components/Cards/Banner'

import WebsocketStore from 'stores/websocket'
import UserStore from 'stores/user'
import GroupStore from 'stores/group'

import EditGroupModal from 'workspaces/components/Modals/EditGroup'
import GroupTree from './GroupTree'
import GroupUser from './GroupUser'

import styles from './index.scss'

@inject('rootStore', 'workspaceStore')
@observer
export default class Groups extends React.Component {
  constructor(props) {
    super(props)
    this.store = new GroupStore()
    this.userStore = new UserStore()
    this.websocket = new WebsocketStore()
    this.silentLoading = false

    this.state = {
      group: '',
      groupTitle: '',
      selectUserKeys: [],
      refreshFlag: false,
      showModal: false,
    }
  }

  componentDidMount() {
    this.fetchGroup(true)
    this.initWebsocket()
  }

  componentWillUnmount() {
    this.unmount = true
    this.websocket.close()
    this.disposer && this.disposer()
  }

  get enabledActions() {
    const { workspace } = this.props.match.params
    return globals.app.getActions({
      module: 'groups',
      workspace,
    })
  }

  initWebsocket = () => {
    const url = this.store.getWatchListUrl({ ...this.props.match.params })
    if (url) {
      this.websocket.watch(url)

      const _getData = debounce(this.fetchGroup, 1000)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          this.silentLoading = true

          if (message.type === 'MODIFIED' || message.type === 'ADDED') {
            _getData()
          }
          if (message.type === 'DELETED') {
            _getData(true)
          }
        }
      )
    }
  }

  fetchGroup = refresh => {
    const { workspace } = this.props.match.params
    this.store.fetchGroup({ workspace }).then(() => {
      if (!this.unmount && refresh) {
        const { treeData } = this.store
        this.setState(prev => ({
          refreshFlag: !prev.refrseshFlag,
          group: get(treeData[0], 'children[0].key', ''),
          groupTitle: get(treeData[0], 'children[0].group_name', ''),
        }))
      }
    })
  }

  handleRefresh = throttle(() => {
    this.fetchGroup(true)
  }, 1000)

  handleSelectTree = (key, { selectedNodes }) => {
    this.setState({
      group: key[0],
      groupTitle: selectedNodes[0].props.title,
      selectUserKeys: [],
    })
  }

  handleSelectUser = user => {
    this.setState(prevState => ({
      selectUserKeys: [...prevState.selectUserKeys, user.name],
    }))
  }

  handleCancelSelect = () => {
    this.setState({ selectUserKeys: [] })
  }

  handleAddGroup = () => {
    const { workspace } = this.props.match.params
    const { selectUserKeys, group } = this.state
    const data = selectUserKeys.map(user => ({
      userName: user,
      groupName: group,
    }))

    this.store
      .addGroupBinding(data, {
        workspace,
      })
      .then(() => {
        Notify.success({ content: `${t('Added Successfully')}` })
        this.setState(prev => ({
          refreshFlag: !prev.refreshFlag,
          selectUserKeys: [],
        }))
      })
  }

  showEditModal = () => {
    this.setState({ showModal: true })
  }

  hideModal = () => {
    this.setState({ showModal: false })
  }

  renderBanner() {
    return (
      <Banner
        icon="group"
        title={t('Workspace Groups')}
        description={t('WORKSPACE_GROUP_DESC')}
      />
    )
  }

  renderTitle() {
    const { selectUserKeys } = this.state
    const showSelect = selectUserKeys.length > 0

    if (!this.enabledActions.includes('manage')) {
      return null
    }

    return (
      <div
        className={classnames(
          styles.contentHeader,
          showSelect && styles.hasSelected
        )}
      >
        {showSelect ? this.renderSelectedTitle() : this.renderToolBar()}
      </div>
    )
  }

  renderToolBar() {
    return (
      <Level>
        <LevelLeft></LevelLeft>
        <LevelRight>
          <Button type="flat" onClick={this.handleRefresh}>
            <Icon name="refresh" />
          </Button>
          <Button type="control" onClick={this.showEditModal}>
            {t('Maintain Organization')}
          </Button>
        </LevelRight>
      </Level>
    )
  }

  renderSelectedTitle() {
    return (
      <Level>
        <LevelLeft>
          {t.html('Add the member to', { group: this.state.groupTitle })}
        </LevelLeft>
        <LevelRight>
          <Button type="primary" onClick={this.handleAddGroup}>
            {t('OK')}
          </Button>
          <Button onClick={this.handleCancelSelect}>{t('Cancel')}</Button>
        </LevelRight>
      </Level>
    )
  }

  render() {
    const { treeData, rowTreeData, total, isLoading } = toJS(this.store)
    const { group, selectUserKeys, refreshFlag, showModal } = this.state

    return (
      <>
        {this.renderBanner()}
        <div className={styles.wrapper}>
          {this.renderTitle()}
          <div className={styles.content}>
            <div className={styles.container}>
              <GroupTree
                treeData={treeData}
                group={group}
                total={total}
                isLoading={this.silentLoading ? false : isLoading}
                onSelect={this.handleSelectTree}
              />
              <GroupUser
                groupStore={this.store}
                userStore={this.userStore}
                group={group}
                refreshFlag={refreshFlag}
                selectedKeys={selectUserKeys}
                onSelect={this.handleSelectUser}
                enabledActions={this.enabledActions}
                {...this.props}
              />
            </div>
          </div>
        </div>
        {showModal && (
          <EditGroupModal
            visible={showModal}
            title={t('Maintain Organization')}
            treeData={treeData}
            rowTreeData={rowTreeData}
            store={this.store}
            workspaceStore={this.props.workspaceStore}
            onCancel={this.hideModal}
            {...this.props.match.params}
          />
        )}
      </>
    )
  }
}
