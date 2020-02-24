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
import { flatten, isArray, isEmpty } from 'lodash'
import { Icon, Checkbox } from '@pitrix/lego-ui'

import { joinSelector } from 'utils'
import { ICON_TYPES, MODULE_KIND_MAP } from 'utils/constants'
import { Button, Modal } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'

import ServiceStore from 'stores/service'
import VolumeStore from 'stores/volume'
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

    this.state = {
      relatedResources: [],
      selectedRelatedResourceIds: [],
      enableConfirm: false,
      timer: 3,
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, resource } = this.props

    if (visible !== prevProps.visible) {
      if (visible) {
        this.setState({ enableConfirm: false, relatedResources: [], timer: 3 })
        this.fetchRelatedResources(resource)
        this.startTimer()
      } else {
        this.timer && clearInterval(this.timer)
      }
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
    this.setState({ isLoading: true })
    let selectors = []
    let namespace
    if (isArray(resource)) {
      namespace = resource[0].namespace
      selectors = resource.map(item => item.selector)
    } else {
      namespace = resource.namespace
      selectors.push(resource.selector)
    }

    const requests = []

    selectors.forEach(selector => {
      if (!isEmpty(selector)) {
        const labelSelector = joinSelector(selector)
        requests.push(
          this.volumeStore.fetchListByK8s({ namespace, labelSelector }),
          this.serviceStore.fetchListByK8s({ namespace, labelSelector })
        )
      }
    })

    const results = await Promise.all(requests)
    this.setState({
      relatedResources: flatten(
        results.map((resources = []) =>
          resources.map(item => {
            if (item.storageClassName) {
              return {
                ...item,
                type: 'volumes',
              }
            }

            return {
              ...item,
              type: 'services',
            }
          })
        )
      ),
      isLoading: false,
    })
  }

  stopPropagation = e => e.stopPropagation()

  handleOk = () => {
    const { onOk } = this.props
    const { selectedRelatedResourceIds, relatedResources } = this.state

    const requests = []
    relatedResources.forEach(resource => {
      if (selectedRelatedResourceIds.includes(resource.uid)) {
        if (resource.type === 'services') {
          requests.push(this.serviceStore.delete(resource))
        } else if (resource.type === 'volumes') {
          requests.push(this.volumeStore.delete(resource))
        }
      }
    })

    Promise.all(requests)
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
          title={t('No related resources')}
          desc={t('No related resources found with current workload(s)')}
        />
      )
    }

    return (
      <div className={styles.resources}>
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
              name={ICON_TYPES[resource.type]}
              size={20}
              type={
                selectedRelatedResourceIds.includes(resource.uid)
                  ? 'light'
                  : 'dark'
              }
            />
            <span className={styles.resourceName}>{resource.name}</span>
            <span className={styles.resourceType}>
              {t(MODULE_KIND_MAP[resource.type])}
            </span>
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { enableConfirm, timer } = this.state
    const { resource, onOk, onCancel, isSubmitting, ...rest } = this.props

    const title = `${t('Sure to delete the workload(s)?')}`

    const description = t('DELETE_WORKLOAD_DESC', {
      resource:
        resource.length > 1
          ? resource.map(item => item.name).join(', ')
          : resource.name,
    })

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
            {t('Cancel')}
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
