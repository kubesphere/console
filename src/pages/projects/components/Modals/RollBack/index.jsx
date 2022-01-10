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
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { sortBy, get } from 'lodash'

import { getCurrentRevision } from 'utils/workload'

import { Form, Input, Select } from '@kube-design/components'
import { Modal } from 'components/Base'
import RevisionStore from 'stores/workload/revision'

@observer
export default class RollBackModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    detail: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    detail: {},
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.revisionStore = new RevisionStore(props.store.module)

    this.form = React.createRef()
  }

  get revisions() {
    const { data, isLoading } = this.revisionStore.list
    return isLoading ? [] : data
  }

  get curRevision() {
    const { store, detail } = this.props

    return getCurrentRevision(detail, this.revisions, store.module)
  }

  componentDidMount() {
    if (this.props.visible) {
      this.fetchData(this.props.detail)
    }
  }

  fetchData = detail => {
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
    const { detail, store, onOk } = this.props
    if (this.form && this.form.current) {
      const form = this.form.current
      form &&
        form.validate(() => {
          const formData = form.getData()

          const revision = this.revisions.find(
            item => Number(item.revision) === formData.revision
          )

          let data
          if (store.module === 'deployments') {
            data = [
              {
                op: 'replace',
                path: '/spec/template',
                value: toJS(get(revision, 'spec.template')),
              },
              {
                op: 'replace',
                path: '/metadata/annotations',
                value: detail.annotations,
              },
            ]
          } else {
            data = {
              spec: {
                template: {
                  $patch: 'replace',
                  ...toJS(get(revision, 'spec.template')),
                },
              },
            }
          }

          onOk(data)
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
        title={t('ROLL_BACK')}
        icon="timed-task"
        onOk={this.handleOk}
        onCancel={onCancel}
        visible={visible}
        isSubmitting={isSubmitting}
      >
        <Form.Item label={t('RESOURCE_NAME')}>
          <Input name="name" disabled />
        </Form.Item>
        <Form.Item label={t('CURRENT_REVISION_RECORD')}>
          <Input name="currentRevision" disabled />
        </Form.Item>
        <Form.Item
          label={t('TARGET_REVISION_RECORD')}
          rules={[
            {
              required: true,
              message: t('TARGET_REVISION_EMPTY_DESC'),
            },
          ]}
        >
          <Select
            name="revision"
            placeholder=" "
            options={this.getRevisionOps()}
          />
        </Form.Item>
      </Modal.Form>
    )
  }
}
