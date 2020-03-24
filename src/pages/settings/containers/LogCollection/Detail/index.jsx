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

import { get, isFunction, omit } from 'lodash'
import React from 'react'
import { computed, toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import { Modal, Notify } from 'components/Base'
import OutputStore from 'stores/logging/collection/output'
import EnableForm from 'components/Forms/LoggingCollection/Status'
import withBack from 'components/Modals/WithBack'
import DeleteModal from 'components/Modals/Delete'
import Base from 'core/containers/Base/Detail'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'
import YamlModal from './YamlModal'

import collectionConfig from '../config'

import styles from './index.scss'

@inject('rootStore')
@observer
export default class LogCollectionDetail extends Base {
  get listUrl() {
    return `/settings/log-collection`
  }

  get collectionID() {
    return this.props.match.params.name
  }

  get namespace() {
    return null
  }

  @computed
  get collection() {
    return this.store.getCollection(this.collectionID)
  }

  @computed
  get output() {
    return this.store.getOutput(this.collectionID)
  }

  @computed
  get collectionYamlValue() {
    return omit(toJS(this.output), ['id', 'enable', 'updatetime'])
  }

  @computed
  get enableOutput() {
    return Object.assign({}, this.output, {
      enable: Number(get(this, 'output.enable')),
    })
  }

  @computed
  get enable() {
    return get(this, 'output.enable')
  }

  @computed
  get savedCollection() {
    return Object.assign({}, this.collection)
  }

  get baseProps() {
    return {
      detailStore: this.collection,
    }
  }

  editFormRef = React.createRef()

  init() {
    this.store = new OutputStore()
  }

  fetchData = () => {
    this.fetchOutput()
  }

  isInvalidRoute({ name, hide }) {
    return !name || (isFunction(hide) && hide(this.savedCollection))
  }

  async fetchOutput() {
    await this.store.fetch()
    if (!this.collection) {
      this.showNotFound()
    }
  }

  showNotFound() {
    this.setState({ notFound: true })
  }

  getAttrs = () => [
    {
      name: t('Status'),
      value: this.enable ? t('Collecting') : t('Stopped'),
    },
  ]

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('Edit'),
      action: 'edit',
      disabled: this.store.isLoading,
      onClick: this.showModal('editLogCollection'),
    },
    {
      key: 'changeStatus',
      text: t('Change Status'),
      icon: 'pin',
      action: 'edit',
      disabled: this.store.isLoading,
      onClick: this.showModal('editLoggingStatus'),
    },
    {
      key: 'delete',
      text: t('Delete Log Collector'),
      icon: 'trash',
      action: 'delete',
      disabled: this.store.isLoading,
      onClick: this.showModal('deleteModule'),
    },
    {
      key: 'editYaml',
      text: t('Edit YAML'),
      icon: 'pen',
      disabled: this.store.isLoading,
      action: 'edit',
      onClick: this.showModal('editYaml'),
    },
  ]

  handleConfigEdit = newConfig => {
    const collectionType = get(this.savedCollection, 'Name', '')
    const validator = get(collectionConfig, `${collectionType}.validator`)
    if (validator) {
      validator.call(
        this.editFormRef.current,
        this.configEdit.bind(this, newConfig)
      )
    } else {
      this.configEdit.call(this, newConfig)
    }
  }

  configEdit = newConfig => {
    const { Port } = newConfig
    if (Port) {
      newConfig.Port = String(Port)
    }
    const handerMethod = this.handleEdit('editLogCollection', 'editParameters')
    handerMethod.call(this, newConfig)
  }

  handleYamlEdit = newConfig => {
    const type = 'editYaml'
    this.store
      .update({
        ...newConfig,
        ...{ id: this.collectionID, enable: this.collection.enable },
      })
      .then(() => {
        this.hideModal(type)()
        Notify.success({ content: `${t('Updated Successfully')}!` })
        this.fetchData()
      })
      .catch(error => {
        Notify.error({ content: String(error) })
      })
  }

  handleStatusChange = output => {
    const type = 'editLoggingStatus'
    this.store
      .update({ ...output, ...{ enable: Boolean(output.enable) } })
      .then(() => {
        this.hideModal(type)()
        Notify.success({ content: `${t('Updated Successfully')}!` })
        this.fetchData()
      })
  }

  handleDelete = () => {
    this.store.delete(this.collectionID).then(() => {
      this.hideModal('deleteModule')()
      Notify.success({ content: `${t('Deleted Successfully')}!` })
      this.deleteCallback()
    })
  }

  renderSider() {
    const collection = this.collection || {}
    const collectionType = get(collection, 'Name', '')
    const Icon = get(collectionConfig, `${collectionType}.ICON`)
    const name = get(collectionConfig, `${collectionType}.title`, t('Loading'))
    const icon = Icon ? (
      <Icon className={styles.icon} width={32} height={32} />
    ) : (
      'Loading'
    )

    return (
      <BaseInfo
        labels={this.labels}
        icon={icon}
        name={name}
        operations={this.getOperations()}
        attrs={this.getAttrs()}
      />
    )
  }

  renderModals() {
    const {
      editLogCollection,
      editLoggingStatus,
      deleteModule,
      editYaml,
    } = this.state
    const collectionType = get(this.savedCollection, 'Name', '')
    const editFormTitle = get(
      collectionConfig,
      `${collectionType}.title`,
      () => <div />
    )
    const Form = withBack(
      get(collectionConfig, `${collectionType}.Form`, () => <div />)
    )

    return (
      <div>
        <Modal.Form
          icon="timed-task"
          width={691}
          title={t('Log Collection')}
          visible={editLogCollection}
          data={this.savedCollection}
          onOk={this.handleConfigEdit}
          onCancel={this.hideModal('editLogCollection')}
          isSubmitting={this.store.isCreating}
          formRef={this.editFormRef}
        >
          <Form wrapperTitle={editFormTitle} hiddenBack />
        </Modal.Form>
        <Modal.Form
          width={497}
          icon="timed-task"
          data={this.enableOutput}
          title={t('Change Status')}
          visible={editLoggingStatus}
          onOk={this.handleStatusChange}
          onCancel={this.hideModal('editLoggingStatus')}
          isSubmitting={this.store.isLoading}
        >
          <EnableForm />
        </Modal.Form>
        <DeleteModal
          type={t('Log Collector')}
          visible={deleteModule}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModule')}
          isSubmitting={this.store.isCreating}
        />
        <YamlModal
          visible={editYaml}
          value={this.collectionYamlValue}
          okText={t('Update')}
          onOk={this.handleYamlEdit}
          onCancel={this.hideModal('editYaml')}
        />
      </div>
    )
  }
}
