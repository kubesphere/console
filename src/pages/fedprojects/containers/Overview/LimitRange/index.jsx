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

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { get } from 'lodash'

import { Button, Text, Panel } from 'components/Base'
import FederatedStore from 'stores/federated'
import { trigger } from 'utils/action'

import styles from './index.scss'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class LimitRange extends Component {
  state = {
    showTip: false,
  }

  store = new FederatedStore({ module: 'limitranges' })

  componentDidMount() {
    const { namespace } = this.params
    this.store.fetchListByK8s({ namespace }).then(() => {
      const { total } = this.store.list
      this.setState({ showTip: total === 0 })
    })
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  showSetting = () => {
    const limitRanges = this.store.list.data
    this.trigger('project.default.resource', {
      ...this.params,
      detail: limitRanges[0],
      isFederated: true,
      projectDetail: this.props.projectStore.detail,
      success: () => this.setState({ showTip: false }),
    })
  }

  render() {
    const { showTip } = this.state

    if (!showTip) {
      return null
    }

    return (
      <Panel className={styles.wrapper}>
        <Text
          className={styles.text}
          icon="exclamation"
          title={t('Resource Default Request Not Set')}
          description={t('WHAT_IS_LIMIT_RANGE_A')}
        />
        <Button type="control" onClick={this.showSetting}>
          {t('Set')}
        </Button>
      </Panel>
    )
  }
}
