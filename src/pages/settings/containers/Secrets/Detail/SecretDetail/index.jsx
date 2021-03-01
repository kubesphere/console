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
import { observer, inject } from 'mobx-react'
import { Button } from '@kube-design/components'
import { Card } from 'components/Base'
import Placement from 'projects/components/Cards/Placement'
import { safeBtoa } from 'utils/base64'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class SecretDetail extends React.Component {
  constructor(props) {
    super(props)

    this.store = props.detailStore
    this.module = props.module

    this.state = {
      showSecret: false,
    }
  }

  convert = value => {
    const { showSecret } = this.state
    return showSecret ? value : safeBtoa(value)
  }

  changeSecretState = () => {
    this.setState(({ showSecret }) => ({
      showSecret: !showSecret,
    }))
  }

  renderDefault(data = {}) {
    return (
      <div className={styles.defaultWrapper}>
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <span>{key}:</span>
              <span>
                <pre>{this.convert(value)}</pre>
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderOperations() {
    const { showSecret } = this.state
    return (
      <Button
        type="flat"
        icon={showSecret ? 'eye-closed' : 'eye'}
        onClick={this.changeSecretState}
      />
    )
  }

  renderPlacement() {
    const { name, namespace } = this.props.match.params
    const { detail } = this.store
    if (detail.isFedManaged) {
      return (
        <Placement
          module={this.store.module}
          name={name}
          namespace={namespace}
        />
      )
    }
    return null
  }

  render() {
    const {
      detail: { data },
    } = this.store
    return (
      <div>
        {this.renderPlacement()}
        <Card title={t('Secret')} operations={this.renderOperations()}>
          {this.renderDefault(data)}
        </Card>
      </div>
    )
  }
}
