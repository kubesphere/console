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
import OutputStore from 'stores/logging/collection/output'
import { get } from 'lodash'
import Moment from 'moment-mini'

import { Link } from 'react-router-dom'
import { Loading, Icon } from '@pitrix/lego-ui'
import { Button, Banner } from 'components/Base'
import CreateLogCollectionModal from 'components/Modals/LogCollectionCreate'

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
    return this.store.collections
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    this.store.fetch()
  }

  handleSearch = () => {}

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
    await this.store.create(this.formatParams(params))
    this.hideCreateModal()
    this.refresh()
  }

  formatParams(params) {
    if (params.Name === 'es') {
      params.Port = String(params.Port)
      return params
    }
    if (params.Name === 'forward') {
      params.Port = String(params.Port)
      return params
    }
    return params
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderBanner()}
        {this.renderCollection()}
        {this.renderModal()}
      </div>
    )
  }

  renderModal() {
    const { createModelVisible } = this.state
    return (
      createModelVisible && (
        <CreateLogCollectionModal
          store={this.store}
          visible={createModelVisible}
          isSubmitting={this.store.isCreating}
          title={t('Log Collector')}
          onCancel={this.hideCreateModal}
          onOk={this.createCollection}
        />
      )
    )
  }

  renderBanner() {
    return (
      <div className={styles.header}>
        <Banner
          type="purple"
          icon="file"
          rightIcon="/assets/banner-icon-1.svg"
          name={t('Log Collection')}
          desc={t('LOG_COLLECTION_DESC')}
          className={styles.banner}
        />
        {this.renderToolbar()}
      </div>
    )
  }

  renderToolbar() {
    return (
      <div className={styles.toolbar}>
        <Button type="flat" onClick={this.refresh}>
          <Icon name="refresh" />
        </Button>
        {this.renderCreateButton()}
      </div>
    )
  }

  renderCreateButton() {
    return (
      <Button
        type="control"
        disabled={this.store.isLoading || this.store.fetchError}
        onClick={this.showCreateModal}
      >
        {t('Add Log Collector')}
      </Button>
    )
  }

  renderCollection() {
    return (
      <Loading spinning={this.store.isLoading || this.store.fetchError}>
        <div>
          {this.collections.length
            ? this.collections.map(this.renderCollectionItem, this)
            : this.renderEmptyCollection()}
          <div className={styles.collectionCount}>
            <span>
              {t('TOTAL_COLLECTIONS', { num: this.collections.length })}
            </span>
          </div>
        </div>
      </Loading>
    )
  }

  renderCollectionItem(collection) {
    const type = get(collection, 'Name', 'es')
    const config = get(collectionConfig, type, {})
    const ICON = get(config, 'ICON', () => {})
    const title = get(config, 'title', '')
    const address =
      type === 'kafka'
        ? get(collection, 'Brokers')
        : `${get(collection, 'Host')}:${get(collection, 'Port')}`

    return (
      <div
        key={collection.id}
        className={classnames(styles.pane, styles.collection)}
      >
        <Link to={`/log-collection/${collection.id}`}>
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
              <h3>{collection.enable ? t('Collecting') : t('Close')}</h3>
              <p>{t('Status')}</p>
            </div>
            <div className={styles.dl}>
              <h3>
                {Moment(collection.updatetime).format(
                  `${t('MMMM Do YYYY')} HH:mm`
                )}
              </h3>
              <p>{t('Recently Configured Updated')}</p>
            </div>
          </div>
          <div className={styles.logCount} />
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
