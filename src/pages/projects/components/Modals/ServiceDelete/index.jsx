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
import { get, flatten, isArray, isEmpty, uniqBy } from 'lodash'
import { Button, Icon, Checkbox } from '@kube-design/components'

import { joinSelector, getDisplayName } from 'utils'
import { ICON_TYPES, MODULE_KIND_MAP } from 'utils/constants'
import { Modal } from 'components/Base'
import EmptyList from 'components/Cards/EmptyList'

import PodStore from 'stores/pod'
import WorkloadStore from 'stores/workload'
import VolumeStore from 'stores/volume'
import FederatedStore from 'stores/federated'
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
    this.podStore = new PodStore()

    if (props.isFederated) {
      this.workloadStore = new FederatedStore({
        module: 'deployments',
      })
      this.volumeStore = new FederatedStore({
        module: this.volumeStore.module,
      })
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
    let cluster
    if (isArray(resource)) {
      selectors = resource.map(
        item => item.selector || get(item, 'resource.selector')
      )
      namespace = resource[0].namespace
      cluster = resource[0].cluster
    } else {
      selectors.push(resource.selector || get(resource, 'resource.selector'))
      namespace = resource.namespace
      cluster = resource.cluster
    }

    const requests = []
    const _modules = this.props.isFederated
      ? ['deployments', 'statefulsets']
      : modules

    selectors.forEach(selector => {
      if (!isEmpty(selector)) {
        const labelSelector = joinSelector(selector)

        requests.push(
          this.volumeStore.fetchListByK8s({
            cluster,
            namespace,
            labelSelector,
          }),
          this.podStore.fetchListByK8s({
            cluster,
            namespace,
            labelSelector,
          }),
          ..._modules.map(module =>
            this.workloadStore.fetchListByK8s({
              cluster,
              namespace,
              labelSelector,
              module,
            })
          )
        )
        if (selector.s2ibuilder) {
          requests.push(
            this.builderStore
              .fetchDetail({
                cluster,
                namespace,
                name: selector.s2ibuilder,
                module: 's2ibuilders',
              })
              .then(res => [res])
          )
        }
      }
    })

    const results = await Promise.all(requests)
    const relatedResources = uniqBy(flatten(results), 'uid').filter(
      item => !isEmpty(item.name)
    )

    this.setState({
      relatedResources,
      isLoading: false,
    })
  }

  stopPropagation = e => e.stopPropagation()

  handleOk = async () => {
    const { onOk, store, resource } = this.props
    const { selectedRelatedResourceIds, relatedResources } = this.state
    const requests = []
    relatedResources.forEach(item => {
      if (selectedRelatedResourceIds.includes(item.uid)) {
        if (item.module === 'persistentvolumeclaims') {
          requests.push(this.volumeStore.delete(item))
        } else if (modules.includes(item.module)) {
          this.workloadStore.setModule(item.module)
          requests.push(this.workloadStore.delete(item))
        } else if (item.module === 's2ibuilders' || item.type === 's2i') {
          requests.push(this.builderStore.delete(item))
        } else if (item.module === 'pods') {
          requests.push(this.podStore.delete(item))
        }
      }
    })

    if (isArray(resource)) {
      await Promise.all(resource.map(item => store.delete(item)))
      store.list.setSelectRowKeys([])
    } else {
      await store.delete(resource)
    }

    await Promise.all(requests)

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
          title={t('NO_RELATED_RESOURCE_FOUND')}
          desc={t('NO_SERVICE_RELATED_RESOURCE_DESC')}
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
              name={ICON_TYPES[resource.module]}
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
        ? t('DELETE_MULTIPLE_SERVICES')
        : t('DELETE_SERVICE')

    const description =
      isArray(resource) && resource.length !== 1
        ? t.html('DELETE_SERVICE_DESC_PL', {
            resource: resource.map(item => item.name).join(', '),
          })
        : isArray(resource)
        ? t.html('DELETE_SERVICE_DESC_SI', {
            resource: resource.map(item => item.name).join(', '),
          })
        : t.html('DELETE_SERVICE_DESC_SI', { resource: resource.name })

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
