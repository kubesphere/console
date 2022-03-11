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
import {
  Form,
  Input,
  Column,
  Columns,
  Checkbox,
  Select,
} from '@kube-design/components'

import { TypeSelect } from 'components/Base'
import { SYNC_STRATEGY } from 'utils/constants'
import Placement from 'components/Forms/AppDeploy/BasicInfo/Placement'

import styles from './index.scss'

export default class Advance extends React.Component {
  get syncOptions() {
    return SYNC_STRATEGY.map(({ label, value, description }) => ({
      label: t(label),
      description: t(description),
      icon: 'timed-task',
      value,
    }))
  }

  handleSyncChange = () => {}

  render() {
    const { formRef, formTemplate } = this.props
    return (
      <Form data={formTemplate} ref={formRef}>
        <div className={styles.wrapper}>
          <h6>{t('DEPLOY_LOCATION')}</h6>
          <div className={styles.wrapper_item}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: t('PROJECT_NOT_SELECT_DESC'),
                },
              ]}
            >
              <Placement
                name="namespace"
                formData={formTemplate}
                {...this.props}
              />
            </Form.Item>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('CODE_REPOSITORY_SETTINGS')}</h6>
          <div className={styles.wrapper_item}>
            <Columns>
              <Column>
                <Form.Item
                  label={t('Revision')}
                  desc={t('设置代码仓库的分支和标签。')}
                >
                  <Input
                    name={`${this.prefix}.discarder.days_to_keep`}
                    defaultValue="7"
                  />
                </Form.Item>
              </Column>
              <Column>
                <Form.Item
                  label={t('资源文件路径')}
                  desc={t('设置资源文件路径。  ')}
                >
                  <Input
                    name={`${this.prefix}.discarder.num_to_keep`}
                    defaultValue="10"
                  />
                </Form.Item>
              </Column>
            </Columns>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_STRATEGY')}</h6>
          <div className={styles.wrapper_item}>
            <div className={styles.wrapper_item_com}>
              <TypeSelect
                name={`${this.prefix}.type`}
                onChange={this.handleSyncChange}
                defaultValue="auto"
                options={this.syncOptions}
              />
            </div>

            <div className={styles.columns}>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox
                    name={`${this.prefix}.discarder.days_to_keep`}
                    defaultValue="7"
                  >
                    Prune Resources
                  </Checkbox>
                </Form.Item>
              </div>

              <div className={styles.column}>
                <Form.Item>
                  <Checkbox
                    name={`${this.prefix}.discarder.num_to_keep`}
                    defaultValue="10"
                  >
                    Self Heal
                  </Checkbox>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
          <h6>{t('SYNC_SETTINGS')}</h6>
          <div className={styles.wrapper_item}>
            <div className={`${styles.columns} ${styles.wrapper_item_com}`}>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox
                    name={`${this.prefix}.discarder.days_to_keep`}
                    defaultValue="7"
                  >
                    Skip Schema Validation
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox
                    name={`${this.prefix}.discarder.num_to_keep`}
                    defaultValue="10"
                  >
                    Auto-Create Namespace
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox
                    name={`${this.prefix}.discarder.num_to_keep`}
                    defaultValue="10"
                  >
                    Prune Last
                  </Checkbox>
                </Form.Item>
              </div>
              <div className={styles.column}>
                <Form.Item>
                  <Checkbox
                    name={`${this.prefix}.discarder.num_to_keep`}
                    defaultValue="10"
                  >
                    Apply Out Of Stnc Only
                  </Checkbox>
                </Form.Item>
              </div>
            </div>
            <Form.Item label={t('Prune Propagation Policy')}>
              <Select
                name={`${this.prefix}.discarder.days_to_keep`}
                defaultValue="7"
              />
            </Form.Item>
            <Form.Item>
              <div className={styles.checkbox_item}>
                <Checkbox
                  name={`${this.prefix}.discarder.days_to_keep`}
                  defaultValue="7"
                ></Checkbox>
                <div className={styles.checkbox_item_info}>
                  <p>放弃 kubectl apply</p>
                  <span>
                    资源将使用“kubectl
                    replace/create”命令进行同步，操作可能会导致资源重新创建。
                  </span>
                </div>
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    )
  }
}
