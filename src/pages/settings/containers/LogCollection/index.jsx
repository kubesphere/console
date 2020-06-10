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
import Moment from 'moment-mini'

import { Link } from 'react-router-dom'
import { Loading, Icon } from '@pitrix/lego-ui'
import { Button, Banner } from 'components/Base'
import CreateLogCollectionModal from 'components/Modals/LogCollectionCreate'
import OutputStore from 'stores/logging/collection/output'

import collectionConfig from './config'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class LogCollection extends React.Component {
  store = new OutputStore()

  state = {
    createModelVisible: false,
  }

  @computed
  get collections() {
    return this.store.list.data
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    this.store.fetch()
  }

  showCreateModal = () => {
    this.setState({
      createModelVisible: true,
    })
  }

  hideCreateModal = () => {
    this.setState({
      createModelVisible: false,
    })
  }

  createCollection = async params => {
    await this.store.create(params)
    this.hideCreateModal()
    this.refresh()
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Banner
            type="purple"
            icon="file"
            rightIcon="/assets/banner-icon-1.svg"
            name={t('Log Collection')}
            desc={t('LOG_COLLECTION_DESC')}
            className={styles.banner}
          />
          <div className={styles.toolbar}>
            <Button type="flat" onClick={this.refresh}>
              <Icon name="refresh" />
            </Button>
            {this.renderCreateButton()}
          </div>
        </div>
        {this.renderCollection()}
        {this.renderModal()}
      </div>
    )
  }

  renderCreateButton() {
    return (
      <Button
        type="control"
        disabled={this.store.list.isLoading}
        onClick={this.showCreateModal}
      >
        {t('Add Log Collector')}
      </Button>
    )
  }

  renderModal() {
    const { createModelVisible } = this.state
    return (
      createModelVisible && (
        <CreateLogCollectionModal
          title={t('Log Collector')}
          store={this.store}
          visible={createModelVisible}
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
      <div
        key={collection.uid}
        className={classnames(styles.pane, styles.collection)}
      >
        <Link to={`/settings/log-collection/${collection.name}`}>
          <div className={styles.collectionSummery}>
            <div>
              <ICON width={40} height={40} />
            </div>
            <div className={styles.dl}>
              <h3>{title}</h3>
              <p>
                {t('Address')}: {address}
              </p>
            </div>
            <div className={styles.dl}>
              <h3>{collection.enabled ? t('Collecting') : t('Close')}</h3>
              <p>{t('Status')}</p>
            </div>
            <div className={styles.dl}>
              <h3>
                {Moment(collection.creationTimestamp).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </h3>
              <p>{t('Created Time')}</p>
            </div>
          </div>
        </Link>
      </div>
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
}
