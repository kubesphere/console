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
import PropTypes from 'prop-types'
import { sortBy } from 'lodash'

import { getCurrentRevision } from 'utils/workload'

import { Input, Select } from '@pitrix/lego-ui'
import { Modal, Form } from 'components/Base'

@observer
export default class RollBackModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    module: PropTypes.string,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    module: '',
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.revisionStore = props.store
  }

  get revisions() {
    const { data, isLoading } = this.revisionStore.list
    return isLoading ? [] : data
  }

  get curRevision() {
    const { module, detail } = this.props
    return getCurrentRevision(detail, this.revisions, module)
  }

  componentDidUpdate(prevProps) {
    const { visible } = this.props
    if (visible && visible !== prevProps.visible) {
      this.fetchData(this.props)
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this.fetchData(this.props)
    }
  }

  fetchData = ({ detail }) => {
    this.revisionStore.fetchList(detail)
  }

  getFormData = () => {
    const { name } = this.props.detail

    return {
      name,
      currentRevision: `#${this.curRevision}`,
    }
  }

  getRevisionOps = () => {
    const revisions = sortBy(this.revisions, item =>
      parseInt(item.revision, 10)
    )

    return revisions
      .map(({ revision }) => ({
        label: `#${revision}`,
        value: Number(revision),
      }))
      .filter(item => item.value !== this.curRevision)
  }

  handleOk = () => {
    const { detail, onOk } = this.props
    if (this.form) {
      const form = this.form.current
      form &&
        form.validate(() => {
          const formData = form.getData()
          formData.namespace = detail.namespace

          onOk(formData)
        })
    }
  }

  render() {
    const { visible, onCancel, isSubmitting } = this.props
    const formData = this.getFormData()

    return (
      <Modal.Form
        formRef={this.form}
        data={formData}
        width={691}
        title={t('Revision Rollback')}
        icon="timed-task"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('Resource Name')}>
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item label={t('Current Revision')}>
          <Input name="currentRevision" disabled />
        </Form.Item>
        <Form.Item
          label={t('Rollback Revisions')}
          rules={[
            {
              required: true,
              message: t('Please select rollback revision'),
            },
          ]}
        >
          <Select
            name="revision"
            placeholder={t('REVISION_ROLLBACK_SELECT')}
            options={this.getRevisionOps()}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
