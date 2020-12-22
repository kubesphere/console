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
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import CodeQualityResult from 'devops/components/Cards/CodeQualityResult'
import CodeQualityIssues from 'devops/components/Cards/CodeQualityIssues'

@inject('rootStore', 'sonarqubeStore')
@observer
export default class CodeQuality extends React.Component {
  componentDidMount() {
    const { detail = {}, isLoading } = this.props.sonarqubeStore

    if (!detail.totalStatus && !isLoading) {
      this.props.rootStore.routing.push('./activity')
    }
  }

  renderResult = () => {
    const { detail = {}, isLoading } = this.props.sonarqubeStore

    return <CodeQualityResult detail={detail} loading={isLoading} />
  }

  renderIssues = () => {
    const { detail = {}, isLoading } = this.props.sonarqubeStore

    return (
      <CodeQualityIssues
        detail={detail}
        issues={toJS(detail.issues)}
        loading={isLoading}
      />
    )
  }

  render() {
    return (
      <div>
        {this.renderResult()}
        {this.renderIssues()}
      </div>
    )
  }
}
