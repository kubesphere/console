/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2022 The KubeSphere Console Authors.
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
import { pick } from 'lodash'
import { observer } from 'mobx-react'
import { Select, Form } from '@kube-design/components'

@observer
export default class PipelineSelect extends Component {
  componentDidMount() {
    this.getPipelineListData()
  }

  getPipelineListData = params => {
    return this.props.store.getPipelines(params)
  }

  getPipelineList = () => {
    return [
      ...this.props.store.pipelineList.data.map(pipeline => ({
        label: pipeline.name,
        value: pipeline.name,
      })),
    ]
  }

  render() {
    const { option } = this.props
    const { pipelineList } = this.props.store
    const formProps = {
      key: option.name,
      label: t(option.display),
      rules: [
        {
          required: option.required ?? false,
          message: t('PARAM_REQUIRED'),
        },
      ],
    }
    return (
      <Form.Item {...formProps}>
        <Select
          name={option.name}
          options={this.getPipelineList()}
          pagination={pick(pipelineList, ['page', 'limit', 'total'])}
          isLoading={pipelineList.isLoading}
          onFetch={this.getPipelineListData}
          searchable
          clearable
        />
      </Form.Item>
    )
  }
}
