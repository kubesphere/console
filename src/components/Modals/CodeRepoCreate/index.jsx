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

import React from 'react'
import RepoSelectForm from 'components/Forms/Pipelines/RepoSelect/subForm'
import PropTypes from 'prop-types'
import { Modal } from 'components/Base'
import { set } from 'lodash'

export default class BaseInfo extends React.Component {
  static propTypes = {
    detail: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    isSubmitting: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({
      subRoute: {
        onSave,
        onCancel,
      },
    })
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  submit = () => {
    const { onOk } = this.props
    const { subRoute } = this.state

    if (subRoute.onSave) {
      subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
    onOk(this.props.formTemplate)
  }

  handleRepoChange = (type, formData) => {
    const { formTemplate } = this.props

    const data = {
      source_type: type,
      ...formData,
    }
    set(formTemplate, 'sources', data)

    if (type === 'github') {
      this.submit()
    }
  }

  hideSelectRepo = () => {
    const { onCancel } = this.props
    onCancel()
  }

  render() {
    const { formTemplate, devops, cluster, onCancel, ...res } = this.props

    return (
      <Modal
        width={970}
        data={formTemplate}
        onCancel={onCancel}
        {...res}
        onOk={this.submit}
      >
        <RepoSelectForm
          sourceData={formTemplate['multi_branch_pipeline']}
          devops={devops}
          name={formTemplate.name}
          onSave={this.handleRepoChange}
          onCancel={this.hideSelectRepo}
          cluster={cluster}
          type="import"
        />
      </Modal>
    )
  }
}
