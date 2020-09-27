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
import { isEmpty } from 'lodash'
import { observable, action, toJS } from 'mobx'

import PropTypes from 'prop-types'
import { Dragger } from 'components/Base'
import ParamsFormModal from 'components/Forms/Pipelines/ParamsFormModal'

import PipelineNodes from './nodesRender'
import style from './index.scss'

@observer
export default class PipelineStatus extends React.Component {
  constructor(props) {
    super(props)
    this.draggerCref = React.createRef()
  }

  @observable
  isUserMoved = false

  @observable
  parameters = []

  @observable
  showParamsModal = false

  componentDidUpdate() {
    if (this.draggerCref.current && !this.draggerCref.current.isMoved) {
      this.draggerCref.current.initialComponent &&
        this.draggerCref.current.initialComponent()
    }
  }

  @action
  handleRefresh = () => {
    this.scale = 1
    this.translateX = 0
    this.translateY = 0
  }

  static contextTypes = {
    onProceed: PropTypes.func,
    onBreak: PropTypes.func,
  }

  @action
  handleProceed = async (parameters, cb) => {
    await this.context.onProceed(
      { parameters, ...this.elseParams },
      typeof cb === 'function' ? cb : undefined
    )
    this.showParamsModal = false
  }

  handelShowProceedModal = ({ parameters, ...elseParams }, callBack) => {
    this.parameters = parameters
    this.elseParams = elseParams
    if (isEmpty(parameters)) {
      this.handleProceed(parameters, callBack)
      return
    }
    this.showParamsModal = true
  }

  hideProceedModal = () => {
    this.showParamsModal = false
  }

  render() {
    const { isEditMode, jsonData } = this.props

    return (
      <React.Fragment>
        <Dragger
          ref={this.draggerCref}
          className={style.container}
          enableToggleFullScreen={true}
          XOffset={30}
          YOffset={60}
        >
          <PipelineNodes
            isEditMode={isEditMode}
            stages={jsonData}
            onProceed={this.handelShowProceedModal}
            onBreak={this.context.onBreak}
          />
        </Dragger>
        <ParamsFormModal
          visible={this.showParamsModal}
          parameters={toJS(this.parameters)}
          onCancel={this.hideProceedModal}
          onOk={this.handleProceed}
        />
      </React.Fragment>
    )
  }
}
