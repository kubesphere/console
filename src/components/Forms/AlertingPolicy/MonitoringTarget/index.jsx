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
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { isEmpty, get, set } from 'lodash'

import { MODULE_KIND_MAP } from 'utils/constants'
import TypesStore from 'stores/alerting/types'

import { Form, Alert } from 'components/Base'
import Project from './Project'
import Cluster from './Cluster'

import styles from './index.scss'

@observer
export default class MonitoringTarget extends React.Component {
  static childContextTypes = {
    updateResource: PropTypes.func,
    showFormError: PropTypes.func,
    hideFormError: PropTypes.func,
  }

  getChildContext() {
    return {
      updateResource: this.updateResourceData,
      showFormError: this.showError,
      hideFormError: this.hideError,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isValid: true,
      validMessage: 'error',
    }

    this.typesStore = new TypesStore()
  }

  get namespace() {
    return get(this.formTemplate, 'resource_filter.namespace')
  }

  get formTemplate() {
    const { formTemplate, module } = this.props
    return get(formTemplate, MODULE_KIND_MAP[module], formTemplate)
  }

  @computed
  get resourceTypes() {
    return this.typesStore.resourceTypes
  }

  componentDidMount() {
    this.fetchResourceTypes()
  }

  fetchResourceTypes = () => {
    this.typesStore.fetchResourceTypes({ cluster: this.props.cluster })
  }

  updateResourceData = (type, data = {}) => {
    const typeInfo = this.resourceTypes[type] || {}
    const rs_type_id = typeInfo.rs_type_id || ''

    if (!isEmpty(data)) {
      Object.entries(data).forEach(([key, value]) => {
        set(this.formTemplate, `resource_filter[${key}]`, value)
      })
    }

    set(this.formTemplate, 'resource_filter.resource_type', type)
    set(this.formTemplate, 'resource_filter.rs_type_id', rs_type_id)
    set(this.formTemplate, 'policy.rs_type_id', rs_type_id)
  }

  showError = ({ message = '' }) => {
    this.setState({ isValid: false, validMessage: message })
  }

  hideError = () => {
    this.setState({ isValid: true })
  }

  render() {
    const { isValid, validMessage } = this.state
    const { formRef, cluster } = this.props
    const params = {
      cluster,
      formTemplate: this.formTemplate,
      resourceTypes: this.resourceTypes,
    }

    return (
      <div>
        <Form ref={formRef}>
          {this.namespace ? (
            <Project namespace={this.namespace} {...params} />
          ) : (
            <Cluster {...params} />
          )}
        </Form>
        {!isValid && (
          <Alert type="error" className={styles.alert} message={validMessage} />
        )}
      </div>
    )
  }
}
