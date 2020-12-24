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
import classNames from 'classnames'
import { get, isEmpty } from 'lodash'
import { observer } from 'mobx-react'
import { action } from 'mobx'

import { Dragger, NotifyConfirm } from 'components/Base'

import PipelineNodes from './nodesRender'
import Sider from './Sider'
import Store from './store'

import style from './index.scss'

const CREATE_TEMP = {
  json: {
    pipeline: {
      stages: [],
      agent: {
        type: 'any',
      },
    },
  },
}

@observer
export default class Pipeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    if (props.isEditMode) {
      this.store = new Store()
      this.store.params = props.params
      const { devops, name, cluster } = props.params
      this.prevData = JSON.parse(
        localStorage.getItem(`${globals.user.username}-${devops}-${name}`)
      )

      this.store.fetchLabel({ cluster, devops })

      if (isEmpty(props.jsonData)) {
        this.store.setData(this.prevData || CREATE_TEMP)
      } else {
        this.store.jsonData = { ...props.jsonData }
        if (this.prevData) {
          this.state = { showConfirmPrevdata: true }
        }
      }
    }
  }

  static defaultProps = {
    onOK: () => {},
    onCancel: () => {},
  }

  get stages() {
    const { isEditMode, jsonData } = this.props
    if (isEditMode) {
      return this.store.stages
    }
    return get(jsonData, 'json.pipeline.stages', [])
  }

  @action
  clearFocus = () => {
    const { isEditMode } = this.props

    if (!isEditMode) {
      return
    }
    this.store.clearFocus()
  }

  @action
  handleContinue = () => {
    const { devops, name } = this.props.params
    this.setState({ showConfirmPrevdata: false })
    this.store.setData(this.prevData)
    localStorage.removeItem(`${globals.user.username}-${devops}-${name}`)
  }

  @action
  handleDiscard = () => {
    const { devops, name } = this.props.params
    this.setState({ showConfirmPrevdata: false })
    localStorage.removeItem(`${globals.user.username}-${devops}-${name}`)
  }

  render() {
    const { isEditMode, className, isSubmitting } = this.props

    return (
      <div className={classNames(style.content, 'pipeline-content', className)}>
        <Dragger
          enableToggleFullScreen={!isEditMode}
          XOffset={30}
          YOffset={60}
          onClick={this.clearFocus}
        >
          <PipelineNodes
            store={this.store}
            isEditMode={isEditMode}
            stages={this.stages}
          />
        </Dragger>
        {isEditMode ? (
          <Sider
            store={this.store}
            onOk={this.props.onOk}
            onCancel={this.props.onCancel}
            isSubmitting={isSubmitting}
          />
        ) : null}
        <NotifyConfirm
          visible={this.state.showConfirmPrevdata}
          width={400}
          title={t('LoadPrevData_Desc')}
          content={''}
          cancelText={t('Discard')}
          confirmText={t('Continue')}
          onCancel={this.handleDiscard}
          onConfirm={this.handleContinue}
        />
      </div>
    )
  }
}
