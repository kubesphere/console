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
import { get } from 'lodash'
import {
  Icon,
  Input,
  Form,
  Tag,
  Select,
  TextArea,
} from '@kube-design/components'
import {
  PATTERN_NAME,
  CLUSTER_GROUP_TAG_TYPE,
  CLUSTER_PROVIDERS,
  CLUSTER_PRESET_GROUPS,
} from 'utils/constants'

import Title from '../Title'
import SubTitle from '../SubTitle'
import NodeList from '../NodeList'

import styles from './index.scss'

export default class BaseInfo extends React.Component {
  get method() {
    return get(
      this.props.formTemplate,
      "metadata.annotations['kubesphere.io/way-to-add']"
    )
  }

  groupOptionRenderer = option => (
    <>
      <Tag type={CLUSTER_GROUP_TAG_TYPE[option.value]}>
        {t(`ENV_${option.label.toUpperCase()}`)}
      </Tag>
      &nbsp;&nbsp;
      {option.label}
    </>
  )

  providerOptionRenderer = option => (
    <>
      <Icon className="margin-r8" name={option.icon} type="light" size={20} />
      {option.label}
    </>
  )

  nameValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    this.props.store.checkName({ name: value }).then(resp => {
      if (resp.exist) {
        return callback({ message: t('Name exists'), field: rule.field })
      }
      callback()
    })
  }

  nodesValidator = (rule, value, callback) => {
    if (!value) {
      return callback()
    }

    const masterNodeCount = get(
      this.props.formTemplate,
      'spec.roleGroups.master.length',
      0
    )
    const workerNodeCount = get(
      this.props.formTemplate,
      'spec.roleGroups.worker.length',
      0
    )

    const tips = []
    if (masterNodeCount !== 1 && masterNodeCount !== 3) {
      tips.push(t('MASTER_NODE_COUNT_TIP'))
    }

    if (workerNodeCount === 0) {
      tips.push(t('WORKER_NODE_COUNT_TIP'))
    }

    if (tips.length > 0) {
      return callback({ message: tips.join('; '), field: rule.field })
    }

    callback()
  }

  render() {
    const { formRef, formTemplate } = this.props
    const method = this.method
    return (
      <div className={styles.wrapper}>
        {method === 'new' ? (
          <Title title={t('New Cluster')} description={t('NEW_CLUSTER_DESC')} />
        ) : (
          <Title
            title={t('Import Cluster')}
            description={t('IMPORT_CLUSTER_DESC')}
          />
        )}
        <Form data={formTemplate} ref={formRef}>
          <SubTitle title={t('Cluster Basic Info')} />
          <Form.Item
            label={t('Cluster Name')}
            desc={t('NAME_DESC')}
            rules={[
              { required: true, message: t('Please input cluster name') },
              {
                pattern: PATTERN_NAME,
                message: t('Invalid name', { message: t('NAME_DESC') }),
              },
              { validator: this.nameValidator },
            ]}
          >
            <Input name="metadata.name" maxLength={63} />
          </Form.Item>
          <Form.Item label={t('CLUSTER_TAG')} desc={t('CLUSTER_TAG_DESC')}>
            <Select
              name="metadata.labels['cluster.kubesphere.io/group']"
              options={CLUSTER_PRESET_GROUPS}
              placeholder={t('Please select or input a tag')}
              optionRenderer={this.groupOptionRenderer}
              searchable
            />
          </Form.Item>
          <Form.Item label={t('Provider')} desc={t('CLUSTER_PROVIDER_DESC')}>
            <Select
              name="spec.provider"
              options={CLUSTER_PROVIDERS}
              placeholder={t('Please select or input a provider')}
              optionRenderer={this.providerOptionRenderer}
              searchable
            />
          </Form.Item>
          <Form.Item label={t('Description')} desc={t('DESCRIPTION_DESC')}>
            <TextArea
              name="metadata.annotations['kubesphere.io/description']"
              maxLength={256}
            />
          </Form.Item>
          {method === 'new' && (
            <>
              <SubTitle
                className={styles.nodesTitle}
                title={t('Node Settings')}
                description={t('CLUSTER_NODE_SETTINGS_DESC')}
              />
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: t('Please add at least one cluster node'),
                  },
                  {
                    validator: this.nodesValidator,
                  },
                ]}
              >
                <NodeList name="spec.hosts" formTemplate={formTemplate} />
              </Form.Item>
            </>
          )}
        </Form>
      </div>
    )
  }
}
