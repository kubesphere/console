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
import { get, flatten, isArray, isEmpty } from 'lodash'
import { Icon, Checkbox } from '@pitrix/lego-ui'

import { joinSelector, getDisplayName } from 'utils'
import { ICON_TYPES, MODULE_KIND_MAP } from 'utils/constants'
import ObjectMapper from 'utils/object.mapper'
import { Button, Modal } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'

import WorkloadStore from 'stores/workload'
import VolumeStore from 'stores/volume'
import Builder from 'stores/s2i/builder'
import styles from './index.scss'

const modules = ['deployments', 'daemonsets', 'statefulsets']

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
      relatedResources: [],
      selectedRelatedResourceIds: [],
      enableConfirm: false,
      timer: 3,
    }

    this.workloadStore = new WorkloadStore()
    this.volumeStore = new VolumeStore()
    this.builderStore = new Builder()
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
      selectors = resource.map(item => item.selector)
      namespace = resource[0].namespace
    } else {
      selectors.push(resource.selector)
      namespace = resource.namespace
    }

    const requests = []

    selectors.forEach(selector => {
      if (!isEmpty(selector)) {
        const labelSelector = joinSelector(selector)

        requests.push(
          this.volumeStore.fetchListByK8s({ namespace, labelSelector }),
          ...modules.map(module =>
            this.workloadStore.fetchListByK8s(
              { namespace, labelSelector },
              module
            )
          )
        )
        if (selector.s2ibuilder) {
          requests.push(
            this.builderStore
              .fetchDetail({
                namespace,
                name: selector.s2ibuilder,
              })
              .then(res => [res])
          )
        }
      }
    })

    const results = await Promise.all(requests)
    const regex = new RegExp(`\\/namespaces\\/${namespace}\\/(.*)\\/.*`)
    this.setState({
      relatedResources: flatten(
        results.map((resources = []) =>
          resources.map(item => {
            const originPath = item._originData ? '_originData.' : ''

            if (get(item, `${originPath}spec.storageClassName`)) {
              return {
                ...item,
                type: 'volumes',
              }
            }

            const module = get(
              get(item, `${originPath}metadata.selfLink`, '').match(regex),
              '[1]',
              'deployments'
            )

            return {
              ...ObjectMapper[module](item),
              type: module,
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
        if (resource.type === 'volumes') {
          requests.push(this.volumeStore.delete(resource))
        } else if (modules.includes(resource.type)) {
          this.workloadStore.setModule(resource.type)
          requests.push(this.workloadStore.delete(resource))
        } else if (resource.type === 's2ibuilders') {
          requests.push(this.builderStore.delete(resource))
        }
      }
    })

    Promise.all(requests)
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
      relatedResources,
      selectedRelatedResourceIds,
    } = this.state

    if (isLoading === false && isEmpty(relatedResources)) {
      return (
        <EmptyList
          icon="appcenter"
          className={styles.empty}
          title={t('No related resources')}
          desc={t('No related resources found with current service(s)')}
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
            <Icon
              name={ICON_TYPES[resource.type]}
              size={20}
              type={
                selectedRelatedResourceIds.includes(resource.uid)
                  ? 'light'
                  : 'dark'
              }
            />
            <span className={styles.resourceName}>
              {getDisplayName(resource)}
            </span>
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

    const title = `${t('Sure to delete the service(s)?')}`

    const description = t('DELETE_SERVICE_DESC', {
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
          <Button onClick={onCancel}>{t('Cancel')}</Button>
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
