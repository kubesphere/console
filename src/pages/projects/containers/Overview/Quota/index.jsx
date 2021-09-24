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

import { Button } from '@kube-design/components'
import { Text, Panel } from 'components/Base'
import QuotaStore from 'stores/quota'
import { trigger } from 'utils/action'

import styles from './index.scss'

@inject('rootStore', 'projectStore')
@observer
@trigger
export default class Quota extends Component {
  state = {
    showTip: false,
  }

  store = new QuotaStore()

  componentDidMount() {
    this.store.fetchListByK8s(this.params).then(() => {
      const { total } = this.store.list
      this.setState({ showTip: total === 0 })
    })
  }

  get params() {
    return get(this.props.match, 'params', {})
  }

  showSetting = () => {
    this.trigger('project.quota.edit', {
      detail: this.props.projectStore.detail,
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
          title={t('PROJECT_QUOTAS_NOT_SET')}
          description={t('PROJECT_QUOTAS_DESC')}
        />
        <Button type="control" onClick={this.showSetting}>
          {t('EDIT_QUOTAS')}
        </Button>
      </Panel>
    )
  }
}
