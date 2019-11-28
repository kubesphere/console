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
import { action, observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import Workspace from './Workspace'
import Project from './Project'

import styles from './index.scss'

@inject('rootStore')
@observer
class UsageRanking extends React.Component {
  @observable
  tab = 'workspace'

  get tabs() {
    return [
      {
        value: 'workspace',
        text: t('Workspace Usage Rank'),
        component: Workspace,
      },
      {
        value: 'project',
        text: t('Project Usage Rank'),
        component: Project,
      },
    ]
  }

  @action
  changeTab = e => {
    this.tab = e.target.dataset.key
  }

  render() {
    return (
      <div className={styles.wrapper}>
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    )
  }

  renderTabs() {
    return (
      <div className={styles.pane}>
        <span className={styles.tabs}>
          {this.tabs.map(tab => (
            <span
              key={tab.value}
              className={this.tab === tab.value ? styles.selected : ''}
              data-key={tab.value}
              onClick={this.changeTab}
            >
              {tab.text}
            </span>
          ))}
        </span>
      </div>
    )
  }

  renderContent() {
    const Component = this.tabs.find(tab => tab.value === this.tab).component
    return (
      <div>
        <Component />
      </div>
    )
  }
}

export default UsageRanking
