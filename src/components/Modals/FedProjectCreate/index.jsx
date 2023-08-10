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

import {
  Column,
  Columns,
  Form,
  Input,
  Select,
  TextArea,
} from '@kube-design/components'
import { Modal } from 'components/Base'
import ClusterTitle from 'components/Clusters/ClusterTitle'
import { ArrayInput, ObjectInput } from 'components/Inputs'
import { get, isEmpty, set, uniqBy } from 'lodash'

import { computed } from 'mobx'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'
import { PATTERN_ALIAS_NAME, PATTERN_SERVICE_NAME } from 'utils/constants'
import styles from './index.scss'

@observer
export default class FedProjectCreateModal extends React.Component {
  static propTypes = {
    formTemplate: PropTypes.object,
    visible: PropTypes.bool,
    isSubmitting: PropTypes.bool,
    clusters: PropTypes.array,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    formTemplate: {},
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  constructor(props) {
    super(props)

    this.store = props.store

    this.formRef = React.createRef()
    this.nameRef = React.createRef()
  }

  get networkOptions() {
    return [
      { label: t('OFF'), value: '' },
      { label: t('ON'), value: 'enabled' },
    ]
  }

  @computed
  get clusters() {
    return this.props.clusters.map(item => ({
      label: item.name,
      value: item.name,
      cluster: item,
      disabled: !item.isReady,
    }))
  }

  nameValidator = async (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const resp = await this.store.checkName({ name: value })
    if (resp.exist) {
      return callback({
        message: t('PROJECT_NAME_EXISTS_IN_HOST'),
        field: rule.field,
      })
    }

    const clusters = get(this.props.formTemplate, 'spec.placement.clusters', [])

    const resps = await Promise.all([
      ...clusters.map(cluster =>
        this.store.checkName({ name: value, cluster: cluster.name })
      ),
    ])

    const index = resps.findIndex(item => item.exist)

    if (index > -1 && clusters[index]) {
      return callback({
        message: t('PROJECT_NAME_EXISTS_IN_CLUSTER', {
          cluster: clusters[index].name,
        }),
        field: rule.field,
      })
    }

    callback()
  }

  valueRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" noStatus />
  )

  optionRenderer = item => (
    <ClusterTitle cluster={item.cluster} size="small" theme="light" noStatus />
  )

  handleClusterChange = clusters => {
    set(
      this.props.formTemplate,
      'spec.placement.clusters',
      uniqBy(clusters, 'name')
    )

    if (this.nameRef && this.nameRef.current) {
      const name = 'metadata.name'
      if (
        this.formRef &&
        this.formRef.current &&
        !isEmpty(this.formRef.current.state.errors)
      ) {
        this.formRef.current.resetValidateResults(name)
      }

      this.nameRef.current.validate({
        [name]: get(this.props.formTemplate, name),
      })
    }
  }

  renderClusters() {
    return (
      <Form.Group
        label={t('CLUSTER_PL')}
        desc={t('PROJECT_CLUSTER_SETTINGS_DESC')}
      >
        <Form.Item
          rules={[{ required: true, message: t('CLUSTER_EMPTY_DESC') }]}
        >
          <ArrayInput
            name="spec.placement.clusters"
            addText={t('ADD_CLUSTER')}
            itemType="object"
            onChange={this.handleClusterChange}
          >
            <ObjectInput>
              <Select
                name="name"
                placeholder=" "
                className={styles.cluster}
                options={this.clusters}
                valueRenderer={this.valueRenderer}
                optionRenderer={this.optionRenderer}
              />
            </ObjectInput>
          </ArrayInput>
        </Form.Item>
      </Form.Group>
    )
  }

  render() {
    const { visible, formTemplate, onOk, onCancel, isSubmitting } = this.props
    return (
      <Modal.Form
        width={960}
        formRef={this.formRef}
        bodyClassName={styles.body}
        data={formTemplate}
        onCancel={onCancel}
        onOk={onOk}
        visible={visible}
        closable={false}
        isSubmitting={isSubmitting}
        hideHeader
      >
        <div className={styles.header}>
          <img src="/assets/project-create.svg" alt="" />
          <div className={styles.title}>
            <div>{t('CREATE_MULTI_CLUSTER_PROJECT')}</div>
            <p>{t('CREATE_MULTI_CLUSTER_PROJECT_DESC')}</p>
          </div>
        </div>
        <div className={styles.content}>
          <Columns>
            <Column>
              <Form.Item
                label={t('NAME')}
                desc={t('SERVICE_NAME_DESC')}
                ref={this.nameRef}
                rules={[
                  { required: true, message: t('NAME_EMPTY_DESC') },
                  {
                    pattern: PATTERN_SERVICE_NAME,
                    message: t('INVALID_NAME_DESC', {
                      message: t('SERVICE_NAME_DESC'),
                    }),
                  },
                  { validator: this.nameValidator },
                ]}
              >
                <Input name="metadata.name" autoFocus={true} maxLength={63} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('ALIAS')}
                desc={t('ALIAS_NAME_DESC')}
                rules={[
                  {
                    pattern: PATTERN_ALIAS_NAME,
                    message: t('INVALID_ALIAS_NAME_DESC'),
                  },
                ]}
              >
                <Input
                  name="metadata.annotations['kubesphere.io/alias-name']"
                  maxLength={63}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
                <TextArea
                  name="metadata.annotations['kubesphere.io/description']"
                  maxLength={256}
                />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
          {this.renderClusters()}
        </div>
      </Modal.Form>
    )
  }
}
