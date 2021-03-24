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

import { isEmpty } from 'lodash'
import React from 'react'
import { Button, Notify, Loading } from '@kube-design/components'
import { observer, inject } from 'mobx-react'

import EmptyList from 'components/Cards/EmptyList'
import GrayReleaseDetail from 'projects/components/Modals/GrayReleaseDetail'
import GrayReleaseStore from 'stores/grayrelease'
import RouterStore from 'stores/router'

import Item from './Item'

import styles from './index.scss'

class Jobs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetailModal: false,
      selectItem: {},
    }

    this.store = new GrayReleaseStore()
    this.routerStore = new RouterStore()
  }

  componentDidMount() {
    this.getData()
    this.routerStore.getGateway(this.props.match.params)
  }

  get namespace() {
    return this.props.match.params.namespace
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get canCreate() {
    const { cluster, workspace, namespace: project } = this.props.match.params
    return (
      globals.app
        .getActions({ cluster, workspace, project, module: 'applications' })
        .includes('edit') && this.serviceMeshEnable
    )
  }

  get serviceMeshEnable() {
    return (
      globals.app.hasClusterModule(this.cluster, 'servicemesh') &&
      this.routerStore.gateway.data.serviceMeshEnable
    )
  }

  getData() {
    this.store.fetchList({ namespace: this.namespace, cluster: this.cluster })
  }

  showDetail = item => {
    this.setState({
      showDetailModal: true,
      selectItem: { ...item, workspace: this.workspace },
    })
  }

  hideDetail = () => {
    this.setState({ showDetailModal: false, selectItem: {} }, () => {
      this.getData()
    })
  }

  handleDelete = () => {
    this.store.delete(this.state.selectItem).then(() => {
      Notify.success({ content: `${t('Job offline Successfully')}` })
      this.hideDetail()
    })
  }

  showCreateGrayReleaseJob = () => {
    const { workspace, cluster, namespace } = this.props.match.params

    this.props.rootStore.routing.push(
      `/${workspace}/clusters/${cluster}/projects/${namespace}/grayrelease/cates`
    )
  }

  renderHeader() {
    return null
  }

  renderEmpty() {
    return (
      <EmptyList
        icon="istio"
        title={t('NO_GRAY_RELEASE_JOBS_TIP')}
        desc={t('NO_GRAY_RELEASE_JOBS_TIP_2')}
        actions={
          this.canCreate ? (
            <Button type="control" onClick={this.showCreateGrayReleaseJob}>
              {t('Create Grayscale Release Job')}
            </Button>
          ) : null
        }
      />
    )
  }

  renderContent() {
    const { data, isLoading } = this.store.list

    if (isLoading) {
      return <Loading className={styles.loading} />
    }

    if (isEmpty(data)) {
      return this.renderEmpty()
    }

    return (
      <div className={styles.items}>
        {data.map(item => (
          <Item
            key={item.name}
            data={item}
            onClick={this.showDetail}
            store={this.store}
          />
        ))}
      </div>
    )
  }

  renderFooter() {
    const { total } = this.store.list
    return (
      <div className={styles.footer}>
        <p>{t('TOTAL_GRAY_RELEASE_JOBS', { num: total })}</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderFooter()}
        <GrayReleaseDetail
          detail={this.state.selectItem}
          visible={this.state.showDetailModal}
          onCancel={this.hideDetail}
          onDelete={this.handleDelete}
        />
      </div>
    )
  }
}

export default inject('rootStore')(observer(Jobs))
export const Component = Jobs
