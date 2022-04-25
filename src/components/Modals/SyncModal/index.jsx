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
import { Input, Form, Checkbox, Select } from '@kube-design/components'
import { Modal } from 'components/Base'
import { get, set } from 'lodash'
import { PRUNE_PROPAGATION_POLICY_OPTIONS } from 'utils/constants'
import styles from './index.scss'

@observer
export default class SyncModal extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    module: PropTypes.string,
    formTemplate: PropTypes.object,
    title: PropTypes.string,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    isSubmitting: false,
    onOk() {},
    onCancel() {},
  }

  form = React.createRef()

  handleSubmit = () => {
    const { onOk } = this.props
    const formData = this.form.current.getData()
    onOk(formData)
  }

  handleCheckboxChange = key => value => {
    const { formTemplate } = this.props
    set(formTemplate, key, value)
    this.forceUpdate()
  }

  render() {
    const { title, visible, onCancel, formTemplate } = this.props

    return (
      <Modal
        width={960}
        title={title || t('CREATE_ROLE')}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        visible={visible}
      >
        <Form ref={this.form} data={formTemplate}>
          <div className={styles.columns}>
            <div className={styles.column}>
              <Form.Item label={t('CODE_REPOSITORY_URL')}>
                <Input name="repoSource.repoURL" disabled />
              </Form.Item>
            </div>
            <div className={styles.column}>
              <Form.Item label={t('REVISION')} desc={t('REVISION_DESC')}>
                <Input name="repoSource.targetRevision" />
              </Form.Item>
            </div>
          </div>
          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.column_card}`}>
              <Form.Item>
                <Checkbox
                  name="prune"
                  checked={get(formTemplate, 'prune', false)}
                  onChange={this.handleCheckboxChange('prune')}
                >
                  {t('PRUNE')}
                </Checkbox>
              </Form.Item>
            </div>
            <div className={`${styles.column} ${styles.column_card}`}>
              <Form.Item>
                <Checkbox
                  name="dryRun"
                  checked={get(formTemplate, 'dryRun', false)}
                  onChange={this.handleCheckboxChange('dryRun')}
                >
                  {t('DRY_RUN')}
                </Checkbox>
              </Form.Item>
            </div>
            <div className={`${styles.column} ${styles.column_card}`}>
              <Form.Item>
                <Checkbox
                  name="applyOnly"
                  checked={get(formTemplate, 'applyOnly', false)}
                  onChange={this.handleCheckboxChange('applyOnly')}
                >
                  {t('APPLY_ONLY')}
                </Checkbox>
              </Form.Item>
            </div>
            <div className={`${styles.column} ${styles.column_card}`}>
              <Form.Item>
                <Checkbox
                  name="syncStrategy.apply.force"
                  checked={get(formTemplate, 'syncStrategy.apply.force', false)}
                  onChange={this.handleCheckboxChange(
                    'syncStrategy.apply.force'
                  )}
                >
                  {t('FORCE')}
                </Checkbox>
              </Form.Item>
            </div>
          </div>

          <div className={styles.wrapper}>
            <h6>{t('SYNC_SETTINGS')}</h6>
            <div className={styles.wrapper_item}>
              <div className={`${styles.columns} ${styles.wrapper_item_com}`}>
                <div className={`${styles.column} ${styles.column_card}`}>
                  <Form.Item>
                    <Checkbox
                      name="syncOptions.Validate"
                      checked={get(formTemplate, 'syncOptions.Validate', false)}
                      onChange={this.handleCheckboxChange(
                        'syncOptions.Validate'
                      )}
                    >
                      {t('SKIP_SCHEMA_VALIDATION')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={`${styles.column} ${styles.column_card}`}>
                  <Form.Item>
                    <Checkbox
                      name="syncOptions.CreateNamespace"
                      checked={get(
                        formTemplate,
                        'syncOptions.CreateNamespace',
                        false
                      )}
                      onChange={this.handleCheckboxChange(
                        'syncOptions.CreateNamespace'
                      )}
                    >
                      {t('AUTO_CREATE_PROJECT')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={`${styles.column} ${styles.column_card}`}>
                  <Form.Item>
                    <Checkbox
                      name="syncOptions.PruneLast"
                      checked={get(
                        formTemplate,
                        'syncOptions.PruneLast',
                        false
                      )}
                      onChange={this.handleCheckboxChange(
                        'syncOptions.PruneLast'
                      )}
                    >
                      {t('PRUNE_LAST')}
                    </Checkbox>
                  </Form.Item>
                </div>
                <div className={`${styles.column} ${styles.column_card}`}>
                  <Form.Item>
                    <Checkbox
                      name="syncOptions.ApplyOutOfSyncOnly"
                      checked={get(
                        formTemplate,
                        'syncOptions.ApplyOutOfSyncOnly',
                        false
                      )}
                      onChange={this.handleCheckboxChange(
                        'syncOptions.ApplyOutOfSyncOnly'
                      )}
                    >
                      {t('APPLY_OUT_OF_SYNC_ONLY')}
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
              <Form.Item label={t('PRUNE_PROPAGATION_POLICY')}>
                <Select
                  name="syncOptions.PrunePropagationPolicy"
                  options={PRUNE_PROPAGATION_POLICY_OPTIONS}
                />
              </Form.Item>
              <Form.Item>
                <div className={styles.checkbox_item}>
                  <Checkbox
                    name="syncOptions.Replace"
                    checked={get(formTemplate, 'syncOptions.Replace', false)}
                    onChange={this.handleCheckboxChange('syncOptions.Replace')}
                  ></Checkbox>
                  <div className={styles.checkbox_item_info}>
                    <p>{t('REPLACE_RESOURCE')}</p>
                    <span>{t('REPLACE_RESOURCE_DESC')}</span>
                  </div>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    )
  }
}
