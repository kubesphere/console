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
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { get } from 'lodash'
import { Input, TextArea, Columns, Column } from '@pitrix/lego-ui'
import { compareVersion } from 'utils/app'
import { PATTERN_NAME } from 'utils/constants'
import { Form, SearchSelect, Tag, Text } from 'components/Base'

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
        <Tag type="warning">{t('Latest Version')}</Tag>
      )}
    </span>
  )

  fetchVersions = async (params = {}) => {
    const { appID, versionStore, fromStore } = this.props
    return versionStore.fetchList({
      ...params,
      app_id: appID,
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
          <Text icon="project" title={namespace} description={t('Project')} />
          <Text title={cluster} description={t('Cluster')} />
          <Text title={workspace} description={t('Workspace')} />
        </div>
      </div>
    )
  }

  render() {
    const { formData, formRef, namespace, versionId, versionStore } = this.props
    return (
      <div className={styles.wrapper}>
        <Form data={formData} ref={formRef}>
          <div className={styles.title}>{t('Basic Info')}</div>
          <Columns>
            <Column>
              <Form.Item
                label={t('Application Name')}
                desc={t('CLUSTER_NAME_DESC')}
                rules={[
                  { required: true, message: t('Please input name') },
                  {
                    pattern: PATTERN_NAME,
                    message: `${t('Invalid name')}, ${t('CLUSTER_NAME_DESC')}`,
                  },
                ]}
              >
                <Input name="name" maxLength={15} />
              </Form.Item>
            </Column>
            <Column>
              <Form.Item
                label={t('Application Version')}
                rules={[
                  { required: true, message: t('Please select version') },
                ]}
              >
                <SearchSelect
                  name="version_id"
                  options={this.sortedVersions}
                  placeholder={t('Please select version')}
                  page={versionStore.list.page}
                  total={versionStore.list.total}
                  currentLength={versionStore.list.data.length}
                  isLoading={versionStore.list.isLoading}
                  onFetch={this.fetchVersions}
                  onChange={this.handleVersionChange}
                  optionRenderer={this.versionOptionRender}
                  valueRenderer={this.versionOptionRender}
                  disabled={!!versionId}
                />
              </Form.Item>
            </Column>
          </Columns>
          <Columns>
            <Column>
              <Form.Item label={t('Description')}>
                <TextArea name="desc" />
              </Form.Item>
            </Column>
            <Column />
          </Columns>
          <br />
          <div className={styles.title}>{t('Deploy Placement')}</div>
          <div className={styles.placement}>
            {!namespace ? (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: t('Please select a project to deploy'),
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
