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

import * as React from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import SecretStore from '../../stores/secret'

export default function withDefaultSecrets() {
  return WrappedComponent => {
    class WithDefaultSecrets extends React.Component {
      constructor(props) {
        super(props)
        /**
         * @type {SecretStore}
         */
        this.defaultSecretStore = new SecretStore()
      }

      componentDidMount() {
        this.fetchData()
      }

      fetchData = () => {
        const { cluster } = this.props.match.params
        this.defaultSecretStore.fetchList({
          cluster,
          annotation: 'secret.kubesphere.io/is-default-class=true',
        })
      }

      get defaultClass() {
        const { data } = toJS(this.defaultSecretStore.list)
        return data.find(item => item.isDefault) || {}
      }

      render() {
        return (
          <WrappedComponent
            defaultSecretStore={this.defaultSecretStore}
            defaultSecret={this.defaultClass}
            refecthDefaultSecret={this.fetchData}
            {...this.props}
          />
        )
      }
    }
    return observer(WithDefaultSecrets)
  }
}
