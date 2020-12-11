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
import PropTypes from 'prop-types'

import { Form, Input, TextArea } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get } from 'lodash'

import RepoSelect from 'components/Forms/Pipelines/RepoSelect'
import RepoSelectForm from 'components/Forms/Pipelines/RepoSelect/subForm'

export default class BaseInfoModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.form = React.createRef()
    this.scmRef = React.createRef()
    this.state = {
      showSelectRepo: false,
      repo: {},
    }
  }

  static childContextTypes = {
    registerSubRoute: PropTypes.func,
    resetSubRoute: PropTypes.func,
  }

  getChildContext() {
    return {
      registerSubRoute: this.registerSubRoute,
      resetSubRoute: this.resetSubRoute,
    }
  }

  registerSubRoute = (onSave, onCancel) => {
    this.setState({ subRoute: { onSave, onCancel } })
  }

  resetSubRoute = () => {
    this.setState({ subRoute: {} })
  }

  hideSelectRepo = () => {
    this.setState({ showSelectRepo: false })
  }

  showSelectRepo = () => {
    this.setState({ showSelectRepo: true })
  }

  handleOk = async () => {
    const { onOk } = this.props

    const formData = this.form.current.getData()
    await onOk(formData)
    if (this.state.subRoute) {
      this.props.handleScanRepository()
    }
  }

  handleRepoChange = (type, formData) => {
    const { formTemplate = {} } = this.props
    const preConfig = get(formTemplate, 'multi_branch_pipeline', {})
    const sourceKey = `${get(
      formTemplate,
      'multi_branch_pipeline.source_type',
      ''
    )}_source`

    const mergedSource = Object.assign(
      get(formTemplate, `multi_branch_pipeline.${sourceKey}`, {}),
      formData[sourceKey]
    )
    this.setState(
      {
        showSelectRepo: false,
      },
      () => {
        this.scmRef.current.onChange({
          source_type: type,
          ...preConfig,
          ...formData,
          [sourceKey]: mergedSource,
        })
      }
    )
  }

  handleSaveRepo = () => {
    const { subRoute } = this.state
    if (subRoute.onSave) {
      return subRoute.onSave(() => {
        this.setState({ subRoute: {} })
      })
    }
  }

  render() {
    const { visible, onCancel, formTemplate = {} } = this.props
    const name =
      get(formTemplate, 'pipeline.name', '') ||
      get(formTemplate, 'multi_branch_pipeline.name', '')
    const description =
      get(formTemplate, 'pipeline.description', '') ||
      get(formTemplate, 'multi_branch_pipeline.description', '')

    if (this.state.showSelectRepo) {
      return (
        <Modal
          width={1000}
          hideHeader
          onOk={this.handleSaveRepo}
          visible={visible}
        >
          <RepoSelectForm
            sourceData={formTemplate.multi_branch_pipeline}
            devops={formTemplate.devops}
            cluster={formTemplate.cluster}
            name={name}
            onSave={this.handleRepoChange}
            onCancel={this.hideSelectRepo}
            enableTypeChange={false}
          />
        </Modal>
      )
    }

    return (
      <Modal
        width={691}
        title={t('Edit Info')}
        icon="pen"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
      >
        <Form ref={this.form} data={formTemplate}>
          <Form.Item label={t('Name')} desc={t('')}>
            <Input name="name" defaultValue={name} disabled />
          </Form.Item>
          <Form.Item label={t('Description')} desc={t('')}>
            <TextArea name="description" defaultValue={description} />
          </Form.Item>
          {formTemplate.multi_branch_pipeline ? (
            <Form.Item label={t('Code Repository')}>
              <RepoSelect
                name="multi_branch_pipeline"
                ref={this.scmRef}
                onClick={this.showSelectRepo}
              />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    )
  }
}
