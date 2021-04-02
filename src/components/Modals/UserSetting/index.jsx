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

import { get, set, has, cloneDeep, isEmpty } from 'lodash'
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { toJS } from 'mobx'

import { Button, Icon, Tooltip } from '@kube-design/components'
import { Modal } from 'components/Base'
import Confirm from 'components/Forms/Base/Confirm'

import UserStore from 'stores/user'

import TABS from './tabs'

import styles from './index.scss'

export default class UserSettingModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  static childContextTypes = {
    registerUpdate: PropTypes.func,
  }

  getChildContext() {
    return {
      registerUpdate: this.registerUpdate,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      formData: {},
      activeTab: get(this.tabs, '[0].name'),
      updatedTabs: {},
    }

    this.store = new UserStore()
  }

  get updateTip() {
    return (
      <div className={styles.tip}>
        <h6>{t('CONTENT_NOT_SAVED_TIPS')}</h6>
        <p>{t('SAVE_EDIT_HINTS')}</p>
      </div>
    )
  }

  get tabs() {
    return TABS
  }

  componentDidMount() {
    this.store.fetchDetail({ name: globals.user.username }).then(() => {
      const formData = {
        apiVersion: 'iam.kubesphere.io/v1alpha2',
        kind: 'User',
        ...cloneDeep(toJS(this.store.detail._originData)),
      }
      set(
        formData,
        'metadata.resourceVersion',
        this.store.detail.resourceVersion
      )
      this.setState({ formData })
    })
  }

  registerUpdate = (name, params) => {
    const { updatedTabs } = this.state

    if (!has(updatedTabs, name)) {
      this.setState({
        updatedTabs: { ...updatedTabs, [name]: params },
      })
    }
  }

  handleChangeTab = e => {
    const { name } = e.currentTarget.dataset
    if (name) {
      this.setState({ activeTab: name, subRoute: {} })
    }
  }

  handleSaveChanges = name => () => {
    const { onOk } = this.props
    const form = this[`${name}FormRef`].current

    if (form) {
      form.validate(() => {
        const data = form.getData()
        onOk(data)
        this.cancelUpdate(name)
      })
    }
  }

  handleDiscardChanges = name => () => {
    const formComponent = this[`${name}Ref`].current

    if (formComponent) {
      formComponent.resetData()
      this.cancelUpdate(name)
    }
  }

  cancelUpdate = name => {
    const { updatedTabs } = this.state
    const data = {
      ...updatedTabs,
    }
    delete data[name]
    this.setState({
      updatedTabs: data,
    })
  }

  renderTabs() {
    return (
      <ul className={styles.tabs}>
        {this.tabs.map(({ icon = 'appcenter', title, name }) => {
          const { activeTab, updatedTabs } = this.state
          const isActive = name === activeTab
          const type = isActive ? 'light' : 'dark'

          return (
            <li
              onClick={this.handleChangeTab}
              key={title}
              data-name={name}
              className={classnames({
                [styles.active]: isActive,
              })}
            >
              <Tooltip
                placement="bottomLeft"
                content={has(updatedTabs, name) ? this.updateTip : ''}
              >
                <span className={styles.tooltipTrigger}>
                  <Icon name={icon} size={16} type={type} />
                  {has(updatedTabs, name) && (
                    <span className={styles.tipIcon} />
                  )}
                </span>
              </Tooltip>
              <p>{t(title)}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  renderForm = ({ name, component }) => {
    const { store } = this.props
    const { activeTab } = this.state
    const Component = component

    if (!Component) {
      return null
    }

    const refName = `${name}Ref`
    if (!this[refName]) {
      this[refName] = React.createRef()
    }

    const formRefName = `${name}FormRef`
    if (!this[formRefName]) {
      this[formRefName] = React.createRef()
    }

    return (
      <div
        key={name}
        className={classnames(styles.form, {
          [styles.active]: name === activeTab,
        })}
      >
        <Component
          store={store}
          ref={this[refName]}
          formRef={this[formRefName]}
          formData={this.state.formData}
        />
      </div>
    )
  }

  renderFormComponents() {
    const { activeTab, updatedTabs } = this.state

    return (
      <div className={styles.formWrapper}>
        {this.tabs.map(this.renderForm)}
        <div
          className={classnames(styles.operations, {
            [styles.active]: has(updatedTabs, activeTab),
          })}
        >
          <Confirm
            className={styles.confirm}
            onOk={this.handleSaveChanges(activeTab)}
            onCancel={this.handleDiscardChanges(activeTab)}
          />
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div className={styles.content}>
        <div className={styles.forms}>
          {this.renderTabs()}
          {this.renderFormComponents()}
        </div>
      </div>
    )
  }

  renderFooter() {
    const { subRoute = {} } = this.state
    const { onCancel, onSave } = subRoute

    return (
      <div className={styles.footer}>
        {onCancel && <Button onClick={this.handlePrev}>{t('Previous')}</Button>}
        {onSave && (
          <Button type="control" onClick={this.handleSubFormSave}>
            {t('Save')}
          </Button>
        )}
        {isEmpty(subRoute) && (
          <Button onClick={this.props.onCancel}>{t('Close')}</Button>
        )}
      </div>
    )
  }

  render() {
    const { detail, onOk, ...rest } = this.props
    return (
      <Modal
        bodyClassName={styles.body}
        title={t('User Settings')}
        icon="wrench"
        width={1162}
        hideFooter
        {...rest}
      >
        <div className={styles.main}>
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </Modal>
    )
  }
}
