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
import { ArrayInput, ObjectInput } from 'components/Inputs'
import { Form, Input, Checkbox, Columns, Column } from '@kube-design/components'
import { get, set } from 'lodash'
import style from '../../index.scss'

export default class HelmForm extends React.Component {
  checkItemValid = item => item.name && item.value

  handleChange = key => value => {
    const { formData } = this.props
    set(formData, key, value)
    this.forceUpdate()
  }

  render() {
    const { formRef, formData } = this.props
    return (
      <Form data={formData} type="inner" ref={formRef}>
        <div className={`${style.columns} ${style.wrapper_item_com}`}>
          <div className={style.column}>
            <Form.Item>
              <Checkbox
                name="helm.passCredentials"
                checked={get(formData, 'helm.passCredentials')}
                onChange={this.handleChange('helm.passCredentials')}
              >
                {t('PASS_CREDENTIALS')}
              </Checkbox>
            </Form.Item>
          </div>
          <div className={style.column}>
            <Form.Item>
              <Checkbox
                name="helm.ignoreMissingValueFiles"
                checked={get(formData, 'helm.ignoreMissingValueFiles')}
                onChange={this.handleChange('helm.ignoreMissingValueFiles')}
              >
                {t('IGNORE_MISSING_VALUE_FILES')}
              </Checkbox>
            </Form.Item>
          </div>
          <div className={style.column}>
            <Form.Item>
              <Checkbox
                name="helm.skipCrds"
                checked={get(formData, 'helm.skipCrds')}
                onChange={this.handleChange('helm.skipCrds')}
              >
                {t('SKIP_CRDS')}
              </Checkbox>
            </Form.Item>
          </div>
        </div>
        <Columns>
          <Column>
            <Form.Item label={t('RELEASE_NAME')}>
              <Input name="helm.releaseName" />
            </Form.Item>
          </Column>
          <Column>
            <Form.Item label={t('VALUES')}>
              <Input name="helm.values" />
            </Form.Item>
          </Column>
        </Columns>
        <Form.Item label={t('VALUE_FILES')}>
          <ArrayInput name="helm.valueFiles">
            <Input />
          </ArrayInput>
        </Form.Item>
        <Form.Item label={t('PARAMETERS')}>
          <ArrayInput
            name="helm.parameters"
            itemType="object"
            checkItemValid={this.checkItemValid}
          >
            <ObjectInput>
              <Input name="name" placeholder={t('NAME')} />
              <Input name="value" placeholder={t('VALUE')} />
              <Checkbox
                name="forceString"
                className={style.array_checkbox_item}
              >
                {t('FORCE_STRING')}
              </Checkbox>
            </ObjectInput>
          </ArrayInput>
        </Form.Item>
        <Form.Item label={t('FILE_PARAMETERS')}>
          <ArrayInput name="helm.fileParameters" itemType="object">
            <ObjectInput>
              <Input name="name" placeholder={t('NAME')} />
              <Input name="path" placeholder={t('PATH')} />
            </ObjectInput>
          </ArrayInput>
        </Form.Item>
      </Form>
    )
  }
}
