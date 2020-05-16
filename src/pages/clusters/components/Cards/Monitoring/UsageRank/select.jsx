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
import { observer } from 'mobx-react'
import { Select } from '@pitrix/lego-ui'

@observer
export default class RankingSelect extends React.Component {
  get options() {
    return this.props.store.sort_metric_options.map(option => ({
      value: option,
      label: t(`Sort By ${option}`),
    }))
  }

  render() {
    const { store, className } = this.props

    return (
      <Select
        className={className}
        value={store.sort_metric}
        onChange={store.changeSortMetric}
        options={this.options}
      />
    )
  }
}
