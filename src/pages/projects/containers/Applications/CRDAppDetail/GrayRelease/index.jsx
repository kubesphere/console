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

import { isEmpty } from 'lodash'
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Columns, Column } from '@kube-design/components'
import { toJS, when } from 'mobx'
import { observer, inject } from 'mobx-react'

import { joinSelector } from 'utils'
import EmptyList from 'components/Cards/EmptyList'
import { Component as Base } from 'projects/containers/GrayRelease/Jobs'

import styles from './index.scss'

@inject('detailStore')
@observer
class GrayRelease extends Base {
  constructor(props) {
    super(props)

    this.detailStore = props.detailStore
    this.module = props.module
  }

  componentDidMount() {
    this.disposer = when(
      () => !isEmpty(this.detailStore.detail),
      () => this.getData()
    )
  }

  componentWillUnmount() {
    if (this.disposer) {
      this.disposer()
    }
  }

  get canCreate() {
    const { cluster, workspace, namespace: project } = this.props.match.params
    return globals.app.hasPermission({
      cluster,
      workspace,
      project,
      module: 'grayscale-release',
      action: 'create',
    })
  }

  getData() {
    const { selector } = toJS(this.detailStore.detail)
    const params = {
      namespace: this.namespace,
      cluster: this.cluster,
      labelSelector: joinSelector(selector),
    }
    this.store.fetchList(params).then()
  }

  renderEmpty() {
    return (
      <EmptyList
        icon="istio"
        title={t('NO_GRAYSCALE_RELEASE_TASK_FOUND')}
        desc={t('NO_GRAYSCALE_RELEASE_TASK_FOUND_DESC')}
      />
    )
  }

  renderHeader() {
    const { cluster, workspace, namespace } = this.props.match.params

    return (
      <div className={styles.header}>
        <Columns>
          <Column>
            <p className={styles.headerTip}>{t('GRAYSCALE_RELEASE_DESC')}</p>
          </Column>
          <Column className="is-narrow">
            <Link
              to={`/${workspace}/clusters/${cluster}/projects/${namespace}/grayrelease/cates`}
            >
              {this.canCreate && (
                <Button type="control">
                  {t('CREATE_GRAYSCALE_RELEASE_TASK')}
                </Button>
              )}
            </Link>
          </Column>
        </Columns>
      </div>
    )
  }
}

export default GrayRelease
