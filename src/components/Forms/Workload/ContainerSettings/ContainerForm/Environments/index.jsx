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
import { Form } from '@kube-design/components'
import { EnvironmentInput } from 'components/Inputs'
import RootStore from 'stores/root'

import { lazy } from 'utils'

const getActions = lazy(() =>
  import(/* webpackChunkName: "actions" */ 'actions')
)

export default class Environments extends React.Component {
  rootStore = new RootStore()

  envError = ''

  static defaultProps = {
    prefix: '',
    checkable: true,
  }

  get prefix() {
    const { prefix } = this.props

    return prefix ? `${prefix}.` : ''
  }

  componentDidMount() {
    getActions().then(actions =>
      this.rootStore.registerActions(actions.default)
    )
  }

  handleErrorStatus = (err = '') => {
    this.envError = err
  }

  envValidator = (rule, value, callback) => {
    if (this.envError === '') {
      callback()
    }
  }

  render() {
    const {
      checkable,
      namespace,
      isFederated,
      cluster,
      projectDetail,
    } = this.props

    return (
      <Form.Group
        label={t('ENVIRONMENT_VARIABLE_PL')}
        desc={t('CONTAINER_ENVIRONMENT_DESC')}
        checkable={checkable}
      >
        <Form.Item rules={[{ validator: this.envValidator }]}>
          <EnvironmentInput
            rootStore={this.rootStore}
            name={`${this.prefix}env`}
            namespace={namespace}
            isFederated={isFederated}
            cluster={cluster}
            projectDetail={projectDetail}
            handleInputError={this.handleErrorStatus}
          />
        </Form.Item>
      </Form.Group>
    )
  }
}
