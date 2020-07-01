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
import { get } from 'lodash'
import { toJS, computed } from 'mobx'
import { observer } from 'mobx-react'
import { Columns, Column } from '@pitrix/lego-ui'
import { Button, Modal, Search, ScrollLoad } from 'components/Base'
import WorkspaceStore from 'stores/workspace'
import ClusterStore from 'stores/cluster'

import WorkspaceCard from './Card'
import styles from './index.scss'

@observer
export default class WorkspaceSelectModal extends React.Component {
  constructor(props) {
    super(props)
    this.store = new WorkspaceStore()
    this.clusterStore = new ClusterStore()
  }

  componentDidMount() {
    this.clusterStore.fetchList({ limit: -1 })
  }

  @computed
  get clusters() {
    return this.clusterStore.list.data
  }

  fetchData = params => {
    this.store.fetchList({ ...params })
  }

  handleSearch = name => {
    this.fetchData({ name })
  }

  handleRefresh = () => {
    this.fetchData()
  }

  handleOnEnter = workspace => {
    const { onChange } = this.props
    localStorage.setItem(`${globals.user.username}-workspace`, workspace)
    onChange && onChange(workspace)
  }

  render() {
    const { visible, onCancel, onShowCreate } = this.props
    const { data, total, page, isLoading } = toJS(this.store.list)

    const keyword = get(this.store.list, 'filters.name')

    return (
      <Modal
        bodyClassName={styles.body}
        visible={visible}
        onCancel={onCancel}
        width={960}
        icon="enterprise"
        title={t('Workspace')}
        description={t('WORKSPACE_DESC')}
        hideFooter
      >
        <div className={styles.bar}>
          <Columns>
            <Column>
              <Search
                value={keyword}
                placeholder={t('Please enter a name to find')}
                onSearch={this.handleSearch}
              />
            </Column>
            <Column className="is-narrow">
              <div>
                <Button
                  icon="refresh"
                  type="flat"
                  onClick={this.handleRefresh}
                />
                {onShowCreate && (
                  <Button type="control" onClick={onShowCreate}>
                    {t('Create Workspace')}
                  </Button>
                )}
              </div>
            </Column>
          </Columns>
        </div>
        <div className={styles.list}>
          <ScrollLoad
            wrapperClassName={styles.listWrapper}
            data={toJS(data)}
            total={total}
            page={page}
            loading={isLoading}
            onFetch={this.fetchData}
          >
            {data.map(item => (
              <WorkspaceCard
                key={item.uid}
                data={item}
                clustersDetail={this.clusters}
                onEnter={this.handleOnEnter}
              />
            ))}
          </ScrollLoad>
        </div>
      </Modal>
    )
  }
}
