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
import classnames from 'classnames'
import { isEmpty, get } from 'lodash'

import { Button, Icon } from '@kube-design/components'

import Confirm from 'components/Forms/Base/Confirm'

import EnhanceWrapper from './wrapper'

import styles from './index.scss'

export default class FormsBox extends React.Component {
  static propTypes = {
    module: PropTypes.string,
    store: PropTypes.object,
    forms: PropTypes.array,
    data: PropTypes.object,
    onSubmit: PropTypes.func,
  }

  static defaultProps = {
    store: {},
    forms: [],
    data: {},
    onSubmit() {},
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({
      subRoute: {
        onSave,
        onCancel,
      },
    })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  handleSubFormSave = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onSave) {
      subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  handleSubFormCancel = () => {
    const { subRoute } = this.state
    if (subRoute && subRoute.onCancel) {
      subRoute.onCancel()
      this.setState({ subRoute: {} })
    }
  }

  handlePrev = () => {
    this.setState(({ subRoute }) => {
      if (subRoute && subRoute.onCancel) {
        subRoute.onCancel()
      }
      return {
        subRoute: {},
      }
    })
  }

  constructor(props) {
    super(props)

    this.tabs = props.forms.map(item => ({
      ...item,
      component: EnhanceWrapper(item.component),
    }))

    this.state = {
      formData: props.data,
      activeTab: get(this.tabs, '[0].name'),
      updatedTabs: {},
      subRoute: {},
    }
  }

  handleChangeTab = e => {
    const { name } = e.target.dataset
    if (name) {
      this.setState({ activeTab: name, subRoute: {} })
    }
  }

  handleSaveForm = (name, formData) => {
    this.setState(({ updatedTabs }) => {
      updatedTabs[name] = formData

      return {
        updatedTabs,
        formData,
      }
    })
  }

  handleSubmit = () => {
    const { updatedTabs } = this.state

    if (!isEmpty(updatedTabs)) {
      this.props.onSubmit(this.state.formData, Object.keys(updatedTabs))
    } else {
      this.props.onCancel()
    }
  }

  renderTabs() {
    const { activeTab, updatedTabs } = this.state

    return (
      <ul className={styles.tabs} onClick={this.handleChangeTab}>
        {this.tabs.map(({ icon, title, name }) => {
          const isActive = name === activeTab
          const type = isActive ? 'light' : 'dark'

          return (
            <li
              key={title}
              data-name={name}
              className={classnames({
                [styles.active]: isActive,
              })}
            >
              <div className={styles.icon}>
                <Icon name={icon || 'appcenter'} size={20} type={type} />
              </div>
              <p>{t(title)}</p>
              <Icon
                className={classnames(styles.updated, {
                  [styles.active]: updatedTabs[name],
                })}
                name="exclamation"
                size={18}
                color={{
                  primary: '#fff',
                  secondary: '#f5a623',
                }}
              />
            </li>
          )
        })}
      </ul>
    )
  }

  renderForm() {
    const { module, cluster, store, namespace } = this.props
    const { activeTab, formData } = this.state
    const form = this.tabs.find(item => item.name === activeTab) || {}
    const componentStore = form.store || store
    const FormComponent = form.component

    this.formRef = React.createRef()

    return (
      <div className={styles.form}>
        <FormComponent
          {...form}
          formRef={this.formRef}
          module={module}
          namespace={namespace}
          store={componentStore}
          formData={formData}
          cluster={cluster}
          onSaveChange={this.handleSaveForm}
        />
        {this.renderSubRouteConfirm()}
      </div>
    )
  }

  renderSubRouteConfirm() {
    const { subRoute } = this.state

    if (isEmpty(subRoute)) {
      return null
    }

    return (
      <Confirm
        className={styles.confirm}
        onOk={this.handleSubFormSave}
        onCancel={this.handleSubFormCancel}
      />
    )
  }

  renderContent() {
    return (
      <div className={styles.content}>
        <div className={styles.container}>
          {this.renderTabs()}
          {this.renderForm()}
        </div>
      </div>
    )
  }

  renderFooter() {
    const { updatedTabs } = this.state

    return (
      <div className={styles.footer}>
        <div>
          <Button onClick={this.props.onCancel}>{t('Cancel')}</Button>
          <Button
            type="control"
            disabled={isEmpty(updatedTabs)}
            loading={this.props.isSubmitting}
            onClick={this.handleSubmit}
          >
            {t('Confirm')}
          </Button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderContent()}
        {this.renderFooter()}
      </div>
    )
  }
}
