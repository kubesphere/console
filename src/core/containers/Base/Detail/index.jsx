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
import { NavLink } from 'react-router-dom'
import { computed } from 'mobx'
import classnames from 'classnames'
import { get, isString, pickBy } from 'lodash'

import { getLocalTime, cacheFunc, getDisplayName } from 'utils'
import { ICON_TYPES } from 'utils/constants'
import { renderRoutes } from 'utils/router.config'

import { Loading } from '@pitrix/lego-ui'
import { Notify } from 'components/Base'
import NotFound from 'components/Cards/NotFound'
import DeleteModal from 'components/Modals/Delete'
import BaseInfo from 'core/containers/Base/Detail/BaseInfo'

import styles from './index.scss'

export default class DetailBase extends React.Component {
  constructor(props, options = {}) {
    super(props)

    this.options = options

    this.state = {
      notFound: false,
    }

    this.init()
  }

  get baseProps() {
    const stores = pickBy(
      this,
      (value, key) => isString(key) && /(s|S)tore/.test(key)
    )
    const { store, ...otherStores } = stores

    return {
      module: this.module,
      detailStore: store,
      ...otherStores,
    }
  }

  get params() {
    return this.props.match.params || {}
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  get enabledActions() {
    return globals.app.getActions({
      module: this.authKey,
      workspace: this.props.match.params.workspace,
      project: this.props.match.params.namespace,
      devops: this.props.match.params.devops,
    })
  }

  get name() {
    return ''
  }

  get module() {
    return this.props.module
  }

  get authKey() {
    return this.module
  }

  get routing() {
    return this.props.rootStore.routing
  }

  get project() {
    return this.props.rootStore.project
  }

  @computed
  get namespace() {
    const { namespace } = this.props.match.params

    return this.store.detail.namespace || namespace
  }

  @computed
  get labels() {
    return get(this.store.detail, 'labels', {})
  }

  @computed
  get detailName() {
    return getDisplayName(this.store.detail)
  }

  @computed
  get detailDesc() {
    return get(this.store.detail, 'description')
  }

  @computed
  get application() {
    const { detail } = this.store
    return detail.app || '-'
  }

  @computed
  get creator() {
    const { detail } = this.store

    if (detail.app) {
      return this.application
    }

    return get(this.store.detail, 'creator', t('unknown'))
  }

  @computed
  get createTime() {
    return getLocalTime(this.store.detail.createTime).format(
      'YYYY-MM-DD HH:mm:ss'
    )
  }

  @computed
  get updateTime() {
    return getLocalTime(this.store.detail.updateTime).format(
      'YYYY-MM-DD HH:mm:ss'
    )
  }

  get className() {
    return ''
  }

  get listUrl() {
    return `/projects/${this.namespace}/${this.module}`
  }

  get isLoading() {
    return this.store.isLoading
  }

  init() {
    this.store = {
      detail: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  catch = e => {
    if (
      e.code === 404 ||
      e.status === 404 ||
      e.reason === 'NotFound' ||
      e.reason === 'Not Found'
    ) {
      this.setState({ notFound: true })
    }
  }

  fetchData = params => {
    if (this.store.fetchDetail) {
      this.store.fetchDetail(this.params, params).catch(this.catch)
    }
  }

  getRouteProps = () => ({})

  getOperations = () => [
    {
      key: 'edit',
      type: 'control',
      text: t('EDIT'),
      action: 'edit',
      onClick: this.showModal('editBaseInfo'),
    },
    {
      key: 'delete',
      type: 'danger',
      text: t('Delete'),
      action: 'delete',
      onClick: this.showModal('deleteModule'),
    },
  ]

  getEnabledOperations = () =>
    this.getOperations().filter(
      item => !item.action || this.enabledActions.includes(item.action)
    )

  getAttrs = () => [
    {
      name: t('Project'),
      value: this.namespace,
    },
  ]

  showModal = type =>
    cacheFunc(
      `_showModal_${type}`,
      () => {
        this.setState({ [type]: true })
      },
      this
    )

  hideModal = type =>
    cacheFunc(
      `_hideModal_${type}`,
      () => {
        this.setState({ [type]: false })
      },
      this
    )

  handleEdit = (type, method = 'patch') =>
    cacheFunc(
      `_edit_${type}`,
      newObject => {
        this.store[method](this.store.detail, newObject).then(() => {
          this.hideModal(type)()
          Notify.success({ content: `${t('Updated Successfully')}!` })
          this.fetchData()
        })
      },
      this
    )

  handleDelete = () => {
    this.store.delete(this.store.detail).then(() => {
      this.hideModal('deleteModule')()
      Notify.success({ content: `${t('Deleted Successfully')}!` })
      this.deleteCallback()
    })
  }

  deleteCallback = () => {
    this.routing.push(this.listUrl)
  }

  renderSider() {
    return (
      <BaseInfo
        icon={ICON_TYPES[this.module]}
        name={this.detailName}
        desc={this.detailDesc}
        operations={this.getEnabledOperations()}
        labels={this.labels}
        attrs={this.getAttrs()}
      />
    )
  }

  renderNav() {
    const { routes = [] } = this.props.route

    return (
      <div className={styles.nav}>
        {routes.map((route, index) => {
          if (this.isInvalidRoute(route)) {
            return null
          }

          const { name, title } = route

          return (
            <NavLink
              key={name || index}
              className={styles.navItem}
              activeClassName={styles.active}
              to={`${this.props.match.url}/${name}`}
            >
              {t(title)}
            </NavLink>
          )
        })}
      </div>
    )
  }

  isInvalidRoute({ name }) {
    return !name
  }

  renderSubView() {
    const { route } = this.props

    if (this.isLoading)
      return (
        <div className={styles.loading}>
          <Loading />
        </div>
      )

    return renderRoutes(route.routes, {
      ...this.baseProps,
      ...this.getRouteProps(),
    })
  }

  renderModals() {
    const { deleteModule } = this.state

    return (
      <div>
        <DeleteModal
          type={t(this.name)}
          resource={this.detailName}
          visible={deleteModule}
          onOk={this.handleDelete}
          onCancel={this.hideModal('deleteModule')}
          isSubmitting={this.store.isSubmitting}
        />
        {this.renderExtraModals()}
      </div>
    )
  }

  renderExtraModals() {
    return null
  }

  render() {
    if (this.state.notFound) {
      return <NotFound title={t(`${this.name}s`)} link={this.listUrl} />
    }

    return (
      <div className={classnames(styles.main, this.className)}>
        <div className={styles.sider}>{this.renderSider()}</div>
        <div className={styles.content}>
          {this.renderNav()}
          <div className={styles.view}>{this.renderSubView()}</div>
          {this.renderModals()}
        </div>
      </div>
    )
  }
}
