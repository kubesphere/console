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
  Tag,
  TextArea,
} from '@kube-design/components'
import { Text } from 'components/Base'
import { get, pick } from 'lodash'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { showNameAndAlias } from 'utils'
import { compareVersion } from 'utils/app'

import { PATTERN_SERVICE_NAME } from 'utils/constants'

import Placement from './Placement'
import styles from './index.scss'

@observer
export default class BasicInfo extends React.Component {
  @computed
  get sortedVersions() {
    return this.props.versionStore.list.data
      .map(version => ({
        label: version.name,
        value: version.version_id,
      }))
      .sort((v1, v2) => compareVersion(v2.name, v1.name))
  }

  @computed
  get latestVersion() {
    return get(this.sortedVersions, '[0].value', '')
  }

  versionOptionRender = ({ label, value }) => (
    <span style={{ display: 'flex', alignItem: 'center' }}>
      {label}&nbsp;&nbsp;
      {value === this.latestVersion && (
        <Tag type="warning">{t('LATEST_VERSION_SCAP')}</Tag>
      )}
    </span>
  )

  fetchVersions = async (params = {}) => {
    const { appId, versionStore, fromStore } = this.props
    return versionStore.fetchList({
      ...params,
      app_id: appId,
      status: fromStore ? 'active' : undefined,
    })
  }

  handleVersionChange = version_id => {
    this.props.fileStore.fetch({ version_id })
  }

  renderStaticPlacement() {
    const { cluster, namespace, workspace } = this.props
    return (
      <div className={styles.placementWrapper}>
        <div className={styles.placementContent}>
          <Text
            title={showNameAndAlias(workspace, 'workspace')}
            description={t('WORKSPACE')}
          />
          <Text
            title={showNameAndAlias(cluster, 'cluster')}
            description={t('CLUSTER')}
          />
          <Text
            icon="project"
            title={showNameAndAlias(namespace, 'project')}
            description={t('PROJECT')}
          />
        </div>
      </div>
    )
  }

  render() {
    const { formData, formRef, namespace, versionStore } = this.props
    return (
      <div className={styles.wrapper}>
        <Form data={formData} ref={formRef}>
          <div className={styles.title}>{t('BASIC_INFORMATION')}</div>
          <Columns>
            <Column>
              <Form.Item
                label={t('NAME')}
                desc={t('CLUSTER_NAME_DESC')}
                rules={[
                  { required: true, message: t('NAME_EMPTY_DESC') },
                  {
                    pattern: PATTERN_SERVICE_NAME,
                    message: t('INVALID_NAME_DESC', {
                      message: t('CLUSTER_NAME_DESC'),
                    }),
                  },
                ]}
              >
                <Input name="name" maxLength={53} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('VERSION')}
                rules={[{ required: true, message: t('VERSION_EMPTY_DESC') }]}
              >
                <Select
                  name="version_id"
                  options={this.sortedVersions}
                  placeholder=" "
                  pagination={pick(versionStore.list, [
                    'page',
                    'limit',
                    'total',
                  ])}
                  isLoading={versionStore.list.isLoading}
                  onFetch={this.fetchVersions}
                  onChange={this.handleVersionChange}
                  optionRenderer={this.versionOptionRender}
                  valueRenderer={this.versionOptionRender}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item label={t('DESCRIPTION')} desc={t('DESCRIPTION_DESC')}>
                <TextArea name="description" maxLength={256} />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
          <br />
          <div className={styles.title}>{t('LOCATION')}</div>
          <div className={styles.placement}>
            {!namespace ? (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: t('PROJECT_NOT_SELECT_DESC'),
                  },
                ]}
              >
                <Placement name="namespace" {...this.props} />
              </Form.Item>
            ) : (
              this.renderStaticPlacement()
            )}
          </div>
        </Form>
      </div>
    )
  }
}
