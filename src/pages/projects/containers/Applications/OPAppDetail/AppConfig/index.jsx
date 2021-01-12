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

import { Panel, CodeEditor } from 'components/Base'

import styles from './index.scss'

@inject('rootStore', 'detailStore')
@observer
export default class AppConfig extends React.Component {
  get store() {
    return this.props.detailStore
  }

  render() {
    const { isLoading, detail } = this.store

    return (
      <Panel title={t('App Config')} loading={isLoading}>
        <CodeEditor className={styles.yaml} value={detail.env || ''} />
      </Panel>
    )
  }
}
