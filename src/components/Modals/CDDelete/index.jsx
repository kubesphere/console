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
import { get, isArray, isEmpty } from 'lodash'
import { Button, Checkbox } from '@kube-design/components'

import { getDisplayName } from 'utils'

import { Modal } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'

import styles from './index.scss'

export default class ServiceDeleteModal extends React.Component {
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

    this.state = {
      enableConfirm: false,
      selectedRelatedResourceIds: [],
      relatedResources: [],
      timer: 3,
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
    let relatedResources = []

    if (isArray(resource)) {
      relatedResources = resource.filter(item =>
        get(item, 'status.operationState.syncResult.resources')
      )
    } else if (get(resource, 'status.operationState.syncResult.resources')) {
      relatedResources.push(resource)
    }

    this.setState({
      relatedResources,
      isLoading: false,
    })
  }

  stopPropagation = e => e.stopPropagation()

  handleOk = async () => {
    const { onOk, store, resource } = this.props
    const { selectedRelatedResourceIds } = this.state

    if (isArray(resource)) {
      const requests = []
      resource.forEach(item => {
        requests.push(
          store.delete({
            ...item,
            isRelated: selectedRelatedResourceIds.includes(item.uid),
          })
        )
      })
      await Promise.all(requests)
      store.list.setSelectRowKeys([])
    } else {
      await store.delete({
        ...resource,
        isRelated: selectedRelatedResourceIds.includes(resource.uid),
      })
    }

    onOk()
  }

  handleItemClick = e => {
    const id = e.currentTarget.dataset.id
    this.setState(({ selectedRelatedResourceIds }) => ({
      selectedRelatedResourceIds: selectedRelatedResourceIds.includes(id)
        ? selectedRelatedResourceIds.filter(item => item !== id)
        : [...selectedRelatedResourceIds, id],
    }))
  }

  renderContent() {
    const {
      isLoading,
      relatedResources = [],
      selectedRelatedResourceIds,
    } = this.state

    if (isLoading === false && isEmpty(relatedResources)) {
      return (
        <EmptyList
          icon="appcenter"
          className={styles.empty}
          title={t('NO_RELATED_RESOURCE_FOUND')}
          desc={t('NO_CONTINUOUS_DEPLOYMENT_RELATED_RESOURCE_DESC')}
        />
      )
    }

    return (
      <div className={styles.resources}>
        {relatedResources.map(resource => (
          <div
            key={resource.uid}
            data-id={resource.uid}
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

            <span className={styles.resourceName}>
              {t('DELETE_CONTINUOUS_DEPLOYMENT_RELATE_DESC', {
                resourceName: getDisplayName(resource),
              })}
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
        ? t('DELETE_MULTIPLE_CONTINUOUS_DEPLOYMENT')
        : t('DELETE_CONTINUOUS_DEPLOYMENT')

    const description =
      isArray(resource) && resource.length !== 1
        ? t.html('DELETE_CONTINUOUS_DEPLOYMENT_DESC_PL', {
            resource: resource.map(item => item.name).join(', '),
          })
        : isArray(resource)
        ? t.html('DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI', {
            resource: resource.map(item => item.name).join(', '),
          })
        : t.html('DELETE_CONTINUOUS_DEPLOYMENT_DESC_SI', {
            resource: resource.name,
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
          <Button onClick={onCancel}>{t('CANCEL')}</Button>
          <Button
            type="danger"
            loading={isSubmitting}
            disabled={!enableConfirm || isSubmitting}
            onClick={this.handleOk}
          >
            {t('OK')}
            {!enableConfirm && `(${timer}s)`}
          </Button>
        </div>
      </Modal>
    )
  }
}
