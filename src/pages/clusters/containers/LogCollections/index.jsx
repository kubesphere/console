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
import { observer, inject } from 'mobx-react'
import { computed } from 'mobx'
import classnames from 'classnames'
import { get } from 'lodash'

import { Link } from 'react-router-dom'
import { Button, Loading, Icon } from '@kube-design/components'
import { Text, Panel } from 'components/Base'
import Banner from 'components/Cards/Banner'
import CreateLogCollectionModal from 'components/Modals/LogCollectionCreate'
import OutputStore from 'stores/logging/collection/output'
import { getLocalTime } from 'utils'

import collectionConfig from './config'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class LogCollection extends React.Component {
  store = new OutputStore()

  state = {
    showCreate: false,
  }

  @computed
  get collections() {
    return this.store.list.data
  }

  get component() {
    return this.props.match.params.component
  }

  get cluster() {
    return this.props.match.params.cluster
  }

  componentDidMount() {
    this.refresh()
    const components = this.tabs.options
      .filter(item => !item.hidden)
      .map(item => item.value)
    if (!components.includes(this.component)) {
      this.handleTabChange(components[0] || 'logging')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.component !== prevProps.match.params.component) {
      this.refresh()
    }
  }

  get enabledActions() {
    return globals.app.getActions({
      module: 'cluster-settings',
      cluster: this.props.match.params.cluster,
    })
  }

  refresh = () => {
    this.store.fetch({
      labelSelector: `logging.kubesphere.io/component=${this.component}`,
      cluster: this.props.match.params.cluster,
    })
  }

  handleTabChange = component => {
    this.props.rootStore.routing.push(
      `/clusters/${this.cluster}/log-collections/${component}`
    )
  }

  get tabs() {
    return {
      value: this.component,
      onChange: this.handleTabChange,
      options: [
        {
          value: 'logging',
          label: t('CONTAINER_LOGS'),
          hidden: !globals.app.hasClusterModule(this.cluster, 'logging'),
        },
        {
          value: 'events',
          label: t('RESOURCE_EVENTS'),
          hidden: !globals.app.hasClusterModule(this.cluster, 'events'),
        },
        {
          value: 'auditing',
          label: t('AUDIT_LOGS'),
          hidden: !globals.app.hasClusterModule(this.cluster, 'auditing'),
        },
      ],
    }
  }

  showCreateModal = () => {
    this.setState({
      showCreate: true,
    })
  }

  hideCreateModal = () => {
    this.setState({
      showCreate: false,
    })
  }

  createCollection = async params => {
    await this.store.create({
      ...params,
      cluster: this.cluster,
      component: this.component,
    })
    this.hideCreateModal()
    this.refresh()
  }

  renderCreateButton() {
    if (!this.enabledActions.includes('create')) {
      return null
    }

    return (
      <Button
        type="control"
        disabled={this.store.list.isLoading}
        onClick={this.showCreateModal}
      >
        {t('ADD_LOG_RECEIVER')}
      </Button>
    )
  }

  renderModal() {
    const { showCreate } = this.state
    return (
      showCreate && (
        <CreateLogCollectionModal
          title={t('ADD_LOG_RECEIVER')}
          store={this.store}
          visible={showCreate}
          isSubmitting={this.store.isSubmitting}
          onCancel={this.hideCreateModal}
          onOk={this.createCollection}
        />
      )
    )
  }

  renderCollection() {
    return (
      <Loading spinning={this.store.list.isLoading}>
        <div>
          {this.collections.length
            ? this.collections.map(this.renderCollectionItem, this)
            : this.renderEmptyCollection()}
        </div>
      </Loading>
    )
  }

  renderCollectionItem(collection) {
    const type = collection.type
    const config = get(collectionConfig, type, {})
    const ICON = get(config, 'ICON', () => {})
    const title = get(config, 'title', '')
    const address = collection.address

    return (
      <Link
        key={collection.uid}
        to={`${this.props.match.url}/${collection.name}`}
      >
        <Panel className={styles.item}>
          <ICON width={40} height={40} />
          <Text
            title={<span className={styles.title}>{title}</span>}
            description={t('ADDRESS_VALUE', { value: address })}
          />
          <Text
            title={collection.enabled ? t('ENABLED') : t('DISABLED')}
            description={t('STATUS')}
          />
          <Text
            title={t(collection.component.toUpperCase())}
            description={t('TYPE')}
          />
          <Text
            title={getLocalTime(collection.creationTimestamp).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
            description={t('CREATION_TIME')}
          />
        </Panel>
      </Link>
    )
  }

  renderEmptyCollection() {
    return (
      <div className={classnames(styles.pane, styles.empty)}>
        <Icon size={40} name="file" />
        <p>{t('EMPTY_LOG_COLLECTIONS')}</p>
        {this.renderCreateButton()}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Banner
          className={styles.header}
          icon="file"
          title={t('LOG_RECEIVER_PL')}
          description={t('LOG_COLLECTION_DESC')}
          tabs={this.tabs}
          extra={
            <div className={styles.extra}>
              <Button type="flat" onClick={this.refresh}>
                <Icon name="refresh" />
              </Button>
              {this.renderCreateButton()}
            </div>
          }
        />
        {this.renderCollection()}
        {this.renderModal()}
      </div>
    )
  }
}
