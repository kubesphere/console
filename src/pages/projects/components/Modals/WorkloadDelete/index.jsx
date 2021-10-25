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
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { flatten, isArray, isEmpty, get, uniqBy } from 'lodash'
import { Button, Icon, Checkbox } from '@kube-design/components'

import { joinSelector } from 'utils'
import { ICON_TYPES, MODULE_KIND_MAP } from 'utils/constants'
import { Modal } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'

import ServiceStore from 'stores/service'
import VolumeStore from 'stores/volume'
import FederatedStore from 'stores/federated'

import styles from './index.scss'

export default class WorkloadDeleteModal extends React.Component {
  static propTypes = {
    resource: PropTypes.any,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.serviceStore = new ServiceStore()
    this.volumeStore = new VolumeStore()

    if (props.isFederated) {
      this.serviceStore = new FederatedStore({
        module: this.serviceStore.module,
      })
      this.volumeStore = new FederatedStore({
        module: this.volumeStore.module,
      })
    }

    this.state = {
      relatedResources: [],
      selectedRelatedResourceIds: [],
      enableConfirm: false,
      timer: 3,
      scheduledProjectList: [],
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.fetchRelatedResources(this.props.resource)
      this.startTimer()
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  startTimer() {
    if (this.timer) {
      clearInterval(this.timer)
    }

    this.timer = setInterval(() => {
      this.setState(
        ({ timer }) => ({
          timer: Math.max(timer - 1, 0),
          enableConfirm: timer <= 1,
        }),
        () => {
          if (this.state.enableConfirm && this.timer) {
            clearInterval(this.timer)
          }
        }
      )
    }, 1000)
  }

  async fetchRelatedResources(resource) {
    const { store } = this.props
    this.setState({ isLoading: true })
    let selectors = []
    let namespace
    let cluster
    let allScheduleProject = []
    if (isArray(resource)) {
      namespace = resource[0].namespace
      cluster = resource[0].cluster
      selectors = resource.map(
        item => item.selector || get(item, 'resource.selector')
      )
    } else {
      namespace = resource.namespace
      cluster = resource.cluster

      selectors.push(resource.selector || get(resource, 'resource.selector'))
    }

    const requests = []

    selectors.forEach(selector => {
      if (!isEmpty(selector)) {
        const labelSelector = joinSelector(selector)
        requests.push(
          this.volumeStore.fetchListByK8s({
            cluster,
            namespace,
            labelSelector,
          }),
          this.serviceStore.fetchListByK8s({
            cluster,
            namespace,
            labelSelector,
          })
        )
      }
    })

    const results = await Promise.all(requests)
    if (store.module === 'deployments') {
      const scheduleData =
        (await store.getAllScheduleProject?.({ namespace })) ?? []
      if (!isEmpty(scheduleData)) {
        allScheduleProject = scheduleData.items.map(item => item.metadata.name)
      }
    }

    this.setState({
      relatedResources: uniqBy(flatten(results), 'uid'),
      isLoading: false,
      scheduledProjectList: allScheduleProject,
    })
  }

  stopPropagation = e => e.stopPropagation()

  handleOk = async () => {
    const { onOk, resource, store } = this.props
    const {
      selectedRelatedResourceIds,
      relatedResources,
      scheduledProjectList,
    } = this.state

    const requests = []
    relatedResources.forEach(item => {
      if (selectedRelatedResourceIds.includes(item.uid)) {
        if (item.module === 'services') {
          requests.push(this.serviceStore.delete(item))
        } else if (item.module === 'persistentvolumeclaims') {
          requests.push(this.volumeStore.delete(item))
        }
      }
    })

    await Promise.all(requests)

    if (isArray(resource)) {
      const namespace = resource[0].namespace
      const resourceNames = resource.map(item => item.name)
      const deleteList = resourceNames.filter(project =>
        scheduledProjectList.includes(project)
      )
      await Promise.all(resource.map(item => store.delete(item)))
      await Promise.all(
        deleteList.map(name => store.deleteSchedule({ name, namespace }))
      )
      store.list.setSelectRowKeys([])
    } else {
      await store.delete(resource)
      scheduledProjectList.includes(resource.name) &&
        (await store.deleteSchedule({
          name: resource.name,
          namespace: resource.namespace,
        }))
    }

    onOk()
  }

  handleItemClick = e => {
    const uid = e.currentTarget.dataset.uid
    this.setState(({ selectedRelatedResourceIds }) => ({
      selectedRelatedResourceIds: selectedRelatedResourceIds.includes(uid)
        ? selectedRelatedResourceIds.filter(item => item !== uid)
        : [...selectedRelatedResourceIds, uid],
    }))
  }

  handleSelectAll = () => {
    const { relatedResources, selectedRelatedResourceIds } = this.state

    if (isEmpty(selectedRelatedResourceIds)) {
      this.setState({
        selectedRelatedResourceIds: relatedResources.map(item => item.uid),
      })
    }
  }

  renderContent() {
    const {
      isLoading,
      relatedResources,
      selectedRelatedResourceIds,
    } = this.state

    if (isLoading === false && isEmpty(relatedResources)) {
      return (
        <EmptyList
          icon="appcenter"
          className={styles.empty}
          title={t('NO_RELATED_RESOURCE_FOUND')}
          desc={t('NO_WORKLOAD_RELATED_RESOURCE_DESC')}
        />
      )
    }

    return (
      <div className={styles.resources}>
        {!isEmpty(relatedResources) && (
          <div className={styles.resource}>
            <Checkbox
              checked={!isEmpty(selectedRelatedResourceIds)}
              onClick={this.handleSelectAll}
              indeterminate={!isEmpty(selectedRelatedResourceIds)}
            />
            <span className={styles.resourceName}>{t('SELECT_ALL')}</span>
          </div>
        )}
        {relatedResources.map(resource => (
          <div
            key={resource.uid}
            data-uid={resource.uid}
            className={classNames(styles.resource, {
              [styles.selected]: selectedRelatedResourceIds.includes(
                resource.uid
              ),
            })}
            onClick={this.handleItemClick}
          >
            <Checkbox
              checked={selectedRelatedResourceIds.includes(resource.uid)}
              onClick={this.stopPropagation}
            />
            <Icon
              name={ICON_TYPES[resource.module]}
              size={20}
              type={
                selectedRelatedResourceIds.includes(resource.uid)
                  ? 'light'
                  : 'dark'
              }
            />
            <span className={styles.resourceName}>{resource.name}</span>
            <span className={styles.resourceType}>
              {t(MODULE_KIND_MAP[resource.module])}
            </span>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { enableConfirm, timer } = this.state
    const { resource, onOk, onCancel, isSubmitting, ...rest } = this.props

    const title =
      isArray(resource) && resource.length !== 1
        ? t('DELETE_MULTIPLE_WORKLOADS')
        : t('DELETE_WORKLOAD')

    const description =
      isArray(resource) && resource.length !== 1
        ? t.html('DELETE_WORKLOAD_DESC_PL', {
            resource: resource.map(item => item.name).join(', '),
          })
        : isArray(resource)
        ? t.html('DELETE_WORKLOAD_DESC_SI', {
            resource: resource.map(item => item.name).join(', '),
          })
        : t.html('DELETE_WORKLOAD_DESC_SI', { resource: resource.name })

    return (
      <Modal
        width={520}
        icon="question"
        title={title}
        description={description}
        closable={false}
        headerClassName={styles.modalHeader}
        bodyClassName={styles.modalBody}
        hideFooter
        {...rest}
      >
        <div className={styles.body}>{this.renderContent()}</div>
        <div className={styles.footer}>
          <Button onClick={onCancel} data-test="modal-cancel">
            {t('CANCEL')}
          </Button>
          <Button
            type="danger"
            loading={isSubmitting}
            disabled={!enableConfirm || isSubmitting}
            onClick={this.handleOk}
            data-test="modal-ok"
          >
            {t('OK')}
            {!enableConfirm && `(${timer}s)`}
          </Button>
        </div>
      </Modal>
    )
  }
}
