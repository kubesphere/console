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

import { get, set, unset, isEmpty, keyBy, throttle } from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { toJS, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import {
  Button,
  Loading,
  Columns,
  Column,
  Alert,
  Icon,
} from '@kube-design/components'
import { Modal, NotifyConfirm } from 'components/Base'
import { TrafficSlider } from 'components/Inputs'

import GrayReleaseStore from 'stores/grayrelease'
import WorkloadStore from 'stores/workload'

import { joinSelector, mergeLabels } from 'utils'
import {
  GRAY_RELEASE_CANARY_CONTENT,
  GRAY_RELEASE_CATEGORIES,
} from 'utils/constants'
import FORM_TEMPLATES from 'utils/form.templates'

import Component from './Component'
import Monitor from './Monitor'
import EditModal from './Edit'

import styles from './index.scss'

const MATCH_TYPES = {
  exact: 'Exact Match',
  prefix: 'Prefix Match',
  regex: 'Regex Match',
}

const CANARY_CONTENT = keyBy(GRAY_RELEASE_CANARY_CONTENT, 'value')

@inject('rootStore')
@observer
export default class GatewaySettingModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onCancel() {},
    onDelete() {},
  }

  constructor(props) {
    super(props)

    this.state = {
      tipType: '',
      tipInfo: '',
      ratio: 50,
      showEditModal: false,
    }

    this.store = new GrayReleaseStore()

    this.workloadType = get(
      props.detail,
      'annotations["servicemesh.kubesphere.io/workloadType"]',
      'deployments'
    )

    this.workloadStore = new WorkloadStore(this.workloadType)

    if (props.visible) {
      this.getData(props.detail)
      this.getWorkLoadDetail(props.detail)
    }
  }

  initWebsocket(detail) {
    const { cluster, namespace, selector } = detail || {}

    const url = `api/v1/watch/${
      cluster ? `klusters/${cluster}/` : ''
    }namespaces/${namespace}/pods?labelSelector=${joinSelector(selector)}`

    if (url && namespace && selector) {
      this.websocket.watch(url)

      this.getWorkLoadDetail = throttle(this.getWorkLoadDetail, 2000)

      this.disposer = reaction(
        () => this.websocket.message,
        message => {
          if (message.object.kind === 'Pod' && message.type !== 'ADDED') {
            this.getWorkLoadDetail({ ...detail, silent: true })
          }
        }
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { visible, detail } = this.props
    if (visible && visible !== prevProps.visible) {
      this.getData(detail)
      this.getWorkLoadDetail(detail)
    }
  }

  componentWillUnmount() {
    this.disposer && this.disposer()
    this.websocket.close()
  }

  get websocket() {
    return this.props.rootStore.websocket
  }

  getData(detail = {}) {
    if (detail.name && detail.namespace) {
      this.store.fetchDetail(detail).then(() => {
        const data = toJS(this.store.detail)
        if (data.type === 'Canary' && !data.byContent) {
          const ratio = get(data, 'newRoute.weight', 50)
          this.setState({ ratio })
        }

        this.initWebsocket(data)
        this.updateTipInfo()
      })
    }
  }

  updateTipInfo = () => {
    const { governor, newVersion, oldVersion } = toJS(this.store.detail)
    if (governor) {
      this.setState({
        tipType: 'info',
        tipInfo: t('JOB_OFFLINE_INFO', {
          version: governor === oldVersion ? newVersion : oldVersion,
        }),
      })
    } else {
      this.setState({ tipInfo: '' })
    }
  }

  getWorkLoadDetail({ silent, ...detail } = {}) {
    const {
      cluster,
      namespace,
      selector,
      hosts: service,
      newVersion,
      oldVersion,
    } = detail
    if (namespace && selector) {
      const labelSelector = joinSelector(selector)
      this.workloadStore.fetchListByK8s({ cluster, namespace, labelSelector })
      this.store.fetchComponents({
        cluster,
        namespace,
        service,
        labelSelector,
        newVersion,
        oldVersion,
        silent,
      })
    }
  }

  get formData() {
    const detail = toJS(this.store.detail)
    const newWorkloadName = `${detail.hosts}-${detail.newVersion}`
    const workload =
      toJS(this.workloadStore.list.data).find(
        item => item.name === newWorkloadName
      ) || {}

    const template = FORM_TEMPLATES[this.workloadType]({
      namespace: detail.namespace,
    })

    const formData = {
      strategy: toJS(detail._originData),
      workload: {
        apiVersion: template.apiVersion,
        kind: template.kind,
        metadata: {
          name: newWorkloadName,
          namespace: workload.namespace,
          labels: workload.labels,
          annotations: workload.annotations,
        },
        spec: workload.spec,
      },
    }

    mergeLabels(formData.workload, { version: detail.newVersion })

    return formData
  }

  handlePatch = data => {
    const params = toJS(this.store.detail)
    this.store.patch(params, data).then(() => {
      this.store.fetchDetail(params).then(() => {
        const detail = toJS(this.store.detail)
        if (detail.type === 'Canary' && !detail.byContent) {
          const ratio = get(detail, 'newRoute.weight', 50)
          this.setState({ ratio })
        }

        this.updateTipInfo()
      })
    })
  }

  handleRatioChange = ratio => {
    this.setState({ ratio })
  }

  handleConfirmSaveRatio = () => {
    const { ratio } = this.state
    this.handleSaveRatio(ratio)
  }

  handleSaveRatio = ratio => {
    const { oldRoute, oldVersion, newRoute, newVersion, protocol } = toJS(
      this.store.detail
    )
    const data = {}

    set(data, `spec.template.spec.${protocol}[0].route`, [
      { ...oldRoute, weight: 100 - ratio },
      { ...newRoute, weight: ratio },
    ])

    if (protocol === 'tcp') {
      set(data, `spec.template.spec.${protocol}[0].match`, [])
    }

    if (ratio === 100) {
      set(data, 'spec.governor', newVersion)
    } else if (ratio === 0) {
      set(data, 'spec.governor', oldVersion)
    } else {
      set(data, 'spec.governor', '')
    }

    this.handlePatch(data)
  }

  handleResetRatio = () => {
    const detail = toJS(this.store.detail)
    const originRatio = get(detail, 'newRoute.weight')
    this.setState({ ratio: originRatio })
  }

  showEditModal = () => {
    this.setState({ showEditModal: true })
  }

  hideEditModal = () => {
    this.setState({ showEditModal: false })
  }

  updateStrategy = strategy => {
    const protocol = get(strategy, 'spec.protocol', 'http')
    const prefix = `spec.template.spec.${protocol}[0]`

    // unset empty option
    const cookie = get(strategy, `${prefix}.match[0].headers.cookie`)
    if (cookie && isEmpty(Object.values(cookie)[0])) {
      unset(strategy, `${prefix}.match[0].headers.cookie`)
    }

    const headers = get(strategy, `${prefix}.match[0].headers`)
    if (headers) {
      Object.keys(headers).forEach(key => {
        if (isEmpty(key)) {
          unset(strategy, `${prefix}.match[0].headers.${key}`)
        }
      })
    }

    const uri = get(strategy, `${prefix}.match[0].uri`)
    if (uri && isEmpty(Object.values(uri)[0])) {
      unset(strategy, `${prefix}.match[0].uri`)
    }

    const regex = get(
      strategy,
      `${prefix}.match[0].headers['User-Agent'].regex`
    )
    if (regex && isEmpty(Object.values(regex)[0])) {
      unset(strategy, `${prefix}.match[0].headers['User-Agent'].regex`)
    }

    return strategy
  }

  handleComponentEdit = (data, updatedModules) => {
    const detail = toJS(this.store.detail)

    const newData = {}
    if (updatedModules.includes('grayReleaseStrategy')) {
      newData.strategy = this.updateStrategy(data.strategy)
    }
    if (updatedModules.includes('grayReleaseComponent')) {
      newData.workload = data.workload
    }

    this.store.update(detail, newData).then(() => {
      this.store.fetchDetail(detail).then(() => {
        this.hideEditModal()

        const _detail = toJS(this.store.detail)
        if (_detail.type === 'Canary' && !_detail.byContent) {
          const ratio = get(_detail, 'newRoute.weight', 50)
          this.setState({ ratio })
        }

        this.updateTipInfo()
      })
    })
  }

  handleOffline = () => {
    const {
      type,
      cluster,
      namespace,
      governor,
      oldVersion,
      oldWorkloadName,
      newWorkloadName,
    } = toJS(this.store.detail)

    if (governor) {
      const { onDelete } = this.props
      const workloadName =
        governor === oldVersion ? newWorkloadName : oldWorkloadName

      if (workloadName) {
        this.workloadStore.delete({
          name: workloadName,
          cluster,
          namespace,
        })
        onDelete()
      }
      return
    }

    if (type === 'Mirror') {
      const { onDelete } = this.props
      if (newWorkloadName) {
        this.workloadStore.delete({
          name: newWorkloadName,
          cluster,
          namespace,
        })
        onDelete()
      }

      return
    }

    this.setState({ tipType: 'warning', tipInfo: t('JOB_OFFLINE_WARNING') })
  }

  handleTakeover = type => {
    const detail = toJS(this.store.detail)
    if (detail.type === 'Canary') {
      if (detail.byContent) {
        this.handlePatch({
          spec: {
            governor: type === 'new' ? detail.newVersion : detail.oldVersion,
          },
        })
      } else {
        this.handleSaveRatio(type === 'new' ? 100 : 0)
      }
    } else if (detail.type === 'Bluegreen') {
      this.handlePatch({
        spec: {
          governor: type === 'new' ? detail.newVersion : detail.oldVersion,
        },
      })
    }
  }

  handleRecover = () => {
    this.handlePatch({ spec: { governor: '' } })
  }

  renderTitle() {
    const detail = toJS(this.store.detail)
    const cate =
      GRAY_RELEASE_CATEGORIES.find(item => item.type === detail.type) || {}

    return (
      <div className={styles.title}>
        <img src="/assets/default-app.svg" alt="" />
        <div className={styles.text}>
          <div className="h4">{detail.name}</div>
          <p>
            {t('Grayscale Release Strategy')}: <strong>{t(cate.title)}</strong>
          </p>
        </div>
        <Button onClick={this.handleOffline}>{t('Job offline')}</Button>
      </div>
    )
  }

  renderComponents() {
    const detail = toJS(this.store.detail)
    const { data } = this.store.components
    const isLoading = this.store.isComponentsLoading

    if (isLoading) {
      return (
        <div>
          <div className={styles.sectionTitle}>
            <div>{t('Grayscale Release Components')}</div>
            <p>{t('CANARY_RELEASES_DESC')}</p>
          </div>
          <Loading spinning={isLoading} className={styles.loading} />
        </div>
      )
    }

    const props = {
      showEditModal: this.showEditModal,
      onTakeover: detail.type !== 'Mirror' ? this.handleTakeover : null,
      namespace: this.props.detail.namespace,
      cluster: this.props.detail.cluster,
      workspace: this.props.detail.workspace,
      maxLength: Math.min(
        Math.max(
          get(data, `[${detail.newVersion}].pods.length`, 0),
          get(data, `[${detail.oldVersion}].pods.length`, 0)
        ),
        3
      ),
      jobDetail: detail,
      workloadType: this.workloadType,
    }

    return (
      <div>
        <div className={styles.sectionTitle}>
          <div>{t('Grayscale Release Components')}</div>
          <p>{t('CANARY_RELEASES_DESC')}</p>
        </div>
        <Columns>
          <Column>
            <Component
              data={data[detail.newVersion]}
              pods={toJS(get(data, `[${detail.newVersion}].pods`, []))}
              type="new"
              isGovernor={detail.governor === detail.newVersion}
              {...props}
            />
          </Column>
          <Column>
            <Component
              data={data[detail.oldVersion]}
              pods={toJS(get(data, `[${detail.oldVersion}].pods`, []))}
              type="old"
              isGovernor={detail.governor === detail.oldVersion}
              {...props}
            />
          </Column>
        </Columns>
      </div>
    )
  }

  renderTraffic() {
    const detail = toJS(this.store.detail)
    const { ratio } = this.state

    const leftContent = `${detail.newVersion} ${t('traffic')}`
    const rightContent = `${detail.oldVersion} ${t('traffic')}`

    const originRatio = get(detail, 'newRoute.weight')

    return (
      <>
        <div className={styles.sectionTitle}>
          <div>{t('Real-time traffic distribution')}</div>
          <p>
            {t(
              'Allocate all traffic proportionally to grayscale release components'
            )}
          </p>
        </div>
        <TrafficSlider
          min={0}
          max={100}
          value={ratio}
          leftContent={leftContent}
          rightContent={rightContent}
          onChange={this.handleRatioChange}
        />
        <NotifyConfirm
          visible={ratio !== originRatio}
          width={400}
          title={t('REPLICAS_SCALE_NOTIFY_TITLE')}
          content={t.html('RATIO_MODIFY_NOTIFY_CONTENT', {
            version: detail.newVersion,
            ratio,
          })}
          cancelText={t('Reset')}
          confirmText={t('Save')}
          isSubmitting={this.store.isSubmitting}
          onCancel={this.handleResetRatio}
          onConfirm={this.handleConfirmSaveRatio}
        />
      </>
    )
  }

  renderBluegreen() {
    const detail = toJS(this.store.detail)

    const selectVersion =
      detail.governor ||
      (detail.oldRoute.weight === 100 ? detail.oldVersion : detail.newVersion)

    return (
      <>
        <div className={styles.sectionTitle}>
          <div>{t('Real-time traffic distribution')}</div>
          <p>{t('Real-time traffic ratio')}</p>
        </div>
        <div className={styles.barWrapper}>
          <div className={styles.bar}>
            {`${selectVersion} ${t('traffic')} 100%`}
          </div>
        </div>
      </>
    )
  }

  renderMirror() {
    const detail = toJS(this.store.detail)

    const selectVersion =
      detail.governor ||
      (detail.oldRoute.weight === 100 ? detail.oldVersion : detail.newVersion)

    return (
      <>
        <div className={styles.sectionTitle}>
          <div>{t('Real-time traffic distribution')}</div>
          <p>{t('Real-time traffic ratio')}</p>
        </div>
        <div className={styles.mirror}>
          <div className={styles.barWrapper}>
            <div
              className={classNames(styles.bar, {
                [styles.mirrorBar]: selectVersion !== detail.newVersion,
              })}
            >
              {`${detail.newVersion} ${t('traffic')} 100%`}
            </div>
          </div>
          <div
            className={classNames(styles.mirrorIcon, {
              [styles.revertMirrorIcon]: selectVersion === detail.oldVersion,
            })}
          >
            <img src="/assets/mirror.svg" alt="" />
          </div>
          <div className={styles.barWrapper}>
            <div
              className={classNames(styles.bar, {
                [styles.mirrorBar]: selectVersion !== detail.oldVersion,
              })}
            >
              {`${detail.oldVersion} ${t('traffic')} 100%`}
            </div>
          </div>
        </div>
      </>
    )
  }

  renderContentMatch() {
    const detail = toJS(this.store.detail)
    const { data } = this.store.components
    const isLoading = this.store.isComponentsLoading

    if (isLoading) {
      return (
        <div>
          <div className={styles.sectionTitle}>
            <div>{t('Traffic Control')}</div>
            <p>
              {t(
                'Introduce traffic that meets the following rules into grayscale version'
              )}
            </p>
          </div>
          <Loading spinning={isLoading} className={styles.loading} />
        </div>
      )
    }

    const match = get(detail, 'newRoute.match[0]')

    const newData = data[detail.newVersion] || {}

    if (!match) {
      return null
    }

    const uri = get(match, 'uri', {})
    const headers = get(match, 'headers', {})

    const uriMatchType = Object.keys(uri)[0] || ''
    const uriMatchValue = uri[uriMatchType] || '-'

    const cookie = headers.cookie || {}
    const cookieMatchType = Object.keys(cookie)[0] || ''
    const cookieMatchValue = cookie[cookieMatchType] || '-'

    const os = headers['User-Agent'] || {}
    const osMatchValue = os.regex
      ? os.regex
          .slice(2, os.regex.length - 2)
          .split('|')
          .map(item =>
            CANARY_CONTENT[item] ? CANARY_CONTENT[item].label : item
          )
          .join(', ') || '-'
      : '-'

    const customKey = Object.keys(headers).find(
      key => !['cookie', 'User-Agent'].includes(key)
    )
    const customHeader = headers[customKey] || {}
    const customHeaderMatchType = Object.keys(customHeader)[0] || ''
    const customHeaderMatchValue = customHeader[customHeaderMatchType] || '-'

    return (
      <>
        <div className={styles.sectionTitle}>
          <div>{t('Traffic Control')}</div>
          <p>
            {t(
              'Introduce traffic that meets the following rules into grayscale version'
            )}
          </p>
        </div>
        <div className={styles.matchWrapper}>
          {detail.governor && (
            <div className={styles.governor}>
              <div>
                <div>
                  <Icon name="appcenter" size={40} />
                </div>
                <div>
                  <span className="ks-tag">{detail.governor}</span>
                </div>
                <div>
                  <strong>{detail.hosts}</strong>
                </div>
                <p>{t('Has taken over all traffic')}</p>
                <div>
                  <Button onClick={this.handleRecover}>{t('Recover')}</Button>
                </div>
              </div>
            </div>
          )}
          <Columns>
            <Column>
              <ul>
                <li>
                  <Icon name="earth" size={24} />
                  <strong>{`${t('Cookie Content')}${
                    cookieMatchType
                      ? `(${t(MATCH_TYPES[cookieMatchType])})`
                      : ''
                  }`}</strong>
                  {cookieMatchValue}
                </li>
                <li>
                  <Icon name="image" size={24} />
                  <strong>{t('Operating System')}</strong>
                  {osMatchValue}
                </li>
                <li>
                  <Icon name="pen" size={24} />
                  <strong>{`${t('Custom Header')}${
                    customHeaderMatchType
                      ? `(${t(MATCH_TYPES[customHeaderMatchType])})`
                      : ''
                  }`}</strong>
                  {customKey ? `${customKey}: ${customHeaderMatchValue}` : ''}
                </li>
                <li>
                  <Icon name="ip" size={24} />
                  <strong>{`${t('URI')}${
                    uriMatchType ? `(${t(MATCH_TYPES[uriMatchType])})` : ''
                  }`}</strong>
                  {uriMatchValue}
                </li>
              </ul>
            </Column>
            <Column className="is-narrow">
              <div className={styles.matchArrow}>
                <Icon name="update" color={{ primary: '#329dce' }} size={24} />
              </div>
            </Column>
            <Column className="is-narrow">
              <div className={styles.matchVersion}>
                <div>
                  <div>
                    <Icon name="appcenter" size={40} />
                  </div>
                  <div>
                    <span className="ks-tag">{detail.newVersion}</span>
                  </div>
                  <div>
                    <strong>{detail.hosts}</strong>
                  </div>
                  <p>
                    {t('Replicas')}: <strong>{newData.available}</strong>/
                    {newData.desire}
                  </p>
                </div>
              </div>
            </Column>
          </Columns>
        </div>
      </>
    )
  }

  renderPolicy() {
    const detail = toJS(this.store.detail)

    if (detail.type === 'Canary') {
      return (
        <div style={{ marginTop: 20 }}>
          {detail.byContent ? this.renderContentMatch() : this.renderTraffic()}
        </div>
      )
    }
    if (detail.type === 'Bluegreen') {
      return <div style={{ marginTop: 20 }}>{this.renderBluegreen()}</div>
    }
    if (detail.type === 'Mirror') {
      return <div style={{ marginTop: 20 }}>{this.renderMirror()}</div>
    }

    return null
  }

  renderMonitor() {
    const detail = toJS(this.store.detail)
    return <Monitor detail={detail} store={this.store} />
  }

  render() {
    const { visible, onCancel } = this.props
    const { showEditModal, tipInfo, tipType } = this.state
    const detail = toJS(this.store.detail)

    return (
      <Modal
        className={styles.modal}
        bodyClassName={styles.body}
        headerClassName={styles.header}
        title={t('Job Status')}
        cancelText={t('Close')}
        onCancel={onCancel}
        visible={visible}
        fullScreen
      >
        {tipInfo && (
          <Alert className="margin-b8" type={tipType} message={tipInfo} />
        )}
        {this.renderTitle()}
        <div className={styles.wrapper}>
          {this.renderComponents()}
          {this.renderPolicy()}
        </div>
        <div className={styles.monitor}>{this.renderMonitor()}</div>
        <EditModal
          visible={showEditModal}
          module="grayreleases"
          formData={this.formData}
          cluster={detail.cluster}
          onOk={this.handleComponentEdit}
          onCancel={this.hideEditModal}
          isSubmitting={this.store.isSubmitting}
        />
      </Modal>
    )
  }
}
