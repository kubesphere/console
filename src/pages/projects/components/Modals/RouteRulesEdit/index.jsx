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
import { get, cloneDeep, isEmpty } from 'lodash'
import { Modal } from 'components/Base'

import RouteRulesForm from 'components/Forms/Route/RouteRules'

import styles from './index.scss'

class RouteRulesEdit extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    detail: {},
    visible: false,
    onOk: () => {},
    onCancel: () => {},
    isSubmitting: false,
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

  constructor(props) {
    super(props)

    this.form = React.createRef()

    this.state = {
      subRoute: {},
      formTemplate: this.getFormTemplate(props.detail),
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.detail !== prevProps.detail) {
      this.setState({
        formTemplate: this.getFormTemplateI(this.props.detail),
      })
    }
  }

  getFormTemplate(detail) {
    const formTemplate = cloneDeep(detail)
    const tls = get(formTemplate, 'spec.tls', [])
    const rules = get(formTemplate, 'spec.rules', [])
    if (tls.length > 0 && rules.length > 0) {
      rules.forEach(rule => {
        const tlsItem = tls.find(
          item => item.hosts && item.hosts.includes(rule.host)
        )
        if (tlsItem) {
          rule.protocol = 'https'
          rule.secretName = tlsItem.secretName
        } else {
          rule.protocol = 'http'
        }
      })
    }
    return { Ingress: formTemplate }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({ subRoute: { onSave, onCancel } })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  handleOk = () => {
    const { subRoute } = this.state
    if (subRoute.onSave) {
      return subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }

    const { onOk } = this.props
    const formData = this.state.formTemplate

    const data = formData.Ingress

    onOk(data)
  }

  handleCancel = () => {
    const { subRoute } = this.state
    if (subRoute.onCancel) {
      subRoute.onCancel()
      this.setState({ subRoute: {} })
      return
    }

    const { onCancel } = this.props

    onCancel()
  }

  render() {
    const { visible, cluster, isSubmitting } = this.props
    const { subRoute, formTemplate } = this.state

    return (
      <Modal
        width={960}
        title={t('Edit Rules')}
        icon="firewall"
        onOk={this.handleOk}
        okText={!isEmpty(subRoute) ? t('Save') : t('Update')}
        cancelText={!isEmpty(subRoute) ? t('Previous') : null}
        onCancel={this.handleCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <div className={styles.wrapper}>
          <RouteRulesForm
            module="ingresses"
            formRef={this.form}
            formTemplate={formTemplate}
            cluster={cluster}
          />
        </div>
      </Modal>
    )
  }
}

export default RouteRulesEdit
